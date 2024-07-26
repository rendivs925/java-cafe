import { newAddProductSchema } from "@/schemas/AddProductSchema";
import { NextRequest } from "next/server";

async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate the input data with Zod schema
    const parseResult = newAddProductSchema.safeParse(data);
  } catch (error) {}
}
