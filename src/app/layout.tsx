import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { getSettings, getSettingByKey } from "@/actions/settings";
import { SettingsProvider } from "@/components/SettingsProvider";
import "./globals.css";

export const dynamic = 'force-dynamic';

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seoTitle = await getSettingByKey(
    "site.seo.title",
    "Misty Heights Endawala | Dellawa River, Sinharaja Forest Villa & Cabana Retreat"
  );
  const seoDesc = await getSettingByKey(
    "site.seo.description",
    "Escape to Misty Heights Endawala near Sinharaja Forest & Dellawa River (Gin Ganga tributary). Handcrafted wooden villa cabana, natural river pool, kayaking, and misty mountain views in Neluwa, Galle, Sri Lanka."
  );
  const seoKeywordsRaw = await getSettingByKey(
    "site.seo.keywords",
    "endawala, dellawa, dellawa river, gin ganga, dellawa endawala, dellawa ganga, dellawa sinharaja, sinharaja forest, sinharaja villa, dellawa villa, misty heights, misty heights endawala sinharaja, misty heights endawala, endawala cabana, endawala nature retreat, dellawa river swimming, dellawa ganga bath, gin ganga bathing spots, edawala dola natural pool, sinharaja forest resort, sinharaja cabana stay, warukandeniya endawala, neluwa hotel, galle eco villa, wooden villa sri lanka, river kayaking sinharaja, sinharaja rainforest bird watching"
  );
  const canonicalUrl = await getSettingByKey(
    "site.seo.canonical",
    "https://www.mistyheightsendawala.lk"
  );
  const keywords = typeof seoKeywordsRaw === "string"
    ? seoKeywordsRaw.split(",").map((k: string) => k.trim()).filter(Boolean)
    : seoKeywordsRaw;

  return {
    metadataBase: new URL(canonicalUrl || "https://www.mistyheightsendawala.lk"),
    title: {
      default: seoTitle,
      template: "%s | Misty Heights Endawala Sinharaja",
    },
    description: seoDesc,
    keywords,
    authors: [{ name: "Misty Heights Endawala" }],
    creator: "Misty Heights Endawala",
    publisher: "Misty Heights Endawala",
    alternates: {
      canonical: canonicalUrl || "https://www.mistyheightsendawala.lk",
    },
    icons: {
      icon: "/images/logo.png",
      shortcut: "/images/logo.png",
      apple: "/images/logo.png",
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: canonicalUrl || "https://www.mistyheightsendawala.lk",
      siteName: "Misty Heights Endawala",
      images: [
        {
          url: "https://www.mistyheightsendawala.lk/images/cabana-view.jpg",
          width: 1200,
          height: 630,
          alt: "Misty Heights Endawala Sinharaja Forest Villa and Cabana Retreat",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: ["https://www.mistyheightsendawala.lk/images/cabana-view.jpg"],
    },
    other: {
      "geo.region": "LK-31",
      "geo.placename": "Warukandeniya, Dellawa, Endawala, Neluwa, Galle District",
      "geo.position": "6.324313;80.452313",
      ICBM: "6.324313, 80.452313",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LodgingBusiness", "Resort", "BedAndBreakfast"],
      "@id": "https://www.mistyheightsendawala.lk/#lodging",
      name: "Misty Heights Endawala",
      alternateName: [
        "Misty Heights Dellawa",
        "Misty Heights Endawala Sinharaja",
        "Misty Heights Sinharaja Villa",
        "Misty Heights Cabana",
      ],
      description:
        "Handcrafted wooden villa and cabana retreat situated in Warukandeniya, Endawala near Dellawa, bordering the UNESCO World Heritage Sinharaja Rainforest. Features fresh river pool bathing in the Dellawa river / Edawala Dola (Gin Ganga basin), kayaking, mountain observation deck, and traditional village meals.",
      url: "https://www.mistyheightsendawala.lk",
      telephone: "+94719817000",
      email: "mistyheightsendawala@gmail.com",
      image: "https://www.mistyheightsendawala.lk/images/cabana-view.jpg",
      logo: "https://www.mistyheightsendawala.lk/images/logo.png",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Warukandeniya, Endawala Road",
        addressLocality: "Neluwa, Dellawa",
        addressRegion: "Galle District, Southern Province",
        postalCode: "80082",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.324313,
        longitude: 80.452313,
      },
      hasMap: "https://www.google.com/maps/search/?api=1&query=8FF2%2BPW+Warukandeniya",
      sameAs: ["https://www.facebook.com/profile.php?id=61571649441031"],
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "Dellawa River & Edawala Dola Natural Pool",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "River Kayaking & Rafting",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Sinharaja Rainforest Mountain Views",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Handcrafted Timber King Bed Cabana",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Traditional Sri Lankan Village Dining & BBQ",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Starlit Campfire Bonfire",
          value: true,
        },
      ],
      checkinTime: "14:00",
      checkoutTime: "11:00",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.mistyheightsendawala.lk/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where is Misty Heights Endawala located relative to Dellawa and Sinharaja Forest?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Misty Heights Endawala is located in Warukandeniya, Neluwa near Dellawa in the Galle District of Sri Lanka. It borders the UNESCO Sinharaja Rainforest and the pristine Dellawa river (Edawala Dola stream, a natural feeder to the Gin Ganga river basin).",
          },
        },
        {
          "@type": "Question",
          name: "Can we swim or kayak in the Dellawa River (Edawala Dola / Gin Ganga)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Edawala Dola is a natural freshwater river stream that flows directly from the Sinharaja mountain ridge through Dellawa into the Gin Ganga river basin. The river has clear, unpolluted rock pools and calm stretches suitable for safe swimming, wading, and kayaking.",
          },
        },
        {
          "@type": "Question",
          name: "What accommodation is available at Misty Heights Sinharaja Villa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a cozy two-story handcrafted wooden cabana villa with king bed, upper 360-degree mountain observation balcony deck, stone patio veranda, and serene rainforest views.",
          },
        },
        {
          "@type": "Question",
          name: "How do we travel to Misty Heights Endawala from Colombo or Galle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "From Colombo, take the Southern Expressway (E01) to Kurundugahahetekma or Baddegama exit, then travel through Neluwa towards Dellawa and Warukandeniya (approx. 2.5 to 3 hours). The road is paved and accessible by all vehicles.",
          },
        },
      ],
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsArray = await getSettings();
  const initialSettings = settingsArray.reduce((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, unknown>);

  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-emerald-700 selection:text-white">
        <SettingsProvider initialSettings={initialSettings}>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}

