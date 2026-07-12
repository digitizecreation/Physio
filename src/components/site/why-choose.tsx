"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { WHY_CHOOSE } from "@/lib/site/data";

// Premium gradient combos
const gradients = [
  "from-royal to-teal",
  "from-teal to-healing",
  "from-healing to-royal",
  "from-royal to-healing",
  "from-teal to-royal",
  "from-healing to-teal",
];

export function WhyChoose() {
  // First item is the featured card; rest go in a compact grid
  const [featured, ...rest] = WHY_CHOOSE;

  return (
    <SectionWrap id="why" className="relative overflow-hidden bg-secondary/30">
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-royal/10 to-transparent blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-healing/10 to-transparent blur-3xl" aria-hidden />

      <SectionHeading
        eyebrow="Why Patients Choose Dr. Samrudhhi"
        title={
          <>
            Care that goes{" "}
            <span className="gradient-text-soft">beyond the clinic</span>
          </>
        }
        description="Thorough assessment, clear education and genuine care at every session."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:gap-5">
        {/* Featured card — the first why-choose item, larger and more visual */}
        <Reveal>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card/90 via-card/70 to-secondary/40 p-7 shadow-premium backdrop-blur transition-colors hover:border-primary/40 sm:p-9"
          >
            {/* Decorative gradient glow */}
            <div className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${gradients[0]} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25`} />
            {/* Decorative ring */}
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-dashed border-border/50 opacity-50" aria-hidden />

            <div className="relative flex items-center gap-3">
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${gradients[0]} text-white shadow-lg`}>
                <Icon name={featured.icon} className="h-7 w-7" />
              </div>
              <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Featured
              </span>
            </div>

            <div className="relative mt-8">
              <h3 className="font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {featured.description}
              </p>
              <div className="mt-6 h-1 w-16 origin-left gradient-royal-teal rounded-full" />
            </div>
          </motion.div>
        </Reveal>

        {/* Compact grid for the remaining items */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rest.map((w, i) => (
            <Reveal key={w.title} delay={0.04 * (i + 1)}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group relative flex h-full items-start gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur transition-colors hover:border-primary/40 sm:p-5"
              >
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} text-white shadow-md`}>
                  <Icon name={w.icon} className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-sm font-bold leading-tight text-foreground sm:text-base">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {w.description}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}
