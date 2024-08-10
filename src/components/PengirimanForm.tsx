import React, { RefObject, useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import SelectFormField from "./SelectFormField";
import CardContainer from "./CardContainer";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { fetchCitiesAction } from "@/actions/fetchCitiesAction";
import { fetchProvincesAction } from "@/actions/fetchProvinceAction";
import { calculateShippingAction } from "@/actions/calculateShippingAction";
import { UseFormReturn } from "react-hook-form";

// Define a type alias for option objects
export type Option = {
  value: string;
  label: string;
};

function PengirimanForm({
  formRef,
  form,
}: {
  formRef: RefObject<HTMLFormElement>;
  form: UseFormReturn<
    {
      kota: string;
      kurir: string;
      layanan: string;
      provinsi: string;
    },
    any,
    undefined
  >;
}) {
  const { kota, kurir, layanan, provinsi } = form.watch();

  const [provinsiOptions, setProvinsiOptions] = useState<Option[]>([]);
  const [kotaOptions, setKotaOptions] = useState<Option[]>([]);
  const [layananOptions, setLayananOptions] = useState<Option[]>([]);

  const kurirOptions: Option[] = [
    { value: "jne", label: "JNE" },
    { value: "pos", label: "POS" },
    { value: "tiki", label: "TIKI" },
  ];

  useEffect(() => {
    const loadProvinces = async () => {
      const result = await fetchProvincesAction();
      if (result.status === "success" && result.response) {
        setProvinsiOptions(
          result?.response.map(
            (provinsi: { province_id: string; province: string }) => ({
              value: provinsi.province_id,
              label: provinsi.province,
            })
          )
        );
      }
    };

    loadProvinces();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (provinsi) {
        const result = await fetchCitiesAction({ province: provinsi });
        if (result.status === "success" && result.response) {
          setKotaOptions(
            result?.response.map(
              (city: { city_id: string; city_name: string }) => ({
                value: city.city_id,
                label: city.city_name,
              })
            )
          );
        }
      }
    };

    loadCities();
  }, [provinsi]);

  useEffect(() => {
    const loadLayananOptions = async () => {
      // Simulate fetching layanan options. Replace this with actual fetch logic if needed.
      const result = await calculateShippingAction({
        courier: kurir,
        destination: kota,
        origin: "162",
        weight: 300,
      });
      if (result.status === "success" && result.response) {
        console.table(layanan);

        setLayananOptions(
          result?.response[0]?.costs.map((costDetail) => ({
            value: costDetail.cost[0].value.toString(),
            label: `${costDetail.service} - ${
              costDetail.description
            } - ${costDetail.cost[0]?.value.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })} (${costDetail.cost[0]?.etd} days)`,
          }))
        );
      }
    };

    if (kota && kurir) {
      loadLayananOptions();
    }
  }, [kota, kurir, layanan]);

  return (
    <CardContainer className="px-6 box-border w-full">
      <CardHeader className="px-0">
        <CardTitle>Pengiriman</CardTitle>
      </CardHeader>
      <CardContent className="px-0 box-border">
        <Form {...form}>
          <form
            ref={formRef}
            action={async () => {
              const formData = form.watch();
              console.log("Data:", formData);

              const response = await calculateShippingAction({
                courier: formData.kurir,
                destination: formData.kota,
                origin: "162",
                weight: 200,
              });

              console.log("Response:", response);
            }}
            className="w-full space-y-5 box-border"
          >
            <SelectFormField
              control={form.control}
              name="provinsi"
              label="Provinsi"
              options={provinsiOptions}
            />
            <SelectFormField
              control={form.control}
              name="kota"
              label="Kota"
              options={kotaOptions}
            />
            <SelectFormField
              control={form.control}
              name="kurir"
              label="Kurir"
              options={kurirOptions}
            />
            <SelectFormField
              control={form.control}
              name="layanan"
              label="Layanan"
              options={layananOptions}
            />
          </form>
        </Form>
      </CardContent>
    </CardContainer>
  );
}

export default PengirimanForm;
