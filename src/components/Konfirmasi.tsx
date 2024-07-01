import { type ReactElement } from "react";
import DetailPengiriman from "./DetailPengiriman";
import BarangYangDibeli from "./BarangYangDibeli";
import PengirimanForm from "./PengirimanForm";
import Pesanan from "./Pesanan";
import Line from "./Line";

export interface KonfirmasiProps {}

export default function Konfirmasi(props: KonfirmasiProps): ReactElement {
  return (
    <section className="my-14">
      <DetailPengiriman />
      <BarangYangDibeli />
      <Line className="my-14" />
      <div className="grid lg:grid-cols-2 gap-10">
        <PengirimanForm/>
        <Pesanan/>
      </div>
    </section>
  );
}
