"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Heart } from "lucide-react";

export default function Footer({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <footer className="bg-gradient-to-b from-emerald-950 via-[#071a0e] to-[#041209] border-t border-white/10 text-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-xs ring-1 ring-emerald-400/30 bg-emerald-900/60">
                <Image
                  src="/images/logo.png"
                  alt="Misty Heights Endawala Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-white tracking-tight block">
                  MISTY HEIGHTS
                </span>
                <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase block">
                  Endawala · Dellawa · Sinharaja Forest
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-sm">
              Escape to Misty Heights Endawala 🌿✨ Handcrafted wooden villa &amp; cabana retreat in Dellawa
              bordering Sinharaja Forest. Enjoy breathtaking mountain views, Dellawa River swimming
              (Gin Ganga basin), and peaceful nature holidays! 🏞️
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61571649441031"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-semibold border border-white/15 transition-colors"
              >
                Facebook Page
              </a>
              <span className="text-xs text-white/30">·</span>
              <span className="text-xs font-semibold text-emerald-400">Always Open</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-emerald-100/70">
              <li>
                <a href="#overview" className="hover:text-white transition-colors">
                  Overview &amp; Experiences
                </a>
              </li>
              <li>
                <a href="#cabana" className="hover:text-white transition-colors">
                  The Wooden Cabana
                </a>
              </li>
              <li>
                <a href="#pool" className="hover:text-white transition-colors">
                  Edawala Dola River Pool
                </a>
              </li>
              <li>
                <a href="#dining" className="hover:text-white transition-colors">
                  Village Dining &amp; BBQ
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Directions &amp; Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Contact &amp; Location
            </h4>

            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Warukandeniya, Endawala, Dellawa, Neluwa, Galle District, Sri Lanka</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex gap-2">
                  <a href="tel:0719817000" className="hover:text-white font-semibold">
                    071 981 7000
                  </a>
                  <span>/</span>
                  <a href="tel:0718680633" className="hover:text-white font-semibold">
                    071 868 0633
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:mistyheightsendawala@gmail.com" className="hover:text-white">
                  mistyheightsendawala@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-emerald-300">Always Open · Every Day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Misty Heights Endawala. All rights reserved.</div>
          <div className="flex items-center gap-1 text-emerald-300/80">
            <span>Made for Sri Lankan Tourism &amp; Sinharaja Nature Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
