import { type ReactElement } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ConfirmationPage(): ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="">
        <CardHeader>
          <CardTitle className="">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="m-0">
            Thank you for your purchase. Your order is being processed.
          </p>
        </CardContent>
        <CardFooter>
          <Link
            className="text-primary hover:after:hidden hover:underline"
            href="/"
          >
            Go back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
