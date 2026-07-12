"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, Activity, HeartPulse, Stethoscope, Bone, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/site/data";
import { Counter, Magnetic } from "@/components/site/motion";
import { GoogleG, GoogleStar } from "@/components/site/google-brand";

const floatingIcons = [
  { Icon: HeartPulse, x: "8%", y: "22%", delay: 0, color: "text-healing" },
  { Icon: Activity, x: "18%", y: "65%", delay: 0.4, color: "text-teal" },
  { Icon: Stethoscope, x: "85%", y: "18%", delay: 0.2, color: "text-royal" },
  { Icon: Bone, x: "92%", y: "70%", delay: 0.6, color: "text-healing" },
  { Icon: ShieldCheck, x: "50%", y: "8%", delay: 0.8, color: "text-teal" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-40 md:pt-44">
      {/* Background mesh + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh" aria-hidden />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[520px] w-[920px] -translate-x-1/2 animate-breathe rounded-full bg-gradient-to-tr from-royal/25 via-teal/15 to-healing/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.6] [background:radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--royal)_8%,transparent),transparent_60%)]" aria-hidden />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, color }, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.7 }}
          style={{ left: x, top: y }}
          className="pointer-events-none absolute hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay }}
            className={color}
          >
            <div className="glass grid h-12 w-12 place-items-center rounded-2xl">
              <Icon className="h-5 w-5" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        {/* Left: copy */}
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition-colors hover:border-healing/40"
          >
            <GoogleG className="h-3.5 w-3.5" />
            <span className="flex -space-x-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <GoogleStar key={i} className="h-3 w-3 transition-transform group-hover:scale-110" style={{ transitionDelay: `${i * 40}ms` }} />
              ))}
            </span>
            <span className="text-muted-foreground">
              4.9 / 5 · <span className="text-foreground transition-colors group-hover:text-healing">155+ Google Reviews</span>
            </span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl"
          >
            <span className="text-interactive inline-block">Move Without Pain.</span>{" "}
            <span className="relative">
              <span className="gradient-text-hover animate-gradient-shift">Live Without Limits.</span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewBox="0 0 320 14"
                className="absolute -bottom-2 left-0 h-3 w-full"
                fill="none"
              >
                <motion.path
                  d="M2 9 C 80 4, 160 4, 318 8"
                  stroke="url(#g1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--royal)" />
                    <stop offset="0.5" stopColor="var(--teal)" />
                    <stop offset="1" stopColor="var(--healing)" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group mt-7 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            Knee, back & neck pain, sports injuries, ACL rehab and home visits across{" "}
            <span className="font-semibold text-foreground text-interactive-teal cursor-default transition-colors">
              Kopar Khairane & Ghansoli, Navi Mumbai
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button asChild size="lg" className="group relative gap-2 overflow-hidden rounded-xl shadow-glow-royal">
                <a href="#appointment">
                  {/* Shimmer sweep on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Calendar className="h-4 w-4 relative" />
                  <span className="relative">Book Appointment</span>
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl">
                <a href={BUSINESS.phoneHref}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="gap-2 rounded-xl border border-healing/30 bg-healing/10 text-foreground hover:bg-healing/20"
              >
                <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 text-healing" />
                  WhatsApp
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          {/* Trust stats inline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-border/60 pt-7"
          >
            <div className="group cursor-default transition-transform hover:-translate-y-1">
              <div className="text-interactive font-heading text-2xl font-bold sm:text-3xl">
                <Counter to={155} suffix="+" />
              </div>
              <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Happy Patients</div>
            </div>
            <div className="group cursor-default transition-transform hover:-translate-y-1">
              <div className="text-interactive-teal font-heading text-2xl font-bold sm:text-3xl">
                <Counter to={4.9} decimals={1} suffix="★" />
              </div>
              <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Google Rating</div>
            </div>
            <div className="group cursor-default transition-transform hover:-translate-y-1">
              <div className="text-interactive-healing font-heading text-2xl font-bold sm:text-3xl">
                <Counter to={24} suffix="/7" />
              </div>
              <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">Availability</div>
            </div>
          </motion.div>
        </div>

        {/* Right: doctor visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative">
            {/* Glow blobs */}
            <div className="absolute -inset-6 -z-10 animate-blob bg-gradient-to-br from-royal/30 via-teal/20 to-healing/20 blur-3xl" aria-hidden />

            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 -z-10 rounded-[3rem] border border-dashed border-border/70"
              aria-hidden
            />

            {/* Doctor card */}
            <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-2 shadow-premium">
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-royal/15 via-teal/10 to-healing/10">
                {/* Stylised doctor silhouette (SVG illustration) */}
                <DoctorIllustration />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-10 glass rounded-2xl p-3 shadow-premium sm:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-healing text-white">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Evidence-Based</div>
                  <div className="text-[10px] text-muted-foreground">Rehab protocols</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-3 bottom-12 glass rounded-2xl p-3 shadow-premium sm:-right-6"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-royal-teal text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Home Visits</div>
                  <div className="text-[10px] text-muted-foreground">Kopar Khairane & Ghansoli</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 shadow-premium"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-healing" />
                Open 24×7
                <span className="text-muted-foreground">• Same-day appointments</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Trust bar */}
      <div className="border-y border-border/60 bg-card/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-sm font-medium text-muted-foreground sm:px-6 lg:px-8">
          {[
            "155+ Happy Patients",
            "4.9★ Google Rating",
            "24×7 Availability",
            "Home Visit Services",
            "Expert Physiotherapist",
            "Evidence-Based Treatment",
          ].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-healing animate-pulse-dot" style={{ animationDelay: `${i * 0.3}s` }} />
              {t}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-10 flex justify-center"
      >
        <a href="#about" aria-label="Scroll down" className="grid h-9 w-9 place-items-center rounded-full border border-border/70">
          <ArrowRight className="h-4 w-4 rotate-90" />
        </a>
      </motion.div>
    </section>
  );
}

function DoctorIllustration() {
  return (
    <svg
      viewBox="0 0 400 480"
      className="relative z-10 h-full w-full"
      role="img"
      aria-label="Dr. Samrudhhi A. Mane, Physiotherapist"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="400" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="color-mix(in srgb, var(--royal) 18%, transparent)" />
          <stop offset="0.5" stopColor="color-mix(in srgb, var(--teal) 14%, transparent)" />
          <stop offset="1" stopColor="color-mix(in srgb, var(--healing) 18%, transparent)" />
        </linearGradient>
        <linearGradient id="coat" x1="0" y1="0" x2="0" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef2ff" />
        </linearGradient>
        <linearGradient id="coatShadow" x1="0" y1="0" x2="0" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="color-mix(in srgb, var(--royal) 35%, transparent)" />
          <stop offset="1" stopColor="color-mix(in srgb, var(--teal) 25%, transparent)" />
        </linearGradient>
        <radialGradient id="halo" cx="0.5" cy="0.4" r="0.5">
          <stop stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background fill */}
      <rect width="400" height="480" fill="url(#bgGrad)" />
      <circle cx="200" cy="180" r="180" fill="url(#halo)" />

      {/* Stylised figure - woman physiotherapist in white coat */}
      {/* Hair back */}
      <path d="M 130 200 Q 130 110 200 100 Q 270 110 270 200 L 270 280 L 130 280 Z" fill="#2d1b14" opacity="0.95" />
      {/* Neck */}
      <rect x="185" y="220" width="30" height="40" rx="14" fill="#e8b89a" />
      {/* Face */}
      <ellipse cx="200" cy="180" rx="55" ry="62" fill="#f3c9a8" />
      {/* Hair top */}
      <path d="M 145 160 Q 150 100 200 95 Q 250 100 255 160 Q 250 130 200 125 Q 150 130 145 160 Z" fill="#2d1b14" />
      <path d="M 145 160 Q 160 140 200 138 Q 240 140 255 160 L 255 180 Q 240 165 200 162 Q 160 165 145 180 Z" fill="#3a251a" />

      {/* Eyes (closed, smiling) */}
      <path d="M 175 178 Q 182 174 188 178" stroke="#2d1b14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 212 178 Q 218 174 225 178" stroke="#2d1b14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Eyebrows */}
      <path d="M 173 168 Q 182 165 190 168" stroke="#2d1b14" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 210 168 Q 218 165 227 168" stroke="#2d1b14" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <path d="M 200 188 L 197 200 Q 197 204 200 205 Q 203 204 203 200" stroke="#c89478" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M 185 210 Q 200 220 215 210" stroke="#b35c4d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Bindu (vermilion dot) */}
      <circle cx="200" cy="148" r="4" fill="#c0264d" />

      {/* Shoulders / coat */}
      <path d="M 100 300 Q 100 280 130 270 L 170 255 Q 200 280 230 255 L 270 270 Q 300 280 300 300 L 320 460 L 80 460 Z" fill="url(#coat)" stroke="url(#coatShadow)" strokeWidth="2" />
      {/* Coat lapels */}
      <path d="M 170 255 L 200 290 L 230 255 L 235 320 L 200 340 L 165 320 Z" fill="#f8fafc" stroke="url(#coatShadow)" strokeWidth="1.5" />
      {/* Inner shirt */}
      <path d="M 185 270 L 200 295 L 215 270 L 215 320 L 185 320 Z" fill="color-mix(in srgb, var(--teal) 60%, white)" />
      {/* Stethoscope */}
      <path d="M 180 290 Q 175 320 195 335 Q 220 340 225 320 Q 225 305 215 300" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="218" cy="345" r="10" fill="#1f2937" />
      <circle cx="218" cy="345" r="5" fill="#475569" />

      {/* Name badge */}
      <rect x="245" y="320" width="40" height="14" rx="3" fill="white" stroke="url(#coatShadow)" />
      <rect x="248" y="323" width="20" height="2" rx="1" fill="color-mix(in srgb, var(--royal) 50%, black)" />
      <rect x="248" y="327" width="14" height="2" rx="1" fill="#94a3b8" />

      {/* Subtle background medical cross watermark */}
      <g opacity="0.08">
        <rect x="50" y="350" width="50" height="50" rx="10" fill="var(--royal)" />
        <rect x="68" y="360" width="14" height="30" rx="3" fill="white" />
        <rect x="60" y="368" width="30" height="14" rx="3" fill="white" />
        <rect x="320" y="80" width="40" height="40" rx="8" fill="var(--healing)" />
        <rect x="334" y="88" width="12" height="24" rx="2" fill="white" />
        <rect x="328" y="94" width="24" height="12" rx="2" fill="white" />
      </g>
    </svg>
  );
}
