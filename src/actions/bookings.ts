"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Booking, { BookingSource, BookingStatus } from "@/models/Booking";
import { checkAvailability, suggestAlternatives } from "@/lib/availability";
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
    nights: number;
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

    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    checkInDate.setHours(14, 0, 0, 0);
    checkOutDate.setHours(11, 0, 0, 0);

    if (checkInDate >= checkOutDate) {
      return { success: false, message: "Check-out must be after check-in" };
    }
    if (checkInDate < new Date()) {
      return { success: false, message: "Check-in date cannot be in the past" };
    }

    // Check availability
    const conflict = await checkAvailability({ checkIn: checkInDate, checkOut: checkOutDate });

    if (conflict.hasConflict) {
      // Generate smart alternatives
      const alternatives = await suggestAlternatives({
        checkIn: checkInDate,
        checkOut: checkOutDate,
      });

      return {
        success: false,
        message: `Sorry, those dates are not available (${conflict.conflictingBooking?.guestName ? "property already booked" : "conflict detected"}). We found ${alternatives.length} alternative date(s) that work!`,
        suggestions: alternatives.map((a) => ({
          checkIn: a.checkIn.toISOString(),
          checkOut: a.checkOut.toISOString(),
          nights: a.nights,
          description: a.description,
        })),
      };
    }

    // Create the booking
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const booking = new Booking({
      guestName: data.guestName.trim(),
      guestPhone: data.guestPhone.trim(),
      guestEmail: data.guestEmail?.trim(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      checkInTime: data.checkInTime || "14:00",
      checkOutTime: data.checkOutTime || "11:00",
      guests: data.guests,
      notes: data.notes?.trim(),
      status: "pending",
      source: data.source || "website",
      totalNights: nights,
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

    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    checkInDate.setHours(14, 0, 0, 0);
    checkOutDate.setHours(11, 0, 0, 0);

    if (checkInDate >= checkOutDate) {
      return { success: false, message: "Check-out must be after check-in" };
    }

    const conflict = await checkAvailability({ checkIn: checkInDate, checkOut: checkOutDate });
    if (conflict.hasConflict) {
      const alternatives = await suggestAlternatives({ checkIn: checkInDate, checkOut: checkOutDate });
      return {
        success: false,
        message: `Date conflict with ${conflict.conflictingBooking?.guestName}'s booking (${conflict.conflictingBooking?.checkIn.toLocaleDateString()} – ${conflict.conflictingBooking?.checkOut.toLocaleDateString()})`,
        suggestions: alternatives.map((a) => ({
          checkIn: a.checkIn.toISOString(),
          checkOut: a.checkOut.toISOString(),
          nights: a.nights,
          description: a.description,
        })),
      };
    }

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const booking = new Booking({
      guestName: data.guestName.trim(),
      guestPhone: data.guestPhone.trim(),
      guestEmail: data.guestEmail?.trim(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      checkInTime: data.checkInTime || "14:00",
      checkOutTime: data.checkOutTime || "11:00",
      guests: data.guests,
      notes: data.notes?.trim(),
      status: "confirmed",  // Admin-created bookings are auto-confirmed
      source: data.source || "manual",
      totalNights: nights,
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
      bookings: bookings.map((b) => ({
        id: b._id.toString(),
        guestName: b.guestName,
        guestPhone: b.guestPhone,
        guestEmail: b.guestEmail || "",
        checkIn: b.checkIn.toISOString(),
        checkOut: b.checkOut.toISOString(),
        checkInTime: b.checkInTime,
        checkOutTime: b.checkOutTime,
        guests: b.guests,
        notes: b.notes || "",
        status: b.status,
        source: b.source,
        totalNights: b.totalNights,
        createdAt: b.createdAt.toISOString(),
      })),
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
  excludeId?: string
): Promise<ActionResult> {
  try {
    await connectDB();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    checkInDate.setHours(14, 0, 0, 0);
    checkOutDate.setHours(11, 0, 0, 0);

    const conflict = await checkAvailability(
      { checkIn: checkInDate, checkOut: checkOutDate },
      excludeId
    );

    if (!conflict.hasConflict) {
      return { success: true, message: "Available! Dates are free." };
    }

    const alternatives = await suggestAlternatives({ checkIn: checkInDate, checkOut: checkOutDate });
    return {
      success: false,
      message: "Dates are not available.",
      suggestions: alternatives.map((a) => ({
        checkIn: a.checkIn.toISOString(),
        checkOut: a.checkOut.toISOString(),
        nights: a.nights,
        description: a.description,
      })),
    };
  } catch {
    return { success: false, message: "Could not check availability" };
  }
}
