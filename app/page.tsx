// @ts-nocheck
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
import { UniverseCard } from "@/components/universe-card";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

export const dynamic = "force-dynamic";

const contentTypes = [
  {
    title: "Personalized Song Kit",
    description: "Lyrics, title, tempo math, production notes, and cover sketch tuned to the universe contract.",
  },
  {
    title: "Photoshoot Concept",
    description: "Creative direction with shot list, wardrobe palette, lighting recipe, and collaborator pairings.",
  },
  {
    title: "Video Treatment",
    description: "Short-form cinematic narrative, storyboard beats, signature seal frames, and CTA locking.",
  },
];

export default async function Home() {
  const universes = await prisma.universe.findMany({
    include: { releases: { orderBy: { date: "desc" }, take: 2 }, products: { orderBy: { createdAt: "desc" }, take: 2 } },
  });
  const products = await prisma.product.findMany({ include: { universe: true }, take: 4 });

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-12">
      <section className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <SectionLabel text="Studiio / Human taste, scaled by AI" />
          <h1 className="font-display text-5xl leading-tight tracking-tight md:text-6xl">
            On-demand pop packages, signed and anchored on-chain.
          </h1>
          <p className="text-lg text-neutral-700">
            studiio is the artist-first atelier where universes set the rules. Fans commission personalized work, artists
            approve collaborators, and every official output ships with a cryptographic signature. If it isn’t signed, it
            isn’t canon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/universes">
              <Button size="lg">Explore Universes</Button>
            </Link>
            <Link href="/app/generate">
              <Button size="lg" variant="outline">
                Generate
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 pt-4 text-xs text-neutral-600">
            <Pill>CAPTION / 001</Pill>
            <span>Authenticity: Work hash + signature + registry entry</span>
          </div>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.06)] backdrop-blur">
          <p className="text-sm font-mono uppercase tracking-[0.16em] text-neutral-500">Studio Note</p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-800">
            “Each universe is a contract of taste. We don’t chase endless prompts; we choreograph boundaries. Fans enter,
            choose their package, and leave with work that feels bespoke yet unmistakably canon. The stamp is proof.”
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="font-display text-xl">2</p>
              <p className="text-neutral-600">Founding universes</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="font-display text-xl">10k</p>
              <p className="text-neutral-600">Mock on-chain capacity (local)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <SectionLabel text="Two founding universes" />
        <div className="grid gap-6 md:grid-cols-2">
          {universes.map((universe) => (
            <UniverseCard key={universe.id} {...universe} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <SectionLabel text="On-demand pop packages" />
            <h2 className="mt-3 font-display text-3xl">Pick a format, the universe handles the taste.</h2>
          </div>
          <Link href="/app/generate">
            <Button variant="outline">Generate inside a universe</Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contentTypes.map((item) => (
            <div key={item.title} className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5">
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-600">package</p>
              <h3 className="mt-2 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
          <SectionLabel text="Authenticity" />
          <h3 className="font-display text-3xl">If it isn’t signed, it isn’t canon.</h3>
          <p className="text-sm text-neutral-700">
            Every output is hashed, signed with the universe key, and anchored on a registry contract. Fans can paste a
            work ID or hash on the verify page to view provenance. No key? Demo mode still signs locally so reviewers can
            see the flow.
          </p>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li>• Hash of the canonical JSON</li>
            <li>• Signature from the universe signer</li>
            <li>• Registry entry on the local chain (Hardhat/Anvil)</li>
          </ul>
          <Link href="/authenticity">
            <Button className="mt-4" variant="outline">
              Learn the signature system
            </Button>
          </Link>
        </div>
        <div className="space-y-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-7">
          <SectionLabel text="Drops & collaborations" />
          <p className="text-lg text-neutral-800">
            Limited drops, couture assets, and collaborator pairings built for each universe. Stripe test checkout is
            ready; if keys are missing, demo checkout still creates orders.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                title={product.title}
                description={product.description}
                priceCents={product.priceCents}
                imageSvg={product.images[0]}
                universe={product.universe.name}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">For Artists</p>
          <h3 className="font-display text-2xl">Curate your universe</h3>
          <p className="text-sm text-neutral-700">
            Approve collaborators, launch drops, and keep every output on-brand via signature guardrails.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">For Collaborators</p>
          <h3 className="font-display text-2xl">Show your portfolio</h3>
          <p className="text-sm text-neutral-700">
            Create a collaborator profile, share disciplines, and receive requests from universe owners.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">For Fans</p>
          <h3 className="font-display text-2xl">Commission safely</h3>
          <p className="text-sm text-neutral-700">
            Pay a small fee, generate, and verify the work hash anytime. Library keeps orders, drops, and works together.
          </p>
        </div>
      </section>
    </div>
  );
}
