import express from "express";
import {
  getBooks,
  getBookById,
  createReview,
  addBook,
} from "../controllers/book-controller.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.get("/:id", getBookById);
router.post("/:id/reviews", createReview);

export default router;
