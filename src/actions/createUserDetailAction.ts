"use server";
import { getVerifiedToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import DetailPengiriman from "@/models/DetailPengiriman";
import { DetailPengirimanSchema } from "@/schemas/DetailPengirimanSchema";
import { revalidateTag } from "next/cache";

export async function createUserDetailAction(data: unknown) {
  try {
    const verifiedToken = await getVerifiedToken();
    (data as { userId?: string }).userId = verifiedToken?._id;

    // Validate the data against the schema
    const parseResult = DetailPengirimanSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        message: "Invalid input",
        issues: parseResult.error.issues,
        status: "error",
      };
    }

    const { alamatLengkap, noHandphone, userId } = parseResult.data;

    await connectToDatabase();

    // Update the existing address document or create it if it does not exist
    await DetailPengiriman.findOneAndUpdate(
      { userId }, // Filter to find the document
      { alamatLengkap, noHandphone }, // Fields to update
      {
        new: true, // Return the updated document
        upsert: true, // Create if not found
      }
    );
    revalidateTag("/");

    return {
      status: "success",
      message: "Detail pengiriman created successfully!",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
