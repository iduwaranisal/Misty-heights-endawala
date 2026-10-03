import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Misty Heights Endawala | Sinharaja Forest Villa & Cabana Retreat",
    short_name: "Misty Heights",
    description:
      "Handcrafted wooden villa cabana, natural river pool, kayaking, and misty mountain views in Neluwa, Galle near Sinharaja Rainforest.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#064e3b",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
