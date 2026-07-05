import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function SchedulePage() {
  return (
    <AppShell>
      <div>
        <h2 className="text-2xl font-semibold">Agenda</h2>
        <p className="text-sm text-muted-foreground">Calendário moderno e criação rápida de aulas recorrentes.</p>
      </div>
      <Card className="mt-6 min-h-[60vh]">
        <p className="text-sm text-muted-foreground">
          Próxima etapa: calendário interativo com visual semanal/mensal.
        </p>
      </Card>
    </AppShell>
  );
}

