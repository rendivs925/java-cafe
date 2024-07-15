"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAppContext from "@/hooks/useAppContext";
import { Button } from "./ui/button";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

const products = [
  {
    item: "Product A",
    productID: "PROD001",
    dateAdded: new Date("2024-06-01T00:00:00Z"),
    price: 3750000, // IDR 3,750,000
    QTY: 10,
    image: "https://via.placeholder.com/150", // Image placeholder
  },
  {
    item: "Product B",
    productID: "PROD002",
    dateAdded: new Date("2024-06-10T00:00:00Z"),
    price: 2250000, // IDR 2,250,000
    QTY: 0,
    image: "https://via.placeholder.com/150", // Image placeholder
  },
  {
    item: "Product C",
    productID: "PROD003",
    dateAdded: new Date("2024-06-15T00:00:00Z"),
    price: 5250000, // IDR 5,250,000
    QTY: 5,
    image: "https://via.placeholder.com/150", // Image placeholder
  },
  {
    item: "Product D",
    productID: "PROD004",
    dateAdded: new Date("2024-06-20T00:00:00Z"),
    price: 6750000, // IDR 6,750,000
    QTY: 8,
    image: "https://via.placeholder.com/150", // Image placeholder
  },
  {
    item: "Product E",
    productID: "PROD005",
    dateAdded: new Date("2024-06-25T00:00:00Z"),
    price: 8250000, // IDR 8,250,000
    QTY: 3,
    image: "https://via.placeholder.com/150", // Image placeholder
  },
  {
    item: "Product F",
    productID: "PROD006",
    dateAdded: new Date("2024-06-30T00:00:00Z"),
    price: 3000000, // IDR 3,000,000
    QTY: 0,
    image: "https://via.placeholder.com/150", // Image placeholder
  },
  {
    item: "Product G",
    productID: "PROD007",
    dateAdded: new Date("2024-07-01T00:00:00Z"),
    price: 4500000, // IDR 4,500,000
    QTY: 7,
    image: "https://via.placeholder.com/150", // Image placeholder
  },
];

export default function ProductsTable() {
  const { formatNumber } = useAppContext();
  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const getStockStatus = (QTY: number): string => {
    if (QTY === 0) return "Out of Stock";
    return "In Stock";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>QTY</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(
          ({ item, dateAdded, price, productID, QTY, image }, index) => (
            <TableRow key={productID}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Image src={image} width={40} height={40} alt={item} />
                {item}
              </TableCell>
              <TableCell>{productID}</TableCell>
              <TableCell>{formatDate(dateAdded)}</TableCell>
              <TableCell>{formatNumber(price)}</TableCell>
              <TableCell
                className={QTY !== 0 ? "text-green-500" : "text-red-500"}
              >
                {getStockStatus(QTY)}
              </TableCell>
              <TableCell>{QTY}</TableCell>
              <TableCell className="space-x-4 text-right">
                <Button size="icon" className="bg-transparent">
                  <MdOutlineEdit className="text-foreground text-lg" />
                </Button>
                <Button size="icon" className="bg-transparent">
                  <RiDeleteBin6Line className="text-destructive text-lg" />
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
