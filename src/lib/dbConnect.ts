import mongoose, { ConnectOptions } from "mongoose";

const DB_URL = process.env.DB_URL as string;

if (DB_URL === "" || DB_URL === null || DB_URL === undefined) {
  throw new Error("Please define the DB_URL environment variable inside .env");
}

let cachedClient: mongoose.Mongoose | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const options: ConnectOptions = {
      // You can include other supported options here
    };

    const client = await mongoose.connect(DB_URL, options);
    cachedClient = client;
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}
