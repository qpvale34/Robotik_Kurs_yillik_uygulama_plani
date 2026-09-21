import { createFileRoute, Link } from "@tanstack/react-router";
import { CALENDAR_MARKS, HOLIDAYS, SCHOOL_YEAR, TEACHER_SEPTEMBER, WEEK_DATES } from "@/data/calendar";
import { OUTLINE } from "@/data/outline";
import { padWeek } from "@/lib/utils";

export const Route = createFileRoute("/takvim")({ component: TakvimPage });

const SATURDAY_DAYS = [
  // 1. Dönem (14 Kurs Günü)
  { no: 1, date: "3 Ekim 2026", month: "Ekim", sem: 1, title: "Kulüp Oryantasyonu ve Atölye Güvenliği", type: "ders" },
  { no: 2, date: "10 Ekim 2026", month: "Ekim", sem: 1, title: "Doğrusal ve Şartlı Algoritmalar", type: "ders" },
  { no: 3, date: "17 Ekim 2026", month: "Ekim", sem: 1, title: "Döngüler ve Scratch/mBlock İlk Blok Kod", type: "ders" },
  { no: 4, date: "24 Ekim 2026", month: "Ekim", sem: 1, title: "Ohm Kanunu, LED ve Tinkercad Simülasyonu", type: "ders" },
  { no: 5, date: "31 Ekim 2026", month: "Ekim", sem: 1, title: "Breadboard Yapısı ve Fiziksel LED Devresi", type: "ders" },
  { no: 6, date: "7 Kasım 2026", month: "Kasım", sem: 1, title: "DENEYAP Kart / Arduino Anatomisi ve Blink", type: "ders" },
  { no: null, date: "14 Kasım 2026", month: "Kasım", sem: 1, title: "1. Ara Tatil (Ders Yapılmaz)", type: "tatil" },
  { no: null, date: "21 Kasım 2026", month: "Kasım", sem: 1, title: "1. Ara Tatil (Ders Yapılmaz)", type: "tatil" },
  { no: 7, date: "28 Kasım 2026", month: "Kasım", sem: 1, title: "Harici LED ve Trafik Işığı Dizisi", type: "ders" },
  { no: 8, date: "5 Aralık 2026", month: "Aralık", sem: 1, title: "Buton ile Dijital Giriş ve Sayıcı", type: "ders" },
  { no: 9, date: "12 Aralık 2026", month: "Aralık", sem: 1, title: "Potansiyometre, Analog Okuma ve PWM", type: "ders" },
  { no: 10, date: "19 Aralık 2026", month: "Aralık", sem: 1, title: "LDR ile Otomatik Gece Lambası", type: "ders" },
  { no: 11, date: "26 Aralık 2026", month: "Aralık", sem: 1, title: "Aktif/Pasif Buzzer ve Sesli Alarm Sistemi", type: "ders" },
  { no: 12, date: "2 Ocak 2027", month: "Ocak", sem: 1, title: "Ara Proje: Akıllı Ev Maketi ve Şeması", type: "ders" },
  { no: 13, date: "9 Ocak 2027", month: "Ocak", sem: 1, title: "Ara Proje: Çok Sensörlü Entegrasyon ve Test", type: "ders" },
  { no: 14, date: "16 Ocak 2027", month: "Ocak", sem: 1, title: "1. Dönem Sonu Akran Demosu ve Portfolyo", type: "ders" },
  { no: null, date: "23 Ocak – 6 Şubat 2027", month: "Ocak/Şubat", sem: 1, title: "Sömestr Tatili (Ders Yapılmaz)", type: "tatil" },

  // 2. Dönem (13 Kurs Günü)
  { no: 15, date: "13 Şubat 2027", month: "Şubat", sem: 2, title: "HC-SR04 Ultrasonik Mesafe Ölçümü", type: "ders" },
  { no: 16, date: "20 Şubat 2027", month: "Şubat", sem: 2, title: "Akıllı Park Sensörü (Buzzer + LED Bar)", type: "ders" },
  { no: 17, date: "27 Şubat 2027", month: "Şubat", sem: 2, title: "SG90 Servo ve DENEYAP Motor Sürücü", type: "ders" },
  { no: null, date: "6–13 Mart 2027", month: "Mart", sem: 2, title: "2. Ara Tatil & Ramazan Bayramı (Tatil)", type: "tatil" },
  { no: 18, date: "20 Mart 2027", month: "Mart", sem: 2, title: "DENEYAP IR Çizgi Sensörü ve Zemin Kalibrasyonu", type: "ders" },
  { no: 19, date: "27 Mart 2027", month: "Mart", sem: 2, title: "REX 4WD Şase Montajı, 18650 Güç ve İlk Sürüş", type: "ders" },
  { no: 20, date: "3 Nisan 2027", month: "Nisan", sem: 2, title: "Radar Taramalı Engelden Kaçan ve Çizgi Robotu", type: "milestone" },
  { no: 21, date: "10 Nisan 2027", month: "Nisan", sem: 2, title: "I2C 16x2 LCD ile Canlı Telemetri Paneli", type: "milestone" },
  { no: 22, date: "17 Nisan 2027", month: "Nisan", sem: 2, title: "DENEYAP Dahili Bluetooth (BLE) Kumanda", type: "milestone" },
  { no: 23, date: "24 Nisan 2027", month: "Nisan", sem: 2, title: "Sonlu Durum Makinesi (FSM) ile Çoklu Mod", type: "milestone" },
  { no: null, date: "1 Mayıs 2027", month: "Mayıs", sem: 2, title: "1 Mayıs Emek ve Dayanışma Günü (Tatil)", type: "tatil" },
  { no: 24, date: "8 Mayıs 2027", month: "Mayıs", sem: 2, title: "DHT11 & PIR Çevre Sensörleri ve İnovasyon", type: "milestone" },
  { no: null, date: "15–22 Mayıs 2027", month: "Mayıs", sem: 2, title: "Kurban Bayramı Tatili (Ders Yapılmaz)", type: "tatil" },
  { no: 25, date: "29 Mayıs 2027", month: "Mayıs", sem: 2, title: "Güç Yönetimi, Filtreleme ve 10 Denemelik Test", type: "milestone" },
  { no: 26, date: "5 Haziran 2027", month: "Haziran", sem: 2, title: "A3 Bilimsel Sergi Afişi ve 3 Dk Jüri Provası", type: "milestone" },
  { no: 27, date: "12 Haziran 2027", month: "Haziran", sem: 2, title: "Büyük Robotik Bilim Şenliği ve Demo Day", type: "sergi" },
];

function TakvimPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        2026–2027 Ahmet Ziylan AİHL
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Kurs ve Uygulama Takvimi
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Kursumuz MEB 36 haftalık çalışma takvimine göre planlanmış olup, Cumartesi günleri 2 ders saati (40+40 dk)
        olarak 27 oturumda icra edilmektedir. Özellikle <strong className="text-foreground">3 Nisan sonrası ileri faz</strong>;
        I2C telemetri, dahili BLE uzaktan kumanda, sonlu durum makineleri (FSM) ve 10 denemelik saha testleriyle
        büyük yıl sonu bilim şenliğine hazırlanır.
      </p>

      {/* Overview Grid */}
      <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Row k="Toplam Kurs Günü" v="27 Cumartesi (54 Saat)" />
        <Row k="MEB Plan Çerçevesi" v="36 Hafta (72 Saat)" />
        <Row k="1. Dönem" v="3 Ekim 2026 – 16 Ocak 2027 (14 Gün)" />
        <Row k="2. Dönem" v="13 Şubat – 12 Haziran 2027 (13 Gün)" />
      </dl>

      {/* 3 Nisan Dönüm Noktası Çağrısı */}
      <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 shadow-sm">
        <div className="flex items-center gap-2 text-accent">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white font-bold text-xs">
            ★
          </span>
          <h2 className="text-base font-bold text-foreground">
            3 Nisan 2027 Dönüm Noktası: İleri Otonom, Telemetri ve Sergi Fazı
          </h2>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Yıllık planın 20. kurs gününden (3 Nisan) itibaren öğrenciler pasif bekleyişi geride bırakarak üst düzey
          mühendislik fazına geçer: I2C 16x2 LCD ile araç üstü canlı telemetri göstergesi, DENEYAP dahili Bluetooth BLE
          ile akıllı telefondan robot sürüşü, Sonlu Durum Makinesi (FSM) ile çok fonksiyonlu otonom sürüş, DHT11 & PIR
          çevre istasyonu ve 10 tekrarlı test protokolü bu fazda tamamlanır.
        </p>
      </div>

      {/* Saturday Program Table */}
      <h2 className="mt-10 text-xl font-bold tracking-tight text-foreground">
        27 Cumartesi Oturumu ve İlerleme Akışı
      </h2>
      <p className="mt-1 text-xs text-muted">
        Ahmet Ziylan AİHL Cumartesi kurs oturumları (2 ders saati, 40+40 dk):
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-paper shadow-sm">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas/60 text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3 font-semibold w-16 text-center">Kurs Günü</th>
              <th className="px-4 py-3 font-semibold w-40">Tarih</th>
              <th className="px-4 py-3 font-semibold">Konu / Etkinlik Özeti</th>
              <th className="px-4 py-3 font-semibold w-28 text-center">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {SATURDAY_DAYS.map((row, idx) => {
              const isMilestone = row.type === "milestone";
              const isTatil = row.type === "tatil";
              const isSergi = row.type === "sergi";
              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isMilestone
                      ? "bg-accent/[0.03] hover:bg-accent/[0.08]"
                      : isTatil
                      ? "bg-canvas/40 opacity-75"
                      : isSergi
                      ? "bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12]"
                      : "hover:bg-canvas/40"
                  }`}
                >
                  <td className="px-4 py-3 text-center text-xs font-bold tabular-nums">
                    {row.no ? (
                      <span className={`inline-block rounded px-2 py-0.5 ${
                        isMilestone ? "bg-accent/15 text-accent" : isSergi ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "text-foreground"
                      }`}>
                        KG {row.no}
                      </span>
                    ) : (
                      <span className="text-faint">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`font-medium ${isMilestone ? "text-accent font-semibold" : isSergi ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-foreground"}`}>
                      {row.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    {isTatil && (
                      <span className="inline-block rounded-full bg-line px-2 py-0.5 text-[11px] text-muted">
                        Tatil
                      </span>
                    )}
                    {isMilestone && (
                      <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                        İleri Faz
                      </span>
                    )}
                    {isSergi && (
                      <span className="inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        Demo Day
                      </span>
                    )}
                    {row.type === "ders" && (
                      <span className="inline-block rounded-full bg-canvas px-2 py-0.5 text-[11px] text-muted">
                        Ders
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 36 Haftalık MEB Şeridi */}
      <h2 className="mt-10 text-xl font-bold tracking-tight text-foreground">
        MEB 36 Haftalık Müfredat Şeridi
      </h2>
      <p className="mt-1 text-xs text-muted">
        Haftalık ders planlarını, kod örneklerini, devre şemalarını ve akış adımlarını incelemek için haftaya tıklayın:
      </p>

      <ol className="mt-4 grid gap-2">
        {WEEK_DATES.map((d) => {
          const o = OUTLINE[d.week - 1];
          const isPostApril = d.week >= 27;
          return (
            <li key={d.week}>
              <Link
                to="/hafta/$week"
                params={{ week: String(d.week) }}
                className={`grid gap-1 rounded-xl border px-4 py-3 transition shadow-sm sm:grid-cols-[4.5rem_12rem_1fr] sm:items-baseline ${
                  isPostApril
                    ? "border-accent/30 bg-accent/[0.02] hover:bg-accent/[0.08]"
                    : "border-line bg-paper hover:bg-canvas/50"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-accent">{padWeek(d.week)}</span>
                  {isPostApril && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" title="Zenginleştirilmiş İleri Faz" />
                  )}
                </div>
                <span className="text-xs text-muted">{d.dates}</span>
                <div className="text-sm">
                  <span className="font-medium text-foreground">{o.title}</span>
                  <span className="ml-2 text-xs text-muted hidden sm:inline">({o.unit})</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Tatil ve Resmî Günler */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-base font-bold text-foreground">Resmî Tatiller ve Kaydırmalar</h2>
          <ul className="mt-3 grid gap-2">
            {HOLIDAYS.map((h) => (
              <li key={h.date} className="rounded-lg border border-line bg-paper p-3 text-xs shadow-sm">
                <span className="font-semibold text-foreground">{h.name}</span>
                <span className="text-muted"> · {h.date}</span>
                <p className="mt-0.5 text-muted">{h.weekHint}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold text-foreground">Atölye ve Takvim Notları</h2>
          <ul className="mt-3 grid gap-2">
            {CALENDAR_MARKS.slice(0, 5).map((m) => (
              <li key={m.id} className="rounded-lg border border-line bg-paper p-3 text-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{m.label}</span>
                  <span className="text-[11px] font-medium text-accent">{m.dates}</span>
                </div>
                {m.note ? <p className="mt-1 text-muted leading-relaxed">{m.note}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4 shadow-sm">
      <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{k}</dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{v}</dd>
    </div>
  );
}
