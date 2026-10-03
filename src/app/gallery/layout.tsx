import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Dellawa River & Sinharaja Forest Cabana",
  description:
    "Explore photo gallery of Misty Heights Endawala. View our handcrafted wooden cabana, private mountain balcony, Dellawa river pool (Edawala Dola), kayaking, and Sinharaja rainforest views.",
  alternates: {
    canonical: "https://mistyheightsendawala.lk/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Misty Heights Endawala Cabana & Dellawa River",
    description:
      "Explore photo gallery of Misty Heights Endawala. Handcrafted wooden cabana, natural river pool, kayaking, and lush Sinharaja rainforest scenery.",
    url: "https://mistyheightsendawala.lk/gallery",
    siteName: "Misty Heights Endawala",
    images: [
      {
        url: "https://mistyheightsendawala.lk/images/cabana-view.jpg",
        width: 1200,
        height: 630,
        alt: "Misty Heights Endawala Cabana Photo Gallery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | Misty Heights Endawala",
    description:
      "Explore photo gallery of Misty Heights Endawala: wooden cabana, Dellawa river pool, and Sinharaja Rainforest.",
    images: ["https://mistyheightsendawala.lk/images/cabana-view.jpg"],
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mistyheightsendawala.lk"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Photo Gallery",
          "item": "https://mistyheightsendawala.lk/gallery"
        }
      ]
    },
    {
      "@type": "ImageGallery",
      "@id": "https://mistyheightsendawala.lk/gallery#gallery",
      "name": "Misty Heights Endawala Photo Gallery",
      "description": "Photos of handcrafted wooden cabana, Dellawa river natural swimming pool, Sinharaja rainforest views, kayaking and authentic village food.",
      "url": "https://mistyheightsendawala.lk/gallery"
    }
  ]
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      {children}
    </>
  );
}
