"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Activity, AlertCircle, TrendingDown, HeartPulse, ArrowRight } from "lucide-react";
import { SectionWrap, SectionHeading, Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function MiniTools() {
  return (
    <SectionWrap id="tools" className="relative overflow-hidden">
      <SectionHeading
        eyebrow="Mini Tools"
        title={
          <>
            Quick self-checks to{" "}
            <span className="gradient-text-soft">get started</span>
          </>
        }
        description="Two quick tools to understand your body before your first appointment."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <BmiCalculator />
        <PainAssessment />
      </div>
    </SectionWrap>
  );
}

function BmiCalculator() {
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [bmi, setBmi] = React.useState<number | null>(null);

  const compute = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      setBmi(null);
      return;
    }
    setBmi(parseFloat((w / (h * h)).toFixed(1)));
  };

  React.useEffect(() => {
    compute();
  }, [height, weight]);

  const category = bmi
    ? bmi < 18.5
      ? { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500" }
      : bmi < 25
        ? { label: "Healthy", color: "text-healing", bg: "bg-healing" }
        : bmi < 30
          ? { label: "Overweight", color: "text-amber-500", bg: "bg-amber-500" }
          : { label: "Obese", color: "text-red-500", bg: "bg-red-500" }
    : null;

  // position on scale (15-35 range mapped to 0-100%)
  const pct = bmi ? Math.min(Math.max(((bmi - 15) / 20) * 100, 0), 100) : 50;

  return (
    <Reveal>
      <div className="glass-card relative h-full overflow-hidden rounded-[2rem] p-6 shadow-premium sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-royal/15 to-teal/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-royal-teal text-white shadow-glow-royal">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">BMI Calculator</h3>
            <p className="text-xs text-muted-foreground">Body Mass Index — a quick health-context check</p>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="height" className="text-xs font-semibold text-muted-foreground">
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              inputMode="decimal"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="weight" className="text-xs font-semibold text-muted-foreground">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 68"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="relative mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
          </div>
          <div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-healing to-red-500">
            <motion.div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white bg-foreground shadow"
              animate={{ left: `${pct}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {bmi && category ? (
              <motion.div
                key={bmi}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-5 flex items-center justify-between rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur"
              >
                <div>
                  <div className="text-xs text-muted-foreground">Your BMI</div>
                  <div className="font-heading text-2xl font-bold text-foreground">{bmi}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Category</div>
                  <div className={cn("font-heading text-base font-bold", category.color)}>
                    {category.label}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-border/70 bg-card/40 p-4 text-center text-xs text-muted-foreground">
                Enter your height and weight to calculate
              </div>
            )}
          </AnimatePresence>
        </div>

        <p className="relative mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Note: BMI is a general indicator. Dr. Samrudhhi uses a fuller assessment at your first session.
        </p>
      </div>
    </Reveal>
  );
}

const PAIN_QUESTIONS = [
  { id: "q1", text: "Pain interferes with my daily activities", weight: 2 },
  { id: "q2", text: "Pain affects my sleep", weight: 2 },
  { id: "q3", text: "Pain has lasted more than 2 weeks", weight: 2 },
  { id: "q4", text: "Pain radiates down my arm or leg", weight: 3 },
  { id: "q5", text: "I have numbness or tingling", weight: 3 },
  { id: "q6", text: "Pain followed a recent injury or surgery", weight: 1 },
] as const;

function PainAssessment() {
  const [answers, setAnswers] = React.useState<Record<string, boolean>>({});
  const [score, setScore] = React.useState<number | null>(null);

  const toggle = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const assess = () => {
    const total = PAIN_QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ? q.weight : 0), 0);
    setScore(total);
  };

  const result =
    score === null
      ? null
      : score >= 7
        ? { label: "Seek physiotherapy soon", tone: "high", advice: "Your symptoms suggest a moderate-to-severe issue that would benefit from professional assessment. Book a session with Dr. Samrudhhi." }
        : score >= 3
          ? { label: "Consider an assessment", tone: "mid", advice: "There are some signs worth having looked at. A single assessment session can clarify what's going on and what to do next." }
          : score > 0
            ? { label: "Likely mild — monitor", tone: "low", advice: "Your symptoms appear mild. Self-care, gentle movement and ergonomic adjustments may help. If things don't improve in a week, book a session." }
            : { label: "Select your symptoms", tone: "low", advice: "Tick the statements that apply to you, then run the assessment." };

  return (
    <Reveal delay={0.05}>
      <div className="glass-card relative h-full overflow-hidden rounded-[2rem] p-6 shadow-premium sm:p-8">
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-healing/15 to-teal/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-healing text-white shadow-glow-healing">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Pain Self-Assessment</h3>
            <p className="text-xs text-muted-foreground">Quick check — when to seek help</p>
          </div>
        </div>

        <p className="relative mt-4 text-xs text-muted-foreground">
          Tick all statements that apply to you right now.
        </p>

        <div className="relative mt-4 space-y-2">
          {PAIN_QUESTIONS.map((q) => {
            const checked = !!answers[q.id];
            return (
              <button
                key={q.id}
                onClick={() => toggle(q.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                  checked
                    ? "border-primary/50 bg-primary/10"
                    : "border-border/60 bg-card/50 hover:bg-card/80",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors",
                    checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background",
                  )}
                >
                  {checked && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                    >
                      <path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </span>
                <span className="text-sm text-foreground">{q.text}</span>
              </button>
            );
          })}
        </div>

        <Button onClick={assess} className="relative mt-5 w-full gap-2">
          <HeartPulse className="h-4 w-4" />
          Assess my pain
        </Button>

        <AnimatePresence mode="wait">
          {result && score !== null && (
            <motion.div
              key={score}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "relative mt-5 rounded-2xl border p-4",
                result.tone === "high"
                  ? "border-red-500/30 bg-red-500/10"
                  : result.tone === "mid"
                    ? "border-amber-500/30 bg-amber-500/10"
                    : "border-healing/30 bg-healing/10",
              )}
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0",
                    result.tone === "high" ? "text-red-500" : result.tone === "mid" ? "text-amber-500" : "text-healing",
                  )}
                />
                <div>
                  <div className="font-heading text-sm font-bold text-foreground">{result.label}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{result.advice}</p>
                  {(result.tone === "high" || result.tone === "mid") && (
                    <Button asChild size="sm" className="mt-3 gap-1.5">
                      <a href="#appointment">
                        Book appointment
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="relative mt-4 flex items-center gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
          <TrendingDown className="h-3 w-3" />
          This self-check is informational only — not a clinical diagnosis.
        </p>
      </div>
    </Reveal>
  );
}
