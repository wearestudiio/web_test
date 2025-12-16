import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "mono";
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: "text-sm px-3 py-2",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

const variantStyles = {
  primary: "bg-black text-white hover:bg-neutral-900 border border-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
  ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100 border border-transparent",
  outline: "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white",
  mono: "border border-dashed border-neutral-400 text-sm font-mono tracking-tight hover:border-black",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:opacity-60 disabled:cursor-not-allowed",
          sizeStyles[size],
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
