import { NextRequest, NextResponse } from "next/server";
import { getVerifiedToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import DetailPengiriman from "@/models/DetailPengiriman";
import { DetailPengirimanSchema } from "@/schemas/DetailPengirimanSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const verifiedToken = await getVerifiedToken();
    if (!verifiedToken) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    body.userId = verifiedToken._id;

    // Validate the data against the schema
    const parseResult = DetailPengirimanSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          issues: parseResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { alamatLengkap, noHandphone, userId } = parseResult.data;

    await connectToDatabase();

    // Create a new address document
    const detailPengiriman = new DetailPengiriman({
      userId,
      alamatLengkap,
      noHandphone,
    });

    await detailPengiriman.save();

    // Simulate delay
    // await new Promise((resolve) => setTimeout(resolve, 20000));

    return NextResponse.json(
      {
        message: "Detail pengiriman created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          (error as { message: string }).message || "Internal server error.",
      },
      { status: 500 }
    );
  }
}
