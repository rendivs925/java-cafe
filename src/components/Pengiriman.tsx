import { type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CardContainer from "./CardContainer";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import InputFormField from "./InputFormField";
import usePengiriman from "@/hooks/usePengiriman";

const formFields = [
  {
    name: "alamatLengkap",
    id: "alamat-lengkap",
    placeholder: "Jl Raya Indonesia no 20",
    label: "Alamat Lengkap",
  },
  {
    name: "noHandphone",
    id: "no-handphone",
    placeholder: "Masukkan nomor anda",
    label: "No Handphone",
  },
];

export default function Pengiriman(): ReactElement {
  const { form, onSubmit, handleFormAction } = usePengiriman();

  return (
    <CardContainer className="max-w-[700px] mt-14 me-auto ms-auto bg-background">
      <CardHeader>
        <CardTitle>Detail alamat pengiriman</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={handleFormAction} className="space-y-5">
            {formFields.map((field) => (
              <InputFormField
                key={field.name}
                control={form.control}
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                label={field.label}
                errors={form.formState.errors}
              />
            ))}
            <Button type="submit" size="default">
              Konfirmasi Pesanan
            </Button>
          </form>
        </Form>
      </CardContent>
    </CardContainer>
  );
}
