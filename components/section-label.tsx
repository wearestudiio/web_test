import { cn } from "@/lib/utils";

export function SectionLabel({ text, className }: { text: string; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-mono uppercase tracking-[0.16em] text-neutral-600",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
      {text}
    </p>
  );
}
