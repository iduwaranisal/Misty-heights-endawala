"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, X, ChevronLeft, ChevronRight, Eye, ArrowRight } from "lucide-react";

type GalleryItem = {
  src: string;
  title: string;
  category: "cabana" | "nature" | "water";
  desc: string;
};

export default function PhotoGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Exactly 8 high-impact real photographs for the homepage
  const homepageImages: GalleryItem[] = [
    {
      src: "/images/cabana-view.jpg",
      title: "Misty Heights Cabana Overlook",
      category: "cabana",
      desc: "Our two-story wooden cabana resting peacefully above the Sinharaja rainforest canopy.",
    },
    {
      src: "/images/natural-stream.jpg",
      title: "Edawala Dola Natural River Pool",
      category: "water",
      desc: "Fresh, unpolluted mountain stream water flowing over smooth river stones.",
    },
    {
      src: "/images/bedroom.jpg",
      title: "Handcrafted Timber King Bedroom",
      category: "cabana",
      desc: "Solid wood bed with fresh linens and breeze-welcoming shutter windows.",
    },
    {
      src: "/images/kayak.jpg",
      title: "River Kayaking Adventures",
      category: "water",
      desc: "Paddling through tranquil emerald-green rainforest waters.",
    },
    {
      src: "/images/cabana-balcony.jpg",
      title: "Upper Wooden Viewing Deck",
      category: "cabana",
      desc: "Open observation platform for sunrise mist watching and night stargazing.",
    },
    {
      src: "/images/mountain-panoramic.jpg",
      title: "Sinharaja Rainforest Ridge",
      category: "nature",
      desc: "Sweeping views of the virgin tropical forest mountains from our hillside.",
    },
    {
      src: "/images/misty-hills.jpg",
      title: "Morning Mist Rolling Over Hills",
      category: "nature",
      desc: "The gentle mountain clouds that give Misty Heights its name.",
    },
    {
      src: "/images/aerial-river.jpg",
      title: "Aerial View of Edawala River",
      category: "water",
      desc: "Drone perspective of the river swimming spot and footbridge.",
    },
  ];

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % homepageImages.length);
    }
  };

  const prevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex(
        (activeImageIndex - 1 + homepageImages.length) % homepageImages.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200 badge-glow">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            Photo Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a1f12] tracking-tight">
            Moments in Nature &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Adventure
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Real, untouched photographs of Misty Heights Endawala, sparkling river pools, and rainforest trails.
          </p>
        </div>

        {/* Gallery Grid (Strictly 8 Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {homepageImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl bg-gray-100 aspect-square cursor-pointer transition-all border border-gray-100 card-lift"
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
                  <Eye className="w-3 h-3 text-emerald-300" /> View full photo
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Linking to /gallery */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-950/20 transition-all hover:scale-105"
          >
            <span>View All Photos</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            Explore our complete photo collection of the cabana, rivers, dining, and adventures.
          </p>
        </div>
      </div>

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
                src={homepageImages[activeImageIndex].src}
                alt={homepageImages[activeImageIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-3 text-center text-white px-4">
              <h3 className="text-base sm:text-lg font-serif font-bold text-emerald-300">
                {homepageImages[activeImageIndex].title}
              </h3>
              <p className="text-xs text-gray-300 mt-1 max-w-lg">
                {homepageImages[activeImageIndex].desc}
              </p>
              <div className="text-[11px] text-gray-400 mt-1">
                {activeImageIndex + 1} of {homepageImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
