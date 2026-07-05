import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { students } from "@/lib/mock-data";
import Link from "next/link";
import { StudentCreateModal } from "@/components/students/student-create-modal";

export default function StudentsPage() {
  return (
    <AppShell>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Alunos</h2>
          <p className="text-sm text-muted-foreground">Cadastro rápido, busca e histórico por aluno.</p>
        </div>
        <StudentCreateModal />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {students.map((student) => (
          <Card key={student.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-sm text-muted-foreground">{student.goal}</p>
              </div>
              <Badge>{student.level}</Badge>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <p>Frequência: {student.weeklyFrequency}x/semana</p>
              <p>Próxima aula: {student.nextLesson}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/students/${student.id}`}
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                Ver perfil
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
