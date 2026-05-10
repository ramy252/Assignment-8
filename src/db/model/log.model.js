import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "library";
const collectionName = "logs";

export const logsCollection = client.db(dbName).collection(collectionName);
