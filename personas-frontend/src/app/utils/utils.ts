import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

// Merge classes without clashing or duplicating
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === "";
}

export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}