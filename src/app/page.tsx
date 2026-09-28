"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AdventureTicker from "@/components/AdventureTicker";
import RevealOnScroll from "@/components/RevealOnScroll";
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
import { MessageSquare, Phone } from "lucide-react";

export default function Home() {
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
        <RevealOnScroll>
          <CorePillars onOpenBooking={() => setIsBookingOpen(true)} />
        </RevealOnScroll>

        {/* 4. The Cabana Living Experience with Interactive Photo Carousel */}
        <RevealOnScroll>
          <CabanaShowcase onOpenBooking={() => setIsBookingOpen(true)} />
        </RevealOnScroll>

        {/* 5. Edawala Dola Natural River Pool */}
        <RevealOnScroll>
          <NaturalPool />
        </RevealOnScroll>

        {/* 6. Activities to Enjoy with Friends & Family */}
        <RevealOnScroll>
          <Experiences onOpenBooking={() => setIsBookingOpen(true)} />
        </RevealOnScroll>

        {/* 7. Authentic Sri Lankan Village Dining */}
        <RevealOnScroll>
          <VillageDining onOpenBooking={() => setIsBookingOpen(true)} />
        </RevealOnScroll>

        {/* 8. Real Photo Gallery (8 Homepage photos with View All button) */}
        <RevealOnScroll>
          <PhotoGallery />
        </RevealOnScroll>

        {/* 9. Traveler Stories & Guest Reviews */}
        <RevealOnScroll>
          <TestimonialsSection />
        </RevealOnScroll>

        {/* 10. Eco Sanctuary & Rainforest Harmony */}
        <RevealOnScroll>
          <EcoSanctuary />
        </RevealOnScroll>

        {/* 11. Location, Driving Routes & Real Plus Code Map */}
        <RevealOnScroll>
          <LocationSection />
        </RevealOnScroll>

        {/* 12. Frequently Asked Questions */}
        <RevealOnScroll>
          <FaqSection />
        </RevealOnScroll>

        {/* 13. Direct Booking Section */}
        <RevealOnScroll>
          <BookingSection />
        </RevealOnScroll>
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Pop-up Reservation Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Floating Action Contact Buttons with Pulse & Hover */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/94719817000?text=Hello%20Misty%20Heights%20Endawala,%20I%20would%20like%20to%20inquire%20about%20a%20stay."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-float"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
        </a>

        <a
          href="tel:0719817000"
          className="w-13 h-13 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Call Us Directly"
        >
          <Phone className="w-5 h-5 text-amber-600" />
        </a>
      </div>
    </div>
  );
}
