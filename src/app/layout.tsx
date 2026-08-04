import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import { NavigationProgress } from "@/components/NavigationProgress";
import Script from "next/script";
import "./globals.css";

const company = localFont({
  src: "../../public/fonts/company.otf",
  variable: "--font-company",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const BASE_URL = "https://sergeo-limta-portfolio.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Sergeo Limta — Web Engineer & Designer Créatif | Le Geek Créatif",
    template: "%s — Sergeo Limta",
  },
  description:
    "Portfolio de Sergeo Limta, développeur web freelance & designer créatif basé à Lomé, Togo. Spécialisé en sites web sur-mesure, UI/UX design, applications web & desktop (Next.js, Tauri), branding, et production de contenu IA.",
  metadataBase: new URL(BASE_URL),
  keywords: [
    "Sergeo Limta",
    "développeur web Lomé",
    "freelance Togo",
    "Le Geek Créatif",
    "web engineer",
    "prompt engineer",
    "UI/UX design",
    "Next.js",
    "Tauri",
    "branding Afrique",
    "production IA",
    "portfolio graphiste",
    "sites web sur-mesure",
    "landing page",
    "application desktop",
  ],
  authors: [{ name: "Sergeo Limta", url: BASE_URL }],
  creator: "Sergeo Limta",
  publisher: "Sergeo Limta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sergeo Limta — Web Engineer & Designer Créatif",
    description:
      "Développeur web freelance & designer créatif basé à Lomé, Togo. Sites web sur-mesure, UI/UX, branding et production IA.",
    url: BASE_URL,
    siteName: "Sergeo Limta — Le Geek Créatif",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sergeo Limta — Web Engineer & Designer Créatif",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergeo Limta — Web Engineer & Designer Créatif",
    description:
      "Développeur web freelance & designer créatif basé à Lomé, Togo. Sites web sur-mesure, UI/UX, branding et production IA.",
    images: ["/og-image.jpg"],
    creator: "@SergeoDev",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "portfolio",
};

// JSON-LD Schema — Person (pour que Google t'associe à ton nom)
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sergeo Limta",
  alternateName: "Le Geek Créatif",
  url: BASE_URL,
  image: `${BASE_URL}/avatar.png`,
  sameAs: [
    "https://github.com/Sergeo02",
    "https://github.com/SergeoDev01",
    // Ajoute tes liens LinkedIn / Instagram / TikTok ici
    // "https://www.linkedin.com/in/ton-profil",
    // "https://www.instagram.com/le_geek_creatif",
  ],
  jobTitle: "Web Engineer & Designer Créatif",
  description:
    "Développeur web freelance & designer créatif basé à Lomé, Togo, spécialisé en sites web sur-mesure, UI/UX design, applications web & desktop, branding et production de contenu IA.",
  knowsAbout: [
    "Développement web",
    "Next.js",
    "React",
    "Tauri",
    "UI/UX Design",
    "Branding",
    "Prompt Engineering",
    "Production IA",
    "Direction artistique",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lomé",
    addressCountry: "TG",
  },
  nationality: {
    "@type": "Country",
    name: "Togo",
  },
};

// JSON-LD Schema — WebSite (pour la barre de recherche Google)
const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sergeo Limta — Le Geek Créatif",
  url: BASE_URL,
  description:
    "Portfolio professionnel de Sergeo Limta, développeur web & designer créatif basé à Lomé, Togo.",
  author: {
    "@type": "Person",
    name: "Sergeo Limta",
  },
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${company.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD — Person */}
        <Script
          id="jsonld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        {/* JSON-LD — WebSite */}
        <Script
          id="jsonld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body
        className="font-sans antialiased min-h-[100dvh]"
        suppressHydrationWarning
      >
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
