import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Test comment for the post-commit hook end-to-end verification (2026-07-13)
// Second test comment to verify the hook fires repeatedly (2026-07-13)
