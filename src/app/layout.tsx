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
  title: "Sergeo Limta — Web Engineer & Prompt Engineer",
  description: "Portfolio de Sergeo Limta, Web engineer et prompt engineer basé à Lomé, spécialisé dans la création de sites web, portfolios, applications web & desktop, et production de contenu assistée par IA.",
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
