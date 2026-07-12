"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrap, SectionHeading } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { WHY_CHOOSE } from "@/lib/site/data";
import { cn } from "@/lib/utils";

// Premium gradient combos for icon tiles
const gradients = [
  "from-royal to-teal",
  "from-teal to-healing",
  "from-healing to-royal",
  "from-royal to-healing",
  "from-teal to-royal",
  "from-healing to-teal",
  "from-royal to-healing",
  "from-teal to-healing",
  "from-healing to-royal",
];

export function WhyChoose() {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [selected, setSelected] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  React.useEffect(() => {
    if (!embla) return;
    const denoise = embla.on("select", onSelect) as unknown as (() => void) | undefined;
    onSelect();
    return () => denoise?.();
  }, [embla, onSelect]);

  // autoplay with pause on hover/focus + visibility change
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const startAutoplay = React.useCallback(() => {
    if (!embla) return;
    autoplayRef.current = setInterval(() => embla.scrollNext(), 5000);
  }, [embla]);
  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (!embla) return;
    startAutoplay();
    const onVis = () => (document.hidden ? stopAutoplay() : startAutoplay());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [embla, startAutoplay, stopAutoplay]);

  return (
    <SectionWrap id="why" className="relative overflow-hidden bg-secondary/30">
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-royal/10 to-transparent blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-healing/10 to-transparent blur-3xl" aria-hidden />

      <SectionHeading
        eyebrow="Why Patients Choose Dr. Samrudhhi"
        title={
          <>
            Care that goes{" "}
            <span className="gradient-text-soft">beyond the clinic</span>
          </>
        }
        description="Thorough assessment, clear education and genuine care at every session."
      />

      <div className="relative mt-14">
        {/* Carousel viewport */}
        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          onFocus={stopAutoplay}
          onBlur={startAutoplay}
        >
          <div className="flex">
            {WHY_CHOOSE.map((w, i) => (
              <div
                key={w.title}
                className="min-w-0 shrink-0 grow-0 basis-full pl-0 sm:basis-1/2 sm:pl-4 lg:basis-1/3 lg:pl-5 first:pl-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-7 shadow-premium backdrop-blur transition-colors hover:border-primary/40"
                >
                  {/* Decorative gradient glow */}
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                  />

                  {/* Gradient icon tile */}
                  <div className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} text-white shadow-lg`}>
                    <Icon name={w.icon} className="h-7 w-7" />
                  </div>

                  {/* Number + title */}
                  <div className="relative mt-6">
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-heading text-xl font-bold leading-tight text-foreground">
                      {w.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {w.description}
                  </p>

                  {/* Bottom accent bar */}
                  <div className="relative mt-6 h-1 w-12 origin-left rounded-full gradient-royal-teal transition-all duration-300 group-hover:w-20" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 backdrop-blur transition-colors hover:bg-accent/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {WHY_CHOOSE.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => embla?.scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  selected === i ? "w-6 bg-primary" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => embla?.scrollNext()}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 backdrop-blur transition-colors hover:bg-accent/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionWrap>
  );
}
