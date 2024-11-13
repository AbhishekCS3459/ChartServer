import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

export class UserController {
  /**
   * Handles user registration
   */
  static async register(req: Request, res: Response) {
    const { username, email, password, confirmPassword } = req.body;

    // Validate request payload
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser: IUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res
        .status(201)
        .json({ message: "User registered successfully", userId: newUser.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * Handles user login
   */
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { userId: user.id, username: user.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" } // Short-lived access token
      );
      const refreshToken = jwt.sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" } // Longer-lived refresh token
      );

      // Set refresh token as an HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Send access token
      res.status(200).json({ accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * Refreshes the access token
   */
  static async refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token missing" });
    }

    try {
      const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
      const accessToken = jwt.sign(
        { userId: payload.userId },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ accessToken });
    } catch (err) {
      console.error(err);
      res.status(403).json({ error: "Invalid refresh token" });
    }
  }

  /**
   * Handles user logout
   */
  static async logout(req: Request, res: Response) {
    try {
      // Clear the refresh token cookie
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // secure in production
        sameSite: "strict",
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Logout failed. Please try again." });
    }
  }
}
