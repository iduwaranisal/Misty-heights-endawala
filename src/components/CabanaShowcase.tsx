"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bed,
  Eye,
  Wind,
  Coffee,
  ShieldCheck,
  Sun,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";

const cabanaPhotos = [
  {
    src: "/images/cabana-view.jpg",
    title: "Handcrafted Two-Story Wooden Cabana",
    caption: "Built with natural Sri Lankan timber, resting above the Sinharaja rainforest canopy.",
  },
  {
    src: "/images/bedroom.jpg",
    title: "Master Timber King Bedroom",
    caption: "Solid handcrafted wood bed with clean fresh linens and cool mountain cross-ventilation.",
  },
  {
    src: "/images/472523961_122093405000721648_5058236332923167105_n.jpg",
    title: "Cozy Second Bedroom",
    caption: "Warm natural wood interiors with panoramic jungle garden windows.",
  },
  {
    src: "/images/cabana-balcony.jpg",
    title: "Upper Observation Viewing Deck",
    caption: "360-degree open-air deck for morning cloud carpets, mist watching, and stargazing.",
  },
  {
    src: "/images/cabana-front.jpg",
    title: "Veranda & Traditional Clay Tile Patio",
    caption: "Rustic wooden pillars, outdoor dining tables, and shaded garden relaxation space.",
  },
  {
    src: "/images/photo_2026-09-28_18-10-41.jpg",
    title: "Scenic Hilltop Ridge Setting",
    caption: "Surrounded by Ceylon tea plants and dense green Sinharaja mountain slopes.",
  },
];

const amenities = [
  { icon: Bed, label: "Handcrafted Timber King Bed" },
  { icon: Eye, label: "Upper 360° Mountain Observation Deck" },
  { icon: Wind, label: "Natural Cool Rainforest Breeze" },
  { icon: Coffee, label: "Fresh Morning Ceylon Tea & Kettle" },
  { icon: Sun, label: "Ground Stone Veranda & Patio" },
  { icon: ShieldCheck, label: "Private & Peaceful Seclusion" },
];

export default function CabanaShowcase({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [activePhoto, setActivePhoto] = useState(0);

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % cabanaPhotos.length);
  };

  const prevPhoto = () => {
    setActivePhoto((prev) => (prev - 1 + cabanaPhotos.length) % cabanaPhotos.length);
  };

  return (
    <section id="cabana" className="py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Cabana Photo Slideshow & Thumbnails */}
          <div className="lg:col-span-6 space-y-3">
            {/* Main Active Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group bg-[#071a0e] card-lift">
              <Image
                src={cabanaPhotos[activePhoto].src}
                alt={cabanaPhotos[activePhoto].title}
                fill
                className="object-cover transition-all duration-700"
              />

              {/* Gradient overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                  Photo 0{activePhoto + 1} of 0{cabanaPhotos.length}
                </span>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
                  {cabanaPhotos[activePhoto].title}
                </h4>
                <p className="text-xs text-emerald-100/80 mt-1 line-clamp-2">
                  {cabanaPhotos[activePhoto].caption}
                </p>
              </div>

              {/* Prev / Next Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-10 cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-10 cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-6 gap-2">
              {cabanaPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                    activePhoto === idx
                      ? "border-emerald-600 scale-105 shadow-md ring-2 ring-emerald-400/40"
                      : "border-transparent opacity-60 hover:opacity-100 hover:scale-102"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Clean, Uncluttered Cabana Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 text-xs font-semibold uppercase tracking-wider border border-emerald-200 badge-glow">
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              Sinharaja Forest Villa &amp; Wooden Cabana
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a1f12] tracking-tight">
              A Handcrafted Wooden{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                Villa &amp; Cabana Retreat
              </span>
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              Built with genuine Sri Lankan timber and traditional clay roofing tiles, this private
              wooden retreat blends seamlessly into the Sinharaja Forest ridge near Dellawa and Endawala.
              Designed for travelers seeking an authentic nature villa stay with panoramic observation views,
              clean air, and cozy comfort.
            </p>

            {/* Clean 2-column checklist with card-lift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-emerald-100 shadow-xs card-lift"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-100 text-xs text-emerald-950 space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between font-semibold">
                <span>Ideal For:</span>
                <span className="text-emerald-800">Couples, Families &amp; Private Group Villa Stays</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Location:</span>
                <span className="font-medium text-gray-800">Warukandeniya, Endawala, Dellawa (Neluwa)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Reserve The Cabana
              </button>
              <a
                href="tel:0719817000"
                className="px-5 py-3 rounded-xl border border-emerald-200 text-emerald-900 hover:bg-emerald-50 font-semibold text-xs sm:text-sm transition-colors"
              >
                Call 071 981 7000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
