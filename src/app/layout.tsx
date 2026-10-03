import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { getSettings, getSettingByKey } from "@/actions/settings";
import { SettingsProvider } from "@/components/SettingsProvider";
import "./globals.css";

export const dynamic = "force-dynamic";

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

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const seoTitle = await getSettingByKey(
    "site.seo.title",
    "Misty Heights Endawala | Dellawa River, Sinharaja Forest Villa & Cabana Retreat"
  );
  const seoDesc = await getSettingByKey(
    "site.seo.description",
    "Escape to Misty Heights Endawala near Sinharaja Rainforest & Dellawa River (Gin Ganga). Handcrafted wooden villa cabana, natural river pool, kayaking, and misty mountain views in Neluwa, Galle, Sri Lanka."
  );
  const seoKeywordsRaw = await getSettingByKey(
    "site.seo.keywords",
    "misty heights endawala, misty heights, dellawa, dellawa river, dellawa ganga, dellawa sinharaja, sinharaja forest cabana, sinharaja villa, sinharaja forest resort, endawala, endawala cabana, endawala dellawa, neluwa hotel, neluwa cabana, warukandeniya, warukandeniya endawala, galle eco villa, dellawa river swimming, dellawa ganga bath, gin ganga bathing spots, edawala dola, edawala dola natural pool, river kayaking sinharaja, wooden villa sri lanka, nature retreat sri lanka, rainforest cabana galle, misty heights sinharaja"
  );
  const canonicalUrl = await getSettingByKey(
    "site.seo.canonical",
    "https://mistyheightsendawala.lk"
  );

  const keywords =
    typeof seoKeywordsRaw === "string"
      ? seoKeywordsRaw.split(",").map((k: string) => k.trim()).filter(Boolean)
      : seoKeywordsRaw;

  const siteUrl = canonicalUrl || "https://mistyheightsendawala.lk";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seoTitle,
      template: "%s | Misty Heights Endawala",
    },
    description: seoDesc,
    keywords,
    applicationName: "Misty Heights Endawala",
    authors: [{ name: "Misty Heights Endawala", url: siteUrl }],
    creator: "Misty Heights Endawala",
    publisher: "Misty Heights Endawala",
    category: "Travel & Tourism",
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        "en-US": siteUrl,
        "en-LK": siteUrl,
        "si-LK": siteUrl,
      },
    },
    icons: {
      icon: [
        { url: "/images/logo.png" },
        { url: "/icon.png", type: "image/png" },
      ],
      shortcut: "/images/logo.png",
      apple: "/images/logo.png",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google1ea1d023a4981f4d",
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: siteUrl,
      siteName: "Misty Heights Endawala",
      images: [
        {
          url: `${siteUrl}/images/cabana-view.jpg`,
          width: 1200,
          height: 630,
          alt: "Misty Heights Endawala Sinharaja Forest Villa and Cabana Retreat",
        },
        {
          url: `${siteUrl}/images/natural-stream.jpg`,
          width: 1200,
          height: 630,
          alt: "Edawala Dola Natural River Pool in Dellawa, Sinharaja",
        },
      ],
      locale: "en_US",
      alternateLocale: ["en_LK", "si_LK"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [`${siteUrl}/images/cabana-view.jpg`],
    },
    other: {
      "geo.region": "LK-31",
      "geo.placename": "Warukandeniya, Dellawa, Endawala, Neluwa, Galle District, Sri Lanka",
      "geo.position": "6.324313;80.452313",
      ICBM: "6.324313, 80.452313",
      "apple-mobile-web-app-title": "Misty Heights",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://mistyheightsendawala.lk/#website",
      url: "https://mistyheightsendawala.lk",
      name: "Misty Heights Endawala",
      description:
        "Official website of Misty Heights Endawala - Luxury Wooden Cabana, Natural River Pool & Sinharaja Rainforest Retreat in Sri Lanka.",
      inLanguage: ["en-US", "si-LK"],
      publisher: {
        "@id": "https://mistyheightsendawala.lk/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://mistyheightsendawala.lk/#organization",
      name: "Misty Heights Endawala",
      url: "https://mistyheightsendawala.lk",
      logo: {
        "@type": "ImageObject",
        url: "https://mistyheightsendawala.lk/images/logo.png",
        width: "512",
        height: "512",
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61571649441031",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+94719817000",
          contactType: "customer service",
          areaServed: "LK",
          availableLanguage: ["English", "Sinhala"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+94718680633",
          contactType: "reservations",
          areaServed: "LK",
          availableLanguage: ["English", "Sinhala"],
        },
      ],
    },
    {
      "@type": ["LodgingBusiness", "Resort", "Hotel", "BedAndBreakfast"],
      "@id": "https://mistyheightsendawala.lk/#lodging",
      name: "Misty Heights Endawala",
      alternateName: [
        "Misty Heights Dellawa",
        "Misty Heights Endawala Sinharaja",
        "Misty Heights Sinharaja Villa",
        "Misty Heights Cabana",
        "Misty Heights Neluwa",
      ],
      description:
        "Handcrafted wooden villa and eco cabana retreat in Warukandeniya, Endawala near Dellawa, bordering the UNESCO Sinharaja Rainforest. Features fresh river bathing in Dellawa river / Edawala Dola (Gin Ganga basin), kayaking, panoramic mountain observation deck, campfires, and authentic Sri Lankan village dining.",
      url: "https://mistyheightsendawala.lk",
      telephone: "+94719817000",
      email: "mistyheightsendawala@gmail.com",
      image: [
        "https://mistyheightsendawala.lk/images/cabana-view.jpg",
        "https://mistyheightsendawala.lk/images/natural-stream.jpg",
        "https://mistyheightsendawala.lk/images/kayak.jpg",
        "https://mistyheightsendawala.lk/images/bedroom.jpg",
      ],
      logo: "https://mistyheightsendawala.lk/images/logo.png",
      priceRange: "$$",
      currenciesAccepted: "LKR, USD",
      paymentAccepted: "Cash, Bank Transfer",
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
        {
          "@type": "LocationFeatureSpecification",
          name: "Guided Sinharaja Forest Nature Walks & Bird Watching",
          value: true,
        },
      ],
      checkinTime: "14:00",
      checkoutTime: "11:00",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://mistyheightsendawala.lk/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://mistyheightsendawala.lk",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gallery",
          item: "https://mistyheightsendawala.lk/gallery",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://mistyheightsendawala.lk/#faq",
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
        {
          "@type": "Question",
          name: "Is village food and BBQ available at Misty Heights?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We serve authentic Sri Lankan village rice and curry made with organic local ingredients, fresh river fish, herbal teas, and outdoor evening BBQ and bonfire setups.",
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
