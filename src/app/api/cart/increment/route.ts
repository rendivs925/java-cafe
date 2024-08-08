import { NextRequest, NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { connectToDatabase } from "@/lib/dbConnect";
import mongoose, { ClientSession } from "mongoose";
import { COOKIE_NAME } from "@/constanst";
import { UserJwtPayload, verifyAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  // Verify the JWT token
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log("Verification error:", err);
      return null; // Explicitly return null in case of error
    }));

  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      await session.abortTransaction();

      return new NextResponse(
        JSON.stringify({ message: "Missing userId or productId" }),
        { status: 400 }
      );
    }

    // Check if the authenticated user is trying to modify their own cart
    if (userId !== (verifiedToken as UserJwtPayload)?._id) {
      await session.abortTransaction();
      return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    await connectToDatabase();

    const cart = await Cart.findOne({ userId }).session(session);

    if (!cart) {
      await session.abortTransaction();

      return new NextResponse(JSON.stringify({ message: "Cart not found" }), {
        status: 404,
      });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      await session.abortTransaction();

      return new NextResponse(
        JSON.stringify({ message: "Product not found in cart" }),
        { status: 404 }
      );
    }

    const selectedProduct = cart.products[itemIndex];

    if ((selectedProduct as { qty: number }).qty < selectedProduct.stock) {
      (selectedProduct as { qty: number }).qty += 1;
    }

    await cart.save({ session });

    await session.commitTransaction();

    return new NextResponse(
      JSON.stringify({ message: "Cart updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();

    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
