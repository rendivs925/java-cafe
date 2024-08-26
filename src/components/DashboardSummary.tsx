import React from "react";
import DashboardSummaryItemsList from "./DashboardSummaryItemsList";
import { getDashboardSummaryAction } from "@/actions/getDashboardSummaryAction";

const DashboardSummary = async () => {
  const result = await getDashboardSummaryAction();

  if (result.status !== "success" || !result.data) {
    return <div>Error loading dashboard summary</div>;
  }

  return (
    <DashboardSummaryItemsList
      totalProfit={result.data.totalProfit as number}
      totalPesanan={result.data.totalPesanan as number}
      totalPendapatan={result.data.totalPendapatan as number}
      totalPelanggan={result.data.totalPelanggan as number}
    />
  );
};

export default DashboardSummary;
