import mongoose, { Model, Schema } from "mongoose";

// Define the TypeScript interface for the document
export interface ICart {
  userId: mongoose.Types.ObjectId | string;
  products: {
    productId: mongoose.Types.ObjectId;
    qty: number;
  }[];
}

// Create the Mongoose schema
const CartSchema: Schema<ICart> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        qty: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
