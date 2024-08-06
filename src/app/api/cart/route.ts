// app/api/cart/route.ts

import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");

  if (!userId) {
    return NextResponse.json(
      {
        status: "error",
        message: "User ID is required",
        cartProductList: [],
      },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId }).lean();

    return NextResponse.json(
      {
        status: "success",
        cart: cart || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart product list:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Error fetching cart product list",
        cart: [],
      },
      { status: 500 }
    );
  }
}
