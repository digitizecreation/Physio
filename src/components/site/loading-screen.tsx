"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Activity } from "lucide-react";

export function LoadingScreen() {
  const prefersReduced = useReducedMotion();
  // If reduced motion is requested, skip the loading screen entirely (no flash)
  const [done, setDone] = React.useState(!!prefersReduced);

  React.useEffect(() => {
    if (prefersReduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 300);
    return () => clearTimeout(t);
  }, [prefersReduced]);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.4 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={prefersReduced ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="relative grid h-16 w-16 place-items-center rounded-2xl gradient-royal-teal text-white shadow-glow-royal"
            >
              <Activity className="h-7 w-7" />
              {!prefersReduced && (
                <motion.span
                  className="absolute inset-0 rounded-2xl border-2 border-primary"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div className="text-center">
              <div className="font-heading text-sm font-bold text-foreground">
                Dr. Samrudhhi A. Mane
              </div>
              <div className="text-[11px] text-muted-foreground">Physiotherapist • Navi Mumbai</div>
            </div>
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full gradient-royal-teal"
                initial={prefersReduced ? false : { x: "-100%" }}
                animate={{ x: prefersReduced ? "0%" : "100%" }}
                transition={{ duration: 0.6, repeat: prefersReduced ? 0 : Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
