"use client";
import { useEffect, useState, type ReactElement } from "react";
import CartProductsList from "./CartProductsList";
import OrderSummary from "./OrderSummary";
import { ICart } from "@/models/Cart";
import WorkerBuilder from "@/worker/workerBuilder";
import getUserCartWorker from "@/worker/getUserCartWorker";
import { BASE_URL } from "@/constanst";

export default function CartContent(): ReactElement {
  const [optimisticCart, setOptimisticCart] = useState<ICart>({
    userId: "",
    products: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize worker and send the base URL
    const worker = WorkerBuilder(getUserCartWorker);
    worker.postMessage({ BASE_URL });

    worker.onmessage = (event) => {
      const { success, result, error } = event.data;
      if (success) {
        console.log("Result:", result);
        setOptimisticCart(result.cart);
        setLoading(false); // Set loading to false when data is received
      } else {
        console.error("Failed to fetch products:", error);
        setError(error || "Unknown error occurred");
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    worker.onerror = (error) => {
      console.error("Worker error:", error.message);
      setError(error.message);
      setLoading(false); // Set loading to false on worker error
    };

    // Cleanup worker on component unmount
    return () => {
      worker.terminate();
    };
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>; // Show a loading state
  // }
  //
  // if (error) {
  //   return <div>Error: {error}</div>; // Show an error message
  // }
  //
  // Render JSX if data is successfully fetched
  return (
    <div className="container mt-14 grid gap-navbar md:grid-cols-cart">
      <div className="w-full">
        <CartProductsList
          setOptimisticCart={setOptimisticCart}
          optimisticCart={optimisticCart}
        />
      </div>
      <div className="w-full">
        <OrderSummary optimisticCart={optimisticCart} />
      </div>
    </div>
  );
}
