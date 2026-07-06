"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const APROPOS_PNG_RATIO = 816 / 1456;
const HAND_LINE_PERCENT = 0.78;
const DEV_POSITION = false; // ← false quand les valeurs sont trouvées

export function AProposSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [basePos, setBasePos] = useState({ top: 0, width: 220, height: 180 });
  const [offset, setOffset] = useState({ x: 0, y: 200 }); // offset manuel DEV
  const [cardPaddingTop, setCardPaddingTop] = useState("2rem");
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });

  // Calcul ResizeObserver
  const compute = useCallback(() => {
    if (!wrapperRef.current) return;
    const wrapperWidth = wrapperRef.current.getBoundingClientRect().width;
    const imgWidth = Math.min(Math.max(wrapperWidth * 0.42, 220), 440);
    const imgHeight = imgWidth * APROPOS_PNG_RATIO;
    const overlapAbove = imgHeight * HAND_LINE_PERCENT;
    const overlapBelow = imgHeight * (1 - HAND_LINE_PERCENT);
    setBasePos({ top: -overlapAbove, width: imgWidth, height: imgHeight });
    setCardPaddingTop(`${overlapBelow + 24}px`);
  }, []);

  useEffect(() => {
    compute();
    const observer = new ResizeObserver(compute);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [compute]);

  // Drag handlers — uniquement si DEV_POSITION
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!DEV_POSITION) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = {
      mx: e.clientX, my: e.clientY,
      ox: offset.x, oy: offset.y,
    };
  }, [offset]);

  useEffect(() => {
    if (!DEV_POSITION) return;
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      setOffset({
        x: dragStart.current.ox + (e.clientX - dragStart.current.mx),
        y: dragStart.current.oy + (e.clientY - dragStart.current.my),
      });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <section id="a-propos" className="px-6 lg:px-12 py-16">
      <div ref={wrapperRef} className="relative max-w-4xl mx-auto"
           style={{ paddingTop: `${440 * APROPOS_PNG_RATIO * HAND_LINE_PERCENT}px` }}>

        {/* PNG draggable en DEV */}
        <Image
          src="/images/a_propos.png"
          alt="Sergeo Limta"
          width={460}
          height={260}
          quality={90}
          priority
          draggable={false}
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            top: basePos.top + offset.y,
            left: "50%",
            transform: "translateX(-50%)",
            width: basePos.width,
            height: basePos.height,
            zIndex: 20,
            pointerEvents: DEV_POSITION ? "auto" : "none",
            objectFit: "contain",
            cursor: DEV_POSITION ? (dragging ? "grabbing" : "grab") : "default",
            userSelect: "none",
          }}
          className="pointer-events-none object-contain"
        />

        {/* Card */}
        <div className="relative z-10 bg-white px-8 lg:px-12 pb-10"
             style={{
               borderRadius: "var(--radius-card)",
               boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
               border: "1px solid rgba(255,215,0,0.3)",
               overflow: "visible",
               paddingTop: cardPaddingTop,
             }}>
          <div className="text-center mb-6"> 
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D0101]/40 mb-1"> 
              De moi 
            </p> 
            <h2 className="font-company text-3xl lg:text-4xl font-bold text-[#1D0101]"> 
              À propos 
            </h2> 
          </div> 
          <div className="prose prose-base lg:prose-lg text-[var(--color-dark)]/85 mb-8">
            <p className="mb-4">
              Passionné par la convergence entre le design et la technologie, j'évolue avec une double casquette de créatif et de développeur.
            </p>
            <p>
              Mon approche consiste à ne pas seulement créer de belles interfaces, mais à concevoir des expériences utilisateur robustes, accessibles et mémorables. L'intégration des outils de pointe, comme l'IA générative, me permet d'explorer des territoires créatifs inédits.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/40 p-4 rounded-xl border border-white/20 shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-[var(--color-dark)] mb-1">50+</p>
              <p className="text-xs font-semibold text-[var(--color-dark)]/60 uppercase tracking-wider">Projets livrés</p>
            </div>
            <div className="bg-white/40 p-4 rounded-xl border border-white/20 shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-[var(--color-dark)] mb-1">5 ans</p>
              <p className="text-xs font-semibold text-[var(--color-dark)]/60 uppercase tracking-wider">d'expérience</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[var(--color-dark)]/60 uppercase tracking-wider mb-3">Stack & Outils</h3>
            <div className="flex flex-wrap gap-2">
              {["Figma", "Tauri", "Next.js", "React", "IA Générative", "Tailwind CSS", "TypeScript"].map(tool => (
                <span key={tool} className="px-3 py-1.5 bg-white text-[var(--color-dark)] text-xs font-semibold rounded-lg shadow-sm border border-[var(--color-dark)]/5">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bandeau DEV */}
      {DEV_POSITION && (
        <div style={{
          position: "fixed", bottom: 20, left: "50%",
          transform: "translateX(-50%)",
          background: "#1D0101", color: "#FFD700",
          padding: "10px 24px", borderRadius: 8,
          fontFamily: "monospace", fontSize: 13,
          zIndex: 9999, pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>
          offset x: <b>{Math.round(offset.x)}px</b>
          &nbsp;|&nbsp;
          offset y: <b>{Math.round(offset.y)}px</b>
          &nbsp;|&nbsp;
          <span style={{ opacity: 0.6 }}>
            → noter ces valeurs puis DEV_POSITION = false
          </span>
        </div>
      )}
    </section>
  );
}
