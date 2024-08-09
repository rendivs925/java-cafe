"use client";
import { CartProduct } from "@/types";
import { type ReactElement } from "react";
import { Card, CardTitle } from "./ui/card";
import Image from "next/image";
import useAppContext from "@/hooks/useAppContext";

export default function BarangYangDibeliCard({
  title,
  productId,
  imgUrl,
  price,
  qty,
  stock,
}: CartProduct & { productId: string }): ReactElement {
  const { formatNumber } = useAppContext();

  return (
    <li>
      <Card className="bg-transparent overflow-visible shadow-none">
        <div className="rounded-lg h-[180px] overflow-hidden mb-4">
          <Image
            src={imgUrl}
            width={180}
            height={180}
            loading="eager"
            alt={title}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="">{title}</CardTitle>
          <p>QTY : {qty}</p>
        </div>
        <h4 className="font-medium mt-4">IDR {formatNumber(price * qty)}</h4>
      </Card>
    </li>
  );
}
