import AddProductForm from "@/components/AddProductForm";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { type ReactElement } from "react";

export default function AddProduct(): ReactElement {
  return (
    <DashboardContainer>
      <DashboardHeader className="mx-auto px-[150px]">
        <DashboardTitle>Add New Product</DashboardTitle>
      </DashboardHeader>
      <DashboardContent className="mx-auto px-[150px] grid items-start grid-cols-addNewProduct gap-6">
        <AddProductForm />
      </DashboardContent>
    </DashboardContainer>
  );
}
