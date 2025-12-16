import Stripe from "stripe";

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-12-18.acacia" as any });
}

export const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

export const generationPriceCents = 1200;

export function demoStripeMessage() {
  return "Demo checkout active (Stripe keys not configured).";
}
