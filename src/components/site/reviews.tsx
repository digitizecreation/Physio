"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SectionWrap, SectionHeading } from "@/components/site/reveal";
import { REVIEWS, BUSINESS } from "@/lib/site/data";
import { Button } from "@/components/ui/button";
import { GoogleG, GoogleStar } from "@/components/site/google-brand";
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
    const denoise = embla.on("select", onSelect);
    onSelect();
    return () => denoise?.();
  }, [embla, onSelect]);

  // autoplay — pauses on hover/focus/interaction
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
    return stopAutoplay;
  }, [embla, startAutoplay, stopAutoplay]);

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
          description="Compassion, patience and clinical expertise — themes patients return to again and again."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="rounded-2xl border border-border/60 bg-card/80 p-4 backdrop-blur">
            <div className="flex items-center gap-1.5">
              {/* Google-style yellow stars (#FBBC05) */}
              {[0, 1, 2, 3, 4].map((i) => (
                <GoogleStar key={i} className="h-4 w-4" />
              ))}
            </div>
            <div className="mt-1 text-sm">
              <span className="font-heading text-xl font-bold text-foreground">{BUSINESS.rating}</span>
              <span className="text-muted-foreground"> / 5 · {BUSINESS.reviewCount}+ reviews</span>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href={BUSINESS.googlePlacesUri} target="_blank" rel="noopener noreferrer">
              <GoogleG className="h-4 w-4" />
              <span>Google</span>
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="relative mt-12">
        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          onFocus={stopAutoplay}
          onBlur={startAutoplay}
        >
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
                    <GoogleG className="h-7 w-7" />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, k) => (
                        <GoogleStar key={k} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                  </div>

                  <p className="relative mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-foreground">
                    “{r.text}”
                  </p>

                  <div className="relative mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                    <ReviewerAvatar review={r} />
                    <div className="min-w-0 flex-1">
                      <a
                        href={r.profileUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate font-heading text-sm font-bold text-foreground hover:text-primary"
                        title={`View ${r.name}'s Google profile`}
                      >
                        {r.name}
                      </a>
                      <div className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                        <span className="truncate">{r.condition}</span>
                        <span aria-hidden>•</span>
                        <span className="shrink-0">{r.relativeTime}</span>
                      </div>
                    </div>
                    <span
                      className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-healing/30 bg-healing/10 px-2.5 py-1 text-[10px] font-semibold text-foreground"
                      title="Verified Google review"
                    >
                      <GoogleG className="h-3 w-3" />
                      Google
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

/**
 * Avatar that prefers the Google profile photo and gracefully falls back
 * to a colored initial-letter avatar if the image fails to load.
 */
function ReviewerAvatar({
  review,
}: {
  review: {
    name: string;
    initial: string;
    color: string;
    photoUri?: string;
  };
}) {
  const [errored, setErrored] = React.useState(false);
  const showImg = review.photoUri && !errored;

  return (
    <div className="relative shrink-0">
      {showImg ? (
        <img
          src={review.photoUri}
          alt={`${review.name}'s Google profile photo`}
          width={44}
          height={44}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className="h-11 w-11 rounded-full border border-border/70 object-cover shadow-sm"
        />
      ) : (
        <div
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-heading text-base font-bold text-white shadow-sm",
            review.color,
          )}
          aria-hidden
        >
          {review.initial}
        </div>
      )}
      <span
        className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-white ring-1 ring-border"
        title="Google reviewer"
        aria-hidden
      >
        <GoogleG className="h-2.5 w-2.5" />
      </span>
    </div>
  );
}
