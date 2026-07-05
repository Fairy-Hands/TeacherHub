import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const lessonsTimeline = [
  {
    date: "Hoje",
    title: "Phrasal verbs in meetings",
    summary: "Revisamos vocabulário de reuniões e prática de speaking guiado.",
  },
  {
    date: "02 Jul",
    title: "Small talk and networking",
    summary: "Estratégias de abertura, follow-up e vocabulário de networking.",
  },
  {
    date: "28 Jun",
    title: "Interview practice",
    summary: "Simulação de entrevista com foco em fluência e precisão.",
  },
];

export default async function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <AppShell>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Perfil do aluno</p>
          <h2 className="text-3xl font-semibold tracking-tight">Ana Souza</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Página individual com histórico completo, pagamentos e linha do tempo das aulas.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>B2</Badge>
          <Badge>2x/semana</Badge>
          <Button variant="outline" size="sm">
            Editar aluno
          </Button>
          <Button size="sm">Registrar aula</Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <Card>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">E-mail</p>
                <p className="font-medium">ana@email.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">+55 11 99999-9999</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Objetivo</p>
                <p className="font-medium">Business English e entrevistas</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor da aula</p>
                <p className="font-medium">R$ 180,00</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Linha do tempo</p>
                <p className="text-sm text-muted-foreground">Histórico das aulas e registros de diário.</p>
              </div>
              <Button variant="outline" size="sm">
                Ver todas
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {lessonsTimeline.map((lesson) => (
                <div key={lesson.title} className="relative pl-4">
                  <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-foreground" />
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{lesson.title}</p>
                      <Badge>{lesson.date}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{lesson.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <p className="text-sm font-semibold">Resumo do aluno</p>
            <div className="mt-4 space-y-3 text-sm">
              <p className="text-muted-foreground">
                Nível atual: <span className="font-medium text-foreground">B2</span>
              </p>
              <p className="text-muted-foreground">
                Frequência semanal: <span className="font-medium text-foreground">2 aulas</span>
              </p>
              <p className="text-muted-foreground">
                Próxima aula: <span className="font-medium text-foreground">Hoje, 14:00</span>
              </p>
              <p className="text-muted-foreground">
                Status financeiro: <span className="font-medium text-foreground">Em dia</span>
              </p>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold">Ações rápidas</p>
            <div className="mt-4 grid gap-2">
              <Button variant="outline">Criar aula recorrente</Button>
              <Button variant="outline">Adicionar pagamento</Button>
              <Button variant="outline">Registrar diário</Button>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold">Identificador interno</p>
            <p className="mt-2 text-sm text-muted-foreground">{id}</p>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
