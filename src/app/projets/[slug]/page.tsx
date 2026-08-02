import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { SimpleCarousel } from "@/components/SimpleCarousel";
import { LazyVideo } from "@/components/LazyVideo";
import { LazyImage } from "@/components/LazyImage";

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
    <div className="min-h-[100dvh] bg-[var(--color-bg-tint)] font-sans">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20 border-b border-[#1D0101]/10">
        <Link
          href="/#projets"
          className="flex items-center gap-2 text-sm font-semibold text-[#1D0101]/70 hover:text-[var(--color-accent)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux projets
        </Link>
        <span className="font-company font-bold text-[#1D0101]">Sergeo Limta</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 lg:px-0 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D0101]/40 mb-2">
            {project.category}
          </p>
          <h1 className="font-company text-3xl lg:text-5xl font-bold text-[#1D0101] tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* Video section (si le projet en a) */}
        {project.video && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4 text-[#1D0101]/70 uppercase tracking-widest text-xs lg:text-sm font-bold">
              <Play className="w-4 h-4" />
              <span>Vidéo</span>
            </div>
            <div className="rounded-[var(--radius-card)] overflow-hidden shadow-sm">
              <LazyVideo
                src={project.video}
                className="w-full aspect-video"
              />
            </div>
          </section>
        )}

        {/* Carousel */}
        {project.images && project.images.length > 0 && (
          <section>
            <div className="rounded-[var(--radius-card)] overflow-hidden bg-[#111111] shadow-sm">
              <SimpleCarousel
                images={project.images}
                isLandscape={isLandscape}
                bgColor="#111111"
              />
            </div>
          </section>
        )}

        {/* Fallback single image */}
        {(!project.images || project.images.length === 0) && (
          <LazyImage
            src={`https://picsum.photos/seed/${project.slug}/800/600`}
            alt={project.title}
            className="aspect-square w-full max-w-md mx-auto rounded-[var(--radius-card)] overflow-hidden"
          />
        )}
      </main>
    </div>
  );
}
