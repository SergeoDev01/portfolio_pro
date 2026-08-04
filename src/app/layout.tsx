import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import { NavigationProgress } from "@/components/NavigationProgress";
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

export const metadata: Metadata = {
  title: "Sergeo Limta — Web Engineer & Prompt Engineer",
  description: "Portfolio de Sergeo Limta, Web engineer et prompt engineer spécialisé dans la création de sites web, portfolios, applications web & desktop, et production de contenu assistée par IA.",
  metadataBase: new URL("https://sergeo-limta-portfolio.vercel.app"),
  openGraph: {
    title: "Sergeo Limta — Web Engineer & Prompt Engineer",
    description: "Portfolio de Sergeo Limta, Web engineer et prompt engineer spécialisé dans la création de sites web, portfolios, applications web & desktop, et production de contenu assistée par IA.",
    url: "https://sergeo-limta-portfolio.vercel.app",
    siteName: "Sergeo Limta Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sergeo Limta — Web Engineer & Prompt Engineer",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergeo Limta — Web Engineer & Prompt Engineer",
    description: "Portfolio de Sergeo Limta, Web engineer et prompt engineer spécialisé dans la création de sites web, portfolios, applications web & desktop, et production de contenu assistée par IA.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${company.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-[100dvh]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
