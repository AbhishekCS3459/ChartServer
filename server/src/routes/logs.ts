// routes/logs.ts
import express from "express";

import { isAuthenticated } from "../middlewares/checkAuth";
import { LogController } from "../controllers/LogControllers";
import { logAccessMiddleware } from "../middlewares/logAction";

const router = express.Router();
router.get(
  "/get",
  isAuthenticated,
  logAccessMiddleware("Accessed logs"),
  LogController.getLogs
);

export default router;
