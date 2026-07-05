import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function JournalPage() {
  return (
    <AppShell>
      <div>
        <h2 className="text-2xl font-semibold">Diário de aula</h2>
        <p className="text-sm text-muted-foreground">Registro rápido após a aula, ligado ao aluno e à sessão.</p>
      </div>
      <Card className="mt-6 min-h-[60vh]">
        <p className="text-sm text-muted-foreground">
          Próxima etapa: formulário com histórico e linha do tempo por aluno.
        </p>
      </Card>
    </AppShell>
  );
}

