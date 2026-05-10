import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../config/process.js";

const dbName = "library";
const client = new MongoClient(MONGODB_URI);
export const db = client.db(dbName);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};
