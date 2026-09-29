"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, X, ChevronLeft, ChevronRight, Eye, ArrowLeft, Calendar, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useSettings } from "@/components/SettingsProvider";
import { DEFAULT_GALLERY_IMAGES, GalleryItem } from "@/lib/galleryDefaults";

export default function GalleryPage() {
  const { getSetting } = useSettings();
  const whatsapp = getSetting("site.contact.whatsapp", "94719817000");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "cabana" | "water" | "nature">("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Dynamic collection from MongoDB settings, fallback to defaults
  const allImages = getSetting<GalleryItem[]>("site.gallery.images", DEFAULT_GALLERY_IMAGES);

  const filteredImages =
    selectedCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex(
        (activeImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f2416] selection:bg-emerald-700 selection:text-white">
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back Navigation Bar */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Misty Heights Homepage</span>
            </Link>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-950/20 hover:scale-105 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Your Stay
            </button>
          </div>

          {/* Page Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200 badge-glow">
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              Full Retreat Gallery
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a1f12] tracking-tight">
              Life at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                Misty Heights Endawala
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              Explore authentic views of our wooden villa &amp; cabana retreat in Dellawa Endawala, comfortable bedrooms,
              the pristine Dellawa River waters of Edawala Dola (Gin Ganga basin), and the rolling mist of the Sinharaja Forest.
            </p>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {([
                { id: "all", label: "All Photos" },
                { id: "cabana", label: "The Cabana & Rooms" },
                { id: "water", label: "River & Kayaking" },
                { id: "nature", label: "Rainforest & Mist" },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-gradient-to-r from-emerald-800 to-teal-700 text-white shadow-md"
                      : "bg-gray-100/90 text-gray-700 hover:bg-gray-200/90"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl bg-gray-100 aspect-[4/3] cursor-pointer transition-all border border-gray-100 card-lift"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                    {img.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-white leading-snug">{img.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-300 mt-1">
                    <Eye className="w-3 h-3 text-emerald-300" /> View full photograph
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking CTA Bar */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="space-y-1 text-center sm:text-left relative z-10">
              <h3 className="text-xl sm:text-2xl font-serif font-bold">
                Experience Misty Heights in Person
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80">
                Cozy wooden cabana, crystal river pool, mountain hikes &amp; warm village hospitality.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 relative z-10">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/40 btn-primary-glow border border-emerald-400/30 transition-all cursor-pointer hover:scale-105"
              >
                Book Your Stay
              </button>
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Hello%20Misty%20Heights!%20I%20saw%20your%20full%20photo%20gallery%20and%20would%20like%20to%20inquire%20about%20a%20stay.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm border border-emerald-600 transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative w-full h-[65vh] sm:h-[75vh]">
              <Image
                src={filteredImages[activeImageIndex].src}
                alt={filteredImages[activeImageIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-3 text-center text-white px-4">
              <h3 className="text-base sm:text-lg font-serif font-bold text-emerald-300">
                {filteredImages[activeImageIndex].title}
              </h3>
              <p className="text-xs text-gray-300 mt-1 max-w-lg">
                {filteredImages[activeImageIndex].desc}
              </p>
              <div className="text-[11px] text-gray-400 mt-1">
                {activeImageIndex + 1} of {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
