"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

const DEFAULT_FAQS = [
  {
    q: "Where is Misty Heights Endawala located relative to Dellawa and Sinharaja Forest?",
    a: "Misty Heights Endawala is located in Warukandeniya, Endawala near Dellawa, Neluwa in the Galle District of Sri Lanka. We border the world-renowned UNESCO Sinharaja Forest Reserve and the pristine Dellawa River system (Edawala Dola, part of the Gin Ganga river basin).",
  },
  {
    q: "Can we swim and kayak in the Dellawa River (Edawala Dola / Gin Ganga)?",
    a: "Yes! Edawala Dola is a natural freshwater stream flowing directly from the Sinharaja mountain ridge into the Dellawa River and Gin Ganga basin. It features clean rock pools and safe shallow bathing spots, with complimentary kayaks and safety life vests provided for guests.",
  },
  {
    q: "What accommodation is offered at Misty Heights Sinharaja Villa?",
    a: "We offer a cozy two-story handcrafted wooden villa and cabana retreat with a timber king bedroom, upper 360-degree mountain observation balcony deck, outdoor veranda, and tranquil rainforest views. Ideal for couples, families, and private Dellawa villa group getaways.",
  },
  {
    q: "Can we have an evening campfire and barbecue?",
    a: "Yes, evening campfires under the clear mountain skies are a guest favorite. We set up the outdoor fire pit and prepare barbecue chicken, sausages, and roasted spiced sweet corn by the fireside upon request.",
  },
  {
    q: "What meals are available during our stay?",
    a: "We serve wholesome, freshly cooked traditional Sri Lankan meals prepared in clay pots — including hot hoppers with coconut sambol for breakfast, organic herbal porridge (kola kanda), country rice and village curries, and Ceylon black tea from local hillside tea gardens.",
  },
  {
    q: "How do we reach Misty Heights Endawala from Colombo or Galle?",
    a: "From Colombo, take the Southern Expressway (E01) to Kurundugahahetekma or Baddegama exit, then travel through Neluwa towards Dellawa & Endawala (approx. 2.5 - 3 hours). From Galle Coast, travel inland via Baddegama and Neluwa (approx. 1.5 - 2 hours). The road is paved and accessible by all vehicles.",
  },
  {
    q: "How can I book or check available dates?",
    a: "You can book directly by sending a WhatsApp message or calling us at 071 981 7000 or 071 868 0633. We are always open to help you plan your visit.",
  },
];

export default function FaqSection() {
  const { getSetting } = useSettings();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const badge = getSetting("site.faq.badge", "Common Questions");
  const title = getSetting("site.faq.title", "Frequently Asked Questions");
  const subtitle = getSetting("site.faq.subtitle", "Simple, helpful answers to help you plan a restful rainforest getaway.");
  const customFaqs = getSetting<Array<{ q: string; a: string }>>("site.faq.items", DEFAULT_FAQS);

  const displayFaqs = (customFaqs && customFaqs.length > 0) ? customFaqs : DEFAULT_FAQS;

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-100">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            {badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="space-y-3.5">
          {displayFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#0f2416] hover:text-emerald-800 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-700 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
