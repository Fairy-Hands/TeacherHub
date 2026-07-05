import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Badge({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-fuchsia-200/70 bg-fuchsia-50 px-2.5 py-1 text-xs font-medium text-fuchsia-950 dark:border-white/10 dark:bg-white/5 dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

