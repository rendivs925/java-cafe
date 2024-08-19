import React, {
  useDeferredValue,
  useEffect,
  useState,
  ForwardedRef,
} from "react";
import CardContainer from "./CardContainer";
import { Button } from "./ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Line from "./Line";
import useAppContext from "@/hooks/useAppContext";
import { paymentAction } from "@/actions/paymentAction";
import { getOrderStatusAction } from "@/actions/getOrderStatusAction";
import { createOrderAction } from "@/actions/createOrderAction";
import { ICart, ICartProduct } from "@/models/Cart";
import { getMyOrderAction } from "@/actions/getMyOrderAction";
import { UseFormReturn } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "./ui/use-toast";
import { BASE_URL } from "@/constanst";
import { deleteCartAction } from "@/actions/deleteCartAction";

interface PesananProps {
  cart: ICart;
  form: UseFormReturn<
    {
      kota: string;
      kurir: string;
      layanan: string;
      provinsi: string;
    },
    any,
    undefined
  >;
}

export interface ISnap {
  pay: (token: string, options: any) => void;
}

export interface ISnapResult {
  order_id: string;
  transaction_status: string;
}

const Pesanan = React.forwardRef<HTMLFormElement, PesananProps>(
  ({ cart, form }, ref: ForwardedRef<HTMLFormElement>) => {
    const { formatToRupiah, pushRoute, setTotalItems, user, detailPengiriman } =
      useAppContext();
    const [subHarga, setSubHarga] = useState(0);
    const { layanan } = form.watch();
    const ongkir = useDeferredValue(layanan);
    const totalHarga = subHarga + Number(ongkir);

    const products = cart.products;
    const orderDetails = [
      { label: "Total item", value: products.length },
      { label: "Ongkir", value: Number(ongkir) },
      { label: "Total harga item", value: subHarga },
      { label: "Total harga", value: totalHarga },
    ];
    const orderId = nanoid();

    const cartProductsReducer = (
      accumulator: number,
      currentValue: ICartProduct
    ): number => {
      return (
        currentValue.price * (currentValue as { qty: number }).qty + accumulator
      );
    };

    useEffect(() => {
      if (products) {
        setSubHarga(products.reduce(cartProductsReducer, 0));
      }
    }, [products]);

    useEffect(() => {
      const midtransScriptUrl = process.env.NEXT_PUBLIC_MIDTRANS_URL as string;

      let scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;

      const myMidtransClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
      scriptTag.setAttribute("data-client-key", myMidtransClientKey);

      document.body.appendChild(scriptTag);

      return () => {
        document.body.removeChild(scriptTag);
      };
    }, []);

    const handlePayment = async () => {
      const payload = {
        email: user.email,
        firstName: user.username,
        grossAmount: totalHarga,
        orderId,
        phone: Number(detailPengiriman.noHandphone),
      };

      if (ref && "current" in ref && ref.current) {
        ref.current?.requestSubmit();
      }

      const paymentResponse = await paymentAction(payload);
      console.log("Payment response: ", paymentResponse);

      const token = paymentResponse.token as string;

      if (
        "snap" in window &&
        window.snap &&
        typeof (window.snap as ISnap).pay === "function" &&
        (window.snap as ISnap).pay
      ) {
        (window.snap as ISnap).pay(token, {
          onSuccess: async (result: ISnapResult) => {
            const createOrderResponse = await createOrderAction({
              token,
              orderId: result.order_id,
              userId: cart.userId,
              address: detailPengiriman.alamatLengkap,
              phone: Number(detailPengiriman.noHandphone),
              subtotal: subHarga,
              payment: totalHarga,
              shippingCost: Number(ongkir),
              paymentStatus: result.transaction_status,
              products: cart.products.map((product) => ({
                productId: product.productId,
                qty: product.qty as number,
                totalPrice: product.price * (product as { qty: number }).qty,
                profit: product.profit * (product as { qty: number }).qty,
              })),
            });
            setTotalItems(0);
            console.log("Create Order Response: ", createOrderResponse);
            await deleteCartAction();
          },
          onPending: async (result: ISnapResult) => {
            console.log(result);

            const createOrderResponse = await createOrderAction({
              token,
              orderId,
              userId: cart.userId,
              address: detailPengiriman.alamatLengkap,
              phone: Number(detailPengiriman.noHandphone),
              subtotal: subHarga,
              payment: totalHarga,
              shippingCost: Number(ongkir),
              paymentStatus: result.transaction_status,
              products: cart.products.map((product) => ({
                productId: product.productId,
                qty: product.qty as number,
                totalPrice: product.price * (product as { qty: number }).qty,
                profit: product.profit * (product as { qty: number }).qty,
              })),
            });

            setTotalItems(0);

            await deleteCartAction();

            console.log("Create Order Response: ", createOrderResponse);
            pushRoute("/account/orders");
          },
          onError: (error: { message: string }) => {
            toast({ description: error.message });
          },
          onClose: () => {
            toast({ description: "Segera lakukan pembayaran." });
          },
        });
      } else {
        console.error("Snap.js is not loaded or pay function is unavailable.");
      }

      // const myOrderResponse = await getMyOrderAction();
      // console.log("My order:", myOrderResponse?.order);
    };

    return (
      <CardContainer className="px-6 box-border w-full">
        <CardHeader className="px-0">
          <CardTitle>Pesanan</CardTitle>
        </CardHeader>
        <Line />
        <CardContent className="pt-6 px-0">
          <div className="flex flex-col space-y-1.5">
            {orderDetails.map((detail, index) => (
              <label
                key={index}
                className={`grid grid-cols-detail sm:grid-cols-sm-detail ${
                  ongkir === "" && detail.label === "Ongkir" && "hidden"
                }`}
              >
                <span className="text-muted-foreground">{detail.label}</span>
                <p className="mt-0">
                  :{" "}
                  {detail.label === "Total item"
                    ? detail.value
                    : formatToRupiah(detail.value)}
                </p>
              </label>
            ))}
          </div>
        </CardContent>
        <Line />
        <CardFooter className="pt-6 px-0">
          <Button
            disabled={ongkir === "" ? true : false}
            size="default"
            onClick={handlePayment}
          >
            Proses Pembayaran
          </Button>
        </CardFooter>
      </CardContainer>
    );
  }
);

Pesanan.displayName = "Pesanan";

export default Pesanan;
