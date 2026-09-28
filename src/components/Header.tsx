"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, Calendar, MessageSquare, ChevronRight } from "lucide-react";

export default function Header({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Streamlined 6 core links for clean, spacious desktop navigation
  const navLinks = [
    { name: "The Cabana", href: "#cabana" },
    { name: "River Pool", href: "#pool" },
    { name: "Experiences", href: "#experiences" },
    { name: "Dining", href: "#dining" },
    { name: "Gallery", href: "/gallery" },
    { name: "Location", href: "#location" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-1 ring-emerald-200 group-hover:ring-emerald-500 transition-all bg-emerald-50 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Misty Heights Endawala Logo"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-serif font-bold text-[#0f2416] tracking-tight leading-tight group-hover:text-emerald-800 transition-colors">
                MISTY HEIGHTS
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-emerald-700 uppercase leading-none mt-0.5">
                Endawala · Sinharaja
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible on xl screens to avoid cramped text) */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/94719817000?text=Hello%20Misty%20Heights%20Endawala,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-md shadow-amber-900/15 hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <a
              href="https://wa.me/94719817000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-800" /> : <Menu className="w-5 h-5 text-gray-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Full-Screen/Drop Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-5 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
          {/* Vertical Link List */}
          <div className="divide-y divide-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-gray-800 hover:text-emerald-700 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>

          {/* Action CTAs in Mobile Menu */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-center text-sm font-bold rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Book Your Stay
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:0719817000"
                className="py-3 text-center text-xs font-bold rounded-xl bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                Call Us
              </a>
              <a
                href="https://wa.me/94719817000?text=Hello%20Misty%20Heights%20Endawala!"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-center text-xs font-bold rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
