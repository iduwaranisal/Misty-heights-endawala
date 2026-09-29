"use client";

import Image from "next/image";
import { Waves, Droplets, Compass, ArrowRight, Sparkles } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

export default function NaturalPool() {
  const { getSetting } = useSettings();
  const badge = getSetting("site.pool.badge", "Dellawa River & Edawala Dola (Gin Ganga Basin)");
  const title = getSetting("site.pool.title", "Swim in Pure Natural Dellawa River Waters");
  const description = getSetting("site.pool.desc", "Step directly into the unpolluted waters of the Dellawa River system and Edawala Dola stream. Flowing straight from the protected Sinharaja Forest ridge towards the Gin Ganga basin, this freshwater river offers pristine natural rock bathing pools, gentle shallows, and calm stretches perfect for kayaking and rafting thrills.");
  const linkText = getSetting("site.pool.linkText", "Inquire about Dellawa river bathing times & kayaks");
  const feat1Title = getSetting("site.pool.feat1Title", "Crystal River Rock Pools");
  const feat1Desc = getSetting("site.pool.feat1Desc", "Pure mountain spring water with smooth river stones and wild forest ferns along the Dellawa river bank.");
  const feat2Title = getSetting("site.pool.feat2Title", "River Kayaking & Rafting");
  const feat2Desc = getSetting("site.pool.feat2Desc", "Paddle gently beneath lush Sinharaja canopy bends with kayaks, inflatable boats, and life vests ready.");
  const whatsapp = getSetting("site.contact.whatsapp", "94719817000");

  return (
    <section id="pool" className="py-20 bg-gradient-to-b from-white via-teal-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-900 text-xs font-semibold uppercase tracking-wider border border-teal-200 badge-glow">
              <Droplets className="w-3.5 h-3.5 text-teal-600" />
              {badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a1f12] tracking-tight">
              {title}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-sm card-lift">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0a1f12] mb-1">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Waves className="w-4 h-4" />
                  </div>
                  <span>{feat1Title}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {feat1Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-sm card-lift">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0a1f12] mb-1">
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>{feat2Title}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {feat2Desc}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsapp}?text=Hello%20Misty%20Heights!%20I%20would%20like%20to%20know%20more%20about%20the%20Dellawa%20river%20swimming%20and%20kayaking.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors group"
              >
                <span>{linkText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Real River Photographs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group bg-gray-100 card-lift">
              <Image
                src={getSetting("site.pool.image1", "/images/natural-stream.jpg")}
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
                  src={getSetting("site.pool.image2", "/images/photo_2026-09-28_18-10-40.jpg")}
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
                  src={getSetting("site.pool.image3", "/images/photo_2026-09-28_18-10-41 (2).jpg")}
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
