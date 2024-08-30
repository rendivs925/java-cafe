import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { MdOutlineEdit } from "react-icons/md";
import TableCellFormattedDate from "./TableCellFormattedDate";
import PaginationControls from "./PaginationControls";
import { getBlogsAction } from "@/actions/getBlogsAction";

export default async function BlogsTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  const { items, totalItemsLength } = await getBlogsAction(
    Number(page),
    Number(per_page)
  );

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const totalPages = Math.ceil(totalItemsLength / Number(per_page));

  return (
    <Table className="overflow-y-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Blog ID</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map(
          ({ title, createdAt, _id, author, isPublished, tags }, index) => (
            <TableRow key={_id?.toString()} className="w-full">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{_id?.toString()}</TableCell>
              <TableCell>{author.username}</TableCell>
              <TableCell>{tags.join(", ")}</TableCell>
              <TableCell>{`${isPublished}`}</TableCell>
              <TableCellFormattedDate createdAt={createdAt as Date} />
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" className="bg-transparent">
                  <MdOutlineEdit className="text-foreground text-lg" />
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
        <TableRow>
          <TableCell
            className="bg-transparent text-muted-foreground pb-0"
            colSpan={5}
          >
            Total Items : {totalItemsLength}
          </TableCell>
          <TableCell className="bg-secondary pb-0" colSpan={5}>
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
