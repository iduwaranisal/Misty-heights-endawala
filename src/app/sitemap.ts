import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mistyheightsendawala.lk";
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${baseUrl}/images/cabana-view.jpg`,
        `${baseUrl}/images/natural-stream.jpg`,
        `${baseUrl}/images/kayak.jpg`,
        `${baseUrl}/images/bedroom.jpg`,
      ],
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [
        `${baseUrl}/images/cabana-view.jpg`,
        `${baseUrl}/images/natural-stream.jpg`,
        `${baseUrl}/images/kayak.jpg`,
        `${baseUrl}/images/cabana-balcony.jpg`,
        `${baseUrl}/images/bedroom.jpg`,
        `${baseUrl}/images/bedroom-2.jpg`,
      ],
    },
  ];
}
