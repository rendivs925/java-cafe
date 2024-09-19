import { type ReactElement } from "react";
import { CardDescription } from "./ui/card";
import Image from "next/image";
import { INewOrder } from "@/actions/getAllOrdersAction";
import { formatToRupiah } from "@/lib/formatToRupiah";

export interface RecentOrderListProps {
  orders: INewOrder[];
}

export default function RecentOrderList({
  orders,
}: RecentOrderListProps): ReactElement {
  function getTimeOrderedString(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000
    );

    if (diffInSeconds < 60) return "just now";

    const minutes = Math.floor(diffInSeconds / 60);
    if (diffInSeconds < 3600)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(diffInSeconds / 3600);
    if (diffInSeconds < 86400)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return (
    <>
      <div>
        <ul className="space-y-4 mt-2">
          {orders?.map((order, index) =>
            order.products.map((product) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <Image
                    className="aspect-square"
                    objectFit="cover"
                    src={product.imgUrl}
                    alt={product.title}
                    width={64}
                    height={64}
                  />
                  <div className="space-y-1 justify-self-start">
                    <h5 className="my-0 py-0 text-lg font-medium text-foreground">
                      {product.title}
                    </h5>
                    <CardDescription className="my-0">
                      {`${getTimeOrderedString(order.createdAt)}`}
                    </CardDescription>
                  </div>
                </div>
                <p className="mt-0 text-foreground font-medium">
                  {formatToRupiah(product.totalPrice)}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
