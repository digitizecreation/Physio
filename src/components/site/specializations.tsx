"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionWrap, SectionHeading, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { SPECIALIZATIONS } from "@/lib/site/data";

// Premium gradient combos for icon tiles
const gradients = [
  "from-royal to-teal",
  "from-teal to-healing",
  "from-healing to-royal",
  "from-royal to-healing",
  "from-teal to-royal",
  "from-healing to-teal",
];

// Soft background tints for cards
const tints = [
  "group-hover:from-royal/8 group-hover:to-teal/4",
  "group-hover:from-teal/8 group-hover:to-healing/4",
  "group-hover:from-healing/8 group-hover:to-royal/4",
  "group-hover:from-royal/8 group-hover:to-healing/4",
  "group-hover:from-teal/8 group-hover:to-royal/4",
  "group-hover:from-healing/8 group-hover:to-teal/4",
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

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SPECIALIZATIONS.map((s, i) => (
          <StaggerItem key={s.title}>
            <motion.a
              href="#appointment"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 to-card/40 p-5 backdrop-blur transition-colors hover:border-primary/40 ${tints[i % tints.length]} sm:p-6`}
            >
              {/* Decorative glow blob */}
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
              />

              {/* Gradient icon tile */}
              <div className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} text-white shadow-lg`}>
                <Icon name={s.icon} className="h-6 w-6" />
                <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-card bg-card text-[9px] font-bold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title + CTA */}
              <div className="relative min-w-0 flex-1">
                <h3 className="font-heading text-base font-bold leading-tight text-foreground sm:text-lg">
                  {s.title}
                </h3>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                  Learn more
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
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
