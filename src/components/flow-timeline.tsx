import type { FlowStep } from "@/data/types";
import { cn } from "@/lib/utils";

const PHASE_TONE: Record<FlowStep["phase"], string> = {
  açılış: "bg-accent-soft text-accent",
  anımsama: "bg-sunken text-muted",
  anlatım: "bg-sunken text-ink",
  gösteri: "bg-accent-soft text-accent",
  uygulama: "bg-ok/15 text-ok",
  paylaşım: "bg-sunken text-muted",
  değerlendirme: "bg-warn/15 text-warn",
  temizlik: "bg-sunken text-muted",
};

export function FlowTimeline({ flow }: { flow: FlowStep[] }) {
  let t = 0;
  return (
    <ol className="grid gap-2">
      {flow.map((step, i) => {
        const start = t;
        t += step.min;
        return (
          <li
            key={`${step.title}-${i}`}
            className="grid grid-cols-[3.5rem_1fr] gap-3 rounded-md bg-paper p-3 shadow-[var(--shadow-card)] sm:grid-cols-[4.25rem_1fr]"
          >
            <div className="flex flex-col items-end pt-0.5">
              <span className="font-mono text-sm tabular-nums text-ink">{step.min} dk</span>
              <span className="text-[11px] tabular-nums text-faint">
                {start}–{t}
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium capitalize", PHASE_TONE[step.phase])}>
                  {step.phase}
                </span>
                <h4 className="text-sm font-semibold tracking-tight">{step.title}</h4>
              </div>
              <p className="mt-1.5 text-sm text-ink">
                <span className="font-medium">Öğretmen: </span>
                {step.teacher}
              </p>
              <p className="mt-0.5 text-sm text-muted">
                <span className="font-medium text-ink">Öğrenci: </span>
                {step.student}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
