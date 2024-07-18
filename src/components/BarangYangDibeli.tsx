"use client";
import { type ReactElement } from "react";
import Line from "./Line";
import useAppContext from "@/hooks/useAppContext";
import BarangYangDibeliCard from "./BarangYangDibeliCard";
import useClientComponent from "@/hooks/useClientComponent";

export interface BarangYangDibeliProps {}

export default function BarangYangDibeli(
  props: BarangYangDibeliProps
): ReactElement {
  const { cartProductList } = useAppContext();
  const isClient = useClientComponent();

  return (
    <div className="mt-14">
      <Line />
      <h2 className="my-6">Barang Yang di Beli</h2>
      <Line />
      <ul className="mt-14 flex flex-wrap gap-12 w-max">
        {isClient &&
          cartProductList.map(
            ({ title, category, id, imgUrl, price, qty, stock }, index) => (
              <BarangYangDibeliCard
                title={title}
                category={category}
                id={id}
                imgUrl={imgUrl}
                price={price}
                qty={qty}
                stock={stock}
                key={index}
              />
            )
          )}
      </ul>
    </div>
  );
}
