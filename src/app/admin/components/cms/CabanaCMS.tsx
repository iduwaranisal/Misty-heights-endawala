"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import ImageUploadField from "./ImageUploadField";
import { Save, Loader2, Check, Home, Layers, RefreshCw, Plus, Trash2 } from "lucide-react";

interface CabanaCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

const DEFAULT_PHOTOS = [
  {
    src: "/images/cabana-view.jpg",
    title: "Handcrafted Two-Story Wooden Cabana",
    caption: "Built with natural Sri Lankan timber, resting above the Sinharaja rainforest canopy.",
  },
  {
    src: "/images/bedroom.jpg",
    title: "Master Timber King Bedroom",
    caption: "Solid handcrafted wood bed with clean fresh linens and cool mountain cross-ventilation.",
  },
  {
    src: "/images/472523961_122093405000721648_5058236332923167105_n.jpg",
    title: "Cozy Second Bedroom",
    caption: "Warm natural wood interiors with panoramic jungle garden windows.",
  },
  {
    src: "/images/cabana-balcony.jpg",
    title: "Upper Observation Viewing Deck",
    caption: "360-degree open-air deck for morning cloud carpets, mist watching, and stargazing.",
  },
  {
    src: "/images/cabana-front.jpg",
    title: "Veranda & Traditional Clay Tile Patio",
    caption: "Rustic wooden pillars, outdoor dining tables, and shaded garden relaxation space.",
  },
  {
    src: "/images/photo_2026-09-28_18-10-41.jpg",
    title: "Scenic Hilltop Ridge Setting",
    caption: "Surrounded by Ceylon tea plants and dense green Sinharaja mountain slopes.",
  },
];

const DEFAULT_AMENITIES = [
  "Handcrafted Timber King Bed",
  "Upper 360° Mountain Observation Deck",
  "Natural Cool Rainforest Breeze",
  "Fresh Morning Ceylon Tea & Kettle",
  "Ground Stone Veranda & Patio",
  "Private & Peaceful Seclusion",
];

export default function CabanaCMS({ settings, onRefresh }: CabanaCMSProps) {
  const [badge, setBadge] = useState(
    settings["site.cabana.badge"] || "Handcrafted Wooden Architecture"
  );
  const [title, setTitle] = useState(
    settings["site.cabana.title"] || "The Cabana Living Experience"
  );
  const [description, setDescription] = useState(
    settings["site.cabana.description"] ||
      "Built entirely by local craftsmen using seasoned Sri Lankan timber, our two-story wooden cabana offers an intimate connection to the Sinharaja rainforest."
  );

  const initialPhotos = settings["site.cabana.photos"] || DEFAULT_PHOTOS;
  const [photos, setPhotos] = useState<Array<{ src: string; title: string; caption: string }>>(initialPhotos);

  const initialAmenities = settings["site.cabana.amenities"] || DEFAULT_AMENITIES;
  const [amenities, setAmenities] = useState<string[]>(initialAmenities);
  const [newAmenity, setNewAmenity] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoChange = (idx: number, field: string, val: string) => {
    setPhotos((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    setAmenities([...amenities, newAmenity.trim()]);
    setNewAmenity("");
  };

  const removeAmenity = (idx: number) => {
    setAmenities(amenities.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Record<string, any> = {
        "site.cabana.badge": badge,
        "site.cabana.title": title,
        "site.cabana.description": description,
        "site.cabana.photos": photos,
        "site.cabana.amenities": amenities,
        // Individual image compatibility keys
        "site.cabana.image1": photos[0]?.src || "/images/cabana-view.jpg",
        "site.cabana.image2": photos[1]?.src || "/images/bedroom.jpg",
        "site.cabana.image3": photos[2]?.src || "/images/472523961_122093405000721648_5058236332923167105_n.jpg",
        "site.cabana.image4": photos[3]?.src || "/images/cabana-balcony.jpg",
        "site.cabana.image5": photos[4]?.src || "/images/cabana-front.jpg",
        "site.cabana.image6": photos[5]?.src || "/images/photo_2026-09-28_18-10-41.jpg",
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
            <Home className="w-5 h-5 text-emerald-600" />
            Cabana Showcase Section
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Customize the wooden cabana villa details, 6 interactive gallery photos, and key amenities.
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
            <><Save className="w-4 h-4" /> Save Cabana Section</>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Section Headers */}
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
            Section Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* 6 Cabana Showcase Photos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Cabana Photos &amp; Captions (6 Photos)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Upload images directly for the interactive photo carousel with custom titles and captions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm("Reset photos to default?")) setPhotos(DEFAULT_PHOTOS);
            }}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="space-y-6 divide-y divide-gray-100">
          {photos.map((photo, idx) => (
            <div key={idx} className={idx > 0 ? "pt-6 space-y-3" : "space-y-3"}>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Photo #{idx + 1}
              </span>

              <ImageUploadField
                label={`Photo ${idx + 1}`}
                value={photo.src}
                onChange={(url) => handlePhotoChange(idx, "src", url)}
                recommendedSize="1200 x 800"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    value={photo.title}
                    onChange={(e) => handlePhotoChange(idx, "title", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Photo Caption
                  </label>
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => handlePhotoChange(idx, "caption", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Manager */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Cabana Features &amp; Amenities
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new feature/amenity..."
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAmenity(); } }}
            className={inputCls}
          />
          <button
            type="button"
            onClick={addAmenity}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
          {amenities.map((amenity, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800"
            >
              <span>{amenity}</span>
              <button
                type="button"
                onClick={() => removeAmenity(idx)}
                className="text-gray-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
