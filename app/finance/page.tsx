import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function FinancePage() {
  return (
    <AppShell>
      <div>
        <h2 className="text-2xl font-semibold">Financeiro</h2>
        <p className="text-sm text-muted-foreground">Receita, inadimplência e pagamentos pendentes.</p>
      </div>
      <Card className="mt-6 min-h-[60vh]">
        <p className="text-sm text-muted-foreground">
          Próxima etapa: tabela filtrável com status de pagamento e totais do período.
        </p>
      </Card>
    </AppShell>
  );
}

