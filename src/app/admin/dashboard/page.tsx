import DashboardSummary from "@/components/DashboardSummary";
import React from "react";
import TotalSales from "@/components/TotalSales";
import ProductSales from "@/components/ProductSales";
import RecentOrders from "@/components/ProductDelivery";
import StockReport from "@/components/StockReport";

const page = () => {
  return (
    <section className="w-full min-h-svh py-12 px-10 overflow-y-auto">
      <div className="pt-[12px]">
        <h2 className="mt-0 pb-0">Dashboard</h2>
      </div>
      <div className="w-full mt-12 overflow-visible grid grid-cols-dashboardLayout gap-6">
        <DashboardSummary />
        <section className="flex flex-col gap-6">
          <TotalSales />
          <StockReport />
        </section>
        <section className="flex flex-col gap-6">
          <ProductSales />
          <RecentOrders />
        </section>
      </div>
    </section>
  );
};

export default page;
