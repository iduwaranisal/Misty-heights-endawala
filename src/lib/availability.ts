// Booking availability checker - pure algorithm, no AI
// A property is considered "booked" if ANY existing confirmed/pending booking overlaps with the requested range.

import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export interface DateRange {
  checkIn: Date;
  checkOut: Date;
}

export interface ConflictResult {
  hasConflict: boolean;
  conflictingBooking?: {
    guestName: string;
    checkIn: Date;
    checkOut: Date;
    status: string;
  };
}

export interface AlternativeSuggestion {
  type: "before" | "after" | "split";
  checkIn: Date;
  checkOut: Date;
  nights: number;
  description: string;
}

/**
 * Check if a date range overlaps with any existing bookings.
 * Two ranges overlap if one starts before the other ends AND ends after the other starts.
 */
export async function checkAvailability(
  range: DateRange,
  excludeBookingId?: string
): Promise<ConflictResult> {
  await connectDB();

  const query: Record<string, unknown> = {
    status: { $in: ["pending", "confirmed"] },
    // Overlap condition: existing.checkIn < newCheckOut AND existing.checkOut > newCheckIn
    checkIn: { $lt: range.checkOut },
    checkOut: { $gt: range.checkIn },
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const conflict = await Booking.findOne(query).lean();

  if (!conflict) {
    return { hasConflict: false };
  }

  return {
    hasConflict: true,
    conflictingBooking: {
      guestName: conflict.guestName,
      checkIn: conflict.checkIn,
      checkOut: conflict.checkOut,
      status: conflict.status,
    },
  };
}

/**
 * Get all booked date ranges (pending + confirmed), used for calendar display
 */
export async function getBookedRanges(): Promise<
  Array<{ checkIn: Date; checkOut: Date; guestName: string; status: string }>
> {
  await connectDB();
  const bookings = await Booking.find({
    status: { $in: ["pending", "confirmed"] },
  })
    .select("checkIn checkOut guestName status")
    .lean();

  return bookings.map((b) => ({
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    guestName: b.guestName,
    status: b.status,
  }));
}

/**
 * Smart alternative suggestion algorithm.
 * Looks for the nearest available window matching the same number of nights.
 *
 * Strategy:
 * 1. Try exactly before the conflicting booking starts
 * 2. Try exactly after the conflicting booking ends
 * 3. Scan 90 days forward to find the next available window
 */
export async function suggestAlternatives(
  requestedRange: DateRange
): Promise<AlternativeSuggestion[]> {
  await connectDB();

  const nights = Math.ceil(
    (requestedRange.checkOut.getTime() - requestedRange.checkIn.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Fetch all bookings in the next 90 days
  const scanEnd = new Date(requestedRange.checkIn);
  scanEnd.setDate(scanEnd.getDate() + 90);

  const existingBookings = await Booking.find({
    status: { $in: ["pending", "confirmed"] },
    checkIn: { $lt: scanEnd },
    checkOut: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24) }, // not in the past
  })
    .select("checkIn checkOut")
    .sort({ checkIn: 1 })
    .lean();

  const suggestions: AlternativeSuggestion[] = [];
  const today = new Date();
  today.setHours(14, 0, 0, 0);

  /**
   * Check if a candidate window is free from all bookings
   */
  function isWindowFree(start: Date, end: Date): boolean {
    for (const b of existingBookings) {
      if (b.checkIn < end && b.checkOut > start) return false;
    }
    return true;
  }

  // --- Strategy 1: try BEFORE the requested check-in ---
  const beforeEnd = new Date(requestedRange.checkIn);
  const beforeStart = new Date(beforeEnd);
  beforeStart.setDate(beforeStart.getDate() - nights);
  beforeStart.setHours(14, 0, 0, 0);
  beforeEnd.setHours(11, 0, 0, 0);

  if (beforeStart >= today && isWindowFree(beforeStart, beforeEnd)) {
    suggestions.push({
      type: "before",
      checkIn: new Date(beforeStart),
      checkOut: new Date(beforeEnd),
      nights,
      description: `${nights} night${nights > 1 ? "s" : ""} just before your requested dates`,
    });
  }

  // --- Strategy 2: try AFTER the conflict ends ---
  // We need to find when the conflict ends
  const conflictCheck = await Booking.findOne({
    status: { $in: ["pending", "confirmed"] },
    checkIn: { $lt: requestedRange.checkOut },
    checkOut: { $gt: requestedRange.checkIn },
  })
    .sort({ checkOut: 1 })
    .lean();

  if (conflictCheck) {
    const afterStart = new Date(conflictCheck.checkOut);
    afterStart.setHours(14, 0, 0, 0);
    const afterEnd = new Date(afterStart);
    afterEnd.setDate(afterEnd.getDate() + nights);
    afterEnd.setHours(11, 0, 0, 0);

    if (isWindowFree(afterStart, afterEnd)) {
      suggestions.push({
        type: "after",
        checkIn: new Date(afterStart),
        checkOut: new Date(afterEnd),
        nights,
        description: `${nights} night${nights > 1 ? "s" : ""} immediately after current booking`,
      });
    }
  }

  // --- Strategy 3: Scan forward to find next free window ---
  if (suggestions.length < 2) {
    let scanStart = new Date(requestedRange.checkIn);
    scanStart.setHours(14, 0, 0, 0);

    // Scan day by day for next 90 days
    for (let i = 0; i < 90; i++) {
      const candidateEnd = new Date(scanStart);
      candidateEnd.setDate(candidateEnd.getDate() + nights);
      candidateEnd.setHours(11, 0, 0, 0);

      if (isWindowFree(scanStart, candidateEnd)) {
        // Make sure this isn't the same as an existing suggestion
        const isDuplicate = suggestions.some(
          (s) => Math.abs(s.checkIn.getTime() - scanStart.getTime()) < 60000
        );
        if (!isDuplicate) {
          suggestions.push({
            type: "after",
            checkIn: new Date(scanStart),
            checkOut: new Date(candidateEnd),
            nights,
            description: `Next available ${nights}-night window`,
          });
          break;
        }
      }

      // Jump to the end of conflicting booking
      let jumped = false;
      for (const b of existingBookings) {
        if (b.checkIn <= scanStart && b.checkOut > scanStart) {
          scanStart = new Date(b.checkOut);
          scanStart.setHours(14, 0, 0, 0);
          jumped = true;
          break;
        }
      }
      if (!jumped) {
        scanStart.setDate(scanStart.getDate() + 1);
      }
    }
  }

  return suggestions;
}
