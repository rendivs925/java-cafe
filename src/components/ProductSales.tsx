import React from 'react';
import DoughnutChart from "@/components/DoughnutChart"

interface RecentOrdersProps {}

const RecentOrders = (props: RecentOrdersProps) => {
  return <div className="recent-orders text-primary rounded-lg bg-secondary">
    <DoughnutChart/>
  </div>;
};

export default RecentOrders;
