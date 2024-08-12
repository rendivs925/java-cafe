import { useRef, type ReactElement } from "react";
import DetailPengiriman from "./DetailPengiriman";
import BarangYangDibeli from "./BarangYangDibeli";
import PengirimanForm from "./PengirimanForm";
import Pesanan from "./Pesanan";
import Line from "./Line";
import { ICart } from "@/models/Cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PengirimanSchema, PengirimanType } from "@/schemas/PengirimanSchema";

export interface KonfirmasiProps {
  cart: ICart;
}

export default function Konfirmasi({ cart }: KonfirmasiProps): ReactElement {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<PengirimanType>({
    resolver: zodResolver(PengirimanSchema),
    defaultValues: {
      provinsi: "",
      kota: "",
      kurir: "",
      layanan: "",
    },
  });

  return (
    <section className="my-14 mx-0 box-border overflow-x-hidden">
      <DetailPengiriman />
      <BarangYangDibeli cart={cart} />
      <Line className="my-14" />
      <div className="grid pb-1 box-border items-start lg:grid-cols-2 gap-10">
        <PengirimanForm form={form} cart={cart} ref={formRef} />
        <Pesanan ref={formRef} form={form} cart={cart} />
      </div>
    </section>
  );
}
