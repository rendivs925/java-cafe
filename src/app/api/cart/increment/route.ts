import { NextRequest, NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { connectToDatabase } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return new NextResponse(
        JSON.stringify({ message: "Missing userId or productId" }),
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return new NextResponse(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
      });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found in cart" }),
        { status: 404 }
      );
    }

    const selectedProduct = cart.products[itemIndex];

    if ((selectedProduct as { qty: number }).qty < selectedProduct.stock) {
      (selectedProduct as { qty: number }).qty += 1;
    }

    await cart.save();

    return new NextResponse(
      JSON.stringify({ message: "Cart updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
