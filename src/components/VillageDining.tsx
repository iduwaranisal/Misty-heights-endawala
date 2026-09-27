"use client";

import Image from "next/image";
import { Utensils, Coffee, Flame, HeartHandshake, Leaf, ArrowRight } from "lucide-react";

export default function VillageDining({ onOpenBooking }: { onOpenBooking: () => void }) {
  const meals = [
    {
      title: "Traditional Sri Lankan Breakfast",
      desc: "Crispy hoppers (appa) and egg hoppers served hot with fresh coconut sambol and spicy lunu miris.",
      tag: "Breakfast",
    },
    {
      title: "Village Clay-Pot Rice & Curries",
      desc: "Country red or white rice served with jackfruit (polos), coconut dhal, fresh river fish, and garden greens.",
      tag: "Lunch",
    },
    {
      title: "Rainforest Bonfire Barbecue",
      desc: "Tender grilled barbecue chicken, roasted spiced corn, sweet potato, and fresh salads by the campfire.",
      tag: "Dinner BBQ",
    },
    {
      title: "Fresh Herbal Tea & Ceylon Black Tea",
      desc: "Morning herbal porridge (kola kanda) with jaggery, and fragrant Ceylon tea picked from nearby hillside gardens.",
      tag: "Tea & Health",
    },
  ];

  return (
    <section id="dining" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information & Menu Items */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-100">
              <Utensils className="w-3.5 h-3.5 text-emerald-600" />
              Authentic Sri Lankan Flavors
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
              Homecooked Village Food & Fireside Meals
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              Experience the true taste of Sri Lankan village cooking. Fresh vegetables from local
              gardens, unrefined spices, and dishes prepared with time-honored recipes in clay pots.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {meals.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100/90 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full inline-block mb-2">
                      {item.tag}
                    </span>
                    <h4 className="text-sm font-bold text-[#0f2416] mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Inquire about custom meal packages <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Visual Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3] group bg-gray-100">
              <Image
                src="/images/cabana-balcony.jpg"
                alt="Dining on the Wooden Balcony"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                    Balcony & Veranda Dining
                  </span>
                  <p className="text-sm font-serif font-bold text-white mt-1">
                    Enjoy warm tea and meals overlooking the mist
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs text-emerald-900 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-950 font-serif text-sm">
                  Warm Island Hospitality
                </strong>
                <p className="text-emerald-800/90 mt-0.5 leading-relaxed">
                  In true Sri Lankan tradition, our hosts treat every guest like family. Dietary
                  needs (vegetarian, vegan, halal) are handled with love and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
