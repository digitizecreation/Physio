"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import { PROCESS_STEPS } from "@/lib/site/data";

export function TreatmentProcess() {
  return (
    <SectionWrap id="process" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-40" aria-hidden />
      <SectionHeading
        eyebrow="Treatment Process"
        title={
          <>
            A clear path from{" "}
            <span className="gradient-text-soft">pain to performance</span>
          </>
        }
        description="No guesswork, no surprises. Every step of your recovery is explained, scheduled and tracked — so you always know what's happening, why, and what's next."
      />

      <div className="relative mt-16">
        {/* Center vertical line for desktop */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-royal/40 via-teal/40 to-healing/40 md:block"
          aria-hidden
        />
        {/* Left vertical line for mobile */}
        <div
          className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-royal/40 via-teal/40 to-healing/40 md:hidden"
          aria-hidden
        />

        <ol className="space-y-10 md:space-y-16">
          {PROCESS_STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={s.step} delay={0.05 * i}>
                <li className="relative">
                  <div
                    className={`md:grid md:grid-cols-2 md:items-center md:gap-12 ${
                      isLeft ? "" : "md:[direction:rtl]"
                    }`}
                  >
                    {/* Card */}
                    <div className={`relative pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:[direction:ltr]"}`}>
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        className="group inline-block w-full rounded-2xl border border-border/60 bg-card/80 p-5 shadow-premium backdrop-blur transition-colors hover:border-primary/40 sm:p-6"
                      >
                        <div className={`flex items-center gap-3 ${isLeft ? "md:justify-end" : ""}`}>
                          <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Step {s.step}
                          </span>
                          <span className="h-px w-8 bg-border" />
                        </div>
                        <h3 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {s.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block" />
                  </div>

                  {/* Numbered node on the line */}
                  <div
                    className="absolute left-0 top-1 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                    aria-hidden
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 + i * 0.05 }}
                      className="relative grid h-8 w-8 place-items-center rounded-full gradient-royal-teal text-[11px] font-bold text-white shadow-glow-royal md:h-12 md:w-12 md:text-sm"
                    >
                      {s.step}
                      <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full" />
                    </motion.div>
                  </div>

                  {/* Connector arrow (mobile) */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="ml-4 mt-2 flex justify-start md:hidden">
                      <motion.div
                        animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      >
                        <ArrowDown className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </SectionWrap>
  );
}
