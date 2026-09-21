/* eslint-disable */
// Resmî yıllık plan üretici (2 sayfa A4):
//   AHMET ZİYLAN ANADOLU İMAM HATİP LİSESİ — 2026–2027 Robotik Kodlama Kursu
// Çıktı: public/yillik-plan/Robotik_Kodlama_Kursu_Yillik_Plan_2026-2027.xlsx
// Koşum: node scripts/make-yillik-plan.cjs
"use strict";

const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------- veri (src/data/outline.ts + calendar.ts ile senkron)
const DATES = [
  "28 Eylül–2 Ekim 2026", "5–9 Ekim 2026", "12–16 Ekim 2026", "19–23 Ekim 2026", "26–30 Ekim 2026",
  "2–6 Kasım 2026", "9–13 Kasım 2026", "23–27 Kasım 2026", "30 Kasım–4 Aralık 2026", "7–11 Aralık 2026",
  "14–18 Aralık 2026", "21–25 Aralık 2026", "28 Aralık 2026–1 Ocak 2027", "4–8 Ocak 2027", "11–15 Ocak 2027",
  "18–22 Ocak 2027", "8–12 Şubat 2027", "15–19 Şubat 2027", "22–26 Şubat 2027", "1–5 Mart 2027",
  "15–19 Mart 2027", "22–26 Mart 2027", "29 Mart–2 Nisan 2027", "5–9 Nisan 2027", "12–16 Nisan 2027",
  "19–23 Nisan 2027", "26–30 Nisan 2027", "3–7 Mayıs 2027", "10–14 Mayıs 2027", "17–21 Mayıs 2027",
  "24–28 Mayıs 2027", "31 Mayıs–4 Haziran 2027", "7–11 Haziran 2027", "14–18 Haziran 2027", "21–25 Haziran 2027",
  "25 Haziran 2027",
];
const MONTHS = [
  "Eylül", "Ekim", "Ekim", "Ekim", "Ekim",
  "Kasım", "Kasım", "Kasım", "Kasım", "Aralık",
  "Aralık", "Aralık", "Aralık", "Ocak", "Ocak",
  "Ocak", "Şubat", "Şubat", "Şubat", "Mart",
  "Mart", "Mart", "Mart", "Nisan", "Nisan",
  "Nisan", "Nisan", "Mayıs", "Mayıs", "Mayıs",
  "Mayıs", "Mayıs", "Haziran", "Haziran", "Haziran",
  "Haziran",
];
const UNITS = [
  "Oryantasyon ve İş Sağlığı", "Oryantasyon ve İş Sağlığı", "Algoritma ve Akış Şeması", "Algoritma ve Akış Şeması", "Elektroniğin Temelleri",
  "Elektroniğin Temelleri", "Mikrodenetleyiciye Giriş", "Mikrodenetleyiciye Giriş", "Giriş Birimleri", "Giriş Birimleri",
  "Işık ve Ses Sensörleri", "Işık ve Ses Sensörleri", "Ara Proje: Akıllı Ev", "Ara Proje: Akıllı Ev", "Dönem Sonu Değerlendirme",
  "Dönem Sonu Değerlendirme", "Mesafe Sensörleri (HC-SR04)", "Mesafe Sensörleri (HC-SR04)", "Motorlar ve Motor Sürücüler", "Motorlar ve Motor Sürücüler",
  "Otonom Robot Mantığı", "Otonom Robot Mantığı", "Robot Şasesi Montajı", "Robot Şasesi Montajı", "Engelden Kaçan ve Çizgi İzleyen",
  "Engelden Kaçan ve Çizgi İzleyen", "Hackathon: Fikir ve Plan", "Hackathon: Fikir ve Plan", "Prototipleme ve İnovasyon", "Prototipleme ve İnovasyon",
  "Prototipleme ve İnovasyon", "Prototipleme ve İnovasyon", "Test ve Dokümantasyon", "Test ve Dokümantasyon", "Yıl Sonu Robotik Sergisi",
  "Yıl Sonu Robotik Sergisi",
];
const TITLES = [
  "Kulüp, robotik ve güvenlik kültürü", "Takım sözleşmesi, çalışma alanı ve güvenlik sınavı", "Doğrusal ve şartlı algoritma", "Döngüler ve ilk blok kod", "Ohm kanunu, LED ve Tinkercad ilk devre",
  "Breadboard, seri-paralel ve fiziksel LED", "Arduino anatomisi ve Blink", "Harici LED ve trafik ışığı", "Buton: dijital giriş ve LED kontrolü", "Potansiyometre ve analog okuma",
  "LDR ile gece lambası", "Buzzer ve sesli ikaz", "Akıllı ev: problem ve maket", "Akıllı ev: birleşik devre", "Akran demo ve rubrik",
  "Sunum, yoklama ve portfolyo", "Ultrasonik mesafe ölçümü", "Park sensörü uygulaması", "Servo ve DC motor temeli", "L298N ile yön ve hız",
  "IR çizgi sensörü", "Çizgi izleme algoritması", "Mekanik kurulum", "Besleme ve ilk hareket", "Engel kaçınma kodu",
  "Saha testi ve mini yarış", "Problem tarama ve üç fikir", "Seçim, ölçüt ve protokol", "Çekirdek işlev (risk önce)", "Mekanik / 3D / maket",
  "Entegrasyon", "Dayanıklılık ve kapsam kesme", "On denemelik test protokolü", "Rapor, afiş ve sunum metni", "Prova ve stant kurulumu",
  "Sergi, jüri ve sertifika",
];
const OUTCOMES = [
  "Robotu bileşenleriyle tanımlar; kulüp düzenini ve güvenlik kurallarını açıklar.",
  "Güvenlik baraj sınavını geçer; takım sözleşmesini uygular.",
  "Doğrusal ve şartlı mantığı akış şemasıyla kurar.",
  "Döngü mantığını kurar; blok kodla program yazar.",
  "Ohm kanununu uygular; Tinkercad'de ilk devresini kurar.",
  "Breadboard kullanımını ve seri-paralel bağlantıyı uygular.",
  "Arduino yapısını tanır; IDE ile Blink yükler.",
  "Harici LED ve trafik ışığı dizisini kodlar.",
  "Butonla dijital giriş okur; LED'i kontrol eder.",
  "Analog okuma ve PWM ile parlaklığı ayarlar.",
  "LDR ile otomatik gece lambası kurar.",
  "Buzzer ile ikaz ve alarm sistemi kurar.",
  "Problem tanımlar; maket ve devre şeması yapar.",
  "Devreleri birleştirir; test ve hata ayıklama yapar.",
  "Akran sunumu ve rubrikle değerlendirir.",
  "Sunum ve dönem portfolyosunu tamamlar.",
  "Ultrasonik sensörle mesafe ölçer; eşik ayarlar.",
  "Mesafeye göre ikaz sistemi kodlar.",
  "Servo ve DC motor çalıştırır.",
  "L298N ile yön ve hız kontrolü yapar.",
  "IR sensörle çizgi algılar, kalibre eder.",
  "Çizgi izleme algoritmasını kurar, test eder.",
  "Robot şasesini mekanik olarak kurar.",
  "Besleme ve kablolamayı yapar; hareket sağlar.",
  "Engel kaçınma davranışını kodlar.",
  "Pistte kalibrasyon ve mini yarış yapar.",
  "Sorun tarar; fizibilite ile üç fikir üretir.",
  "Fikir seçer; ölçüt, Gantt ve BOM hazırlar.",
  "Riskli parçayı önce çalıştırır; eleştiri turu yapar.",
  "Gövde/3D/maket üretir; dayanım kontrolü yapar.",
  "Sensör-motor-kodu birleştirir; günlük tutar.",
  "Dayanıklılık testi yapar; kapsamı keser.",
  "Test protokolü uygular; veri toplar.",
  "Rapor, afiş ve sunum metni hazırlar.",
  "Jüri provası ve stant kurulumu yapar.",
  "Sergide sunar; değerlendirme ve sertifika alır.",
];
const HOURS = [
  ["Robotik nedir, kulüp nasıl işler?", "Atölye güvenliği, zimmet ve takım"],
  ["Takım sözleşmesi, çalışma istasyonu", "Güvenlik baraj sınavı, yıl haritası"],
  ["Algoritma: günlük yaşam örnekleri", "Şartlı mantık ve akış şeması"],
  ["Döngü türleri, bozuk algoritma avı", "Scratch/mBlock: ilk program"],
  ["Gerilim, akım, direnç, LED matematiği", "Tinkercad: pil, direnç, LED"],
  ["Breadboard iç yapısı", "Fiziksel LED, seri-paralel"],
  ["Mikrodenetleyici ve Uno turu", "IDE/mBlock ile Blink yükleme"],
  ["Harici LED (D8 + 220Ω)", "Trafik ışığı dizisi"],
  ["digitalRead ve INPUT_PULLUP", "Butonla LED, basış sayacı"],
  ["analogRead (0–1023), Serial", "PWM ile LED parlaklığı (map)"],
  ["Gerilim bölücü, ışık kalibrasyonu", "Eşik değeriyle otomatik lamba"],
  ["Aktif buzzer, dijital ikaz", "Buton + LDR alarm sistemi"],
  ["Senaryo, kısıt, karton maket", "Devre şeması, görev bölüşümü"],
  ["LDR+buton+LED+buzzer birleşimi", "Test, hata ayıklama, belge"],
  ["3 dakikalık akran sunumu", "Kod-şema-devre denetimi"],
  ["Dönem sonu sunumları", "Mini pratik, dönem klasörü"],
  ["Trig/echo, pulseIn, cm=us/58", "Eşik, kör bölge, seri izleme"],
  ["Mesafeye bağlı buzzer temposu", "Üç LED bar ve histerezis"],
  ["SG90 servo (0–180°)", "DC motor ve sürücü ihtiyacı"],
  ["L298N: ENA, IN1–IN4, GND", "İleri/geri/sol/sağ fonksiyonları"],
  ["Siyah/beyaz, yükseklik kalibrasyonu", "İki ve üç sensör okuma"],
  ["İzle/kaybettim/kavşak akışı", "Masaüstü stand testi"],
  ["2WD şase, vida, tekerlek", "Motor ve top teker montajı"],
  ["Pil, sürücü, kablo düzeni", "Zamanlı ileri gidiş"],
  ["HC-SR04 ile dur-geri", "Sapma ve tarama"],
  ["Çizgi pistinde kalibrasyon", "Mini yarış, ayar defteri"],
  ["Okul/mahalle sorunu tarama", "Fizibilite: malzeme, süre"],
  ["Fikir seçimi, başarı ölçütü", "Gantt, rol, BOM, plan"],
  ["En riskli parçayı çalıştırma", "Tasarım eleştirisi"],
  ["Gövde, tutucu, 3D parça", "Dayanım ve güvenlik kontrolü"],
  ["Sensör-motor-kod birleştirme", "Hata günlüğü"],
  ["Başkası çalıştırabilmeli testi", "Yedek plan, kablo yönetimi"],
  ["Test tablosu ve veri", "İyileştirme turu"],
  ["Rapor şablonu", "A3 afiş, demo provası"],
  ["Jüri soru provası", "Stant kurulumu, sertifika"],
  ["Şenlik akış planı", "Söküm, veli turu, kapanış"],
];

const SCHOOL = "AHMET ZİYLAN ANADOLU İMAM HATİP LİSESİ";
const YEAR = "2026–2027 Eğitim ve Öğretim Yılı";

// ---------------------------------------------------------------- stil
const thin = { style: "thin", color: { argb: "FF6B6B6B" } };
const BORDER = { top: thin, left: thin, right: thin, bottom: thin };
const HEADER_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F3864" } };
const UNIT_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCE6F1" } };
const ZEBRA_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2F6FB" } };
const FONT_TITLE = { name: "Calibri", size: 12, bold: true, color: { argb: "FF1F3864" } };
const FONT_SUB = { name: "Calibri", size: 10.5, bold: true, color: { argb: "FF1F3864" } };
const FONT_META = { name: "Calibri", size: 9 };
const FONT_META_B = { name: "Calibri", size: 9, bold: true };
const FONT_DESC = { name: "Calibri", size: 8, italic: true, color: { argb: "FF444444" } };
const FONT_HDR = { name: "Calibri", size: 9, bold: true, color: { argb: "FFFFFFFF" } };
const FONT_CELL = { name: "Calibri", size: 8 };
const FONT_CELL_B = { name: "Calibri", size: 8, bold: true };
const FONT_NOTE = { name: "Calibri", size: 8 };
const FONT_SIGN = { name: "Calibri", size: 9, bold: true };

// ---------------------------------------------------------------- yardımcı
function estHeight(cells, widths, min = 30) {
  let lines = 1;
  cells.forEach((text, i) => {
    if (!text) return;
    const w = widths[i] || 10;
    const charsPerLine = Math.max(8, Math.floor(w * 1.9));
    lines = Math.max(lines, Math.ceil(text.length / charsPerLine));
  });
  return Math.max(min, lines * 10.5 + 6);
}

// ---------------------------------------------------------------- sayfa kurucu
function buildSheet(wb, sem) {
  const ws = wb.addWorksheet(sem === 1 ? "1. Dönem" : "2. Dönem", {
    pageSetup: {
      paperSize: 9, orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 1,
      margins: { left: 0.35, right: 0.35, top: 0.45, bottom: 0.45, header: 0.2, footer: 0.2 },
      horizontalCentered: true,
    },
  });
  ws.views = [{ showGridLines: false }];

  const widths = [4.5, 8.5, 5.5, 13.5, 16, 34, 30];
  widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));
  const CW = widths.reduce((a, b) => a + b, 0); // ~112
  const LAST = "G";
  const R = {};

  // --- 1) Okul adı
  R.title = 1;
  ws.mergeCells(`A${R.title}:${LAST}${R.title}`);
  const t = ws.getCell(`A${R.title}`);
  t.value = SCHOOL;
  t.font = FONT_TITLE;
  t.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(R.title).height = 18;

  // --- 2) Ders + yıl
  R.sub = 2;
  ws.mergeCells(`A${R.sub}:${LAST}${R.sub}`);
  const s = ws.getCell(`A${R.sub}`);
  s.value = `${sem === 1 ? "ROBOTİK KODLAMA KURSU" : "ROBOTİK KODLAMA KURSU"} — YILLIK UYGULAMA PLANI (${YEAR})`;
  s.font = FONT_SUB;
  s.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(R.sub).height = 16;

  // --- 3) Künye satırı
  R.meta = 3;
  ws.mergeCells(`A${R.meta}:${LAST}${R.meta}`);
  const m = ws.getCell(`A${R.meta}`);
  m.value =
    `Sınıf/Düzey: Hazırlık–9. Sınıf    |    Haftalık Ders Saati: 2 saat (40+40 dk)    |    ` +
    `Süre: 36 Hafta (72 Ders Saati)    |    ${sem === 1 ? "1. Dönem (1.–16. Hafta, 32 Saat)" : "2. Dönem (17.–36. Hafta, 40 Saat)"}`;
  m.font = FONT_META_B;
  m.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  m.border = BORDER;
  ws.getRow(R.meta).height = 15;

  // --- 4) Açıklama
  R.desc = 4;
  ws.mergeCells(`A${R.desc}:${LAST}${R.desc}`);
  const d = ws.getCell(`A${R.desc}`);
  d.value =
    "Açıklama: Kurs; algoritma ve blok kodla başlar, temel elektronik ve mikrodenetleyici uygulamalarıyla somutlaşır; sensör, motor ve otonom robot uygulamalarıyla ilerleyerek takımlarca yürütülen özgün proje ve yıl sonu robotik sergisiyle tamamlanır. Uygulamalar Tinkercad simülasyonu ile Arduino/mBlock üzerinde yürütülür.";
  d.font = FONT_DESC;
  d.alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  d.border = BORDER;
  ws.getRow(R.desc).height = estHeight([d.value], [CW], 24);

  // --- 5) Tablo başlığı
  R.head = 5;
  const heads = ["Sıra No", "Ay", "Hafta", "Tarih / Zaman Aralığı", "Ünite / Tema", "Konu – Etkinlik / Uygulama", "Kazanım (Öğrenci ...)"];
  heads.forEach((h, i) => {
    const c = ws.getCell(R.head, i + 1);
    c.value = h;
  });
  ws.getRow(R.head).eachCell((c) => {
    c.font = FONT_HDR;
    c.fill = HEADER_FILL;
    c.border = BORDER;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(R.head).height = 26;

  // --- 6) Veri satırları
  const weeks = sem === 1 ? [1, 16] : [17, 36];
  let r = R.head;
  let prevUnit = "";
  for (let w = weeks[0]; w <= weeks[1]; w++) {
    r += 1;
    const idx = w - 1;
    const konu = `${TITLES[idx]} • 1. saat: ${HOURS[idx][0]} • 2. saat: ${HOURS[idx][1]}`;
    const row = ws.getRow(r);
    row.values = [w - weeks[0] + 1, MONTHS[idx], w, DATES[idx], UNITS[idx], konu, OUTCOMES[idx]];
    row.eachCell((c, col) => {
      c.border = BORDER;
      c.font = col === 5 ? FONT_CELL_B : FONT_CELL;
      c.alignment = { vertical: "middle", wrapText: true, horizontal: col <= 4 ? "center" : "left" };
      if (col === 5 && UNITS[idx] !== prevUnit) c.fill = UNIT_FILL;
    });
    row.height = estHeight([konu, OUTCOMES[idx]], [widths[5], widths[6]], 26);
    prevUnit = UNITS[idx];
  }
  R.lastData = r;

  // --- 7) Not satırı
  r += 2;
  R.note = r;
  ws.mergeCells(`A${R.note}:${LAST}${R.note}`);
  const n = ws.getCell(`A${R.note}`);
  n.value =
    "Not: Ayrıntılı haftalık işleniş planı (yöntem-teknik, araç-gerekçesi, ölçme) haftalık plan belgelerinde yer alır; yıl sonu başarısı özgün proje, sunum ve sergi performansıyla değerlendirilir. Tatil ve resmî bayramlar tarih aralıklarına göre takip edilir (1. dönem arası: 16–20 Kasım 2026; yarıyıl: 25 Ocak–5 Şubat 2027; 2. dönem arası: 8–12 Mart 2027).";
  n.font = FONT_NOTE;
  n.alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  ws.getRow(R.note).height = estHeight([n.value], [CW], 22);

  // --- 8) İmza bloğu — sağ alt
  r += 2;
  R.sign = r;
  ws.mergeCells(`A${R.sign}:E${R.sign}`);
  ws.mergeCells(`F${R.sign}:${LAST}${R.sign}`);
  const left = ws.getCell(`A${R.sign}`);
  const right = ws.getCell(`F${R.sign}`);
  left.value = "        Hazırlayan: Kurs Öğretmeni\n        Ad-Soyad / İmza:";
  right.value = `        ${sem === 1 ? "01/09/2026" : "01/02/2027"}\n        Okul Müdürü'nün Onayı\n        Ad-Soyad / İmza:`;
  left.font = FONT_SIGN;
  right.font = FONT_SIGN;
  left.alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  right.alignment = { horizontal: "left", vertical: "middle", wrapText: true };
  ws.getRow(R.sign).height = 52;

  // --- yazdırma alanı
  ws.pageSetup.printArea = `A1:${LAST}${R.sign}`;
  return ws;
}

// ---------------------------------------------------------------- üret
const wb = new ExcelJS.Workbook();
wb.creator = SCHOOL;
wb.subject = "Robotik Kodlama Kursu Yıllık Uygulama Planı";
wb.title = `Robotik Kodlama Kursu Yıllık Plan ${YEAR}`;
buildSheet(wb, 1);
buildSheet(wb, 2);

const outDir = path.join(__dirname, "..", "public", "yillik-plan");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "Robotik_Kodlama_Kursu_Yillik_Plan_2026-2027.xlsx");
wb.xlsx
  .writeFile(outPath)
  .then(() => console.log("YAZILDI:", outPath))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
