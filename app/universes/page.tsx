import { prisma } from "@/lib/prisma";
import { UniverseCard } from "@/components/universe-card";
import { SectionLabel } from "@/components/section-label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function UniversesPage() {
  const universes = await prisma.universe.findMany({
    include: { releases: { orderBy: { date: "desc" } }, products: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <SectionLabel text="Universes" />
          <h1 className="font-display text-4xl">Artist universes are contracts of taste.</h1>
          <p className="text-neutral-700">
            WORM and TARNS set the boundaries for what’s considered canon. Each output must obey their rules, colors, and
            signatures. Explore releases, drops, and generation guardrails.
          </p>
        </div>
        <Link href="/app/generate">
          <Button variant="outline">Generate inside a universe</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {universes.map((universe) => (
          <UniverseCard key={universe.id} {...universe} />
        ))}
      </div>
    </div>
  );
}
