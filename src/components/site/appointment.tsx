"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Phone, MessageCircle, MapPin, Mail, CheckCircle2, Home } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import { BUSINESS } from "@/lib/site/data";
import { CalendlyEmbed } from "@/components/site/calendly-embed";

export function Appointment() {
  return (
    <SectionWrap id="appointment" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-royal/20 to-transparent blur-3xl" aria-hidden />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-card/95 via-card/80 to-secondary/40 p-6 shadow-premium backdrop-blur sm:p-10 lg:p-14">
        {/* grid-cols-1 (minmax(0,1fr)) lets the mobile track shrink below the
            booking iframe's intrinsic 300px width so phones never clip the
            card; lg restores the two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Left: copy + contact rails */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Book Appointment"
              title={
                <>
                  Take the first step{" "}
                  <span className="gradient-text-soft">towards recovery</span>
                </>
              }
              description="Book your assessment in under a minute. Same-day slots often available."
            />

            <Reveal delay={0.1}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <ContactRail
                  icon={<Phone className="h-4 w-4" />}
                  label="Call Now"
                  value={BUSINESS.phone}
                  href={BUSINESS.phoneHref}
                  color="from-royal to-teal"
                />
                <ContactRail
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="WhatsApp"
                  value="Chat with Dr. Samrudhhi"
                  href={BUSINESS.whatsappHref}
                  external
                  color="from-healing to-teal"
                />
                <ContactRail
                  icon={<MapPin className="h-4 w-4" />}
                  label="Visit Clinic"
                  value="Satyam Hospital, Kopar Khairane"
                  href={BUSINESS.mapsLink}
                  external
                  color="from-teal to-royal"
                />
                <ContactRail
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={BUSINESS.email}
                  href={`mailto:${BUSINESS.email}`}
                  color="from-royal to-healing"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  Open 24×7
                </span>
                <span className="flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 text-primary" />
                  Home visits available
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-healing" />
                  4.9★ (155+ reviews)
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: Calendly booking scheduler */}
          <Reveal delay={0.1} className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-premium backdrop-blur">
              <div className="flex items-center justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-7">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Appointment details
                </div>
                <span className="shrink-0 rounded-full border border-border/70 bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  30 minutes
                </span>
              </div>
              <div className="mt-4 sm:px-7">
                <CalendlyEmbed />
              </div>
              <p className="px-5 pb-5 pt-3 text-center text-[11px] text-muted-foreground sm:px-7 sm:pb-7">
                No payment required — you&rsquo;ll receive an instant confirmation by email.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrap>
  );
}

function ContactRail({
  icon,
  label,
  value,
  href,
  external,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur transition-colors hover:border-primary/40"
    >
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
        <div className="truncate text-sm font-bold text-foreground">{value}</div>
      </div>
    </motion.a>
  );
}
