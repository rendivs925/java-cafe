import React from "react";
import CardContainer from "./CardContainer";
import { Button } from "./ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Line from "./Line";
import useAppContext from "@/hooks/useAppContext";

function Pesanan() {
  const { formatToRupiah } = useAppContext();
  const orderDetails = [
    { label: "Total item", value: 4 },
    { label: "Ongkir", value: 30000 },
    { label: "Total harga item", value: 300000 },
    { label: "Total harga", value: 330000 },
  ];

  return (
    <CardContainer className="px-6">
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
        <Button size="default">Proses Pembayaran</Button>
      </CardFooter>
    </CardContainer>
  );
}

export default Pesanan;
