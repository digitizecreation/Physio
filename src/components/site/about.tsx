"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Microscope,
  Target,
  Sparkles,
  GraduationCap,
  Award,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import { Counter } from "@/components/site/motion";

const pillars = [
  {
    icon: Target,
    title: "Mission",
    text: "To help every patient move without pain and live without limits — through evidence-based, compassionate physiotherapy.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-First",
    text: "You're never a number. Every plan starts by listening to your story and goals, then fitting care to your life.",
  },
  {
    icon: Microscope,
    title: "Evidence-Based",
    text: "Grounded in current research and clinical guidelines. No fads, no shortcuts — only what's shown to work.",
  },
  {
    icon: Sparkles,
    title: "Healing Approach",
    text: "Pain relief is the start. We rebuild strength and confidence so the problem doesn't return.",
  },
];

const credentials = [
  { icon: GraduationCap, label: "Qualified Physiotherapist" },
  { icon: Award, label: "Orthopaedic & Sports Rehab" },
  { icon: HeartHandshake, label: "Home Visit Specialist" },
  { icon: Microscope, label: "Evidence-Based Practice" },
];

const highlights = [
  { value: 155, suffix: "+", label: "Patients Treated" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Average Rating" },
  { value: 18, suffix: "+", label: "Conditions Treated" },
  { value: 7, suffix: " days", label: "Open Every Day" },
];

export function About() {
  return (
    <SectionWrap id="about" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-50" aria-hidden />
      <SectionHeading
        eyebrow="About Dr. Samrudhhi"
        title={
          <>
            Compassionate care,{" "}
            <span className="gradient-text-soft">evidence-based results</span>.
          </>
        }
        description="Treating the person, not just the pain — clinical precision with genuine warmth."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        {/* Portrait + highlights */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 -z-10 animate-blob bg-gradient-to-br from-royal/25 via-teal/20 to-healing/20 blur-3xl" aria-hidden />
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="glass-card overflow-hidden rounded-[2rem] p-2 shadow-premium"
            >
              <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-royal/15 via-teal/10 to-healing/10 p-6">
                {/* Stylised portrait */}
                <PortraitIllustration />

                {/* Floating quote */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 -right-3 max-w-[200px] glass rounded-2xl p-3 shadow-premium"
                >
                  <Quote className="h-4 w-4 text-healing" />
                  <p className="mt-1 text-[11px] leading-snug text-foreground">
                    Every body can heal. My job is to show it how.
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">— Dr. Samrudhhi</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Credentials row */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {credentials.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/70 p-3 backdrop-blur"
                >
                  <c.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-[11px] font-medium leading-tight text-foreground">{c.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Story + pillars */}
        <div>
          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Dr. Samrudhhi A. Mane practises at the Physiotherapy Center, Satyam Hospital,
                Kopar Khairane — known across Navi Mumbai for{" "}
                <span className="font-semibold text-foreground">knee, back and neck pain</span>,
                sports injury rehab and post-surgical recovery.
              </p>
              <p>
                Her belief is simple: recovery is a partnership, not a protocol. Every patient gets{" "}
                <span className="font-semibold text-foreground">one-on-one, unhurried sessions</span>{" "}
                — and for those who can't travel, the same care at home across{" "}
                <span className="font-semibold text-foreground">Kopar Khairane, Ghansoli & nearby areas</span>.
              </p>
            </div>
          </Reveal>

          {/* Pillars */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.06 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur transition-colors hover:border-primary/40"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-royal/15 to-teal/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-royal-teal text-white shadow-glow-royal">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Highlights */}
          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 to-secondary/40 p-6 backdrop-blur sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className="text-center">
                  <div className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    <Counter to={h.value} decimals={h.decimals ?? 0} suffix={h.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{h.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Personalized treatment banner */}
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-healing/30 bg-healing/10 p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 text-healing" />
              <span className="font-semibold text-foreground">Personalized plans</span>
              <span className="text-muted-foreground">— written, explained and adjusted every session.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrap>
  );
}

function PortraitIllustration() {
  return (
    <svg viewBox="0 0 320 360" className="relative z-10 h-full w-full" role="img" aria-label="Dr. Samrudhhi A. Mane">
      <defs>
        <linearGradient id="pbg" x1="0" y1="0" x2="320" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="color-mix(in srgb, var(--royal) 12%, transparent)" />
          <stop offset="1" stopColor="color-mix(in srgb, var(--healing) 14%, transparent)" />
        </linearGradient>
        <linearGradient id="pcoat" x1="0" y1="0" x2="0" y2="360">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef2ff" />
        </linearGradient>
        <radialGradient id="phalo" cx="0.5" cy="0.35" r="0.55">
          <stop stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="360" fill="url(#pbg)" />
      <circle cx="160" cy="130" r="150" fill="url(#phalo)" />

      {/* Hair back */}
      <path d="M 100 200 Q 100 80 160 75 Q 220 80 220 200 L 220 240 L 100 240 Z" fill="#2d1b14" />
      {/* Neck */}
      <rect x="148" y="170" width="24" height="32" rx="12" fill="#e8b89a" />
      {/* Face */}
      <ellipse cx="160" cy="135" rx="44" ry="50" fill="#f3c9a8" />
      {/* Hair top */}
      <path d="M 116 120 Q 120 75 160 70 Q 200 75 204 120 Q 200 100 160 96 Q 120 100 116 120 Z" fill="#2d1b14" />
      <path d="M 116 120 Q 128 105 160 102 Q 192 105 204 120 L 204 138 Q 188 124 160 122 Q 132 124 116 138 Z" fill="#3a251a" />
      {/* Eyes */}
      <path d="M 138 132 Q 144 128 150 132" stroke="#2d1b14" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 170 132 Q 176 128 182 132" stroke="#2d1b14" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 136 124 Q 144 121 150 124" stroke="#2d1b14" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M 170 124 Q 176 121 182 124" stroke="#2d1b14" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <path d="M 160 142 L 158 152 Q 158 156 160 157 Q 162 156 162 152" stroke="#c89478" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M 148 165 Q 160 173 172 165" stroke="#b35c4d" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Bindu */}
      <circle cx="160" cy="108" r="3.5" fill="#c0264d" />

      {/* Coat */}
      <path d="M 70 230 Q 70 215 100 208 L 135 195 Q 160 220 185 195 L 220 208 Q 250 215 250 230 L 265 350 L 55 350 Z" fill="url(#pcoat)" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1.5" />
      <path d="M 135 195 L 160 225 L 185 195 L 190 250 L 160 270 L 130 250 Z" fill="#f8fafc" stroke="color-mix(in srgb, var(--teal) 30%, transparent)" strokeWidth="1.2" />
      {/* Inner shirt */}
      <path d="M 148 215 L 160 235 L 172 215 L 172 255 L 148 255 Z" fill="color-mix(in srgb, var(--teal) 60%, white)" />
      {/* Stethoscope */}
      <path d="M 145 220 Q 140 245 158 258 Q 180 262 185 245 Q 185 233 178 228" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="180" cy="265" r="8" fill="#1f2937" />
      <circle cx="180" cy="265" r="4" fill="#475569" />
    </svg>
  );
}
