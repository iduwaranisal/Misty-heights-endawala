"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Booking, { BookingSource, BookingStatus } from "@/models/Booking";
import { checkAvailability, suggestAlternatives, calcDaysBetween, getTodayStr } from "@/lib/availability";
import { verifyAdminSession, createAdminSession, setSessionCookie, clearSessionCookie } from "@/lib/auth";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BookingFormData {
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  checkIn: string;        // ISO date string "YYYY-MM-DD"
  checkOut: string;       // ISO date string "YYYY-MM-DD"
  checkInTime?: string;   // "14:00"
  checkOutTime?: string;  // "11:00"
  guests: number;
  notes?: string;
  source?: BookingSource;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  suggestions?: Array<{
    checkIn: string;
    checkOut: string;
    days: number;
    description: string;
  }>;
}

// ─── Admin Auth Actions ──────────────────────────────────────────────────────

export async function adminLogin(
  username: string,
  password: string
): Promise<ActionResult> {
  const expectedUsername = process.env.ADMIN_USERNAME || "mistyheights_admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "MistyHeights@2024!";

  if (username !== expectedUsername || password !== expectedPassword) {
    return { success: false, message: "Invalid credentials" };
  }

  const token = await createAdminSession(username);
  await setSessionCookie(token);
  return { success: true, message: "Logged in successfully" };
}

export async function adminLogout(): Promise<ActionResult> {
  await clearSessionCookie();
  return { success: true, message: "Logged out" };
}

export async function getAdminSession() {
  return await verifyAdminSession();
}

// ─── Public Booking Action (from website form) ───────────────────────────────

export async function submitPublicBooking(
  data: BookingFormData
): Promise<ActionResult<{ bookingId: string; suggestions?: unknown[] }>> {
  try {
    await connectDB();

    if (!data.guestName || !data.guestName.trim()) {
      return { success: false, message: "Please provide your full name" };
    }

    if (!data.guestPhone || !data.guestPhone.trim()) {
      return { success: false, message: "Please provide a valid phone or WhatsApp number" };
    }

    const ci = data.checkIn.slice(0, 10);
    const co = data.checkOut.slice(0, 10);

    if (co < ci) {
      return { success: false, message: "Check-out date must be the same as or after check-in date" };
    }
    
    const todayStr = getTodayStr();
    if (ci < todayStr) {
      return { success: false, message: "Check-in date cannot be in the past" };
    }

    const days = calcDaysBetween(ci, co);
    if (days < 1) {
      return { success: false, message: "Stay must be at least 1 day" };
    }

    // Check availability strictly by days
    const conflict = await checkAvailability({ checkIn: ci, checkOut: co });

    if (conflict.hasConflict) {
      // Generate smart alternatives based strictly on days
      const alternatives = await suggestAlternatives({
        checkIn: ci,
        checkOut: co,
      });

      return {
        success: false,
        message: `Those dates are already reserved. We found ${alternatives.length} alternative date option(s) for your ${days}-day stay:`,
        suggestions: alternatives.map((a) => ({
          checkIn: a.checkIn,
          checkOut: a.checkOut,
          days: a.nights,
          description: a.description,
        })),
      };
    }

    const validGuests = Math.max(1, parseInt(String(data.guests), 10) || 1);

    const [inY, inM, inD] = ci.split("-").map(Number);
    const [outY, outM, outD] = co.split("-").map(Number);

    const booking = new Booking({
      guestName: data.guestName.trim(),
      guestPhone: data.guestPhone.trim(),
      guestEmail: data.guestEmail?.trim(),
      checkIn: new Date(Date.UTC(inY, inM - 1, inD, 14, 0, 0)),
      checkOut: new Date(Date.UTC(outY, outM - 1, outD, 11, 0, 0)),
      checkInTime: data.checkInTime || "14:00",
      checkOutTime: data.checkOutTime || "11:00",
      checkInDateStr: ci,
      checkOutDateStr: co,
      guests: validGuests,
      notes: data.notes?.trim(),
      status: "pending",
      source: data.source || "website",
      totalNights: days,
    });

    await booking.save();
    revalidatePath("/admin");

    return {
      success: true,
      message: "Booking inquiry submitted! We'll confirm via WhatsApp shortly.",
      data: { bookingId: booking._id.toString() },
    };
  } catch (err) {
    console.error("submitPublicBooking error:", err);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

// ─── Admin Booking Actions ───────────────────────────────────────────────────

export async function adminCreateBooking(
  data: BookingFormData
): Promise<ActionResult<{ bookingId: string }>> {
  const session = await verifyAdminSession();
  if (!session) return { success: false, message: "Unauthorized" };

  try {
    await connectDB();

    if (!data.guestName || !data.guestName.trim()) {
      return { success: false, message: "Please provide guest name" };
    }

    if (!data.guestPhone || !data.guestPhone.trim()) {
      return { success: false, message: "Please provide phone number" };
    }

    const ci = data.checkIn.slice(0, 10);
    const co = data.checkOut.slice(0, 10);

    if (co < ci) {
      return { success: false, message: "Check-out date must be the same as or after check-in date" };
    }

    const days = calcDaysBetween(ci, co);
    if (days < 1) {
      return { success: false, message: "Stay must be at least 1 day" };
    }

    const conflict = await checkAvailability({ checkIn: ci, checkOut: co });
    if (conflict.hasConflict) {
      const alternatives = await suggestAlternatives({ checkIn: ci, checkOut: co });
      return {
        success: false,
        message: `Those dates overlap with ${conflict.conflictingBooking?.guestName}'s reserved stay (${conflict.conflictingBooking?.checkInStr || ci} – ${conflict.conflictingBooking?.checkOutStr || co})`,
        suggestions: alternatives.map((a) => ({
          checkIn: a.checkIn,
          checkOut: a.checkOut,
          days: a.nights,
          description: a.description,
        })),
      };
    }

    const [inY, inM, inD] = ci.split("-").map(Number);
    const [outY, outM, outD] = co.split("-").map(Number);

    const booking = new Booking({
      guestName: data.guestName.trim(),
      guestPhone: data.guestPhone.trim(),
      guestEmail: data.guestEmail?.trim(),
      checkIn: new Date(Date.UTC(inY, inM - 1, inD, 14, 0, 0)),
      checkOut: new Date(Date.UTC(outY, outM - 1, outD, 11, 0, 0)),
      checkInTime: data.checkInTime || "14:00",
      checkOutTime: data.checkOutTime || "11:00",
      checkInDateStr: ci,
      checkOutDateStr: co,
      guests: Math.max(1, parseInt(String(data.guests), 10) || 1),
      notes: data.notes?.trim(),
      status: "confirmed",  // Admin-created bookings are auto-confirmed
      source: data.source || "manual",
      totalNights: days,
    });

    await booking.save();
    revalidatePath("/admin");

    return {
      success: true,
      message: "Booking created successfully!",
      data: { bookingId: booking._id.toString() },
    };
  } catch (err) {
    console.error("adminCreateBooking error:", err);
    return { success: false, message: "Failed to create booking." };
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<ActionResult> {
  const session = await verifyAdminSession();
  if (!session) return { success: false, message: "Unauthorized" };

  try {
    await connectDB();
    await Booking.findByIdAndUpdate(bookingId, { status });
    revalidatePath("/admin");
    return { success: true, message: `Booking marked as ${status}` };
  } catch (err) {
    console.error("updateBookingStatus error:", err);
    return { success: false, message: "Failed to update status" };
  }
}

export async function deleteBooking(bookingId: string): Promise<ActionResult> {
  const session = await verifyAdminSession();
  if (!session) return { success: false, message: "Unauthorized" };

  try {
    await connectDB();
    await Booking.findByIdAndDelete(bookingId);
    revalidatePath("/admin");
    return { success: true, message: "Booking deleted" };
  } catch (err) {
    console.error("deleteBooking error:", err);
    return { success: false, message: "Failed to delete booking" };
  }
}

export async function getAllBookings(filter?: {
  status?: string;
  month?: number;
  year?: number;
}) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, bookings: [] };

  try {
    await connectDB();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (filter?.status && filter.status !== "all") {
      query.status = filter.status;
    }
    if (filter?.month !== undefined && filter?.year !== undefined) {
      const start = new Date(filter.year, filter.month, 1);
      const end = new Date(filter.year, filter.month + 1, 0, 23, 59, 59);
      query.checkIn = { $gte: start, $lte: end };
    }

    const bookings = await Booking.find(query).sort({ checkIn: 1 }).lean();

    return {
      success: true,
      bookings: bookings.map((b) => {
        // Fallback for old bookings that don't have checkInDateStr
        const checkInStr = b.checkInDateStr || b.checkIn.toISOString().slice(0, 10);
        const checkOutStr = b.checkOutDateStr || b.checkOut.toISOString().slice(0, 10);
        return {
          id: b._id.toString(),
          guestName: b.guestName,
          guestPhone: b.guestPhone,
          guestEmail: b.guestEmail || "",
          checkIn: checkInStr,
          checkOut: checkOutStr,
        checkInTime: b.checkInTime,
        checkOutTime: b.checkOutTime,
        guests: b.guests,
        notes: b.notes || "",
        status: b.status,
        source: b.source,
        totalNights: b.totalNights,
        createdAt: b.createdAt.toISOString(),
      };
    }),
    };
  } catch (err) {
    console.error("getAllBookings error:", err);
    return { success: false, bookings: [] };
  }
}

export async function getBookingStats() {
  const session = await verifyAdminSession();
  if (!session) return null;

  try {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [total, pending, confirmed, todayCheckIns, upcoming] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ checkIn: { $gte: today, $lt: tomorrow }, status: { $in: ["pending", "confirmed"] } }),
      Booking.countDocuments({ checkIn: { $gte: today }, status: { $in: ["pending", "confirmed"] } }),
    ]);

    return { total, pending, confirmed, todayCheckIns, upcoming };
  } catch {
    return null;
  }
}

export async function checkDateAvailabilityAction(
  checkIn: string,
  checkOut: string,
  arg3?: string,
  _arg4?: string,
  arg5?: string
): Promise<ActionResult> {
  try {
    await connectDB();
    if (!checkIn || !checkOut) {
      return { success: false, message: "Please select both check-in and check-out dates." };
    }

    const ci = checkIn.slice(0, 10);
    const co = checkOut.slice(0, 10);

    if (co < ci) {
      return {
        success: false,
        message: "Check-out date must be the same as or after check-in date.",
      };
    }

    const days = calcDaysBetween(ci, co);
    if (days < 1) {
      return {
        success: false,
        message: "Stay must be at least 1 day. Check-out date must be the same as or after check-in date.",
      };
    }

    // Support excludeId whether passed as 3rd param (new signature) or 5th param (legacy)
    const excludeId = typeof arg3 === "string" && !arg3.includes(":") ? arg3 : arg5;

    const conflict = await checkAvailability(
      { checkIn: ci, checkOut: co },
      excludeId
    );

    if (!conflict.hasConflict) {
      return { success: true, message: "Great news! The cabana is available for your dates." };
    }

    const alternatives = await suggestAlternatives({ checkIn: ci, checkOut: co });
    return {
      success: false,
      message: "Those dates are already reserved by another guest.",
      suggestions: alternatives.map((a) => ({
        checkIn: a.checkIn,
        checkOut: a.checkOut,
        days: a.nights,
        description: a.description,
      })),
    };
  } catch (err) {
    console.error("checkDateAvailabilityAction error:", err);
    return { success: false, message: "Could not check availability. Please try again." };
  }
}
