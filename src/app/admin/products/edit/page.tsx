import EditProductForm from "@/components/EditProductForm";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { SearchParams } from "@/types";
import getProductByIdAction from "@/actions/getProductByIdAction";
import { AddProductType } from "@/schemas/AddProductSchema";

export default async function EditProductPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const productId = searchParams["productId"] ?? "";
  const response = await getProductByIdAction(productId as string);
  const product = response.item;

  return (
    <DashboardContainer>
      <DashboardHeader className="container">
        <DashboardTitle>Edit Product</DashboardTitle>
      </DashboardHeader>
      <DashboardContent className="container grid items-start grid-cols-addNewProduct gap-6">
        <EditProductForm product={product as AddProductType} />
      </DashboardContent>
    </DashboardContainer>
  );
}
