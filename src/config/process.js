import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve("./src/config/dev.env") });

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
console.log(PORT);

export default {
  PORT,
  MONGODB_URI,
};
