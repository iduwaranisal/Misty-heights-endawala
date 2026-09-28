"use client";

import { useState } from "react";
import { X, Calendar, Phone, MessageSquare, User, Users, ArrowRight } from "lucide-react";

export default function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests · Couples Retreat");
  const [specialNote, setSpecialNote] = useState("");

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🌿 Ayubowan Misty Heights Endawala! 🌿
I would like to book a stay:
• Name: ${name || "Guest"}
• Phone: ${phone || "Not specified"}
• Check-in: ${checkIn || "Flexible"}
• Check-out: ${checkOut || "Flexible"}
• Guests: ${guests}
${specialNote ? `• Notes: ${specialNote}` : ""}

Please confirm availability and details. Thank you!`;

    window.open(`https://wa.me/94719817000?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-8 my-8 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 border-b border-gray-100 pb-4">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Book Your Stay
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#0f2416]">
            Reserve Your Dates
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Misty Heights Endawala · Sinharaja Rainforest · 071 981 7000
          </p>
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Kasun Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              WhatsApp / Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="e.g. 071 234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Check-in
              </label>
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Check-out
              </label>
              <input
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Guests & Travel Party
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              >
                <option value="2 Guests · Couples Retreat">2 Guests · Couples Retreat</option>
                <option value="3-4 Guests · Family / Friends">3–4 Guests · Family / Friends</option>
                <option value="5-8 Guests · Group Stay">5–8 Guests · Group Stay</option>
                <option value="Entire Wooden Cabana (Private Stay)">Entire Wooden Cabana (Private Stay)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Special Requests or Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Vegetarian food, kayaking, guided hike..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm shadow-md shadow-amber-900/15 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4" />
              Send Booking on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Prefer to call us?</span>
          <a
            href="tel:0719817000"
            className="flex items-center gap-1 text-emerald-700 hover:underline font-bold"
          >
            <Phone className="w-3.5 h-3.5" />
            071 981 7000
          </a>
        </div>
      </div>
    </div>
  );
}
