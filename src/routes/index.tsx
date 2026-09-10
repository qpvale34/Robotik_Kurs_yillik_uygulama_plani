import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";
import { WeekRail } from "@/components/week-rail";
import { AIMS, CLUB, METHODS, PEDAGOGY, PLATFORM_NOTE, SEMESTER_META } from "@/data/club";
import { currentWeekNumber } from "@/data/calendar";
import { OUTLINE } from "@/data/outline";
import { useProgress } from "@/store/progress";
import { padWeek } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const nowWeek = currentWeekNumber();
  const done = useProgress((s) => s.done);
  const doneCount = Object.values(done).filter(Boolean).length;
  const featured = OUTLINE.find((w) => w.week === (nowWeek ?? 1)) ?? OUTLINE[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Okul robotik kulübü</p>
          <h1 className="mt-2 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">{CLUB.fullName}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-[1.05rem]">{CLUB.purpose}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <Stat label="Süre" value="36 hafta" hint={CLUB.duration} />
          <Stat label="Kitle" value="Ortaokul / lise" hint={CLUB.groupSize} />
          <Stat label="Saat" value={`${doneCount}/72`} hint="İşaretlenen ders saati" />
          <Stat label="Yıl" value={CLUB.year} hint="MEB çalışma takvimi" />
        </dl>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid gap-6">
          <div className="rounded-lg bg-paper p-5 shadow-[var(--shadow-card)] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  {nowWeek ? `Bu hafta · ${padWeek(nowWeek)}` : "Hazırlık haftası"}
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">{featured.title}</h2>
                <p className="mt-1 text-sm text-muted">{featured.unit}</p>
              </div>
              <Link
                to="/hafta/$week"
                params={{ week: String(featured.week) }}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg hover:bg-accent-hover"
              >
                Dersi aç
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2">
              {featured.hours.map((h, i) => (
                <li key={h} className="rounded-md bg-sunken px-3 py-3 text-sm">
                  <span className="font-mono text-xs text-accent">{i + 1}. saat · 40 dk</span>
                  <p className="mt-1 font-medium">{h}</p>
                </li>
              ))}
            </ol>
          </div>

          <WeekRail current={featured.week} />

          <div className="grid gap-4 md:grid-cols-2">
            {SEMESTER_META.map((s) => (
              <section key={s.id} className="rounded-lg bg-paper p-5 shadow-[var(--shadow-card)]">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">{s.span}</p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">{s.title}</h2>
                <p className="mt-1 text-sm text-muted">{s.goal}</p>
                <ul className="mt-4 grid gap-2">
                  {s.units.map((u) => (
                    <li key={u.weeks} className="flex gap-3 text-sm">
                      <span className="w-10 shrink-0 font-mono text-xs text-faint">{u.weeks}</span>
                      <span>{u.title}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <aside className="grid gap-4 content-start">
          <aside className="rounded-lg bg-paper p-5 shadow-[var(--shadow-card)]">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Users className="size-4 text-accent" strokeWidth={1.75} />
              Kim, ne kadar
            </h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              <li>{CLUB.audience}</li>
              <li>{CLUB.groupSize}</li>
              <li>{CLUB.platforms}</li>
            </ul>
          </aside>
          <aside className="rounded-lg bg-paper p-5 shadow-[var(--shadow-card)]">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="size-4 text-accent" strokeWidth={1.75} />
              Yöntem
            </h2>
            <ul className="mt-3 grid gap-1.5">
              {METHODS.map((m) => (
                <li key={m} className="flex gap-2 text-sm">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                  {m}
                </li>
              ))}
            </ul>
          </aside>
          <Link
            to="/kaynaklar"
            className="flex items-center justify-between rounded-lg bg-paper px-5 py-4 text-sm shadow-[var(--shadow-card)] hover:bg-sunken"
          >
            <span className="flex items-center gap-2 font-medium">
              <BookOpen className="size-4 text-accent" />
              Kaynakça ve hizalama
            </span>
            <ArrowRight className="size-4 text-faint" />
          </Link>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Yıl sonu hedefleri</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {AIMS.map((a, i) => (
            <li key={a} className="flex gap-3 rounded-lg bg-paper p-4 text-sm shadow-[var(--shadow-card)]">
              <span className="font-mono text-xs text-accent">{padWeek(i + 1)}</span>
              <span>{a}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Nereden beslendi</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PEDAGOGY.map((p) => (
            <article key={p.title} className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">{PLATFORM_NOTE}</p>
      </section>
    </main>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)]">
      <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">{label}</dt>
      <dd className="mt-1 text-lg font-semibold tracking-tight">{value}</dd>
      <p className="mt-0.5 text-xs text-muted">{hint}</p>
    </div>
  );
}
