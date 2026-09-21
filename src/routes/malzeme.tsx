import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { BOM, CLUB } from "@/data/club";

export const Route = createFileRoute("/malzeme")({ component: MalzemePage });

const CATEGORIES = [
  "Tümü",
  "Bağlantı Kabloları",
  "Devre Kurulumu & Pasif Elemanlar",
  "Kontrol Kartı",
  "Sensörler & Gösterge Modülleri",
  "Motor & Sürücü",
  "Robot Şasesi & Mekanik Donanım",
  "Güç Kaynağı & Batarya",
] as const;

export function MalzemePage() {
  const [selectedCat, setSelectedCat] = useState<string>("Tümü");
  const [search, setSearch] = useState<string>("");

  const filteredItems = useMemo(() => {
    return BOM.filter((item) => {
      const matchCat = selectedCat === "Tümü" || item.category === selectedCat;
      const matchSearch =
        search.trim() === "" ||
        item.item.toLowerCase().includes(search.toLowerCase()) ||
        item.note.toLowerCase().includes(search.toLowerCase()) ||
        (item.whyNeeded && item.whyNeeded.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCat, search]);

  const totalCalculated = useMemo(() => {
    return BOM.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  }, []);

  const categoryTotals = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of BOM) {
      const cat = item.category || "Diğer";
      map.set(cat, (map.get(cat) || 0) + (item.totalPrice || 0));
    }
    return Array.from(map.entries()).map(([cat, total]) => ({
      cat,
      total,
      pct: ((total / totalCalculated) * 100).toFixed(1),
    }));
  }, [totalCalculated]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            2026–2027 Satın Alma & Laboratuvar Kiti
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Malzeme & Donanım Envanteri
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            {CLUB.audience} için hazırlanan 30 kalemlik tam teşekküllü robotik ve IoT laboratuvarı.
            8 aktif öğrenci takımı + %20 atölye yedek payı içerir. 3 Nisan sonrasındaki ileri otonom,
            I2C telemetri, Bluetooth BLE ve çevre inovasyon projeleri için eksik tüm bileşenler tamamlanmıştır.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`${import.meta.env.BASE_URL}yillik-plan/Alinacaklar_Listesi_Robotik_Kursu_2026-2027.xlsx`}
            download="Alinacaklar_Listesi_Robotik_Kursu_2026-2027.xlsx"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-accent/90"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Malzeme Listesi (Excel)
          </a>
          <a
            href={`${import.meta.env.BASE_URL}yillik-plan/Robotik_Kodlama_Kursu_Yillik_Plan_2026-2027.xlsx`}
            download="Robotik_Kodlama_Kursu_Yillik_Plan_2026-2027.xlsx"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:bg-canvas"
          >
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Yıllık Plan (Excel)
          </a>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-paper p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Toplam Bütçe</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-accent">
            {totalCalculated.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </p>
          <p className="mt-1 text-xs text-faint">KDV Dahil · 30 Kalem</p>
        </div>
        <div className="rounded-xl border border-line bg-paper p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Takım Kapasitesi</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">8 Takım + %20</p>
          <p className="mt-1 text-xs text-faint">16–20 Öğrenci</p>
        </div>
        <div className="rounded-xl border border-line bg-paper p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Kontrol Kartı</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">DENEYAP v2</p>
          <p className="mt-1 text-xs text-faint">ESP32 · BLE & Wi-Fi</p>
        </div>
        <div className="rounded-xl border border-line bg-paper p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Mobil Şase</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">REX 4WD</p>
          <p className="mt-1 text-xs text-faint">4 Çeker + 18650 Li-ion</p>
        </div>
      </div>

      {/* Neden Eklendi? (Pedagojik ve Donanımsal Gerekçeler) */}
      <div className="mt-8 rounded-xl border border-line/80 bg-paper/60 p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
            ✓
          </span>
          <h2 className="text-base font-semibold text-foreground">
            Gerçek Dünya İçin Yeni Eklenen 10 Kritik Bileşen
          </h2>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Önceki taslakta yer almayan ancak atölye pratiğinde devrenin çalışması ve 3 Nisan sonrasındaki zenginleştirilmiş
          kazanımların hayata geçmesi için zorunlu olan parçalar listeye dahil edilmiştir:
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">1. Erkek-Erkek (M-M) Jumper</span>
            <p className="mt-1 text-muted">
              Breadboard ray köprüleri ve buton/pot bağlantıları M-M kablo olmadan fiziksel olarak kurulamaz.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">2. Sarı, Mavi ve 5mm RGB LED</span>
            <p className="mt-1 text-muted">
              Trafik lambası için sarı LED şarttır; RGB LED ise tek başına FSM robot modlarını (Çizgi/Engel/BLE) renklerle kodlar.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">3. 2'li 18650 Anahtarlı Pil Kutusu</span>
            <p className="mt-1 text-muted">
              Piller açıkta şaseye bağlanamaz; 7.4V anahtarlı kutu acil durumlarda motor enerjisini tek tuşla keser.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">4. I2C 16x2 Karakter LCD Ekran</span>
            <p className="mt-1 text-muted">
              Robotun hızını, ultrasonik mesafesini, zemin rengini ve pil voltajını bilgisayarsız canlı telemetri paneliyle gösterir.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">5. DHT11 Sıcaklık ve Nem Sensörü</span>
            <p className="mt-1 text-muted">
              Takım inovasyon projelerinde gerçek zamanlı çevre ve sera iklim verisi toplamak için elzemdir.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">6. HC-SR501 PIR Hareket Dedektörü</span>
            <p className="mt-1 text-muted">
              Akıllı okul güvenliği, afet erken uyarısı ve sergi stantlarında insan etkileşimi oluşturmak için gereklidir.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">7. SG90 Servo Ultrasonik Radar Braketi</span>
            <p className="mt-1 text-muted">
              HC-SR04 sensörünü servo miline rijit sabitleyerek robotun 180° pan-tilt radar taraması yapmasını sağlar.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">8. Pasif Buzzer (Melodi & Frekans)</span>
            <p className="mt-1 text-muted">
              Aktif buzzer tek ton üretirken, pasif buzzer `tone()` fonksiyonuyla müzikal melodiler ve değişken tempolu ikazlar çalar.
            </p>
          </div>
          <div className="rounded-lg border border-line/60 bg-paper p-3 text-xs">
            <span className="font-semibold text-foreground">9. Atölye Montaj Sarf Paketi</span>
            <p className="mt-1 text-muted">
              Kablo bağları (kelepçe), çift taraflı köpük bant ve cırt cırt; şase üzerindeki parçaların titreşimde kopmasını önler.
            </p>
          </div>
        </div>
      </div>

      {/* Category Spending Breakdown */}
      <div className="mt-8 rounded-xl border border-line bg-paper p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Bütçe Dağılımı (Kategori Bazlı)</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {categoryTotals.map((c) => (
            <div key={c.cat} className="rounded-lg border border-line/60 bg-canvas/40 p-3">
              <p className="text-[11px] font-medium text-muted line-clamp-1" title={c.cat}>
                {c.cat}
              </p>
              <p className="mt-1 text-base font-bold text-foreground">
                {c.total.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL
              </p>
              <p className="text-[11px] font-medium text-accent">%{c.pct}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  active
                    ? "bg-accent text-white shadow-sm"
                    : "bg-paper text-muted hover:bg-canvas hover:text-foreground border border-line"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Malzeme veya özellik ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3 py-1.5 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {/* Main Material Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-paper shadow-sm">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas/60 text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3 font-semibold w-12 text-center">#</th>
              <th className="px-4 py-3 font-semibold">Malzeme & Mağaza</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 font-semibold">Takım / Sınıf</th>
              <th className="px-4 py-3 font-semibold text-right">Birim Fiyat</th>
              <th className="px-4 py-3 font-semibold text-right">Toplam Tutar</th>
              <th className="px-4 py-3 font-semibold">Kullanım Fazı</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {filteredItems.map((row, idx) => (
              <tr key={row.item} className="hover:bg-canvas/40 transition-colors">
                <td className="px-4 py-3 text-center text-xs text-muted tabular-nums">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    {row.item}
                    {row.storeUrl && (
                      <a
                        href={row.storeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-[10px] font-medium text-accent hover:underline"
                        title="Mağazada Görüntüle"
                      >
                        Mağaza ↗
                      </a>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted leading-relaxed">{row.note}</p>
                  {row.whyNeeded && (
                    <p className="mt-1 text-[11px] text-accent/90 italic">
                      <span className="font-medium not-italic">Kazanım:</span> {row.whyNeeded}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="inline-block rounded-md border border-line bg-canvas/80 px-2 py-0.5 text-[11px] text-muted">
                    {row.category || "Genel"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs tabular-nums text-foreground">
                  <div>Takım: {row.qtyPerTeam}</div>
                  <div className="text-muted text-[11px]">8 Takım: {row.teamsOf8}</div>
                </td>
                <td className="px-4 py-3 text-right text-xs tabular-nums text-muted">
                  {row.unitPrice ? `${row.unitPrice.toFixed(2)} TL` : "—"}
                </td>
                <td className="px-4 py-3 text-right text-xs font-semibold tabular-nums text-foreground">
                  {row.totalPrice ? `${row.totalPrice.toFixed(2)} TL` : "—"}
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                    {row.phase}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && (
        <div className="mt-8 text-center py-12 rounded-xl border border-dashed border-line bg-paper">
          <p className="text-sm text-muted">Aranan kriterlere uygun malzeme bulunamadı.</p>
        </div>
      )}
    </main>
  );
}
