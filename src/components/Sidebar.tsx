"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, PaintBucket } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WhatsAppButton } from "@/components/WhatsAppButton";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom Envelope Icon
function CustomEnvelope({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M 2 8 L 12 2.5 L 22 8 L 22 10.5 L 12 14 L 2 10.5 Z" />
      <path d="M 2 13 L 12 16.5 L 22 13 L 22 22 L 2 22 Z" />
    </svg>
  );
}

// Clean standard nav icons on 24×24 viewBox
function HouseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );
}

function BentoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="18" rx="1.5"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5"/>
      <rect x="13" y="14" width="8" height="7" rx="1.5"/>
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7H4z"/>
    </svg>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.05 7.05 0 0 0-1.62-.94l-.36-2.54A.484.484 0 0 0 14 3h-4c-.25 0-.46.18-.49.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.476.476 0 0 0-.59.22L2.63 9.54a.48.48 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.37 1.04.7 1.62.94l.36 2.54c.05.24.26.42.49.42h4c.25 0 .46-.18.49-.42l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
    </svg>
  );
}

export const navItems = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export function getNavIcon(href: string, className?: string) {
  switch (href) {
    case "#accueil":   return <HouseIcon className={className} />;
    case "#projets":   return <BentoIcon className={className} />;
    case "#a-propos":  return <UserIcon className={className} />;
    case "#services":  return <GearIcon className={className} />;
    case "#contact":   return <ChatIcon className={className} />;
    default:           return <HouseIcon className={className} />;
  }
}

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) current = section;
        }
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-[var(--color-dark)] text-white hidden lg:flex flex-col z-50">
      {/* Banner */}
      <div className="w-full h-[120px] bg-[var(--color-primary)] shrink-0" />

      <div className="relative flex flex-col items-center px-6 pb-6">
        {/* Avatar overlapping the banner */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-transparent ring-4 ring-[var(--color-dark)] -mt-16 mb-4 relative bg-gray-200 z-10 shrink-0">
          <Image
            src="/avatar.png"
            alt="Sergeo Limta"
            width={150}
            height={150}
            quality={85}
            priority
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Sergeo Limta
          <CheckCircle2 className="w-5 h-5 text-[var(--color-verified)]" />
        </h1>
        <p className="text-sm text-gray-400 mt-1 text-center">Graphiste & Brand Designer</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-6 overflow-y-auto">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-[var(--radius-card)] transition-colors text-sm font-medium",
              activeSection === item.href.substring(1)
                ? "bg-[var(--color-accent)] text-[var(--color-dark)]"
                : "text-gray-300 hover:bg-white/10"
            )}
          >
            {getNavIcon(item.href, "w-5 h-5 shrink-0")}
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-6 flex flex-col gap-4 shrink-0 mt-auto">
        <div className="flex justify-center gap-4 text-gray-400">
          {/* LinkedIn */}
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          {/* Behance */}
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors"><PaintBucket className="w-5 h-5" /></a>
          {/* Instagram */}
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          {/* YouTube */}
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
        <WhatsAppButton
          label="Me contacter"
          className="px-5 py-2.5 rounded-full bg-[#FFD700] text-[#1D0101] font-semibold text-sm hover:bg-[#E6C200] transition-colors w-full justify-center"
        />
      </div>
    </aside>
  );
}
