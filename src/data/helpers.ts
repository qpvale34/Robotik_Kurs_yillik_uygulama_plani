import type { FlowStep, LessonHour, SampleCode, Trouble, Wiring } from "./types";

type DetailKind = "material" | "prep" | "safety" | "key" | "step" | "exit" | "tip";

function detail(item: string, kind: DetailKind): string {
  const text = item.trim().replace(/[.!?]+$/, "");
  const endings: Record<DetailKind, string> = {
    material: ` Öğrenci bu malzemeyi uygulama sırasında kullanır; öğretmen dersten önce yeterli sayıda olduğunu ve kolay ulaşılabilir bir yerde bulunduğunu kontrol eder.`,
    prep: ` Bu hazırlık ders başlamadan tamamlanır; böylece öğrenciler beklemeden uygulamaya geçer ve süre kaybetmez.`,
    safety: ` Bu kural, yanlış bağlantı, kısa devre veya malzeme hasarı oluşmasını önlemek için uygulama boyunca hatırlatılır.`,
    key: ` Öğrenci bu noktayı yaptığı işlemle ilişkilendirir ve sonucu gözlemleyerek neden önemli olduğunu açıklar.`,
    step: ` Öğrenci bu adımı tamamladıktan sonra sonucunu takım arkadaşıyla karşılaştırır; hata varsa enerjiyi kesip adımı yeniden kontrol eder.`,
    exit: ` Yanıt kısa değil, derste yapılan işlemden bir kanıt içerecek şekilde yazılır; öğretmen bunu bir sonraki dersin başlangıcında kullanır.`,
    tip: ` Öğretmen bunu ders içinde kısa bir hatırlatma olarak kullanır; amaç öğrencinin işi kendi başına ve güvenli biçimde sürdürmesidir.`,
  };
  return `${text}.${endings[kind]}`;
}

function details(items: string[], kind: DetailKind): string[] {
  return items.map((item) => detail(item, kind));
}

function elaborateTrouble(row: Trouble): Trouble {
  return {
    problem: `${row.problem}.`,
    cause: `${row.cause}. Bu nedeni kontrol etmeden parça değiştirmek sorunu büyütebilir.`,
    fix: `${row.fix}. Önce enerjiyi kes, sonra tek bir bağlantıyı değiştir ve sonucu yeniden dene.`,
  };
}

export function F(
  min: number,
  phase: FlowStep["phase"],
  title: string,
  teacher: string,
  student: string,
): FlowStep {
  return {
    min,
    phase,
    title,
    teacher: `${teacher} Öğretmen bu aşamada işlemi yavaşça gösterir, kritik noktayı kısa bir cümleyle açıklar ve öğrencilerin güvenli biçimde denemesini bekler.`,
    student: `${student} Öğrenci yaptığı işlemi yalnızca tekrar etmez; neyi değiştirdiğini, ne gözlemlediğini ve sonucu nasıl kontrol ettiğini söyler.`,
  };
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
    materials: details(p.materials, "material"),
    prep: details(p.prep, "prep"),
    safety: details(
      p.safety ?? [
      "USB ve pil takılıyken kablo değiştirilmez.",
      "LED’e 220 Ω seri direnç takılır.",
      ],
      "safety",
    ),
    flow: p.flow,
    keyPoints: details(p.keyPoints, "key"),
    steps: details(p.steps, "step"),
    code: p.code,
    wiring: p.wiring,
    troubleshooting: (p.troubleshooting ?? DEFAULT_TROUBLE).map(elaborateTrouble),
    exitTicket: details(p.exitTicket, "exit"),
    support: `${p.support} Öğretmen desteği, öğrencinin yerine yapmak değil, öğrencinin doğru adımı seçmesine yardım etmektir.`,
    extension: `${p.extension} Ek görev, temel uygulama güvenli biçimde tamamlandıktan sonra verilir.`,
    ortaokul: `${p.ortaokul} Anlatımda kısa cümleler ve görülebilen örnekler kullanılır.`,
    lise: `${p.lise} Öğrenciden neden-sonuç ilişkisini ve yaptığı seçimin teknik gerekçesini açıklaması istenir.`,
    homework: p.homework ? `${p.homework} Çalışma, evde güvenli ve enerjisiz biçimde yapılır; öğrenci bir sonraki derste gözlemini paylaşır.` : undefined,
    tips: details(p.tips, "tip"),
    altArduino: p.altArduino,
    altMbot: p.altMbot,
    altSpike: p.altSpike,
  };
}
