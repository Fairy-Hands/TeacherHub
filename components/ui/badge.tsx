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
        "inline-flex items-center rounded-full border border-border/70 bg-muted px-2.5 py-1 text-xs font-medium text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

