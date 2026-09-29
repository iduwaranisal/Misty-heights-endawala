"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import {
  X, Calendar, Phone, MessageSquare, User, Users, Loader2,
  CheckCircle, AlertTriangle, Sparkles, Mail, ArrowRight,
  Clock, ChevronLeft, ChevronRight, Shield
} from "lucide-react";
import { submitPublicBooking, checkDateAvailabilityAction } from "@/actions/bookings";

interface Suggestion {
  checkIn: string;
  checkOut: string;
  nights: number;
  description: string;
}

type Step = "dates" | "details" | "confirm" | "success";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-LK", { day: "2-digit", month: "long", year: "numeric" });

const calcNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

// ── Compact Inline Calendar ─────────────────────────────────────────────────

function InlineCalendar({
  value,
  onChange,
  minDate,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  minDate?: string;
  label: string;
}) {
  const today = new Date();
  const initMonth = value ? new Date(value) : today;
  const [viewMonth, setViewMonth] = useState(new Date(initMonth.getFullYear(), initMonth.getMonth(), 1));

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const min = minDate ? new Date(minDate) : new Date(today);
  min.setHours(0, 0, 0, 0);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const toLocalISO = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const selectDate = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    if (d < min) return;
    onChange(toLocalISO(d));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-2">{label}</p>

      {/* Month Nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setViewMonth(new Date(year, month - 1, 1))}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold text-gray-900">{monthNames[month]} {year}</span>
        <button
          type="button"
          onClick={() => setViewMonth(new Date(year, month + 1, 1))}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);
          const isPast = date < min;
          const isSelected = value === toLocalISO(date);
          const isToday = date.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

          return (
            <button
              type="button"
              key={day}
              onClick={() => selectDate(day)}
              disabled={isPast}
              className={`h-9 w-full rounded-lg text-xs font-medium transition-all
                ${isPast ? "text-gray-200 cursor-not-allowed" : "cursor-pointer hover:bg-emerald-50"}
                ${isSelected ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" :
                  isToday && !isPast ? "ring-2 ring-emerald-400 text-emerald-800" : "text-gray-700"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Modal ──────────────────────────────────────────────────────────────

export default function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("dates");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [availStatus, setAvailStatus] = useState<"idle" | "checking" | "free" | "conflict">("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isChecking, startCheck] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingId, setBookingId] = useState("");

  const nights = calcNights(checkIn, checkOut);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset on close
  const handleClose = () => {
    setStep("dates");
    setCheckIn(""); setCheckOut(""); setName(""); setPhone(""); setEmail("");
    setNotes(""); setGuests(2); setAvailStatus("idle"); setSuggestions([]);
    setErrorMsg(""); setBookingId("");
    onClose();
  };

  // Check availability when both dates set
  const checkDates = useCallback((ci: string, co: string) => {
    if (!ci || !co) return;
    setAvailStatus("checking");
    setSuggestions([]);
    setErrorMsg("");
    startCheck(async () => {
      const res = await checkDateAvailabilityAction(ci, co);
      setAvailStatus(res.success ? "free" : "conflict");
      if (!res.success && res.suggestions) setSuggestions(res.suggestions as Suggestion[]);
    });
  }, []);

  const handleCheckInChange = (v: string) => {
    setCheckIn(v);
    if (checkOut && v >= checkOut) setCheckOut("");
    setAvailStatus("idle");
    setSuggestions([]);
  };

  const handleCheckOutChange = (v: string) => {
    setCheckOut(v);
    if (v && checkIn) checkDates(checkIn, v);
  };

  const applySuggestion = (s: Suggestion) => {
    const ci = s.checkIn.slice(0, 10);
    const co = s.checkOut.slice(0, 10);
    setCheckIn(ci); setCheckOut(co);
    setAvailStatus("free"); setSuggestions([]);
  };

  const goToDetails = () => {
    if (!checkIn || !checkOut || nights < 1 || availStatus === "conflict") return;
    setStep("details");
  };

  const goToConfirm = () => {
    if (!name.trim() || !phone.trim()) return;
    setStep("confirm");
  };

  const handleSubmit = () => {
    setErrorMsg("");
    startTransition(async () => {
      const res = await submitPublicBooking({ guestName: name, guestPhone: phone, guestEmail: email, checkIn, checkOut, guests, notes });
      if (res.success && res.data) {
        setBookingId((res.data as { bookingId: string }).bookingId || "");
        setStep("success");
        // Open WhatsApp to notify
        const msg = `🌿 Ayubowan Misty Heights Endawala!\n\nMy booking has been submitted:\n• Name: ${name}\n• Phone: ${phone}\n• Check-in: ${fmt(checkIn)}\n• Check-out: ${fmt(checkOut)}\n• ${nights} nights · ${guests} guests\n${notes ? `• Notes: ${notes}` : ""}\n\nBooking Ref: ${(res.data as { bookingId: string }).bookingId?.slice(-6).toUpperCase()}\n\nPlease confirm my reservation. Thank you!`;
        setTimeout(() => {
          window.open(`https://wa.me/94719817000?text=${encodeURIComponent(msg)}`, "_blank");
        }, 800);
      } else {
        setErrorMsg(res.message);
        if (res.suggestions) {
          setSuggestions(res.suggestions as Suggestion[]);
          setStep("dates");
          setAvailStatus("conflict");
        }
      }
    });
  };

  if (!isOpen) return null;

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl border border-gray-100 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

        {/* ── Header Bar ─────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">
              {step === "dates" ? "Step 1 of 3 · Select Dates" :
               step === "details" ? "Step 2 of 3 · Your Details" :
               step === "confirm" ? "Step 3 of 3 · Confirm Booking" :
               "Booking Confirmed!"}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#0f2416] mt-0.5">
              {step === "dates" ? "Choose Your Dates" :
               step === "details" ? "Guest Information" :
               step === "confirm" ? "Review &amp; Book" :
               "We&apos;ll see you soon!"}
            </h3>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {["dates", "details", "confirm"].map((s, i) => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${
                step === "success" || ["dates", "details", "confirm"].indexOf(step) >= i
                  ? step === "success" ? "bg-emerald-500 w-5" : "bg-emerald-600 w-5"
                  : "bg-gray-200 w-3"
              }`} />
            ))}
            <button
              onClick={handleClose}
              className="ml-2 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Content ────────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-4">

          {/* ┌── STEP 1: DATE SELECTION ──┐ */}
          {step === "dates" && (
            <>
              {/* Calendar pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InlineCalendar
                  label="Check-In Date"
                  value={checkIn}
                  onChange={handleCheckInChange}
                  minDate={new Date().toISOString().slice(0, 10)}
                />
                <InlineCalendar
                  label="Check-Out Date"
                  value={checkOut}
                  onChange={handleCheckOutChange}
                  minDate={checkIn || new Date().toISOString().slice(0, 10)}
                />
              </div>

              {/* Selected dates summary */}
              {checkIn && checkOut && nights > 0 && (
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-emerald-900">{fmt(checkIn)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold text-emerald-900">{fmt(checkOut)}</span>
                  </div>
                  <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-full">
                    {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                </div>
              )}

              {/* Availability indicator */}
              {availStatus !== "idle" && (
                <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border transition-all
                  ${availStatus === "checking" ? "bg-blue-50 border-blue-200 text-blue-700" :
                    availStatus === "free" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                    "bg-red-50 border-red-200 text-red-700"}`}
                >
                  {availStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
                  {availStatus === "free" && <CheckCircle className="w-4 h-4 shrink-0" />}
                  {availStatus === "conflict" && <AlertTriangle className="w-4 h-4 shrink-0" />}
                  <span>
                    {availStatus === "checking" && "Checking availability…"}
                    {availStatus === "free" && "Great! Those dates are available ✓"}
                    {availStatus === "conflict" && "Already booked — see alternatives below"}
                  </span>
                  {isChecking && <Loader2 className="w-3.5 h-3.5 animate-spin ml-auto shrink-0" />}
                </div>
              )}

              {/* Smart suggestions */}
              {suggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Smart Suggestions — Nearest Available Stays
                  </p>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => applySuggestion(s)}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-left transition-all group"
                    >
                      <div>
                        <p className="text-sm font-bold text-emerald-900">
                          {fmt(s.checkIn)} → {fmt(s.checkOut)}
                        </p>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          {s.nights} night{s.nights !== 1 ? "s" : ""} · {s.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-200 group-hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-colors shrink-0 ml-2">
                        Select →
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Guests picker */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 bg-gray-50">
                  <Users className="w-4 h-4 text-gray-500 shrink-0" />
                  <div className="flex-1">
                    <input
                      type="number"
                      min={1}
                      value={guests || ""}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent border-none text-sm font-bold text-gray-900 focus:outline-none focus:ring-0 p-0"
                      placeholder="Enter number of guests"
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-20 text-right shrink-0">
                    guest{guests !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* ┌── STEP 2: GUEST DETAILS ──┐ */}
          {step === "details" && (
            <div className="space-y-4">
              {/* Summary bar */}
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-emerald-900">
                  {fmt(checkIn)} → {fmt(checkOut)}
                </span>
                <span className="text-emerald-600">· {nights} nights · {guests} guests</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    className={`${inputCls} pl-10`}
                    placeholder="e.g. Kasun Perera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  WhatsApp / Phone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    className={`${inputCls} pl-10`}
                    placeholder="071 981 7000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    className={`${inputCls} pl-10`}
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Special Requests <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  className={`${inputCls} h-20 resize-none`}
                  placeholder="Vegetarian meals, early check-in, kayaking, guided hike, birthday surprise…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ┌── STEP 3: CONFIRM ──┐ */}
          {step === "confirm" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 space-y-3">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Booking Summary</h4>

                {[
                  { label: "Guest", value: name, icon: User },
                  { label: "Phone", value: phone, icon: Phone },
                  { label: "Check-In", value: `${fmt(checkIn)} at 2:00 PM`, icon: Calendar },
                  { label: "Check-Out", value: `${fmt(checkOut)} at 11:00 AM`, icon: Calendar },
                  { label: "Duration", value: `${nights} night${nights !== 1 ? "s" : ""}`, icon: Clock },
                  { label: "Guests", value: `${guests} guest${guests !== 1 ? "s" : ""}`, icon: Users },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-gray-500 w-24 shrink-0">{label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}

                {email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-gray-500 w-24 shrink-0">Email</span>
                    <span className="font-semibold text-gray-900">{email}</span>
                  </div>
                )}

                {notes && (
                  <div className="pt-2 border-t border-emerald-100 text-xs text-gray-600 italic">
                    &ldquo;{notes}&rdquo;
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-800">
                <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  After confirming, WhatsApp will open so you can connect directly with us.
                  Your booking is pending until we confirm via phone or message.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* ┌── SUCCESS ──┐ */}
          {step === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Booking Submitted!</h4>
                {bookingId && (
                  <p className="text-xs text-gray-500 mt-1">
                    Ref: <span className="font-mono font-bold text-emerald-700">
                      #{bookingId.slice(-6).toUpperCase()}
                    </span>
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                WhatsApp is opening to connect you with us directly.
                We&apos;ll confirm your dates and send you all details shortly.
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-800 font-medium space-y-2">
                <div>{fmt(checkIn)} → {fmt(checkOut)}</div>
                <div className="text-xs text-emerald-600">{nights} nights · {guests} guests</div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={`https://wa.me/94719817000`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open WhatsApp Chat
                </a>
                <button
                  onClick={handleClose}
                  className="py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer Actions ──────────────────────────────────── */}
        {step !== "success" && (
          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3 shrink-0">
            {/* Back button */}
            {step !== "dates" && (
              <button
                type="button"
                onClick={() => setStep(step === "confirm" ? "details" : "dates")}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}

            {/* Primary action */}
            {step === "dates" && (
              <button
                type="button"
                onClick={goToDetails}
                disabled={!checkIn || !checkOut || nights < 1 || availStatus === "conflict" || availStatus === "checking"}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all cursor-pointer"
              >
                Continue to Guest Details
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === "details" && (
              <button
                type="button"
                onClick={goToConfirm}
                disabled={!name.trim() || !phone.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all cursor-pointer"
              >
                Review My Booking
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === "confirm" && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-sm transition-all cursor-pointer"
              >
                {isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Confirming...</>
                ) : (
                  <><CheckCircle className="w-4 h-4" /> Confirm Booking</>
                )}
              </button>
            )}
          </div>
        )}

        {/* Call footer */}
        {step !== "success" && (
          <div className="px-5 pb-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>Prefer to call?</span>
            <a href="tel:0719817000" className="flex items-center gap-1 text-emerald-700 font-bold hover:underline">
              <Phone className="w-3.5 h-3.5" /> 071 981 7000
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
