// @ts-nocheck
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "studiio — signed pop atelier",
  description:
    "studiio is the artist-first platform for on-demand pop packages, authenticated outputs, and couture collaborations. Human taste, scaled by AI.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 font-sans">
        <Providers session={session}>
          <SiteHeader authenticated={Boolean(session?.user)} />
          <main className="min-h-screen bg-gradient-to-b from-white via-white to-neutral-50">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
