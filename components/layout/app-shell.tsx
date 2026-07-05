import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--background)))] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-4 py-6 pb-28 md:px-8">{children}</main>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

