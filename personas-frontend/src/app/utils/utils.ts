import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

// Merge classes without clashing or duplicating
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}