import { db } from "../connection.js";

const booksModel = db.collection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          minLength: 1,
          description: "Title is required and must be a non-empty string",
        },
      },
    },
  },
  validationAction: "error",
  validationLevel: "strict",
});

export default booksModel;
