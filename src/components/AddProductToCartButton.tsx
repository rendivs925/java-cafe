"use client";

import { Button } from "@/components/ui/button";
import useAppContext from "@/hooks/useAppContext";
import { IProduct } from "@/models/Product";

interface IAddProductToCartButton {
  product: IProduct;
}

export default function AddProductToCartButton({
  product,
}: IAddProductToCartButton) {
  const { weight, title, stock, price, imgUrl, profit, _id } = product;
  const { addProductToCart } = useAppContext();

  const handleAddToCartClick = () => {
    if (!_id) {
      console.error("Product ID is missing, cannot add to cart");
      return;
    }

    console.log(product);

    addProductToCart({
      productId: _id,
      profit,
      title,
      imgUrl,
      price,
      stock,
      weight,
    });
  };

  return (
    <Button onClick={handleAddToCartClick} size="lg">
      Add to Cart
    </Button>
  );
}
