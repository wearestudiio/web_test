// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { startGeneration, completeGenerationFromSession } from "./actions";
import { Stamp } from "@/components/stamp";
import { SectionLabel } from "@/components/section-label";

export const dynamic = "force-dynamic";

export default async function GeneratePage({ searchParams }: { searchParams: { session_id?: string; cancelled?: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p>Please sign in to generate.</p>
      </div>
    );
  }

  const universes = await prisma.universe.findMany();
  let completedWork = null;
  if (searchParams.session_id) {
    completedWork = await completeGenerationFromSession(searchParams.session_id);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr,0.9fr]">
      <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <SectionLabel text="Generate" />
        <h1 className="font-display text-3xl">Commission a signed pop package</h1>
        <p className="text-neutral-700">
          Choose the universe, package type, and notes. If Stripe keys are set, you’ll check out before generation.
          Otherwise, demo mode will generate immediately.
        </p>
        <form action={startGeneration} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-neutral-700">Universe</label>
            <select
              name="universeId"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
            >
              {universes.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-neutral-700">Package</label>
            <select
              name="type"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
            >
              <option>Personalized Song Kit</option>
              <option>Photoshoot Concept</option>
              <option>Video Treatment</option>
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-neutral-700">Occasion</label>
              <input
                required
                name="occasion"
                className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
                placeholder="tour opener, gift, pop-up"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-neutral-700">Mood</label>
              <input
                required
                name="mood"
                className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
                placeholder="iridescent, alpine, soft aggression"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-neutral-700">References</label>
            <input
              name="references"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              placeholder="sounds, visuals, feelings"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-neutral-700">Do / Don’t notes</label>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              placeholder="Keep bass tactile, avoid syrupy pads…"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Continue to checkout
          </button>
          <p className="text-xs text-neutral-600">
            After payment (or demo), the work is generated, signed, and written to the registry.
          </p>
        </form>
      </div>

      <div className="space-y-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
        <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Result</p>
        {searchParams.cancelled && <p className="text-sm text-red-600">Checkout cancelled.</p>}
        {completedWork ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">{completedWork.type}</h2>
              <Stamp state={completedWork.chainTxHash ? "verified" : "demo"} />
            </div>
            <p className="text-sm text-neutral-700">Work ID: {completedWork.id}</p>
            <p className="text-sm text-neutral-700">Hash: {completedWork.hash}</p>
            <div className="rounded-xl border border-neutral-200 bg-white p-3 text-sm">
              <pre className="whitespace-pre-wrap text-xs text-neutral-800">
                {JSON.stringify(completedWork.outputJson, null, 2)}
              </pre>
            </div>
            <p className="text-xs text-neutral-500">
              Signature stored: {completedWork.signature.slice(0, 24)}…
            </p>
          </div>
        ) : (
          <p className="text-sm text-neutral-700">After checkout your signed package will render here.</p>
        )}
      </div>
    </div>
  );
}
