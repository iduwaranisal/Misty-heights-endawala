"use client";

import {
  Mountain,
  Waves,
  Flame,
  Home,
  Coffee,
  Bird,
  Compass,
  Sparkles,
} from "lucide-react";

const tickerItems = [
  { icon: Mountain, text: "Sinharaja Rainforest Foothills", accent: "text-emerald-400" },
  { icon: Waves, text: "Natural River Pool Swimming", accent: "text-cyan-400" },
  { icon: Compass, text: "River Kayaking & Inflatable Rafting", accent: "text-teal-300" },
  { icon: Flame, text: "Starlit Bonfire & BBQ Evenings", accent: "text-emerald-300" },
  { icon: Home, text: "Handcrafted Wooden Cabana Retreat", accent: "text-teal-400" },
  { icon: Coffee, text: "Fresh Ceylon Tea & Village Dining", accent: "text-emerald-300" },
  { icon: Bird, text: "Endemic Birds & Tropical Nature Walks", accent: "text-emerald-400" },
  { icon: Sparkles, text: "Zero City Noise · Pure Serenity", accent: "text-teal-200" },
];

export default function AdventureTicker() {
  return (
    <div className="relative py-3.5 bg-gradient-to-r from-emerald-950 via-[#071f11] to-emerald-950 border-y border-white/10 overflow-hidden select-none">
      {/* Side gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-emerald-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-emerald-950 to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8">
        {/* First set */}
        {tickerItems.map((item, idx) => (
          <div
            key={`ticker-1-${idx}`}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/90 shrink-0 tracking-wide"
          >
            <item.icon className={`w-4 h-4 ${item.accent}`} />
            <span>{item.text}</span>
            <span className="text-white/20 ml-5 font-serif">•</span>
          </div>
        ))}

        {/* Duplicate set for infinite loop */}
        {tickerItems.map((item, idx) => (
          <div
            key={`ticker-2-${idx}`}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white/90 shrink-0 tracking-wide"
          >
            <item.icon className={`w-4 h-4 ${item.accent}`} />
            <span>{item.text}</span>
            <span className="text-white/20 ml-5 font-serif">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
