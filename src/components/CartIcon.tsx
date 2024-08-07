import { useEffect, useState, type ReactElement } from "react";
import { IoCart } from "react-icons/io5";
import Link from "next/link";
import useClientComponent from "@/hooks/useClientComponent";
import useAppContext from "@/hooks/useAppContext";
import axios from "axios";

export default function CartIcon(): ReactElement {
  const { user } = useAppContext();
  const [totalItems, setTotalItems] = useState<number>(0);
  const isClient = useClientComponent();

  useEffect(() => {
    const getTotalItems = async () => {
      const response = await axios.get("/api/cart/get-total-items", {
        params: {
          userId: user._id,
        },
      });

      setTotalItems(response.data.totalItems);
    };

    getTotalItems();
  }, []);

  return (
    <>
      {isClient ? (
        <Link
          href={`/cart/?user_id=${user._id}`}
          className="relative hover:after:w-0"
        >
          <IoCart className="text-2xl relative" />
          {totalItems !== 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      ) : (
        <Link href="/cart" className="relative hover:after:w-0">
          <IoCart className="text-2xl relative" />
        </Link>
      )}
    </>
  );
}
