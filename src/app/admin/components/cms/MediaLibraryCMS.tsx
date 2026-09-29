"use client";

import { useState } from "react";
import { uploadImageToCloudinary } from "@/actions/settings";
import { Loader2, Upload, Copy, Check, ExternalLink, Image as ImageIcon, Sparkles } from "lucide-react";

export default function MediaLibraryCMS() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadedUrl(null);
    setCopied(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadImageToCloudinary(formData);
      if (res.success && res.url) {
        setUploadedUrl(res.url);
      } else {
        setError(res.message || "Failed to upload image");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleCopy = () => {
    if (!uploadedUrl) return;
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-emerald-600" />
          Cloudinary Media Library &amp; Uploader
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Upload any high-resolution image directly to Cloudinary and get a CDN URL to use anywhere on the website.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-emerald-200 p-8 text-center hover:bg-emerald-50/30 transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
          {isUploading ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <Upload className="w-7 h-7" />
          )}
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-1">
          {isUploading ? "Uploading to Cloudinary CDN..." : "Upload New Photograph"}
        </h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mb-5">
          Supports PNG, JPG, WEBP formats. Image will be instantly stored securely in your Cloudinary account.
        </p>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs transition-all cursor-pointer">
          <Upload className="w-4 h-4" />
          Choose File to Upload
          <input
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Success Result */}
      {uploadedUrl && (
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <Check className="w-4 h-4 text-emerald-600" />
            Image Successfully Uploaded to Cloudinary!
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-40 h-28 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-100 relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uploadedUrl}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="block text-xs font-semibold text-gray-600">
                Secure Cloudinary URL (Copy and paste into any section):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={uploadedUrl}
                  className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-800"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
