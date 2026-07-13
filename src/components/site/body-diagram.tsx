"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MousePointerClick } from "lucide-react";
import { SectionWrap, SectionHeading } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

type BodyPart = {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
  treatments: string[];
  desc: string;
};

const PARTS: BodyPart[] = [
  {
    id: "neck",
    label: "Neck & Cervical",
    cx: 200,
    cy: 60,
    r: 14,
    desc: "Cervical pain, stiffness or radiating arm pain — often posture or disc related.",
    treatments: ["Manual therapy & mobilisation", "Deep neck flexor strengthening", "Postural re-education", "Workstation ergonomics"],
  },
  {
    id: "shoulder",
    label: "Shoulder",
    cx: 138,
    cy: 110,
    r: 16,
    desc: "Frozen shoulder, rotator cuff strains, impingement and post-surgical stiffness.",
    treatments: ["Joint mobilisation", "Capsular stretching", "Rotator cuff strengthening", "Scapular control drills"],
  },
  {
    id: "back",
    label: "Lower Back",
    cx: 200,
    cy: 175,
    r: 16,
    desc: "Mechanical low back pain, slip disc, sciatica and posture-related strain.",
    treatments: ["Core stabilisation", "Manual therapy", "McKenzie & mobility drills", "Lifting mechanics coaching"],
  },
  {
    id: "elbow",
    label: "Elbow & Wrist",
    cx: 92,
    cy: 175,
    r: 12,
    desc: "Tennis elbow, golfer's elbow, wrist sprains and repetitive strain.",
    treatments: ["Tendinopathy loading", "Manual therapy", "Taping & bracing", "Activity modification"],
  },
  {
    id: "hip",
    label: "Hip & Pelvis",
    cx: 200,
    cy: 230,
    r: 14,
    desc: "Hip impingement, bursitis, groin strain and post-natal pelvic rehab.",
    treatments: ["Hip mobility work", "Glute & deep rotator strengthening", "Pelvic alignment drills", "Gait retraining"],
  },
  {
    id: "knee",
    label: "Knee",
    cx: 175,
    cy: 290,
    r: 16,
    desc: "ACL & meniscus rehab, patellofemoral pain, arthritis and post-surgical recovery.",
    treatments: ["Criterion-based ACL protocol", "VMO & quad activation", "Plyometric progression", "Return-to-sport testing"],
  },
  {
    id: "ankle",
    label: "Ankle & Foot",
    cx: 200,
    cy: 345,
    r: 12,
    desc: "Ankle sprains, plantar fasciitis, Achilles tendinopathy and balance issues.",
    treatments: ["Proprioception & balance", "Calf & eccentric loading", "Manual therapy", "Footwear & orthotic advice"],
  },
];

export function BodyDiagram() {
  const [active, setActive] = React.useState<BodyPart | null>(null);
  // Map of body part id → its hotspot <g> element, so we can restore focus on close
  const hotspotRefs = React.useRef<Record<string, SVGGElement | null>>({});
  const close = React.useCallback(() => {
    const id = active?.id;
    setActive(null);
    // Defer focus restore until after the panel's exit animation, so focus lands cleanly
    if (id) {
      requestAnimationFrame(() => {
        hotspotRefs.current[id]?.focus();
      });
    }
  }, [active?.id]);
  const activate = React.useCallback((p: BodyPart) => {
    setActive(p);
  }, []);

  return (
    <SectionWrap id="body-map" className="relative overflow-hidden bg-secondary/30">
      <SectionHeading
        eyebrow="Interactive Body Map"
        title={
          <>
            Tap where it{" "}
            <span className="gradient-text-soft">hurts</span> — see how we treat it
          </>
        }
        description="Click any highlighted body part to see the conditions and techniques used there."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Body SVG */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="pointer-events-none absolute -inset-4 -z-10 animate-blob bg-gradient-to-br from-royal/15 via-teal/10 to-healing/15 blur-3xl" aria-hidden />
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-4 shadow-premium">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-card/60 to-secondary/30 p-6">
              <svg viewBox="0 0 400 420" className="relative z-10 h-full w-full" role="img" aria-label="Interactive body diagram">
                <defs>
                  <linearGradient id="bodyfill" x1="0" y1="0" x2="0" y2="420">
                    <stop stopColor="color-mix(in srgb, var(--royal) 18%, transparent)" />
                    <stop offset="1" stopColor="color-mix(in srgb, var(--teal) 16%, transparent)" />
                  </linearGradient>
                  <radialGradient id="nodeHover" cx="0.5" cy="0.5" r="0.5">
                    <stop stopColor="var(--healing)" stopOpacity="0.5" />
                    <stop offset="1" stopColor="var(--healing)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Body silhouette */}
                <g fill="url(#bodyfill)" stroke="color-mix(in srgb, var(--royal) 35%, transparent)" strokeWidth="2">
                  {/* Head */}
                  <circle cx="200" cy="50" r="32" />
                  {/* Neck */}
                  <rect x="190" y="78" width="20" height="14" />
                  {/* Torso */}
                  <path d="M 145 92 Q 130 100 125 130 L 120 230 Q 120 245 130 250 L 270 250 Q 280 245 280 230 L 275 130 Q 270 100 255 92 Z" />
                  {/* Arms */}
                  <path d="M 125 130 L 90 180 L 85 220 Q 85 235 92 240 Q 100 240 105 230 L 120 180 Z" />
                  <path d="M 275 130 L 310 180 L 315 220 Q 315 235 308 240 Q 300 240 295 230 L 280 180 Z" />
                  {/* Hips/pelvis */}
                  <path d="M 130 250 L 270 250 L 265 285 Q 265 295 255 295 L 145 295 Q 135 295 135 285 Z" />
                  {/* Legs */}
                  <path d="M 145 295 L 155 380 Q 155 395 170 395 Q 185 395 185 380 L 185 295 Z" />
                  <path d="M 215 295 L 215 380 Q 215 395 230 395 Q 245 395 245 380 L 255 295 Z" />
                </g>

                {/* Subtle anatomical lines */}
                <g stroke="color-mix(in srgb, var(--royal) 25%, transparent)" strokeWidth="1" fill="none" opacity="0.6">
                  <line x1="200" y1="92" x2="200" y2="250" />
                  <line x1="170" y1="120" x2="170" y2="240" />
                  <line x1="230" y1="120" x2="230" y2="240" />
                </g>

                {/* Interactive hotspots */}
                {PARTS.map((p) => {
                  const isActive = active?.id === p.id;
                  return (
                    <g
                      key={p.id}
                      ref={(el) => {
                        hotspotRefs.current[p.id] = el;
                      }}
                      onClick={() => activate(p)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`${p.label} — view treatments`}
                      aria-expanded={isActive}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          activate(p);
                        }
                      }}
                    >
                      {/* Outer pulse */}
                      <circle
                        cx={p.cx}
                        cy={p.cy}
                        r={p.r + (isActive ? 14 : 10)}
                        fill="url(#nodeHover)"
                        className="transition-all"
                      />
                      {/* Core dot */}
                      <motion.circle
                        cx={p.cx}
                        cy={p.cy}
                        r={isActive ? p.r : p.r - 4}
                        fill={isActive ? "var(--healing)" : "var(--royal)"}
                        stroke="white"
                        strokeWidth="2"
                        animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                        transition={{ duration: 1.4, repeat: isActive ? Infinity : 0 }}
                        style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
                      />
                      {/* Label */}
                      <text
                        x={p.cx}
                        y={p.cy + p.r + 14}
                        textAnchor="middle"
                        className="fill-foreground font-sans"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur">
                <span className="flex items-center gap-1.5">
                  <MousePointerClick className="h-3 w-3 text-healing" />
                  Click any highlighted area
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="glass-card relative h-full overflow-hidden rounded-[2rem] p-6 shadow-premium sm:p-8"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-royal/15 to-teal/10 blur-2xl" />
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg border border-border/70 bg-card/70 backdrop-blur transition-colors hover:bg-accent/20"
                >
                  <X className="h-4 w-4" />
                </button>

                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-healing" />
                  {active.label}
                </span>

                <h3 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Treatment approach
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {active.desc}
                </p>

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Key techniques
                  </div>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {active.treatments.map((t, i) => (
                      <motion.li
                        key={t}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="flex items-start gap-2 rounded-xl border border-border/60 bg-card/70 p-3 backdrop-blur"
                      >
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full gradient-healing text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground">{t}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="sm" className="gap-2">
                    <a href="#appointment">
                      Book this treatment
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href="#faq">Have questions?</a>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card flex h-full min-h-[280px] flex-col items-center justify-center rounded-[2rem] p-8 text-center shadow-premium"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-royal-teal text-white shadow-glow-royal">
                  <MousePointerClick className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  Select a body part to begin
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Tap on any highlighted area of the body to see the typical conditions treated there and the techniques used in recovery.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrap>
  );
}
