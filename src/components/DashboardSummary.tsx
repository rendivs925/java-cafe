import React from "react";
import DashboardSummaryItemsList from "./DashboardSummaryItemsList";

const DashboardSummary = () => {
  return (
    <DashboardSummaryItemsList
      totalEarnings={10000000}
      totalOrders={2000}
      totalSales={20000000}
      totalVisitors={30000}
    />
  );
};

export default DashboardSummary;
