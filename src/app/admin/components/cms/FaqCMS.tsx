"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import { Save, Loader2, Check, HelpCircle, Plus, Trash2, RefreshCw } from "lucide-react";

interface FaqCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

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

export default function FaqCMS({ settings, onRefresh }: FaqCMSProps) {
  const [badge, setBadge] = useState(
    settings["site.faq.badge"] || "Common Questions"
  );
  const [title, setTitle] = useState(
    settings["site.faq.title"] || "Frequently Asked Questions"
  );
  const [subtitle, setSubtitle] = useState(
    settings["site.faq.subtitle"] || "Simple, helpful answers to help you plan a restful rainforest getaway."
  );

  const initialFaqs = settings["site.faq.items"] || DEFAULT_FAQS;
  const [faqs, setFaqs] = useState<Array<{ q: string; a: string }>>(initialFaqs);

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFaqChange = (idx: number, field: "q" | "a", val: string) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        q: "New Frequently Asked Question?",
        a: "Answer to the question goes here.",
      },
    ]);
  };

  const removeFaq = (idx: number) => {
    if (confirm("Delete this question?")) {
      setFaqs(faqs.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Record<string, any> = {
        "site.faq.badge": badge,
        "site.faq.title": title,
        "site.faq.subtitle": subtitle,
        "site.faq.items": faqs,
      };

      const res = await saveMultipleSettings(payload);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        onRefresh();
      } else {
        setError(res.message || "Failed to save settings");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage common guest questions, road directions, and stay policies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-600" /> Add Question
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
          >
            {isSaving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : success ? (
              <><Check className="w-4 h-4" /> Saved Live!</>
            ) : (
              <><Save className="w-4 h-4" /> Save FAQs</>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Section Headings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Section Headlines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Top Pill Badge
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Section Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            FAQ Items ({faqs.length})
          </h3>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset FAQs to default?")) setFaqs(DEFAULT_FAQS);
            }}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="space-y-4 divide-y divide-gray-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className={idx > 0 ? "pt-5 space-y-3" : "space-y-3"}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Q#{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeFaq(idx)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={faq.q}
                  onChange={(e) => handleFaqChange(idx, "q", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Answer *
                </label>
                <textarea
                  rows={3}
                  required
                  value={faq.a}
                  onChange={(e) => handleFaqChange(idx, "a", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
