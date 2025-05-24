import { Suspense, type ReactElement } from "react";
import type { SearchParams } from "@/types"; // Importing types
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import DashboardContent from "@/components/DashboardContent";
import ProductsTable from "@/components/ProductsTable";
import SelectShowing from "@/components/SelectShowing";
import AddButton from "@/components/AddButton";

export default async function Products(
  props: {
    searchParams: Promise<SearchParams>
  }
): Promise<ReactElement> {
  const searchParams = await props.searchParams;
  return (
    <Suspense>
      <DashboardContainer>
        <DashboardHeader className="flex justify-between">
          <DashboardTitle>Products</DashboardTitle>
          <div className="flex gap-6">
            <SelectShowing />
            <AddButton label="Add New Product" route="/admin/products/add" />
          </div>
        </DashboardHeader>
        <DashboardContent className="bg-background shadow p-6 rounded-lg">
          <ProductsTable searchParams={searchParams} />
        </DashboardContent>
      </DashboardContainer>
    </Suspense>
  );
}
