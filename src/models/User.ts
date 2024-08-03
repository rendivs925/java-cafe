import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  imgUrl?: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    password: { type: String, required: true },
    imgUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
