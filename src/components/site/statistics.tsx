"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Clock, Heart, Users } from "lucide-react";
import { SectionWrap } from "@/components/site/reveal";
import { Counter } from "@/components/site/motion";

const items = [
  {
    icon: Users,
    value: 155,
    suffix: "+",
    label: "Google Reviews",
    sub: "From real, verified patients",
    color: "from-royal to-teal",
  },
  {
    icon: Star,
    value: 4.9,
    decimals: 1,
    suffix: "★",
    label: "Average Rating",
    sub: "Across all review platforms",
    color: "from-teal to-healing",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Availability",
    sub: "Open every day of the week",
    color: "from-healing to-royal",
  },
  {
    icon: Heart,
    value: 100,
    suffix: "%",
    label: "Personalized Care",
    sub: "One-on-one sessions, every time",
    color: "from-royal to-healing",
  },
];

export function Statistics() {
  return (
    <SectionWrap className="relative overflow-hidden py-10 sm:py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-card/90 via-card/70 to-secondary/40 p-8 shadow-premium backdrop-blur sm:p-10 md:p-12"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br from-royal/15 to-transparent blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-healing/15 to-transparent blur-3xl" aria-hidden />

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative text-center sm:text-left"
            >
              <div className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${it.color} text-white shadow-lg`}>
                <it.icon className="h-5 w-5" />
              </div>
              <div className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                <Counter to={it.value} decimals={it.decimals ?? 0} suffix={it.suffix} />
              </div>
              <div className="mt-2 font-heading text-base font-bold text-foreground">{it.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{it.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrap>
  );
}
