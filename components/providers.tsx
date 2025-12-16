"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

export function Providers({ children, session }: { children: ReactNode; session: any }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export function useArchiveMode() {
  const [archive, setArchive] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem("archive-mode");
    if (stored) setArchive(stored === "true");
  }, []);

  const toggle = () => {
    const next = !archive;
    setArchive(next);
    window.localStorage.setItem("archive-mode", String(next));
  };
  return { archive, toggle };
}
