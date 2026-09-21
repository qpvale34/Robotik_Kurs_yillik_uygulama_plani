export type WeekOutline = {
  week: number;
  semester: 1 | 2;
  unit: string;
  title: string;
  hours: [string, string];
};

export const OUTLINE: WeekOutline[] = [
  { week: 1, semester: 1, unit: "Oryantasyon ve iş sağlığı", title: "Kulüp, robotik ve güvenlik kültürü", hours: ["Robotik nedir, kulüp nasıl işler?", "Atölye güvenliği, zimmet ve takım"] },
  { week: 2, semester: 1, unit: "Oryantasyon ve iş sağlığı", title: "Takım sözleşmesi, workspace ve güvenlik sınavı", hours: ["Takım sözleşmesi ve çalışma istasyonu", "Güvenlik baraj sınavı ve yıl haritası"] },
  { week: 3, semester: 1, unit: "Algoritma ve akış şeması", title: "Doğrusal ve şartlı algoritma", hours: ["Algoritma: çay, sıraya girme, robot", "Şartlı mantık ve akış şeması işaretleri"] },
  { week: 4, semester: 1, unit: "Algoritma ve akış şeması", title: "Döngüler ve ilk blok kod", hours: ["Döngü türleri ve bozuk algoritma avı", "Scratch / mBlock: ilk çalışan program"] },
  { week: 5, semester: 1, unit: "Elektroniğin temelleri", title: "Ohm kanunu, LED ve Tinkercad ilk devre", hours: ["Gerilim, akım, direnç ve LED matematiği", "Tinkercad: pil, direnç, LED"] },
  { week: 6, semester: 1, unit: "Elektroniğin temelleri", title: "Breadboard, seri-paralel ve fiziksel LED", hours: ["Breadboard’un iç haritası", "Fiziksel LED yakma ve seri-paralel"] },
  { week: 7, semester: 1, unit: "Mikrodenetleyiciye giriş", title: "Arduino / DENEYAP anatomisi ve Blink", hours: ["Mikrodenetleyici ve pin yapısı", "IDE / mBlock ile Blink yükleme"] },
  { week: 8, semester: 1, unit: "Mikrodenetleyiciye giriş", title: "Harici LED ve trafik ışığı dizisi", hours: ["Harici LED: D8 + 220 Ω bağlantısı", "Trafik ışığı zamanlama dizisi"] },
  { week: 9, semester: 1, unit: "Giriş birimleri", title: "Buton: dijital giriş ve LED kontrolü", hours: ["digitalRead ve INPUT_PULLUP", "Butonla LED, basılı tutma ve basış sayacı"] },
  { week: 10, semester: 1, unit: "Giriş birimleri", title: "Potansiyometre ve analog okuma", hours: ["analogRead ve PWM sinyali", "PWM ile LED parlaklığı (map)"] },
  { week: 11, semester: 1, unit: "Işık ve ses sensörleri", title: "LDR ile otomatik gece lambası", hours: ["Gerilim bölücü ve ışık kalibrasyonu", "Eşik değeriyle otomatik lamba"] },
  { week: 12, semester: 1, unit: "Işık ve ses sensörleri", title: "Buzzer ve sesli ikaz sistemleri", hours: ["Aktif buzzer ve dijital ikaz", "Buton + LDR alarm sistemi"] },
  { week: 13, semester: 1, unit: "Ara proje: akıllı ev", title: "Akıllı ev: problem ve maket", hours: ["Senaryo, kısıt, karton maket ev", "Devre şeması ve görev bölüşümü"] },
  { week: 14, semester: 1, unit: "Ara proje: akıllı ev", title: "Akıllı ev: birleşik devre entegrasyonu", hours: ["LDR + buton + LED + buzzer birleşimi", "Test, hata ayıklama ve belgeleme"] },
  { week: 15, semester: 1, unit: "Dönem sonu değerlendirme", title: "Akran demo ve rubrik değerlendirmesi", hours: ["3 dakikalık akran sunumu", "Kod-şema-devre denetimi"] },
  { week: 16, semester: 1, unit: "Dönem sonu değerlendirme", title: "Dönem sonu sunumları ve portfolyo", hours: ["Dönem sonu sunumları", "Mini pratik sınav + 1. dönem klasörü"] },
  { week: 17, semester: 2, unit: "Mesafe sensörleri (HC-SR04)", title: "Ultrasonik mesafe ölçümü", hours: ["Trig, echo, pulseIn, cm = us/58", "Eşik, kör bölge, seri izleme"] },
  { week: 18, semester: 2, unit: "Mesafe sensörleri (HC-SR04)", title: "Akıllı park sensörü uygulaması", hours: ["Mesafeye bağlı buzzer temposu", "Üç LED bar ve histerezis ikazı"] },
  { week: 19, semester: 2, unit: "Motorlar ve motor sürücüler", title: "SG90 servo ve DC motor temeli", hours: ["SG90 0–180 derece servo kontrolü", "DC motor: harici besleme gereği"] },
  { week: 20, semester: 2, unit: "Motorlar ve motor sürücüler", title: "DENEYAP sürücü ile yön ve hız", hours: ["Hız ve yön sinyalleri, ortak GND", "İleri, geri, sol, sağ motor fonksiyonları"] },
  { week: 21, semester: 2, unit: "Otonom robot mantığı", title: "IR çizgi sensörü kalibrasyonu", hours: ["Siyah/beyaz ve yükseklik ayarı", "İki kanallı sensör okuma mantığı"] },
  { week: 22, semester: 2, unit: "Otonom robot mantığı", title: "Çizgi izleme algoritması", hours: ["Akış şeması: izle / kaybettim / toparla", "Masaüstü stand testi"] },
  { week: 23, semester: 2, unit: "Robot şasesi montajı", title: "REX 4WD mekanik kurulumu", hours: ["4WD şase, motor ve tekerlek montajı", "Kablo kanalları ve mekanik hizalama"] },
  { week: 24, semester: 2, unit: "Robot şasesi montajı", title: "18650 besleme ve ilk hareket", hours: ["Pil kutusu, emniyet anahtarı, kablo düzeni", "Zamanlı ileri sürüş ve duruş"] },
  { week: 25, semester: 2, unit: "Engelden kaçan ve çizgi izleyen", title: "Radar taramalı engel kaçınma", hours: ["HC-SR04 + servo pan-tilt tarama", "En açık rotayı seçen reaktif manevra"] },
  { week: 26, semester: 2, unit: "Engelden kaçan ve çizgi izleyen", title: "Pistte saha testi ve mini yarış", hours: ["Çizgi pistinde eşik kalibrasyonu", "Mini yarış, ayar defteri ve geribildirim"] },
  { week: 27, semester: 2, unit: "Göstergeler ve Telemetri (I2C LCD)", title: "I2C LCD ile Canlı Telemetri Paneli", hours: ["I2C Protokolü, SDA/SCL ve Ekrana Metin", "Canlı Telemetri: Mesafe, Çizgi ve Durum Ekranı"] },
  { week: 28, semester: 2, unit: "Kablosuz İletişim ve IoT (Bluetooth BLE)", title: "DENEYAP Bluetooth ile Telefondan Robot Kontrolü", hours: ["Dahili BLE Mimarisi ve Telefon Eşleşmesi", "Mobil Gamepad ile 4WD Sürüş, Far ve Korna"] },
  { week: 29, semester: 2, unit: "İleri Algoritmalar ve Durum Makineleri (FSM)", title: "Sonlu Durum Makinesi ile Çok Fonksiyonlu Robot", hours: ["FSM Mimarisi: enum Durumlar ve Butonla Geçiş", "Çoklu Görev Entegrasyonu (Çizgi/Engel/BLE)"] },
  { week: 30, semester: 2, unit: "İleri Çevre Sensörleri ve IoT (DHT11 & PIR)", title: "DHT11 Sıcaklık-Nem ve PIR ile Akıllı İstasyon", hours: ["DHT11 Dijital Çevre ve PIR Hareket Dedektörü", "Tematik Sergi Projeleri (Sera, Afet, Devriye)"] },
  { week: 31, semester: 2, unit: "Takım İnovasyon Projeleri: Mekanik & Donanım", title: "Özgün Tematik Robotik ve IoT Prototipleme", hours: ["Gövde Montajı ve Radar Braketi Sabitleme", "Kablo Disiplini, Kelepçeleme ve Güç Devresi"] },
  { week: 32, semester: 2, unit: "Güç Yönetimi ve Donanım Hata Ayıklama", title: "18650 Güç Kararlılığı ve Elektriksel Teşhis", hours: ["Li-ion Voltaj Düşümü (Brownout) ve Filtreleme", "Donanım Hata Teşhis Protokolü ve Debug Log"] },
  { week: 33, semester: 2, unit: "Saha Test Protokolü ve İyileştirme", title: "10 Tekrarlı Saha Testi ve Performans Optimizasyonu", hours: ["10 Tekrarlı Standart Test Protokolü ve Veri", "Fritzing Devre Şemasını Dijitalleştirme"] },
  { week: 34, semester: 2, unit: "Bilimsel Dokümantasyon ve Proje Afişi", title: "A3 Bilimsel Sergi Afişi ve Kod Dokümantasyonu", hours: ["TÜBİTAK/TEKNOFEST Standardında A3 Sergi Afişi", "Açık Kaynak Kod Arşivi ve README.md"] },
  { week: 35, semester: 2, unit: "İnteraktif Stant ve Jüri Simülasyonu (Pitching)", title: "3 Dakikalık Asansör Konuşması ve Stant Düzeni", hours: ["İnteraktif Stant Tasarımı ve Ziyaretçi Deneyimi", "3 Dakikalık Pitching ve Jüri Provatı"] },
  { week: 36, semester: 2, unit: "Büyük Robotik Bilim Şenliği ve Yıl Sonu Sergisi", title: "Bilim Şenliği, Canlı Yarışmalar ve Demo Day", hours: ["Bilim Şenliği Açılışı ve Canlı Parkur Yarışmaları", "Jüri Değerlendirmesi, Sertifika Töreni ve Kapanış"] },
];
