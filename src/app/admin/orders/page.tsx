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
import { PaymentStatus } from "@/types";
import { getPaymentStatusClass } from "@/lib/getPaymentStatusClass";
import { updateOrderDetailsAction } from "@/components/updateOrderDetailsAction";

const handleSyncOrder = async (orderId: string) => {
  try {
    await updateOrderDetailsAction({ orderId });
    console.log("Order synced successfully.");
  } catch (error) {
    console.log(
      `Failed to sync order: ${(error as { message: string }).message || error}`,
    );
  }
};

const OrdersTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Pelanggan</TableHead>
      <TableHead className="text-center">Detail</TableHead>
      <TableHead>Alamat</TableHead>
      <TableHead>Layanan</TableHead>
      <TableHead>Ongkir</TableHead>
      <TableHead>Pengiriman</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>No HP</TableHead>
      <TableHead className="text-center">Resi</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
);

const OrdersTableRow = ({
  orderId,
  user,
  address,
  phone,
  products,
  shippingCost,
  orderStatus,
  layanan,
  paymentStatus,
  resi,
}: any) => (
  <TableRow key={orderId}>
    <TableCell>{user.username}</TableCell>
    <TableCell className="text-center">
      <AlertDialogProducts products={products} />
    </TableCell>
    <TableCell>{address}</TableCell>
    <TableCell>{layanan.name}</TableCell>
    <TableCell>{formatToRupiah(String(shippingCost))}</TableCell>
    <TableCell>
      <p className={`${getShipmentStatusClass(orderStatus)} m-0 text-center`}>
        {orderStatus}
      </p>
    </TableCell>
    <TableCell>
      <p
        className={`${getPaymentStatusClass(
          paymentStatus as PaymentStatus,
        )} m-0 text-center`}
      >
        {paymentStatus}
      </p>
    </TableCell>
    <TableCell>{phone}</TableCell>
    <TableCell className="text-center">{resi || "-"}</TableCell>
    <TableCell className="text-right">
      <EditResi orderId={orderId} disabled={paymentStatus === "expire"} />
    </TableCell>
  </TableRow>
);

export default async function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "5");
  const { items, totalItemsLength } = await getAllOrdersAction(page, per_page);

  const totalPages = Math.ceil(totalItemsLength / per_page);

  return (
    <DashboardContainer>
      <DashboardHeader className="flex justify-between">
        <DashboardTitle>Orders</DashboardTitle>
        <SelectShowing />
      </DashboardHeader>
      <DashboardContent className="bg-background shadow p-6 rounded-lg">
        <Table className="overflow-y-hidden">
          <OrdersTableHeader />
          <TableBody>
            {items?.map(async (item) => {
              await handleSyncOrder(item.orderId);
              return <OrdersTableRow key={item.orderId} {...item} />;
            })}
            <TableRow>
              <TableCell
                className="bg-transparent text-muted-foreground pb-0"
                colSpan={5}
              >
                Total Items: {totalItemsLength}
              </TableCell>
              <TableCell className="bg-transparent pb-0" colSpan={5}>
                <PaginationControls
                  hasNextPage={page < totalPages}
                  hasPrevPage={page > 1}
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
