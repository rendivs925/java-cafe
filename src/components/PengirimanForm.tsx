import React from "react";
import { Form } from "@/components/ui/form";
import SelectFormField from "./SelectFormField";
import CardContainer from "./CardContainer";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import useKonfirmasi from "@/hooks/useKonfirmasi";

function PengirimanForm() {
  const { form, onSubmit } = useKonfirmasi();

  const provinsiOptions = [
    { value: "m@example.com", label: "hardleberg@gmail.com" },
    { value: "m@google.com", label: "m@google.com" },
    { value: "m@support.com", label: "m@support.com" },
  ];

  const kotaOptions = [
    { value: "m@example.com", label: "hardleberg@gmail.com" },
    { value: "m@google.com", label: "m@google.com" },
    { value: "m@support.com", label: "m@support.com" },
  ];

  const kurirOptions = [
    { value: "m@example.com", label: "hardleberg@gmail.com" },
    { value: "m@google.com", label: "m@google.com" },
    { value: "m@support.com", label: "m@support.com" },
  ];

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>Pengiriman</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <SelectFormField
              control={form.control}
              name="Provinsi"
              label="Provinsi"
              options={provinsiOptions}
            />
            <SelectFormField
              control={form.control}
              name="Kota"
              label="Kota"
              options={kotaOptions}
            />

            <SelectFormField
              control={form.control}
              name="Kurir"
              label="Kurir"
              options={kurirOptions}
            />
          </form>
        </Form>
      </CardContent>
    </CardContainer>
  );
}

export default PengirimanForm;
