export type LandingProject = {
  slug: string;
  title: string;
  category: string;
  image: string;
  ratio: number;
  url: string;
  tags: string[];
};

export const landingProjects: LandingProject[] = [
  {
    slug: "bingoobank",
    title: "BingooBank",
    category: "Fintech",
    image: "/projet_web/bingoobank_landing_page.png",
    ratio: 10533 / 1600,
    url: "https://bingoobank.vercel.app/",
    tags: ["Projet web"],
  },
  {
    slug: "fontdrop",
    title: "Fontdrop",
    category: "SaaS",
    image: "/projet_web/fontdrop_saas_landing_page.png",
    ratio: 8142 / 1600,
    url: "https://fontdrop.vercel.app/",
    tags: ["Projet web", "Application web"],
  },
  {
    slug: "startuperio",
    title: "Startuperio",
    category: "SaaS",
    image: "/projet_web/startuperio_landing_page.png",
    ratio: 10746 / 1600,
    url: "https://startuper-io.vercel.app/",
    tags: ["Projet web"],
  },
  {
    slug: "trading",
    title: "Page de vente Trading",
    category: "Landing Page",
    image: "/projet_web/page_de_vente_trading.png",
    ratio: 6009 / 1600,
    url: "https://sergeo02.github.io/formation_trading/",
    tags: ["Projet web"],
  },
];

export const LANDING_FEATURED_SLUGS = ["bingoobank", "fontdrop", "startuperio"];

export const featuredLandingProjects = LANDING_FEATURED_SLUGS
  .map((slug) => landingProjects.find((p) => p.slug === slug))
  .filter((p): p is LandingProject => Boolean(p));
