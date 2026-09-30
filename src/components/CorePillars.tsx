"use client";

import Image from "next/image";
import { Mountain, Waves, Flame, Home, ArrowUpRight } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

const DEFAULT_PILLARS = [
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

export default function CorePillars({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { getSetting } = useSettings();
  const customPillars = getSetting<Array<{ title: string; desc: string; subtitle?: string; badge?: string }>>("site.pillars.items", []);

  const displayPillars = (customPillars && customPillars.length > 0)
    ? customPillars.map((item, i) => ({
        title: item.title,
        desc: item.desc,
        subtitle: item.subtitle || DEFAULT_PILLARS[i % DEFAULT_PILLARS.length]?.subtitle || "Explore",
        badge: item.badge || DEFAULT_PILLARS[i % DEFAULT_PILLARS.length]?.badge || "Experience",
        icon: DEFAULT_PILLARS[i % DEFAULT_PILLARS.length]?.icon || Mountain,
        image: DEFAULT_PILLARS[i % DEFAULT_PILLARS.length]?.image || "/images/mountain-panoramic.jpg",
      }))
    : DEFAULT_PILLARS;

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
          {displayPillars.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-emerald-100/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden card-lift"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-900 shadow-sm">
                  {item.badge}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#0a1f12] group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>{item.subtitle}</span>
                  <button
                    onClick={onOpenBooking}
                    className="hover:underline flex items-center gap-0.5 text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
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
