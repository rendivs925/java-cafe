import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import deleteProductAction from "@/actions/deleteProductAction";
import EditButton from "@/components/EditButton";
import ViewDetailButton from "@/components/ViewDetailButton";
import DeleteButton from "./DeleteButton";
import Image from "next/image";
import { getProductsAction } from "@/actions/getProductsAction";
import TableCellFormattedDate from "./TableCellFormattedDate";
import TableCellFormattedNumber from "./TableCellFormattedNumber";
import PaginationControls from "./PaginationControls";
import type { SearchParams } from "@/types"; // Importing types
import { newAddProductType } from "@/schemas/AddProductSchema";

function getStockStatus(stock: number): string {
  return stock === 0 ? "Out of Stock" : "In Stock";
}

export default async function ProductsTable({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = Number(searchParams["page"] ?? "1");
  const perPage = Number(searchParams["per_page"] ?? "5");

  const { items, totalItemsLength } = await getProductsAction(page, perPage);

  const totalPages = Math.ceil(totalItemsLength / perPage);
  const start = (page - 1) * perPage;

  return (
    <Table className="overflow-y-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Item</TableHead>
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
        {items?.map((product: newAddProductType, index: number) => (
          <ProductRow
            key={product._id}
            product={product}
            index={index}
            startIndex={start}
          />
        ))}
        <TableRow className="bg-background">
          <TableCell
            className="bg-background text-muted-foreground pb-0"
            colSpan={5}
          >
            Total Items: {totalItemsLength}
          </TableCell>
          <TableCell className="bg-background pb-0" colSpan={5}>
            <PaginationControls
              hasNextPage={page < totalPages}
              hasPrevPage={start > 0}
              totalItemsLength={totalItemsLength}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

type ProductRowProps = {
  product: newAddProductType;
  index: number;
  startIndex: number;
};

function ProductRow({ product, index, startIndex }: ProductRowProps) {
  const { _id, title, createdAt, category, price, stock, imgUrl } = product;

  return (
    <TableRow key={_id}>
      <TableCell>{startIndex + index + 1}</TableCell>
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
      <TableCell>{_id}</TableCell>
      <TableCellFormattedDate createdAt={createdAt as Date} />
      <TableCellFormattedNumber price={price} />
      <TableCell>{category}</TableCell>
      <TableCell className={stock !== 0 ? "text-green-500" : "text-red-500"}>
        {getStockStatus(stock)}
      </TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell className="text-right">
        <ViewDetailButton path={`/products/${_id}`} />
        <EditButton endpoint={"products"} path={`productId=${_id}`} />
        <DeleteButton
          filePath={imgUrl}
          action={deleteProductAction}
          itemId={_id as string}
        />
      </TableCell>
    </TableRow>
  );
}
