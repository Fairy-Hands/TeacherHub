import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { getAuthSession } from "@/lib/auth";
import { getDashboardSnapshot } from "@/lib/dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const dashboard = await getDashboardSnapshot(session.user.id);

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Aulas de hoje"
              value={String(dashboard.todayLessons)}
              delta="+2"
              hint="Sessões agendadas para as próximas horas."
            />
            <StatCard
              label="Próximas aulas"
              value={String(dashboard.upcomingLessons)}
              delta="+5%"
              hint="Agenda dos próximos 7 dias."
            />
            <StatCard
              label="Alunos ativos"
              value={String(dashboard.students)}
              delta="+3"
              hint="Base de estudantes com recorrência."
            />
            <StatCard
              label="Aulas no mês"
              value={String(dashboard.monthLessons)}
              delta="+18%"
              hint="Volume total de aulas concluídas."
            />
            <StatCard
              label="Receita do mês"
              value={`R$ ${dashboard.monthRevenue.toLocaleString("pt-BR")}`}
              delta="+12%"
              hint="Recebimentos confirmados no período."
            />
            <StatCard
              label="Pendências"
              value={String(dashboard.pendingPayments)}
              delta="3 vencidas"
              hint="Pagamentos em aberto ou atrasados."
            />
          </div>

          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Aulas de hoje</p>
                <p className="text-sm text-muted-foreground">
                  Fluxo rápido para registrar e concluir.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ver agenda
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              {dashboard.todayLessonRows.length ? (
                dashboard.todayLessonRows.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/60 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-medium">{lesson.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.startsAt.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        • {lesson.durationMinutes} min • {lesson.mode}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{lesson.status}</Badge>
                      <Button size="sm">Registrar aula</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma aula agendada para hoje.</p>
              )}
            </div>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <p className="text-sm font-semibold">Alunos em foco</p>
            <div className="mt-4 space-y-4">
              {dashboard.studentRows.map((student) => (
                <div key={student.id} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.level} • {student.weeklyFrequency ?? 0}x/semana
                    </p>
                  </div>
                  <Badge>{student.nextLesson ? "Ativo" : "Sem aula"}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold">Pagamentos pendentes</p>
            <div className="mt-4 space-y-4">
              {dashboard.pendingPaymentRows.length ? (
                dashboard.pendingPaymentRows.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{payment.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.competence} • Venc.{" "}
                        {payment.dueDate.toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        R$ {Number(payment.amount).toLocaleString("pt-BR")}
                      </p>
                      <Badge>{payment.status}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum pagamento pendente.</p>
              )}
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

