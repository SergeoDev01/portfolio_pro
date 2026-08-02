import blurData from "./blur-data.json";

export type ProjectImage = {
  src: string;
  blur: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  images: ProjectImage[];
  video?: string;
  tags?: string[];
};

// Fusionner les blurDataURL dans les projets
export const projects: Project[] = [
  {
    slug: "bingoobank-web",
    title: "BingooBank Web",
    category: "Projet web",
    tags: ["Projet web"],
    featured: true,
    images: [{ src: "/projet_web/bingoobank_landing_page.png", blur: "" }],
  },
  {
    slug: "fontdrop",
    title: "Fontdrop",
    category: "Application web",
    tags: ["Projet web", "Application web"],
    featured: true,
    images: [{ src: "/projet_web/fontdrop_saas_landing_page.png", blur: "" }],
  },
  {
    slug: "startuperio",
    title: "Startuperio",
    category: "Projet web",
    tags: ["Projet web"],
    featured: true,
    images: [{ src: "/projet_web/startuperio_landing_page.png", blur: "" }],
  },
  {
    slug: "formation-trading",
    title: "Page de vente Trading",
    category: "Projet web",
    tags: ["Projet web"],
    featured: true,
    images: [{ src: "/projet_web/page_de_vente_trading.png", blur: "" }],
  },
  { 
    slug: "bingoobank", 
    title: "BingooBank", 
    category: "Branding", 
    featured: true,
    images: (blurData as any)["bingoobank"] ?? [],
  },
  {
    slug: "aeron-logo",
    title: "Aéron Logo",
    category: "Branding",
    featured: true,
    images: (blurData as any)["aeron-logo"] ?? [],
  },
  {
    slug: "qda",
    title: "QDA",
    category: "UI/UX Design",
    featured: true,
    images: (blurData as any)["qda"] ?? [],
  },
  {
    slug: "skin-care-shooting",
    title: "Skin Care Shooting",
    category: "Direction artistique",
    featured: true,
    images: (blurData as any)["skin-care-shooting"] ?? [],
  },
  {
    slug: "parle-g-shooting",
    title: "Parle G",
    category: "Production IA",
    featured: true,
    images: (blurData as any)["parle-g-shooting"] ?? [],
  },
  {
    slug: "logo-bingoo-bank",
    title: "Logo Bingoo Bank",
    category: "Branding",
    featured: true,
    images: (blurData as any)["logo-bingoo-bank"] ?? [],
  },
  {
    slug: "ai-shooting-pro",
    title: "AI Shooting Pro",
    category: "Production IA",
    featured: true,
    images: (blurData as any)["ai-shooting-pro"] ?? [],
  },
  {
    slug: "pub-for-sure",
    title: "For Sure — Pub",
    category: "Production IA",
    featured: true,
    video: "/video_pub/for-sure-pub.mp4",
    images: (blurData as any)["pub-for-sure"] ?? []
  },
  {
    slug: "pub-mango-juice",
    title: "Mango Juice — Pub",
    category: "Production IA",
    featured: true,
    video: "/video_pub/mango-juice-pub.mp4",
    images: (blurData as any)["pub-mango-juice"] ?? []
  },
  {
    slug: "pub-ugc",
    title: "UGC — Pub",
    category: "Production IA",
    featured: true,
    video: "/video_pub/ugc-pub.mp4",
    images: (blurData as any)["pub-ugc"] ?? []
  },
];
