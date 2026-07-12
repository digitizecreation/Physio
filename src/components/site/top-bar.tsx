"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Phone, Clock, Calendar, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/site/data";
import { GoogleG, GoogleStar } from "@/components/site/google-brand";

/**
 * TopBar — a premium thin bar that sits above the main navbar.
 * Shows essential contact info + social proof at a glance.
 * Responsive: shows full info on desktop, compact on mobile.
 */
export function TopBar({ hidden }: { hidden: boolean }) {
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: hidden ? -50 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 hidden overflow-hidden border-b border-white/10 bg-gradient-to-r from-royal via-royal to-teal text-white sm:block"
    >
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs lg:px-8">
        {/* Left: phone + rating */}
        <div className="flex items-center gap-4">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-white/80"
          >
            <Phone className="h-3 w-3" />
            <span>{BUSINESS.phone}</span>
          </a>
          <span className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-1.5">
            <GoogleG className="h-3.5 w-3.5" />
            <GoogleStar className="h-3.5 w-3.5" />
            <span className="font-semibold">{BUSINESS.rating}</span>
            <span className="text-white/70">({BUSINESS.reviewCount}+)</span>
          </div>
        </div>

        {/* Right: hours + location + book */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 text-white/80 md:flex">
            <Clock className="h-3 w-3" />
            <span>Open 24×7</span>
          </div>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <div className="hidden items-center gap-1.5 text-white/80 lg:flex">
            <MapPin className="h-3 w-3" />
            <span>Kopar Khairane & Ghansoli</span>
          </div>
          <span className="hidden h-3 w-px bg-white/20 lg:block" />
          <a
            href="#appointment"
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-semibold transition-colors hover:bg-white/25"
          >
            <Calendar className="h-3 w-3" />
            <span>Book Appointment</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
