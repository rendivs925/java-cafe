import { memo } from "react";
import { addProductToCartAction } from "@/actions/addProductToCartAction";
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
  const { user, setTotalItems } = useAppContext();

  const addProductToCart = async (product: {
    productId: string;
    profit: number;
    title: string;
    imgUrl: string;
    price: number;
    stock: number;
    weight: number;
  }) => {
    try {
      const data = await addProductToCartAction({
        userId: user._id,
        products: [product],
      });

      setTotalItems((data?.totalItems as number) || 1);

      // if (data?.status === "success") {
      //   toast({ description: data.message });
      // }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleAddToCartClick = () => {
    addProductToCart({
      productId: _id.toString(),
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
