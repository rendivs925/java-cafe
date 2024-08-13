import { NextResponse } from "next/server";
import { getVerifiedToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import DetailPengiriman from "@/models/DetailPengiriman";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    const verifiedToken = await getVerifiedToken();
    const userId = verifiedToken?._id;

    await connectToDatabase();

    // Retrieve the user's shipping details
    const detailPengiriman = await DetailPengiriman.findOne({
      userId,
    });

    revalidateTag("/");

    if (!detailPengiriman) {
      return NextResponse.json(
        {
          status: "error",
          message: "Detail pengiriman not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Detail pengiriman retrieved successfully!",
      detailPengiriman: {
        alamatLengkap: detailPengiriman.alamatLengkap,
        noHandphone: detailPengiriman.noHandphone,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message:
          (error as { message: string }).message || "Internal server error.",
      },
      { status: 500 }
    );
  }
}
