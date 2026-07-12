"use client";

import { Phone, Clock, Calendar, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/site/data";
import { GoogleG, GoogleStar } from "@/components/site/google-brand";

/**
 * TopBar — a premium thin bar that sits above the main navbar.
 * Shows essential contact info + social proof at a glance.
 * Responsive: shows full info on desktop, compact on tablet, hidden on mobile.
 *
 * The show/hide animation is handled by the parent <motion.header> in navbar.tsx,
 * so this is a plain <div> (no redundant transform animation).
 */
export function TopBar() {
  return (
    <div className="relative z-50 hidden overflow-hidden border-b border-white/10 bg-royal text-white sm:block">
      {/* Subtle decorative gradient accent on the right — purely visual, no text over it */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-teal/30 to-transparent" aria-hidden />

      <div className="relative mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs lg:px-8">
        {/* Left: phone + rating */}
        <div className="flex items-center gap-4">
          {/* Phone link hidden on sm (navbar already has Call button); visible from md */}
          <a
            href={BUSINESS.phoneHref}
            className="hidden items-center gap-1.5 font-medium transition-colors hover:text-white/80 md:flex"
          >
            <Phone className="h-3 w-3" />
            <span>{BUSINESS.phone}</span>
          </a>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <div className="flex items-center gap-1.5">
            <GoogleG className="h-3.5 w-3.5" />
            <GoogleStar className="h-3.5 w-3.5" />
            <span className="font-semibold">{BUSINESS.rating}</span>
            <span className="text-white/80">({BUSINESS.reviewCount}+)</span>
          </div>
        </div>

        {/* Right: hours + location + book */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 text-white/90 md:flex">
            <Clock className="h-3 w-3" />
            <span>Open 24×7</span>
          </div>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <div className="hidden items-center gap-1.5 text-white/90 lg:flex">
            <MapPin className="h-3 w-3" />
            <span>Kopar Khairane & Ghansoli</span>
          </div>
          <span className="hidden h-3 w-px bg-white/20 lg:block" />
          <a
            href="#appointment"
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 font-semibold transition-colors hover:bg-white/30"
          >
            <Calendar className="h-3 w-3" />
            <span>Book Appointment</span>
          </a>
        </div>
      </div>
    </div>
  );
}
