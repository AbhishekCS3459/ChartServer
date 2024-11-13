import express from "express";
import { UserController } from "../controllers/UserController";
import { isAuthenticated } from "../middlewares/checkAuth";

const router = express.Router();

// Registration route
//@ts-ignore
router.post("/register", UserController.register);
// Login route
//@ts-ignore
router.post("/login", UserController.login);

// Token refresh route
//@ts-ignore
router.post("/refresh", isAuthenticated, UserController.refreshAccessToken);

// Logout route
//@ts-ignore
router.post("/logout", UserController.logout);

export default router;
