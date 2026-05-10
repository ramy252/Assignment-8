import booksModel from "../../db/model/books.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await booksModel.find({}).toArray();
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ message: "All books", books });
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const addBook = async (req, res) => {
  try {
    const { title, author, year, genres } = req.body;
    if (!title || !author || !year || !genres) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const book = await booksModel.insertOne({ title, author, year, genres });
    return res.status(201).json({ message: "Book created", book });
  } catch (error) {
    console.error("Error in addBook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addManyBooks = async (req, res) => {
  try {
    const books = req.body;
    const result = await booksModel.insertMany(books);
    return res.status(201).json({ message: "Books created", result });
  } catch (error) {
    console.error("Error in addManyBooks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const createTitleIndex = async (req, res) => {
  try {
    const result = await booksModel.createIndex({ title: 1 });
    return res.status(201).json({ message: "Index created", result });
  } catch (error) {
    console.error("Error in createTitleIndex:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const book = await booksModel.findOne({ title: title });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByTitle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookByYear = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ message: "From and to are required" });
    }
    const book = await booksModel.findOne({ year: { $gte: from, $lte: to } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByYear:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookByGenre = async (req, res) => {
  try {
    const { genre } = req.query;
    if (!genre) {
      return res.status(400).json({ message: "Genre is required" });
    }
    const book = await booksModel.findOne({ genres: { $in: [genre] } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByGenre:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookBySkipLimit = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    if (!skip || !limit) {
      return res.status(400).json({ message: "Skip and limit are required" });
    }
    const book = await booksModel
      .find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ year: -1 })
      .toArray();
    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookBySkipLimit:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookByYearInteger = async (req, res) => {
  try {
    const book = await booksModel.find({ year: { $type: "int" } }).toArray();
    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByYearInteger:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookByExcludeGenres = async (req, res) => {
  try {
    const book = await booksModel
      .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
      .toArray();
    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByExcludeGenres:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBookBeforeYear = async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }
    const book = await booksModel.deleteMany({ year: { $lt: year } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted", book });
  } catch (error) {
    console.error("Error in deleteBookBeforeYear:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookByAggregate1 = async (req, res) => {
  try {
    const book = await booksModel
      .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
      .toArray();
    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByAggregate1:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getBookByAggregate3 = async (req, res) => {
  try {
    const book = await booksModel
      .aggregate([{ $unwind: "$genres" }])
      .toArray();
    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByAggregate3:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getBookByAggregate4 = async (req, res) => {
  try {
    const book = await booksModel.aggregate([{ $lookup: { from: "logs", localField: "_id", foreignField: "bookId", as: "logs" } }])
      .toArray();
    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookByAggregate4:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
