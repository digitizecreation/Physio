"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionWrap, SectionHeading, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { WHY_CHOOSE } from "@/lib/site/data";

const accents = [
  { ring: "ring-royal/20", chip: "from-royal/15 to-teal/10", icon: "text-royal" },
  { ring: "ring-teal/20", chip: "from-teal/15 to-healing/10", icon: "text-teal" },
  { ring: "ring-healing/20", chip: "from-healing/15 to-royal/10", icon: "text-healing" },
];

export function WhyChoose() {
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
        description="The difference is in the details — how thoroughly you're assessed, how clearly you're educated, and how genuinely you're cared for at every session."
      />

      <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_CHOOSE.map((w, i) => {
          const a = accents[i % accents.length];
          return (
            <StaggerItem key={w.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className={`group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-premium backdrop-blur ring-1 ${a.ring} transition-colors hover:border-primary/40`}
              >
                <div className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${a.chip} opacity-60 transition-opacity group-hover:opacity-100`} />

                <div className="relative flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border/70 bg-background/80 backdrop-blur">
                    <Icon name={w.icon} className={`h-5 w-5 ${a.icon}`} />
                  </div>
                  <span className="font-heading text-xs font-semibold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.description}</p>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 gradient-royal-teal transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </SectionWrap>
  );
}
