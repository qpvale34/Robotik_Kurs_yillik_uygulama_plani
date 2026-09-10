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
  { week: 7, semester: 1, unit: "Mikrodenetleyiciye giriş", title: "Arduino anatomisi ve Blink", hours: ["Mikrodenetleyici ve Uno turu", "IDE / mBlock ile Blink yükleme"] },
  { week: 8, semester: 1, unit: "Mikrodenetleyiciye giriş", title: "Harici LED ve trafik ışığı", hours: ["Harici LED: D8 + 220 Ω", "Trafik ışığı dizisi"] },
  { week: 9, semester: 1, unit: "Giriş birimleri", title: "Buton: dijital giriş ve LED kontrolü", hours: ["digitalRead ve INPUT_PULLUP", "Butonla LED, basılı tutma ve basış sayacı"] },
  { week: 10, semester: 1, unit: "Giriş birimleri", title: "Potansiyometre ve analog okuma", hours: ["analogRead 0–1023 ve Serial", "PWM ile LED parlaklığı (map)"] },
  { week: 11, semester: 1, unit: "Işık ve ses sensörleri", title: "LDR ile gece lambası", hours: ["Gerilim bölücü ve ışık kalibrasyonu", "Eşik değeriyle otomatik lamba"] },
  { week: 12, semester: 1, unit: "Işık ve ses sensörleri", title: "Buzzer ve sesli ikaz", hours: ["Aktif buzzer ve dijital ikaz", "Buton + LDR alarm sistemi"] },
  { week: 13, semester: 1, unit: "Ara proje: akıllı ev", title: "Akıllı ev: problem ve maket", hours: ["Senaryo, kısıt, karton ev", "Devre şeması ve görev bölüşümü"] },
  { week: 14, semester: 1, unit: "Ara proje: akıllı ev", title: "Akıllı ev: birleşik devre", hours: ["LDR + buton + LED + buzzer entegrasyonu", "Test, hata ayıklama, belge"] },
  { week: 15, semester: 1, unit: "Dönem sonu değerlendirme", title: "Akran demo ve rubrik", hours: ["3 dakikalık akran sunumu", "Kod-şema-devre denetimi"] },
  { week: 16, semester: 1, unit: "Dönem sonu değerlendirme", title: "Sunum, yoklama ve portfolyo", hours: ["Dönem sonu sunumları", "Mini pratik + 1. dönem klasörü"] },
  { week: 17, semester: 2, unit: "Mesafe sensörleri (HC-SR04)", title: "Ultrasonik mesafe ölçümü", hours: ["Trig, echo, pulseIn, cm = us/58", "Eşik, kör bölge, seri izleme"] },
  { week: 18, semester: 2, unit: "Mesafe sensörleri (HC-SR04)", title: "Park sensörü uygulaması", hours: ["Mesafeye bağlı buzzer temposu", "Üç LED bar ve histerezis"] },
  { week: 19, semester: 2, unit: "Motorlar ve motor sürücüler", title: "Servo ve DC motor temeli", hours: ["SG90 0–180 derece", "DC motor: neden 5V pin değil"] },
  { week: 20, semester: 2, unit: "Motorlar ve motor sürücüler", title: "L298N ile yön ve hız", hours: ["ENA, IN1–IN4, ortak GND", "İleri, geri, sol, sağ fonksiyonları"] },
  { week: 21, semester: 2, unit: "Otonom robot mantığı", title: "IR çizgi sensörü", hours: ["Siyah/beyaz ve yükseklik kalibrasyonu", "İki ve üç sensör okuma"] },
  { week: 22, semester: 2, unit: "Otonom robot mantığı", title: "Çizgi izleme algoritması", hours: ["Akış şeması: izle / kaybettim / kavşak", "Masaüstü stand testi"] },
  { week: 23, semester: 2, unit: "Robot şasesi montajı", title: "Mekanik kurulum", hours: ["2WD şase, vida, teker", "Motor ve top teker montajı"] },
  { week: 24, semester: 2, unit: "Robot şasesi montajı", title: "Besleme ve ilk hareket", hours: ["Pil, sürücü, kablo düzeni", "Zamanlı ileri gidiş"] },
  { week: 25, semester: 2, unit: "Engelden kaçan ve çizgi izleyen", title: "Engel kaçınma kodu", hours: ["HC-SR04 şase üzerinde dur-geri", "Sapma ve tarama"] },
  { week: 26, semester: 2, unit: "Engelden kaçan ve çizgi izleyen", title: "Saha testi ve mini yarış", hours: ["Çizgi pistinde kalibrasyon", "Mini yarış ve ayar defteri"] },
  { week: 27, semester: 2, unit: "Hackathon: fikir ve plan", title: "Problem tarama ve üç fikir", hours: ["Okul/mahalle sorunu tarama", "Fizibilite: malzeme, süre, güvenlik"] },
  { week: 28, semester: 2, unit: "Hackathon: fikir ve plan", title: "Seçim, ölçüt ve protokol", hours: ["Fikir seçimi ve başarı ölçütü", "Gantt, rol, BOM, tek sayfa plan"] },
  { week: 29, semester: 2, unit: "Prototipleme ve inovasyon", title: "Çekirdek işlev (risk önce)", hours: ["En riskli parçayı çalıştır", "Tasarım eleştirisi (3 soru)"] },
  { week: 30, semester: 2, unit: "Prototipleme ve inovasyon", title: "Mekanik / 3D / maket", hours: ["Gövde, tutucu, 3D kuyruk", "Dayanım ve güvenlik kontrolü"] },
  { week: 31, semester: 2, unit: "Prototipleme ve inovasyon", title: "Entegrasyon", hours: ["Sensör-motor-kod birleştirme", "Hata günlüğü"] },
  { week: 32, semester: 2, unit: "Prototipleme ve inovasyon", title: "Dayanıklılık ve kapsam kesme", hours: ["Başkası çalıştırabilir mi testi", "Yedek plan, kablo yönetimi"] },
  { week: 33, semester: 2, unit: "Test ve dokümantasyon", title: "On denemelik protokol", hours: ["Test tablosu ve veri", "İyileştirme turu"] },
  { week: 34, semester: 2, unit: "Test ve dokümantasyon", title: "Rapor, afiş, 3 dk metin", hours: ["Rapor şablonu", "A3 afiş ve demo koreografisi"] },
  { week: 35, semester: 2, unit: "Yıl sonu robotik sergisi", title: "Prova ve stant", hours: ["Jüri soru bankası prova", "Stant kurulumu ve sertifika"] },
  { week: 36, semester: 2, unit: "Yıl sonu robotik sergisi", title: "Sergi, jüri, sertifika", hours: ["Bilim şenliği run-of-show", "Söküm, veli turu, kapanış"] },
];
