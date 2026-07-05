import Link from "next/link";
import { BarChart3, CalendarDays, GraduationCap, NotebookText, ReceiptText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/students", label: "Alunos", icon: GraduationCap },
  { href: "/schedule", label: "Agenda", icon: CalendarDays },
  { href: "/journal", label: "Diário", icon: NotebookText },
  { href: "/finance", label: "Financeiro", icon: ReceiptText },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-72 border-r border-border/70 bg-background/80 p-4 backdrop-blur md:flex md:flex-col">
      <div className="mb-8 rounded-2xl bg-foreground px-4 py-3 text-background">
        <p className="text-xs uppercase tracking-[0.24em] text-background/70">Teacher Hub</p>
        <p className="mt-1 text-lg font-semibold">Painel do professor</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                item.href === "/" && "bg-muted text-foreground",
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

