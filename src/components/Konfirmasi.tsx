import { type ReactElement } from "react";
import DetailPengiriman from "./DetailPengiriman";
import BarangYangDibeli from "./BarangYangDibeli";
import PengirimanForm from "./PengirimanForm";
import Pesanan from "./Pesanan";
import Line from "./Line";
import { ICart } from "@/models/Cart";

export interface KonfirmasiProps {
  cart: ICart;
}

export default function Konfirmasi({ cart }: KonfirmasiProps): ReactElement {
  return (
    <section className="my-14">
      <DetailPengiriman />
      <BarangYangDibeli cart={cart} />
      <Line className="my-14" />
      <div className="grid items-start lg:grid-cols-2 gap-10">
        <PengirimanForm />
        <Pesanan cart={cart} />
      </div>
    </section>
  );
}
