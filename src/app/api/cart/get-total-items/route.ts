import { NextRequest, NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { connectToDatabase } from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: "Missing userId" }), {
      status: 400,
    });
  }

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return new NextResponse(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
      });
    }

    const totalItems = cart?.products.length;

    return new NextResponse(
      JSON.stringify({
        message: "Total items fetched successfully.",
        totalItems,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", totalItems: 0 }),
      { status: 500 }
    );
  }
}
