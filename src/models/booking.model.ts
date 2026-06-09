import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  bookingId: string;
  userId: mongoose.Types.ObjectId;
  busId: mongoose.Types.ObjectId;
  busName: string;
  from: string;
  to: string;
  departure: string;
  selectedSeats: string[];
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
}

const BookingSchema: Schema = new Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    busId: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    busName: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departure: { type: String, required: true },
    selectedSeats: [{ type: String }],
    passengerName: { type: String, required: true },
    passengerPhone: { type: String, required: true },
    passengerEmail: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    bookingStatus: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model<IBooking>("Booking", BookingSchema);
