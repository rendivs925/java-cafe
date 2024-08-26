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
import { ProductType } from "./ProductsList";
import Image from "next/image";
import TableCellFormattedDate from "./TableCellFormattedDate";
import TableCellFormattedNumber from "./TableCellFormattedNumber";
import PaginationControls from "./PaginationControls";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "./ui/button";
import DeleteProductButton from "./DeleteProductButton";

const products = [
  {
    item: "Product A",
    productID: "PROD001",
    dateAdded: new Date("2024-06-01T00:00:00Z"),
    price: 3750000, // IDR 3,750,000
    QTY: 10,
  },
  {
    item: "Product B",
    productID: "PROD002",
    dateAdded: new Date("2024-06-10T00:00:00Z"),
    price: 2250000, // IDR 2,250,000
    QTY: 0,
  },
  {
    item: "Product C",
    productID: "PROD003",
    dateAdded: new Date("2024-06-15T00:00:00Z"),
    price: 5250000, // IDR 5,250,000
    QTY: 5,
  },
  {
    item: "Product D",
    productID: "PROD004",
    dateAdded: new Date("2024-06-20T00:00:00Z"),
    price: 6750000, // IDR 6,750,000
    QTY: 8,
  },
  {
    item: "Product E",
    productID: "PROD005",
    dateAdded: new Date("2024-06-25T00:00:00Z"),
    price: 8250000, // IDR 8,250,000
    QTY: 3,
  },
  {
    item: "Product F",
    productID: "PROD006",
    dateAdded: new Date("2024-06-30T00:00:00Z"),
    price: 3000000, // IDR 3,000,000
    QTY: 0,
  },
  {
    item: "Product G",
    productID: "PROD007",
    dateAdded: new Date("2024-07-01T00:00:00Z"),
    price: 4500000, // IDR 4,500,000
    QTY: 7,
  },
];

export default function StockReportTable({
  items,
  totalItemsLength,
  page,
  per_page,
}: {
  items: ProductType[];
  totalItemsLength: number;
  page: string | string[];
  per_page: string | string[];
}) {
  const { formatNumber } = useAppContext();
  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const totalPages = Math.ceil(totalItemsLength / Number(per_page));

  const getStockStatus = (QTY: number): string => {
    if (QTY === 0) return "Out of Stock";
    return "In Stock";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">QTY</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map(
          (
            {
              title,
              createdAt,
              category,
              price,
              description,
              _id,
              stock,
              weight,
              imgUrl,
            },
            index
          ) => (
            <TableRow key={_id.toString()}>
              <TableCell className="flex items-center gap-4">
                <Image
                  src={imgUrl}
                  width={40}
                  height={40}
                  alt={title}
                  objectFit="cover"
                  className="aspect-square"
                />
                {title}
              </TableCell>
              <TableCell>{_id.toString()}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCellFormattedDate createdAt={createdAt} />
              <TableCellFormattedNumber price={price} />
              <TableCell>{weight}g</TableCell>
              <TableCell
                className={stock !== 0 ? "text-green-500" : "text-red-500"}
              >
                {getStockStatus(stock)}
              </TableCell>
              <TableCell className="text-right">{stock}</TableCell>
            </TableRow>
          )
        )}
        <TableRow>
          <TableCell
            className="bg-background text-muted-foreground pb-0"
            colSpan={5}
          >
            Total Items : {totalItemsLength}
          </TableCell>
          <TableCell className="bg-background pb-0" colSpan={5}>
            <PaginationControls
              hasNextPage={Number(page) < totalPages}
              hasPrevPage={start > 0}
              totalItemsLength={totalItemsLength}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
