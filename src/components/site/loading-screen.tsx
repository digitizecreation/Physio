"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

export function LoadingScreen() {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="relative grid h-16 w-16 place-items-center rounded-2xl gradient-royal-teal text-white shadow-glow-royal"
            >
              <Activity className="h-7 w-7" />
              <motion.span
                className="absolute inset-0 rounded-2xl border-2 border-primary"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-sm font-bold text-foreground">
                Dr. Samrudhhi A. Mane
              </div>
              <div className="text-[11px] text-muted-foreground">Physiotherapist • Navi Mumbai</div>
            </motion.div>
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full gradient-royal-teal"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
