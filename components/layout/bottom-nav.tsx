import Link from "next/link";
import type { Route } from "next";
import { BarChart3, CalendarDays, GraduationCap, ReceiptText } from "lucide-react";

const items = [
  { href: "/" as Route, label: "Home", icon: BarChart3 },
  { href: "/students" as Route, label: "Alunos", icon: GraduationCap },
  { href: "/schedule" as Route, label: "Agenda", icon: CalendarDays },
  { href: "/finance" as Route, label: "Pagos", icon: ReceiptText },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 gap-2 rounded-2xl border border-border/70 bg-background/95 p-2 shadow-soft backdrop-blur md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
