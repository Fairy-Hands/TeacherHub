import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const variants = {
  default:
    "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-pink-500 text-white shadow-[0_10px_24px_rgba(168,85,247,0.24)] hover:opacity-95",
  secondary: "bg-fuchsia-50 text-fuchsia-950 hover:bg-fuchsia-100 dark:bg-white/5 dark:text-white",
  ghost: "bg-transparent hover:bg-fuchsia-50 text-foreground dark:hover:bg-white/5",
  outline:
    "border border-fuchsia-200/80 bg-white/70 text-fuchsia-950 hover:bg-fuchsia-50 dark:border-white/10 dark:bg-white/5 dark:text-white",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export function Button({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
