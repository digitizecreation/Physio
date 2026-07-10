"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionWrap, SectionHeading, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { SPECIALIZATIONS } from "@/lib/site/data";

const accents = [
  "from-royal/20 to-teal/10",
  "from-teal/20 to-healing/10",
  "from-healing/20 to-royal/10",
  "from-royal/20 to-healing/10",
  "from-teal/20 to-royal/10",
  "from-healing/20 to-teal/10",
];

const iconColors = [
  "text-royal",
  "text-teal",
  "text-healing",
];

export function Specializations() {
  return (
    <SectionWrap id="specializations" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />
      <SectionHeading
        eyebrow="Specializations"
        title={
          <>
            Comprehensive care for{" "}
            <span className="gradient-text-soft">every kind of pain</span>
          </>
        }
        description="From acute sports injuries to chronic arthritis — each treated with a structured, evidence-based protocol."
      />

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {SPECIALIZATIONS.map((s, i) => (
          <StaggerItem key={s.title}>
            <motion.a
              href="#appointment"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative flex h-full flex-col items-start overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur transition-colors hover:border-primary/50 sm:p-5"
            >
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${accents[i % accents.length]} opacity-50 transition-opacity group-hover:opacity-100`}
              />
              <div className="relative grid h-11 w-11 place-items-center rounded-xl border border-border/70 bg-background/80 backdrop-blur">
                <Icon name={s.icon} className={`h-5 w-5 ${iconColors[i % iconColors.length]}`} />
              </div>
              <h3 className="mt-3 font-heading text-sm font-bold leading-tight text-foreground">
                {s.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-primary">
                Learn more
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 to-secondary/40 p-6 text-center backdrop-blur sm:flex-row sm:gap-5 sm:text-left"
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-healing text-white">
          <Icon name="HeartPulse" className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            Not sure which treatment you need?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Book a single assessment — Dr. Samrudhhi will diagnose and outline the right path forward.
          </p>
        </div>
        <a
          href="#appointment"
          className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-royal transition-transform hover:scale-[1.03]"
        >
          Book Assessment
        </a>
      </motion.div>
    </SectionWrap>
  );
}
