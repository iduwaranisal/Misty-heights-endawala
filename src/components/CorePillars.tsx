"use client";

import Image from "next/image";
import { Mountain, Waves, Flame, Home, ArrowUpRight } from "lucide-react";

export default function CorePillars({ onOpenBooking }: { onOpenBooking: () => void }) {
  const pillars = [
    {
      title: "Scenic Hikes Through Sinharaja",
      subtitle: "Rainforest Trails",
      desc: "Trek through misty trails, hear endemic forest birds, and discover hidden streams under the virgin rainforest canopy.",
      icon: Mountain,
      image: "/images/mountain-panoramic.jpg",
      badge: "Nature",
    },
    {
      title: "Kayaking Adventures",
      subtitle: "River Exploration",
      desc: "Gently paddle down crystal-clear freshwater river bends surrounded by untouched tropical greenery and cool breezes.",
      icon: Waves,
      image: "/images/kayak.jpg",
      badge: "Water",
    },
    {
      title: "Bonfire Nights Under the Stars",
      subtitle: "Evening Gathering",
      desc: "Gather around the warm outdoor fire pit as night falls. Enjoy barbecue dinners, storytelling, and clear mountain night skies.",
      icon: Flame,
      image: "/images/twilight-forest.jpg",
      badge: "Campfire",
    },
    {
      title: "Nature Stays with Comfort",
      subtitle: "Handcrafted Retreat",
      desc: "Rest peacefully in our wooden cabana with king bed, open observation balcony, and fresh mountain cross-breeze.",
      icon: Home,
      image: "/images/cabana-balcony.jpg",
      badge: "Living",
    },
  ];

  return (
    <section id="overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-100">
            Sinharaja Rainforest Escape
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
            Nature · Adventure · Relaxation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            The four signature experiences waiting for you at Misty Heights Endawala.
          </p>
        </div>

        {/* 4 Clean Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-800 shadow-sm">
                  {item.badge}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#0f2416] group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>{item.subtitle}</span>
                  <button
                    onClick={onOpenBooking}
                    className="hover:underline flex items-center gap-0.5 text-xs font-bold"
                  >
                    Inquire <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
