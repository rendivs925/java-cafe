"use server";
import { getRajaOngkirApiKey } from "@/lib/auth";
import axios from "axios";

// Define the type for the individual province
interface Province {
  province_id: string;
  province: string;
}

// Define the type for the status part of the response
interface Status {
  code: number;
  description: string;
}

// Define the type for the API response
interface ProvinceApiResponse {
  rajaongkir: {
    query: any[];
    status: Status;
    results: Province[];
  };
}

// Define the types for the function return value
interface ProvinceResponse {
  status: "success" | "error";
  response?: Province[];
  message: string;
}

export async function fetchProvincesAction(): Promise<ProvinceResponse> {
  try {
    const { data } = await axios.get<ProvinceApiResponse>(
      "https://api.rajaongkir.com/starter/province",
      {
        headers: {
          key: getRajaOngkirApiKey(),
        },
      }
    );

    return {
      status: "success",
      response: data.rajaongkir.results,
      message: "Provinces fetched successfully.",
    };
  } catch (error) {
    return { status: "error", message: "Error fetching provinces." };
  }
}
