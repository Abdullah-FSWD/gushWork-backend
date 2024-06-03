import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import Books from "./models/Books.js";
import Routes from "./routes/books.js";
import UserRoutes from "./routes/user.js";
import FavoriteRoutes from "./routes/favorites.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const URL = process.env.MONGO_URI;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/books", Routes);
app.use("/api/users", UserRoutes);
app.use("/api/favorites", FavoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
