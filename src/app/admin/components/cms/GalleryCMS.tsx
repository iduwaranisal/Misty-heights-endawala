"use client";

import { useState } from "react";
import { saveSetting, uploadImageToCloudinary } from "@/actions/settings";
import { DEFAULT_GALLERY_IMAGES, GalleryItem } from "@/lib/galleryDefaults";
import {
  Camera,
  Upload,
  Save,
  Loader2,
  Check,
  Trash2,
  ExternalLink,
  Sparkles,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Cloud,
  CheckCircle2,
  Search,
} from "lucide-react";

interface GalleryCMSProps {
  settings: Record<string, unknown>;
  onRefresh: () => void;
}

export default function GalleryCMS({ settings, onRefresh }: GalleryCMSProps) {
  const initialPhotos = (settings["site.gallery.images"] as GalleryItem[]) || DEFAULT_GALLERY_IMAGES;
  const [photos, setPhotos] = useState<GalleryItem[]>(initialPhotos);

  // New photo form state
  const [isUploading, setIsUploading] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"cabana" | "water" | "nature">("cabana");
  const [newDesc, setNewDesc] = useState("");
  const [newFeatured, setNewFeatured] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Filter & Search
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Saving state
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Cloudinary upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "misty-heights-website/gallery");

      const res = await uploadImageToCloudinary(formData);
      if (res.success && res.url) {
        setNewPhotoUrl(res.url);
        if (!newTitle) {
          // Generate a clean title from filename if title is empty
          const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setNewTitle(nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));
        }
      } else {
        setUploadError(res.message || "Failed to upload image to Cloudinary");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Add new photo to the list and save
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) {
      setUploadError("Please upload an image first.");
      return;
    }
    if (!newTitle.trim()) {
      setUploadError("Please enter a photo title.");
      return;
    }

    const newItem: GalleryItem = {
      src: newPhotoUrl,
      title: newTitle.trim(),
      category: newCategory,
      desc: newDesc.trim() || `${newTitle.trim()} at Misty Heights Endawala`,
      featuredOnHome: newFeatured,
    };

    const updated = [newItem, ...photos];
    setPhotos(updated);

    // Reset new form
    setNewPhotoUrl("");
    setNewTitle("");
    setNewDesc("");
    setNewCategory("cabana");
    setNewFeatured(true);
    setUploadError(null);

    // Persist immediately
    await persistPhotos(updated);
  };

  const handleUpdatePhoto = (idx: number, field: keyof GalleryItem, val: unknown) => {
    setPhotos((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleDeletePhoto = (idx: number) => {
    if (!confirm("Are you sure you want to remove this photo from the gallery?")) return;
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleMove = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= photos.length) return;

    setPhotos((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const handleResetDefaults = async () => {
    if (!confirm("Reset all gallery photos back to the default original collection? Any custom uploads will be replaced.")) return;
    setPhotos(DEFAULT_GALLERY_IMAGES);
    await persistPhotos(DEFAULT_GALLERY_IMAGES);
  };

  const persistPhotos = async (listToSave: GalleryItem[]) => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await saveSetting("site.gallery.images", listToSave, "json", "Photo Gallery images collection");
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        onRefresh();
      } else {
        setError(res.message || "Failed to save gallery changes");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred while saving";
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPhotos = photos.filter((p) => {
    const matchesFilter =
      activeFilter === "all"
        ? true
        : activeFilter === "featured"
        ? p.featuredOnHome
        : p.category === activeFilter;

    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const featuredCount = photos.filter((p) => p.featuredOnHome).length;
  const cabanaCount = photos.filter((p) => p.category === "cabana").length;
  const waterCount = photos.filter((p) => p.category === "water").length;
  const natureCount = photos.filter((p) => p.category === "nature").length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            Website Photo Gallery
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Add photos of your hotel rooms, river pool, dining, and rainforest views.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={isSaving}
            className="px-3.5 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset gallery to default original photos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Originals</span>
          </button>

          <button
            type="button"
            onClick={() => persistPhotos(photos)}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : "Save Gallery Photos"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Gallery updated and saved successfully! Changes are live on the website.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Photos</span>
          <span className="text-xl font-extrabold text-gray-900">{photos.length}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-emerald-600 block">Cabana Villa</span>
          <span className="text-xl font-extrabold text-emerald-800">{cabanaCount}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-blue-600 block">River Pool</span>
          <span className="text-xl font-extrabold text-blue-800">{waterCount}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-teal-600 block">Nature &amp; Mist</span>
          <span className="text-xl font-extrabold text-teal-800">{natureCount}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-amber-600 block">Home Featured</span>
          <span className="text-xl font-extrabold text-amber-800">{featuredCount}</span>
        </div>
      </div>

      {/* ── UPLOAD NEW PHOTO TO CLOUDINARY SECTION ── */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-emerald-300 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Upload New Photo to Cloudinary</h3>
            <p className="text-xs text-gray-500">
              Select or drop an image file to upload securely to Cloudinary CDN and add directly to your gallery.
            </p>
          </div>
        </div>

        {uploadError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {uploadError}
          </div>
        )}

        <form onSubmit={handleAddPhoto} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Upload Box / Preview */}
            <div className="md:col-span-4">
              <div className="relative aspect-4/3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex flex-col items-center justify-center group hover:bg-emerald-50/20 transition-all">
                {newPhotoUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={newPhotoUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-2 text-center">
                      <span className="text-xs font-semibold">Change Photograph</span>
                      <label className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold cursor-pointer transition-colors">
                        Select Different File
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploading}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Cloud className="w-3 h-3" />
                      Uploaded to Cloudinary
                    </div>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center p-4 cursor-pointer">
                    {isUploading ? (
                      <>
                        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
                        <span className="text-xs font-bold text-gray-700">Uploading to Cloudinary…</span>
                        <span className="text-[10px] text-gray-400 mt-1">Please wait a moment</span>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-800">Click to Select Image</span>
                        <span className="text-[10px] text-gray-400 mt-0.5 text-center">JPG, PNG, WEBP (Direct to Cloudinary CDN)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Photo Metadata Inputs */}
            <div className="md:col-span-8 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Upper Balcony Morning Mist"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as "cabana" | "water" | "nature")}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="cabana">Cabana Villa &amp; Living</option>
                    <option value="water">River Pool &amp; Water Activities</option>
                    <option value="nature">Sinharaja Nature &amp; Mountain Mist</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description / Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Panoramic dawn view overlooking the virgin Sinharaja forest canopy"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newFeatured}
                    onChange={(e) => setNewFeatured(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Feature on Homepage Highlights Gallery
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!newPhotoUrl || !newTitle.trim() || isUploading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Add to Gallery &amp; Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── EXISTING GALLERY PHOTOS MANAGER ── */}
      <div className="space-y-4">
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {[
              { id: "all", label: `All (${photos.length})` },
              { id: "cabana", label: `Cabana (${cabanaCount})` },
              { id: "water", label: `River Pool (${waterCount})` },
              { id: "nature", label: `Nature (${natureCount})` },
              { id: "featured", label: `Homepage (${featuredCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gallery photos…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Gallery Items Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400 text-xs">
            No gallery photographs match your current filter or search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map((photo) => {
              const originalIndex = photos.indexOf(photo);
              const isCloudinary = photo.src.includes("cloudinary.com");

              return (
                <div
                  key={originalIndex}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col group"
                >
                  {/* Photo Preview Container */}
                  <div className="relative aspect-16/10 bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Storage Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {isCloudinary ? (
                        <span className="bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                          <Cloud className="w-3 h-3" />
                          Cloudinary CDN
                        </span>
                      ) : (
                        <span className="bg-gray-900/80 backdrop-blur-xs text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                          Local Asset
                        </span>
                      )}

                      {photo.featuredOnHome && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3" />
                          Home
                        </span>
                      )}
                    </div>

                    {/* Quick Action Overlay */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                      <a
                        href={photo.src}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-lg bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-xs"
                        title="View Full Resolution"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(originalIndex)}
                        className="w-7 h-7 rounded-lg bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        title="Delete Photograph"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Reordering Controls */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-xs rounded-lg p-0.5">
                      <button
                        type="button"
                        disabled={originalIndex === 0}
                        onClick={() => handleMove(originalIndex, "up")}
                        className="w-6 h-6 rounded flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Move Earlier"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={originalIndex === photos.length - 1}
                        onClick={() => handleMove(originalIndex, "down")}
                        className="w-6 h-6 rounded flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Move Later"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Editable Details */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={photo.title}
                          onChange={(e) => handleUpdatePhoto(originalIndex, "title", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Category
                          </label>
                          <select
                            value={photo.category}
                            onChange={(e) => handleUpdatePhoto(originalIndex, "category", e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            <option value="cabana">Cabana</option>
                            <option value="water">River Pool</option>
                            <option value="nature">Nature</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Featured
                          </label>
                          <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 cursor-pointer h-8">
                            <input
                              type="checkbox"
                              checked={!!photo.featuredOnHome}
                              onChange={(e) => handleUpdatePhoto(originalIndex, "featuredOnHome", e.target.checked)}
                              className="w-3.5 h-3.5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                            />
                            <span className="text-[11px] font-medium">On Home</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Caption / Description
                        </label>
                        <textarea
                          rows={2}
                          value={photo.desc}
                          onChange={(e) => handleUpdatePhoto(originalIndex, "desc", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                      <span>Index #{originalIndex + 1}</span>
                      <span className="truncate max-w-[180px] font-mono">{photo.src}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
        <div>
          <p className="text-xs font-bold text-emerald-900">Finished editing your photo gallery?</p>
          <p className="text-[11px] text-emerald-700">Click Save to synchronize changes to MongoDB and live visitors.</p>
        </div>
        <button
          type="button"
          onClick={() => persistPhotos(photos)}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving Changes…" : "Save All Gallery"}
        </button>
      </div>
    </div>
  );
}
