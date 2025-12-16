import { SectionLabel } from "@/components/section-label";
import { getSignerAccount } from "@/lib/blockchain";

const signers = [
  { universe: "WORM", env: "WORM_SIGNER_PRIVATE_KEY" },
  { universe: "TARNS", env: "TARNS_SIGNER_PRIVATE_KEY" },
];

export default function AuthenticityPage() {
  const signerAddresses = signers.map((s) => ({
    ...s,
    address: getSignerAccount(process.env[s.env as keyof NodeJS.ProcessEnv] as string | undefined)?.address || "demo signer",
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <SectionLabel text="Authenticity" />
      <h1 className="font-display text-4xl">If it isn’t signed, it isn’t canon.</h1>
      <p className="text-neutral-700">
        studiio records every official output by hashing the canonical JSON, signing it with the universe key, and
        anchoring it on the UniverseRegistry contract. Fans, collaborators, and press can verify provenance anytime from
        /verify.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">What a signature means</p>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            <li>• The work was generated within a universe’s rules.</li>
            <li>• The hash and metadata were sealed with the universe signer.</li>
            <li>• The registry contract stores the hash, signer, and URI.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Why blockchain?</p>
          <p className="mt-2 text-sm text-neutral-800">
            Provenance is public, tamper-evident, and portable. A remix, re-upload, or screenshot without a matching
            on-chain record is unofficial. The registry makes the canon visible.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Signer placards</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {signerAddresses.map((signer) => (
            <div key={signer.universe} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="font-display text-xl">{signer.universe}</p>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-600">
                {signer.address} ({signer.env})
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-neutral-700">
          Local development runs a Hardhat/Anvil chain. Use <code className="rounded bg-neutral-100 px-1">pnpm chain</code> and{" "}
          <code className="rounded bg-neutral-100 px-1">pnpm chain:deploy</code> to seed the registry address.
        </p>
      </div>
    </div>
  );
}
