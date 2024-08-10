import React, { MutableRefObject, RefObject, useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import { Button } from "./ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Line from "./Line";
import useAppContext from "@/hooks/useAppContext";
import { paymentAction } from "@/actions/paymentAction";
import { getOrderStatusAction } from "@/actions/getOrderStatusAction";
import { createOrderAction } from "@/actions/createOrderAction";
import mongoose from "mongoose";
import { ICart, ICartProduct } from "@/models/Cart";
import { getMyOrderAction } from "@/actions/getMyOrderAction";
import { UseFormReturn } from "react-hook-form";

function Pesanan({
  cart,
  formRef,
  form,
}: {
  cart: ICart;
  formRef: RefObject<HTMLFormElement> | null;
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
}) {
  const { formatToRupiah } = useAppContext();
  const [subHarga, setSubHarga] = useState(0);
  const { kota, kurir, layanan, provinsi } = form.watch();

  const products = cart.products;
  const orderDetails = [
    { label: "Total item", value: products.length },
    { label: "Ongkir", value: Number(layanan) },
    { label: "Total harga item", value: subHarga },
    { label: "Total harga", value: subHarga + Number(layanan) },
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

  const handlePayment = async () => {
    const payload = {
      email: "hardleberg@gmail.com",
      firstName: "Rendi vir",
      grossAmount: 120000,
      orderId: "128821190100000",
      phone: 6285733300369,
    };

    formRef?.current?.requestSubmit();

    // const response = await paymentAction(payload);
    //
    // console.log("payment response: ", response);

    // const response2 = await getOrderStatusAction({ orderId: payload.orderId });

    // console.log("Status:", response2);

    // const response3 = await createOrderAction({
    //   userId: cart.userId,
    //   address: "Jalan merdeka no 10",
    //   phone: 123456789011,
    //   subtotal: 120000,
    //   payment: 150000,
    //   shippingCost: 10000,
    //   products: [
    //     {
    //       productId: "66a72b9823bd0268c0920735",
    //       qty: 1,
    //       totalPrice: 150000,
    //       profit: 200000,
    //     },
    //   ],
    // });
    //
    // console.log("Order Status: ", response3);

    const myOrderResponse = await getMyOrderAction();

    console.log("My order:", myOrderResponse?.order);
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
              className="grid grid-cols-detail sm:grid-cols-sm-detail"
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
        <Button size="default" onClick={handlePayment}>
          Proses Pembayaran
        </Button>
      </CardFooter>
    </CardContainer>
  );
}

export default Pesanan;
