"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import ImageUploadField from "./ImageUploadField";
import { Save, Loader2, Check, Utensils, RefreshCw } from "lucide-react";

interface DiningCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

const DEFAULT_MEALS = [
  {
    title: "Traditional Sri Lankan Breakfast",
    desc: "Crispy hoppers (appa) and egg hoppers served hot with fresh coconut sambol, bananas, and spicy lunu miris.",
    tag: "Breakfast",
  },
  {
    title: "Village Clay-Pot Rice & Curries",
    desc: "Country red or white rice served with tender jackfruit (polos), coconut dhal, fresh river fish, and garden greens.",
    tag: "Lunch",
  },
  {
    title: "Rainforest Bonfire Barbecue",
    desc: "Grilled barbecue meats, spicy seafood, roasted corn, sweet potatoes, and music under starry night skies.",
    tag: "Dinner BBQ",
  },
  {
    title: "Fresh Herbal & Ceylon Black Tea",
    desc: "Fragrant Ceylon tea from nearby hill plantations, accompanied by morning herbal kola kanda with jaggery.",
    tag: "Tea & Health",
  },
];

export default function DiningCMS({ settings, onRefresh }: DiningCMSProps) {
  const [badge, setBadge] = useState(
    settings["site.dining.badge"] || "Authentic Island Flavors"
  );
  const [title, setTitle] = useState(
    settings["site.dining.title"] || "Homecooked Village Food & Fireside Meals"
  );
  const [description, setDescription] = useState(
    settings["site.dining.desc"] ||
      "Experience the true taste of Sri Lankan village cooking. Fresh ingredients from local gardens, fragrant unrefined spices, and dishes prepared with time-honored recipes in traditional clay pots."
  );
  const [buttonText, setButtonText] = useState(
    settings["site.dining.buttonText"] || "Inquire about custom meal packages"
  );
  const [image, setImage] = useState(
    settings["site.dining.image"] || "/images/photo_2026-09-28_18-10-34.jpg"
  );

  const initialMeals = settings["site.dining.meals"] || DEFAULT_MEALS;
  const [meals, setMeals] = useState<Array<{ title: string; desc: string; tag: string }>>(initialMeals);

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMealChange = (idx: number, field: string, val: string) => {
    setMeals((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Record<string, any> = {
        "site.dining.badge": badge,
        "site.dining.title": title,
        "site.dining.desc": description,
        "site.dining.buttonText": buttonText,
        "site.dining.image": image,
        "site.dining.meals": meals,
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
            <Utensils className="w-5 h-5 text-emerald-600" />
            Village Dining &amp; Fireside BBQ
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Customize the traditional food menu, dining photographs, and meal descriptions.
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
            <><Save className="w-4 h-4" /> Save Dining Section</>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Main Copy */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Section Content
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
              Section Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Section Description *
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Inquiry Button Label
          </label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Dining Featured Photo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Featured Dining &amp; Breakfast Photograph
        </h3>
        <ImageUploadField
          label="Dining Photo"
          value={image}
          onChange={setImage}
          recommendedSize="1200 x 900"
        />
      </div>

      {/* 4 Village Meals */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Village Meals &amp; Menus (4 Categories)
          </h3>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset meals to default?")) setMeals(DEFAULT_MEALS);
            }}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meals.map((meal, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Menu #{idx + 1}
                </span>
                <input
                  type="text"
                  placeholder="Tag (e.g. Breakfast)"
                  value={meal.tag}
                  onChange={(e) => handleMealChange(idx, "tag", e.target.value)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-gray-200 text-gray-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Dish / Course Title
                </label>
                <input
                  type="text"
                  value={meal.title}
                  onChange={(e) => handleMealChange(idx, "title", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={meal.desc}
                  onChange={(e) => handleMealChange(idx, "desc", e.target.value)}
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
