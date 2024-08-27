import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatToRupiah } from "@/lib/formatToRupiah";
import { IOrderProduct } from "@/models/Order";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

interface AlertDialogProductsProps {
  products: IOrderProduct[];
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
              <IoMdClose />
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
                      width={64}
                      height={64}
                      objectFit="cover"
                      className="aspect-square rounded-lg mr-4"
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="font-medium text-primary">
                        {product.title}
                      </span>
                      <span className="font-normal text-sm">
                        {formatToRupiah(product.totalPrice)}
                      </span>
                    </div>
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
