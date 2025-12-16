import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    name: "Fan",
    price: "$12 per generation",
    features: ["Choose universe + package", "Stripe test checkout or demo mode", "Signed work with hash + registry link"],
  },
  {
    name: "Collaborator",
    price: "$0 to list",
    features: ["Portfolio page", "Collab requests from artists/admins", "Access to collaborator-only drops"],
  },
  {
    name: "Artist / Admin",
    price: "$220 / month",
    features: ["Universe management", "Drops dashboard", "Signature keys + registry controls"],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <SectionLabel text="Pricing" />
      <h1 className="font-display text-4xl">Simple, transparent tiers.</h1>
      <p className="text-neutral-700">Start in demo mode, then drop in real keys when ready to process payments.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">{tier.name}</p>
            <p className="mt-2 font-display text-2xl">{tier.price}</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {tier.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link href="/auth/register">
        <Button>Start a profile</Button>
      </Link>
    </div>
  );
}
