"use client";

import Image from "next/image";
import { Waves, Droplets, Compass, ArrowRight, Sparkles } from "lucide-react";

export default function NaturalPool() {
  return (
    <section id="pool" className="py-20 bg-gradient-to-b from-white via-teal-50/30 to-white relative overflow-hidden">
      {/* Decorative water glow blur */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-900 text-xs font-semibold uppercase tracking-wider border border-teal-200 badge-glow">
              <Droplets className="w-3.5 h-3.5 text-teal-600" />
              Edawala Dola River Pool
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a1f12] tracking-tight">
              Swim in Pure Natural{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-cyan-600 to-emerald-600">
                Rainforest Waters
              </span>
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              Step directly into the unpolluted waters of Edawala Dola. Flowing straight from the protected
              Sinharaja hills, this freshwater river offers crystal natural rock pools, gentle shallows,
              and open waters perfect for kayaking and rafting thrills.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-sm card-lift">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0a1f12] mb-1">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Waves className="w-4 h-4" />
                  </div>
                  <span>Crystal Clear Waters</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Pure mountain spring water with smooth river stones and wild ferns along the bank.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-sm card-lift">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0a1f12] mb-1">
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>Kayaking & Rafting</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Paddle through lush forest bends with kayaks, inflatable boats, and life vests ready for you.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/94719817000?text=Hello%20Misty%20Heights!%20I%20would%20like%20to%20know%20more%20about%20the%20Edawala%20Dola%20river%20pool%20and%20kayaking."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors group"
              >
                <span>Inquire about river bathing times &amp; kayaks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Real River Photographs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group bg-gray-100 card-lift">
              <Image
                src="/images/natural-stream.jpg"
                alt="Edawala Dola Pristine Natural Stream in Sinharaja"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent flex items-end p-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block">
                    Sinharaja Freshwater Current
                  </span>
                  <span className="text-white text-base font-serif font-bold">
                    Edawala Dola Natural River Pool
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 group border-2 border-white">
                <Image
                  src="/images/photo_2026-09-28_18-10-40.jpg"
                  alt="Family Kayaking on the Clear River Waters"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-semibold">
                    River Kayak Adventures
                  </span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 group border-2 border-white">
                <Image
                  src="/images/photo_2026-09-28_18-10-41 (2).jpg"
                  alt="Rubber Boat Fun on the River"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-semibold">
                    Inflatable Boat Fun
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
