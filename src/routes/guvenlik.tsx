import { createFileRoute } from "@tanstack/react-router";
import { SAFETY_RULES } from "@/data/club";

export const Route = createFileRoute("/guvenlik")({ component: GuvenlikPage });

function GuvenlikPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">S1–S8</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Atölye güvenliği</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Hafta 2 baraj sınavının omurgası. Afişi laminasyonla her masaya ve dolap kapağına as. İhlalde vaaz yok, metne
        gönder.
      </p>
      <ol className="mt-8 grid gap-3">
        {SAFETY_RULES.map((r) => (
          <li key={r.id} className="rounded-lg bg-paper p-5 shadow-[var(--shadow-card)]">
            <p className="font-mono text-xs text-danger">{r.id}</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">{r.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
