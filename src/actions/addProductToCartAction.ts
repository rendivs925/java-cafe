"use server";

import Cart, { ICart } from "@/models/Cart";

export async function addProductToCartAction(body: ICart) {
  try {
    await Cart.create(body);

    console.log("Cart product added successfully.");

    return {
      status: "success",
      message: "Cart product added successfully.",
    };
  } catch (error) {
    console.log("Error adding cart product.");

    return {
      status: "error",
      message: "Error adding cart product.",
    };
  }
}
