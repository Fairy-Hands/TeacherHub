import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card/80 p-5 shadow-soft backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold text-foreground">{children}</h3>;
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-sm text-muted-foreground">{children}</p>;
}

