"use client";

import { Star, Quote, Sparkles, MapPin } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Dinuka & Rashmi",
      origin: "Colombo, Sri Lanka",
      date: "Recent Stay",
      text: "Waking up above the clouds with mist floating right past the wooden balcony was pure magic. The fresh river bath at Edawala Dola was the highlight of our trip — crystal clear, refreshing, and peaceful.",
      highlight: "Pure mist & natural river pool",
    },
    {
      name: "Chaminda Silva",
      origin: "Galle, Sri Lanka",
      date: "Family Weekend",
      text: "The hosts treated our family like their own. Delicious hot hoppers and coconut sambol for breakfast, and an unforgettable evening bonfire under a sky filled with stars. Zero city noise, just birds and breeze.",
      highlight: "Unmatched village hospitality",
    },
    {
      name: "Elena & Marcus",
      origin: "Nature Travelers",
      date: "Holiday Getaway",
      text: "We booked Misty Heights for its closeness to Sinharaja. The wooden cabana is cozy, clean, and breezy. We kayaked on the quiet river and spotted beautiful endemic birds right from the patio.",
      highlight: "Sinharaja birdwatching & kayak",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Traveler Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2416] tracking-tight">
            Memories Shared by Our Guests
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Real experiences from travelers who found quiet moments and warm hospitality at Misty
            Heights.
          </p>
        </div>

        {/* 3 Modern Luxury Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="mb-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 inline-block">
                    {rev.highlight}
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#0f2416]">{rev.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-700" />
                    <span>{rev.origin}</span>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
