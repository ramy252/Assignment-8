import authorModel from "../../db/model/author.model.js";

export const getAuthors = async (req, res) => {
  try {
    const authors = await authorModel.find({}).toArray();
    res.status(200).json({ message: "Authors retrieved successfully", authors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createAuthor = async (req, res) => {
  try {
    const author = await authorModel.insertOne(req.body);
    res.status(201).json({ message: "Author created successfully", author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
