// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { verifyChainRecord } from "@/lib/blockchain";
import { SectionLabel } from "@/components/section-label";
import { Stamp } from "@/components/stamp";

export const dynamic = "force-dynamic";

function normalizeHash(value: string) {
  return value.startsWith("0x") ? value : `0x${value}`;
}

export default async function VerifyPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query;
  let work = null;
  let chainResult = null as any;

  if (query) {
    const normalized = normalizeHash(query);
    work = await prisma.work.findFirst({
      where: { OR: [{ id: query }, { hash: normalized }] },
      include: { universe: true, user: true },
    });
    chainResult = await verifyChainRecord(normalized);
  }

  const hasChain = chainResult?.onChain;
  const verified = Boolean(work && (hasChain || !process.env.UNIVERSE_REGISTRY_ADDRESS));
  const state = hasChain ? "verified" : work ? "demo" : "pending";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <SectionLabel text="Verify" />
      <h1 className="font-display text-4xl">Paste a work ID or hash to verify authenticity.</h1>
      <form className="flex flex-col gap-3 md:flex-row" method="GET">
        <input
          name="query"
          defaultValue={query}
          placeholder="work id or hash"
          className="w-full rounded-full border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Verify
        </button>
      </form>

      {query ? (
        <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Status</p>
              <p className="font-display text-2xl">{verified ? "Verified canon" : "Not verified"}</p>
            </div>
            <Stamp state={state} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Work</p>
              <p className="text-sm text-neutral-800">Hash: {work?.hash || normalizeHash(query)}</p>
              <p className="text-sm text-neutral-800">Universe: {work?.universe?.name || "Unknown"}</p>
              <p className="text-sm text-neutral-800">Owner: {work?.user?.email || "Unknown"}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Registry</p>
              <p className="text-sm text-neutral-800">
                On-chain: {chainResult?.onChain ? "yes" : "no or unavailable"}
              </p>
              <p className="text-sm text-neutral-800">Signer: {chainResult?.signer || "—"}</p>
              <p className="text-sm text-neutral-800">
                Timestamp: {chainResult?.timestamp ? new Date(chainResult.timestamp * 1000).toLocaleString() : "—"}
              </p>
            </div>
          </div>
          <details className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <summary className="cursor-pointer text-sm font-medium">How verification works</summary>
            <ol className="mt-2 space-y-2 text-sm text-neutral-800">
              <li>1) Find the work hash from your library or result page.</li>
              <li>2) Paste it above and submit.</li>
              <li>3) We look up the DB record and query the registry contract.</li>
              <li>4) Matching hash + signer on-chain = verified canon.</li>
            </ol>
          </details>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
          Awaiting a work ID or hash. Use demo generation if you need a sample work.
        </div>
      )}
    </div>
  );
}
