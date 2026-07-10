"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Clock, ShieldCheck, Calendar, Phone, ArrowRight } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { HOME_VISIT_BENEFITS, BUSINESS } from "@/lib/site/data";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/motion";

export function HomeVisit() {
  return (
    <SectionWrap id="home-visit" className="relative overflow-hidden bg-secondary/30">
      <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-healing/20 to-transparent blur-3xl" aria-hidden />

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        {/* Left: copy + benefits */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Home Visit Physiotherapy"
            title={
              <>
                Quality care,{" "}
                <span className="gradient-text-soft">delivered to your door</span>
              </>
            }
            description="Recovery shouldn't depend on your ability to travel. Dr. Samrudhhi brings the full clinic experience — assessment, manual therapy, supervised exercise — straight to your home, with the same evidence-based protocols."
          />

          <StaggerGroup className="mt-8 grid gap-3 sm:grid-cols-2">
            {HOME_VISIT_BENEFITS.map((b) => (
              <StaggerItem key={b.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="group flex h-full items-start gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur transition-colors hover:border-primary/40"
                >
                  <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-healing text-white">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground">{b.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.description}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild size="lg" className="gap-2 shadow-glow-royal">
                  <a href="#appointment">
                    <Calendar className="h-4 w-4" />
                    Book Home Visit
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">
                    Check Availability
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Kopar Khairane & Ghansoli
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Same-day slots available
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary" />
                {BUSINESS.phone}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: visual */}
        <Reveal delay={0.1}>
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 -z-10 animate-blob bg-gradient-to-br from-royal/20 via-teal/15 to-healing/15 blur-3xl"
              aria-hidden
            />

            <div className="glass-card relative overflow-hidden rounded-[2rem] p-2 shadow-premium">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-royal/12 via-teal/8 to-healing/10 p-8">
                <HomeVisitIllustration />

                {/* Floating info chip */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 left-4 glass rounded-2xl p-3 shadow-premium"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl gradient-royal-teal text-white">
                      <Home className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">Home Visit Available</div>
                      <div className="text-[10px] text-muted-foreground">Mon – Sun • 24×7</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionWrap>
  );
}

function HomeVisitIllustration() {
  return (
    <svg viewBox="0 0 420 360" className="relative z-10 h-full w-full" role="img" aria-label="Home visit physiotherapy">
      <defs>
        <linearGradient id="hvsky" x1="0" y1="0" x2="0" y2="360">
          <stop stopColor="color-mix(in srgb, var(--teal) 18%, transparent)" />
          <stop offset="1" stopColor="color-mix(in srgb, var(--healing) 18%, transparent)" />
        </linearGradient>
        <linearGradient id="hvhouse" x1="0" y1="0" x2="0" y2="360">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>

      {/* Sun / sky */}
      <rect width="420" height="360" fill="url(#hvsky)" />
      <circle cx="340" cy="70" r="28" fill="color-mix(in srgb, var(--healing) 50%, transparent)" />

      {/* Clouds */}
      <g fill="#ffffff" opacity="0.7">
        <ellipse cx="80" cy="60" rx="35" ry="12" />
        <ellipse cx="110" cy="58" rx="28" ry="10" />
        <ellipse cx="60" cy="58" rx="22" ry="9" />
      </g>

      {/* Ground */}
      <path d="M 0 280 L 420 280 L 420 360 L 0 360 Z" fill="color-mix(in srgb, var(--healing) 25%, white)" />

      {/* House */}
      <g>
        {/* Body */}
        <rect x="200" y="180" width="160" height="110" fill="url(#hvhouse)" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1.5" />
        {/* Roof */}
        <path d="M 190 180 L 280 110 L 370 180 Z" fill="color-mix(in srgb, var(--royal) 60%, #4f6bff)" />
        {/* Door */}
        <rect x="262" y="220" width="36" height="70" rx="3" fill="color-mix(in srgb, var(--royal) 50%, #1e3a8a)" />
        <circle cx="290" cy="258" r="2.5" fill="#fbbf24" />
        {/* Window */}
        <rect x="216" y="200" width="34" height="34" rx="3" fill="color-mix(in srgb, var(--teal) 50%, white)" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1.2" />
        <path d="M 233 200 L 233 234 M 216 217 L 250 217" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1.2" />
        <rect x="312" y="200" width="34" height="34" rx="3" fill="color-mix(in srgb, var(--teal) 50%, white)" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1.2" />
        <path d="M 329 200 L 329 234 M 312 217 L 346 217" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1.2" />
      </g>

      {/* Path / footsteps */}
      <g fill="color-mix(in srgb, var(--royal) 30%, transparent)">
        <ellipse cx="180" cy="310" rx="6" ry="3" />
        <ellipse cx="160" cy="325" rx="6" ry="3" />
        <ellipse cx="140" cy="312" rx="6" ry="3" />
        <ellipse cx="120" cy="325" rx="6" ry="3" />
      </g>

      {/* Physiotherapist figure walking */}
      <g transform="translate(70, 220)">
        {/* Bag */}
        <rect x="-2" y="32" width="22" height="18" rx="3" fill="color-mix(in srgb, var(--healing) 60%, white)" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1" />
        <path d="M 4 32 L 4 26 Q 4 22 8 22 L 10 22 Q 14 22 14 26 L 14 32" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1.5" fill="none" />
        <rect x="2" y="38" width="14" height="2" fill="color-mix(in srgb, var(--royal) 50%, transparent)" />

        {/* Body / coat */}
        <path d="M 6 10 L 26 10 L 30 50 L 2 50 Z" fill="#ffffff" stroke="color-mix(in srgb, var(--royal) 30%, transparent)" strokeWidth="1" />
        {/* Head */}
        <circle cx="16" cy="4" r="7" fill="#f3c9a8" />
        {/* Hair */}
        <path d="M 9 4 Q 9 -4 16 -4 Q 23 -4 23 4 L 23 0 Q 20 -1 16 -1 Q 12 -1 9 0 Z" fill="#2d1b14" />
        {/* Stethoscope hint */}
        <path d="M 12 16 Q 12 26 18 28 Q 24 26 24 16" stroke="#1f2937" strokeWidth="1.2" fill="none" />
        <circle cx="20" cy="30" r="2" fill="#1f2937" />

        {/* Legs */}
        <rect x="9" y="50" width="6" height="20" rx="2" fill="#1f2937" />
        <rect x="18" y="50" width="6" height="20" rx="2" fill="#1f2937" />
      </g>

      {/* Heart pulse icon */}
      <g transform="translate(50, 130)">
        <rect x="0" y="0" width="40" height="40" rx="10" fill="white" stroke="color-mix(in srgb, var(--healing) 40%, transparent)" strokeWidth="1" />
        <path d="M 6 22 L 12 22 L 14 16 L 18 28 L 22 18 L 24 22 L 34 22" stroke="var(--healing)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
