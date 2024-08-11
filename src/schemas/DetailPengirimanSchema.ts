import { z } from "zod";

// Define the validation schema using zod
export const DetailPengirimanSchema = z.object({
  alamatLengkap: z.string().min(5, {
    message: "Alamat lengkap minimal 5 karakter.",
  }),
  noHandphone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, {
      message: "Format nomor tidak valid.",
    })
    .min(10, {
      message: "Nomor handphone minimal 10 digit.",
    }),
});

export type DetailPengirimanType = z.infer<typeof DetailPengirimanSchema>;
