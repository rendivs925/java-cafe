"use client";
import React from "react";
import useAppContext from "@/hooks/useAppContext";
import { GrAnalytics } from "react-icons/gr";
import { IoCart } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";

interface DashboardSummaryProps {
  totalEarnings: number;
  totalOrders: number;
  totalSales: number;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  totalEarnings,
  totalOrders,
  totalSales,
}) => {
  const context = useAppContext();

  if (!context) throw new Error("Context is null");

  const { formatToRupiah } = context;

  const summaryData = [
    { label: "Total Sales", value: formatToRupiah(totalSales), icon: <TbReportMoney fontSize="24" /> },
    { label: "Total Earnings", value: formatToRupiah(totalEarnings), icon: <GrAnalytics fontSize="24" />  },
    { label: "Total Orders", value: totalOrders + " k", icon: <IoCart fontSize="24" /> },
  ];

  return (
    <div className="dashboard-summary bg-gray-100 w-full border border-gray-300 rounded-lg">
      <ul className="grid grid-cols-responsive gap-6">
        {summaryData.map((item, index) => (
          <li
            key={index}
            className="text-left w-full bg-primary rounded-lg p-5"
          >
            <h4 className="mt-0 mb-6 flex gap-4 items-center"><span className="bg-secondary p-3 rounded-lg">{item.icon}</span>{item.label}</h4>
            <h4 className="m-0 text-muted-foreground">{item.value}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSummary;
