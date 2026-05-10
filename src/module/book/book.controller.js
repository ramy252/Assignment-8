import { Router } from "express";
import { getAllBooks, addBook, addManyBooks, createTitleIndex, getBookByTitle, getBookByYear, getBookByGenre, getBookBySkipLimit, getBookByYearInteger, getBookByExcludeGenres, deleteBookBeforeYear, getBookByAggregate1, getBookByAggregate3, getBookByAggregate4 } from "./book.service.js";

const router = Router();

router.get("/", getAllBooks);
router.get("/title", getBookByTitle);
router.get("/year", getBookByYear);
router.get("/genre", getBookByGenre);
router.get("/skip-limit", getBookBySkipLimit);
router.get("/year-integer", getBookByYearInteger);
router.get("/exclude-genres", getBookByExcludeGenres);
router.delete("/before-year", deleteBookBeforeYear);
router.get("/aggregate1", getBookByAggregate1);
router.get("/aggregate3", getBookByAggregate3);
router.get("/aggregate4", getBookByAggregate4);

router.post("/create", addBook);
router.post("/batch", addManyBooks);
router.post("/index", createTitleIndex);

export default router;
