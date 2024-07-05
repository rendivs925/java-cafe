import DashboardSummary from "@/components/DashboardSummary";
import Statistic from "@/components/Statistic";
import ProductSales from "@/components/ProductSales";
import React from "react";

const page = () => {
  return (
    <section className="w-full py-12 px-10">
      <div className="pt-[12px]">
        <h2 className="mt-0 pb-0">Dashboard</h2>
      </div>
      <div className="w-full mt-12 overflow-x-hidden dashboard-layout gap-6">
        <DashboardSummary
          totalEarnings={10000000}
          totalOrders={200}
          totalSales={20000000}
        />
        <ProductSales />
        <Statistic />
      </div>
    </section>
  );
};

export default page;
