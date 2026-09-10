import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckSquare,
  ClipboardList,
  Cpu,
  GraduationCap,
  LifeBuoy,
  ListChecks,
  Package,
  Shield,
  Wrench,
} from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { FlowTimeline } from "@/components/flow-timeline";
import { Button } from "@/components/ui/button";
import type { LessonHour } from "@/data/types";
import { useProgress } from "@/store/progress";
import { cn } from "@/lib/utils";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Package;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)] sm:p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-tight">
        <Icon className="size-4 text-accent" strokeWidth={1.75} />
        {title}
      </h3>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-snug">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function HourPanel({ week, hour }: { week: number; hour: LessonHour }) {
  const done = useProgress((s) => s.done[`${week}-${hour.hour}`] ?? false);
  const note = useProgress((s) => s.notes[`${week}-${hour.hour}`] ?? "");
  const toggleDone = useProgress((s) => s.toggleDone);
  const setNote = useProgress((s) => s.setNote);
  const [tab, setTab] = useState<"akis" | "yap">("akis");
  const flowSum = hour.flow.reduce((a, s) => a + s.min, 0);

  return (
    <article className="grid gap-4">
      <header className="rounded-lg bg-paper p-4 shadow-[var(--shadow-card)] sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
          {hour.hour}. ders saati · {flowSum} dakika
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-pretty sm:text-2xl">{hour.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{hour.aim}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant={done ? "outline" : "primary"}
            onClick={() => toggleDone(week, hour.hour)}
            className="min-h-11"
          >
            <CheckSquare className="size-4" />
            {done ? "İşaret kaldır" : "Saati tamamla"}
          </Button>
        </div>
      </header>

      <Section icon={ListChecks} title="Kazanımlar">
        <ol className="grid gap-2">
          {hour.outcomes.map((o) => (
            <li key={o} className="text-sm leading-snug">
              <span className="font-mono text-[11px] text-accent">{o.split(" ")[0]}</span>{" "}
              {o.slice(o.indexOf(" ") + 1)}
            </li>
          ))}
        </ol>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section icon={Package} title="Malzeme">
          <Bullets items={hour.materials} />
        </Section>
        <Section icon={ClipboardList} title="Öğretmen hazırlığı">
          <Bullets items={hour.prep} />
        </Section>
      </div>

      <Section icon={Shield} title="İş sağlığı">
        <ul className="grid gap-2">
          {hour.safety.map((s) => (
            <li key={s} className="flex gap-2 rounded-sm bg-danger/10 px-3 py-2 text-sm text-danger">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <div className="flex gap-1 rounded-md bg-sunken p-1 no-print">
        <button
          type="button"
          onClick={() => setTab("akis")}
          className={cn(
            "h-10 flex-1 rounded-sm text-sm font-medium",
            tab === "akis" ? "bg-paper text-ink shadow-[var(--shadow-card)]" : "text-muted",
          )}
        >
          40 dk akış
        </button>
        <button
          type="button"
          onClick={() => setTab("yap")}
          className={cn(
            "h-10 flex-1 rounded-sm text-sm font-medium",
            tab === "yap" ? "bg-paper text-ink shadow-[var(--shadow-card)]" : "text-muted",
          )}
        >
          Öğrenci adımları
        </button>
      </div>

      {tab === "akis" ? (
        <FlowTimeline flow={hour.flow} />
      ) : (
        <Section icon={ArrowRight} title="Öğrenci adımları">
          <ol className="grid gap-2">
            {hour.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section icon={GraduationCap} title="Anahtar noktalar">
        <Bullets items={hour.keyPoints} />
      </Section>

      {hour.wiring ? (
        <Section icon={Wrench} title={hour.wiring.title}>
          <ol className="grid gap-2">
            {hour.wiring.items.map((w, i) => (
              <li key={w} className="rounded-sm bg-sunken px-3 py-2 font-mono text-[13px] leading-relaxed">
                <span className="mr-2 text-accent">{i + 1}.</span>
                {w}
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {hour.code ? <CodeBlock sample={hour.code} /> : null}

      <Section icon={LifeBuoy} title="Tıkanınca">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-faint">
                <th className="py-2 pr-3 font-medium">Sorun</th>
                <th className="py-2 pr-3 font-medium">Neden</th>
                <th className="py-2 font-medium">Çözüm</th>
              </tr>
            </thead>
            <tbody>
              {hour.troubleshooting.map((row) => (
                <tr key={row.problem} className="border-b border-line/70 align-top">
                  <td className="py-2.5 pr-3 font-medium">{row.problem}</td>
                  <td className="py-2.5 pr-3 text-muted">{row.cause}</td>
                  <td className="py-2.5">{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section icon={CheckSquare} title="Çıkış bileti">
          <Bullets items={hour.exitTicket} />
        </Section>
        <Section icon={GraduationCap} title="Farklılaştırma">
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="font-medium">Destek</dt>
              <dd className="text-muted">{hour.support}</dd>
            </div>
            <div>
              <dt className="font-medium">Uzatma</dt>
              <dd className="text-muted">{hour.extension}</dd>
            </div>
            <div>
              <dt className="font-medium">Ortaokul</dt>
              <dd className="text-muted">{hour.ortaokul}</dd>
            </div>
            <div>
              <dt className="font-medium">Lise</dt>
              <dd className="text-muted">{hour.lise}</dd>
            </div>
          </dl>
        </Section>
      </div>

      <Section icon={Cpu} title="Platform notu">
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="font-medium">Arduino</dt>
            <dd className="text-muted">{hour.altArduino}</dd>
          </div>
          {hour.altMbot ? (
            <div>
              <dt className="font-medium">mBot</dt>
              <dd className="text-muted">{hour.altMbot}</dd>
            </div>
          ) : null}
          {hour.altSpike ? (
            <div>
              <dt className="font-medium">LEGO SPIKE</dt>
              <dd className="text-muted">{hour.altSpike}</dd>
            </div>
          ) : null}
        </dl>
      </Section>

      {hour.homework ? (
        <Section icon={ClipboardList} title="Ev ödevi">
          <p className="text-sm">{hour.homework}</p>
        </Section>
      ) : null}

      <Section icon={AlertTriangle} title="Öğretmen ipuçları">
        <Bullets items={hour.tips} />
      </Section>

      <Section icon={ClipboardList} title="Ders notu (yalnız bu tarayıcıda)">
        <label className="sr-only" htmlFor={`note-${week}-${hour.hour}`}>
          Ders notu
        </label>
        <textarea
          id={`note-${week}-${hour.hour}`}
          value={note}
          onChange={(e) => setNote(week, hour.hour, e.target.value)}
          rows={4}
          placeholder="Yoklama, kırılan malzeme, kimin nerede tıkandığı…"
          className="w-full rounded-md bg-sunken px-3 py-2 text-sm leading-relaxed outline-none focus-visible:outline-2 focus-visible:outline-accent"
        />
      </Section>
    </article>
  );
}
