"use client";

import {
  Activity,
  Bone,
  Home,
  HeartPulse,
  HeartHandshake,
  UserCheck,
  Microscope,
  Gauge,
  ShieldPlus,
  Award,
  BookOpen,
  TrendingUp,
  Scale,
  Disc3,
  PersonStanding,
  type LucideIcon,
} from "lucide-react";

// Map our icon keys to actual Lucide icons.
// Where Lucide lacks a domain icon, we substitute a sensible one.
export const ICON_MAP: Record<string, LucideIcon> = {
  // Specializations
  Bone,
  Activity,
  Disc: Disc3,
  Neck: HeartPulse,
  Cervical: HeartPulse,
  Shoulder: Bone,
  Nerve: Activity,
  Muscle: Activity,
  Joint: Bone,
  Scale,
  Posture: PersonStanding,
  Elderly: HeartHandshake,
  Home,
  HeartPulse,

  // Why choose
  UserCheck,
  Microscope,
  HeartHandshake,
  Gauge,
  ShieldPlus,
  Award,
  BookOpen,
  TrendingUp,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICON_MAP[name] ?? Activity;
  return <Cmp className={className} />;
}
