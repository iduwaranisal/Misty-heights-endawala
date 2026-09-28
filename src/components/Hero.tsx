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
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-[#0a2a18] to-emerald-900 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Welcome Tag */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-100 text-xs font-medium max-w-full">
              <span className="text-amber-300 font-serif font-bold shrink-0">ආයුබෝවන්</span>
              <span className="text-white/40 shrink-0">·</span>
              <span className="sm:hidden font-medium">Welcome to Sinharaja</span>
              <span className="hidden sm:inline font-medium">Ayubowan · Welcome to Sinharaja, Sri Lanka</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.15]">
              <span className="text-white">Escape to{" "}</span>
              <span className="text-gradient-animate">
                Misty Heights Cabana
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed max-w-xl">
              Relax in our cozy wooden retreat near Sinharaja Rainforest. Enjoy breathtaking views,
              a natural pool, and serene mountain vibes. Perfect for holidays filled with nature and
              adventure!
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1 max-w-lg">
              {[
                { icon: Mountain, label: "Scenic Hikes", color: "bg-emerald-500/20 text-emerald-300" },
                { icon: Waves, label: "Kayaking & Pool", color: "bg-teal-500/20 text-teal-300" },
                { icon: Flame, label: "Bonfire & BBQ", color: "bg-amber-500/20 text-amber-300" },
                { icon: Home, label: "Cozy Nature Stay", color: "bg-emerald-500/20 text-emerald-300" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/8 backdrop-blur border border-white/15 shadow-xs">
                  <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white/90">{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
              <button
                onClick={onOpenBooking}
                className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book Your Stay
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/94719817000?text=Hello%20Misty%20Heights%20Endawala,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm flex items-center justify-center gap-2 transition-all backdrop-blur"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                WhatsApp Us
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-200/70 pt-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Us: <strong className="text-white">071 981 7000</strong> · Open Every Day</span>
            </div>
          </div>

          {/* Right Column: Hero Photo */}
          <div className="lg:col-span-6 relative">
            {/* Glowing ring around image */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-400/40 via-teal-500/30 to-emerald-600/40 blur-lg" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-[4/3] group">
              <Image
                src="/images/cabana-view.jpg"
                alt="Misty Heights Real Wooden Cabana Overlooking Sinharaja Mountains"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
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
