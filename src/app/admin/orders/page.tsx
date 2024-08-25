import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/components/PaginationControls";
import { formatToRupiah } from "@/lib/formatToRupiah";
import { getShipmentStatusClass } from "@/lib/getShipmentStatusClass";
import AlertDialogProducts from "@/components/AlertDialogProducts";
import { getAllOrdersAction } from "@/actions/getAllOrdersAction";
import SelectShowing from "@/components/SelectShowing";
import EditResi from "@/components/EditResi";

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  const { items, totalItemsLength } = await getAllOrdersAction(
    Number(page),
    Number(per_page)
  );

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const totalPages = Math.ceil(totalItemsLength / Number(per_page));

  return (
    <DashboardContainer>
      <DashboardHeader className="flex justify-between">
        <DashboardTitle>Orders</DashboardTitle>
        <SelectShowing />
      </DashboardHeader>
      <DashboardContent className="bg-background p-6 rounded-lg">
        <Table className="overflow-y-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead className="text-center">Detail</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Layanan</TableHead>
              <TableHead>Ongkir</TableHead>
              <TableHead>Pengiriman</TableHead>
              <TableHead>No HP</TableHead>
              <TableHead className="text-center">Resi</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map(
              ({
                orderId,
                address,
                phone,
                products,
                user,
                shippingCost,
                orderStatus,
                layanan,
                resi,
              }) => (
                <TableRow key={orderId}>
                  <TableCell>{orderId}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell className="text-center">
                    <AlertDialogProducts products={products} />
                  </TableCell>
                  <TableCell>{address}</TableCell>
                  <TableCell>{layanan.name}</TableCell>
                  <TableCell>{formatToRupiah(String(shippingCost))}</TableCell>
                  <TableCell>
                    {
                      <p
                        className={`${getShipmentStatusClass(
                          orderStatus as "processing" | "delivered"
                        )} m-0 text-center`}
                      >
                        {orderStatus}
                      </p>
                    }
                  </TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell className="text-center">{resi || "-"}</TableCell>
                  <TableCell className="text-right">
                    <EditResi orderId={orderId} />
                  </TableCell>
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
      </DashboardContent>
    </DashboardContainer>
  );
}
