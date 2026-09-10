import { createFileRoute } from "@tanstack/react-router";
import { RUBRIC } from "@/data/club";

export const Route = createFileRoute("/olcme")({ component: OlcmePage });

function OlcmePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Yıl sonu ağırlıkları</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Ölçme ve rubrik</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Kulüp planındaki dört ölçüt korundu. Her saatin çıkış bileti biçimlendiricidir. Düzey belirleyici kapılar: hafta
        14 (akıllı ev), 16 (1. dönem), 26 (saha), 36 (sergi).
      </p>
      <div className="mt-8 grid gap-5">
        {RUBRIC.map((r) => (
          <section key={r.id} className="rounded-lg bg-paper p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight">{r.title}</h2>
              <span className="font-mono text-sm text-accent">%{r.weight}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{r.desc}</p>
            <ol className="mt-4 grid gap-2">
              {r.levels.map((lv) => (
                <li key={lv.score} className="grid grid-cols-[4.5rem_1fr] gap-3 rounded-sm bg-sunken px-3 py-2 text-sm">
                  <span className="font-medium">
                    {lv.score} · {lv.label}
                  </span>
                  <span className="text-muted">{lv.text}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  );
}
