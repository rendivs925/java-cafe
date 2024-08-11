"use server";
import { getVerifiedToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import DetailPengiriman from "@/models/DetailPengiriman";
import { revalidateTag } from "next/cache";

export async function getUserDetailAction() {
  try {
    const verifiedToken = await getVerifiedToken();
    const userId = verifiedToken?._id;

    await connectToDatabase();

    // Create a new address document
    const detailPengiriman = await DetailPengiriman.findOne({
      userId,
    });

    revalidateTag("/");

    return {
      status: "success",
      message: "Detail pengiriman created successfully!",
      detailPengiriman: {
        alamatLengkap: detailPengiriman.alamatLengkap,
        noHandphone: detailPengiriman.noHandphone,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
