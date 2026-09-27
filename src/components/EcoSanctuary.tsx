"use client";

import { Leaf, Droplets, ShieldCheck, HeartHandshake, Compass } from "lucide-react";

export default function EcoSanctuary() {
  const commitments = [
    {
      icon: Droplets,
      title: "Pristine River Stewardship",
      desc: "We take great care to keep the natural waters of Edawala Dola completely clean, free of plastic or soap runoff.",
    },
    {
      icon: Leaf,
      title: "UNESCO Sinharaja Buffer Zone",
      desc: "Our hillside borders Sri Lanka's last viable primary tropical rainforest, preserving wild flora and endemic birds.",
    },
    {
      icon: HeartHandshake,
      title: "Village Community Support",
      desc: "Meals are prepared with farm-fresh produce from Neluwa village families and fresh tea from local hillside growers.",
    },
    {
      icon: ShieldCheck,
      title: "Natural Living & Clean Mountain Air",
      desc: "Handcrafted timber cabana built to invite the natural mountain breeze, keeping energy footprints low.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Summary */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-100">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Eco Sanctuary & Heritage
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
              Living in Harmony with the Rainforest
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              At Misty Heights Endawala, nature is not just our view — it is our home. We practice
              mindful tourism that respects the delicate balance of Sinharaja, ensuring future
              generations can swim in the same clear streams and breathe the same mountain mist.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
              <strong>Guest Nature Guideline:</strong> We kindly invite all visitors to avoid
              leaving polythene or litter near the riverbanks and trails, keeping the forest
              pure and wild.
            </div>
          </div>

          {/* Right: 4 Clean Commitments */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commitments.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-emerald-700 flex items-center justify-center mb-3">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0f2416] mb-1.5">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
