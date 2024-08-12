import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { ClientSession } from "mongoose";

export async function POST(request: NextRequest) {
  // Parse the JSON body from the request
  const data = await request.json();

  console.log("setcart");

  console.log(data);

  // Start a new session for transaction
  const session: ClientSession = await connectToDatabase();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId: data.userId }).session(session);

    if (!cart) {
      await session.abortTransaction();
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 } // Not Found
      );
    }

    const isError = cart.products.some(
      (product) =>
        (product as { qty: number }).qty < 1 ||
        (product as { qty: number }).qty > product.stock
    );

    if (isError) {
      await session.abortTransaction();
      return NextResponse.json(
        { message: "Invalid product quantities in the cart" },
        { status: 400 } // Bad Request
      );
    }

    // Update the cart products
    cart.products = data.products;
    await cart.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    await new Promise((resolve) => setTimeout(resolve, 20000));

    return NextResponse.json(
      { message: "Cart updated successfully" },
      { status: 200 } // OK
    );
  } catch (error) {
    await session.abortTransaction();
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  } finally {
    session.endSession();
  }
}
