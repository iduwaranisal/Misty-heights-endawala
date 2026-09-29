"use client";

import { Star, Sparkles, MapPin, Quote } from "lucide-react";

const reviews = [
  {
    name: "Dinuka & Rashmi",
    origin: "Colombo, Sri Lanka",
    date: "Recent Stay",
    text: "Waking up above the clouds with mist floating right past the wooden balcony was pure magic. The fresh river bath at Edawala Dola was the highlight of our trip — crystal clear, refreshing, and peaceful.",
    highlight: "Pure mist & natural river pool",
    accent: "from-emerald-500 to-teal-500",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    name: "Chaminda Silva",
    origin: "Galle, Sri Lanka",
    date: "Family Weekend",
    text: "The family treated us like their own. Delicious hot hoppers and coconut sambol for breakfast, and an unforgettable evening bonfire under a sky filled with stars. Zero city noise, just birds and breeze.",
    highlight: "Unmatched village hospitality",
    accent: "from-teal-500 to-emerald-500",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
  {
    name: "Elena & Marcus",
    origin: "Nature Travelers",
    date: "Holiday Getaway",
    text: "We booked Misty Heights for its closeness to Sinharaja. The wooden cabana is cozy, clean, and breezy. We kayaked on the quiet river and spotted beautiful endemic birds right from the patio.",
    highlight: "Sinharaja birdwatching & kayak",
    accent: "from-cyan-500 to-teal-500",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
  },
];

import { useSettings } from "@/components/SettingsProvider";

export default function TestimonialsSection() {
  const { getSetting } = useSettings();
  const badge = getSetting("site.reviews.badge", "Traveler Stories");
  const title = getSetting("site.reviews.title", "Memories Shared by Our Guests");
  const subtitle = getSetting("site.reviews.subtitle", "Real experiences from travelers who found quiet moments and warm hospitality at Misty Heights.");
  const customReviews = getSetting<Array<{ name: string; origin: string; date: string; text: string; highlight: string }>>("site.reviews.items", []);

  const displayReviews = (customReviews && customReviews.length > 0)
    ? customReviews.map((r, i) => ({
        ...r,
        accent: reviews[i % reviews.length]?.accent || "from-emerald-500 to-teal-500",
        badgeColor: reviews[i % reviews.length]?.badgeColor || "bg-emerald-50 text-emerald-800 border-emerald-200",
      }))
    : reviews;

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-950 via-[#0a2a18] to-emerald-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            {badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-200/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayReviews.map((rev, idx) => (
            <div
              key={idx}
              className="relative bg-white/8 backdrop-blur-md rounded-3xl p-7 border border-white/15 hover:border-white/30 hover:bg-white/12 transition-all duration-300 flex flex-col justify-between card-lift"
            >
              {/* Gradient top strip */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rev.accent} rounded-t-3xl`} />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border inline-block ${rev.badgeColor}`}>
                    {rev.highlight}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-white/20 mb-2" />
                <p className="text-sm text-white/80 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">{rev.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-emerald-300/70 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{rev.origin}</span>
                  </div>
                </div>
                <span className="text-[11px] text-white/40">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
