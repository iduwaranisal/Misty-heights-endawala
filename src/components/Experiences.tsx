"use client";

import {
  Waves,
  Flame,
  Bird,
  Mountain,
  Apple,
  Home,
  CheckCircle2,
} from "lucide-react";

const experiences = [
  {
    icon: Waves,
    title: "Refreshing Dips at Edawala Dola",
    desc: "Cool off in natural river pools surrounded by rainforest ferns and gentle fresh currents.",
    tag: "River Bath",
    gradient: "from-teal-600 to-cyan-600",
    iconBg: "bg-teal-50 text-teal-700",
    tagStyle: "bg-teal-50 text-teal-800 border-teal-100",
    accent: "text-teal-700",
  },
  {
    icon: Flame,
    title: "BBQ Nights & Bonfire Under the Stars",
    desc: "Gather around the campfire for roasted treats, acoustic songs, and starry night skies.",
    tag: "Campfire",
    gradient: "from-emerald-700 to-teal-800",
    iconBg: "bg-emerald-50 text-emerald-800",
    tagStyle: "bg-emerald-50 text-emerald-800 border-emerald-100",
    accent: "text-emerald-800",
  },
  {
    icon: Bird,
    title: "Nature Walks & Bird Watching",
    desc: "Discover endemic birds including the Sri Lanka Blue Magpie and colorful forest butterflies.",
    tag: "Wildlife",
    gradient: "from-emerald-600 to-green-700",
    iconBg: "bg-emerald-50 text-emerald-700",
    tagStyle: "bg-emerald-50 text-emerald-800 border-emerald-100",
    accent: "text-emerald-700",
  },
  {
    icon: Mountain,
    title: "Scenic Hikes Through Sinharaja",
    desc: "Trek scenic mountain paths through untouched rainforest trails with local guide support.",
    tag: "Trekking",
    gradient: "from-emerald-700 to-emerald-900",
    iconBg: "bg-emerald-50 text-emerald-800",
    tagStyle: "bg-emerald-50 text-emerald-800 border-emerald-100",
    accent: "text-emerald-800",
  },
  {
    icon: Apple,
    title: "Hand-Pick Seasonal Fruits",
    desc: "Taste fresh rambutan, mangosteen, jackfruit, and sweet king coconut straight from village trees.",
    tag: "Organic",
    gradient: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-50 text-teal-700",
    tagStyle: "bg-teal-50 text-teal-800 border-teal-100",
    accent: "text-teal-700",
  },
  {
    icon: Home,
    title: "Relax Overlooking Misty Mountains",
    desc: "Sit on your wooden viewing deck while watching peaceful morning clouds drift over the forest.",
    tag: "Serenity",
    gradient: "from-emerald-800 to-teal-900",
    iconBg: "bg-emerald-50 text-emerald-800",
    tagStyle: "bg-emerald-50 text-emerald-800 border-emerald-100",
    accent: "text-emerald-800",
  },
];

export default function Experiences({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section id="experiences" className="py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200 badge-glow">
            ✨ Things to Enjoy
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a1f12] tracking-tight">
            Memories to Create with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Family &amp; Friends
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Unwind, recharge, and reconnect with nature in simple, peaceful ways.
          </p>
        </div>

        {/* 6 Harmonious Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-xl card-lift relative overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.gradient} rounded-t-2xl`} />

              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${exp.iconBg} flex items-center justify-center`}>
                  <exp.icon className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${exp.tagStyle}`}>
                  {exp.tag}
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-[#0a1f12] mb-2">{exp.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{exp.desc}</p>

              <div className={`mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold ${exp.accent}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Available with stay</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden border border-white/10">
          <div className="relative">
            <h3 className="text-xl font-serif font-bold">Plan Your Group or Family Getaway</h3>
            <p className="text-xs text-emerald-100/80 mt-1">
              Custom packages available for day visits, river outings, and overnight cabana stays.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="relative px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/30 transition-all cursor-pointer shrink-0 hover:scale-105 border border-emerald-400/30"
          >
            Inquire Availability
          </button>
        </div>
      </div>
    </section>
  );
}
