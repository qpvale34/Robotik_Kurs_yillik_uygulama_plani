export type Source = {
  id: string;
  title: string;
  origin: string;
  year: string;
  how: string;
  url?: string;
};

export const SOURCES: Source[] = [
  {
    id: "meb-rk-2023",
    title: "Robotik Kodlama Dersi Öğretim Programı (I–II)",
    origin: "MEB Talim ve Terbiye Kurulu · Ortaokul 5–6. sınıf seçmeli",
    year: "2023",
    how: "Ünite sırası ve spiral yapı (kavram → kodlama → ortam → bileşen → devre) korundu. Kulüp, seçmeli dersin yerini tutmaz; 72 saatlik atölye derinliği verir. Kazanım fiilleri gözlemlenebilir yazıldı.",
    url: "https://mufredat.meb.gov.tr/Dosyalar/2023112492416413-23174032_robotikkodlamadersiogretimprogrami_03.23.pdf",
  },
  {
    id: "meb-bty",
    title: "Bilişim Teknolojileri ve Yazılım Dersi Öğretim Programı (robotik ünite)",
    origin: "MEB",
    year: "2024",
    how: "Algoritmayı sözel ve görsel ifade, günlük sorun (erişilebilirlik, çevre, ulaşım) ve iş birliği vurgusu yıl sonu hackathon ölçütlerine işlendi.",
  },
  {
    id: "meb-takvim",
    title: "2026–2027 Eğitim ve Öğretim Yılı Çalışma Takvimi",
    origin: "MEB genelge 2026/68",
    year: "2026",
    how: "14 Eylül açılış, 16–20 Kasım ve 8–12 Mart ara tatil, 22 Ocak dönem sonu, 8 Şubat 2. dönem, 25 Haziran kapanış. 36 kulüp haftası bu boşluklara oturtuldu.",
    url: "https://www.meb.gov.tr/2026-2027-egitim-ogretim-yili-takvimi-aciklandi/haber/41057/tr",
  },
  {
    id: "deneyap",
    title: "Robotik ve Kodlama (Deneyap / TÜBİTAK ortaokul)",
    origin: "Üçgül, Çetin, Yükseltürk, Top · TÜBİTAK",
    year: "2021",
    how: "Blok ortam → fiziksel robot köprüsü ve proje takvimi (önce ders, sonra takım) 2. dönem yapısına uyarlandı.",
    url: "https://tubitak.gov.tr/sites/default/files/25506/robotik_kodlama_ortaokul.pdf",
  },
  {
    id: "meb-kit",
    title: "MEB-KİT / EBA robotik video sırası",
    origin: "MEB Yenilik ve Eğitim Teknolojileri",
    year: "2020–",
    how: "LED → buton → potansiyometre → buzzer → LDR → ultrasonik → servo → çizgi/engel. Her yeni giriş birimi bir önceki çıkışa bağlanır.",
  },
  {
    id: "5e",
    title: "5E öğretim modeli (Engage–Explore–Explain–Elaborate–Evaluate)",
    origin: "Bybee ve ark., BSCS",
    year: "1997 / 2014",
    how: "Her 40 dakikanın akış evreleri (açılış, keşif/uygulama, açıklama, derinleştirme, çıkış bileti) 5E’ye denk düşer. Mini-anlatım 8–12 dk’yı aşmaz.",
  },
  {
    id: "pair",
    title: "Pair programming (sürücü–gözlemci)",
    origin: "Williams & Kessler; NCWIT pedagoji notları",
    year: "2003 / 2010",
    how: "10 dakikada bir klavye el değiştirir. Gözlemci sesli düşünür. 16 kişilik kulüpte 8 kit yeter.",
  },
  {
    id: "edp",
    title: "Mühendislik tasarım döngüsü",
    origin: "ITEEA / NASA classroom EDP (sorun–kısıt–fikir–prototip–test–iyileştir)",
    year: "2010–",
    how: "Hafta 27–34’te ‘en riskli parça önce’, kapsam kesme kapısı ve 10 denemelik test protokolü bu döngüden gelir.",
  },
  {
    id: "sim-first",
    title: "Simülasyon-önce, donanım-sonra",
    origin: "MEB programı benzetim kazanımları (RK.1.3.2, RK.1.5.1) + Tinkercad Circuits sınıf pratiği",
    year: "2017–",
    how: "40 dakikaya sığmayan ‘neden yanmıyor’ döngüsünü keser. Aynı dersin 2. saatinde veya ertesi hafta fiziksel kopya.",
  },
  {
    id: "arduino",
    title: "Arduino Language Reference & Safety (akım limitleri, pinMode, pulseIn)",
    origin: "Arduino.cc docs",
    year: "sürekli",
    how: "Pin başına ~20 mA, toplam ~200–400 mA; motor 5V pininden sürülmez. HC-SR04 mesafe us/58. INPUT_PULLUP varsayılan buton yöntemi.",
    url: "https://docs.arduino.cc/",
  },
  {
    id: "iso8373",
    title: "ISO 8373 — Robot tanımı (sadeleştirilmiş)",
    origin: "ISO",
    year: "2021",
    how: "Hafta 1: programlanabilir, ortamı algılar, fiziksel eylem. ‘Her otomat robot değildir’ ölçütü.",
  },
  {
    id: "block-text",
    title: "Bloktan metin koda köprü",
    origin: "Grover & Basu; Weintrop & Wilensky (blok/metin geçişi alanyazını)",
    year: "2017–2018",
    how: "Ortaokul mBlock/Scratch; 7–8. haftadan itibaren aynı algoritma C++ gösterilir. Lisede Blink’ten C++.",
  },
];

export const ALIGNMENT = [
  {
    meb: "RK.1.1 Robotik kavramına giriş",
    weeks: "1–2",
    note: "Tanım, tür, risk, güvenlik, takım. Seçmeli dersteki 4 saatin atölye karşılığı 4×40 dk’dır çünkü zimmet ve baraj sınavı eklenir.",
  },
  {
    meb: "RK.1.2 Kodlamaya giriş (algoritma, karar, döngü, akış)",
    weeks: "3–4",
    note: "Kâğıt şema önce, Scratch/mBlock sonra. Veri tipi ve değişken 10. hafta analogla somutlanır.",
  },
  {
    meb: "RK.1.3 Ortamlar + RK.1.5.1 benzetim",
    weeks: "4–6",
    note: "Scratch/mBlock arayüz, Tinkercad Circuits, simülasyon-önce kuralı.",
  },
  {
    meb: "RK.1.4 Bileşenler + RK.1.5.2 LED projesi",
    weeks: "5–8",
    note: "Ohm, breadboard, Uno, Blink, harici LED, trafik ışığı.",
  },
  {
    meb: "RK.2.1 Giriş düzeyi (LED, motor) ve giriş birimleri",
    weeks: "9–20",
    note: "Buton, analog, LDR, buzzer, akıllı ev, HC-SR04, servo, L298N.",
  },
  {
    meb: "RK.2.2 Orta düzey (çizgi, akıllı aydınlatma)",
    weeks: "11–14 ve 21–26",
    note: "Gece lambası 1. dönemde; çizgi ve engel 2. dönemde şase üzerinde.",
  },
  {
    meb: "RK.2.3 İleri düzey / özgün proje",
    weeks: "27–36",
    note: "Hackathon, prototip, test protokolü, sergi. Kulüp seçmeli dersin 36 saatlik ileri ünitesini proje tabanıyla karşılar.",
  },
];
