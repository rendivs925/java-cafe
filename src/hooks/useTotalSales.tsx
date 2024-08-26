import { ChartConfig } from "@/components/ui/chart";
import useAppContext from "./useAppContext";
import { useEffect, useState } from "react";
import { getTotalSalesByDateAction } from "@/actions/getTotalSalesByDateAction";

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export default function useTotalSales() {
  const { getTotalSalesData, formatNumber } = useAppContext();
  const [filteredData, setFilteredData] = useState<
    { value: number; date: Date }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch total sales data
    async function fetchTotalSales() {
      try {
        const response = await getTotalSalesByDateAction();

        if (response.status === "success") {
          const data = response.data;

          // Assuming getTotalSalesData processes and formats the data correctly
          const filtered = getTotalSalesData(data);

          setFilteredData(filtered);
        } else {
          console.error("Failed to fetch total sales data:", response.message);
          setError(response.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching total sales data:", error);
        setError("An error occurred while fetching total sales data");
      } finally {
        setLoading(false);
      }
    }

    fetchTotalSales();
  }, [getTotalSalesData]);

  return {
    filteredData,
    formatNumber,
    chartConfig,
    loading,
    error,
  };
}
