import mongoose, { Schema, Document } from "mongoose";

export interface IBus extends Document {
  name: string;
  type: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  rating: number;
  isActive: boolean;
}

const BusSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, default: 32 },
    availableSeats: { type: Number, required: true },
    amenities: [{ type: String }],
    rating: { type: Number, default: 4.0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BusModel = mongoose.model<IBus>("Bus", BusSchema);
