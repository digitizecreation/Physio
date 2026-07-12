"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { Phone, MessageCircle, ArrowUp, Calendar } from "lucide-react";
import { BUSINESS } from "@/lib/site/data";

export function FloatingActions() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const [showTop, setShowTop] = React.useState(false);
  const [showStickyCta, setShowStickyCta] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowTop(latest > 600);
    setShowStickyCta(latest > 800);
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left gradient-royal-teal"
        style={{ scaleX: progress }}
        aria-hidden
      />

      {/* Floating right cluster (desktop only — mobile uses sticky CTA bar) */}
      <div className="fixed bottom-5 right-4 z-50 hidden flex-col items-end gap-3 sm:flex sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 8 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-card/90 text-foreground shadow-premium backdrop-blur transition-colors hover:bg-accent/20"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp */}
        <motion.a
          href={BUSINESS.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 280, damping: 18 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="relative grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-glow-healing sm:h-14 sm:w-14"
        >
          <span className="absolute inset-0 -z-10 animate-pulse-ring rounded-full" />
          <MessageCircle className="h-6 w-6" />
        </motion.a>

        {/* Call */}
        <motion.a
          href={BUSINESS.phoneHref}
          aria-label="Call now"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 280, damping: 18 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="grid h-13 w-13 place-items-center rounded-full gradient-royal-teal text-white shadow-glow-royal sm:h-14 sm:w-14"
        >
          <Phone className="h-5 w-5" />
        </motion.a>
      </div>

      {/* Sticky mobile CTA bar */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:hidden"
          >
            <div className="glass flex items-center gap-2 rounded-2xl p-2 shadow-premium">
              <a
                href={BUSINESS.phoneHref}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-card/80 px-3 py-2.5 text-xs font-semibold text-foreground backdrop-blur"
              >
                <Phone className="h-4 w-4 text-primary" />
                Call
              </a>
              <a
                href={BUSINESS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="#appointment"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl gradient-royal-teal px-3 py-2.5 text-xs font-semibold text-white shadow-glow-royal"
              >
                <Calendar className="h-4 w-4" />
                Book
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
