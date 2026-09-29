// Booking model for MongoDB
import mongoose, { Schema, Document, Model } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type BookingSource = "website" | "whatsapp" | "phone" | "manual";

export interface IBooking extends Document {
  _id: mongoose.Types.ObjectId;
  // Guest info
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  // Dates & Time
  checkIn: Date;
  checkOut: Date;
  checkInTime: string;   // "14:00"
  checkOutTime: string;  // "11:00"
  // Stay details
  guests: number;
  notes?: string;
  // Admin fields
  status: BookingStatus;
  source: BookingSource;
  totalNights: number;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    guestName: { type: String, required: true, trim: true },
    guestPhone: { type: String, required: true, trim: true },
    guestEmail: { type: String, trim: true, lowercase: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    checkInTime: { type: String, default: "14:00" },
    checkOutTime: { type: String, default: "11:00" },
    guests: { type: Number, required: true, min: 1, max: 20 },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    source: {
      type: String,
      enum: ["website", "whatsapp", "phone", "manual"],
      default: "website",
    },
    totalNights: { type: Number, required: true, min: 1 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for fast date range queries
BookingSchema.index({ checkIn: 1, checkOut: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

// Pre-save: auto-calculate totalNights
BookingSchema.pre("save", async function () {
  const diffMs = this.checkOut.getTime() - this.checkIn.getTime();
  this.totalNights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
});

// Avoid model re-compilation in Next.js dev hot reload
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
