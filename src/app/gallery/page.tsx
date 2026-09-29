"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, X, ChevronLeft, ChevronRight, Eye, ArrowLeft, Calendar, Phone, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

type GalleryItem = {
  src: string;
  title: string;
  category: "all" | "cabana" | "water" | "nature";
  desc: string;
};

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "cabana" | "water" | "nature">("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Complete collection of real, unedited property photographs
  const allImages: GalleryItem[] = [
    {
      src: "/images/cabana-view.jpg",
      title: "Misty Heights Cabana Valley Overlook",
      category: "cabana",
      desc: "Two-story handcrafted wooden cabana resting quietly above the Sinharaja rainforest canopy.",
    },
    {
      src: "/images/natural-stream.jpg",
      title: "Edawala Dola Pristine River Pool",
      category: "water",
      desc: "Crystal-clear mountain stream water flowing naturally over smooth boulders and river stone beds.",
    },
    {
      src: "/images/bedroom.jpg",
      title: "Handcrafted Timber King Bedroom",
      category: "cabana",
      desc: "Solid wood bed dressed in clean linens with wooden shutter windows for natural mountain ventilation.",
    },
    {
      src: "/images/472523961_122093405000721648_5058236332923167105_n.jpg",
      title: "Cozy Cabana Guest Room",
      category: "cabana",
      desc: "Warm wooden interiors, solid timber craftsmanship, and serene forest views from every window.",
    },
    {
      src: "/images/kayak.jpg",
      title: "River Kayaking & Boating",
      category: "water",
      desc: "Peaceful river paddling along tranquil freshwater bends framed by virgin rainforest trees.",
    },
    {
      src: "/images/cabana-balcony.jpg",
      title: "Upper Observation Deck",
      category: "cabana",
      desc: "Open-air timber viewing loft offering 360-degree vistas of morning cloud carpets and starlit skies.",
    },
    {
      src: "/images/mountain-panoramic.jpg",
      title: "Sinharaja Rainforest Ridge Panorama",
      category: "nature",
      desc: "Untouched mountain slopes and lush green tropical canopy as viewed directly from our hillside.",
    },
    {
      src: "/images/cabana-front.jpg",
      title: "Clay Tile Facade & Veranda",
      category: "cabana",
      desc: "Traditional Sri Lankan red clay roof tiles, rustic wooden pillars, and stone-paved dining patio.",
    },
    {
      src: "/images/misty-hills.jpg",
      title: "Morning Mist Rising Over Sinharaja",
      category: "nature",
      desc: "The gentle white clouds that drift through the forest valleys each dawn, giving Misty Heights its name.",
    },
    {
      src: "/images/aerial-river.jpg",
      title: "Aerial Perspective of Edawala River",
      category: "water",
      desc: "Drone view showcasing the clean river bend, surrounding jungle trees, and river footbridge.",
    },
    {
      src: "/images/twilight-forest.jpg",
      title: "Twilight Over the Rainforest Hills",
      category: "nature",
      desc: "Peaceful evening colors settling over the mountain ranges as the nighttime campfire begins.",
    },
    // — New Photos —
    {
      src: "/images/photo_2026-09-28_18-10-31.jpg",
      title: "Cabana Hilltop Aerial View",
      category: "cabana",
      desc: "Bird's eye view of the cabana perched on a peaceful hilltop surrounded by lush tropical greenery.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-41.jpg",
      title: "Cabana Nestled in the Mountains",
      category: "cabana",
      desc: "The wooden retreat sitting quietly among tall trees and rolling green mountain hills.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-37.jpg",
      title: "Drone View – Cabana & Rainforest River",
      category: "nature",
      desc: "Aerial shot showing the cabana, winding jungle path, and the Edawala river bend below.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-29.jpg",
      title: "Calm River Bend Under Blue Sky",
      category: "water",
      desc: "A wide, calm stretch of the natural river pool reflecting tall rainforest trees and blue sky.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-28.jpg",
      title: "River Rushing Over Smooth Rocks",
      category: "water",
      desc: "Fresh mountain water rushing over flat rocks and boulders at the edge of our natural swimming area.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-31 (2).jpg",
      title: "Peaceful Natural Swimming Pool",
      category: "water",
      desc: "The wide, still section of the river perfect for a refreshing dip or quiet float.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-36.jpg",
      title: "Crystal Clear River Rock Pools",
      category: "water",
      desc: "Sun-lit rock pools with golden-clear water – perfect for wading and relaxing by the stream.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-40.jpg",
      title: "Family Kayaking on the River",
      category: "water",
      desc: "A mum and daughter paddling a yellow kayak through the calm jungle river with life jackets on.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-42.jpg",
      title: "Kids Kayaking with the Family",
      category: "water",
      desc: "A guide paddles a group of little ones down the clear river surrounded by rainforest trees.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-41 (2).jpg",
      title: "Rubber Boat Fun on the River",
      category: "water",
      desc: "Guests enjoying a fun river ride on an inflatable boat with yellow paddles.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-33.jpg",
      title: "Group River Swimming & Boating",
      category: "water",
      desc: "A fun group of friends swimming and rafting together on the calm river surrounded by greenery.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-38.jpg",
      title: "River Fun with Friends",
      category: "water",
      desc: "Guests laughing and swimming together in the wide river pool next to a leafy forest bank.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-34.jpg",
      title: "Breakfast on the Balcony",
      category: "cabana",
      desc: "A beautifully set table with fresh juice, fruits and local treats enjoyed with a misty mountain view.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-35.jpg",
      title: "Guests Dining with a Forest View",
      category: "cabana",
      desc: "A family sharing a warm meal on the open veranda with the green hills stretching behind them.",
    },

    {
      src: "/images/photo_2026-09-28_18-10-30.jpg",
      title: "Spiced Crab with Mountain Views",
      category: "nature",
      desc: "A plate of freshly cooked Sri Lankan spiced crab, served with the green hills as a backdrop.",
    },
    {
      src: "/images/photo_2026-09-28_18-10-26.jpg",
      title: "Guests Exploring the Rainforest Trail",
      category: "nature",
      desc: "Two smiling travelers on a guided walk through the lush Sinharaja forest canopy trail.",
    },
  ];

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
              {[
                { id: "all", label: "All Photos" },
                { id: "cabana", label: "The Cabana & Rooms" },
                { id: "water", label: "River & Kayaking" },
                { id: "nature", label: "Rainforest & Mist" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
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
                href="https://wa.me/94719817000?text=Hello%20Misty%20Heights!%20I%20saw%20your%20full%20photo%20gallery%20and%20would%20like%20to%20inquire%20about%20a%20stay."
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
