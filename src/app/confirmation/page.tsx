import { type ReactElement } from "react";
import Link from "next/link";

export default function ConfirmationPage(): ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link href="/">
          <a className="text-blue-500 hover:underline">Go back to Home</a>
        </Link>
      </div>
    </div>
  );
}
