"use client";
import { type ReactElement } from "react";
import useAppContext from "@/hooks/useAppContext";
import { GrAnalytics } from "react-icons/gr";
import { IoCart } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DashboardSummaryItemsListProps {
  totalEarnings: number;
  totalOrders: number;
  totalSales: number;
  totalVisitors: number;
}

export default function DashboardSummaryItemsList({
  totalSales,
  totalEarnings,
  totalOrders,
  totalVisitors,
}: DashboardSummaryItemsListProps): ReactElement {
  const { formatToIDR } = useAppContext();

  const summaryData = [
    {
      label: "Total Sales",
      value: "IDR " + formatToIDR(totalSales),
      icon: <TbReportMoney fontSize="24" />,
    },
    {
      label: "Total Earnings",
      value: "IDR " + formatToIDR(totalEarnings),
      icon: <GrAnalytics fontSize="24" />,
    },
    {
      label: "Total Orders",
      value: totalOrders + " K",
      icon: <IoCart fontSize="24" />,
    },
    {
      label: "Total Visitors",
      value: totalVisitors + " K",
      icon: <IoCart fontSize="24" />,
    },
  ];

  return (
    <>
      <ul className="dashboard-summary grid grid-cols-responsive gap-6">
        {summaryData.map((item, index) => (
          <li key={index} className="text-left w-full bg-background rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle className="mt-0 flex gap-4 items-center">
                  <span className="bg-secondary p-3 rounded-lg">
                    {item.icon}
                  </span>
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="m-0 text-muted-foreground">{item.value}</h4>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
