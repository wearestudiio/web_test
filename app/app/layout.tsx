// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { SectionLabel } from "@/components/section-label";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const appLinks = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/generate", label: "Generate" },
  { href: "/app/library", label: "Library" },
  { href: "/app/orders", label: "Orders" },
  { href: "/app/profile", label: "Profile" },
  { href: "/app/collaborators", label: "Collaborators" },
  { href: "/app/drops/new", label: "New Drop" },
  { href: "/app/admin", label: "Admin" },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login?callbackUrl=/app");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white px-6 py-4 shadow-sm">
        <div>
          <SectionLabel text="App" />
          <p className="text-sm text-neutral-700">Signed in as {session.user.email}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-neutral-700">
          {appLinks.map((link) => (
            <Link key={link.href} href={link.href} className="underline-offset-4 hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
