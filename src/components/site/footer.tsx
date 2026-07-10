"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Phone, MessageCircle, MapPin, Clock, Mail, Star, Heart } from "lucide-react";
import { BUSINESS, NAV_LINKS, SPECIALIZATIONS } from "@/lib/site/data";

const quickLinks = [
  { href: "#about", label: "About Dr. Samrudhhi" },
  { href: "#specializations", label: "Specializations" },
  { href: "#process", label: "Treatment Process" },
  { href: "#reviews", label: "Patient Reviews" },
  { href: "#home-visit", label: "Home Visits" },
  { href: "#appointment", label: "Book Appointment" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const treatmentLinks = SPECIALIZATIONS.slice(0, 10).map((s) => ({
  href: "#appointment",
  label: s.title,
}));

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/60 bg-gradient-to-b from-card/60 to-secondary/40">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-br from-royal/10 via-teal/8 to-healing/8 blur-3xl" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="#top" className="flex items-center gap-2.5">
              <span className="relative grid h-11 w-11 place-items-center rounded-xl gradient-royal-teal text-white shadow-glow-royal">
                <Activity className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-healing ring-2 ring-background" />
              </span>
              <div className="leading-tight">
                <div className="font-heading text-base font-bold text-foreground">
                  Dr. Samrudhhi A. Mane
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  Physiotherapist • Navi Mumbai
                </div>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Evidence-based physiotherapy for knee, back, neck pain, sports injuries, post-surgery rehabilitation and home visits across Kopar Khairane, Ghansoli and nearby Navi Mumbai.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
                <Star className="h-3.5 w-3.5 fill-healing text-healing" />
                4.9 / 5
                <span className="text-muted-foreground">• 155+</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
                <Clock className="h-3.5 w-3.5 text-healing" />
                Open 24×7
              </div>
            </div>
          </div>

          {/* Quick links */}
          <FooterCol title="Quick Links" links={quickLinks} />

          {/* Treatments */}
          <FooterCol title="Treatments" links={treatmentLinks} />

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-foreground">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={BUSINESS.phoneHref} className="group flex items-start gap-3 text-muted-foreground hover:text-foreground">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="font-medium">{BUSINESS.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="group flex items-start gap-3 text-muted-foreground hover:text-foreground">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="break-all">{BUSINESS.email}</span>
                </a>
              </li>
              <li>
                <a href={BUSINESS.mapsLink} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-muted-foreground hover:text-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{BUSINESS.address.full}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-healing" />
                <span>Open 24 Hours • 7 Days a Week</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a
                href={BUSINESS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-healing/40 bg-healing/10 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-healing/20"
              >
                <MessageCircle className="h-3.5 w-3.5 text-healing" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-border/60 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {new Date().getFullYear()} Dr. Samrudhhi A. Mane — Physiotherapy. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#contact" className="hover:text-foreground">Contact</Link>
              <Link href={BUSINESS.social.google} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Google Reviews
              </Link>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            Crafted with <Heart className="h-3 w-3 fill-healing text-healing" /> for healthier movement in Navi Mumbai.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l, i) => (
          <motion.li
            key={l.label + i}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
