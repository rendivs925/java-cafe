import EditButton from "@/components/EditButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "./ui/button";
import { MdOutlineEdit } from "react-icons/md";
import TableCellFormattedDate from "./TableCellFormattedDate";
import PaginationControls from "./PaginationControls";
import { getUsersAction } from "@/actions/getUsersAction";
import DeleteUserButton from "./DeleteUserButton";

export default async function UsersTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "1";
  const { items, totalItemsLength } = await getUsersAction(
    Number(page),
    Number(per_page),
  );

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const totalPages = Math.ceil(totalItemsLength / Number(per_page));

  return (
    <Table className="overflow-y-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map(
          ({ _id, imgUrl, role, email, username, createdAt }, index) => (
            <TableRow key={_id.toString()}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="flex items-center gap-4">
                <Image
                  src={imgUrl as string}
                  width={40}
                  height={40}
                  alt={username}
                  objectFit="cover"
                  className="aspect-square"
                />
                {username}
              </TableCell>
              <TableCell>{_id.toString()}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCellFormattedDate createdAt={createdAt as Date} />
              <TableCell className="text-right">
                <DeleteUserButton filePath="" itemId={_id.toString()} />
              </TableCell>
            </TableRow>
          ),
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
