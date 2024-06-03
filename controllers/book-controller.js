import Books from "../models/Books.js";

export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 3, sortBy = "title", order = "asc" } = req.query;

    const books = await Books.find()
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Books.countDocuments();

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addBook = async (req, res) => {
  const { title, author, description } = req.body;

  // Basic validation
  if (!title || !author || !description) {
    return res.status(400).json({ message: "All field are required" });
  }

  try {
    const newBook = new Books({
      title,
      author,
      description,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { user, rating, comment } = req.body;

    const newReview = {
      user,
      rating,
      comment,
    };

    book.reviews.push(newReview);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
