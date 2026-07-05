import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div>
        <h2 className="text-2xl font-semibold">Configurações</h2>
        <p className="text-sm text-muted-foreground">Tema, perfil e preferências da conta.</p>
      </div>
      <Card className="mt-6 min-h-[60vh]">
        <p className="text-sm text-muted-foreground">Base pronta para autenticação e preferências do usuário.</p>
      </Card>
    </AppShell>
  );
}

