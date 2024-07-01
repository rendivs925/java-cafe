import { type ReactElement } from "react";
import Line from "./Line";
import CartProductsList from "./CartProductsList";

export interface BarangYangDibeliProps {}

export default function BarangYangDibeli(
  props: BarangYangDibeliProps,
): ReactElement {
  return (
    <div className="mt-14">
      <Line />
      <h2 className="my-6">Barang Yang di Beli</h2>
      <Line />
      <CartProductsList className="mt-14 max-w-[800px]" />
    </div>
  );
}
