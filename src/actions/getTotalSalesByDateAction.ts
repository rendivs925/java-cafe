"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function getTotalSalesByDateAction() {
  try {
    await connectToDatabase();

    // Aggregate sales data by date
    const salesByDate = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalSales: { $sum: "$subtotal" }, // Sum up the subtotal for each order
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }, // Sort by date
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          totalSales: 1,
          _id: 0,
        },
      },
    ]);

    // Transform the result to match the desired format
    const formattedSalesData = salesByDate.map(({ date, totalSales }) => ({
      value: totalSales,
      date: new Date(date), // Convert ISO string to JavaScript Date object
    }));

    return {
      status: "success",
      data: formattedSalesData,
    };
  } catch (error) {
    console.error("Error fetching total sales by date:", error);
    return {
      status: "error",
      message: "Error fetching total sales by date",
    };
  }
}
