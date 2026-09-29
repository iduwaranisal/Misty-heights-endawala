"use client";

import Image from "next/image";
import { Utensils, HeartHandshake, ArrowRight } from "lucide-react";

import { useSettings } from "@/components/SettingsProvider";

export default function VillageDining({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { getSetting } = useSettings();
  const meals = [
    {
      title: "Traditional Sri Lankan Breakfast",
      desc: "Crispy hoppers (appa) and egg hoppers served hot with fresh coconut sambol, bananas, and spicy lunu miris.",
      tag: "Breakfast",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-100",
    },
    {
      title: "Village Clay-Pot Rice & Curries",
      desc: "Country red or white rice served with tender jackfruit (polos), coconut dhal, fresh river fish, and garden greens.",
      tag: "Lunch",
      tagColor: "bg-teal-50 text-teal-800 border-teal-100",
    },
    {
      title: "Rainforest Bonfire Barbecue",
      desc: "Grilled barbecue meats, spicy seafood, roasted corn, sweet potatoes, and music under starry night skies.",
      tag: "Dinner BBQ",
      tagColor: "bg-stone-100 text-stone-800 border-stone-200",
    },
    {
      title: "Fresh Herbal & Ceylon Black Tea",
      desc: "Fragrant Ceylon tea from nearby hill plantations, accompanied by morning herbal kola kanda with jaggery.",
      tag: "Tea & Health",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-100",
    },
  ];

  return (
    <section id="dining" className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information & Menu Items */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 text-xs font-semibold uppercase tracking-wider border border-emerald-200 badge-glow">
              <Utensils className="w-3.5 h-3.5 text-emerald-700" />
              Authentic Island Flavors
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a1f12] tracking-tight">
              Homecooked Village Food &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700">
                Fireside Meals
              </span>
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              Experience the true taste of Sri Lankan village cooking. Fresh ingredients from local gardens,
              fragrant unrefined spices, and dishes prepared with time-honored recipes in traditional clay pots.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {meals.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md card-lift flex flex-col justify-between"
                >
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border inline-block mb-2 ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <h4 className="text-sm font-bold text-[#0a1f12] mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <span>Inquire about custom meal packages</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Real Food & Dining Visuals */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group bg-gray-100 card-lift">
              <Image
                src={getSetting("site.dining.image", "/images/photo_2026-09-28_18-10-34.jpg")}
                alt="Breakfast Table with Fruit and Juice Overlooking Mountain Views"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                    Balcony &amp; Veranda Dining
                  </span>
                  <p className="text-sm font-serif font-bold text-white mt-1">
                    Fresh fruit juices, tropical fruits &amp; warm Ceylon tea
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3 shadow-xs">
              <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-950 font-serif text-sm">
                  Warm Island Hospitality
                </strong>
                <p className="text-emerald-800/90 mt-0.5 leading-relaxed">
                  In true Sri Lankan tradition, we treat every guest like family. Dietary needs
                  (vegetarian, vegan, halal) are happily catered with love and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
