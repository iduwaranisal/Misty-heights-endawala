"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
    <div className="min-h-screen flex flex-col bg-white text-[#0f2416] selection:bg-emerald-700 selection:text-white">
      {/* Navigation Header */}
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 2. 4 Core Pillars: Hikes, Kayaking, Bonfire, Nature Stay */}
        <CorePillars onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 3. The Cabana Living Experience */}
        <CabanaShowcase onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 4. Edawala Dola Natural River Pool */}
        <NaturalPool />

        {/* 5. Activities to Enjoy with Friends & Family */}
        <Experiences onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 6. Authentic Sri Lankan Village Dining */}
        <VillageDining onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 7. Real Photo Gallery (Strictly 8 photos with View All button to /gallery) */}
        <PhotoGallery />

        {/* 8. Traveler Stories & Guest Reviews */}
        <TestimonialsSection />

        {/* 9. Eco Sanctuary & Rainforest Harmony */}
        <EcoSanctuary />

        {/* 10. Location, Driving Routes & Map */}
        <LocationSection />

        {/* 11. Frequently Asked Questions */}
        <FaqSection />

        {/* 12. Ultra-Modern Direct Booking Section */}
        <BookingSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Modern Pop-up Reservation Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Floating Fast Action Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/94719817000?text=Hello%20Misty%20Heights%20Endawala,%20I%20would%20like%20to%20inquire%20about%20a%20stay."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
        </a>

        <a
          href="tel:0719817000"
          className="w-13 h-13 rounded-full bg-white hover:bg-gray-50 text-emerald-800 border border-emerald-200 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Call Host Directly"
        >
          <Phone className="w-5 h-5 text-emerald-700" />
        </a>
      </div>
    </div>
  );
}
