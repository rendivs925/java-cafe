import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

interface AlertDialogProductsProps {
  products: {
    productId: string;
    imgUrl: string;
    title: string;
    qty: number;
  }[];
}

export default function AlertDialogProducts({
  products,
}: AlertDialogProductsProps) {
  return (
    <BaseAlertDialog>
      <AlertDialogTrigger>
        <span className="text-green-500">
          <ShoppingBag size={24} />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            Detail Produk
            <AlertDialogAction className="w-min p-0 h-min hover:bg-transparent bg-transparent text-muted-foreground">
              X
            </AlertDialogAction>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ul className="space-y-2">
              {products.map((product) => (
                <li
                  key={product.productId}
                  className="flex items-center justify-between py-2 bg-background rounded-lg"
                >
                  <div className="flex items-center">
                    <Image
                      src={product.imgUrl}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg mr-4"
                    />
                    <span className="font-medium">{product.title}</span>
                  </div>
                  <span className="text-sm font-semibold text-secondary-foreground">
                    x{product.qty}
                  </span>
                </li>
              ))}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </BaseAlertDialog>
  );
}
