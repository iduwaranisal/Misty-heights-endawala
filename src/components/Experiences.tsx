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

export default function Experiences({ onOpenBooking }: { onOpenBooking: () => void }) {
  const experiences = [
    {
      icon: Waves,
      title: "Refreshing Dips at Edawala Dola",
      desc: "Cool off in natural river pools surrounded by rainforest ferns and gentle fresh currents.",
      tag: "River Bath",
    },
    {
      icon: Flame,
      title: "BBQ Nights & Bonfire Under the Stars",
      desc: "Gather around the campfire for roasted treats, acoustic songs, and starry night skies.",
      tag: "Campfire",
    },
    {
      icon: Bird,
      title: "Nature Walks & Bird Watching",
      desc: "Discover endemic birds including the Sri Lanka Blue Magpie and colorful forest butterflies.",
      tag: "Wildlife",
    },
    {
      icon: Mountain,
      title: "Scenic Hikes Through Sinharaja",
      desc: "Trek scenic mountain paths through untouched rainforest trails with local guide support.",
      tag: "Trekking",
    },
    {
      icon: Apple,
      title: "Hand-Pick Seasonal Fruits",
      desc: "Taste fresh rambutan, mangosteen, jackfruit, and sweet king coconut straight from village trees.",
      tag: "Organic",
    },
    {
      icon: Home,
      title: "Relax Overlooking Misty Mountains",
      desc: "Sit on your wooden viewing deck while watching peaceful morning clouds drift over the forest.",
      tag: "Serenity",
    },
  ];

  return (
    <section id="experiences" className="py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-100">
            Things to Enjoy
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
            Memories to Create with Family & Friends
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Unwind, recharge, and reconnect with nature in simple, peaceful ways.
          </p>
        </div>

        {/* 6 Clean Minimal Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <exp.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {exp.tag}
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#0f2416] mb-2">{exp.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{exp.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Available with stay</span>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Call to Action Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="text-xl font-serif font-bold">Plan Your Group or Family Getaway</h3>
            <p className="text-xs text-emerald-100/90 mt-1">
              Custom packages available for day visits, river outings, and overnight cabana stays.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow transition-all cursor-pointer shrink-0"
          >
            Inquire Availability
          </button>
        </div>
      </div>
    </section>
  );
}
