"use client";

import { type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormContainer from "./FormContainer";
import InputFormField from "./InputFormField";
import usePengiriman from "@/hooks/usePengiriman"

export interface PengirimanProps {}

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
    placeholder: "08123456789",
    label: "No Handphone",
  },
];

export default function Pengiriman(props: PengirimanProps): ReactElement {
  const { form, onSubmit } = usePengiriman();

  return (
    <FormContainer className="max-w-[700px] mt-14 me-auto ms-auto bg-secondary">
      <h2 className="mb-6">Detail alamat pengiriman</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
    </FormContainer>
  );
}
