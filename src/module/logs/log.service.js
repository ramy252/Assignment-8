import { db } from "../../db/connection.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await db.collection("logs").find().toArray();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createLogs = async (req, res) => {
  try {
    let { _id, action } = req.body;
    const log = await db.collection("logs").insertOne({
      _id,
      action,
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
