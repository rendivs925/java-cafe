import DashboardSummary from "@/components/DashboardSummary";
import React from "react";
import TotalSales from "@/components/TotalSales";
import ProductSales from "@/components/ProductSales";
import RecentOrders from "@/components/ProductDelivery";
import StockReport from "@/components/StockReport";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";
import SearchBar from "@/components/SearchBar";
import DashboardGreater from "@/components/DashboardGreater";

const page = () => {
  return (
    <DashboardContainer className="w-full min-h-svh py-12 px-10 overflow-y-auto">
      <DashboardHeader className="flex justify-between">
        <DashboardGreater />
        <SearchBar />
      </DashboardHeader>
      <DashboardContent className="grid grid-cols-dashboardLayout gap-6">
        <DashboardSummary />
        <section className="flex flex-col gap-6">
          <TotalSales />
          <StockReport />
        </section>
        <section className="flex flex-col gap-6">
          <ProductSales />
          <RecentOrders />
        </section>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default page;
