import { createFileRoute } from "@tanstack/react-router";
import { ALIGNMENT, SOURCES } from "@/data/literature";

export const Route = createFileRoute("/kaynaklar")({ component: KaynaklarPage });

function KaynaklarPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Literatür</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Kaynakça ve hizalama</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Plan, MEB Robotik Kodlama öğretim programının spiral sırasını atölye gerçekliğine (40+40 dk, 8 kit, simülasyon
        önce) çevirir. Kulüp seçmeli dersin yerini tutmaz.
      </p>

      <h2 className="mt-10 text-lg font-semibold">MEB ünite eşlemesi</h2>
      <ul className="mt-3 grid gap-3">
        {ALIGNMENT.map((a) => (
          <li key={a.meb} className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)]">
            <p className="text-xs font-medium text-accent">Hafta {a.weeks}</p>
            <p className="mt-1 font-semibold">{a.meb}</p>
            <p className="mt-1 text-sm text-muted">{a.note}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">Kaynaklar</h2>
      <ol className="mt-3 grid gap-3">
        {SOURCES.map((s) => (
          <li key={s.id} className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)]">
            <p className="font-semibold">{s.title}</p>
            <p className="mt-1 text-xs text-muted">
              {s.origin} · {s.year}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{s.how}</p>
            {s.url ? (
              <a
                href={s.url}
                className="mt-2 inline-block text-sm text-accent underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Kaynağı aç
              </a>
            ) : null}
          </li>
        ))}
      </ol>
    </main>
  );
}
