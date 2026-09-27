"use client";

import Image from "next/image";
import {
  Calendar,
  Mountain,
  Waves,
  Flame,
  Home,
  MessageSquare,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle radial emerald gradient backdrop */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Cultural Welcome Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-900 text-xs font-semibold">
              <span className="text-emerald-700 font-serif font-bold">ආයුබෝවන්</span>
              <span className="text-emerald-400">·</span>
              <span>Ayubowan · Welcome to Sinharaja, Sri Lanka</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0f2416] tracking-tight leading-[1.15]">
              Escape to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                Misty Heights Cabana
              </span>
            </h1>

            {/* Simple, Natural English Description */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              Relax in our cozy wooden retreat near Sinharaja Rainforest. Enjoy breathtaking views,
              a natural pool, and serene mountain vibes. Perfect for holidays filled with nature and
              adventure!
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1 max-w-lg">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mountain className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Scenic Hikes</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Waves className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Kayaking & Pool</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Bonfire & BBQ</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Cozy Nature Stay</span>
              </div>
            </div>

            {/* Clean Hero Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
              <button
                onClick={onOpenBooking}
                className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 hover:from-emerald-800 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-950/10 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book Your Stay
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/94719817000?text=Hello%20Misty%20Heights%20Endawala,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                WhatsApp Us
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call Us: <strong className="text-gray-800">071 981 7000</strong> · Open Every Day</span>
            </div>
          </div>

          {/* Right Column: Hero Real Photograph (Unobstructed, full view) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
              <Image
                src="/images/cabana-view.jpg"
                alt="Misty Heights Real Wooden Cabana Overlooking Sinharaja Mountains"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091b10]/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold block">
                    Sinharaja Rainforest Foothills
                  </span>
                  <p className="text-lg font-serif font-bold text-white mt-1">
                    Two-story wooden retreat surrounded by pure mountain mist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
