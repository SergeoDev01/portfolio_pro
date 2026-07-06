import type { Metadata } from "next";
import { Geist } from "next/font/google"; // Using a placeholder for Satoshi if not available in google fonts, we'll use Geist instead
import localFont from "next/font/local";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const company = localFont({
  src: "../../public/fonts/company.otf",
  variable: "--font-company",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sergeo Limta — Graphiste & Brand Designer",
  description: "Portfolio de Sergeo Limta, Designer graphique et développeur créatif basé à Lomé, spécialisé en branding, UI/UX et production assistée par IA.",
  keywords: [
    "Sergeo Limta",
    "graphiste",
    "brand designer",
    "designer graphique",
    "portfolio",
    "UI UX",
    "branding",
    "identité visuelle",
    "Lomé",
    "Togo",
  ],
  authors: [{ name: "Sergeo Limta" }],
  creator: "Sergeo Limta",
  publisher: "Sergeo Limta",
  category: "design",
  openGraph: {
    title: "Sergeo Limta — Graphiste & Brand Designer",
    description: "Portfolio de Sergeo Limta, Designer graphique et développeur créatif basé à Lomé, spécialisé en branding, UI/UX et production assistée par IA.",
    type: "website",
    locale: "fr_FR",
    siteName: "Sergeo Limta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergeo Limta — Graphiste & Brand Designer",
    description: "Portfolio de Sergeo Limta, Designer graphique et développeur créatif basé à Lomé, spécialisé en branding, UI/UX et production assistée par IA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} ${company.variable}`}>
      <body className="antialiased min-h-[100dvh]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
