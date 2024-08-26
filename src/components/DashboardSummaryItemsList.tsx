"use client";
import { type ReactElement } from "react";
import { GrAnalytics } from "react-icons/gr";
import { IoCart } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegUser } from "react-icons/fa";
import { formatToRupiah } from "@/lib/formatToRupiah";

export interface DashboardSummaryItemsListProps {
  totalProfit: number;
  totalPesanan: number;
  totalPendapatan: number;
  totalPelanggan: number;
}

export default function DashboardSummaryItemsList({
  totalPendapatan,
  totalProfit,
  totalPesanan,
  totalPelanggan,
}: DashboardSummaryItemsListProps): ReactElement {
  const summaryData = [
    {
      label: "Total Pendapatan",
      value: formatToRupiah(totalPendapatan),
      icon: <TbReportMoney />,
    },
    {
      label: "Total Profit",
      value: formatToRupiah(totalProfit),
      icon: <GrAnalytics />,
    },
    {
      label: "Total Pesanan",
      value: totalPesanan,
      icon: <IoCart />,
    },
    {
      label: "Total Pelanggan",
      value: totalPelanggan,
      icon: <FaRegUser />,
    },
  ];

  return (
    <>
      <ul className="col-span-full grid grid-cols-responsive gap-6">
        {summaryData.map((item, index) => (
          <li key={index} className="text-left w-full bg-background rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle className="mt-0 flex gap-4 items-center">
                  <span className="bg-secondary text-2xl p-3 rounded-lg">
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
