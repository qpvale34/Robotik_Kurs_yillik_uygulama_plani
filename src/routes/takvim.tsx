import { createFileRoute, Link } from "@tanstack/react-router";
import { CALENDAR_MARKS, HOLIDAYS, SCHOOL_YEAR, TEACHER_SEPTEMBER, WEEK_DATES } from "@/data/calendar";
import { OUTLINE } from "@/data/outline";
import { padWeek } from "@/lib/utils";

export const Route = createFileRoute("/takvim")({ component: TakvimPage });

function TakvimPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">2026–2027 MEB takvimi</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Kulüp takvimi</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        36 hafta, 16–20 Kasım ve 8–12 Mart ara tatilleri atlanarak yerleştirildi. Kulüp fiilen 28 Eylül’de başlar;
        14–25 Eylül kayıt ve öğretmen hazırlığıdır. Yıl 25 Haziran 2027’de kapanır.
      </p>

      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        <Row k="Öğretmen hazırlık" v={SCHOOL_YEAR.teachersPrep} />
        <Row k="Uyum haftası" v={SCHOOL_YEAR.uyum} />
        <Row k="1. dönem" v={`${SCHOOL_YEAR.semester1.start} – ${SCHOOL_YEAR.semester1.end}`} />
        <Row k="1. ara tatil" v={SCHOOL_YEAR.break1} />
        <Row k="Yarıyıl" v={SCHOOL_YEAR.midyear} />
        <Row k="2. dönem" v={`${SCHOOL_YEAR.semester2.start} – ${SCHOOL_YEAR.semester2.end}`} />
        <Row k="2. ara tatil" v={SCHOOL_YEAR.break2} />
        <Row k="Kapanış" v={SCHOOL_YEAR.yearEnd} />
      </dl>

      <h2 className="mt-10 text-lg font-semibold">Eylül hazırlık listesi</h2>
      <ul className="mt-3 grid gap-2">
        {TEACHER_SEPTEMBER.map((t) => (
          <li key={t} className="rounded-md bg-paper px-4 py-3 text-sm shadow-[var(--shadow-card)]">
            {t}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">Tatil ve kaydırma notları</h2>
      <ul className="mt-3 grid gap-3">
        {CALENDAR_MARKS.map((m) => (
          <li key={m.id} className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)]">
            <p className="text-xs font-medium uppercase tracking-wide text-accent">{m.dates}</p>
            <p className="mt-1 font-semibold">{m.label}</p>
            {m.note ? <p className="mt-1 text-sm text-muted">{m.note}</p> : null}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">Resmî tatiller</h2>
      <ul className="mt-3 grid gap-2">
        {HOLIDAYS.map((h) => (
          <li key={h.date} className="flex flex-col gap-1 rounded-md bg-paper px-4 py-3 text-sm shadow-[var(--shadow-card)] sm:flex-row sm:justify-between">
            <span>
              <span className="font-medium">{h.name}</span>
              <span className="text-muted"> · {h.date}</span>
            </span>
            <span className="text-muted">{h.weekHint}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold">36 haftalık şerit</h2>
      <ol className="mt-4 grid gap-2">
        {WEEK_DATES.map((d) => {
          const o = OUTLINE[d.week - 1];
          return (
            <li key={d.week}>
              <Link
                to="/hafta/$week"
                params={{ week: String(d.week) }}
                className="grid gap-1 rounded-md bg-paper px-4 py-3 shadow-[var(--shadow-card)] hover:bg-sunken sm:grid-cols-[4.5rem_11rem_1fr] sm:items-baseline"
              >
                <span className="font-mono text-xs text-accent">{padWeek(d.week)}</span>
                <span className="text-xs text-muted">{d.dates}</span>
                <span className="text-sm font-medium">{o.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)]">
      <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">{k}</dt>
      <dd className="mt-1 text-sm">{v}</dd>
    </div>
  );
}
