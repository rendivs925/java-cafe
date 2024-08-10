"use server";
import { getRajaOngkirApiKey } from "@/lib/auth";
import axios from "axios";

type Cost = {
  value: number;
  etd: string;
  note: string;
};

type Service = {
  service: string;
  description: string;
  cost: Cost[];
};

type Courier = {
  code: string;
  name: string;
  costs: Service[];
};

// Define the types for the input data
interface ShippingData {
  origin: string;
  destination: string;
  weight: number;
  courier: string;
}

// Define the types for the function return value
interface ShippingResponse {
  status: "success" | "error";
  response?: Courier[];
  message: string;
}

export async function calculateShippingAction(
  data: ShippingData
): Promise<ShippingResponse> {
  const { origin, destination, weight, courier } = data;

  try {
    const response = await axios.post(
      "https://api.rajaongkir.com/starter/cost",
      new URLSearchParams({
        origin: origin,
        destination: destination,
        weight: weight.toString(),
        courier: courier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          key: getRajaOngkirApiKey(),
        },
      }
    );

    console.dir(response.data.rajaongkir.results, {
      depth: null,
      colors: true,
    });

    return {
      status: "success",
      response: response.data.rajaongkir.results,
      message: "Calculated shipping cost successfully.",
    };
  } catch (error) {
    console.log(error);

    return { status: "error", message: "Error calculating shipping cost." };
  }
}
