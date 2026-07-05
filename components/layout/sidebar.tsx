import Link from "next/link";
import type { Route } from "next";
import {
  BarChart3,
  CalendarDays,
  GraduationCap,
  NotebookText,
  ReceiptText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/" as Route, label: "Dashboard", icon: BarChart3 },
  { href: "/students" as Route, label: "Alunos", icon: GraduationCap },
  { href: "/schedule" as Route, label: "Agenda", icon: CalendarDays },
  { href: "/journal" as Route, label: "Diário", icon: NotebookText },
  { href: "/finance" as Route, label: "Financeiro", icon: ReceiptText },
  { href: "/settings" as Route, label: "Configurações", icon: Settings },
] as const;

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-72 border-r border-border/60 bg-background/75 p-4 backdrop-blur md:flex md:flex-col">
      <div className="mb-8 overflow-hidden rounded-[1.5rem] border border-fuchsia-200/60 bg-gradient-to-br from-fuchsia-400 via-violet-500 to-pink-400 px-4 py-4 text-white shadow-[0_16px_40px_rgba(168,85,247,0.28)]">
        <p className="text-xs uppercase tracking-[0.24em] text-white/80">Teacher Hub</p>
        <p className="mt-1 text-lg font-semibold">Jardim da professora</p>
        <p className="mt-2 text-sm text-white/85">Organize aulas com um toque suave e encantado.</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-fuchsia-50 hover:text-fuchsia-900 dark:hover:bg-white/5 dark:hover:text-white",
                item.href === "/" && "bg-fuchsia-50 text-fuchsia-900 dark:bg-white/5 dark:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-4 rounded-2xl border border-border/70 bg-card p-4">
        <p className="text-sm font-medium">Foco do MVP</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Registrar uma aula em menos de 2 minutos.
        </p>
      </div>
    </aside>
  );
}
