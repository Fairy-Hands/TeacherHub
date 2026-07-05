"use client";

import { signIn } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--background)))] px-4">
      <Card className="w-full max-w-md">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Teacher Hub</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Entrar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Login com credenciais do professor para acessar alunos, agenda e financeiro.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const result = await signIn("credentials", {
              email: String(formData.get("email") ?? ""),
              password: String(formData.get("password") ?? ""),
              redirect: false,
            });

            if (result?.error) {
              setError("Credenciais inválidas.");
              return;
            }

            router.push("/");
          }}
        >
          <div>
            <label className="mb-2 block text-sm font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-foreground"
              placeholder="professor@email.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Senha</label>
            <input
              type="password"
              name="password"
              className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-foreground"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full">Entrar</Button>
        </form>
        {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
        <p className="mt-4 text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link href="/register" className="font-medium text-foreground underline underline-offset-4">
            Criar agora
          </Link>
        </p>
      </Card>
    </div>
  );
}
