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
  type LucideIcon,
} from "lucide-react";

// Map our icon keys to actual Lucide icons.
// Where Lucide lacks a domain icon, we substitute a sensible one.
export const ICON_MAP: Record<string, LucideIcon> = {
  // Specializations
  Knee: Bone,
  Activity,
  Bone,
  Disc: Bone, // slip disc — closest
  Neck: HeartPulse,
  Cervical: HeartPulse,
  Shoulder: Bone,
  Nerve: Activity,
  Muscle: Activity,
  Scale,
  Posture: UserCheck,
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
