"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import Cart, { ICart, ICartProduct } from "@/models/Cart";
import { ClientSession } from "mongoose";
import { revalidateTag } from "next/cache";

export async function addProductToCartAction(body: ICart) {
  const session: ClientSession = await connectToDatabase();
  session.startTransaction();

  try {
    const myCart = await Cart.findOne({ userId: body.userId }).session(session);

    if (!myCart) {
      await Cart.create([body], { session });

      await session.commitTransaction();

      revalidateTag("/cart");

      return {
        status: "success",
        totalItems: body.products.length,
        message: "Cart created and product added successfully.",
      };
    }

    const updatedProducts = myCart.products.map(
      (existingProduct: ICartProduct) => {
        const newProduct = body.products.find(
          (product) => product.productId === existingProduct.productId,
        );

        if (newProduct) {
          existingProduct.qty =
            (existingProduct.qty || 1) + (newProduct.qty || 1);
        }

        return existingProduct;
      },
    );

    body.products.forEach((newProduct) => {
      if (
        !myCart.products.some(
          (existingProduct) =>
            existingProduct.productId === newProduct.productId,
        )
      ) {
        updatedProducts.push(newProduct);
      }
    });

    await Cart.updateOne(
      { userId: body.userId },
      { $set: { products: updatedProducts } },
      { session },
    );

    await session.commitTransaction();

    revalidateTag("/cart");

    return {
      status: "success",
      totalItems: updatedProducts.length,
      message: "Cart product added successfully.",
    };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    if (session.inTransaction()) {
      try {
        await session.abortTransaction();
      } catch (abortError) {
        console.error("Error aborting transaction:", abortError);
      }
    }

    return {
      status: "error",
      totalItems: 0,
      message: "Error adding cart product.",
    };
  } finally {
    session.endSession();
  }
}
