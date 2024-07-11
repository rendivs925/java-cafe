"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAppContext from "@/hooks/useAppContext";

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

export default function StockReportTable() {
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
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">QTY</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(({ item, dateAdded, price, productID, QTY }) => (
          <TableRow key={productID}>
            <TableCell className="font-medium">{item}</TableCell>
            <TableCell>{productID}</TableCell>
            <TableCell>{formatDate(dateAdded)}</TableCell>
            <TableCell>{formatNumber(price)}</TableCell>
            <TableCell
              className={QTY !== 0 ? "text-green-500" : "text-red-500"}
            >
              {getStockStatus(QTY)}
            </TableCell>
            <TableCell className="text-right">{QTY}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
