import type { LessonHour } from "@/data/types";

type Kind = "logic" | "circuit" | "sensor" | "motion" | "project";

function kindFor(hour: LessonHour): Kind {
  const text = `${hour.title} ${hour.aim}`;
  if (/algoritma|akış|döngü|blok/i.test(text)) return "logic";
  if (/motor|servo|mesafe|ultrasonik|çizgi|şase|hareket|park/i.test(text)) return "motion";
  if (/sensör|buton|analog|potansiyometre|ldr|buzzer|ışık/i.test(text)) return "sensor";
  if (/proje|prototip|test|sergi|sunum|rapor|hackathon/i.test(text)) return "project";
  return "circuit";
}

const COPY: Record<Kind, { label: string; title: string; note: string }> = {
  logic: { label: "SİSTEM HARİTASI", title: "Problem → karar → eylem", note: "Adımları görünür kıl" },
  circuit: { label: "DEVRE KESİTİ", title: "Enerji → kontrol → çıktı", note: "Akım yolunu takip et" },
  sensor: { label: "VERİ AKIŞI", title: "Ölç → yorumla → tepki ver", note: "Beklenen aralığı karşılaştır" },
  motion: { label: "HAREKET DÖNGÜSÜ", title: "Ölçüm → karar → motor", note: "Önce düşük hızda doğrula" },
  project: { label: "ÜRETİM DÖNGÜSÜ", title: "Fikir → prototip → kanıt", note: "Hata günlüğü tut" },
};

function Diagram({ kind }: { kind: Kind }) {
  if (kind === "logic") {
    return (
      <>
        <path d="M32 72h38M93 72h39M155 72h39" className="stroke-current" strokeWidth="2" />
        {[
          ["32", "TANI", "Soruyu seç"],
          ["93", "KARAR", "Koşulu yaz"],
          ["155", "EYLEM", "Sonucu dene"],
        ].map(([x, title, sub]) => (
          <g key={x}>
            <rect x={x} y="46" width="38" height="52" rx="8" fill="currentColor" opacity=".12" stroke="currentColor" />
            <circle cx={Number(x) + 19} cy="62" r="5" fill="currentColor" opacity=".8" />
            <text x={Number(x) + 19} y="82" textAnchor="middle" className="fill-current text-[8px] font-semibold">{title}</text>
            <text x={Number(x) + 19} y="112" textAnchor="middle" className="fill-current text-[7px] opacity-70">{sub}</text>
          </g>
        ))}
      </>
    );
  }
  if (kind === "sensor") {
    return (
      <>
        <path d="M28 86h48M102 86h48M174 86h30" className="stroke-current" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="52" cy="72" r="22" fill="currentColor" opacity=".13" stroke="currentColor" />
        <path d="M42 72h20M52 62v20" className="stroke-current" strokeWidth="2" />
        <rect x="102" y="50" width="48" height="44" rx="7" fill="currentColor" opacity=".13" stroke="currentColor" />
        <path d="M112 82h28M116 74h20M120 66h12" className="stroke-current" strokeWidth="2" />
        <path d="M184 56v38M174 84h20M178 76h12M182 68h4" className="stroke-current" strokeWidth="3" />
        <text x="52" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">SENSÖR</text>
        <text x="126" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">VERİ</text>
        <text x="186" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">TEPKİ</text>
      </>
    );
  }
  if (kind === "motion") {
    return (
      <>
        <path d="M42 80h36M108 80h36M174 80h30" className="stroke-current" strokeWidth="2" />
        <path d="M30 68l14-14 14 14-14 14z" fill="currentColor" opacity=".15" stroke="currentColor" />
        <rect x="108" y="57" width="36" height="46" rx="5" fill="currentColor" opacity=".15" stroke="currentColor" />
        <circle cx="176" cy="68" r="12" fill="currentColor" opacity=".15" stroke="currentColor" />
        <circle cx="198" cy="92" r="12" fill="currentColor" opacity=".15" stroke="currentColor" />
        <path d="M171 68h10M176 63v10" className="stroke-current" strokeWidth="2" />
        <text x="44" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">ÖLÇ</text>
        <text x="126" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">KONTROL</text>
        <text x="187" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">HAREKET</text>
      </>
    );
  }
  if (kind === "project") {
    return (
      <>
        <path d="M40 86h34M103 86h34M166 86h34" className="stroke-current" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M30 62h42v34H30z" fill="currentColor" opacity=".12" stroke="currentColor" />
        <path d="M38 74h26M38 82h18" className="stroke-current" strokeWidth="2" />
        <path d="M98 60h42v38H98z" fill="currentColor" opacity=".12" stroke="currentColor" />
        <path d="M106 90l8-10 7 6 10-14 5 18z" fill="currentColor" opacity=".7" />
        <path d="M164 60h38v38h-38z" fill="currentColor" opacity=".12" stroke="currentColor" />
        <path d="M174 86l7 7 13-19" className="stroke-current" strokeWidth="3" fill="none" />
        <text x="51" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">FİKİR</text>
        <text x="119" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">PROTOTİP</text>
        <text x="183" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">KANIT</text>
      </>
    );
  }
  return (
    <>
      <path d="M38 84h28M104 84h28M170 84h28" className="stroke-current" strokeWidth="2" />
      <rect x="24" y="54" width="42" height="48" rx="6" fill="currentColor" opacity=".12" stroke="currentColor" />
      <rect x="104" y="54" width="28" height="48" rx="5" fill="currentColor" opacity=".16" stroke="currentColor" />
      <circle cx="184" cy="78" r="20" fill="currentColor" opacity=".12" stroke="currentColor" />
      <path d="M34 68h22M34 78h22M34 88h14M112 68h12M112 78h12M112 88h8M176 78h16M184 70v16" className="stroke-current" strokeWidth="2" />
      <text x="45" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">ENERJİ</text>
      <text x="118" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">KART</text>
      <text x="184" y="119" textAnchor="middle" className="fill-current text-[7px] opacity-70">ÇIKTI</text>
    </>
  );
}

export function LessonInfographic({ hour }: { hour: LessonHour }) {
  const kind = kindFor(hour);
  const copy = COPY[kind];
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-[linear-gradient(135deg,var(--color-paper),var(--color-sunken))] p-4 shadow-[var(--shadow-card)] sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-accent">{copy.label}</p>
          <h3 className="mt-1 text-base font-semibold tracking-tight">{copy.title}</h3>
        </div>
        <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-1 text-[10px] font-medium text-accent">{copy.note}</span>
      </div>
      <svg viewBox="0 0 230 132" role="img" aria-label={`${copy.title} infografiği`} className="mt-3 h-36 w-full text-accent">
        <defs>
          <pattern id={`grid-${kind}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M 14 0 L 0 0 0 14" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth=".7" />
          </pattern>
        </defs>
        <rect width="230" height="132" rx="12" fill={`url(#grid-${kind})`} />
        <Diagram kind={kind} />
      </svg>
      <figcaption className="text-xs leading-relaxed text-muted">
        Teknik görsel, öğrencinin bu derste takip edeceği ilişkiyi tek bakışta hatırlatır: önce gözlem, sonra karar, ardından kontrollü uygulama.
      </figcaption>
    </figure>
  );
}
