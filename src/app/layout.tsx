import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://mistyheightsendawala.com"),
  title: "Misty Heights Endawala | Sinharaja Rainforest Retreat & Cabana",
  description:
    "Escape to Misty Heights Cabana nestled by Sinharaja Rainforest, Sri Lanka. Handcrafted wooden retreat, natural pool at Edawala Dola, mountain hikes, kayaking, and bonfire nights under the stars.",
  keywords: [
    "Misty Heights Endawala",
    "Sinharaja Rainforest Cabana",
    "Dellawa Neluwa Hotel",
    "Galle Sri Lanka Nature Resort",
    "Edawala Dola Natural Pool",
    "Sri Lanka Eco Resort",
    "Wooden Cabana Sri Lanka",
    "Sinharaja Bird Watching",
  ],
  authors: [{ name: "Misty Heights Endawala Sinharaja" }],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Misty Heights Endawala — Sinharaja Rainforest Escape",
    description:
      "Breathe pure mountain air, swim in crystal-clear natural streams, and relax in cozy wooden cabanas overlooking the misty hills of Sinharaja.",
    url: "https://mistyheightsendawala.com",
    siteName: "Misty Heights Endawala",
    images: [
      {
        url: "/images/cabana-view.jpg",
        width: 1200,
        height: 630,
        alt: "Misty Heights Endawala Sinharaja Rainforest Escape",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased selection:bg-[#266b41] selection:text-white">
        {children}
      </body>
    </html>
  );
}
