export type CalendarMark = {
  id: string;
  kind: "ders" | "tatil" | "ara" | "sergi" | "uyum" | "not";
  label: string;
  dates: string;
  week?: number;
  note?: string;
};

/** 2026–2027 MEB çalışma takvimi (genelge 2026/68) + kulüp 36 haftası. */
export const SCHOOL_YEAR = {
  year: "2026–2027",
  teachersPrep: "1 Eylül 2026 Salı",
  uyum: "7–11 Eylül 2026",
  semester1: { start: "14 Eylül 2026 Pazartesi", end: "22 Ocak 2027 Cuma" },
  break1: "16–20 Kasım 2026",
  midyear: "25 Ocak–5 Şubat 2027",
  semester2: { start: "8 Şubat 2027 Pazartesi", end: "25 Haziran 2027 Cuma" },
  break2: "8–12 Mart 2027",
  yearEnd: "25 Haziran 2027 Cuma",
  teachersClose: "28–30 Haziran 2027",
} as const;

export const HOLIDAYS = [
  { date: "29 Ekim 2026 Perşembe", name: "Cumhuriyet Bayramı", weekHint: "Hafta 4 — dersi Çarşamba veya Cuma’ya kaydır" },
  { date: "1 Ocak 2027 Cuma", name: "Yılbaşı", weekHint: "Hafta 13 — 35 dk’lık Perşembe bloğu veya Cuma iptal" },
  { date: "23 Nisan 2027 Cuma", name: "Ulusal Egemenlik ve Çocuk Bayramı", weekHint: "Hafta 26 — dersi hafta içine al" },
  { date: "1 Mayıs 2027 Cumartesi", name: "Emek ve Dayanışma Günü", weekHint: "Hafta sonu; hafta içi kulübü etkilemez" },
  { date: "19 Mayıs 2027 Çarşamba", name: "Atatürk’ü Anma, Gençlik ve Spor Bayramı", weekHint: "Hafta 30 — 3D/maket saatini kaydır" },
];

export const WEEK_DATES: { week: number; dates: string; month: string }[] = [
  { week: 1, dates: "28 Eylül–2 Ekim 2026", month: "Eylül / Ekim" },
  { week: 2, dates: "5–9 Ekim 2026", month: "Ekim" },
  { week: 3, dates: "12–16 Ekim 2026", month: "Ekim" },
  { week: 4, dates: "19–23 Ekim 2026", month: "Ekim" },
  { week: 5, dates: "26–30 Ekim 2026", month: "Ekim" },
  { week: 6, dates: "2–6 Kasım 2026", month: "Kasım" },
  { week: 7, dates: "9–13 Kasım 2026", month: "Kasım" },
  { week: 8, dates: "23–27 Kasım 2026", month: "Kasım" },
  { week: 9, dates: "30 Kasım–4 Aralık 2026", month: "Kasım / Aralık" },
  { week: 10, dates: "7–11 Aralık 2026", month: "Aralık" },
  { week: 11, dates: "14–18 Aralık 2026", month: "Aralık" },
  { week: 12, dates: "21–25 Aralık 2026", month: "Aralık" },
  { week: 13, dates: "28 Aralık 2026–1 Ocak 2027", month: "Aralık / Ocak" },
  { week: 14, dates: "4–8 Ocak 2027", month: "Ocak" },
  { week: 15, dates: "11–15 Ocak 2027", month: "Ocak" },
  { week: 16, dates: "18–22 Ocak 2027", month: "Ocak" },
  { week: 17, dates: "8–12 Şubat 2027", month: "Şubat" },
  { week: 18, dates: "15–19 Şubat 2027", month: "Şubat" },
  { week: 19, dates: "22–26 Şubat 2027", month: "Şubat" },
  { week: 20, dates: "1–5 Mart 2027", month: "Mart" },
  { week: 21, dates: "15–19 Mart 2027", month: "Mart" },
  { week: 22, dates: "22–26 Mart 2027", month: "Mart" },
  { week: 23, dates: "29 Mart–2 Nisan 2027", month: "Mart / Nisan" },
  { week: 24, dates: "5–9 Nisan 2027", month: "Nisan" },
  { week: 25, dates: "12–16 Nisan 2027", month: "Nisan" },
  { week: 26, dates: "19–23 Nisan 2027", month: "Nisan" },
  { week: 27, dates: "26–30 Nisan 2027", month: "Nisan" },
  { week: 28, dates: "3–7 Mayıs 2027", month: "Mayıs" },
  { week: 29, dates: "10–14 Mayıs 2027", month: "Mayıs" },
  { week: 30, dates: "17–21 Mayıs 2027", month: "Mayıs" },
  { week: 31, dates: "24–28 Mayıs 2027", month: "Mayıs" },
  { week: 32, dates: "31 Mayıs–4 Haziran 2027", month: "Haziran" },
  { week: 33, dates: "7–11 Haziran 2027", month: "Haziran" },
  { week: 34, dates: "14–18 Haziran 2027", month: "Haziran" },
  { week: 35, dates: "21–25 Haziran 2027", month: "Haziran" },
  { week: 36, dates: "25 Haziran 2027 + bilim şenliği", month: "Haziran" },
];

export const CALENDAR_MARKS: CalendarMark[] = [
  { id: "uyum", kind: "uyum", label: "Uyum / kulüp kaydı", dates: "14–25 Eylül 2026", note: "Asıl ders 28 Eylül’de. Bu 2 hafta: veli onayı, Tinkercad sınıfı, CH340 sürücü, kit sayımı, afiş." },
  { id: "ara1", kind: "ara", label: "1. dönem ara tatil", dates: "16–20 Kasım 2026", note: "Hafta 7 ile 8 arasında boşluk. Ödev yok; kiti eve gönderme." },
  { id: "yilbasi", kind: "tatil", label: "Yılbaşı", dates: "1 Ocak 2027", note: "Hafta 13 Cuma düşer. Perşembe 40+40 veya Cuma iptal + maket evi evde bitirme." },
  { id: "yariyil", kind: "ara", label: "Yarıyıl tatili", dates: "25 Ocak–5 Şubat 2027", note: "Kartlar dolapta, piller çıkarılsın. İsteğe bağlı Tinkercad park sensörü ön çalışması." },
  { id: "ara2", kind: "ara", label: "2. dönem ara tatil", dates: "8–12 Mart 2027", note: "Hafta 20 ile 21 arasında. L298N’li şase yarıda kalmasın; kabloları sök, lastikle bağla." },
  { id: "23nisan", kind: "tatil", label: "23 Nisan", dates: "23 Nisan 2027 Cuma", note: "Hafta 26 saha testi. Mini yarışı Çarşamba/Perşembe yap." },
  { id: "19mayis", kind: "tatil", label: "19 Mayıs", dates: "19 Mayıs 2027 Çarşamba", note: "Hafta 30 prototip. 3D baskı kuyruğunu salı gecesine al." },
  { id: "sergi", kind: "sergi", label: "Yıl sonu sergi", dates: "21–25 Haziran 2027", note: "MEB kapanış 25 Haziran Cuma. Birçok okul bilim şenliğini Cumartesi uzatır — müdürle Nisan’da tarih kilitle." },
];

export const TEACHER_SEPTEMBER = [
  "Müdür yardımcısıyla kulüp günü ve atölye kilidini yazış (tercihen 2×40 dk blok, teneffüsle bölünmesin).",
  "Tinkercad Autodesk Classrooms: sınıf kodu, 13 yaş altı için okul hesabı.",
  "Arduino IDE + CH340 sürücüsü tüm lab PC’lerinde; mBlock 5 offline kurulu imaj.",
  "8 takım kiti + %20 yedek (2 ekstra Uno, 80 LED, 40 jumper demeti).",
  "Güvenlik afişi S1–S8, yangın söndürücü, ilk yardım, USB veri kablosu (şarj-only elenir).",
  "Veli onamı: kırılan malzeme, fotoğraf, Tinkercad hesabı.",
  "Kulüp sözleşmesi, envanter formu, takım defteri (8 adet).",
  "Duvar şeridi: 36 hafta, 4 kapı (LED, akıllı ev, robot, sergi).",
];

/** ISO dates (Monday of each club week) for “bugünkü ders” hesapları. */
export const WEEK_MONDAYS: string[] = [
  "2026-09-28", "2026-10-05", "2026-10-12", "2026-10-19", "2026-10-26",
  "2026-11-02", "2026-11-09", "2026-11-23", "2026-11-30", "2026-12-07",
  "2026-12-14", "2026-12-21", "2026-12-28", "2027-01-04", "2027-01-11",
  "2027-01-18", "2027-02-08", "2027-02-15", "2027-02-22", "2027-03-01",
  "2027-03-15", "2027-03-22", "2027-03-29", "2027-04-05", "2027-04-12",
  "2027-04-19", "2027-04-26", "2027-05-03", "2027-05-10", "2027-05-17",
  "2027-05-24", "2027-05-31", "2027-06-07", "2027-06-14", "2027-06-21",
  "2027-06-25",
];

export function currentWeekNumber(now = new Date()): number | null {
  const t = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  let best: number | null = null;
  for (let i = 0; i < WEEK_MONDAYS.length; i++) {
    const [y, m, d] = WEEK_MONDAYS[i].split("-").map(Number);
    const start = Date.UTC(y, m - 1, d);
    const end = start + 6 * 86400000;
    if (t >= start && t <= end) return i + 1;
    if (t >= start) best = i + 1;
  }
  if (t < Date.UTC(2026, 8, 28)) return null;
  if (t > Date.UTC(2027, 5, 27)) return 36;
  return best;
}
