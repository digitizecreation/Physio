"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, Navigation, Mail, ExternalLink } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/site/data";

export function Contact() {
  return (
    <SectionWrap id="contact" className="relative overflow-hidden bg-secondary/30">
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-teal/15 to-transparent blur-3xl" aria-hidden />

      <SectionHeading
        eyebrow="Visit Us"
        title={
          <>
            Find us in the heart of{" "}
            <span className="gradient-text-soft">Navi Mumbai</span>
          </>
        }
        description="Inside Satyam Hospital, Sector 14, Kopar Khairane — accessible from Ghansoli, Vashi and Airoli."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: contact details */}
        <div className="space-y-4">
          <Reveal>
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              color="from-royal to-teal"
              label="Address"
            >
              <p className="font-heading text-base font-bold text-foreground">{BUSINESS.address.line1}</p>
              <p className="text-sm text-muted-foreground">
                {BUSINESS.address.line2}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.pincode}
              </p>
              <Button asChild size="sm" variant="outline" className="mt-3 gap-2">
                <a href={BUSINESS.mapsLink} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-3.5 w-3.5" />
                  Get directions
                </a>
              </Button>
            </ContactCard>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                color="from-teal to-healing"
                label="Phone"
              >
                <a href={BUSINESS.phoneHref} className="block text-sm font-bold text-foreground hover:text-primary">
                  {BUSINESS.phone}
                </a>
                <p className="text-xs text-muted-foreground">Tap to call</p>
              </ContactCard>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                color="from-healing to-royal"
                label="Email"
              >
                <a href={`mailto:${BUSINESS.email}`} className="block text-sm font-bold text-foreground hover:text-primary break-all">
                  {BUSINESS.email}
                </a>
                <p className="text-xs text-muted-foreground">Reply within hours</p>
              </ContactCard>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactCard
              icon={<Clock className="h-5 w-5" />}
              color="from-royal to-healing"
              label="Business Hours"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-healing opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-healing" />
                </span>
                <p className="font-heading text-base font-bold text-foreground">{BUSINESS.hours}</p>
              </div>
              <p className="text-xs text-muted-foreground">Emergency appointments available</p>
            </ContactCard>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="gap-2 shadow-glow-royal">
                <a href={BUSINESS.phoneHref}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-healing/30 bg-healing/10 text-foreground hover:bg-healing/20">
                <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 text-healing" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <a href={BUSINESS.mapsLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open in Maps
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Right: map */}
        <Reveal delay={0.1}>
          <div className="relative h-full min-h-[380px] overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-premium backdrop-blur">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full glass px-3 py-2 text-xs font-semibold text-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Satyam Hospital, Kopar Khairane
            </div>
            <iframe
              title="Dr. Samrudhhi A. Mane — Clinic Location"
              src={BUSINESS.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </SectionWrap>
  );
}

function ContactCard({
  icon,
  color,
  label,
  children,
}: {
  icon: React.ReactNode;
  color: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-premium backdrop-blur sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </motion.div>
  );
}
