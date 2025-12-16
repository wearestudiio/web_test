import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Stamp({ state, className }: { state: "verified" | "pending" | "demo"; className?: string }) {
  const color = state === "verified" ? "bg-emerald-100 text-emerald-800 border-emerald-600" : "bg-amber-50 text-amber-800 border-amber-500";
  const text = state === "verified" ? "Signed + On-Chain" : state === "demo" ? "Signed (demo)" : "Pending Chain";
  return (
    <motion.div
      initial={{ rotate: -6, scale: 0.92, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 12 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] shadow-sm",
        color,
        className,
      )}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {text}
    </motion.div>
  );
}
