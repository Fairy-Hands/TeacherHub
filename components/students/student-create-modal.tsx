"use client";

import { useState, useTransition } from "react";
import { createStudent } from "@/app/students/actions";
import { Button } from "@/components/ui/button";
import type { InputHTMLAttributes } from "react";

export function StudentCreateModal() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  return (
    <>
      <Button onClick={() => setOpen(true)}>Novo aluno</Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-background p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Cadastro rápido de aluno</h3>
                <p className="text-sm text-muted-foreground">
                  Crie o aluno sem sair do fluxo principal.
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
                  const result = await createStudent(formData);
                  if ("error" in result) {
                    setError(result.error ?? "Erro ao salvar aluno.");
                    return;
                  }

                  setError("");
                  setOpen(false);
                });
              }}
            >
              <Field label="Nome" name="name" placeholder="Ana Souza" />
              <Field label="E-mail" name="email" placeholder="ana@email.com" />
              <Field label="Telefone" name="phone" placeholder="+55 11 99999-9999" />
              <Field label="Nível" name="level" placeholder="B2" />
              <Field label="Objetivo" name="goal" placeholder="Business English" />
              <Field label="Valor da aula" name="lessonPrice" placeholder="180" type="number" />
              <Field label="Frequência semanal" name="weeklyFrequency" placeholder="2" type="number" />
              <Field label="Observações" name="notes" placeholder="Preferência por aula à noite" />

              <div className="md:col-span-2 flex items-center justify-between gap-3 pt-2">
                <p className="text-sm text-red-500">{error}</p>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={pending}>
                    {pending ? "Salvando..." : "Salvar aluno"}
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
