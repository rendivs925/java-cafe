// app/api/user-cart/route.ts
import { getVerifiedToken, UserJwtPayload } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { ClientSession } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  const session: ClientSession = await connectToDatabase();
  session.startTransaction();

  try {
    const verifiedToken = await getVerifiedToken();

    const userId = (verifiedToken as UserJwtPayload)?._id;

    if (!userId) {
      await session.abortTransaction();
      return NextResponse.json(
        {
          status: "error",
          message: "User ID is required",
          cart: { userId: "", products: [] },
        },
        { status: 400 }
      ); // Bad Request
    }

    const cart = await Cart.findOne({ userId }).session(session).lean();

    await session.commitTransaction();

    return NextResponse.json(
      {
        cart: cart || { userId: "", products: [] },
      },
      { status: 200 }
    ); // OK
  } catch (error) {
    await session.abortTransaction();
    return NextResponse.json(
      {
        message: "Error fetching cart list",
        cart: { userId: "", products: [] },
      },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
