import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { BackButton } from "@/components/BackButton";
import { SimpleCarousel } from "@/components/SimpleCarousel";
import { LazyVideo } from "@/components/LazyVideo";

// Force Next.js to pre-render these pages statically at build time
export const dynamic = "force-static";
// Ensure that any slug not generated in generateStaticParams returns a 404 immediately
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.title} — Sergeo Limta`,
    description: `${project.title} · ${project.category} — Portfolio de Sergeo Limta`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isLandscape = project.slug === "parle-g-shooting";

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-[var(--color-bg-tint)] font-sans">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20 border-b border-[#1D0101]/10 shrink-0">
        <BackButton />
        <span className="font-company font-bold text-[#1D0101]">Sergeo Limta</span>
      </header>

      <main className="flex-1 flex flex-col min-h-0 w-full max-w-4xl mx-auto px-6 lg:px-0 py-6 lg:py-8 overflow-hidden">
        {/* Header */}
        <div className="mb-6 lg:mb-8 shrink-0">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D0101]/40 mb-1">
            {project.category}
          </p>
          <h1 className="font-company text-2xl lg:text-4xl font-bold text-[#1D0101] tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* Media section */}
        <div className="flex-1 flex items-center justify-center min-h-0 w-full relative">
          {project.video ? (
            /* Vidéo : détection auto portrait/paysage, centré dans le viewport */
            <LazyVideo
              src={project.video}
              autoDetectOrientation
              className="max-h-full max-w-full rounded-[var(--radius-card)] overflow-hidden shadow-sm bg-black"
            />
          ) : project.images && project.images.length > 0 ? (
            <SimpleCarousel
              images={project.images}
              isLandscape={isLandscape}
              className={`w-auto h-full max-h-full max-w-full rounded-[var(--radius-card)] overflow-hidden shadow-sm ${
                isLandscape ? "aspect-[1251/848]" : "aspect-square"
              }`}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
