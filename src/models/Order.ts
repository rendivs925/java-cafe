import mongoose, { Model, Schema } from "mongoose";

// Define the TypeScript interface for the product within the order
export interface IOrderProduct {
  imgUrl: string;
  title: string;
  productId: string;
  qty: number;
  totalPrice: number;
  profit: number;
}

interface IUser {
  userId: string;
  username: string;
  email: string;
}

// Define the TypeScript interface for the order document
export interface IOrder {
  token: string;
  orderId: string;
  user: IUser;
  address: string;
  phone: number;
  subtotal: number;
  payment: number;
  shippingCost: number;
  layanan: {
    name: string;
    cost: number;
  };
  paymentStatus?: string;
  orderStatus?: string;
  resi?: string;
  products: IOrderProduct[];
}

// Create the Mongoose schema for the order
const OrderSchema: Schema<IOrder> = new Schema(
  {
    token: { type: String, required: true },
    user: {
      userId: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true },
    },
    orderId: { type: String, required: true },
    address: { type: String, required: true },
    layanan: {
      name: { type: String, required: true },
      cost: { type: Number, required: true },
    },
    phone: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    payment: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" },
    orderStatus: { type: String, default: "processing" },
    resi: { type: String },
    products: [
      {
        title: {
          type: String,
          required: true,
        },
        imgUrl: {
          type: String,
          required: true,
        },
        productId: {
          type: String,
          required: true,
        },
        qty: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        profit: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
