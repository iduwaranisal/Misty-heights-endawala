"use client";

import { useState } from "react";
import { uploadImageToCloudinary } from "@/actions/settings";
import { Loader2, Upload, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";

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
        setError(res.message || "Failed to upload image. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Upload error. Please try another image.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2 p-3 bg-gray-50/70 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800">
          {label}
        </label>
        {recommendedSize && (
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            Suggested: {recommendedSize}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Preview box */}
        <div className="relative w-36 h-24 rounded-xl bg-gray-200 border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center group shadow-xs">
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 bg-white hover:bg-gray-100 text-gray-800 rounded-lg shadow-sm transition-transform hover:scale-105"
                  title="View full size"
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
              <span className="text-[10px] font-medium">No photo selected</span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center gap-1.5 z-10">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="text-[10px] font-bold text-emerald-800">Uploading photo...</span>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  {value ? "Choose Different Photo" : "Upload Photo"}
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

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            )}
          </div>

          <p className="text-[11px] text-gray-400">
            JPG, PNG or WEBP from your phone or computer.
          </p>

          {error && (
            <p className="text-xs text-red-600 font-medium">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
