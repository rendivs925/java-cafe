"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import DetailPengiriman from "@/models/DetailPengiriman";
import { DetailPengirimanSchema } from "@/schemas/DetailPengirimanSchema";
import { revalidateTag } from "next/cache";

export async function createUserDetailAction(formData: FormData) {
  try {
    const data = {
      alamatLengkap: formData.get("alamatLengkap") as string,
      noHandphone: formData.get("noHandphone") as string,
    };

    // Validate the data against the schema
    const parseResult = DetailPengirimanSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        message: "Invalid input",
        errors: parseResult.error.errors,
        status: "error",
      };
    }

    const { alamatLengkap, noHandphone } = parseResult.data;

    await connectToDatabase();

    // Create a new address document
    const detailPengiriman = new DetailPengiriman({
      alamatLengkap,
      noHandphone,
    });

    await detailPengiriman.save();

    revalidateTag("/");

    return {
      status: "success",
      message: "Detail pengiriman created successfully!",
      address: {
        id: detailPengiriman._id.toString(),
        addressLine: detailPengiriman.addressLine,
        phoneNumber: detailPengiriman.phoneNumber,
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
