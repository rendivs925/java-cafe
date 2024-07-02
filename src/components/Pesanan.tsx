import React from "react";
import FormContainer from "./FormContainer";
import { Button } from "./ui/button";
import Line from "./Line";

const formatToRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);
};

function Pesanan() {
  const orderDetails = [
    { label: "Total item", value: 4 },
    { label: "Ongkir", value: 30000 },
    { label: "Total harga item", value: 300000 },
    { label: "Total harga", value: 330000 },
  ];

  return (
    <FormContainer>
      <h2 className="mb-6">Pesanan</h2>
      <Line className="mb-6" />
      <div className="flex flex-col space-y-2">
        {orderDetails.map((detail, index) => (
          <label key={index} className="grid grid-cols-detail sm:grid-cols-sm-detail">
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
      <Line className="mt-6" />
      <Button size="default" className="mt-8">
        Proses Pembayaran
      </Button>
    </FormContainer>
  );
}

export default Pesanan;
