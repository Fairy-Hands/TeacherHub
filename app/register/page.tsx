import { registerUser } from "@/app/register/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--background)))] px-4">
      <Card className="w-full max-w-md">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Teacher Hub</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Criar conta</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Comece o MVP com uma conta local persistida no Prisma.
        </p>
        <form action={registerUser} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Nome</label>
            <input
              type="text"
              name="name"
              className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
              placeholder="Jonas"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
              placeholder="fairyhands.contato@gmail.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Senha</label>
            <input
              type="password"
              name="password"
              className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
              placeholder="mínimo 8 caracteres"
            />
          </div>
          <Button className="w-full" type="submit">
            Criar conta
          </Button>
        </form>
      </Card>
    </div>
  );
}

