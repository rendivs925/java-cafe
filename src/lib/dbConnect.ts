import mongoose, { ConnectOptions, Mongoose, ClientSession } from "mongoose";

const DB_URL = process.env.DB_URL as string;

if (!DB_URL) {
  throw new Error("Please define the DB_URL environment variable inside .env");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalCache: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

export async function connectToDatabase(): Promise<ClientSession> {
  if (!globalCache.conn) {
    if (!globalCache.promise) {
      const options: ConnectOptions = {
        serverSelectionTimeoutMS: 30000,
        bufferCommands: false,
      };
      globalCache.promise = mongoose.connect(DB_URL, options);
    }
    globalCache.conn = await globalCache.promise;
    console.log("Connected to MongoDB");
  }

  global.mongooseCache = globalCache;

  return globalCache.conn.startSession();
}
