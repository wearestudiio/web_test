import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg">studiio</p>
          <p className="text-sm text-neutral-600">If it isn’t signed, it isn’t canon.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-700">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/collaborate">Collaborate</Link>
          <Link href="/authenticity">Authenticity</Link>
          <Link href="/verify">Verify</Link>
        </div>
      </div>
    </footer>
  );
}
