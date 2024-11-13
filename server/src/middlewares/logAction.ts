import { NextFunction, Request, Response } from "express";
import LogSchema from "../models/LogSchema";

interface User {
  id: string;
  username?: string;
}

interface RequestWithUser extends Request {
  user?: User;
}

export const logAction = async (req: RequestWithUser, action: string) => {
  try {
    const user = req.user ? req.user.username || req.user.id : "Anonymous";
    await LogSchema.create({ user, action, accessTime: new Date() });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
};

export const logAccessMiddleware =
  (action: string) =>
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await logAction(req, action);
    next();
  };
