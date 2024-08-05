import { getCartProductListAction } from "@/actions/getCartProductListAction";
import CartProductCard from "./CartProductCard";
import { ICartProduct } from "@/models/Cart";

export interface CartProductsListProps {
  className?: string;
  userId: string;
}

export default async function CartProductsList({
  className = "",
  userId,
}: CartProductsListProps) {
  const response = await getCartProductListAction(userId);

  const cartProductList = response.cartProductList as ICartProduct[];

  return (
    <ul className={`flex flex-col gap-12 ${className}`}>
      {cartProductList.length !== 0 ? (
        cartProductList.map(({ title, stock, price, imgUrl, qty }) => (
          <CartProductCard
            qty={qty}
            title={title}
            stock={stock}
            price={price}
            imgUrl={imgUrl}
          />
        ))
      ) : (
        <li key="empty">
          <p className="mt-0">
            Keranjang anda masih kosong, silahkan berbelanja dulu..
          </p>
        </li>
      )}
    </ul>
  );
}
