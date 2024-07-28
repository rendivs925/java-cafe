import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { getProductsAction } from "@/actions/getProductsAction";
import TableCellFormattedDate from "./TableCellFormattedDate";
import TableCellFormattedNumber from "./TableCellFormattedNumber";
import PaginationControls from "./PaginationControls";

export default async function ProductsTable() {
  const products = await getProductsAction();

  const getStockStatus = (stock: number): string => {
    if (stock === 0) return "Out of Stock";
    return "In Stock";
  };

  return (
    <Table className="overflow-y-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map(
          (
            {
              title,
              createdAt,
              category,
              price,
              description,
              _id,
              stock,
              imgUrl,
            },
            index
          ) => (
            <TableRow key={_id.toString()}>
              <TableCell>{index + 1}</TableCell>
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
              <TableCell className="max-w-[40ch]">{description}</TableCell>
              <TableCell>{_id.toString()}</TableCell>
              <TableCellFormattedDate createdAt={createdAt} />
              <TableCellFormattedNumber price={price} />
              <TableCell>{category}</TableCell>
              <TableCell
                className={stock !== 0 ? "text-green-500" : "text-red-500"}
              >
                {getStockStatus(stock)}
              </TableCell>
              <TableCell>{stock}</TableCell>
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
        <TableRow>
          <TableCell
            className="bg-background text-muted-foreground pb-0"
            colSpan={4}
          >
            Total Items : {products.length}
          </TableCell>
          <TableCell className="bg-background pb-0" colSpan={4}>
            <PaginationControls />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
