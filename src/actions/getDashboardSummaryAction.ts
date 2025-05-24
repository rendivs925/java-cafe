"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Order from "@/models/Order";
import { serializeDocument } from "@/lib/utils";
import User from "@/models/User";

export async function getDashboardSummaryAction() {
  try {
    await connectToDatabase();

    const [ordersSummary, totalPelanggan] = await Promise.all([
      Order.aggregate([
        {
          $facet: {
            totalPesanan: [{ $count: "count" }],
            totalProfit: [
              { $unwind: "$products" },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$products.profit" },
                },
              },
            ],
            totalPendapatan: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$subtotal" },
                },
              },
            ],
          },
        },
      ]),
      User.countDocuments({ role: "user" }),
    ]);

    const totalPesanan = ordersSummary[0]?.totalPesanan[0]?.count || 0;
    const totalProfit = ordersSummary[0]?.totalProfit[0]?.total || 0;
    const totalPendapatan = ordersSummary[0]?.totalPendapatan[0]?.total || 0;

    return {
      status: "success",
      data: {
        totalPesanan,
        totalProfit,
        totalPendapatan,
        totalPelanggan,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return {
      status: "error",
      message: "Error fetching dashboard summary",
    };
  }
}
