"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import ImageUploadField from "./ImageUploadField";
import { Save, Loader2, Check, Waves, RefreshCw } from "lucide-react";

interface RiverPoolCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

export default function RiverPoolCMS({ settings, onRefresh }: RiverPoolCMSProps) {
  const [badge, setBadge] = useState(
    settings["site.pool.badge"] || "Dellawa River & Edawala Dola (Gin Ganga Basin)"
  );
  const [title, setTitle] = useState(
    settings["site.pool.title"] || "Swim in Pure Natural Dellawa River Waters"
  );
  const [description, setDescription] = useState(
    settings["site.pool.desc"] ||
      "Step directly into the unpolluted waters of the Dellawa River system and Edawala Dola stream. Flowing straight from the protected Sinharaja Forest ridge towards the Gin Ganga basin, this freshwater river offers pristine natural rock bathing pools, gentle shallows, and calm stretches perfect for kayaking and rafting thrills."
  );
  const [linkText, setLinkText] = useState(
    settings["site.pool.linkText"] || "Inquire about Dellawa river bathing times & kayaks"
  );

  const [image1, setImage1] = useState(
    settings["site.pool.image1"] || "/images/natural-stream.jpg"
  );
  const [image2, setImage2] = useState(
    settings["site.pool.image2"] || "/images/photo_2026-09-28_18-10-40.jpg"
  );
  const [image3, setImage3] = useState(
    settings["site.pool.image3"] || "/images/photo_2026-09-28_18-10-41 (2).jpg"
  );

  const [feat1Title, setFeat1Title] = useState(
    settings["site.pool.feat1Title"] || "Crystal River Rock Pools"
  );
  const [feat1Desc, setFeat1Desc] = useState(
    settings["site.pool.feat1Desc"] ||
      "Pure mountain spring water with smooth river stones and wild forest ferns along the Dellawa river bank."
  );

  const [feat2Title, setFeat2Title] = useState(
    settings["site.pool.feat2Title"] || "River Kayaking & Rafting"
  );
  const [feat2Desc, setFeat2Desc] = useState(
    settings["site.pool.feat2Desc"] ||
      "Paddle gently beneath lush Sinharaja canopy bends with kayaks, inflatable boats, and life vests ready."
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
        "site.pool.badge": badge,
        "site.pool.title": title,
        "site.pool.desc": description,
        "site.pool.linkText": linkText,
        "site.pool.image1": image1,
        "site.pool.image2": image2,
        "site.pool.image3": image3,
        "site.pool.feat1Title": feat1Title,
        "site.pool.feat1Desc": feat1Desc,
        "site.pool.feat2Title": feat2Title,
        "site.pool.feat2Desc": feat2Desc,
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
            <Waves className="w-5 h-5 text-teal-600" />
            Natural River Pool &amp; Stream
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Update river bathing details, stream descriptions, and swimming photos.
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
            <><Save className="w-4 h-4" /> Save River Pool Details</>
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
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800">
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
            WhatsApp Inquiry Button Label
          </label>
          <input
            type="text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* 3 Photos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800">
          River Pool Photographs (3 Images)
        </h3>

        <div className="space-y-5">
          <ImageUploadField
            label="1. Main Featured River Pool Photo"
            value={image1}
            onChange={setImage1}
            recommendedSize="1200 x 900"
          />
          <ImageUploadField
            label="2. Kayak Adventures Photo"
            value={image2}
            onChange={setImage2}
            recommendedSize="800 x 600"
          />
          <ImageUploadField
            label="3. Inflatable Boat Photo"
            value={image3}
            onChange={setImage3}
            recommendedSize="800 x 600"
          />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800">
          Two Feature Cards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Feature 1 Title
              </label>
              <input
                type="text"
                value={feat1Title}
                onChange={(e) => setFeat1Title(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Feature 1 Description
              </label>
              <textarea
                rows={2}
                value={feat1Desc}
                onChange={(e) => setFeat1Desc(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Feature 2 Title
              </label>
              <input
                type="text"
                value={feat2Title}
                onChange={(e) => setFeat2Title(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Feature 2 Description
              </label>
              <textarea
                rows={2}
                value={feat2Desc}
                onChange={(e) => setFeat2Desc(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
