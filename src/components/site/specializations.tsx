"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionWrap, SectionHeading, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { SPECIALIZATIONS } from "@/lib/site/data";

// Colorful icon variants — each card gets a distinct vibrant icon color
// matching the reference image's multi-color palette
const iconColors = [
  "text-blue-400",
  "text-emerald-400",
  "text-amber-400",
  "text-rose-400",
  "text-cyan-400",
  "text-violet-400",
  "text-orange-400",
  "text-pink-400",
  "text-teal-400",
  "text-indigo-400",
  "text-lime-400",
  "text-fuchsia-400",
  "text-sky-400",
  "text-red-400",
  "text-green-400",
  "text-purple-400",
  "text-yellow-400",
  "text-orange-400",
];

// Subtle glow colors for hover
const glowColors = [
  "group-hover:shadow-blue-500/20",
  "group-hover:shadow-emerald-500/20",
  "group-hover:shadow-amber-500/20",
  "group-hover:shadow-rose-500/20",
  "group-hover:shadow-cyan-500/20",
  "group-hover:shadow-violet-500/20",
  "group-hover:shadow-orange-500/20",
  "group-hover:shadow-pink-500/20",
  "group-hover:shadow-teal-500/20",
  "group-hover:shadow-indigo-500/20",
  "group-hover:shadow-lime-500/20",
  "group-hover:shadow-fuchsia-500/20",
  "group-hover:shadow-sky-500/20",
  "group-hover:shadow-red-500/20",
  "group-hover:shadow-green-500/20",
  "group-hover:shadow-purple-500/20",
  "group-hover:shadow-yellow-500/20",
  "group-hover:shadow-orange-500/20",
];

export function Specializations() {
  return (
    <SectionWrap id="specializations" className="relative overflow-hidden bg-[#0f172a]">
      {/* Subtle background mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden>
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <SectionHeading
        eyebrow="Specializations"
        title={
          <>
            <span className="text-white">Comprehensive care for </span>
            <span className="gradient-text">every kind of pain</span>
          </>
        }
        description={
          <span className="text-slate-300">
            From acute sports injuries to chronic arthritis — each treated with a structured, evidence-based protocol.
          </span>
        }
      />

      {/* Compact card grid — 2 cols mobile, 4 tablet, 6-8 desktop */}
      <StaggerGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {SPECIALIZATIONS.map((s, i) => (
          <StaggerItem key={s.title}>
            <motion.a
              href="#appointment"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className={`group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-lg ${glowColors[i % glowColors.length]}`}
            >
              {/* Icon */}
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5">
                <Icon name={s.icon} className={`h-6 w-6 ${iconColors[i % iconColors.length]} transition-transform group-hover:scale-110`} />
              </div>

              {/* Title */}
              <h3 className="mt-3 font-heading text-xs font-semibold leading-tight text-white sm:text-sm">
                {s.title}
              </h3>

              {/* Hover arrow */}
              <ArrowUpRight className="mt-2 h-3 w-3 text-slate-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white group-hover:opacity-100" />
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur sm:flex-row sm:gap-5 sm:text-left"
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-healing text-white">
          <Icon name="HeartPulse" className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-white">
            Not sure which treatment you need?
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Book a single assessment — Dr. Samrudhhi will diagnose and outline the right path forward.
          </p>
        </div>
        <a
          href="#appointment"
          className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0f172a] shadow-lg transition-transform hover:scale-[1.03]"
        >
          Book Assessment
        </a>
      </motion.div>
    </SectionWrap>
  );
}
