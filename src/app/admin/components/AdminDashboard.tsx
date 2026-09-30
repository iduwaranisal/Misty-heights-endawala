"use client";

import { useState, useTransition, useCallback } from "react";
import {
  LayoutDashboard, Calendar, Plus, LogOut, Users, Clock,
  CheckCircle, XCircle, Loader2, Phone, Mail, Trash2,
  ChevronLeft, ChevronRight, AlertTriangle, Sparkles,
  RefreshCw, Menu, ClipboardList, Image as ImageIcon, Search,
  Globe, Home, Waves, Utensils, Compass, Star, HelpCircle, Download, ExternalLink, Camera
} from "lucide-react";
import {
  adminLogout, adminCreateBooking, updateBookingStatus,
  deleteBooking, getAllBookings, getBookingStats,
  checkDateAvailabilityAction
} from "@/actions/bookings";
import { getSettings } from "@/actions/settings";
import GeneralSettingsCMS from "./cms/GeneralSettingsCMS";
import HeroCMS from "./cms/HeroCMS";
import CabanaCMS from "./cms/CabanaCMS";
import RiverPoolCMS from "./cms/RiverPoolCMS";
import DiningCMS from "./cms/DiningCMS";
import ExperiencesCMS from "./cms/ExperiencesCMS";
import TestimonialsCMS from "./cms/TestimonialsCMS";
import FaqCMS from "./cms/FaqCMS";
import SeoCMS from "./cms/SeoCMS";
import GalleryCMS from "./cms/GalleryCMS";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Booking {
  id: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  guests: number;
  notes: string;
  status: BookingStatus;
  source: string;
  totalNights: number;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  todayCheckIns: number;
  upcoming: number;
}

interface Suggestion {
  checkIn: string;
  checkOut: string;
  days: number;
  description: string;
}

interface Props {
  stats: Stats | null;
  initialBookings: Booking[];
  initialSettings?: Record<string, unknown>;
  username: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-LK", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const statusColor: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const sourceLabel: Record<string, string> = {
  website: "🌐 Online Booking",
  whatsapp: "💬 WhatsApp",
  phone: "📞 Phone Call",
  manual: "🏨 Front Desk",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: number; icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

// ─── Mini Calendar Component ─────────────────────────────────────────────────

function BookingCalendar({ bookings }: { bookings: Booking[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build a map of date -> bookings (inclusive days: check-in and check-out days are booked)
  const toLocalKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const dateBookingMap: Record<string, Booking[]> = {};
  bookings.forEach((b) => {
    if (b.status === "cancelled") return;
    // Parse as local dates to avoid UTC timezone shift
    const [sY, sM, sD] = b.checkIn.slice(0, 10).split("-").map(Number);
    const [eY, eM, eD] = b.checkOut.slice(0, 10).split("-").map(Number);
    const cur = new Date(sY, sM - 1, sD);
    const end = new Date(eY, eM - 1, eD);
    while (cur <= end) {
      const key = toLocalKey(cur);
      if (!dateBookingMap[key]) dateBookingMap[key] = [];
      dateBookingMap[key].push(b);
      cur.setDate(cur.getDate() + 1);
    }
  });

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-2 py-1 rounded-lg hover:bg-gray-100 text-xs text-gray-600 font-medium"
          >
            Today
          </button>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayBookings = dateBookingMap[dateKey] || [];
          const isToday =
            today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
          const hasConfirmed = dayBookings.some((b) => b.status === "confirmed");
          const hasPending = dayBookings.some((b) => b.status === "pending");
          const booked = dayBookings.length > 0;
          const isPast = new Date(dateKey) < today;

          return (
            <div
              key={day}
              title={
                booked
                  ? dayBookings.map((b) => `${b.guestName} (${b.status})`).join(", ")
                  : undefined
              }
              className={`
                relative flex flex-col items-center justify-center h-9 w-full rounded-lg text-xs font-medium transition-colors cursor-default
                ${isToday ? "ring-2 ring-emerald-500" : ""}
                ${hasConfirmed ? "bg-emerald-500 text-white" :
                  hasPending ? "bg-yellow-400 text-yellow-900" :
                  isPast ? "text-gray-300" : "text-gray-700 hover:bg-gray-50"}
              `}
            >
              {day}
              {booked && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {dayBookings.slice(0, 2).map((_, idx) => (
                    <div key={idx} className="w-1 h-1 rounded-full bg-white/80" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Confirmed
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" /> Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-white border border-gray-200 inline-block" /> Free
        </span>
      </div>
    </div>
  );
}

// ─── New Booking Form ─────────────────────────────────────────────────────────

function NewBookingForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    guestName: "", guestPhone: "", guestEmail: "",
    checkIn: "", checkOut: "",
    guests: 2, notes: "",
    source: "manual" as string,
  });
  const [isPending, startTransition] = useTransition();
  const [availabilityStatus, setAvailabilityStatus] = useState<"idle" | "checking" | "free" | "conflict">("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const getNextDay = (dateStr: string) => {
    if (!dateStr) return new Date().toISOString().slice(0, 10);
    const [y, m, d] = dateStr.slice(0, 10).split("-").map(Number);
    const next = new Date(y, m - 1, d + 1);
    return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;
  };

  const handleDateBlur = useCallback(() => {
    if (!form.checkIn || !form.checkOut) return;
    if (form.checkOut < form.checkIn) {
      setAvailabilityStatus("idle");
      return;
    }
    setAvailabilityStatus("checking");
    setSuggestions([]);
    startTransition(async () => {
      const res = await checkDateAvailabilityAction(form.checkIn, form.checkOut);
      setAvailabilityStatus(res.success ? "free" : "conflict");
      if (!res.success && res.suggestions) {
        setSuggestions(res.suggestions as Suggestion[]);
      }
    });
  }, [form.checkIn, form.checkOut]);

  const applySuggestion = (s: Suggestion) => {
    setForm((f) => ({
      ...f,
      checkIn: s.checkIn.slice(0, 10),
      checkOut: s.checkOut.slice(0, 10),
    }));
    setAvailabilityStatus("free");
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      const res = await adminCreateBooking({
        ...form,
        guests: Number(form.guests),
        source: form.source as "manual" | "website" | "whatsapp" | "phone",
      });
      if (res.success) {
        setResult({ ok: true, msg: res.message });
        setForm({
          guestName: "", guestPhone: "", guestEmail: "",
          checkIn: "", checkOut: "",
          guests: 2, notes: "", source: "manual",
        });
        setAvailabilityStatus("idle");
        setSuggestions([]);
        onSuccess();
      } else {
        setResult({ ok: false, msg: res.message });
        if (res.suggestions) setSuggestions(res.suggestions as Suggestion[]);
      }
    });
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Guest Name *
          </label>
          <input
            className={inputCls} required
            value={form.guestName}
            onChange={(e) => setForm((f) => ({ ...f, guestName: e.target.value }))}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Phone *
          </label>
          <input
            className={inputCls} required
            value={form.guestPhone}
            onChange={(e) => setForm((f) => ({ ...f, guestPhone: e.target.value }))}
            placeholder="07X XXX XXXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <input
          className={inputCls} type="email"
          value={form.guestEmail}
          onChange={(e) => setForm((f) => ({ ...f, guestEmail: e.target.value }))}
          placeholder="Optional"
        />
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Check-In Date *
          </label>
          <input
            className={inputCls} type="date" required
            value={form.checkIn}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => {
              const val = e.target.value;
              setForm((f) => ({
                ...f,
                checkIn: val,
                checkOut: f.checkOut && f.checkOut < val ? "" : f.checkOut,
              }));
              setAvailabilityStatus("idle");
            }}
            onBlur={handleDateBlur}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Check-Out Date *
          </label>
          <input
            className={inputCls} type="date" required
            value={form.checkOut}
            min={form.checkIn ? form.checkIn : new Date().toISOString().slice(0, 10)}
            onChange={(e) => {
              setForm((f) => ({ ...f, checkOut: e.target.value }));
              setAvailabilityStatus("idle");
            }}
            onBlur={handleDateBlur}
          />
        </div>
      </div>

      {/* Availability indicator */}
      {availabilityStatus !== "idle" && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border
          ${availabilityStatus === "checking" ? "bg-blue-50 border-blue-200 text-blue-700" :
            availabilityStatus === "free" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
            "bg-red-50 border-red-200 text-red-700"}`}
        >
          {availabilityStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin" />}
          {availabilityStatus === "free" && <CheckCircle className="w-4 h-4" />}
          {availabilityStatus === "conflict" && <AlertTriangle className="w-4 h-4" />}
          <span>
            {availabilityStatus === "checking" && "Checking room availability..."}
            {availabilityStatus === "free" && "✓ Cabana is available for these dates!"}
            {availabilityStatus === "conflict" && "✗ These dates are already booked by another guest."}
          </span>
        </div>
      )}

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Suggested Alternative Dates (Nearest Free Days)
          </p>
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applySuggestion(s)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-left transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-emerald-900">
                  {fmt(s.checkIn)} {s.checkIn !== s.checkOut && `→ ${fmt(s.checkOut)}`}
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  {s.days} day{s.days !== 1 ? "s" : ""} · {s.description}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-200 px-2 py-1 rounded-lg group-hover:bg-emerald-300">
                Choose These Dates →
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Total Guests *
          </label>
          <input
            className={inputCls} type="number" required min={1}
            value={form.guests}
            onChange={(e) => setForm((f) => ({ ...f, guests: Math.max(1, parseInt(e.target.value) || 1) }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Booking Channel
          </label>
          <select
            className={inputCls}
            value={form.source}
            onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
          >
            <option value="manual">Front Desk / Direct</option>
            <option value="phone">Phone Call</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="website">Website Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
          Special Requests / Guest Notes
        </label>
        <textarea
          className={`${inputCls} h-20 resize-none`}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="e.g. Vegetarian meals, early arrival, BBQ night..."
        />
      </div>

      {result && (
        <div className={`p-3 rounded-xl text-sm font-medium border
          ${result.ok ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
            "bg-red-50 border-red-200 text-red-700"}`}
        >
          {result.msg}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || availabilityStatus === "conflict"}
        className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        {isPending ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Saving Reservation...</>
        ) : (
          <><Plus className="w-4 h-4" /> Save Reservation</>
        )}
      </button>
    </form>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────

function BookingCard({ booking, onRefresh }: { booking: Booking; onRefresh: () => void }) {
  const [isPending, startTransition] = useTransition();

  const [confirmModal, setConfirmModal] = useState<{type: 'delete' | 'cancel' | 'status', newStatus?: BookingStatus} | null>(null);

  const handleStatus = (status: BookingStatus) => {
    if (status === booking.status) return;
    if (status === 'cancelled') {
      setConfirmModal({ type: 'cancel', newStatus: status });
    } else {
      executeStatusUpdate(status);
    }
  };

  const executeStatusUpdate = (status: BookingStatus) => {
    startTransition(async () => {
      await updateBookingStatus(booking.id, status);
      onRefresh();
    });
    setConfirmModal(null);
  };

  const handleDelete = () => {
    setConfirmModal({ type: 'delete' });
  };

  const executeDelete = () => {
    startTransition(async () => {
      await deleteBooking(booking.id);
      onRefresh();
    });
    setConfirmModal(null);
  };

  const [inY, inM, inD] = booking.checkIn.slice(0, 10).split("-").map(Number);
  const [outY, outM, outD] = booking.checkOut.slice(0, 10).split("-").map(Number);
  const diff = new Date(outY, outM - 1, outD).getTime() - new Date(inY, inM - 1, inD).getTime();
  const days = Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24))) + 1;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 transition-all
      ${booking.status === "confirmed" ? "border-emerald-200" :
        booking.status === "pending" ? "border-yellow-200" :
        booking.status === "cancelled" ? "border-red-100 opacity-70" :
        "border-blue-100"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h4 className="font-bold text-gray-900 truncate">{booking.guestName}</h4>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1 shrink-0">
              <Phone className="w-3 h-3" />{booking.guestPhone}
            </span>
            {booking.guestEmail && (
              <span className="flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 shrink-0" /><span className="truncate">{booking.guestEmail}</span>
              </span>
            )}
            <span className="flex items-center gap-1 shrink-0">
              <Users className="w-3 h-3" />{booking.guests} guest{booking.guests !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${statusColor[booking.status]}`}>
            {booking.status}
          </span>
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 mb-3">
        <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-gray-800 shrink-0">
            {fmt(booking.checkIn)}
          </span>
          {booking.checkIn !== booking.checkOut && (
            <>
              <span className="text-gray-400 shrink-0">→</span>
              <span className="font-semibold text-gray-800 shrink-0">
                {fmt(booking.checkOut)}
              </span>
            </>
          )}
          <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
            {days} day{days !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-gray-400">
          {sourceLabel[booking.source] || booking.source} ·{" "}
          {new Date(booking.createdAt).toLocaleDateString("en-LK", {
            day: "2-digit", month: "short",
          })}
        </span>
        {booking.notes && (
          <span className="text-[11px] text-gray-500 italic max-w-xs truncate">
            &ldquo;{booking.notes}&rdquo;
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-3 mt-1 border-t border-gray-100">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Status:</label>
        <div className="relative">
          <select 
            value={booking.status}
            onChange={(e) => handleStatus(e.target.value as BookingStatus)}
            disabled={isPending}
            className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer outline-none
              ${booking.status === "confirmed" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                booking.status === "pending" ? "bg-yellow-50 text-yellow-800 border-yellow-200" :
                booking.status === "cancelled" ? "bg-red-50 text-red-800 border-red-200" :
                "bg-blue-50 text-blue-800 border-blue-200"}`}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ChevronRight className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none rotate-90" />
        </div>

        {isPending && <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-1" />}

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 text-xs font-medium transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full shrink-0 ${confirmModal.type === 'delete' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  {confirmModal.type === 'delete' ? 'Delete Booking?' : 'Cancel Booking?'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {confirmModal.type === 'delete' 
                    ? `Are you sure you want to permanently delete the booking for ${booking.guestName}? This action cannot be undone.`
                    : `Are you sure you want to cancel the booking for ${booking.guestName}?`}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-bold transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={confirmModal.type === 'delete' ? executeDelete : () => executeStatusUpdate('cancelled')}
                className={`flex-1 px-4 py-2 text-white rounded-xl text-sm font-bold transition-colors ${
                  confirmModal.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                {confirmModal.type === 'delete' ? 'Yes, Delete' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

type TabType =
  | "dashboard"
  | "bookings"
  | "new"
  | "cms_general"
  | "cms_gallery"
  | "cms_hero"
  | "cms_cabana"
  | "cms_pool"
  | "cms_dining"
  | "cms_experiences"
  | "cms_reviews"
  | "cms_faq"
  | "cms_seo";

export default function AdminDashboard({ stats, initialBookings, initialSettings, username }: Props) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeStats, setActiveStats] = useState<Stats | null>(stats);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, startRefresh] = useTransition();
  const [isLoggingOut, startLogout] = useTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<Record<string, unknown>>(initialSettings || {});
  const router = useRouter();

  const loadSettings = useCallback(async () => {
    try {
      const list = await getSettings();
      const map: Record<string, unknown> = {};
      list.forEach((s) => { map[s.key] = s.value; });
      setSettings(map);
    } catch (e) {
      console.error("loadSettings error:", e);
    }
  }, []);

  const refresh = useCallback(() => {
    startRefresh(async () => {
      const [b, s] = await Promise.all([
        getAllBookings({}),
        getBookingStats(),
      ]);
      setBookings((b.bookings || []) as Booking[]);
      setActiveStats(s as Stats | null);
      await loadSettings();
    });
  }, [loadSettings]);

  const handleLogout = () => {
    startLogout(async () => {
      await adminLogout();
      router.push("/admin/login");
    });
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      b.guestName.toLowerCase().includes(q) || 
      b.guestPhone.includes(q) || 
      (b.guestEmail && b.guestEmail.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const exportBookingsToCSV = () => {
    const headers = ["Booking ID", "Guest Name", "Phone", "Email", "Check-In", "Check-Out", "Days", "Guests", "Status", "Source", "Notes", "Created At"];
    const rows = filteredBookings.map(b => {
      const days = Math.max(0, Math.round((new Date(b.checkOut.slice(0, 10)).getTime() - new Date(b.checkIn.slice(0, 10)).getTime()) / (1000 * 60 * 60 * 24))) + 1;
      return [
        b.id,
        `"${(b.guestName || "").replace(/"/g, '""')}"`,
        `"${b.guestPhone}"`,
        `"${b.guestEmail || ""}"`,
        b.checkIn.slice(0, 10),
        b.checkOut.slice(0, 10),
        days,
        b.guests,
        b.status,
        b.source,
        `"${(b.notes || "").replace(/"/g, '""')}"`,
        b.createdAt.slice(0, 10)
      ];
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `misty-heights-bookings-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const operationsNav = [
    { id: "dashboard" as TabType, label: "Overview & Calendar", icon: LayoutDashboard },
    { id: "bookings" as TabType, label: "All Bookings", icon: ClipboardList, badge: activeStats?.pending },
    { id: "new" as TabType, label: "Add New Booking", icon: Plus },
  ];

  const cmsNav = [
    { id: "cms_general" as TabType, label: "Hotel Info & Contacts", icon: Globe },
    { id: "cms_gallery" as TabType, label: "Photo Gallery", icon: Camera },
    { id: "cms_hero" as TabType, label: "Hero Banner & Slides", icon: Sparkles },
    { id: "cms_cabana" as TabType, label: "Cabana Villa & Rooms", icon: Home },
    { id: "cms_pool" as TabType, label: "River Pool & Swimming", icon: Waves },
    { id: "cms_dining" as TabType, label: "Village Dining & BBQ", icon: Utensils },
    { id: "cms_experiences" as TabType, label: "Activities & Highlights", icon: Compass },
    { id: "cms_reviews" as TabType, label: "Guest Reviews", icon: Star },
    { id: "cms_faq" as TabType, label: "FAQ Questions", icon: HelpCircle },
    { id: "cms_seo" as TabType, label: "Google Search (SEO)", icon: Search },
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Overview & Booking Calendar";
      case "bookings": return "All Reservations & Guests";
      case "new": return "Add New Booking";
      case "cms_general": return "Hotel Info & Direct Contacts";
      case "cms_gallery": return "Website Photo Gallery";
      case "cms_hero": return "Hero Banner & Top Slides";
      case "cms_cabana": return "Cabana Villa & Bedroom Details";
      case "cms_pool": return "Natural River Pool & Stream";
      case "cms_dining": return "Village Food & Dining Packages";
      case "cms_experiences": return "Guest Activities & Signature Pillars";
      case "cms_reviews": return "Guest Reviews & Traveler Stories";
      case "cms_faq": return "Frequently Asked Questions";
      case "cms_seo": return "Google Search Preview & SEO";
      default: return "Admin Dashboard";
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0b2416] text-white w-64 p-4 overflow-y-auto">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 py-3 mb-2 border-b border-emerald-900/60 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight truncate">Misty Heights</p>
          <p className="text-[10px] text-emerald-400 font-medium">Hotel Portal</p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        {/* Reservations */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
            Guest Reservations
          </p>
          {operationsNav.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer
                ${activeTab === id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-200/90 hover:bg-emerald-900/60 hover:text-white"}`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
              {badge ? (
                <span className="px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-950 text-[10px] font-bold">
                  {badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Website Content */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest mb-1.5">
            Website Sections
          </p>
          {cmsNav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all w-full text-left cursor-pointer
                ${activeTab === id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-200/90 hover:bg-emerald-900/60 hover:text-white"}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* User + Logout */}
      <div className="mt-6 pt-3 border-t border-emerald-900/60 shrink-0">
        <div className="flex items-center justify-between px-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{username}</p>
            <p className="text-[10px] text-emerald-400">Hotel Staff</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="p-2 rounded-lg hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors cursor-pointer"
            title="Log Out"
          >
            {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 lg:relative lg:z-auto transform transition-transform duration-200 shrink-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {sidebarContent}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                {getTabTitle()}
              </h1>
              <p className="text-[11px] text-gray-400 truncate">
                Misty Heights Endawala · Sinharaja
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-emerald-700 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Website
            </a>

            <button
              onClick={refresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          {/* ── DASHBOARD TAB ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Stays" value={activeStats?.total ?? 0} icon={ClipboardList} color="bg-gray-100 text-gray-600" />
                <StatCard label="Pending Requests" value={activeStats?.pending ?? 0} icon={Clock} color="bg-yellow-100 text-yellow-600" />
                <StatCard label="Confirmed Stays" value={activeStats?.confirmed ?? 0} icon={CheckCircle} color="bg-emerald-100 text-emerald-600" />
                <StatCard label="Today's Check-ins" value={activeStats?.todayCheckIns ?? 0} icon={Users} color="bg-blue-100 text-blue-600" />
              </div>

              {/* Calendar + Pending Bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BookingCalendar bookings={bookings} />

                {/* Pending Bookings */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    Pending Guest Requests
                    {activeStats?.pending ? (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold">
                        {activeStats.pending}
                      </span>
                    ) : null}
                  </h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {bookings.filter((b) => b.status === "pending").length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-8">
                        No pending reservation requests right now 🎉
                      </p>
                    ) : (
                      bookings
                        .filter((b) => b.status === "pending")
                        .slice(0, 5)
                        .map((b) => <BookingCard key={b.id} booking={b} onRefresh={refresh} />)
                    )}
                  </div>
                </div>
              </div>

              {/* Upcoming Confirmed Bookings */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Upcoming Confirmed Guest Stays
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {bookings
                    .filter((b) => b.status === "confirmed" && new Date(b.checkIn) >= new Date())
                    .slice(0, 6)
                    .map((b) => <BookingCard key={b.id} booking={b} onRefresh={refresh} />)}
                  {bookings.filter((b) => b.status === "confirmed" && new Date(b.checkIn) >= new Date()).length === 0 && (
                    <p className="text-sm text-gray-400 col-span-3 text-center py-8">
                      No upcoming confirmed guest stays
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── BOOKINGS TAB ── */}
          {activeTab === "bookings" && (
            <div className="space-y-5 max-w-7xl mx-auto">
              {/* Filter bar */}
              <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-wrap gap-2 items-center">
                  {["all", "pending", "confirmed", "cancelled", "completed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors capitalize cursor-pointer
                        ${statusFilter === s
                          ? s === "pending" ? "bg-yellow-500 text-white border-yellow-500"
                            : s === "confirmed" ? "bg-emerald-600 text-white border-emerald-600"
                            : s === "cancelled" ? "bg-red-500 text-white border-red-500"
                            : s === "completed" ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-800 text-white border-gray-800"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      {s === "all" ? `All Reservations (${bookings.length})` : s}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search guest name, phone, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  <button
                    onClick={exportBookingsToCSV}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
                    title="Download guest list as spreadsheet"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Download List</span>
                  </button>
                </div>
              </div>

              {/* Booking list */}
              {filteredBookings.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <XCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No reservations found under &quot;{statusFilter}&quot;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredBookings.map((b) => (
                    <BookingCard key={b.id} booking={b} onRefresh={refresh} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── NEW BOOKING TAB ── */}
          {activeTab === "new" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Add New Guest Reservation</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Direct reservation for walk-in or phone guests · Automatic availability check
                  </p>
                </div>
                <NewBookingForm onSuccess={() => { refresh(); setActiveTab("bookings"); }} />
              </div>
            </div>
          )}

          {/* ── CMS SECTIONS ── */}
          <div className="max-w-5xl mx-auto">
            {activeTab === "cms_general" && (
              <GeneralSettingsCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_hero" && (
              <HeroCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_cabana" && (
              <CabanaCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_pool" && (
              <RiverPoolCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_dining" && (
              <DiningCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_experiences" && (
              <ExperiencesCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_reviews" && (
              <TestimonialsCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_faq" && (
              <FaqCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_seo" && (
              <SeoCMS settings={settings} onRefresh={loadSettings} />
            )}
            {activeTab === "cms_gallery" && (
              <GalleryCMS settings={settings} onRefresh={loadSettings} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
