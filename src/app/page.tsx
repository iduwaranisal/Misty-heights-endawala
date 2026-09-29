"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AdventureTicker from "@/components/AdventureTicker";
import CorePillars from "@/components/CorePillars";
import CabanaShowcase from "@/components/CabanaShowcase";
import NaturalPool from "@/components/NaturalPool";
import Experiences from "@/components/Experiences";
import VillageDining from "@/components/VillageDining";
import PhotoGallery from "@/components/PhotoGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import EcoSanctuary from "@/components/EcoSanctuary";
import LocationSection from "@/components/LocationSection";
import FaqSection from "@/components/FaqSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { MessageSquare, Phone, Calendar } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

export default function Home() {
  const { getSetting } = useSettings();
  const whatsapp = getSetting("site.contact.whatsapp", "94719817000");
  const primaryPhone = getSetting("site.contact.primaryPhone", "071 981 7000");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0a1f12] selection:bg-emerald-700 selection:text-white">
      {/* Navigation Header */}
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Luxury Slideshow */}
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 2. Infinite Adventure Marquee Ticker */}
        <AdventureTicker />

        {/* 3. 4 Core Pillars: Hikes, Kayaking, Bonfire, Nature Stay */}
        <CorePillars onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 4. The Cabana Living Experience with Interactive Photo Carousel */}
        <CabanaShowcase onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 5. Edawala Dola Natural River Pool */}
        <NaturalPool />

        {/* 6. Activities to Enjoy with Friends & Family */}
        <Experiences onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 7. Authentic Sri Lankan Village Dining */}
        <VillageDining onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 8. Real Photo Gallery (8 Homepage photos with View All button) */}
        <PhotoGallery />

        {/* 9. Traveler Stories & Guest Reviews */}
        <TestimonialsSection />

        {/* 10. Eco Sanctuary & Rainforest Harmony */}
        <EcoSanctuary />

        {/* 11. Location, Driving Routes & Real Plus Code Map */}
        <LocationSection />

        {/* 12. Frequently Asked Questions */}
        <FaqSection />

        {/* 13. Direct Booking Section */}
        <BookingSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Pop-up Reservation Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        {/* Book Now pill */}
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl shadow-emerald-950/30 text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open booking"
        >
          <Calendar className="w-4 h-4" />
          Book Now
        </button>

        <div className="flex gap-2.5 justify-end">
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Hello%20Misty%20Heights%20Endawala,%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-float"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>

          <a
            href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
            className="w-12 h-12 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Call Us Directly"
          >
            <Phone className="w-4 h-4 text-emerald-700" />
          </a>
        </div>
      </div>
    </div>
  );
}
