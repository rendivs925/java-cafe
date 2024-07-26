import { connectToDatabase } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    await connectToDatabase();

    const existingProduct = await Product.findOne({ title }).lean();

    if (existingProduct) {
      return NextResponse.json(
        {
          exists: true,
        },
        { status: 200 } // Conflict status code
      );
    }

    return NextResponse.json(
      {
        exists: false,
      },
      { status: 200 } // Conflict status code
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 } // Internal Server Error status code
    );
  }
}
