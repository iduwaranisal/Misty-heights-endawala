"use client";

import Image from "next/image";
import { Bed, Eye, Wind, Coffee, ShieldCheck, Sun, Check, Calendar } from "lucide-react";

export default function CabanaShowcase({ onOpenBooking }: { onOpenBooking: () => void }) {
  const amenities = [
    { icon: Bed, label: "Handcrafted Timber King Bed" },
    { icon: Eye, label: "Upper 360° Mountain Observation Deck" },
    { icon: Wind, label: "Natural Cool Rainforest Breeze" },
    { icon: Coffee, label: "Fresh Morning Ceylon Tea & Kettle" },
    { icon: Sun, label: "Ground Stone Veranda & Patio" },
    { icon: ShieldCheck, label: "Private & Peaceful Seclusion" },
  ];

  return (
    <section id="cabana" className="py-20 bg-gradient-to-b from-white via-emerald-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Photos of the Real Cabana */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3] group bg-gray-100">
              <Image
                src="/images/cabana-view.jpg"
                alt="Misty Heights Wooden Cabana Overlooking Hills"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-sm font-serif font-bold">
                  Two-Story Handcrafted Timber Cabana
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 group">
                <Image
                  src="/images/bedroom.jpg"
                  alt="Comfortable Handcrafted King Bed"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow">
                  Cozy King Bedroom
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 group">
                <Image
                  src="/images/cabana-front.jpg"
                  alt="Traditional Clay Tile Facade"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow">
                  Veranda & Patio
                </div>
              </div>
            </div>
          </div>

          {/* Right: Clean, Uncluttered Cabana Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              Holiday Home & Resort
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
              A Warm, Handcrafted Wooden Retreat
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              Built with genuine Sri Lankan timber and traditional clay roofing tiles, the cabana
              blends naturally into the Sinharaja mountain ridge. Designed for travelers who cherish
              quiet mornings, clean air, and cozy evenings.
            </p>

            {/* Clean 2-column checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 space-y-1.5">
              <div className="flex items-center justify-between font-semibold">
                <span>Ideal For:</span>
                <span>Couples, Families & Groups of Friends</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Location:</span>
                <span>Warukandeniya, Neluwa, Galle District</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Reserve The Cabana
              </button>
              <a
                href="tel:0719817000"
                className="px-5 py-3 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold text-xs sm:text-sm transition-colors"
              >
                Call 071 981 7000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
