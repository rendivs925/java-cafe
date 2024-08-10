import { useRef, type ReactElement } from "react";
import DetailPengiriman from "./DetailPengiriman";
import BarangYangDibeli from "./BarangYangDibeli";
import PengirimanForm from "./PengirimanForm";
import Pesanan from "./Pesanan";
import Line from "./Line";
import { ICart } from "@/models/Cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface KonfirmasiProps {
  cart: ICart;
}

// Define the validation schema using zod
const FormSchema = z.object({
  provinsi: z.string({
    required_error: "Provinsi is required.",
  }),
  kota: z.string({
    required_error: "Kota is required.",
  }),
  kurir: z.string({
    required_error: "Kurir is required.",
  }),
  layanan: z.string().min(1, "Please select a service."),
});

export default function Konfirmasi({ cart }: KonfirmasiProps): ReactElement {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
        <PengirimanForm form={form} formRef={formRef} />
        <Pesanan formRef={formRef} form={form} cart={cart} />
      </div>
    </section>
  );
}
