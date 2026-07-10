"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionWrap, SectionHeading, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { CONDITIONS } from "@/lib/site/data";

export function Conditions() {
  return (
    <SectionWrap id="conditions" className="relative overflow-hidden">
      <SectionHeading
        eyebrow="Conditions We Treat"
        title={
          <>
            From everyday aches to{" "}
            <span className="gradient-text-soft">complex rehab</span>
          </>
        }
        description="Tap any condition to learn how Dr. Samrudhhi approaches it — the assessment, the techniques and the milestones you can expect along the way."
      />

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {CONDITIONS.map((c, i) => (
          <StaggerItem key={c.title}>
            <motion.a
              href="#appointment"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur transition-colors hover:border-primary/50"
            >
              <div
                className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${c.color} opacity-0 transition-opacity group-hover:opacity-100`}
              />
              <div className="flex items-start justify-between">
                <span className="font-heading text-xs font-semibold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-6 font-heading text-base font-bold leading-tight text-foreground sm:text-lg">
                {c.title}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View treatment approach
              </span>
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SectionWrap>
  );
}
