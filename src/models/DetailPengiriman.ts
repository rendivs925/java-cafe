import mongoose, { Schema } from "mongoose";

// Define the interface for the Address document
export interface IDetailPengiriman {
  userId: string;
  alamatLengkap: string;
  noHandphone: string;
}

// Create the schema with the updated field names
const detailPengirimanSchema: Schema<IDetailPengiriman> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  alamatLengkap: {
    type: String,
    required: true,
    minlength: 5, // Ensure minimum length of 5 characters
  },
  noHandphone: {
    type: String,
    required: true,
    match: /^(\+62|62|0)8[1-9][0-9]{6,10}$/, // Regex pattern for phone number validation
    minlength: 10, // Ensure minimum length of 10 digits
  },
});

// Create the model
const DetailPengiriman =
  mongoose.models.DetailPengiriman ||
  mongoose.model<IDetailPengiriman>("DetailPengiriman", detailPengirimanSchema);

export default DetailPengiriman;
