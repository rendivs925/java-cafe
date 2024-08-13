import React, { useDeferredValue, useEffect, useState } from "react";
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
  ({ cart, form }, ref) => {
    const { formatToRupiah } = useAppContext();
    const [subHarga, setSubHarga] = useState(0);
    const { layanan } = form.watch();
    const ongkir = useDeferredValue(layanan);

    const products = cart.products;
    const orderDetails = [
      { label: "Total item", value: products.length },
      { label: "Ongkir", value: Number(ongkir) },
      { label: "Total harga item", value: subHarga },
      { label: "Total harga", value: subHarga + Number(ongkir) },
    ];

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
      const midtransScriptUrl = process.env.MIDTRANS_URL as string;

      let scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;

      const myMidtransClientKey = process.env.CLIENT_KEY as string;
      scriptTag.setAttribute("data-client-key", myMidtransClientKey);

      document.body.appendChild(scriptTag);

      return () => {
        document.body.removeChild(scriptTag);
      };
    }, []);

    const handlePayment = async () => {
      const payload = {
        email: "hardleberg@gmail.com",
        firstName: "Rendi vir",
        grossAmount: 120000,
        orderId: "128821190100000",
        phone: 6285733300369,
      };

      if (ref && "current" in ref) {
        ref.current?.requestSubmit();
      }

      // Uncomment these lines if you need to perform the actual actions
      const paymentResponse = await paymentAction(payload);
      console.log("Payment response: ", paymentResponse);

      if (window.snap && typeof window.snap.pay === "function") {
        window.snap.pay(paymentResponse.token as string, {
          onSuccess: async (result) => {
            const createOrderResponse = await createOrderAction({
              userId: cart.userId,
              address: "Jalan Merdeka No 10",
              phone: 123456789011,
              subtotal: 120000,
              payment: 150000,
              shippingCost: 10000,
              products: [
                {
                  productId: "66a72b9823bd0268c0920735",
                  qty: 1,
                  totalPrice: 150000,
                  profit: 200000,
                },
              ],
            });
            console.log("Create Order Response: ", createOrderResponse);
          },
        });
      } else {
        console.error("Snap.js is not loaded or pay function is unavailable.");
      }

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
