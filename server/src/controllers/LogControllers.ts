import { Request, Response } from "express";
import LogSchema from "../models/LogSchema";

export const LogController = {
  getLogs: async (req: Request, res: Response) => {
    try {
      const logs = await LogSchema.find().sort({ accessTime: -1 }).limit(50); // Pagination can be added
      res.status(200).json(logs);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
};
