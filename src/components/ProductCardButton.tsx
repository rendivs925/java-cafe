import { memo } from "react"
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

type ProductCardButtonProps = {
  _id: string;
  profit: number;
  title: string;
  imgUrl: string;
  price: number;
  stock: number;
  weight: number;
};

function ProductCardButton({
  _id,
  profit,
  title,
  imgUrl,
  price,
  stock,
  weight,
}: ProductCardButtonProps) {
  const { addProductToCart } = useAppContext();

  const handleAddToCartClick = () => {
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
    <Button onClick={handleAddToCartClick} variant="link" className="underline">
      <h3>Add to Cart</h3>
    </Button>
  );
}

export default memo(ProductCardButton);
