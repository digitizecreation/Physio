"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, MessageCircle, MapPin, Mail, Send, CheckCircle2, Loader2, Home, ChevronRight, X, Shield } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/site/data";

const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
  "07:00 PM", "08:00 PM",
];

const CONDITIONS_LIST = [
  "Knee Pain",
  "Back Pain",
  "Neck Pain",
  "Shoulder Pain",
  "ACL Rehab",
  "Sports Injury",
  "Post-Surgery Rehab",
  "Home Visit",
  "Other",
];

export function Appointment() {
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = React.useState<string | null>(null);
  const [homeVisit, setHomeVisit] = React.useState(false);
  const [date, setDate] = React.useState<string>("");
  const [consent, setConsent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [today, setToday] = React.useState<string>("");
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", phone: "", notes: "" });

  React.useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !consent) return;
    setSubmitting(true);
    // Simulate async submit — wire to real backend (API route / WhatsApp) when ready
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1100);
  };

  return (
    <SectionWrap id="appointment" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-royal/20 to-transparent blur-3xl" aria-hidden />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-card/95 via-card/80 to-secondary/40 p-6 shadow-premium backdrop-blur sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
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

          {/* Right: form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-premium backdrop-blur sm:p-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-3 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="grid h-16 w-16 place-items-center rounded-full gradient-healing text-white shadow-glow-healing"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>
                  <h3 className="font-heading text-xl font-bold text-foreground">Request received!</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thank you. Dr. Samrudhhi's team will confirm shortly. For urgent matters, please call or WhatsApp.
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    <Button asChild size="sm" variant="outline" className="gap-2">
                      <a href={BUSINESS.phoneHref}>
                        <Phone className="h-3.5 w-3.5" /> Call instead
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSubmitted(false);
                        setSelectedSlot(null);
                        setSelectedCondition(null);
                        setDate("");
                      }}
                    >
                      Book another
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    Appointment details
                  </div>

                  {/* Name + Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                        Full name
                      </Label>
                      <div className="relative mt-1.5">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="name" required maxLength={80} placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="pl-9" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs font-semibold text-muted-foreground">
                        Phone
                      </Label>
                      <div className="relative mt-1.5">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="phone" required type="tel" maxLength={15} pattern="[+]?[0-9\s-]{8,15}" placeholder="e.g. +91 98765 43210" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="pl-9" />
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <Label htmlFor="date" className="text-xs font-semibold text-muted-foreground">
                      Preferred date
                    </Label>
                    <div className="relative mt-1.5">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        min={today}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* Time slot */}
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground">Preferred time</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "rounded-lg border px-2 py-2 text-[11px] font-medium transition-colors sm:text-xs",
                            selectedSlot === slot
                              ? "border-primary bg-primary text-primary-foreground shadow-glow-royal"
                              : "border-border/70 bg-background hover:bg-accent/15",
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition chips */}
                  <div>
                    <Label className="text-xs font-semibold text-muted-foreground">What's troubling you?</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {CONDITIONS_LIST.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSelectedCondition(c)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                            selectedCondition === c
                              ? "border-healing bg-healing/15 text-foreground"
                              : "border-border/70 bg-background hover:bg-accent/15",
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Home visit toggle */}
                  <button
                    type="button"
                    onClick={() => setHomeVisit((v) => !v)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                      homeVisit
                        ? "border-healing/50 bg-healing/10"
                        : "border-border/70 bg-background hover:bg-accent/15",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors",
                        homeVisit ? "gradient-healing text-white" : "bg-secondary text-muted-foreground",
                      )}
                    >
                      <Home className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-foreground">I need a home visit</span>
                      <span className="block text-[11px] text-muted-foreground">
                        Available across Kopar Khairane & Ghansoli
                      </span>
                    </span>
                    <span
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        homeVisit ? "bg-healing" : "bg-border",
                      )}
                    >
                      <motion.span
                        layout
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow",
                          homeVisit ? "left-[1.4rem]" : "left-0.5",
                        )}
                      />
                    </span>
                  </button>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-xs font-semibold text-muted-foreground">
                      Anything else? (optional)
                    </Label>
                    <Textarea
                      id="notes"
                      rows={3}
                      maxLength={500}
                      placeholder="Briefly describe your symptoms..."
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      className="mt-1.5 resize-none"
                    />
                  </div>

                  {/* Consent checkbox */}
                  <label className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-card/50 p-3 text-xs text-muted-foreground cursor-pointer hover:bg-card/80 transition-colors">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                    />
                    <span>
                      I agree to be contacted about my appointment and accept the{" "}
                      <button type="button" onClick={() => setShowPrivacy(true)} className="font-semibold text-primary underline">
                        Privacy Policy
                      </button>
                      . My data will be used solely for scheduling and treatment.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    disabled={submitting || !selectedSlot || !consent}
                    className="w-full gap-2 shadow-glow-royal"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending request...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Confirm appointment request
                      </>
                    )}
                  </Button>

                  {!selectedSlot && (
                    <p className="text-center text-[11px] text-muted-foreground">
                      Please select a preferred time slot.
                    </p>
                  )}

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <ChevronRight className="h-3 w-3" />
                    No payment required — we confirm availability before your visit.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <PrivacyDialog open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </SectionWrap>
  );
}

function PrivacyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          aria-label="Privacy Policy"
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
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">Privacy Policy</h2>
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
              <p className="font-semibold text-foreground">Last updated: July 2025</p>
              <p>
                Dr. Samrudhhi A. Mane (&ldquo;we&rdquo;) collects your name, phone number, and optional symptom notes solely to schedule and provide physiotherapy appointments. We do not sell or share your data with third parties for marketing.
              </p>
              <p>
                Under the Digital Personal Data Protection Act, 2023 (DPDP Act), you have the right to access, correct, or delete your personal data. Contact us at {BUSINESS.email} or {BUSINESS.phone} to exercise these rights.
              </p>
              <p>
                This website uses local storage only for your theme preference. No tracking cookies or analytics scripts are used.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
