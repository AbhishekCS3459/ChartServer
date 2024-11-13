import express from "express";
import Chart from "../controllers/Chart";
import { isAuthenticated } from "../middlewares/checkAuth";
import { logAccessMiddleware } from "../middlewares/logAction";

const router = express.Router();
router.post(
  "/insert-data",
  isAuthenticated,
  logAccessMiddleware("Insert data"),
  Chart.insertData
);
router.get(
  "/get-data",
  isAuthenticated,
  logAccessMiddleware("Accessed dashboard"),
  Chart.getData
);
export default router;
