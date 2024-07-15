import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TotalSalesChart from "./TotalSalesChart";
import TotalSalesDescription from "./TotalSalesDescription";

export default function TotalSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mt-0">Sales This Year</CardTitle>
        <TotalSalesDescription />
      </CardHeader>
      <CardContent>
        <TotalSalesChart />
      </CardContent>
    </Card>
  );
}
