import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const accentByUniverse: Record<string, string> = {
  worm: "accent-worm",
  tarns: "accent-tarns",
};

export function formatCurrency(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function shortId(id: string) {
  return `${id.slice(0, 6)}…${id.slice(-4)}`;
}
