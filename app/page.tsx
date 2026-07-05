import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { dashboardStats, lessons, payments, students } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Aulas de hoje"
              value={String(dashboardStats.todayLessons)}
              delta="+2"
              hint="Sessões agendadas para as próximas horas."
            />
            <StatCard
              label="Próximas aulas"
              value={String(dashboardStats.upcomingLessons)}
              delta="+5%"
              hint="Agenda dos próximos 7 dias."
            />
            <StatCard
              label="Alunos ativos"
              value={String(dashboardStats.students)}
              delta="+3"
              hint="Base de estudantes com recorrência."
            />
            <StatCard
              label="Aulas no mês"
              value={String(dashboardStats.monthLessons)}
              delta="+18%"
              hint="Volume total de aulas concluídas."
            />
            <StatCard
              label="Receita do mês"
              value={`R$ ${dashboardStats.monthRevenue.toLocaleString("pt-BR")}`}
              delta="+12%"
              hint="Recebimentos confirmados no período."
            />
            <StatCard
              label="Pendências"
              value={String(dashboardStats.pendingPayments)}
              delta="3 vencidas"
              hint="Pagamentos em aberto ou atrasados."
            />
          </div>

          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Aulas de hoje</p>
                <p className="text-sm text-muted-foreground">Fluxo rápido para registrar e concluir.</p>
              </div>
              <Button variant="outline" size="sm">
                Ver agenda
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              {lessons.map((lesson) => (
                <div
                  key={`${lesson.student}-${lesson.startsAt}`}
                  className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/60 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium">{lesson.student}</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.startsAt} • {lesson.duration} • {lesson.mode}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{lesson.status}</Badge>
                    <Button size="sm">Registrar aula</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <p className="text-sm font-semibold">Alunos em foco</p>
            <div className="mt-4 space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.level} • {student.weeklyFrequency}x/semana
                    </p>
                  </div>
                  <Badge>{student.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold">Pagamentos pendentes</p>
            <div className="mt-4 space-y-4">
              {payments.map((payment) => (
                <div key={`${payment.student}-${payment.competence}`} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{payment.student}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.competence} • Venc. {payment.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {payment.amount.toLocaleString("pt-BR")}</p>
                    <Badge>{payment.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

