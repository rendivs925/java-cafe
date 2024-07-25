import AddProductForm from "@/components/AddProductForm";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardTitle from "@/components/DashboardTitle";
import { type ReactElement } from "react";

export default function AddProduct(): ReactElement {
  return (
    <DashboardContainer>
      <DashboardTitle>Add New Product</DashboardTitle>
      <DashboardContent className="grid grid-cols-2 gap-6">
        <AddProductForm />
      </DashboardContent>
    </DashboardContainer>
  );
}
