"use client";

import { MapPin, Navigation, Car, Compass, Clock, Phone } from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-100">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Sinharaja Foothills
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
            How to Reach Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Located in Endawala, Dellawa, Neluwa in the Galle District. A scenic drive through lush
            Ceylon tea plantations, mountain greenery, and peaceful villages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Driving Directions */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Property Address
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#0f2416]">
                    Endawala, Dellawa, Neluwa, Galle District
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Dellawa, Southern Province, Sri Lanka (Sinharaja Rainforest Foothills)
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <strong className="text-xs font-bold text-gray-900 block">From Colombo:</strong>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Take Southern Expressway (E01) to Kurundugahahetekma or Baddegama exit, then
                    drive through Neluwa towards Dellawa & Endawala (approx. 2.5 - 3 hours).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <strong className="text-xs font-bold text-gray-900 block">From Galle Coast:</strong>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Travel inland via Baddegama & Neluwa through scenic winding tea estate roads
                    (approx. 1.5 - 2 hours).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <strong className="text-xs font-bold text-gray-900 block">Road Access:</strong>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Paved village road accessible by all cars, vans, SUVs, and bikes. Call us on
                    arrival in Neluwa for real-time guidance.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="https://maps.google.com/?q=misty+heights+endawala+sinharaja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps
                </a>
                <a
                  href="tel:0719817000"
                  className="py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  Call Us
                </a>
              </div>
            </div>
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-80 sm:h-full min-h-[300px] bg-emerald-50">
              <iframe
                title="Misty Heights Endawala Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.771694207904!2d80.3705!3d6.3775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjInMzkuMCJOIDgwwrAyMicxMy44IkU!5e0!3m2!1sen!2slk!4v1600000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-150 contrast-105"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-900 shadow-md flex items-center gap-2 border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Misty Heights Endawala
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
