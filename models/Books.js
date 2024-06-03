import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  reviews: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const books = mongoose.model("Book", BookSchema);

export default books;
