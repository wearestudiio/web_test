import { prisma } from "@/lib/prisma";
import { SectionLabel } from "@/components/section-label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CollaboratePage() {
  const collaborators = await prisma.collaboratorProfile.findMany({ take: 6 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <SectionLabel text="Collaborator Program" />
      <h1 className="font-display text-4xl">Studio-grade collaborators, selected by universes.</h1>
      <p className="text-neutral-700">
        Fashion designers, visual artists, engineers, choreographers—create a profile and be invited into WORM or TARNS
        drops. Artists approve who can touch the canon.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {collaborators.map((collab) => (
          <div key={collab.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Collaborator</p>
            <h3 className="font-display text-xl">{collab.displayName}</h3>
            <p className="text-sm text-neutral-700">{collab.bio}</p>
            <p className="mt-2 text-xs text-neutral-500">{collab.disciplines.join(" · ")}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">Join</p>
        <p className="mt-2 text-neutral-700">
          Create an account, choose the collaborator role, and attach your portfolio. Artists and admins can request
          collaborations directly from the app.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/auth/register?role=COLLABORATOR">
            <Button>Sign up as collaborator</Button>
          </Link>
          <Link href="/app/collaborators">
            <Button variant="outline">Browse in app</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
