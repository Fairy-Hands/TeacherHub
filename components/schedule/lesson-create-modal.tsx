"use client";

import { useState, useTransition } from "react";
import { createLesson } from "@/app/schedule/actions";
import { Button } from "@/components/ui/button";
import type { InputHTMLAttributes } from "react";

type StudentOption = {
  id: string;
  name: string;
};

export function LessonCreateModal({ students }: { students: StudentOption[] }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  return (
    <>
      <Button onClick={() => setOpen(true)}>Nova aula</Button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-background p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Criar aula</h3>
                <p className="text-sm text-muted-foreground">
                  Cadastre uma sessão única ou uma sequência recorrente.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-1 text-sm text-muted-foreground hover:bg-muted"
              >
                Fechar
              </button>
            </div>

            <form
              className="mt-6 grid gap-4 md:grid-cols-2"
              action={(formData) => {
                startTransition(async () => {
                  const result = await createLesson(formData);
                  if ("error" in result) {
                    setError(result.error ?? "Erro ao salvar aula.");
                    return;
                  }

                  setError("");
                  setOpen(false);
                });
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Aluno</span>
                <select
                  name="studentId"
                  className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Data e hora" name="startsAt" type="datetime-local" />
              <Field label="Duração (min)" name="durationMinutes" type="number" defaultValue={60} />
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Modalidade</span>
                <select
                  name="mode"
                  className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
                  defaultValue="ONLINE"
                >
                  <option value="ONLINE">Online</option>
                  <option value="IN_PERSON">Presencial</option>
                </select>
              </label>
              <Field label="Link da reunião" name="meetingLink" placeholder="https://meet.google.com/..." />

              <div className="rounded-2xl border border-border p-4 md:col-span-2">
                <label className="flex items-center gap-3 text-sm font-medium">
                  <input type="checkbox" name="recurrenceEnabled" className="h-4 w-4" />
                  Aula recorrente semanal
                </label>
                <div className="mt-4 max-w-xs">
                  <Field label="Quantidade de ocorrências" name="recurrenceCount" type="number" defaultValue={4} />
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-between gap-3 pt-2">
                <p className="text-sm text-red-500">{error}</p>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={pending}>
                    {pending ? "Salvando..." : "Salvar aula"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        {...props}
        className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}
