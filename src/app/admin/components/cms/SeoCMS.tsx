"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import { Save, Loader2, Check, Search, Globe, RefreshCw } from "lucide-react";

interface SeoCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

const DEFAULT_SEO = {
  title: "Misty Heights Endawala | Dellawa River, Sinharaja Forest Villa & Cabana Retreat",
  description: "Escape to Misty Heights Endawala near Sinharaja Forest & Dellawa River (Gin Ganga tributary). Handcrafted wooden villa cabana, natural river pool, kayaking, and misty mountain views in Neluwa, Galle, Sri Lanka.",
  keywords: "endawala, dellawa, dellawa river, gin ganga, dellawa endawala, dellawa ganga, dellawa sinharaja, sinharaja forest, sinharaja villa, dellawa villa, misty heights, misty heights endawala sinharaja, misty heights endawala",
  canonical: "https://mistyheightsendawala.hotel.lk",
};

export default function SeoCMS({ settings, onRefresh }: SeoCMSProps) {
  const [title, setTitle] = useState(
    settings["site.seo.title"] || DEFAULT_SEO.title
  );
  const [description, setDescription] = useState(
    settings["site.seo.description"] || DEFAULT_SEO.description
  );
  const [keywords, setKeywords] = useState(
    settings["site.seo.keywords"] || DEFAULT_SEO.keywords
  );
  const [canonical, setCanonical] = useState(
    settings["site.seo.canonical"] || DEFAULT_SEO.canonical
  );

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Record<string, any> = {
        "site.seo.title": title,
        "site.seo.description": description,
        "site.seo.keywords": keywords,
        "site.seo.canonical": canonical,
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
            <Search className="w-5 h-5 text-emerald-600" />
            SEO &amp; Search Engine Optimization
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Optimize meta titles, descriptions, and high-ranking keywords for Google Search.
          </p>
        </div>

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
            <><Save className="w-4 h-4" /> Save SEO Settings</>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Google Search Preview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <Globe className="w-4 h-4" />
          Google Search Live Preview
        </h3>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 font-sans">
          <p className="text-xs text-emerald-700 truncate">{canonical}</p>
          <h4 className="text-base text-blue-800 hover:underline font-medium cursor-pointer mt-0.5 line-clamp-1">
            {title}
          </h4>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Meta Title (Page Title) *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCls}
          />
          <p className="text-[11px] text-gray-400 mt-1">Recommended length: 50-60 characters</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Meta Description *
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputCls}
          />
          <p className="text-[11px] text-gray-400 mt-1">Recommended length: 150-160 characters</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Target SEO Keywords (Comma Separated)
          </label>
          <textarea
            rows={3}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className={inputCls}
          />
          <p className="text-[11px] text-gray-400 mt-1">e.g. endawala, dellawa, dellawa river, gin ganga, sinharaja villa</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Canonical URL
          </label>
          <input
            type="text"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>
    </form>
  );
}
