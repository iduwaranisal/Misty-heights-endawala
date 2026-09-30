"use client";

import { useState } from "react";
import { saveMultipleSettings } from "@/actions/settings";
import { Save, Loader2, Check, RefreshCw, Phone, Mail, MapPin, Clock, Globe } from "lucide-react";

interface GeneralSettingsCMSProps {
  settings: Record<string, any>;
  onRefresh: () => void;
}

export default function GeneralSettingsCMS({ settings, onRefresh }: GeneralSettingsCMSProps) {
  const [form, setForm] = useState({
    name: settings["site.general.name"] || "Misty Heights Endawala",
    tagline: settings["site.general.tagline"] || "Endawala · Dellawa · Sinharaja Forest",
    description: settings["site.general.description"] || "Handcrafted wooden villa cabana retreat bordering Sinharaja Forest with Dellawa River swimming, kayaking, and misty mountain views.",
    primaryPhone: settings["site.contact.primaryPhone"] || "071 981 7000",
    secondaryPhone: settings["site.contact.secondaryPhone"] || "071 868 0633",
    whatsapp: settings["site.contact.whatsapp"] || "94719817000",
    email: settings["site.contact.email"] || "mistyheightsendawala@gmail.com",
    address: settings["site.contact.address"] || "Warukandeniya, Endawala Road, Neluwa, Dellawa, Galle District, Sri Lanka",
    mapUrl: settings["site.contact.mapUrl"] || "https://www.google.com/maps/search/?api=1&query=8FF2%2BPW+Warukandeniya",
    facebookUrl: settings["site.contact.facebookUrl"] || "https://www.facebook.com/profile.php?id=61571649441031",
    defaultCheckInTime: settings["site.booking.defaultCheckInTime"] || "14:00",
    defaultCheckOutTime: settings["site.booking.defaultCheckOutTime"] || "11:00",
  });

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
        "site.general.name": form.name,
        "site.general.tagline": form.tagline,
        "site.general.description": form.description,
        "site.contact.primaryPhone": form.primaryPhone,
        "site.contact.secondaryPhone": form.secondaryPhone,
        "site.contact.whatsapp": form.whatsapp,
        "site.contact.email": form.email,
        "site.contact.address": form.address,
        "site.contact.mapUrl": form.mapUrl,
        "site.contact.facebookUrl": form.facebookUrl,
        "site.booking.defaultCheckInTime": form.defaultCheckInTime,
        "site.booking.defaultCheckOutTime": form.defaultCheckOutTime,
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
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            Hotel Information &amp; Direct Contacts
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Update your property name, phone numbers, WhatsApp, physical address, and standard check-in hours.
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
            <><Save className="w-4 h-4" /> Save Hotel Details</>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Brand Identity */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Hotel Identity &amp; Tagline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Hotel Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Tagline / Sub-header
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Short Description (Used in Footer & About)
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <Phone className="w-4 h-4" />
          Direct Contacts & WhatsApp
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Primary Phone Number
            </label>
            <input
              type="text"
              value={form.primaryPhone}
              onChange={(e) => setForm({ ...form, primaryPhone: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Secondary Phone Number
            </label>
            <input
              type="text"
              value={form.secondaryPhone}
              onChange={(e) => setForm({ ...form, secondaryPhone: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              WhatsApp Number (Format: 94719817000)
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            Contact Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* Location & Social */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          Location & Social Links
        </h3>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Physical Address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Google Maps Location URL
            </label>
            <input
              type="text"
              value={form.mapUrl}
              onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Facebook Page Link
            </label>
            <input
              type="text"
              value={form.facebookUrl}
              onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Booking Times */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          Standard Check-In &amp; Check-Out Hours
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Default Check-In Time
            </label>
            <input
              type="time"
              value={form.defaultCheckInTime}
              onChange={(e) => setForm({ ...form, defaultCheckInTime: e.target.value })}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Default Check-Out Time
            </label>
            <input
              type="time"
              value={form.defaultCheckOutTime}
              onChange={(e) => setForm({ ...form, defaultCheckOutTime: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
      </div>

    </form>
  );
}
