"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import ImageUploadField from "./ImageUploadField";
import { Save, Loader2, Check, Sparkles, Layers, RefreshCw } from "lucide-react";

interface HeroCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

const DEFAULT_SLIDES = [
  {
    src: "/images/cabana-view.jpg",
    tag: "Wooden Cabana",
    title: "Handcrafted retreat nestled above the forest canopy",
  },
  {
    src: "/images/photo_2026-09-28_18-10-31.jpg",
    tag: "Hilltop Panorama",
    title: "Scenic aerial view of our cabana amidst misty mountains",
  },
  {
    src: "/images/natural-stream.jpg",
    tag: "Edawala Dola River",
    title: "Crystal-clear natural rock pool fresh from Sinharaja",
  },
  {
    src: "/images/photo_2026-09-28_18-10-40.jpg",
    tag: "River Adventures",
    title: "Kayaking and rafting through peaceful rainforest bends",
  },
  {
    src: "/images/photo_2026-09-28_18-10-34.jpg",
    tag: "Balcony Dining",
    title: "Fresh fruits, juices & breakfast overlooking morning mist",
  },
];

export default function HeroCMS({ settings, onRefresh }: HeroCMSProps) {
  const [badge, setBadge] = useState(
    settings["site.hero.badge"] || "Sinharaja Forest & Dellawa River Retreat"
  );
  const [title, setTitle] = useState(
    settings["site.hero.title"] || "Misty Heights Endawala"
  );
  const [subtitle, setSubtitle] = useState(
    settings["site.hero.subtitle"] ||
      "Handcrafted wooden cabana villa nestled above Dellawa river (Gin Ganga basin) bordering UNESCO Sinharaja Rainforest. Fresh natural rock pool bathing, kayaking, and misty mountain views."
  );
  const [ctaText, setCtaText] = useState(
    settings["site.hero.ctaText"] || "Reserve Your Stay"
  );

  const initialSlides = settings["site.hero.slides"] || DEFAULT_SLIDES;
  const [slides, setSlides] = useState<Array<{ src: string; tag: string; title: string }>>(initialSlides);

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSlideChange = (index: number, field: string, val: string) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleResetSlides = () => {
    if (confirm("Reset slides to factory defaults?")) {
      setSlides(DEFAULT_SLIDES);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Record<string, any> = {
        "site.hero.badge": badge,
        "site.hero.title": title,
        "site.hero.subtitle": subtitle,
        "site.hero.ctaText": ctaText,
        "site.hero.slides": slides,
        // Also sync first slide as site.hero.bg for backwards compatibility
        "site.hero.bg": slides[0]?.src || "/images/cabana-view.jpg",
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
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Hero Section & Slideshow
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Customize the main banner, headlines, CTA button, and 5 luxury rotating slideshow slides.
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
            <><Save className="w-4 h-4" /> Save Hero Section</>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Headlines & Copy */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Hero Content & Headlines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Top Pill Badge Text
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
              Primary CTA Button Text
            </label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Main Big Heading *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Hero Subtitle / Description *
          </label>
          <textarea
            rows={3}
            required
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Slideshow Manager */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Hero Slideshow (5 Rotating Slides)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Each slide has an image, tag, and caption that rotates automatically on the homepage.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetSlides}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="space-y-6 divide-y divide-gray-100">
          {slides.map((slide, idx) => (
            <div key={idx} className={idx > 0 ? "pt-6 space-y-4" : "space-y-4"}>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Slide #{idx + 1} {idx === 0 ? "(Default Cover)" : ""}
                </span>
              </div>

              <ImageUploadField
                label={`Slide ${idx + 1} Image`}
                value={slide.src}
                onChange={(url) => handleSlideChange(idx, "src", url)}
                recommendedSize="1920 x 1080 (High Resolution Landscape)"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Slide Tag
                  </label>
                  <input
                    type="text"
                    value={slide.tag}
                    onChange={(e) => handleSlideChange(idx, "tag", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Wooden Cabana"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Slide Title / Caption
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleSlideChange(idx, "title", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Handcrafted retreat above canopy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
