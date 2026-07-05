import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string;
  delta?: string;
  hint: string;
};

export function StatCard({ label, value, delta, hint }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400" />
      <CardDescription>{label}</CardDescription>
      <div className="mt-3 flex items-end justify-between gap-3">
        <CardTitle>{value}</CardTitle>
        {delta ? <span className="text-xs font-medium text-emerald-500">{delta}</span> : null}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{hint}</p>
    </Card>
  );
}

