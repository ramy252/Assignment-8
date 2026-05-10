import { Router } from "express";
import { getAuthors, createAuthor } from "./author.service.js";

const router = Router();

router.get("/", getAuthors);
router.post("/create", createAuthor);

export default router;
