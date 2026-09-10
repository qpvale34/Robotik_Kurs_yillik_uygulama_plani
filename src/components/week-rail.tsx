import { Link } from "@tanstack/react-router";
import { OUTLINE } from "@/data/outline";
import { useProgress } from "@/store/progress";
import { cn, padWeek } from "@/lib/utils";

export function WeekRail({ current }: { current?: number }) {
  const done = useProgress((s) => s.done);

  return (
    <nav aria-label="Haftalar" className="no-print">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-faint">36 hafta</p>
      <ol className="grid grid-cols-8 gap-1 sm:grid-cols-12 lg:grid-cols-6 xl:grid-cols-8">
        {OUTLINE.map((w) => {
          const a = done[`${w.week}-1`];
          const b = done[`${w.week}-2`];
          const fill = a && b ? "both" : a || b ? "one" : "none";
          const active = current === w.week;
          return (
            <li key={w.week}>
              <Link
                to="/hafta/$week"
                params={{ week: String(w.week) }}
                title={`Hafta ${w.week}: ${w.title}`}
                className={cn(
                  "flex h-10 items-center justify-center rounded-sm font-mono text-xs tabular-nums transition-colors",
                  active && "ring-2 ring-accent ring-offset-2 ring-offset-bg",
                  fill === "both" && "bg-accent text-accent-fg",
                  fill === "one" && "bg-accent-soft text-accent",
                  fill === "none" && "bg-paper text-muted shadow-[var(--shadow-card)] hover:text-ink",
                )}
              >
                {padWeek(w.week)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
