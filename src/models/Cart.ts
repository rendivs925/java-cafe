import mongoose, { Model, Schema } from "mongoose";

export interface ICartProduct {
  productId: string;
  qty?: number;
  title: string;
  stock: number;
  price: number;
  imgUrl: string;
}

// Define the TypeScript interface for the cart document
export interface ICart {
  userId: string;
  products: ICartProduct[];
}

// Create the Mongoose schema for the cart
const CartSchema: Schema<ICart> = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        qty: { type: Number, default: 1 },
        title: { type: String, required: true },
        stock: { type: Number, required: true },
        price: { type: Number, required: true },
        imgUrl: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
