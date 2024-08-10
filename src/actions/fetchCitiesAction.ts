"use server";
import { getRajaOngkirApiKey } from "@/lib/auth";
import axios from "axios";

// Define the type for the individual city
interface City {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

// Define the type for the query part of the response
interface Query {
  province: string;
}

// Define the type for the status part of the response
interface Status {
  code: number;
  description: string;
}

// Define the type for the API response
interface CityApiResponse {
  rajaongkir: {
    query: Query;
    status: Status;
    results: City[]; // results is an array of City
  };
}

// Define the types for the input data
interface CityRequestData {
  province: string;
}

// Define the types for the function return value
interface CityResponse {
  status: "success" | "error";
  response?: City[];
  message: string;
}

export async function fetchCitiesAction(
  data: CityRequestData
): Promise<CityResponse> {
  const { province } = data;

  try {
    const { data } = await axios.get<CityApiResponse>(
      `https://api.rajaongkir.com/starter/city?province=${province}`,
      {
        headers: {
          key: getRajaOngkirApiKey(),
        },
      }
    );

    return {
      status: "success",
      response: data.rajaongkir.results,
      message: "Cities fetched successfully.",
    };
  } catch (error) {
    return { status: "error", message: "Error fetching cities." };
  }
}
