
import express from "express";

import { isAuthenticated } from "../middlewares/checkAuth";
import { AccessLogController } from "../controllers/AccessLogControllers";

const router = express.Router();


router.get("/logs", isAuthenticated, AccessLogController.getAccessLogs);

export default router;
