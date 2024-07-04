'use client'
import React from 'react';
import useAppContext from "@/hooks/useAppContext"

interface DashboardSummaryProps {
  totalEarnings: number;
  totalOrders: number;
  totalSales: number;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ totalEarnings, totalOrders, totalSales }) => {
  const context = useAppContext();

  const summaryData = [
    { label: 'Total Sales', value: context?.formatToRupiah(totalSales) },
    { label: 'Total Earnings', value: context?.formatToRupiah(totalEarnings) },
    { label: 'Total Orders', value: totalOrders },
  ];

  return (
    <div className="bg-gray-100 mt-12 border border-gray-300 rounded-lg">
      <ul className="flex gap-6">
        {summaryData.map((item, index) => (
          <li key={index} className="text-center bg-primary rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
            <p className="text-xl font-bold">{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSummary;
