"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, Star, Moon, Sun, Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BUSINESS, NAV_LINKS } from "@/lib/site/data";
import { Magnetic } from "@/components/site/motion";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 16);
    if (latest > prev && latest > 240 && !open) setHidden(true);
    else setHidden(false);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-3 py-2 transition-all duration-300 sm:px-4",
            scrolled
              ? "glass shadow-premium"
              : "border border-transparent bg-transparent",
          )}
        >
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2.5">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl gradient-royal-teal text-white shadow-glow-royal">
              <Activity className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-healing ring-2 ring-background" />
            </span>
            <div className="leading-tight">
              <div className="font-heading text-sm font-bold text-foreground sm:text-base">
                Dr. Samrudhhi A. Mane
              </div>
              <div className="hidden text-[11px] font-medium text-muted-foreground sm:block">
                Physiotherapist • Navi Mumbai
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full gradient-royal-teal transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground md:flex">
              <Star className="h-3.5 w-3.5 fill-healing text-healing" />
              4.9
              <span className="text-muted-foreground">• 155+</span>
            </div>

            {mounted && (
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-card/60 text-foreground transition-colors hover:bg-accent/20"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            <Magnetic className="hidden sm:block">
              <Button asChild size="sm" className="gap-2 rounded-xl">
                <a href={BUSINESS.phoneHref}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </Magnetic>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-card/60 text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[80%] max-w-sm flex-col gap-2 overflow-y-auto bg-card p-5 shadow-premium"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-heading text-base font-bold">Menu</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent/15"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild className="gap-2">
                  <a href={BUSINESS.phoneHref}>
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
              <div className="mt-6 rounded-xl border border-border/70 bg-secondary/50 p-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-healing text-healing" />
                  <span className="font-semibold">4.9 / 5</span>
                  <span className="text-muted-foreground">• 155+ reviews</span>
                </div>
                <p className="mt-2 text-muted-foreground">{BUSINESS.hours}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
