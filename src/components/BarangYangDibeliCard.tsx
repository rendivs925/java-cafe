"use client";
import { CartProduct } from "@/types";
import { type ReactElement } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import useAppContext from "@/hooks/useAppContext";
import { formatToRupiah } from "@/lib/formatToRupiah";

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
    <li className="p-6 bg-white rounded-lg shadow">
      <Card className="flex items-center space-x-4 bg-transparent shadow-none">
        <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden">
          <Image
            src={imgUrl}
            layout="fill"
            objectFit="cover"
            loading="eager"
            alt={title}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-1">
              {title} (x{qty})
            </h4>
            {/* <p className="text-sm text-gray-600 mt-0">x{qty}</p> */}
          </div>
          <p className="text-sm font-normal text-primary mt-0">
            {formatToRupiah(String(price * qty))}
          </p>
        </div>
      </Card>
    </li>
  );
}
