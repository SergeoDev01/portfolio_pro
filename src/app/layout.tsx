import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
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
  description: "Portfolio de Sergeo Limta, Web engineer et prompt engineer basé à Lomé, spécialisé dans la création de sites web, portfolios, applications web & desktop, et production de contenu assistée par IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${company.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased min-h-[100dvh]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
