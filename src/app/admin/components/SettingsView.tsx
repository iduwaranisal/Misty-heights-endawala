"use client";

import { useState, useEffect } from "react";
import { uploadImageToCloudinary, getSettings, saveSetting } from "@/actions/settings";
import { Loader2, Image as ImageIcon, Check } from "lucide-react";

const IMAGE_KEYS = [
  { key: "site.hero.bg", label: "Hero Background", desc: "The main background image on the landing page." },
  { key: "site.cabana.image1", label: "Cabana Showcase", desc: "Main image for 'The Cabana Living Experience'." },
  { key: "site.pool.image1", label: "Natural Pool", desc: "Image for the 'Edawala Dola' river pool section." },
  { key: "site.dining.image", label: "Village Dining", desc: "Image for the authentic dining section." },
];

export default function SettingsView() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then((data) => {
      const map: Record<string, string> = {};
      data.forEach(s => { map[s.key] = String(s.value ?? ""); });
      setSettings(map);
      setLoading(false);
    });
  }, []);

  const handleUploadAndSave = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setUploadingKey(key);
    try {
      const res = await uploadImageToCloudinary(formData);
      if (res.success && res.url) {
        // Save to DB
        await saveSetting(key, res.url, "image");
        setSettings(prev => ({ ...prev, [key]: res.url! }));
        setSavedKey(key);
        setTimeout(() => setSavedKey(null), 3000);
      } else {
        alert(res.message || 'Upload failed');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploadingKey(null);
      e.target.value = ''; // reset input
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-emerald-600" /></div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-4xl">
      <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-emerald-600" />
        Website Image Management
      </h3>
      <p className="text-sm text-gray-500 mb-8">
        Customize the images shown across the frontend website. Uploading a new image will automatically update the live site.
      </p>
      
      <div className="space-y-6">
        {IMAGE_KEYS.map((item) => (
          <div key={item.key} className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl border border-gray-100 bg-gray-50/50 items-start sm:items-center">
            {/* Preview Box */}
            <div className="w-full sm:w-32 h-24 shrink-0 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden relative flex items-center justify-center">
              {settings[item.key] ? (
                <img src={settings[item.key]} alt={item.label} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">{item.label}</h4>
              <p className="text-xs text-gray-500 mt-1 mb-3">{item.desc}</p>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    id={`upload-${item.key}`}
                    className="hidden"
                    onChange={(e) => handleUploadAndSave(item.key, e)}
                    disabled={uploadingKey !== null}
                  />
                  <label 
                    htmlFor={`upload-${item.key}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer
                      ${uploadingKey === item.key ? 'bg-emerald-100 text-emerald-600 cursor-wait' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {uploadingKey === item.key ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...</>
                    ) : (
                      <>Upload New Image</>
                    )}
                  </label>
                </div>
                {savedKey === item.key && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <Check className="w-3.5 h-3.5" /> Saved Live!
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
