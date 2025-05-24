"use server";
import { serializeDocument } from "@/lib/utils";
import { connectToDatabase } from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function getTotalSalesByDateAction() {
  try {
    await connectToDatabase();

    const salesByDate = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalSales: { $sum: "$subtotal" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
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

    const formattedSalesData = salesByDate.map(({ date, totalSales }) => ({
      value: totalSales,
      date: new Date(date),
    }));

    return {
      status: "success",
      data: serializeDocument(formattedSalesData),
    };
  } catch (error) {
    console.error("Error fetching total sales by date:", error);
    return {
      status: "error",
      message: "Error fetching total sales by date",
    };
  }
}
