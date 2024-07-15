import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import DashboardContent from "@/components/DashboardContent";
import ProductsTable from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import SelectShowing from "@/components/SelectShowing";
export interface ProductsProps {}

export default function Products(props: ProductsProps): ReactElement {
  return (
    <DashboardContainer>
      <DashboardHeader className="flex justify-between">
        <DashboardTitle>Products</DashboardTitle>
        <div className="flex gap-6">
          <SelectShowing />
          <Button size="lg">Add New Product</Button>
        </div>
      </DashboardHeader>
      <DashboardContent className="bg-background p-6 rounded-lg">
        <ProductsTable />
      </DashboardContent>
    </DashboardContainer>
  );
}
