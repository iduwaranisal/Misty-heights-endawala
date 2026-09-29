"use client";

import { useState, useTransition } from "react";
import {
  Calendar,
  Users,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  HeartHandshake,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { submitPublicBooking, checkDateAvailabilityAction } from "@/actions/bookings";

interface Suggestion {
  checkIn: string;
  checkOut: string;
  nights: number;
  description: string;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-LK", { day: "2-digit", month: "short", year: "numeric" });

export default function BookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [availStatus, setAvailStatus] = useState<"idle" | "checking" | "free" | "conflict">("idle");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isCheckingDates, startCheck] = useTransition();

  const handleDateBlur = () => {
    if (!checkIn || !checkOut) return;
    setAvailStatus("checking");
    setSuggestions([]);
    startCheck(async () => {
      const res = await checkDateAvailabilityAction(checkIn, checkOut);
      setAvailStatus(res.success ? "free" : "conflict");
      if (!res.success && res.suggestions) setSuggestions(res.suggestions as Suggestion[]);
    });
  };

  const applySuggestion = (s: Suggestion) => {
    setCheckIn(s.checkIn.slice(0, 10));
    setCheckOut(s.checkOut.slice(0, 10));
    setAvailStatus("idle");
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      const res = await submitPublicBooking({ guestName: name, guestPhone: phone, checkIn, checkOut, guests, notes });
      if (res.success) {
        setResult({ ok: true, msg: res.message });
        // Also open WhatsApp as confirmation channel
        const msg = `🌿 Ayubowan Misty Heights Endawala!\nBooking confirmed in our system.\n• Name: ${name}\n• Phone: ${phone}\n• Check-in: ${checkIn}\n• Check-out: ${checkOut}\n• Guests: ${guests}\n${notes ? `• Notes: ${notes}` : ""}`;
        window.open(`https://wa.me/94719817000?text=${encodeURIComponent(msg)}`, "_blank");
        setName(""); setPhone(""); setCheckIn(""); setCheckOut(""); setNotes("");
      } else {
        setResult({ ok: false, msg: res.message });
        if (res.suggestions) setSuggestions(res.suggestions as Suggestion[]);
      }
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Book Your Stay
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f2416] tracking-tight">
            Plan Your Rainforest Getaway
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Reserve your holiday directly with us. Send a quick message on WhatsApp or call us
            anytime for friendly help.
          </p>
        </div>

        {/* Modern Split Booking Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Main Booking Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-2xl shadow-emerald-950/5 relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  Easy WhatsApp Booking
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0f2416]">
                  Check Availability
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Quick Reply
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Perera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    WhatsApp / Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 071 981 7000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

               {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={checkIn}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setCheckIn(e.target.value)}
                      onBlur={handleDateBlur}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={checkOut}
                      min={checkIn || new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setCheckOut(e.target.value)}
                      onBlur={handleDateBlur}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Availability Indicator */}
              {availStatus !== "idle" && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border
                  ${availStatus === "checking" ? "bg-blue-50 border-blue-200 text-blue-700" :
                    availStatus === "free" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                    "bg-red-50 border-red-200 text-red-700"}`}
                >
                  {availStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
                  {availStatus === "free" && <CheckCircle className="w-4 h-4 shrink-0" />}
                  {availStatus === "conflict" && <AlertTriangle className="w-4 h-4 shrink-0" />}
                  <span className="text-sm">
                    {availStatus === "checking" && "Checking availability..."}
                    {availStatus === "free" && "✓ Great news! Those dates are available."}
                    {availStatus === "conflict" && "Those dates are already booked. See alternatives below."}
                  </span>
                </div>
              )}

              {/* Smart Alternative Suggestions */}
              {suggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Nearest Available Dates for You
                  </p>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => applySuggestion(s)}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 text-left transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-semibold text-emerald-900">
                          {fmt(s.checkIn)} → {fmt(s.checkOut)}
                        </p>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          {s.nights} night{s.nights > 1 ? "s" : ""} · {s.description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-200 px-2 py-1 rounded-lg group-hover:bg-emerald-300">
                        Select →
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Guests &amp; Travel Party
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  >
                    <option value={2}>2 Guests · Couples Retreat</option>
                    <option value={3}>3 Guests · Small Family</option>
                    <option value={4}>4 Guests · Family / Friends</option>
                    <option value={6}>5–6 Guests · Group Getaway</option>
                    <option value={8}>7–8 Guests · Large Group</option>
                    <option value={10}>9–10 Guests · Private Party</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Special Notes or Guidance (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Need directions from Neluwa, vegetarian meal preference, kayaking, guided hike..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Result message */}
              {result && (
                <div className={`p-3.5 rounded-xl text-sm font-medium border text-center
                  ${result.ok ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-red-50 border-red-200 text-red-700"}`}
                >
                  {result.msg}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending || availStatus === "conflict"}
                  className="w-full py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] border border-emerald-600/30"
                >
                  {isPending ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Booking...</>
                  ) : (
                    <><MessageSquare className="w-5 h-5 text-emerald-300" /> Reserve Your Stay &amp; Confirm on WhatsApp <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Direct Contact Showcase */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#071d10] via-[#0d2e1b] to-[#071d10] text-white shadow-2xl space-y-6 border border-emerald-500/20 relative overflow-hidden">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold block">
                  Authentic Hospitality
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Talk Directly With Us
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                  We look forward to welcoming you to the cool mountains of Sinharaja.
                </p>
              </div>

              {/* Direct Hotlines */}
              <div className="space-y-3">
                <a
                  href="tel:0719817000"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all border border-white/10 group card-lift"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-semibold">
                      Primary Phone Line
                    </span>
                    <strong className="text-lg text-white font-serif">071 981 7000</strong>
                  </div>
                </a>

                <a
                  href="tel:0718680633"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all border border-white/10 group card-lift"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-semibold">
                      Secondary Phone Line
                    </span>
                    <strong className="text-lg text-white font-serif">071 868 0633</strong>
                  </div>
                </a>

                <a
                  href="mailto:mistyheightsendawala@gmail.com"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all border border-white/10 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-semibold">
                      Direct Email
                    </span>
                    <span className="text-xs text-white truncate block">
                      mistyheightsendawala@gmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Our Promise */}
              <div className="pt-4 border-t border-emerald-800/80 space-y-2.5 text-xs text-emerald-100/90">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Open Every Day · Friendly assistance whenever you arrive</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Direct booking with friendly, personal attention</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Warm Sri Lankan island hospitality</span>
                </div>
              </div>
            </div>

            {/* Social Page Link */}
            <div className="p-5 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider block">
                  Official Facebook Page
                </span>
                <span className="text-sm font-bold text-gray-900">
                  Misty Heights Endawala Sinharaja
                </span>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61571649441031"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors shrink-0"
              >
                Visit Page →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
