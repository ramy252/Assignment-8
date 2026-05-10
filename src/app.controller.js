import express from "express";
import { PORT } from "./config/process.js";
import { connectDB } from "./db/connection.js";
import bookRouter from "./module/book/book.controller.js";
import authorRouter from "./module/author/author.controller.js";
import logRouter from "./module/logs/log.controller.js";
export const bootstrap = async () => {
  const app = express();
  await connectDB();
  app.use(express.json());
  app.use("/collection/books", bookRouter);
  app.use("/collection/authors", authorRouter);
  app.use("/collection/logs", logRouter);
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};
