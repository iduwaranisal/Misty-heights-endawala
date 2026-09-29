"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Mountain,
  Waves,
  Flame,
  Home,
  MessageSquare,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { useSettings } from "@/components/SettingsProvider";

const HERO_DEFAULTS = [
  {
    src: "/images/cabana-view.jpg",
    tag: "Wooden Cabana",
    title: "Handcrafted retreat nestled above the forest canopy",
  },
  {
    src: "/images/photo_2026-09-28_18-10-31.jpg",
    tag: "Hilltop Panorama",
    title: "Scenic aerial view of our cabana amidst misty mountains",
  },
  {
    src: "/images/natural-stream.jpg",
    tag: "Edawala Dola River",
    title: "Crystal-clear natural rock pool fresh from Sinharaja",
  },
  {
    src: "/images/photo_2026-09-28_18-10-40.jpg",
    tag: "River Adventures",
    title: "Kayaking and rafting through peaceful rainforest bends",
  },
  {
    src: "/images/photo_2026-09-28_18-10-34.jpg",
    tag: "Balcony Dining",
    title: "Fresh fruits, juices & breakfast overlooking morning mist",
  },
];

export default function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { getSetting } = useSettings();
  const heroSlides = HERO_DEFAULTS.map((slide, i) => ({
    ...slide,
    src: i === 0 ? getSetting("site.hero.bg", slide.src) : getSetting(`site.hero.slide${i + 1}`, slide.src)
  }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slideshow every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-[#0a2a18] to-emerald-900 pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Cultural Welcome Tag */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-100 text-xs font-medium max-w-full badge-glow animate-float">
              <span className="text-emerald-300 font-serif font-bold shrink-0">ආයුබෝවන්</span>
              <span className="text-white/40 shrink-0">·</span>
              <span className="sm:hidden font-medium">Dellawa · Endawala · Sinharaja</span>
              <span className="hidden sm:inline font-medium">Ayubowan · Welcome to Dellawa, Endawala &amp; Sinharaja Forest</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.15]">
              <span className="text-white">Escape to{" "}</span>
              <span className="text-gradient-animate">
                Misty Heights Endawala
              </span>
              <span className="block text-xl sm:text-2xl text-emerald-200/90 font-sans font-normal mt-2.5">
                Sinharaja Forest Villa &amp; Dellawa River Retreat
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/80 leading-relaxed max-w-xl">
              Relax in our handcrafted wooden villa retreat in Endawala, Dellawa bordering the Sinharaja
              Forest. Enjoy breathtaking mountain views, natural river pool swimming (Gin Ganga basin),
              and serene nature holidays filled with adventure.
            </p>

            {/* Feature Badges with hover lift */}
            <div className="grid grid-cols-2 gap-3 pt-1 max-w-lg">
              {[
                { icon: Mountain, label: "Scenic Hikes", color: "bg-emerald-500/20 text-emerald-300" },
                { icon: Waves, label: "Kayaking & Pool", color: "bg-teal-500/20 text-teal-300" },
                { icon: Flame, label: "Bonfire & BBQ", color: "bg-emerald-500/20 text-emerald-300" },
                { icon: Home, label: "Cozy Nature Stay", color: "bg-emerald-500/20 text-emerald-300" },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/8 backdrop-blur border border-white/15 shadow-xs card-lift"
                >
                  <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white/90">{label}</span>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-lg">
              <button
                onClick={onOpenBooking}
                className="py-3.5 px-7 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 btn-primary-glow border border-emerald-400/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book Your Stay
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/94719817000?text=Hello%20Misty%20Heights%20Endawala,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm flex items-center justify-center gap-2 transition-all backdrop-blur"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                WhatsApp Us
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-200/70 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Us: <strong className="text-white">071 981 7000</strong> · Open Every Day</span>
            </div>
          </div>

          {/* Right Column: Hotel Experience Image Slideshow */}
          <div className="lg:col-span-6 relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 ring-1 ring-emerald-500/30 aspect-[4/3] group bg-[#071a0e]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Slides */}
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                    className={`object-cover ${index === currentSlide ? "animate-kenburns" : ""}`}
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
                </div>
              ))}

              {/* Slide Details Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 flex items-end justify-between gap-4">
                <div className="text-white max-w-sm">
                  <span className="text-[11px] uppercase tracking-widest text-emerald-300 font-bold block mb-1">
                    {heroSlides[currentSlide].tag}
                  </span>
                  <p className="text-sm sm:text-base font-serif font-bold text-white line-clamp-2">
                    {heroSlides[currentSlide].title}
                  </p>
                </div>

                {/* Slide Counter */}
                <div className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white text-[11px] font-bold shrink-0">
                  0{currentSlide + 1} / 0{heroSlides.length}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur border border-white/20 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots / Progress Bar */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur px-2.5 py-1.5 rounded-full border border-white/15">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide
                        ? "w-6 bg-emerald-400"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
