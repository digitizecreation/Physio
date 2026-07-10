"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SectionWrap, SectionHeading } from "@/components/site/reveal";
import { REVIEWS, BUSINESS } from "@/lib/site/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  React.useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  // autoplay
  React.useEffect(() => {
    if (!embla) return;
    const id = setInterval(() => embla.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [embla]);

  return (
    <SectionWrap id="reviews" className="relative overflow-hidden bg-secondary/30">
      <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-healing/15 to-transparent blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-royal/15 to-transparent blur-3xl" aria-hidden />

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Real Patient Reviews"
          title={
            <>
              Stories of recovery,{" "}
              <span className="gradient-text-soft">in their own words</span>
            </>
          }
          description="A recurring theme runs through every review — compassion, patience, and clinical expertise that patients could feel at every session."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="rounded-2xl border border-border/60 bg-card/80 p-4 backdrop-blur">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-healing text-healing" />
              ))}
            </div>
            <div className="mt-1 text-sm">
              <span className="font-heading text-xl font-bold text-foreground">{BUSINESS.rating}</span>
              <span className="text-muted-foreground"> / 5 · {BUSINESS.reviewCount}+ reviews</span>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href={BUSINESS.social.google} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Google
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="relative mt-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name + i}
                className="min-w-0 shrink-0 grow-0 basis-full pl-0 sm:basis-1/2 sm:pl-5 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/85 p-6 shadow-premium backdrop-blur transition-colors hover:border-primary/40"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-royal/10 via-teal/10 to-healing/10 opacity-60 transition-opacity group-hover:opacity-100" />

                  <div className="relative flex items-center justify-between">
                    <Quote className="h-8 w-8 text-primary/30" />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-healing text-healing" />
                      ))}
                    </div>
                  </div>

                  <p className="relative mt-4 flex-1 text-sm leading-relaxed text-foreground">
                    “{r.text}”
                  </p>

                  <div className="relative mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                    <div
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-heading text-base font-bold text-white",
                        r.color,
                      )}
                    >
                      {r.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-heading text-sm font-bold text-foreground">
                        {r.name}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{r.condition}</div>
                    </div>
                    <span className="ml-auto rounded-full border border-border/70 bg-secondary/50 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                      Verified
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous review"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 backdrop-blur transition-colors hover:bg-accent/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
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
            aria-label="Next review"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 backdrop-blur transition-colors hover:bg-accent/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionWrap>
  );
}
