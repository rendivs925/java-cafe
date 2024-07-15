import { ChartData } from "@/types";
import { CardDescription } from "./ui/card";
import ProductSalesPrice from "./ProductSalesPrice";

export default function ProductSalesList({
  chartData,
}: {
  chartData: ChartData[];
}) {
  return (
    <ul className="w-full order-2 space-y-1.5 place-self-start mt-4">
      {chartData.map((data) => (
        <li
          className="grid gap-4 grid-cols-productSalesDetail items-center"
          key={data.product}
        >
          <div
            style={{ background: data.color }}
            className="h-4 w-9 rounded-lg"
          ></div>
          <CardDescription className="mt-0">{data.name}</CardDescription>
          <ProductSalesPrice price={data.totalSales} />
        </li>
      ))}
    </ul>
  );
}
