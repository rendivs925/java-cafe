import { connectToDatabase } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { newAddProductSchema } from "@/schemas/AddProductSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate the input data with Zod schema
    const parseResult = newAddProductSchema.safeParse(data);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parseResult.error.errors,
        },
        {
          status: 400,
        }
      );
    }

    const { category, description, imgUrl, price, stock, title } =
      parseResult.data;

    await connectToDatabase();

    const existingProduct = await Product.findOne({ title }).lean();

    if (existingProduct) {
      return NextResponse.json(
        {
          message: "Product with this title already exists",
          existingProduct: existingProduct,
        },
        { status: 409 } // Conflict status code
      );
    }

    const newProduct = new Product({
      category,
      description,
      imgUrl,
      price,
      stock,
      title,
    });

    await newProduct.save();

    return NextResponse.json(
      {
        message: "Product added successfully",
        product: newProduct,
      },
      { status: 201 } // Created status code
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 } // Internal Server Error status code
    );
  }
}
