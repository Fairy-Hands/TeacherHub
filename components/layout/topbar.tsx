import { Search, Plus, SunMedium, MoonStar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-4 md:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Teacher Hub</p>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden md:inline-flex">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
        <Button variant="ghost" size="sm" className="hidden md:inline-flex">
          <SunMedium className="h-4 w-4" />
          <MoonStar className="h-4 w-4" />
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Novo registro
        </Button>
      </div>
    </header>
  );
}

