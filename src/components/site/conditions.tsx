"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrap, SectionHeading } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { CONDITIONS } from "@/lib/site/data";
import { cn } from "@/lib/utils";

export function Conditions() {
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
    const denoise = embla.on("select", onSelect);
    onSelect();
    return () => denoise?.();
  }, [embla, onSelect]);

  // autoplay with pause on hover/focus
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const startAutoplay = React.useCallback(() => {
    if (!embla) return;
    autoplayRef.current = setInterval(() => embla.scrollNext(), 4500);
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
    return stopAutoplay;
  }, [embla, startAutoplay, stopAutoplay]);

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
        description="Tap any condition to see how Dr. Samrudhhi approaches it."
      />

      <div className="relative mt-12">
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
            {CONDITIONS.map((c, i) => (
              <div
                key={c.title}
                className="min-w-0 shrink-0 grow-0 basis-full pl-0 sm:basis-1/2 sm:pl-4 lg:basis-1/3 lg:pl-5 first:pl-0"
              >
                <motion.a
                  href="#appointment"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur transition-colors hover:border-primary/50 sm:p-7"
                >
                  {/* Gradient tint on hover */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      c.color,
                    )}
                  />
                  {/* Decorative glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-royal/10 to-teal/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    {/* Gradient icon tile */}
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-royal to-teal text-white shadow-lg">
                      <Icon name={c.icon} className="h-6 w-6" />
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-all group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div className="mt-auto">
                    <span className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-heading text-xl font-bold leading-tight text-foreground sm:text-2xl">
                      {c.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      View treatment approach
                    </span>
                  </div>
                </motion.a>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous condition"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 backdrop-blur transition-colors hover:bg-accent/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {CONDITIONS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to condition ${i + 1}`}
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
            aria-label="Next condition"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 backdrop-blur transition-colors hover:bg-accent/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionWrap>
  );
}
