"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useArchiveMode } from "./providers";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/universes", label: "Universes" },
  { href: "/drops", label: "Drops" },
  { href: "/authenticity", label: "Authenticity" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader({ authenticated }: { authenticated: boolean }) {
  const { archive, toggle } = useArchiveMode();
  const pathname = usePathname();
  const [logoTaps, setLogoTaps] = useState(0);

  useEffect(() => {
    if (logoTaps >= 5) {
      toggle();
      setLogoTaps(0);
    }
  }, [logoTaps, toggle]);

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button
          onClick={() => setLogoTaps((c) => c + 1)}
          className="group flex items-center gap-3 text-left"
          aria-label="Toggle archive density by tapping logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 text-xs font-mono tracking-tight transition-all group-hover:-rotate-3 group-hover:shadow-md">
            STU
          </div>
          <div>
            <p className="font-display text-lg leading-none">studiio</p>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              signed pop atelier {archive ? "— archive mode" : ""}
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition hover:text-neutral-900 ${
                pathname.startsWith(item.href) ? "text-neutral-900" : "text-neutral-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/verify" className="hidden text-xs font-mono uppercase tracking-[0.14em] text-neutral-600 md:block">
            verify
          </Link>
          <Link href={authenticated ? "/app" : "/auth/login"}>
            <Button size="sm" variant="outline" className="rounded-full">
              {authenticated ? "Enter app" : "Sign in"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
