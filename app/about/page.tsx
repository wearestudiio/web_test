import { SectionLabel } from "@/components/section-label";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <SectionLabel text="About" />
      <h1 className="font-display text-4xl">studiio is an artist-first platform for signed pop packages.</h1>
      <p className="text-neutral-700">
        We believe in human taste, scaled by AI. Each universe sets its code of conduct; every fan request is filtered
        through those rules before it’s considered canon. We mix editorial design, museum-grade placards, and practical
        tools to keep the workflow premium yet fast.
      </p>
      <p className="text-neutral-700">
        The MVP runs locally: Postgres for state, Stripe in test mode for payments, OpenAI if you add a key (otherwise a
        deterministic generator), and a Hardhat/Anvil registry for provenance. Developers can boot everything with one
        docker-compose command and a single deploy script for the contract.
      </p>
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">Manifesto, condensed</p>
        <ul className="mt-3 space-y-2 text-sm text-neutral-800">
          <li>• Taste contracts over endless prompts.</li>
          <li>• Sign everything—hash, signature, registry.</li>
          <li>• Pay collaborators fairly, credit visibly.</li>
          <li>• Keep the interface light, editorial, and accessible.</li>
        </ul>
      </div>
    </div>
  );
}
