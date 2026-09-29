"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import { Save, Loader2, Check, Star, Plus, Trash2, RefreshCw } from "lucide-react";

interface TestimonialsCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

const DEFAULT_REVIEWS = [
  {
    name: "Dinuka & Rashmi",
    origin: "Colombo, Sri Lanka",
    date: "Recent Stay",
    text: "Waking up above the clouds with mist floating right past the wooden balcony was pure magic. The fresh river bath at Edawala Dola was the highlight of our trip — crystal clear, refreshing, and peaceful.",
    highlight: "Pure mist & natural river pool",
  },
  {
    name: "Chaminda Silva",
    origin: "Galle, Sri Lanka",
    date: "Family Weekend",
    text: "The family treated us like their own. Delicious hot hoppers and coconut sambol for breakfast, and an unforgettable evening bonfire under a sky filled with stars. Zero city noise, just birds and breeze.",
    highlight: "Unmatched village hospitality",
  },
  {
    name: "Elena & Marcus",
    origin: "Nature Travelers",
    date: "Holiday Getaway",
    text: "We booked Misty Heights for its closeness to Sinharaja. The wooden cabana is cozy, clean, and breezy. We kayaked on the quiet river and spotted beautiful endemic birds right from the patio.",
    highlight: "Sinharaja birdwatching & kayak",
  },
];

export default function TestimonialsCMS({ settings, onRefresh }: TestimonialsCMSProps) {
  const [badge, setBadge] = useState(
    settings["site.reviews.badge"] || "Traveler Stories"
  );
  const [title, setTitle] = useState(
    settings["site.reviews.title"] || "Memories Shared by Our Guests"
  );
  const [subtitle, setSubtitle] = useState(
    settings["site.reviews.subtitle"] ||
      "Real experiences from travelers who found quiet moments and warm hospitality at Misty Heights."
  );

  const initialReviews = settings["site.reviews.items"] || DEFAULT_REVIEWS;
  const [reviews, setReviews] = useState<Array<{
    name: string;
    origin: string;
    date: string;
    text: string;
    highlight: string;
  }>>(initialReviews);

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReviewChange = (idx: number, field: string, val: string) => {
    setReviews((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const addReview = () => {
    setReviews([
      ...reviews,
      {
        name: "New Guest",
        origin: "Traveler",
        date: "Recent Stay",
        text: "Wonderful experience and unforgettable mountain views!",
        highlight: "Peaceful escape",
      },
    ]);
  };

  const removeReview = (idx: number) => {
    if (confirm("Delete this review?")) {
      setReviews(reviews.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Record<string, any> = {
        "site.reviews.badge": badge,
        "site.reviews.title": title,
        "site.reviews.subtitle": subtitle,
        "site.reviews.items": reviews,
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
            <Star className="w-5 h-5 text-yellow-500" />
            Guest Reviews &amp; Testimonials
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Add, edit, or remove genuine traveler stories displayed on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addReview}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-600" /> Add Review
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
              <><Save className="w-4 h-4" /> Save Reviews</>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Section Content */}
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

      {/* Reviews List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Reviews List ({reviews.length})
          </h3>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset reviews to default?")) setReviews(DEFAULT_REVIEWS);
            }}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="space-y-4 divide-y divide-gray-100">
          {reviews.map((rev, idx) => (
            <div key={idx} className={idx > 0 ? "pt-5 space-y-3" : "space-y-3"}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Review #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeReview(idx)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rev.name}
                    onChange={(e) => handleReviewChange(idx, "name", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Origin / City
                  </label>
                  <input
                    type="text"
                    value={rev.origin}
                    onChange={(e) => handleReviewChange(idx, "origin", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Stay Date / Type
                  </label>
                  <input
                    type="text"
                    value={rev.date}
                    onChange={(e) => handleReviewChange(idx, "date", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Highlight Pill
                </label>
                <input
                  type="text"
                  value={rev.highlight}
                  onChange={(e) => handleReviewChange(idx, "highlight", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. Unmatched village hospitality"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={rev.text}
                  onChange={(e) => handleReviewChange(idx, "text", e.target.value)}
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
