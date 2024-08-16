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

const Pesanan = React.forwardRef<HTMLFormElement, PesananProps>(
  ({ cart, form }, ref: ForwardedRef<HTMLFormElement>) => {
    const { formatToRupiah, pushRoute, user, detailPengiriman } =
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

      if (window.snap && typeof window.snap.pay === "function") {
        window.snap.pay(paymentResponse.token as string, {
          onSuccess: async (result) => {
            const createOrderResponse = await createOrderAction({
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
            console.log("Create Order Response: ", createOrderResponse);
            pushRoute(
              `${BASE_URL}/confirmation?orderId=${orderId}&status=${createOrderResponse.status}&transaction_status=${result.transaction_status}`
            );
          },
          onPending: async (result) => {
            const createOrderResponse = await createOrderAction({
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
            console.log("Create Order Response: ", createOrderResponse);
          },
          onError: (error) => {
            toast({ description: error.message });
          },
          onClose: () => {
            toast({ description: "Segera lakukan pembayaran." });
          },
        });
      } else {
        console.error("Snap.js is not loaded or pay function is unavailable.");
      }

      // Uncomment these lines if you need to perform the actual actions
      // const orderStatusResponse = await getOrderStatusAction({ orderId: payload.orderId });
      // console.log("Order Status:", orderStatusResponse);

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
