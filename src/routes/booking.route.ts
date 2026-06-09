import { Router } from "express";
import { createBooking, getMyBookings, getBookingById, cancelBooking } from "../controllers/booking.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", protect(), createBooking);
router.get("/my", protect(), getMyBookings);
router.get("/:id", protect(), getBookingById);
router.patch("/:id/cancel", protect(), cancelBooking);

export default router;
