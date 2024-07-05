"use client"

import React from 'react';
import LineChart from "@/components/LineChart"
import { ChartData, ChartOptions } from 'chart.js';

interface StatisticProps {}

const Statistic = (props: StatisticProps) => {
 // Define the data for the line chart
  const data: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [30, 45, 55, 10, 70, 80, 90],
        borderColor: 'rgba(75, 192, 192, 1)',  // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Fill color
        fill: true,  // Set to true for fill below the line
        tension: 0.1,  // Curve the line
      },
    ],
  };

  // Define the options for the line chart
  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'category',  // Ensure the 'category' scale is used for x-axis
        beginAtZero: true,
      },
      y: {
        type: 'linear',  // Ensure the 'linear' scale is used for y-axis
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
  };
  return (
  <LineChart data={data} options={options}/>
  )
};

export default Statistic;
