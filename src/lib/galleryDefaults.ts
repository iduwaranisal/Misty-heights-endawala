export interface GalleryItem {
  id?: string;
  src: string;
  title: string;
  category: "cabana" | "water" | "nature";
  desc: string;
  featuredOnHome?: boolean;
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "cabana", label: "Cabana Villa & Living" },
  { id: "water", label: "River Pool & Water" },
  { id: "nature", label: "Sinharaja Mist & Nature" },
] as const;

export const DEFAULT_GALLERY_IMAGES: GalleryItem[] = [
  {
    src: "/images/cabana-view.jpg",
    title: "Misty Heights Cabana Valley Overlook",
    category: "cabana",
    desc: "Two-story handcrafted wooden cabana resting quietly above the Sinharaja rainforest canopy.",
    featuredOnHome: true,
  },
  {
    src: "/images/natural-stream.jpg",
    title: "Edawala Dola Pristine River Pool",
    category: "water",
    desc: "Crystal-clear mountain stream water flowing naturally over smooth boulders and river stone beds.",
    featuredOnHome: true,
  },
  {
    src: "/images/bedroom.jpg",
    title: "Handcrafted Timber King Bedroom",
    category: "cabana",
    desc: "Solid wood bed dressed in clean linens with wooden shutter windows for natural mountain ventilation.",
    featuredOnHome: true,
  },
  {
    src: "/images/472523961_122093405000721648_5058236332923167105_n.jpg",
    title: "Cozy Cabana Guest Room",
    category: "cabana",
    desc: "Warm wooden interiors, solid timber craftsmanship, and serene forest views from every window.",
    featuredOnHome: false,
  },
  {
    src: "/images/kayak.jpg",
    title: "River Kayaking & Boating",
    category: "water",
    desc: "Peaceful river paddling along tranquil freshwater bends framed by virgin rainforest trees.",
    featuredOnHome: true,
  },
  {
    src: "/images/cabana-balcony.jpg",
    title: "Upper Observation Deck",
    category: "cabana",
    desc: "Open-air timber viewing loft offering 360-degree vistas of morning cloud carpets and starlit skies.",
    featuredOnHome: true,
  },
  {
    src: "/images/mountain-panoramic.jpg",
    title: "Sinharaja Rainforest Ridge Panorama",
    category: "nature",
    desc: "Untouched mountain slopes and lush green tropical canopy as viewed directly from our hillside.",
    featuredOnHome: true,
  },
  {
    src: "/images/cabana-front.jpg",
    title: "Clay Tile Facade & Veranda",
    category: "cabana",
    desc: "Traditional Sri Lankan red clay roof tiles, rustic wooden pillars, and stone-paved dining patio.",
    featuredOnHome: false,
  },
  {
    src: "/images/misty-hills.jpg",
    title: "Morning Mist Rising Over Sinharaja",
    category: "nature",
    desc: "The gentle white clouds that drift through the forest valleys each dawn, giving Misty Heights its name.",
    featuredOnHome: true,
  },
  {
    src: "/images/aerial-river.jpg",
    title: "Aerial Perspective of Edawala River",
    category: "water",
    desc: "Drone view showcasing the clean river bend, surrounding jungle trees, and river footbridge.",
    featuredOnHome: true,
  },
  {
    src: "/images/twilight-forest.jpg",
    title: "Twilight Over the Rainforest Hills",
    category: "nature",
    desc: "Peaceful evening colors settling over the mountain ranges as the nighttime campfire begins.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-31.jpg",
    title: "Cabana Hilltop Aerial View",
    category: "cabana",
    desc: "Bird's eye view of the cabana perched on a peaceful hilltop surrounded by lush tropical greenery.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-41.jpg",
    title: "Cabana Nestled in the Mountains",
    category: "cabana",
    desc: "The wooden retreat sitting quietly among tall trees and rolling green mountain hills.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-37.jpg",
    title: "Drone View – Cabana & Rainforest River",
    category: "nature",
    desc: "Aerial shot showing the cabana, winding jungle path, and the Edawala river bend below.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-29.jpg",
    title: "Calm River Bend Under Blue Sky",
    category: "water",
    desc: "A wide, calm stretch of the natural river pool reflecting tall rainforest trees and blue sky.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-28.jpg",
    title: "River Rushing Over Smooth Rocks",
    category: "water",
    desc: "Fresh mountain water rushing over flat rocks and boulders at the edge of our natural swimming area.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-31 (2).jpg",
    title: "Peaceful Natural Swimming Pool",
    category: "water",
    desc: "The wide, still section of the river perfect for a refreshing dip or quiet float.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-36.jpg",
    title: "Crystal Clear River Rock Pools",
    category: "water",
    desc: "Sun-lit rock pools with golden-clear water – perfect for wading and relaxing by the stream.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-40.jpg",
    title: "Family Kayaking on the River",
    category: "water",
    desc: "A mum and daughter paddling a yellow kayak through the calm jungle river with life jackets on.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-42.jpg",
    title: "Kids Kayaking with the Family",
    category: "water",
    desc: "A guide paddles a group of little ones down the clear river surrounded by rainforest trees.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-41 (2).jpg",
    title: "Rubber Boat Fun on the River",
    category: "water",
    desc: "Guests enjoying a fun river ride on an inflatable boat with yellow paddles.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-33.jpg",
    title: "Group River Swimming & Boating",
    category: "water",
    desc: "A fun group of friends swimming and rafting together on the calm river surrounded by greenery.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-38.jpg",
    title: "River Fun with Friends",
    category: "water",
    desc: "Guests laughing and swimming together in the wide river pool next to a leafy forest bank.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-34.jpg",
    title: "Breakfast on the Balcony",
    category: "cabana",
    desc: "A beautifully set table with fresh juice, fruits and local treats enjoyed with a misty mountain view.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-35.jpg",
    title: "Guests Dining with a Forest View",
    category: "cabana",
    desc: "A family sharing a warm meal on the open veranda with the green hills stretching behind them.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-30.jpg",
    title: "Spiced Crab with Mountain Views",
    category: "nature",
    desc: "A plate of freshly cooked Sri Lankan spiced crab, served with the green hills as a backdrop.",
    featuredOnHome: false,
  },
  {
    src: "/images/photo_2026-09-28_18-10-26.jpg",
    title: "Guests Exploring the Rainforest Trail",
    category: "nature",
    desc: "Two smiling travelers on a guided walk through the lush Sinharaja forest canopy trail.",
    featuredOnHome: false,
  },
];
