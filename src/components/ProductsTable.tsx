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
import { MdOutlineEdit } from "react-icons/md";
import { getProductsAction } from "@/actions/getProductsAction";
import TableCellFormattedDate from "./TableCellFormattedDate";
import TableCellFormattedNumber from "./TableCellFormattedNumber";
import PaginationControls from "./PaginationControls";
import DeleteProductButton from "./DeleteProductButton";

export default async function ProductsTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "1";
  const { products, totalProductsLength } = await getProductsAction(
    Number(page),
    Number(per_page)
  );

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const totalPages = Math.ceil(totalProductsLength / Number(per_page));

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
                <Button size="sm" variant="ghost" className="bg-transparent">
                  <MdOutlineEdit className="text-foreground text-lg" />
                </Button>
                <DeleteProductButton
                  filePath={imgUrl}
                  productId={_id.toString()}
                />
              </TableCell>
            </TableRow>
          )
        )}
        <TableRow>
          <TableCell
            className="bg-background text-muted-foreground pb-0"
            colSpan={5}
          >
            Total Items : {totalProductsLength}
          </TableCell>
          <TableCell className="bg-background pb-0" colSpan={5}>
            <PaginationControls
              hasNextPage={Number(page) < totalPages}
              hasPrevPage={start > 0}
              totalItems={totalProductsLength}
              totalProductsLength={totalProductsLength}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
