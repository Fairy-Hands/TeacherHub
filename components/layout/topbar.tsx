import { Search, Plus, SunMedium, MoonStar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="relative flex items-center justify-between gap-4 border-b border-border/60 bg-background/70 px-4 py-4 backdrop-blur md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-fuchsia-300 via-violet-400 to-pink-300" />
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
