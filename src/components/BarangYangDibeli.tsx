import { type ReactElement } from "react";
import Line from "./Line";
import BarangYangDibeliCard from "./BarangYangDibeliCard";
import { ICart } from "@/models/Cart";

export interface BarangYangDibeliProps {
  cart: ICart;
}

export default function BarangYangDibeli({
  cart,
}: BarangYangDibeliProps): ReactElement {
  return (
    <div className="mt-14">
      <Line />
      <h2 className="my-6">Barang Yang di Beli</h2>
      <Line />
      <ul className="mt-14 flex flex-wrap gap-12 w-max">
        {cart.products.map(
          ({ productId, title, imgUrl, price, qty, stock }, index) => (
            <BarangYangDibeliCard
              title={title}
              productId={productId}
              imgUrl={imgUrl}
              price={price}
              qty={qty as number}
              stock={stock}
              key={index}
            />
          )
        )}
      </ul>
    </div>
  );
}
