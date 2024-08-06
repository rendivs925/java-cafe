"use server";

import Cart, { ICart, ICartProduct } from "@/models/Cart";

export async function addProductToCartAction(body: ICart) {
  try {
    // Find the existing cart for the user
    const myCart = await Cart.findOne({ userId: body.userId }).lean();

    if (!myCart) {
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
            existingProduct.qty += newProduct.qty;
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
        { products: updatedProducts }
      );
    }

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
