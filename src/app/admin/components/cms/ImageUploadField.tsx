"use client";

import { useState } from "react";
import { uploadImageToCloudinary } from "@/actions/settings";
import { Loader2, Upload, Trash2, Check, Copy, ExternalLink, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  recommendedSize?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  description,
  recommendedSize,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadImageToCloudinary(formData);
      if (res.success && res.url) {
        onChange(res.url);
      } else {
        setError(res.message || "Failed to upload image");
      }
    } catch (err: any) {
      setError(err.message || "Upload error");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          {label}
        </label>
        {recommendedSize && (
          <span className="text-[10px] font-medium text-gray-400">
            Rec: {recommendedSize}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        {/* Preview box */}
        <div className="relative w-36 h-24 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center group shadow-xs">
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white/90 hover:bg-white text-gray-800 rounded-lg shadow-sm transition-transform hover:scale-105"
                  title="View full image"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-transform hover:scale-105 cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <ImageIcon className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium">No image</span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-1">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="text-[10px] font-bold text-emerald-800">Uploading...</span>
            </div>
          )}
        </div>

        {/* Input & actions */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... or upload image"
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            {value && (
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
                title="Copy URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Uploading to Cloudinary...
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  Upload from Device
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-gray-400">Directly uploads to Cloudinary</span>
          </div>

          {error && (
            <p className="text-xs text-red-600 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
