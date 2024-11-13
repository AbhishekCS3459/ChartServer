import express from "express";
import bodyParser from "body-parser";
import { Connect } from "./db/connect"; 
import userRoutes from "./routes/auth";
import dashboard from "./routes/dashboard";
import accessLogsRoute from "./routes/logs";
import logs from "./routes/logs";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

(async () => {
  
  await Connect.connectToDatabase(process.env.MONGO_URI);
})();

app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboard);

app.use("/api/logs", accessLogsRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
