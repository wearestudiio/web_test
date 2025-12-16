import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Pill({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-neutral-800/60 bg-white px-3 py-1 text-xs font-mono uppercase tracking-[0.12em] text-neutral-700",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
