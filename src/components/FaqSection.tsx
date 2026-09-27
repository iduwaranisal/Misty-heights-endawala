"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes Misty Heights Endawala a unique nature retreat?",
      a: "Our retreat borders the world-famous Sinharaja Rainforest. You stay in a handcrafted two-story wooden cabana with an observation deck overlooking the misty mountain canopy, with direct access to natural rock bathing pools at Edawala Dola and warm village hospitality.",
    },
    {
      q: "Is swimming in the Edawala Dola natural pool safe?",
      a: "Yes! Edawala Dola is a gentle mountain stream with clear, clean rock pools and shallow wading spots that are safe for both kids and adults. We also provide river kayaks and safety life vests for peaceful boating.",
    },
    {
      q: "Can we have an evening campfire and barbecue?",
      a: "Yes, evening campfires under the starry skies are one of our guests' most memorable experiences. We arrange the outdoor fire pit and can prepare barbecue chicken, sausages, and roasted spiced sweet corn upon request.",
    },
    {
      q: "What meals are available during our stay?",
      a: "We serve wholesome, freshly cooked traditional Sri Lankan meals prepared in clay pots — including hot hoppers with coconut sambol for breakfast, organic herbal porridge (kola kanda), country rice and village curries, and Ceylon black tea from local hillside tea gardens.",
    },
    {
      q: "How can I book or check available dates?",
      a: "You can book directly by sending a WhatsApp message or calling our hotlines at 071 981 7000 or 071 868 0633. We are always open 24/7 to help you plan your visit.",
    },
    {
      q: "How do we reach Misty Heights from Colombo or Galle?",
      a: "From Colombo, take the Southern Expressway (E01) to Kurundugahahetekma or Baddegama exit, then travel through Neluwa to Dellawa and Endawala (approx. 2.5 - 3 hours). The road is paved and accessible by all standard vehicles.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-100">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Simple, helpful answers to help you plan a restful rainforest getaway.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
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
