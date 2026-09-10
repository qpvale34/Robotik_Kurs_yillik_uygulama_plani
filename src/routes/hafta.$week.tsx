import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Printer, Star } from "lucide-react";
import { HourPanel } from "@/components/hour-panel";
import { WeekRail } from "@/components/week-rail";
import { OUTLINE } from "@/data/outline";
import { getWeek } from "@/data/weeks";
import { WEEK_DATES } from "@/data/calendar";
import { useProgress } from "@/store/progress";
import { padWeek, cn } from "@/lib/utils";

export const Route = createFileRoute("/hafta/$week")({
  component: WeekPage,
});

function WeekPage() {
  const { week: raw } = Route.useParams();
  const n = Math.min(36, Math.max(1, Number(raw) || 1));
  const plan = getWeek(n);
  const outline = OUTLINE[n - 1];
  const dates = WEEK_DATES.find((d) => d.week === n);
  const [hour, setHour] = useState<1 | 2>(1);
  const bookmark = useProgress((s) => s.bookmarks[n]);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const lesson = plan?.hours[hour - 1];
  const prev = n > 1 ? n - 1 : null;
  const next = n < 36 ? n + 1 : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <WeekRail current={n} />
          </div>
        </div>
        <div>
          <div className="lg:hidden">
            <WeekRail current={n} />
          </div>

          <header className="mt-6 print-break">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              {outline.semester}. dönem · {dates?.month} · {dates?.dates}
            </p>
            <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-faint">Hafta {padWeek(n)}</p>
                <h1 className="mt-1 max-w-2xl text-3xl font-semibold tracking-tight">{outline.title}</h1>
                <p className="mt-1 text-sm text-muted">{outline.unit}</p>
              </div>
              <div className="flex gap-1 no-print">
                <button
                  type="button"
                  onClick={() => toggleBookmark(n)}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-md",
                    bookmark ? "bg-accent-soft text-accent" : "bg-paper text-muted shadow-[var(--shadow-card)]",
                  )}
                  aria-label="Yer imi"
                >
                  <Star className="size-4" fill={bookmark ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex size-11 items-center justify-center rounded-md bg-paper text-muted shadow-[var(--shadow-card)]"
                  aria-label="Yazdır"
                >
                  <Printer className="size-4" />
                </button>
              </div>
            </div>
            {plan ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                <span className="font-medium text-ink">Neden bu hafta: </span>
                {plan.why}
              </p>
            ) : (
              <p className="mt-4 text-sm text-muted">Bu haftanın dakikalık planı yükleniyor.</p>
            )}
            {plan?.weekGoal ? (
              <p className="mt-2 max-w-3xl text-sm">
                <span className="font-medium">Haftalık hedef: </span>
                {plan.weekGoal}
              </p>
            ) : null}
            {plan?.prior?.length ? (
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-ink">Önkoşul: </span>
                {plan.prior.join(" · ")}
              </p>
            ) : null}
          </header>

          {plan ? (
            <>
              <div className="mt-6 flex gap-1 rounded-md bg-sunken p-1 no-print">
                {plan.hours.map((h) => (
                  <button
                    key={h.hour}
                    type="button"
                    onClick={() => setHour(h.hour)}
                    className={cn(
                      "flex h-12 flex-1 flex-col items-start justify-center rounded-sm px-3 text-left",
                      hour === h.hour ? "bg-paper shadow-[var(--shadow-card)]" : "text-muted",
                    )}
                  >
                    <span className="font-mono text-[11px] text-accent">{h.hour}. saat</span>
                    <span className="line-clamp-1 text-sm font-medium text-ink">{h.title}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                {lesson ? <HourPanel week={n} hour={lesson} /> : null}
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-lg bg-paper p-5 text-sm text-muted shadow-[var(--shadow-card)]">
              Saat başlıkları: {outline.hours.join(" / ")}
            </div>
          )}

          <nav className="mt-8 flex items-center justify-between gap-3 no-print" aria-label="Haftalar arası">
            {prev ? (
              <Link
                to="/hafta/$week"
                params={{ week: String(prev) }}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-paper px-3 text-sm shadow-[var(--shadow-card)]"
              >
                <ChevronLeft className="size-4" />
                Hafta {padWeek(prev)}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to="/hafta/$week"
                params={{ week: String(next) }}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-paper px-3 text-sm shadow-[var(--shadow-card)]"
              >
                Hafta {padWeek(next)}
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}
