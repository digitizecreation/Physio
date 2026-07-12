"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";

type Shot = { id: string; title: string; tag: string; palette: [string, string] };

const SHOTS: Shot[] = [
  { id: "clinic", title: "Modern Clinic Space", tag: "Clinic", palette: ["#1e3a8a", "#0d9488"] },
  { id: "doctor", title: "Dr. Samrudhhi at work", tag: "Doctor", palette: ["#0d9488", "#10b981"] },
  { id: "treatment", title: "Hands-on Manual Therapy", tag: "Treatment", palette: ["#1e3a8a", "#10b981"] },
  { id: "exercise", title: "Supervised Exercise", tag: "Exercise", palette: ["#10b981", "#1e3a8a"] },
  { id: "rehab", title: "ACL Rehab Session", tag: "Rehabilitation", palette: ["#0d9488", "#1e3a8a"] },
  { id: "home", title: "Home Visit Care", tag: "Home Visit", palette: ["#10b981", "#0d9488"] },
  { id: "elderly", title: "Elderly Physiotherapy", tag: "Patient Care", palette: ["#1e3a8a", "#0d9488"] },
  { id: "sports", title: "Sports Injury Recovery", tag: "Rehabilitation", palette: ["#0d9488", "#10b981"] },
];

export function Gallery() {
  const [open, setOpen] = React.useState<number | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);

  const close = React.useCallback(() => setOpen(null), []);
  const next = React.useCallback(() => setOpen((v) => (v === null ? v : (v + 1) % SHOTS.length)), []);
  const prev = React.useCallback(() => setOpen((v) => (v === null ? v : (v - 1 + SHOTS.length) % SHOTS.length)), []);

  React.useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [open, close, next, prev]);

  return (
    <SectionWrap id="gallery" className="relative overflow-visible">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-10">
        {/* Sticky heading — left column on desktop */}
        <div className="lg:sticky lg:top-28 lg:self-start lg:max-w-sm">
          <SectionHeading
            align="left"
            eyebrow="Inside the Practice"
            title={
              <>
                A glimpse into{" "}
                <span className="gradient-text-soft">how we work</span>
              </>
            }
            description="Every session is built around focused, one-on-one care."
          />
          <Reveal delay={0.15}>
            <div className="mt-6 hidden items-center gap-2 text-sm text-muted-foreground lg:flex">
              <ImageIcon className="h-4 w-4 text-primary" />
              <span>Click any photo to enlarge</span>
            </div>
          </Reveal>
        </div>

        {/* Uniform gallery grid — right column on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {SHOTS.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.05}>
              <motion.button
                ref={(el) => { if (open === i) triggerRef.current = el; }}
                onClick={() => setOpen(i)}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                aria-label={`Open ${s.title}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-premium backdrop-blur"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${s.palette[0]} 0%, ${s.palette[1]} 100%)`,
                  }}
                />
                {/* Subtle illustrated scene per shot */}
                <ShotScene id={s.id} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                    {s.tag}
                  </span>
                  <span className="mt-1 font-heading text-sm font-bold text-white sm:text-base">
                    {s.title}
                  </span>
                </div>
                <div className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/20 backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
                  <ImageIcon className="h-3.5 w-3.5 text-white" />
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={open !== null ? SHOTS[open].title : "Gallery"}
          >
            <button
              ref={closeBtnRef}
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-card/80 text-foreground backdrop-blur"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-card/80 text-foreground backdrop-blur"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-card/80 text-foreground backdrop-blur"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={open}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium"
            >
              <div
                className="relative aspect-[16/10] w-full"
                style={{
                  background: `linear-gradient(135deg, ${SHOTS[open].palette[0]} 0%, ${SHOTS[open].palette[1]} 100%)`,
                }}
              >
                <ShotScene id={SHOTS[open].id} />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {SHOTS[open].tag}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-foreground">
                  {SHOTS[open].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrap>
  );
}

function ShotScene({ id }: { id: string }) {
  // Stylised SVG illustrations to represent each scene
  const common = "absolute inset-0 h-full w-full";
  switch (id) {
    case "clinic":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* Wall */}
          <rect x="40" y="60" width="320" height="180" rx="14" fill="#ffffff" opacity="0.95" />
          {/* Counter */}
          <rect x="40" y="200" width="320" height="60" rx="0" fill="#e2e8f0" />
          <rect x="40" y="195" width="320" height="8" fill="#cbd5e1" />
          {/* Reception sign */}
          <rect x="160" y="80" width="80" height="22" rx="4" fill="#1e3a8a" />
          <text x="200" y="96" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">RECEPTION</text>
          {/* Plant */}
          <rect x="280" y="170" width="22" height="30" rx="3" fill="#a16207" />
          <ellipse cx="291" cy="160" rx="20" ry="14" fill="#10b981" />
          {/* Cross */}
          <rect x="78" y="100" width="40" height="40" rx="8" fill="#dc2626" opacity="0.85" />
          <rect x="93" y="108" width="10" height="24" fill="white" />
          <rect x="84" y="115" width="28" height="10" fill="white" />
        </svg>
      );
    case "doctor":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* Person */}
          <circle cx="200" cy="120" r="40" fill="#f3c9a8" />
          <path d="M 160 100 Q 160 70 200 65 Q 240 70 240 100 L 240 130 Q 220 110 200 108 Q 180 110 160 130 Z" fill="#2d1b14" />
          <path d="M 150 160 Q 150 145 175 138 L 225 138 Q 250 145 250 160 L 260 260 L 140 260 Z" fill="#ffffff" stroke="#0d9488" strokeWidth="2" />
          <path d="M 175 138 L 200 170 L 225 138 L 230 200 L 200 220 L 170 200 Z" fill="#f8fafc" stroke="#0d9488" strokeWidth="1.5" />
          <circle cx="200" cy="105" r="3" fill="#c0264d" />
        </svg>
      );
    case "treatment":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* Treatment table */}
          <rect x="80" y="180" width="240" height="40" rx="8" fill="#1f2937" />
          <rect x="80" y="220" width="20" height="40" fill="#1f2937" />
          <rect x="300" y="220" width="20" height="40" fill="#1f2937" />
          {/* Person lying */}
          <ellipse cx="200" cy="170" rx="120" ry="14" fill="#1e3a8a" opacity="0.4" />
          <circle cx="120" cy="165" r="16" fill="#f3c9a8" />
          <ellipse cx="200" cy="165" rx="80" ry="12" fill="#10b981" opacity="0.6" />
          {/* Therapist hands */}
          <circle cx="260" cy="155" r="14" fill="#f3c9a8" />
          <circle cx="285" cy="160" r="12" fill="#f3c9a8" />
        </svg>
      );
    case "exercise":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* Person squatting */}
          <circle cx="200" cy="120" r="22" fill="#f3c9a8" />
          <path d="M 178 130 L 222 130 L 230 200 L 170 200 Z" fill="#1e3a8a" />
          <rect x="170" y="200" width="20" height="50" rx="6" fill="#1f2937" />
          <rect x="210" y="200" width="20" height="50" rx="6" fill="#1f2937" />
          {/* Kettlebell */}
          <ellipse cx="120" cy="200" rx="20" ry="22" fill="#1f2937" />
          <path d="M 110 178 Q 110 168 120 168 Q 130 168 130 178" stroke="#1f2937" strokeWidth="4" fill="none" />
          {/* Mat */}
          <rect x="80" y="250" width="240" height="14" rx="4" fill="#0d9488" opacity="0.5" />
        </svg>
      );
    case "rehab":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* Knee joint illustration */}
          <ellipse cx="200" cy="150" rx="60" ry="80" fill="#ffffff" opacity="0.85" />
          <path d="M 170 80 Q 165 130 175 200" stroke="#1e3a8a" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 230 80 Q 235 130 225 200" stroke="#1e3a8a" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="200" cy="150" r="14" fill="#dc2626" opacity="0.8" />
          <circle cx="200" cy="150" r="6" fill="white" />
          {/* Arrows */}
          <path d="M 130 100 L 160 130 M 160 130 L 150 125 M 160 130 L 152 132" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 270 200 L 240 170 M 240 170 L 250 175 M 240 170 L 248 168" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* House */}
          <rect x="120" y="140" width="160" height="120" fill="#ffffff" stroke="#0d9488" strokeWidth="2" />
          <path d="M 110 140 L 200 70 L 290 140 Z" fill="#1e3a8a" />
          <rect x="180" y="180" width="40" height="80" rx="3" fill="#1e3a8a" />
          <rect x="140" y="160" width="30" height="30" rx="3" fill="#10b981" opacity="0.7" />
          <rect x="230" y="160" width="30" height="30" rx="3" fill="#10b981" opacity="0.7" />
          {/* Sun */}
          <circle cx="60" cy="60" r="20" fill="#fbbf24" />
        </svg>
      );
    case "elderly":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* Elderly figure with cane */}
          <circle cx="180" cy="100" r="20" fill="#f3c9a8" />
          <path d="M 160 90 Q 160 75 180 70 Q 200 75 200 90" fill="#9ca3af" />
          <path d="M 155 120 Q 155 110 175 105 L 195 105 Q 215 110 215 120 L 220 220 L 150 220 Z" fill="#6b7280" />
          <rect x="160" y="220" width="16" height="50" rx="4" fill="#1f2937" />
          <rect x="194" y="220" width="16" height="50" rx="4" fill="#1f2937" />
          {/* Cane */}
          <line x1="230" y1="130" x2="245" y2="270" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
          <path d="M 230 130 Q 222 125 222 118 Q 222 112 230 112" stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "sports":
      return (
        <svg viewBox="0 0 400 300" className={common} aria-hidden>
          <rect width="400" height="300" fill="transparent" />
          {/* Runner */}
          <circle cx="220" cy="100" r="18" fill="#f3c9a8" />
          <path d="M 200 120 L 240 120 L 245 200 L 195 200 Z" fill="#dc2626" />
          {/* Legs in stride */}
          <path d="M 200 200 L 175 250" stroke="#1f2937" strokeWidth="10" strokeLinecap="round" />
          <path d="M 240 200 L 270 240" stroke="#1f2937" strokeWidth="10" strokeLinecap="round" />
          {/* Arms */}
          <path d="M 205 130 L 175 170" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
          <path d="M 240 130 L 270 160" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
          {/* Track */}
          <path d="M 0 270 L 400 270" stroke="#fbbf24" strokeWidth="6" />
          <path d="M 0 285 L 400 285" stroke="white" strokeWidth="2" strokeDasharray="10 8" />
        </svg>
      );
    default:
      return null;
  }
}
