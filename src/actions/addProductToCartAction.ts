"use server";

import Cart, { ICart } from "@/models/Cart";

export async function addProductToCartAction(body: ICart) {
  try {
    await Cart.create(body);

    return {
      status: "success",
      message: "Cart product added successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error adding cart product.",
    };
  }
}
