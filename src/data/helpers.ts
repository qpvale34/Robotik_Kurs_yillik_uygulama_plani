import type { FlowStep, LessonHour, SampleCode, Trouble, Wiring } from "./types";

export function F(
  min: number,
  phase: FlowStep["phase"],
  title: string,
  teacher: string,
  student: string,
): FlowStep {
  return { min, phase, title, teacher, student };
}

const DEFAULT_TROUBLE: Trouble[] = [
  {
    problem: "Devre / kod hiç tepki vermiyor",
    cause: "USB veri kablosu değil, yanlış karta yükleme veya GND kopuk",
    fix: "Kabloyu değiştir, Araçlar → Kart/Port’u doğrula, siyah kabloyu GND’ye yeniden tak",
  },
  {
    problem: "LED yanmıyor veya sönük",
    cause: "Ters polarite veya direnç unutulmuş / çok büyük",
    fix: "Uzun bacak (+) pin tarafı, 220 Ω seri; pin numarasını kodla karşılaştır",
  },
];

export function H(p: {
  hour: 1 | 2;
  title: string;
  aim: string;
  outcomes: string[];
  materials: string[];
  prep: string[];
  safety?: string[];
  flow: FlowStep[];
  keyPoints: string[];
  steps: string[];
  code?: SampleCode;
  wiring?: Wiring;
  troubleshooting?: Trouble[];
  exitTicket: string[];
  support: string;
  extension: string;
  ortaokul: string;
  lise: string;
  homework?: string;
  tips: string[];
  altArduino: string;
  altMbot?: string;
  altSpike?: string;
}): LessonHour {
  const sum = p.flow.reduce((a, s) => a + s.min, 0);
  if (sum !== 40) {
    throw new Error(`Saat akışı 40 dk olmalı (${p.title}: ${sum})`);
  }
  return {
    hour: p.hour,
    title: p.title,
    aim: p.aim,
    outcomes: p.outcomes,
    materials: p.materials,
    prep: p.prep,
    safety: p.safety ?? [
      "USB ve pil takılıyken kablo değiştirilmez.",
      "LED’e 220 Ω seri direnç takılır.",
    ],
    flow: p.flow,
    keyPoints: p.keyPoints,
    steps: p.steps,
    code: p.code,
    wiring: p.wiring,
    troubleshooting: p.troubleshooting ?? DEFAULT_TROUBLE,
    exitTicket: p.exitTicket,
    support: p.support,
    extension: p.extension,
    ortaokul: p.ortaokul,
    lise: p.lise,
    homework: p.homework,
    tips: p.tips,
    altArduino: p.altArduino,
    altMbot: p.altMbot,
    altSpike: p.altSpike,
  };
}
