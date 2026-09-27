"use client";

import Image from "next/image";
import { Waves, Droplets, Sun, Compass, ArrowRight } from "lucide-react";

export default function NaturalPool() {
  return (
    <section id="pool" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider border border-teal-100">
              <Droplets className="w-3.5 h-3.5 text-teal-600" />
              Edawala Dola Natural Stream
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
              Swim in Pure Natural River Waters
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              Step directly into the unpolluted waters of Edawala Dola. Flowing from the protected
              Sinharaja hills, this freshwater river offers refreshing natural rock pools, shallow
              wading spots, and calm stretches perfect for kayaking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0f2416] mb-1">
                  <Waves className="w-4 h-4 text-emerald-600" />
                  <span>Crystal Clear Waters</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Pure mountain spring water with smooth river stones and wild ferns along the bank.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0f2416] mb-1">
                  <Compass className="w-4 h-4 text-teal-600" />
                  <span>River Kayaking</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Paddle gently beneath lush forest branches with kayaks and safety vests ready for
                  guests.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/94719817000?text=Hello%20Misty%20Heights!%20I%20would%20like%20to%20know%20more%20about%20the%20Edawala%20Dola%20river%20pool%20and%20kayaking."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                Inquire about river bathing times & kayaks
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Real River Photographs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3] group bg-gray-100">
              <Image
                src="/images/natural-stream.jpg"
                alt="Edawala Dola Pristine Natural Stream in Sinharaja"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-sm font-serif font-bold">
                  Edawala Dola Freshwater River Stream
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 group">
                <Image
                  src="/images/aerial-river.jpg"
                  alt="Aerial Drone View of River and Footbridge"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow">
                  Aerial River View
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 group">
                <Image
                  src="/images/kayak.jpg"
                  alt="Kayaking on the Clear River Waters"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow">
                  River Kayak & Boat
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
