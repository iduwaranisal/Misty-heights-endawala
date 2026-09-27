"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function BookingSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests · Couples Retreat");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🌿 Ayubowan Misty Heights Endawala! 🌿
I would like to inquire about booking a stay:
• Name: ${name || "Guest"}
• Phone: ${phone || "Not provided"}
• Check-in: ${checkIn || "Flexible"}
• Check-out: ${checkOut || "Flexible"}
• Guests: ${guests}
${notes ? `• Special Requests: ${notes}` : ""}

Please let me know availability and details. Thank you!`;

    window.open(`https://wa.me/94719817000?text=${encodeURIComponent(message)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      {/* Decorative ambient gradient blooms */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Direct Host Reservations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f2416] tracking-tight">
            Plan Your Rainforest Escape
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Reserve your dates directly with our local retreat host. Connect instantly via WhatsApp
            or phone for quick, personal assistance.
          </p>
        </div>

        {/* Modern Split Booking Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Main Booking Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-2xl shadow-emerald-950/5 relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  Fast WhatsApp Booking
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0f2416]">
                  Check Availability
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live 24/7 Response
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
                      onChange={(e) => setCheckIn(e.target.value)}
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
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Guests & Travel Party
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  >
                    <option value="2 Guests · Couples Retreat">2 Guests · Couples Retreat</option>
                    <option value="3–4 Guests · Family or Small Group">3–4 Guests · Family or Small Group</option>
                    <option value="5–8 Guests · Group Getaway">5–8 Guests · Group Getaway</option>
                    <option value="Exclusive Full Cabana Booking">Exclusive Full Cabana Booking</option>
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

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 hover:from-emerald-800 hover:to-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/10 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageSquare className="w-5 h-5" />
                  Request Availability on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 text-center font-medium">
                  ✓ Opening WhatsApp with your reservation details! You can also call us directly anytime.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Host & Direct Contact Showcase */}
          <div className="lg:col-span-5 space-y-6">
            {/* Host Identity Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e2717] via-[#144327] to-[#0e2717] text-white shadow-xl space-y-6 border border-emerald-700/40">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold block">
                  Authentic Hospitality
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Connect with the Host
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                  We look forward to welcoming you to the cool mountains of Sinharaja.
                </p>
              </div>

              {/* Direct Hotlines */}
              <div className="space-y-3">
                <a
                  href="tel:0719817000"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all border border-white/10 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-semibold">
                      Primary Reservation Line
                    </span>
                    <strong className="text-lg text-white font-serif">071 981 7000</strong>
                  </div>
                </a>

                <a
                  href="tel:0718680633"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all border border-white/10 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block font-semibold">
                      Secondary Contact
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

              {/* Host Guarantees */}
              <div className="pt-4 border-t border-emerald-800/80 space-y-2.5 text-xs text-emerald-100/90">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Always Open · 24/7 guest check-in & assistance</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Direct owner booking with personalized care</span>
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
                href="https://www.facebook.com/search/top?q=misty%20heights%20endawala%20sinharaja"
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
