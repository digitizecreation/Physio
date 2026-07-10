"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, Phone, HelpCircle } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS, BUSINESS } from "@/lib/site/data";
import { Button } from "@/components/ui/button";

export function Faq() {
  return (
    <SectionWrap id="faq" className="relative overflow-hidden bg-secondary/30">
      <div className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-royal/15 to-transparent blur-3xl" aria-hidden />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Left: heading + CTA */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Frequently Asked Questions"
            title={
              <>
                Answers to your{" "}
                <span className="gradient-text-soft">common questions</span>
              </>
            }
            description="Everything you need to know before your first session. Still have a question? Reach out — we usually reply within the hour."
          />

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-3xl border border-border/60 bg-card/80 p-6 shadow-premium backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-royal-teal text-white">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Still have a question?
                  </h3>
                  <p className="text-xs text-muted-foreground">We're happy to help, no obligation.</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline" className="gap-2">
                  <a href={BUSINESS.phoneHref}>
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="gap-2 border-healing/30 bg-healing/10 text-foreground hover:bg-healing/20">
                  <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-3.5 w-3.5 text-healing" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: accordion */}
        <Reveal delay={0.05}>
          <div className="rounded-3xl border border-border/60 bg-card/70 p-2 shadow-premium backdrop-blur sm:p-4">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-border/60 last:border-0 data-[state=open]:bg-gradient-to-br data-[state=open]:from-royal/5 data-[state=open]:to-transparent"
                >
                  <AccordionTrigger className="group px-4 py-5 text-left hover:no-underline sm:px-5">
                    <span className="flex items-start gap-3 text-left">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-border/70 bg-card text-[11px] font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-sm font-bold text-foreground sm:text-base">
                        {f.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 pl-12 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:pl-[3.4rem] sm:text-[15px]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </SectionWrap>
  );
}

/* Floating expand icon — kept local to keep AccordionTrigger default chevron swap simple */
export function FaqPlusIcon({ open }: { open: boolean }) {
  return (
    <motion.span animate={{ rotate: open ? 45 : 0 }} className="grid h-6 w-6 place-items-center rounded-full border border-border/70">
      <Plus className="h-3.5 w-3.5" />
    </motion.span>
  );
}

// keep AnimatePresence import used
void AnimatePresence;
