"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import { Save, Loader2, Check, Compass, RefreshCw } from "lucide-react";

interface ExperiencesCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

const DEFAULT_EXPERIENCES = [
  {
    title: "Refreshing Dips at Edawala Dola",
    desc: "Cool off in natural river pools surrounded by rainforest ferns and gentle fresh currents.",
    tag: "River Bath",
  },
  {
    title: "BBQ Nights & Bonfire Under the Stars",
    desc: "Gather around the campfire for roasted treats, acoustic songs, and starry night skies.",
    tag: "Campfire",
  },
  {
    title: "Nature Walks & Bird Watching",
    desc: "Discover endemic birds including the Sri Lanka Blue Magpie and colorful forest butterflies.",
    tag: "Wildlife",
  },
  {
    title: "Scenic Hikes Through Sinharaja",
    desc: "Trek scenic mountain paths through untouched rainforest trails with local guide support.",
    tag: "Trekking",
  },
  {
    title: "Hand-Pick Seasonal Fruits",
    desc: "Taste fresh rambutan, mangosteen, jackfruit, and sweet king coconut straight from village trees.",
    tag: "Organic",
  },
  {
    title: "Relax Overlooking Misty Mountains",
    desc: "Sit on your wooden viewing deck while watching peaceful morning clouds drift over the forest.",
    tag: "Serenity",
  },
];

const DEFAULT_PILLARS = [
  {
    title: "Rainforest Hikes",
    desc: "Explore scenic walking trails bordering the UNESCO Sinharaja Forest reserve with expert guidance.",
  },
  {
    title: "River Kayaking",
    desc: "Paddle along the pristine, peaceful bends of Edawala Dola and Dellawa River with life jackets provided.",
  },
  {
    title: "Bonfire & BBQ",
    desc: "Gather under the starlit mountain skies for an evening campfire with barbecue treats and gentle warmth.",
  },
  {
    title: "Wooden Living",
    desc: "Rest comfortably in our handcrafted two-story wooden cabana villa with 360-degree observation deck views.",
  },
];

export default function ExperiencesCMS({ settings, onRefresh }: ExperiencesCMSProps) {
  const [expTitle, setExpTitle] = useState(
    settings["site.exp.title"] || "Memories to Create with Family & Friends"
  );
  const [expSubtitle, setExpSubtitle] = useState(
    settings["site.exp.subtitle"] || "Unwind, recharge, and reconnect with nature in simple, peaceful ways."
  );

  const initialExp = settings["site.exp.items"] || DEFAULT_EXPERIENCES;
  const [experiences, setExperiences] = useState<Array<{ title: string; desc: string; tag: string }>>(initialExp);

  const initialPillars = settings["site.pillars.items"] || DEFAULT_PILLARS;
  const [pillars, setPillars] = useState<Array<{ title: string; desc: string }>>(initialPillars);

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExpChange = (idx: number, field: string, val: string) => {
    setExperiences((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handlePillarChange = (idx: number, field: string, val: string) => {
    setPillars((prev) => {
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
        "site.exp.title": expTitle,
        "site.exp.subtitle": expSubtitle,
        "site.exp.items": experiences,
        "site.pillars.items": pillars,
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
            <Compass className="w-5 h-5 text-emerald-600" />
            Core Pillars &amp; Rainforest Activities
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Customize the 4 core pillars and the 6 holiday experiences showcased to travelers.
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
            <><Save className="w-4 h-4" /> Save Activities</>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* 4 Core Pillars */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            4 Core Experience Pillars
          </h3>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset pillars to default?")) setPillars(DEFAULT_PILLARS);
            }}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Pillar #{idx + 1}
              </span>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={pillar.title}
                  onChange={(e) => handlePillarChange(idx, "title", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={pillar.desc}
                  onChange={(e) => handlePillarChange(idx, "desc", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Things to Enjoy / Activities */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            6 Guest Activities &amp; Experiences
          </h3>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset experiences to default?")) setExperiences(DEFAULT_EXPERIENCES);
            }}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={expTitle}
              onChange={(e) => setExpTitle(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Section Subtitle
            </label>
            <input
              type="text"
              value={expSubtitle}
              onChange={(e) => setExpSubtitle(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {experiences.map((exp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Activity #{idx + 1}
                </span>
                <input
                  type="text"
                  placeholder="Tag"
                  value={exp.tag}
                  onChange={(e) => handleExpChange(idx, "tag", e.target.value)}
                  className="px-2 py-0.5 text-xs rounded-lg bg-white border border-gray-200 text-gray-700 font-bold w-24"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => handleExpChange(idx, "title", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={exp.desc}
                  onChange={(e) => handleExpChange(idx, "desc", e.target.value)}
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
