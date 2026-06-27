import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./database/mongodb";
import { PORT } from "./config";
import { HttpError } from "./errors/http-error";
import authRoutes from "./routes/auth.route";
import busRoutes from "./routes/bus.route";
import bookingRoutes from "./routes/booking.route";

const app: Application = express();

app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 200 }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: "Welcome to YatraGo API" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }
  return res.status(500).json({ success: false, message: err?.message || "Internal Server Error" });
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`YatraGo API running on port ${PORT}`);
      console.log(`Local:   http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

process.on("uncaughtException", (err) => { console.error("Uncaught Exception:", err); });
process.on("unhandledRejection", (reason) => { console.error("Unhandled Rejection:", reason); });

startServer();

export default app;
