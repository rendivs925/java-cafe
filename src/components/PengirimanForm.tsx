import React, { forwardRef, useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import SelectFormField from "./SelectFormField";
import CardContainer from "./CardContainer";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { fetchCitiesAction } from "@/actions/fetchCitiesAction";
import { fetchProvincesAction } from "@/actions/fetchProvinceAction";
import { calculateShippingAction } from "@/actions/calculateShippingAction";
import { UseFormReturn } from "react-hook-form";
import { ICart, ICartProduct } from "@/models/Cart";

// Define a type alias for option objects
export type Option = {
  value: string;
  label: string;
};

const PengirimanForm = forwardRef<
  HTMLFormElement,
  {
    cart: ICart;
    form: UseFormReturn<
      { kota: string; kurir: string; layanan: string; provinsi: string },
      any,
      undefined
    >;
  }
>(({ form, cart }, ref) => {
  const { kota, kurir, provinsi } = form.watch();

  const [provinsiOptions, setProvinsiOptions] = useState<Option[]>([]);
  const [kotaOptions, setKotaOptions] = useState<Option[]>([]);
  const [layananOptions, setLayananOptions] = useState<Option[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);

  const kurirOptions: Option[] = [
    { value: "jne", label: "JNE" },
    { value: "pos", label: "POS" },
    { value: "tiki", label: "TIKI" },
  ];

  const handleFetchError = (
    setter: React.Dispatch<React.SetStateAction<Option[]>>
  ) => {
    setter([]);
  };

  const loadProvinces = async () => {
    try {
      const result = await fetchProvincesAction();
      if (result.status === "success" && result.response) {
        setProvinsiOptions(
          result.response.map(
            (provinsi: { province_id: string; province: string }) => ({
              value: provinsi.province_id,
              label: provinsi.province,
            })
          )
        );
      } else {
        handleFetchError(setProvinsiOptions);
      }
    } catch (error) {
      handleFetchError(setProvinsiOptions);
    }
  };

  const loadCities = async (province: string) => {
    try {
      const result = await fetchCitiesAction({ province });
      if (result.status === "success" && result.response) {
        const filteredCities = result.response.filter(
          (city) => city.type.toLowerCase() !== "kota"
        );

        setKotaOptions(
          filteredCities.map(
            (city: { city_id: string; city_name: string }) => ({
              value: city.city_id,
              label: city.city_name,
            })
          )
        );
      } else {
        handleFetchError(setKotaOptions);
      }
    } catch (error) {
      handleFetchError(setKotaOptions);
    }
  };

  const loadLayananOptions = async (courier: string, destination: string) => {
    try {
      const result = await calculateShippingAction({
        courier,
        destination,
        origin: "162",
        weight: totalWeight,
      });
      if (result.status === "success" && result.response) {
        setLayananOptions(
          result.response[0]?.costs.map((costDetail) => ({
            value: costDetail.cost[0].value.toString(),
            label: `${costDetail.service} - ${
              costDetail.description
            } - ${costDetail.cost[0]?.value.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })} (${costDetail.cost[0]?.etd} days)`,
          }))
        );
      } else {
        handleFetchError(setLayananOptions);
      }
    } catch (error) {
      handleFetchError(setLayananOptions);
    }
  };

  useEffect(() => {
    loadProvinces();
  }, []);

  const cartProductsReducer = (
    accumulator: number,
    currentValue: ICartProduct
  ): number => {
    return currentValue.weight + accumulator;
  };

  useEffect(() => {
    if (cart?.products) {
      setTotalWeight(cart.products.reduce(cartProductsReducer, 0));
    }
  }, []);

  useEffect(() => {
    if (provinsi) {
      loadCities(provinsi);
      form.setValue("kota", "");
      form.setValue("kurir", "");
      form.setValue("layanan", "");
    }
  }, [provinsi]);

  useEffect(() => {
    if (kota && kurir) {
      form.setValue("layanan", "");
      loadLayananOptions(kurir, kota);
    }
  }, [kota, kurir]);

  return (
    <CardContainer className="px-6 box-border w-full">
      <CardHeader className="px-0">
        <CardTitle>Pengiriman</CardTitle>
      </CardHeader>
      <CardContent className="px-0 box-border">
        <Form {...form}>
          <form
            ref={ref}
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = form.watch();
              console.log("Data:", formData);
              console.log("weight:", totalWeight);

              const response = await calculateShippingAction({
                courier: formData.kurir,
                destination: formData.kota,
                origin: "162",
                weight: totalWeight,
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
});

PengirimanForm.displayName = "PengirimanForm";

export default PengirimanForm;
