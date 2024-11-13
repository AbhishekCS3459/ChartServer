import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";

// Extend the Request type to include a `user` property
interface RequestWithUser extends Request {
  user?: string | object;
}

export function isAuthenticated(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access token missing or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach decoded token payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid or expired access token" });
  }
}
