import { type ReactElement } from "react";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import DashboardContent from "@/components/DashboardContent";
import ProductsTable from "@/components/ProductsTable";
import SelectShowing from "@/components/SelectShowing";
import AddProductButton from "@/components/AddProductButton";

export default function Products(): ReactElement {
  return (
    <DashboardContainer>
      <DashboardHeader className="flex justify-between">
        <DashboardTitle>Products</DashboardTitle>
        <div className="flex gap-6">
          <SelectShowing />
          <AddProductButton />
        </div>
      </DashboardHeader>
      <DashboardContent className="bg-background p-6 rounded-lg">
        <ProductsTable />
      </DashboardContent>
    </DashboardContainer>
  );
}
