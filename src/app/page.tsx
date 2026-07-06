"use client";

import Image from "next/image";
import { Sidebar, navItems, getNavIcon } from "@/components/Sidebar";
import { projects } from "@/data/projects";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { CheckCircle2, Menu, X, PaintBucket, Pin, Play } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePreloadImages } from "@/hooks/usePreloadImages";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom Icons representing user's specific designs
function CustomEnvelope({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M 2 8 L 12 2.5 L 22 8 L 22 10.5 L 12 14 L 2 10.5 Z" />
      <path d="M 2 13 L 12 16.5 L 22 13 L 22 22 L 2 22 Z" />
    </svg>
  );
}



import { LazyImage } from "@/components/LazyImage";
import { LazyVideo } from "@/components/LazyVideo";
import { ProjectImage } from "@/data/projects";

const SPRING_CONFIG = { type: "spring", stiffness: 100, damping: 20 } as const;

// Component for the bento card manual slideshow (preview using untitledui Carousel)
const BentoCardSlideshow = ({ images }: { images: ProjectImage[] }) => {
  const [api, setApi] = useState<any>(null);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden" 
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <Carousel.Root opts={{ loop: true }} setApi={setApi} className="w-full h-full">
        <Carousel.Content className="gap-0 h-full">
          {images.map((img, i) => (
            <Carousel.Item key={i} className="h-full w-full overflow-hidden relative">
              <LazyImage
                src={img.src}
                blur={img.blur}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full"
                priority={i === 0}
              />
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Root>
    </div>
  );
};

import { AProposSection } from "@/components/AProposSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CopyEmail } from "@/components/CopyEmail";
import { MarkerHighlight } from "@/components/MarkerHighlight";
import Footer from "./sections/Footer";

const services = [ 
  { 
    num: "01", 
    title: "Identité de marque", 
    tags: "Branding · Logo · Charte", 
    description: "Création de logos, chartes graphiques et univers visuels cohérents qui donnent une personnalité forte et mémorable à votre marque.", 
    href: "#contact", 
  }, 
  { 
    num: "02", 
    title: "UI/UX Design", 
    tags: "Web · Mobile · Prototypage", 
    description: "Conception d'interfaces intuitives centrées sur l'utilisateur, du wireframe au prototype interactif haute fidélité.", 
    href: "#contact", 
  }, 
  { 
    num: "03", 
    title: "Applications sur-mesure", 
    tags: "React · Next.js · Tauri", 
    description: "Développement d'applications web et desktop performantes, pensées pour durer et s'adapter à vos besoins spécifiques.", 
    href: "#contact", 
  }, 
  { 
    num: "04", 
    title: "Production IA", 
    tags: "Images · Vidéos · Contenu", 
    description: "Génération de visuels, vidéos et contenus créatifs assistée par intelligence artificielle pour accélérer votre production.", 
    href: "#contact", 
  }, 
];

const ServiceItem = ({ num, title, tags, description }: any) => { 
  const [isOpen, setIsOpen] = useState(false); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 
  const itemRef = useRef<HTMLDivElement>(null); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => { 
    if (isMobile) return;
    if (!itemRef.current) return; 
    const rect = itemRef.current.getBoundingClientRect(); 
    setMousePos({ 
      x: ((e.clientX - rect.left) / rect.width) * 100, 
      y: ((e.clientY - rect.top) / rect.height) * 100, 
    }); 
    setIsOpen(true); 
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return ( 
    <div 
      ref={itemRef} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={() => !isMobile && setIsOpen(false)} 
      onClick={handleClick}
      className="relative border-t border-[#1D0101]/10 last:border-b overflow-hidden cursor-pointer" 
    > 
      {/* Fond diffusion radiale depuis le curseur */} 
      <motion.div 
        className="absolute inset-0 pointer-events-none" 
        animate={{ 
          background: isOpen 
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,215,0,0.18) 0%, rgba(255,215,0,0.06) 60%, transparent 100%)` 
            : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent 100%)`, 
        }} 
        transition={{ duration: 0.5, ease: "easeOut" }} 
        style={{ zIndex: 0 }} 
      /> 

      {/* Ligne principale */} 
      <div className="relative z-10 flex items-center justify-between py-6 lg:py-8"> 
        <span className="text-sm font-mono w-12 flex-shrink-0 transition-colors duration-200" 
              style={{ color: isOpen ? "#FFD700" : "rgba(29,1,1,0.3)" }}> 
          {num} 
        </span> 

        <motion.span 
          className="flex-1 text-2xl lg:text-3xl font-bold text-[#1D0101] tracking-tight" 
          animate={{ x: isOpen ? 8 : 0 }} 
          transition={{ type: "spring", stiffness: 300, damping: 25 }} 
        > 
          {title} 
        </motion.span> 

        <span className="hidden lg:block text-sm text-[#1D0101]/40 mx-8 flex-shrink-0"> 
          {tags} 
        </span> 

        <motion.span 
          className="flex-shrink-0 text-xl" 
          animate={{ 
            rotate: isOpen ? 90 : 0, 
            color: isOpen ? "#FFD700" : "rgba(29,1,1,0.3)", 
            x: isOpen ? 6 : 0, 
          }} 
          transition={{ type: "spring", stiffness: 300, damping: 20 }} 
        > 
          → 
        </motion.span> 
      </div> 

      {/* Contenu accordion */} 
      <motion.div 
        initial={false} 
        animate={{ 
          height: isOpen ? "auto" : 0, 
          opacity: isOpen ? 1 : 0, 
        }} 
        transition={{ 
          height: { type: "spring", stiffness: 200, damping: 28 }, 
          opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 }, 
        }} 
        style={{ overflow: "hidden" }} 
        className="relative z-10" 
      > 
        <div className="pb-8 pl-12 pr-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"> 
          <p className="text-[#1D0101]/60 text-base max-w-md leading-relaxed"> 
            {description} 
          </p> 
          <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 w-fit">
            <WhatsAppButton 
              label="Demander un devis" 
              className="text-[#E6C200] font-semibold text-sm hover:text-[#FFD700] transition-colors" 
            />
          </div>
        </div> 
      </motion.div> 
    </div> 
  ); 
};

// Les 2-3 premières images du carrousel BingooBank préchargées via <link>
const criticalCarouselImages = (projects
  .find(p => p.slug === "bingoobank")
  ?.images?.slice(0, 3) || []).map(img => img.src);

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Collecter toutes les images de carrousel de tous les projets sans doublons
  const allCarouselImages = useMemo(() => 
    [...new Set(projects.flatMap((p) => p.images?.map(img => img.src) || []))], 
  []);

  console.log("Images à précharger:", allCarouselImages.length, allCarouselImages); 
  
  // Précharger 1.5s après le mount
  usePreloadImages(allCarouselImages, 1500);

  const categories = ["Tous", ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = activeCategory === "Tous" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const pinnedProjects = [
    projects.find(p => p.slug === "bingoobank"),
    projects.find(p => p.slug === "aeron-logo"),
    projects.find(p => p.slug === "qda"),
  ].filter(Boolean) as typeof projects;

  // Scroll to section and close mobile menu
  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {criticalCarouselImages.map((src) => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}
      <div className="min-h-[100dvh] bg-[var(--color-bg-tint)] font-sans">
        
        {/* Floating Hamburger Button for Mobile */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)} 
        className="fixed top-4 right-4 z-40 lg:hidden bg-[var(--color-dark)] text-white p-2.5 rounded-full shadow-lg hover:text-[var(--color-accent)] transition-all"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={SPRING_CONFIG}
              className="fixed top-0 left-0 w-full bg-[var(--color-dark)] text-white z-50 flex flex-col max-h-[100dvh] overflow-y-auto lg:hidden rounded-b-3xl shadow-2xl border-b border-white/10"
            >
              <div className="flex items-center justify-between px-4 h-14 shrink-0">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-white hover:text-[var(--color-accent)] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col p-6 gap-5">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center gap-4 text-left text-xl font-medium text-white hover:text-[var(--color-accent)] transition-colors"
                  >
                    {getNavIcon(item.href, "w-6 h-6")}
                    {item.label}
                  </button>
                ))}
              </nav>
              
              <div className="p-6 mt-auto flex flex-col gap-6">
                <div className="flex gap-6 text-gray-400">
                  {/* Social Icons Inline SVG for Mobile Menu */}
                  <a href="#" className="hover:text-[var(--color-accent)] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" className="hover:text-[var(--color-accent)] transition-colors"><PaintBucket className="w-6 h-6" /></a>
                  <a href="#" className="hover:text-[var(--color-accent)] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="hover:text-[var(--color-accent)] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
                <div className="w-full flex justify-center">
                  <WhatsAppButton 
                    label="Me contacter" 
                    className="px-5 py-2.5 rounded-full bg-[#FFD700] text-[#1D0101] font-semibold text-sm hover:bg-[#E6C200] transition-colors w-full justify-center" 
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
 
      <Sidebar />
      
      {/* MAIN CONTENT */}
      <main className="w-full lg:ml-80 lg:w-[calc(100%-20rem)] flex flex-col">
        
        {/* MOBILE HERO (visible only < lg) */}
        <section className="lg:hidden flex flex-col items-center pb-6">
          <div className="w-full h-[100px] bg-[var(--color-primary)] shrink-0"></div>
          
          <div className="relative flex flex-col items-center px-4 w-full">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-transparent ring-4 ring-[var(--color-dark)] -mt-12 mb-3 relative bg-gray-200 z-10 shrink-0">
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
            
            <h1 className="text-xl font-bold flex items-center gap-1.5 text-[var(--color-dark)]">
              Sergeo Limta
              <CheckCircle2 className="w-4 h-4 text-[var(--color-verified)]" />
            </h1>
            <p className="text-xs text-[var(--color-dark)]/70 font-medium">Graphiste & Brand Designer</p>
          </div>
        </section>
         {/* HERO SECTION */}
        <section id="accueil" className="relative flex flex-col pt-4 lg:pt-16 pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="font-company text-4xl lg:text-6xl font-bold text-[#1D0101] tracking-tight text-center leading-tight max-w-3xl mx-auto mb-2 lg:mb-4"> 
              Je transforme{" "} 
              <MarkerHighlight color="#FFD700">vos idées</MarkerHighlight> 
              {" "}en{" "} 
              <MarkerHighlight color="#E6C200">identités visuelles</MarkerHighlight> 
              {" "} 
              <MarkerHighlight color="#FFD700">fortes.</MarkerHighlight> 
            </h1> 
            <p className="text-center text-[#1D0101]/60 max-w-xl mx-auto mt-4 mb-3 lg:mb-6 leading-relaxed"> 
              Designer graphique et développeur créatif basé à Lomé, spécialisé en branding, UI/UX et production assistée par IA.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mt-6 mb-6">
              {["Branding", "UI/UX Design", "Direction Artistique", "Développement Web", "Production IA"].map(badge => (
                <span key={badge} className="px-3.5 py-1.5 bg-[var(--color-accent)] text-[var(--color-dark)] text-xs lg:text-sm font-semibold rounded-full shadow-sm whitespace-nowrap">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle "Projets épinglés" */}
          <div className="flex items-center gap-2 mb-6 mt-12 text-[var(--color-dark)]/70 uppercase tracking-widest text-xs lg:text-sm font-bold">
            <Pin className="w-4 h-4 transform rotate-45" />
            <span>Projets épinglés</span>
          </div>

          {/* Pinned Bento Grid (3 projects: BingooBank, Projet 2, Projet 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {pinnedProjects.map((p, index) => {
              const isVedette = index === 0;
              const bentoClass = isVedette
                ? "col-span-1 md:col-span-2 md:row-span-2 aspect-square"
                : "col-span-1 aspect-square";

              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={SPRING_CONFIG}
                  onClick={() => {
                    if (p.images && p.images.length > 0) {
                      setSelectedProject(p);
                    }
                  }}
                  className={cn(
                    "relative overflow-hidden rounded-[var(--radius-card)] group cursor-pointer shadow-sm hover:shadow-xl transition-shadow bg-white",
                    bentoClass
                  )}
                >
                  {p.images && p.images.length > 1 ? (
                    <BentoCardSlideshow images={p.images} />
                  ) : (
                    <LazyImage 
                      src={p.images && p.images.length > 0 ? p.images[0].src : `https://picsum.photos/seed/${p.slug}/800/600`} 
                      blur={p.images && p.images.length > 0 ? p.images[0].blur : undefined}
                      alt={p.title} 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                  
                  {/* Pin Icon */}
                  <div className={cn(
                    "absolute top-3 right-3 bg-[var(--color-dark)]/60 text-[var(--color-accent)] p-2 rounded-lg flex items-center justify-center z-20 backdrop-blur-sm",
                    isVedette && "p-3 bg-[var(--color-dark)]/80"
                  )}>
                    <Pin className={cn("transform rotate-45 text-[var(--color-accent)]", isVedette ? "w-5 h-5" : "w-3.5 h-3.5")} />
                  </div>

                  {/* Bottom Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/30 to-transparent flex flex-col justify-end p-4 lg:p-6 z-10",
                    isVedette && "lg:p-8"
                  )}>
                    <span className={cn(
                      "text-[var(--color-accent)] font-bold text-xs mb-1",
                      isVedette && "lg:text-sm lg:mb-2"
                    )}>
                      {p.category}
                    </span>
                    <h3 className={cn(
                      "text-white text-base lg:text-lg font-bold leading-tight",
                      isVedette && "text-lg lg:text-2xl"
                    )}>
                      {p.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <AProposSection />

        {/* SERVICES SECTION */}
        <section id="services" className="px-6 lg:px-12 py-16"> 
        
          {/* Titre de section */} 
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D0101]/40 mb-12"> 
            Services 
          </p> 
        
          {/* Liste */} 
          <div className="flex flex-col"> 
            {services.map((s, i) => ( 
              <ServiceItem key={s.num} {...s} />
            ))} 
          </div> 
        </section>

        {/* PROJETS SECTION (GALERIE COMPLÈTE) */}
        <section id="projets" className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <h2 className="font-company text-3xl lg:text-4xl font-bold">Tous les projets</h2>
          </div>
          
          {/* Filters */}
          <div className="flex flex-nowrap gap-2 lg:gap-3 overflow-x-auto pb-1 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 lg:px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-[var(--color-dark)] text-white shadow-md"
                    : "bg-white/50 text-[var(--color-dark)] hover:bg-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <AnimatePresence>
              {filteredProjects.map((p) => {
                const isVideoProject = !!(p as any).video;
                return (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={SPRING_CONFIG}
                    onClick={() => setSelectedProject(p)}
                    className="relative overflow-hidden rounded-[var(--radius-card)] group cursor-pointer shadow-sm hover:shadow-xl transition-shadow bg-black col-span-1 aspect-square"
                  >
                    {isVideoProject ? (
                      /* Video thumbnail: native video poster frame */
                      <LazyVideo
                        src={(p as any).video}
                        className="absolute inset-0 w-full h-full"
                      />
                    ) : (
                      <LazyImage 
                        src={p.images && p.images.length > 0 ? p.images[0].src : `https://picsum.photos/seed/${p.slug}/800/600`} 
                        blur={p.images && p.images.length > 0 ? p.images[0].blur : undefined}
                        alt={p.title} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="absolute inset-0 w-full h-full"
                      />
                    )}
                    
                    {/* Bottom Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/30 to-transparent flex flex-col justify-end p-4 lg:p-6 z-10">
                      <span className="text-[var(--color-accent)] font-bold text-xs mb-1">
                        {p.category}
                      </span>
                      <h3 className="text-white text-base lg:text-lg font-bold leading-tight">
                        {p.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* FOOTER */}
        <Footer />
      </main>

      <ProjectCarousel 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
    </>
  );
}
