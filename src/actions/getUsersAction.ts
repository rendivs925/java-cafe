import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import { SignUpType } from "@/schemas/UserSchema";

export interface IUser extends Omit<SignUpType, "password"> {
  _id: string | number;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export async function getUsersAction(page: number, limit: number) {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const users: (IUser & { password: string })[] = await User.find({})
      .skip(skip)
      .limit(limit)
      .lean();
    const totalItemsLength: number = await User.find({}).countDocuments();

    const formattedUsers = users.map((user) => {
      const data = {
        ...user,
        _id: user._id.toString(),
      };

      const { password, ...filteredData } = data;

      return filteredData;
    });

    return {
      status: "success",
      message: "Users fetched successfully.",
      items: formattedUsers,
      totalItemsLength,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching users.",
      items: [],
      totalItemsLength: 0,
    };
  }
}
