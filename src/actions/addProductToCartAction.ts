"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import Cart, { ICart, ICartProduct } from "@/models/Cart";
import { ClientSession } from "mongoose";
import { revalidateTag } from "next/cache";

export async function addProductToCartAction(body: ICart) {
  const session: ClientSession = await connectToDatabase();
  session.startTransaction();

  try {
    // Find the existing cart for the user
    const myCart = await Cart.findOne({ userId: body.userId }).session(session);

    if (!myCart) {
      await session.abortTransaction();

      // If no cart exists, create a new one
      await Cart.create(body);
    } else {
      // Update the existing cart
      const updatedProducts = myCart.products.map(
        (existingProduct: ICartProduct) => {
          // Check if the product in the cart is the same as the one being added
          const newProduct = body.products.find(
            (product) => product.productId === existingProduct.productId
          );

          if (newProduct) {
            // If product already exists, update the quantity
            existingProduct.qty =
              (existingProduct.qty || 1) + (newProduct.qty || 1);
          }

          return existingProduct;
        }
      );

      // Add new products that are not in the existing cart
      body.products.forEach((newProduct) => {
        if (
          !myCart.products.some(
            (existingProduct) =>
              existingProduct.productId === newProduct.productId
          )
        ) {
          updatedProducts.push(newProduct);
        }
      });

      await Cart.updateOne(
        { userId: body.userId },
        { $set: { products: updatedProducts } },
        { session }
      );

      revalidateTag("/cart");

      await session.commitTransaction();

      return {
        status: "success",
        totalItems: updatedProducts.length,
        message: "Cart product added successfully.",
      };
    }
  } catch (error) {
    await session.abortTransaction();

    console.log(error);

    return {
      status: "error",
      totalItems: 0,
      message: "Error adding cart product.",
    };
  } finally {
    session.endSession();
  }
}
