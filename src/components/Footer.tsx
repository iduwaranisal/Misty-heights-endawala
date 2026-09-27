"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Heart } from "lucide-react";

export default function Footer({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <footer className="bg-gradient-to-b from-white to-emerald-50/50 border-t border-emerald-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-xs ring-1 ring-emerald-200 bg-emerald-50">
                <Image
                  src="/images/logo.png"
                  alt="Misty Heights Endawala Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-[#0f2416] tracking-tight block">
                  MISTY HEIGHTS
                </span>
                <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase block">
                  Endawala · Sinharaja
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              Escape to Misty Heights Cabana 🌿✨ Relax in our cozy wooden retreat near Sinharaja
              Rainforest. Enjoy breathtaking views, a natural pool, and serene mountain vibes.
              Perfect for holidays filled with nature and adventure! 🏞️
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61571649441031"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
              >
                Facebook Page
              </a>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs font-semibold text-emerald-700">Always Open</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li>
                <a href="#overview" className="hover:text-emerald-700 transition-colors">
                  Overview & Experiences
                </a>
              </li>
              <li>
                <a href="#cabana" className="hover:text-emerald-700 transition-colors">
                  The Wooden Cabana
                </a>
              </li>
              <li>
                <a href="#pool" className="hover:text-emerald-700 transition-colors">
                  Edawala Dola River Pool
                </a>
              </li>
              <li>
                <a href="#dining" className="hover:text-emerald-700 transition-colors">
                  Village Dining & BBQ
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-emerald-700 transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-emerald-700 transition-colors">
                  Directions & Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Contact & Location
            </h4>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Endawala, Dellawa, Neluwa, Galle District, Sri Lanka</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <div className="flex gap-2">
                  <a href="tel:0719817000" className="hover:text-emerald-800 font-semibold">
                    071 981 7000
                  </a>
                  <span>/</span>
                  <a href="tel:0718680633" className="hover:text-emerald-800 font-semibold">
                    071 868 0633
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <a href="mailto:mistyheightsendawala@gmail.com" className="hover:text-emerald-800">
                  mistyheightsendawala@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-semibold text-emerald-800">Always Open · Every Day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Misty Heights Endawala. All rights reserved.</div>
          <div className="flex items-center gap-1 text-emerald-800">
            <span>Made for Sri Lankan Tourism & Sinharaja Nature Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
