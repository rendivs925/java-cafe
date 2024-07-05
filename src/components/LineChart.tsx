"use client"

// components/LineChart.tsx

import React, { useRef, useEffect } from 'react';
import { Chart, ChartData, ChartOptions, LineElement, PointElement, LineController, Filler, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

// Register the required components from Chart.js
Chart.register(LineElement, PointElement, LineController, Filler, Tooltip, Legend, CategoryScale, LinearScale);

interface LineChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'line'> | null>(null); // Store the chart instance

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy the previous chart instance
      }
      // Create a new chart instance
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data,
        options,
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy the chart instance on unmount
      }
    };
  }, [data, options]);

  return <canvas ref={chartRef} className="line-chart chart-canvas bg-secondary rounded-lg"/>;
};

export default LineChart;
