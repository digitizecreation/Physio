"use client";

import * as React from "react";
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

  const drawerRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 16);
    if (latest > prev && latest > 240 && !open) setHidden(true);
    else setHidden(false);
  });

  // Drawer: ESC, scroll lock, focus management
  React.useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
      // Focus trap
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into drawer
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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
          <a href="#top" className="flex items-center gap-2.5">
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
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full gradient-royal-teal transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle — reserve space to prevent CLS */}
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-card/60 text-foreground transition-colors hover:bg-accent/20"
            >
              {mounted ? (
                theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4 opacity-0" />
              )}
            </button>

            <Magnetic className="hidden sm:block">
              <Button asChild size="sm" className="gap-2 rounded-xl">
                <a href={BUSINESS.phoneHref}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </Magnetic>

            <button
              ref={menuButtonRef}
              aria-label="Toggle menu"
              aria-expanded={open}
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
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[80%] max-w-sm flex-col gap-2 overflow-y-auto bg-card p-5 shadow-premium"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-heading text-base font-bold">Menu</span>
                <button
                  ref={closeButtonRef}
                  aria-label="Close menu"
                  onClick={() => {
                    setOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent/15"
                >
                  {l.label}
                </a>
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
