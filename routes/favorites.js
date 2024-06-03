import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import { addFavorite, getFavorites } from "../controllers/user-controller.js";

router.post("/:id", auth, addFavorite);
router.get("/", auth, getFavorites);

export default router;
