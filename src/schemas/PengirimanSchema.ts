import { z } from "zod";

// Define the validation schema using zod
export const PengirimanSchema = z.object({
  provinsi: z.string({
    required_error: "Provinsi is required.",
  }),
  kota: z.string({
    required_error: "Kota is required.",
  }),
  kurir: z.string({
    required_error: "Kurir is required.",
  }),
  layanan: z
    .string()
    .min(1, "Please select a service.")
    .refine((value) => value !== "0", {
      message: "Please select a valid service.",
    }),
});

export type PengirimanType = z.infer<typeof PengirimanSchema>;
