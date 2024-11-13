// src/controllers/AccessLogController.ts
import { Request, Response } from "express";
import EnergyData from "../models/EnergyData";
import User from "../models/User";

export const AccessLogController = {
  getAccessLogs: async (req: Request, res: Response) => {
    try {
      // Fetch EnergyData with user details
      const energyLogs = await EnergyData.find().populate("clientID", "username").lean();

      // Format the response to match AccessLog structure
      const formattedLogs = energyLogs.map((log: any) => ({
        _id: log._id.toString(),
        user: log.clientID?.username || "Unknown User",
        action: "Energy Data Analysis",
        accessTime: log.updatedAt.toISOString(),
        algoStatus: log.algo_status === 1 ? "Energy Saved" : "No Savings",
      }));

      res.status(200).json(formattedLogs);
    } catch (error) {
      console.error("Failed to fetch access logs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
