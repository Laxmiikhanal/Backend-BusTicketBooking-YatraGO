import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";
import { BusModel } from "../models/bus.model";
import { v4 as uuidv4 } from "uuid";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { busId, busName, from, to, departure, selectedSeats, passengerName, passengerPhone, passengerEmail, totalPrice, paymentMethod } = req.body;
    const userId = (req as any).user?._id;
    const bus = await BusModel.findById(busId);
    if (!bus) return res.status(404).json({ success: false, message: "Bus not found" });
    if (bus.availableSeats < selectedSeats.length) return res.status(400).json({ success: false, message: "Not enough seats" });
    const bookingId = "YG" + uuidv4().replace(/-/g, "").substring(0, 8).toUpperCase();
    const booking = await BookingModel.create({ bookingId, userId, busId, busName, from, to, departure, selectedSeats, passengerName, passengerPhone, passengerEmail, totalPrice, paymentMethod, paymentStatus: "paid", bookingStatus: "confirmed" });
    bus.availableSeats -= selectedSeats.length;
    await bus.save();
    return res.status(201).json({ success: true, data: booking });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id;
    const bookings = await BookingModel.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: bookings });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    return res.status(200).json({ success: true, data: booking });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id;
    const booking = await BookingModel.findOne({ bookingId: req.params.id, userId });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    booking.bookingStatus = "cancelled";
    await booking.save();
    const bus = await BusModel.findById(booking.busId);
    if (bus) { bus.availableSeats += booking.selectedSeats.length; await bus.save(); }
    return res.status(200).json({ success: true, message: "Booking cancelled" });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
