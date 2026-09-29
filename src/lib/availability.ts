// Booking availability checker - Pure Day/Night Algorithm
// In hotel & villa hospitality:
// - A stay is measured by calendar nights.
// - Check-in on Date A and check-out on Date B occupies nights [A, B).
// - On Date B (check-out morning), the departing guest leaves, allowing a new guest to check in on Date B afternoon.
// - Therefore, two bookings [A_in, A_out) and [B_in, B_out) conflict IF AND ONLY IF:
//   A_in < B_out && A_out > B_in (strict inequality).

import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export interface DateRange {
  checkIn: Date | string;
  checkOut: Date | string;
}

export interface ConflictResult {
  hasConflict: boolean;
  conflictingBooking?: {
    guestName: string;
    checkIn: Date;
    checkOut: Date;
    checkInStr: string;
    checkOutStr: string;
    status: string;
  };
}

export interface AlternativeSuggestion {
  type: "before" | "after" | "next";
  checkIn: string; // "YYYY-MM-DD"
  checkOut: string; // "YYYY-MM-DD"
  nights: number;
  description: string;
}

/**
 * Convert any Date object or ISO string to a clean local "YYYY-MM-DD" date string
 */
export function toDateStr(d: Date | string): string {
  if (typeof d === "string") return d.slice(0, 10);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Today's date as a local "YYYY-MM-DD" string
 */
export function getTodayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * Calculate the number of calendar days between two "YYYY-MM-DD" dates (inclusive)
 */
export function calcDaysBetween(inStr: string, outStr: string): number {
  if (!inStr || !outStr) return 0;
  const [inY, inM, inD] = inStr.slice(0, 10).split("-").map(Number);
  const [outY, outM, outD] = outStr.slice(0, 10).split("-").map(Number);
  const diff = new Date(outY, outM - 1, outD).getTime() - new Date(inY, inM - 1, inD).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24))) + 1;
}

/**
 * Add (or subtract) a given number of days to a "YYYY-MM-DD" string
 */
export function addDays(str: string, days: number): string {
  const [y, m, d] = str.slice(0, 10).split("-").map(Number);
  const next = new Date(y, m - 1, d + days);
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;
}

/**
 * Returns an effective numeric range for overlap calculation.
 * Standard bookings [in, out] occupy time from check-in (afternoon) to check-out (morning).
 * Same-day bookings [in, in] occupy the daytime of that day.
 */
function getEffectiveRange(inStr: string, outStr: string) {
  const inTime = new Date(inStr + "T00:00:00Z").getTime();
  const outTime = new Date(outStr + "T00:00:00Z").getTime();
  const DAY_MS = 24 * 60 * 60 * 1000;
  if (inStr === outStr) {
    return { start: inTime + DAY_MS * 0.2, end: outTime + DAY_MS * 0.8 };
  } else {
    return { start: inTime + DAY_MS * 0.5, end: outTime + DAY_MS * 0.1 };
  }
}

/**
 * Check if a requested date range conflicts with any existing confirmed/pending bookings.
 */
export async function checkAvailability(
  range: DateRange,
  excludeBookingId?: string
): Promise<ConflictResult> {
  await connectDB();

  const reqInStr = toDateStr(range.checkIn);
  const reqOutStr = toDateStr(range.checkOut);

  if (!reqInStr || !reqOutStr || reqOutStr < reqInStr) {
    return { hasConflict: false };
  }

  // Broad date query to leverage MongoDB index with a safety margin
  const [inY, inM, inD] = reqInStr.split("-").map(Number);
  const [outY, outM, outD] = reqOutStr.split("-").map(Number);

  const broadStart = new Date(Date.UTC(inY, inM - 1, inD - 2, 0, 0, 0));
  const broadEnd = new Date(Date.UTC(outY, outM - 1, outD + 2, 23, 59, 59));

  const query: Record<string, unknown> = {
    status: { $in: ["pending", "confirmed"] },
    checkIn: { $lt: broadEnd },
    checkOut: { $gt: broadStart },
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const candidateBookings = await Booking.find(query).lean();
  const reqRange = getEffectiveRange(reqInStr, reqOutStr);

  for (const b of candidateBookings) {
    const bInStr = b.checkInDateStr || toDateStr(b.checkIn);
    const bOutStr = b.checkOutDateStr || toDateStr(b.checkOut);

    const bRange = getEffectiveRange(bInStr, bOutStr);

    // Two bookings overlap if one starts before the other ends, and ends after the other starts
    if (reqRange.start < bRange.end && reqRange.end > bRange.start) {
      return {
        hasConflict: true,
        conflictingBooking: {
          guestName: b.guestName,
          checkIn: b.checkIn,
          checkOut: b.checkOut,
          checkInStr: bInStr,
          checkOutStr: bOutStr,
          status: b.status,
        },
      };
    }
  }

  return { hasConflict: false };
}

/**
 * Get all active booked date ranges (pending + confirmed) for calendar rendering
 */
export async function getBookedRanges(): Promise<
  Array<{ checkIn: Date; checkOut: Date; checkInStr: string; checkOutStr: string; guestName: string; status: string }>
> {
  await connectDB();
  const bookings = await Booking.find({
    status: { $in: ["pending", "confirmed"] },
  })
    .select("checkIn checkOut checkInDateStr checkOutDateStr guestName status")
    .lean();

  return bookings.map((b) => ({
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    checkInStr: b.checkInDateStr || toDateStr(b.checkIn),
    checkOutStr: b.checkOutDateStr || toDateStr(b.checkOut),
    guestName: b.guestName,
    status: b.status,
  }));
}

/**
 * Smart day-based alternative suggestion algorithm.
 * Generates alternative available windows with the exact same number of days.
 */
export async function suggestAlternatives(
  requestedRange: DateRange
): Promise<AlternativeSuggestion[]> {
  await connectDB();

  const reqInStr = toDateStr(requestedRange.checkIn);
  const reqOutStr = toDateStr(requestedRange.checkOut);
  const days = Math.max(1, calcDaysBetween(reqInStr, reqOutStr));
  const todayStr = getTodayStr();

  // Scan up to 90 days forward from today
  const scanLimitDays = 90;
  const scanEndStr = addDays(todayStr > reqInStr ? todayStr : reqInStr, scanLimitDays);

  const [tY, tM, tD] = todayStr.split("-").map(Number);
  const [eY, eM, eD] = scanEndStr.split("-").map(Number);

  const broadStart = new Date(Date.UTC(tY, tM - 1, tD - 2, 0, 0, 0));
  const broadEnd = new Date(Date.UTC(eY, eM - 1, eD + 2, 23, 59, 59));

  const activeBookings = await Booking.find({
    status: { $in: ["pending", "confirmed"] },
    checkIn: { $lt: broadEnd },
    checkOut: { $gt: broadStart },
  })
    .select("checkIn checkOut checkInDateStr checkOutDateStr guestName")
    .sort({ checkIn: 1 })
    .lean();

  // Normalized list of existing booked night intervals [bInStr, bOutStr]
  const bookedIntervals = activeBookings.map((b) => ({
    inStr: b.checkInDateStr || toDateStr(b.checkIn),
    outStr: b.checkOutDateStr || toDateStr(b.checkOut),
    guestName: b.guestName,
  }));

  /**
   * Helper: Is a candidate [candIn, candOut] free from any overlapping bookings?
   */
  function isRangeAvailable(candIn: string, candOut: string): boolean {
    if (candIn < todayStr) return false;
    const candRange = getEffectiveRange(candIn, candOut);
    for (const b of bookedIntervals) {
      const bRange = getEffectiveRange(b.inStr, b.outStr);
      if (bRange.start < candRange.end && bRange.end > candRange.start) {
        return false;
      }
    }
    return true;
  }

  const suggestions: AlternativeSuggestion[] = [];

  // Identify bookings directly conflicting with requested stay
  const reqRange = getEffectiveRange(reqInStr, reqOutStr);
  const conflicts = bookedIntervals.filter((b) => {
    const bRange = getEffectiveRange(b.inStr, b.outStr);
    return bRange.start < reqRange.end && bRange.end > reqRange.start;
  });

  // --- Strategy 1: Immediately AFTER the conflict ends ---
  if (conflicts.length > 0) {
    // Find the latest checkout among all conflicting bookings
    let maxConflictOut = conflicts[0].outStr;
    for (const c of conflicts) {
      if (c.outStr > maxConflictOut) maxConflictOut = c.outStr;
    }

    const candIn = maxConflictOut;
    const candOut = addDays(candIn, days - 1);

    if (isRangeAvailable(candIn, candOut)) {
      suggestions.push({
        type: "after",
        checkIn: candIn,
        checkOut: candOut,
        nights: days,
        description: `${days} day${days !== 1 ? "s" : ""} right after the current booking`,
      });
    }
  }

  // --- Strategy 2: Immediately BEFORE the conflict starts ---
  if (conflicts.length > 0) {
    // Find the earliest checkin among all conflicting bookings
    let minConflictIn = conflicts[0].inStr;
    for (const c of conflicts) {
      if (c.inStr < minConflictIn) minConflictIn = c.inStr;
    }

    const candOut = minConflictIn;
    const candIn = addDays(candOut, -(days - 1));

    if (candIn >= todayStr && isRangeAvailable(candIn, candOut)) {
      suggestions.push({
        type: "before",
        checkIn: candIn,
        checkOut: candOut,
        nights: days,
        description: `${days} day${days !== 1 ? "s" : ""} right before the booked dates`,
      });
    }
  }

  // --- Strategy 3: Nearest Upcoming Available Window ---
  if (suggestions.length < 3) {
    const baseDate = reqInStr > todayStr ? reqInStr : todayStr;

    for (let dayOffset = 1; dayOffset <= 60; dayOffset++) {
      const candIn = addDays(baseDate, dayOffset);
      const candOut = addDays(candIn, days - 1);

      if (isRangeAvailable(candIn, candOut)) {
        // Ensure not duplicate
        const exists = suggestions.some((s) => s.checkIn === candIn && s.checkOut === candOut);
        if (!exists) {
          suggestions.push({
            type: "next",
            checkIn: candIn,
            checkOut: candOut,
            nights: days,
            description: `Next available ${days}-day stay`,
          });
        }
      }

      if (suggestions.length >= 3) break;
    }
  }

  return suggestions;
}
