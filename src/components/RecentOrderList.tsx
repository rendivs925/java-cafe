"use client";
import { type ReactElement } from "react";
import { CardDescription } from "./ui/card";
import useAppContext from "@/hooks/useAppContext";
import Image from "next/image";

export interface RecentOrderListProps {}

const recentOrdersData = [
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "Product A",
    timeOrdered: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    price: 3750000,
  },
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "Product B",
    timeOrdered: new Date(new Date().getTime() - 5 * 60 * 1000), // 5 minutes ago
    price: 2250000,
  },
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "Product C",
    timeOrdered: new Date(new Date().getTime() - 10 * 1000), // 10 seconds ago
    price: 5250000,
  },
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "Product D",
    timeOrdered: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 1 day ago
    price: 6750000,
  },
  {
    imgUrl: "https://via.placeholder.com/150",
    title: "Product E",
    timeOrdered: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    price: 8250000,
  },
];

export default function RecentOrderList(
  props: RecentOrderListProps
): ReactElement {
  const { formatNumber } = useAppContext();
  function getTimeOrderedString(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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
    <ul className="space-y-4">
      {recentOrdersData.map((order, index) => (
        <li key={index} className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image
              src={order.imgUrl}
              alt={order.title}
              width={64}
              height={64}
            />
            <div className="space-y-1 justify-self-start">
              <h5 className="my-0 py-0 text-lg font-medium text-foreground">
                {order.title}
              </h5>
              <CardDescription className="my-0">
                {`${getTimeOrderedString(order.timeOrdered)}`}
              </CardDescription>
            </div>
          </div>
          <p className="mt-0 text-foreground font-medium">
            {"IDR " + formatNumber(order.price)}
          </p>
        </li>
      ))}
    </ul>
  );
}
