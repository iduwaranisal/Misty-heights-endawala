"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import {
  Calendar, Users, Phone, Mail, MessageSquare, ShieldCheck,
  Clock, Sparkles, ArrowRight, User, HeartHandshake,
  AlertTriangle, CheckCircle, Loader2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { submitPublicBooking, checkDateAvailabilityAction } from "@/actions/bookings";

// ── Types & Helpers ─────────────────────────────────────────────────────────

interface Suggestion {
  checkIn: string;
  checkOut: string;
  nights: number;
  description: string;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-LK", { day: "2-digit", month: "long", year: "numeric" });

const calcNights = (ci: string, co: string) => {
  if (!ci || !co) return 0;
  return Math.max(0, Math.ceil((new Date(co).getTime() - new Date(ci).getTime()) / 86400000));
};

// ── Inline Mini Calendar ─────────────────────────────────────────────────────

function MiniCalendar({
  label, value, onChange, minDate,
}: { label: string; value: string; onChange: (v: string) => void; minDate?: string }) {
  const today = new Date();
  const seed = value ? new Date(value) : today;
  const [view, setView] = useState(new Date(seed.getFullYear(), seed.getMonth(), 1));
  const yr = view.getFullYear();
  const mo = view.getMonth();
  const firstDay = new Date(yr, mo, 1).getDay();
  const days = new Date(yr, mo + 1, 0).getDate();
  const min = new Date(minDate || today);
  min.setHours(0, 0, 0, 0);

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const MONTHS_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS = ["S","M","T","W","T","F","S"];

  const pick = (d: number) => {
    const date = new Date(yr, mo, d);
    date.setHours(0,0,0,0);
    if (date < min) return;
    onChange(date.toISOString().slice(0,10));
  };

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setView(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  }, [value]);

  return (
    <div className="bg-gray-50/80 rounded-2xl border border-gray-200 p-4">
      <p className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest mb-3">{label}</p>

      {/* Nav */}
      <div className="flex items-center justify-between mb-2.5">
        <button type="button" onClick={() => setView(new Date(yr, mo - 1, 1))}
          className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-sm font-bold text-gray-900">{MONTHS_FULL[mo]} {yr}</span>
        <button type="button" onClick={() => setView(new Date(yr, mo + 1, 1))}
          className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-gray-400">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map((day) => {
          const date = new Date(yr, mo, day);
          date.setHours(0,0,0,0);
          const past = date < min;
          const sel = value === date.toISOString().slice(0,10);
          const isToday = date.getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
          return (
            <button type="button" key={day} onClick={() => pick(day)} disabled={past}
              className={`h-8 w-full rounded-lg text-[11px] font-semibold transition-all
                ${past ? "text-gray-200 cursor-not-allowed" :
                  sel ? "bg-emerald-600 text-white shadow-sm" :
                  isToday ? "ring-2 ring-emerald-400 text-emerald-800 bg-white" :
                  "text-gray-700 hover:bg-emerald-50 cursor-pointer"}`}>
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected value pill */}
      {value && (
        <div className="mt-3 text-center">
          <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {fmt(value)}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────

export default function BookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");

  const [availStatus, setAvailStatus] = useState<"idle" | "checking" | "free" | "conflict">("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [, startCheck] = useTransition();

  const nights = calcNights(checkIn, checkOut);

  const checkDates = useCallback((ci: string, co: string) => {
    if (!ci || !co) return;
    setAvailStatus("checking");
    setSuggestions([]);
    setResult(null);
    startCheck(async () => {
      const res = await checkDateAvailabilityAction(ci, co);
      setAvailStatus(res.success ? "free" : "conflict");
      if (!res.success && res.suggestions) setSuggestions(res.suggestions as Suggestion[]);
    });
  }, []);

  const handleCheckIn = (v: string) => {
    setCheckIn(v);
    if (checkOut && v >= checkOut) { setCheckOut(""); setAvailStatus("idle"); setSuggestions([]); }
    else if (checkOut) checkDates(v, checkOut);
  };

  const handleCheckOut = (v: string) => {
    setCheckOut(v);
    if (checkIn) checkDates(checkIn, v);
  };

  const applySuggestion = (s: Suggestion) => {
    setCheckIn(s.checkIn.slice(0, 10));
    setCheckOut(s.checkOut.slice(0, 10));
    setAvailStatus("free");
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      const res = await submitPublicBooking({
        guestName: name, guestPhone: phone, guestEmail: email,
        checkIn, checkOut, guests, notes,
      });
      if (res.success && res.data) {
        const id = (res.data as { bookingId: string }).bookingId;
        setSubmitted(true);
        setResult({ ok: true, msg: res.message });
        const msg = `🌿 Ayubowan Misty Heights Endawala!\n\nBooking submitted via website:\n• Name: ${name}\n• Phone: ${phone}\n• Check-in: ${fmt(checkIn)}\n• Check-out: ${fmt(checkOut)}\n• ${nights} nights · ${guests} guests\n${notes ? `• Notes: ${notes}` : ""}\n• Ref: #${id.slice(-6).toUpperCase()}\n\nPlease confirm availability. Thank you!`;
        setTimeout(() => {
          window.open(`https://wa.me/94719817000?text=${encodeURIComponent(msg)}`, "_blank");
        }, 600);
      } else {
        setResult({ ok: false, msg: res.message });
        if (res.suggestions) { setSuggestions(res.suggestions as Suggestion[]); setAvailStatus("conflict"); }
      }
    });
  };

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400";

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Direct Booking
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f2416] tracking-tight">
            Reserve Your Rainforest Stay
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Check availability in real time, pick your dates, and send us a quick message.
            We&apos;ll confirm your stay personally within hours.
          </p>
        </div>

        {/* ── Grid Layout ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">

          {/* ── LEFT: Full Booking Form ─────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-2xl shadow-emerald-950/5 overflow-hidden">

              {/* Form header */}
              <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
                    Instant Availability Check
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0f2416] mt-0.5">
                    Book Your Dates
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Check
                </div>
              </div>

              {/* ── Submitted Success State ── */}
              {submitted && result?.ok ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Booking Submitted!</h4>
                  <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
                    WhatsApp is opening to connect you with us. We&apos;ll confirm your stay and send all arrival details shortly.
                  </p>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm font-semibold text-emerald-900">
                    {fmt(checkIn)} → {fmt(checkOut)} · {nights} nights · {guests} guests
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a href="https://wa.me/94719817000" target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold transition-colors">
                      <MessageSquare className="w-4 h-4" /> Open WhatsApp
                    </a>
                    <button onClick={() => { setSubmitted(false); setResult(null); setCheckIn(""); setCheckOut(""); setName(""); setPhone(""); setEmail(""); setNotes(""); setAvailStatus("idle"); setSuggestions([]); }}
                      className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer">
                      Book Another Stay
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                  {/* ── Calendar Pickers ── */}
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      Select Your Dates
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <MiniCalendar
                        label="Check-In Date"
                        value={checkIn}
                        onChange={handleCheckIn}
                        minDate={new Date().toISOString().slice(0, 10)}
                      />
                      <MiniCalendar
                        label="Check-Out Date"
                        value={checkOut}
                        onChange={handleCheckOut}
                        minDate={checkIn || new Date().toISOString().slice(0, 10)}
                      />
                    </div>

                    {/* Nights summary pill */}
                    {checkIn && checkOut && nights > 0 && (
                      <div className="flex items-center justify-between mt-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="flex items-center gap-2 text-sm text-emerald-900 font-medium">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{fmt(checkIn)}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{fmt(checkOut)}</span>
                        </div>
                        <span className="text-xs font-extrabold bg-emerald-600 text-white px-2.5 py-1 rounded-full">
                          {nights} night{nights !== 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── Availability Status ── */}
                  {availStatus !== "idle" && (
                    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border
                      ${availStatus === "checking" ? "bg-blue-50 border-blue-200 text-blue-700" :
                        availStatus === "free" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                        "bg-red-50 border-red-200 text-red-700"}`}>
                      {availStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
                      {availStatus === "free" && <CheckCircle className="w-4 h-4 shrink-0" />}
                      {availStatus === "conflict" && <AlertTriangle className="w-4 h-4 shrink-0" />}
                      <span>
                        {availStatus === "checking" && "Checking availability with our calendar…"}
                        {availStatus === "free" && "Great news! Those dates are free and available."}
                        {availStatus === "conflict" && "Those dates are already taken. See smart alternatives below."}
                      </span>
                    </div>
                  )}

                  {/* ── Smart Suggestions ── */}
                  {suggestions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Nearest Available Dates
                      </p>
                      {suggestions.map((s, i) => (
                        <button key={i} type="button" onClick={() => applySuggestion(s)}
                          className="w-full flex items-center justify-between p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50/60 hover:from-emerald-100 hover:to-teal-100/80 text-left transition-all group">
                          <div>
                            <p className="text-sm font-bold text-emerald-900">
                              {fmt(s.checkIn)} → {fmt(s.checkOut)}
                            </p>
                            <p className="text-xs text-emerald-600 mt-0.5">
                              {s.nights} night{s.nights !== 1 ? "s" : ""} · {s.description}
                            </p>
                          </div>
                          <span className="ml-2 shrink-0 text-xs font-bold text-emerald-700 bg-emerald-200 group-hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-colors">
                            Select →
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── Guests slider ── */}
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      Number of Guests
                    </p>
                    <div className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-200 bg-gray-50">
                      <input type="range" min={1} max={15} step={1} value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="flex-1 accent-emerald-600" />
                      <span className="text-sm font-extrabold text-gray-900 w-24 text-right shrink-0">
                        {guests} guest{guests !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* ── Guest Details ── */}
                  <div className="border-t border-gray-100 pt-5 space-y-4">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      Your Details
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name *</label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="Kasun Perera" className={`${inputCls} pl-9`} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">WhatsApp / Phone *</label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                            placeholder="071 981 7000" className={`${inputCls} pl-9`} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                        Email <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com" className={`${inputCls} pl-9`} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                        Special Requests <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
                        placeholder="Vegetarian meals, early check-in, kayaking, guided hike, birthday surprise…"
                        className={`${inputCls} resize-none`} />
                    </div>
                  </div>

                  {/* ── Result message ── */}
                  {result && !result.ok && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{result.msg}</span>
                    </div>
                  )}

                  {/* ── Submit ── */}
                  <button
                    type="submit"
                    disabled={isPending || !checkIn || !checkOut || nights < 1 || availStatus === "conflict" || availStatus === "checking" || !name.trim() || !phone.trim()}
                    className="w-full py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/15 flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:shadow-emerald-950/25 border border-emerald-600/20"
                  >
                    {isPending ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Your Booking…</>
                    ) : (
                      <><MessageSquare className="w-5 h-5 text-emerald-300" /> Reserve & Confirm on WhatsApp <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-400">
                    Your booking is saved in our system and sent to us via WhatsApp for confirmation.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ── RIGHT: Contact + Info ──────────────────────────── */}
          <div className="lg:col-span-5 space-y-5">

            {/* Dark Contact Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#071d10] via-[#0d2e1b] to-[#071d10] text-white shadow-2xl border border-emerald-500/20 space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold block">
                  Sri Lankan Hospitality
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  Talk Directly With Us
                </h3>
                <p className="text-xs text-emerald-100/75 mt-1 leading-relaxed">
                  Reach us anytime — we&apos;re always happy to help with your plans, directions, and questions.
                </p>
              </div>

              <div className="space-y-2.5">
                {/* WhatsApp */}
                <a href="https://wa.me/94719817000" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">WhatsApp</span>
                    <strong className="text-base text-white">071 981 7000</strong>
                  </div>
                </a>

                {/* Phone 1 */}
                <a href="tel:0719817000"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">Primary Line</span>
                    <strong className="text-base text-white">071 981 7000</strong>
                  </div>
                </a>

                {/* Phone 2 */}
                <a href="tel:0718680633"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/25 text-teal-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">Secondary Line</span>
                    <strong className="text-base text-white">071 868 0633</strong>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:mistyheightsendawala@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">Email</span>
                    <span className="text-xs text-white truncate block">mistyheightsendawala@gmail.com</span>
                  </div>
                </a>
              </div>

              {/* Promises */}
              <div className="pt-4 border-t border-emerald-800/60 space-y-2.5 text-xs text-emerald-100/85">
                {[
                  { icon: Clock, text: "Open every day — arrive any time" },
                  { icon: ShieldCheck, text: "Direct booking, personal attention" },
                  { icon: HeartHandshake, text: "Warm Sri Lankan hospitality" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works card */}
            <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3.5">
              <p className="text-xs font-extrabold text-gray-700 uppercase tracking-widest">How Booking Works</p>
              {[
                { n: "1", t: "Pick your dates", d: "Select check-in & check-out — availability checked live" },
                { n: "2", t: "Fill your details", d: "Name, phone, and any special requests" },
                { n: "3", t: "Submit & WhatsApp", d: "Your booking is saved and we confirm via WhatsApp" },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Facebook card */}
            <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Official Facebook Page</span>
                <span className="text-sm font-bold text-gray-900">Misty Heights Endawala</span>
              </div>
              <a href="https://www.facebook.com/profile.php?id=61571649441031" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors shrink-0">
                Visit →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
