import { Request, Response } from "express";
import { BusModel } from "../models/bus.model";

export const getAllBuses = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    const filter: any = { isActive: true };
    if (from) filter.from = from;
    if (to) filter.to = to;
    const buses = await BusModel.find(filter);
    return res.status(200).json({ success: true, data: buses });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getBusById = async (req: Request, res: Response) => {
  try {
    const bus = await BusModel.findById(req.params.id);
    if (!bus) return res.status(404).json({ success: false, message: "Bus not found" });
    return res.status(200).json({ success: true, data: bus });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const seedBuses = async (req: Request, res: Response) => {
  try {
    await BusModel.deleteMany({});
    const buses = [
      { name: "Greenline Deluxe", type: "AC Deluxe", from: "Kathmandu", to: "Pokhara", departure: "07:00 AM", arrival: "02:00 PM", duration: "7 hrs", price: 1400, totalSeats: 32, availableSeats: 12, amenities: ["AC", "WiFi", "USB"], rating: 4.8 },
      { name: "Sajha Yatayat", type: "Tourist Bus", from: "Kathmandu", to: "Pokhara", departure: "08:30 AM", arrival: "03:30 PM", duration: "7 hrs", price: 900, totalSeats: 32, availableSeats: 3, amenities: ["AC", "USB"], rating: 4.2 },
      { name: "Buddha Air Express", type: "Night Bus", from: "Kathmandu", to: "Pokhara", departure: "10:00 PM", arrival: "05:00 AM", duration: "7 hrs", price: 1100, totalSeats: 32, availableSeats: 28, amenities: ["AC", "Blanket", "USB"], rating: 4.5 },
      { name: "Himalayan Travels", type: "Non-AC", from: "Kathmandu", to: "Pokhara", departure: "06:00 AM", arrival: "01:30 PM", duration: "7.5 hrs", price: 650, totalSeats: 32, availableSeats: 18, amenities: ["USB"], rating: 3.9 },
      { name: "Pokhara Express", type: "AC Deluxe", from: "Kathmandu", to: "Pokhara", departure: "12:00 PM", arrival: "07:00 PM", duration: "7 hrs", price: 1350, totalSeats: 32, availableSeats: 7, amenities: ["AC", "WiFi", "Snacks"], rating: 4.6 },
    ];
    await BusModel.insertMany(buses);
    return res.status(200).json({ success: true, message: "Buses seeded!" });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
