import DashboardSummary from "@/components/DashboardSummary";
import React from "react";
import TotalSales from "@/components/TotalSales";
import ProductSales from "@/components/ProductSales";
import RecentOrders from "@/components/ProductDelivery";
import StockReport from "@/components/StockReport";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";
import AdminProfileHeader from "@/components/AdminProfileHeader";
import DashboardGreater from "@/components/DashboardGreater";
import { Metadata } from "next";
import { getProductsAction } from "@/actions/getProductsAction";
import { getDashboardSummaryAction } from "@/actions/getDashboardSummaryAction"; // Ensure this import is correct
import { getRecentOrdersAction } from "@/actions/getRecentOrdersAction";
import { INewOrder } from "@/actions/getAllOrdersAction";
import { SearchParams } from "@/types";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
};

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  const [dashboardSummaryItems, productData, recentOrders] = await Promise.all([
    getDashboardSummaryAction(),
    getProductsAction(Number(page), Number(per_page)),
    getRecentOrdersAction(),
  ]);

  const { items, totalItemsLength } = productData;
  const { orders } = recentOrders;

  return (
    <DashboardContainer className="w-full min-h-svh py-12 px-10 overflow-y-auto">
      <DashboardHeader className="flex justify-between">
        <DashboardGreater />
        <AdminProfileHeader />
      </DashboardHeader>
      <DashboardContent className="grid grid-cols-6 gap-6">
        <DashboardSummary result={dashboardSummaryItems} />
        <section className="flex flex-col gap-6 col-span-4">
          <StockReport
            page={page}
            per_page={per_page}
            items={items}
            totalItemsLength={totalItemsLength}
          />
        </section>
        <section className="flex flex-col col-span-2 gap-6">
          {/* <TotalSales /> */}
          {/* <ProductSales /> */}
          <RecentOrders orders={orders as INewOrder[]} />
        </section>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
