import React from "react";
import DashboardSummaryItemsList from "./DashboardSummaryItemsList";

export interface IDashboardSummaryItemsSuccess {
  status: string;
  data: {
    totalPesanan: any;
    totalProfit: any;
    totalPendapatan: any;
    totalPelanggan: number;
  };
  message?: undefined;
}

export interface IDashboardSummaryItemsError {
  status: string;
  message: string;
  data?: undefined;
}

const DashboardSummary = async ({
  result,
}: {
  result: IDashboardSummaryItemsSuccess | IDashboardSummaryItemsError;
}) => {
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
