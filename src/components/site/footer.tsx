"use client";

import * as React from "react";
import { Activity, Phone, MessageCircle, MapPin, Clock, Mail, Star, Heart, X, Shield, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BUSINESS, SPECIALIZATIONS } from "@/lib/site/data";

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
  const [year, setYear] = React.useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/60 bg-gradient-to-b from-card/60 to-secondary/40">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-br from-royal/10 via-teal/8 to-healing/8 blur-3xl" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
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
            </a>

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
              © {year ?? 2025} Dr. Samrudhhi A. Mane — Physiotherapy. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setShowPrivacy(true)} className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button onClick={() => setShowTerms(true)} className="hover:text-foreground transition-colors">Terms</button>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
              <a href={BUSINESS.googlePlacesUri} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Google Reviews
              </a>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            Crafted with <Heart className="h-3 w-3 fill-healing text-healing" /> for healthier movement in Navi Mumbai.
          </p>
        </div>
      </div>

      <LegalDialog open={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy" icon={Shield}>
        <PrivacyContent />
      </LegalDialog>
      <LegalDialog open={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service" icon={FileText}>
        <TermsContent />
      </LegalDialog>
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
          <li key={l.label + i}>
            <a
              href={l.href}
              className="text-sm text-muted-foreground transition-all hover:text-foreground hover:translate-x-0.5 inline-block"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LegalDialog({
  open,
  onClose,
  title,
  icon: Icon,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border/60 bg-card p-6 shadow-premium sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-royal-teal text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border/70 text-foreground transition-colors hover:bg-accent/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PrivacyContent() {
  return (
    <>
      <p className="font-semibold text-foreground">Last updated: July 2025</p>
      <p>
        Dr. Samrudhhi A. Mane (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates this website to provide information about our physiotherapy services and to allow patients to request appointments. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.
      </p>
      <h3 className="font-heading font-bold text-foreground">Data We Collect</h3>
      <p>When you use the appointment booking form, we collect:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Your name</li>
        <li>Your phone number</li>
        <li>Your preferred appointment date and time</li>
        <li>Optional notes about your symptoms or condition</li>
      </ul>
      <h3 className="font-heading font-bold text-foreground">How We Use Your Data</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>To contact you and schedule your appointment</li>
        <li>To provide appropriate physiotherapy care during your visit</li>
        <li>To send appointment reminders (via phone or WhatsApp)</li>
      </ul>
      <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
      <h3 className="font-heading font-bold text-foreground">Data Retention</h3>
      <p>We retain your appointment data for the duration of your treatment and for a reasonable period thereafter for continuity of care. You may request deletion of your data at any time.</p>
      <h3 className="font-heading font-bold text-foreground">Your Rights</h3>
      <p>Under the DPDP Act, you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at {`care@drsamrudhhimane.in`} or call {`+91 97673 98194`}.</p>
      <h3 className="font-heading font-bold text-foreground">Cookies</h3>
      <p>This website uses local storage to remember your theme preference (light/dark mode). No tracking cookies or analytics scripts are used.</p>
      <h3 className="font-heading font-bold text-foreground">Contact</h3>
      <p>For privacy-related questions, contact: Dr. Samrudhhi A. Mane, Physiotherapy Center, Satyam Hospital, Sector 14, Kopar Khairane, Navi Mumbai, Maharashtra 400709. Phone: +91 97673 98194.</p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <p className="font-semibold text-foreground">Last updated: July 2025</p>
      <p>
        These Terms of Service govern your use of this website and the physiotherapy services provided by Dr. Samrudhhi A. Mane. By booking an appointment or using this website, you agree to these terms.
      </p>
      <h3 className="font-heading font-bold text-foreground">Medical Disclaimer</h3>
      <p>
        The information on this website is for general informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified physiotherapist regarding any medical condition. Never disregard professional medical advice because of something you read on this website.
      </p>
      <h3 className="font-heading font-bold text-foreground">Appointments</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>Appointments are confirmed via phone or WhatsApp.</li>
        <li>Please provide at least 2 hours notice for cancellations or rescheduling.</li>
        <li>Home visit availability is subject to location and scheduling.</li>
      </ul>
      <h3 className="font-heading font-bold text-foreground">No Guarantees</h3>
      <p>
        Physiotherapy outcomes vary by individual. While we strive for the best possible results, we do not guarantee specific outcomes or complete recovery from any condition.
      </p>
      <h3 className="font-heading font-bold text-foreground">Limitation of Liability</h3>
      <p>
        Dr. Samrudhhi A. Mane shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or the information provided herein.
      </p>
      <h3 className="font-heading font-bold text-foreground">Changes to Terms</h3>
      <p>We reserve the right to update these terms at any time. Continued use of the website constitutes acceptance of the updated terms.</p>
    </>
  );
}
