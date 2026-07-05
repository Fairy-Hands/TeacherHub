import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { LessonCreateModal } from "@/components/schedule/lesson-create-modal";
import { Badge } from "@/components/ui/badge";

export default async function SchedulePage() {
  const session = await getAuthSession();

  const [students, lessons] = session?.user?.id
    ? await Promise.all([
        prisma.student.findMany({
          where: { userId: session.user.id },
          orderBy: { name: "asc" },
          select: { id: true, name: true },
        }),
        prisma.lesson.findMany({
          where: { userId: session.user.id },
          include: { student: { select: { name: true } } },
          orderBy: { startsAt: "asc" },
          take: 8,
        }),
      ])
    : [[], []];

  return (
    <AppShell>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Agenda</h2>
          <p className="text-sm text-muted-foreground">
            Calendário moderno e criação rápida de aulas recorrentes.
          </p>
        </div>
        <LessonCreateModal students={students} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="min-h-[60vh]">
          <p className="text-sm font-semibold">Próximas aulas</p>
          <div className="mt-4 space-y-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background/60 p-4"
              >
                <div>
                  <p className="font-medium">{lesson.student.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {lesson.startsAt.toLocaleString("pt-BR")} • {lesson.durationMinutes} min
                  </p>
                </div>
                <Badge>{lesson.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Resumo da agenda</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>Permite criar aulas únicas ou recorrentes por semana.</p>
            <p>Próximo passo: calendário visual mensal/semanal com drag and drop.</p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
