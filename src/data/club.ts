import type { BomItem } from "./types";

export const CLUB = {
  name: "Robotik Atölye",
  fullName: "Okul Robotik Kulübü Yıllık Uygulama Planı",
  year: "2026–2027",
  audience: "Ortaokul / Lise",
  duration: "36 hafta · haftada 2 ders saati (40 + 40 dk)",
  totalHours: 72,
  groupSize: "12–16 öğrenci · 2 kişilik takımlar (yedek: 3’lü)",
  platforms: "Tinkercad (simülasyon) · Arduino / mBot / LEGO SPIKE · Scratch / mBlock / Arduino IDE (C++)",
  purpose:
    "Algoritmik düşünme, problem çözme, takım çalışması ve disiplinler arası proje geliştirme becerisi kazandırmak; öğrencileri LED yakmaktan otonom robota ve yıl sonu sergisine kadar somut bir üretim hattında yürütmek.",
} as const;

export const AIMS = [
  "Robotik sistemleri algıla–karar ver–eyle döngüsüyle tanımlar ve günlük hayattaki karşılıklarını ayırt eder.",
  "Algoritmayı sözel, akış şeması ve blok/metin kod olarak ifade eder; hataları sistematik ayıklar.",
  "Temel elektronik (Ohm kanunu, breadboard, dijital/analog sinyal) bilgisiyle güvenli devre kurar.",
  "Arduino veya eşdeğer kontrol kartında giriş (buton, LDR, HC-SR04, IR) ve çıkış (LED, buzzer, servo, DC motor) birimlerini programlar.",
  "Simülasyonda doğruladığı devreyi fiziksel ortamda test eder; Tinkercad → donanım köprüsünü uygular.",
  "Motor sürücü ve şase ile otonom davranış (engelden kaçma, çizgi izleme) algoritması yazar ve sahada ayarlar.",
  "Takım halinde özgün bir problem seçer, prototipler, belgeler ve sergiler.",
  "İş sağlığı, etik kullanım ve malzeme sorumluluğu kurallarına uyar.",
];

export const METHODS = [
  "5E (giriş–keşif–açıklama–derinleştirme–değerlendirme)",
  "Yaparak yaşayarak öğrenme · istasyon ve takım çalışması",
  "Çiftli programlama (sürücü–gözlemci, 10 dakikada bir rol değişimi)",
  "Simülasyon-önce, donanım-sonra (bilişsel yük ve malzeme kaybını düşürür)",
  "Bloktan metin koda köprü (mBlock / Scratch → Arduino C++)",
  "Mühendislik tasarım döngüsü (sorun–fikir–prototip–test–iyileştir)",
  "Akran geribildirimi ve kısa çıkış biletleri",
  "Proje tabanlı öğrenme (2. dönem ikinci yarısı)",
];

export const PEDAGOGY = [
  {
    title: "MEB Robotik Kodlama Dersi Öğretim Programı (2023)",
    detail:
      "Kazanımlar programın spiral yapısına hizalandı: kavram → kodlama → ortamlar → bileşenler → devre tasarımı. Kulüp dersi seçmeli dersin yerini tutmaz; onu atölye derinliğiyle tamamlar. Her saat gözlemlenebilir fiillerle yazıldı (kavrar, bağlar, ölçer, kodlar, test eder, belgeler).",
  },
  {
    title: "MEB-KİT öğrenme sırası",
    detail:
      "LED → buton → potansiyometre → buzzer → LDR → ultrasonik → servo → çizgi izleyen / engel. Bu sıra EBA MEB-KİT video dizisi ve sınıf gerçeğiyle örtüşür: her yeni giriş birimi bir önceki çıkış birimine bağlanır.",
  },
  {
    title: "Simülasyon-önce ilkesi",
    detail:
      "Tinkercad Circuits, kablo hatasını 40 dakikaya sığmayan ‘neden yanmıyor?’ döngüsünden kurtarır. MEB programı da benzetim ortamını açıkça önerir. Fiziksel karta geçiş aynı dersin ikinci saatinde veya ertesi hafta yapılır.",
  },
  {
    title: "Blok → metin köprüsü",
    detail:
      "Ortaokulda mBlock/Scratch ile başlanır; aynı algoritma 7–8. haftadan itibaren Arduino IDE’de gösterilir. Lise gruplarında ilk Blink’ten itibaren C++ kullanılır, bloklar yalnızca görselleştirme içindir.",
  },
  {
    title: "2 kişilik takım ve roller",
    detail:
      "Dört rol döner: kurucu (donanım), kodlayıcı, belgelendirici, sınayıcı. Çiftli programlamada klavye 10 dakikada bir el değiştirir. 16 kişilik kulüpte 8 kit yeter; yedek %20 malzeme şarttır.",
  },
  {
    title: "Ölçme-değerlendirme",
    detail:
      "Yüklenen kulüp planındaki ağırlıklar korundu: takım çalışması %20, dokümantasyon ve algoritma %30, mekanik-donanım %20, özgün proje ve sunum %30. Her saatin çıkış bileti biçimlendirici; 14, 16, 26 ve 36. haftalar düzey belirleyicidir.",
  },
];

export const SAFETY_RULES = [
  {
    id: "S1",
    title: "Enerjiyi kes, sonra bağla",
    text: "USB kablosu ve pil takılıyken breadboard’da kablo değiştirilmez. Kısa devre kartı ve pilı yakar.",
  },
  {
    id: "S2",
    title: "LED’e mutlaka direnç",
    text: "Kırmızı/yeşil LED için 220 Ω (veya 330 Ω) seri direnç zorunludur. Dirençsiz LED ve Arduino pin’i zarar görür.",
  },
  {
    id: "S3",
    title: "Motoru Arduino 5V’den sürme",
    text: "DC motor ve servo grubu ayrı pil paketinden (6×AA veya 2s Li-ion + korumalı devre) beslenir. GND’ler ortaklanır. Arduino 5V pini motor akımını taşımaz.",
  },
  {
    id: "S4",
    title: "Li-ion ve şarj",
    text: "Şişmiş, ezilmiş pil kullanılmaz. Şarj, yangın torbasında ve gözetim altında yapılır. Kulüpte çıplak 18650 tutulmaz.",
  },
  {
    id: "S5",
    title: "El aleti",
    text: "Yan keski, tornavida ve 3D yazıcı yalnızca öğretmen gözetiminde. Koruyucu gözlük 3D baskı ve kablo kesiminde takılır.",
  },
  {
    id: "S6",
    title: "Kablo disiplini",
    text: "Renk kodu: kırmızı = 5V, siyah = GND, sarı/turuncu = sinyal. Masa kenarına sarkan robot bırakılmaz.",
  },
  {
    id: "S7",
    title: "Göz ve kulak",
    text: "Aktif buzzer kulağa dayanmaz. Ultrasonik sensörün önüne göz yaklaştırılmaz (zararsızdır ama kalibrasyonu bozar).",
  },
  {
    id: "S8",
    title: "Acil durum",
    text: "Yanık/koku: USB çekilir, pencere açılır, öğretmen çağrılır. İlk yardım çantası ve CO₂/toz söndürücü atölyede görünür yerde durur.",
  },
];

export const RUBRIC = [
  {
    id: "R1",
    weight: 20,
    title: "Takım çalışması ve iletişim",
    desc: "Görev paylaşımı, rol değişimi, süreye uyum, akran dili.",
    levels: [
      { score: 1, label: "Başlangıç", text: "Görevi tek kişi üstlenir; iletişim kopuk, süre aşılır." },
      { score: 2, label: "Gelişen", text: "Roller var ama dengesiz; çatışma öğretmenle çözülür." },
      { score: 3, label: "Yeterli", text: "Roller döner, kararlar birlikte alınır, süre tutulur." },
      { score: 4, label: "İleri", text: "Takım kendi tıkanıklığını çözer; akranlara yardım eder, süreci belgeler." },
    ],
  },
  {
    id: "R2",
    weight: 30,
    title: "Dokümantasyon ve algoritma",
    desc: "Akış şeması, yorumlu kod, devre şeması, test kaydı.",
    levels: [
      { score: 1, label: "Başlangıç", text: "Kod kopya; şema yok; ‘çalışıyor’ dışında kanıt yok." },
      { score: 2, label: "Gelişen", text: "Akış şeması var ama kodla uyumsuz; yorumlar yetersiz." },
      { score: 3, label: "Yeterli", text: "Şema, kod ve test notu tutarlı; değişken adları anlamlı." },
      { score: 4, label: "İleri", text: "Sürüm notu, hata günlüğü ve iyileştirme gerekçesi var; başkası kodu sürdürebilir." },
    ],
  },
  {
    id: "R3",
    weight: 20,
    title: "Mekanik ve donanım becerisi",
    desc: "Kablolama, şase, malzeme, güvenlik.",
    levels: [
      { score: 1, label: "Başlangıç", text: "Gevşek kablo, dirençsüz LED, dağınık masa; güvenlik ihlali." },
      { score: 2, label: "Gelişen", text: "Devre çalışır ama kablo karmaşık; şase savruk." },
      { score: 3, label: "Yeterli", text: "Renk kodu, gerilme payı, sağlam montaj; güvenlik kontrol listesi imzalı." },
      { score: 4, label: "İleri", text: "Modüler kablolama, yedekleme, 3D/mekanik iyileştirme; başkası bakımı yapabilir." },
    ],
  },
  {
    id: "R4",
    weight: 30,
    title: "Özgün proje ve sunum",
    desc: "Yıl sonu sergisindeki çözüm veya robot performansı.",
    levels: [
      { score: 1, label: "Başlangıç", text: "Hazır örnek birebir; sunum okunur, demo başarısız." },
      { score: 2, label: "Gelişen", text: "Küçük özgünlük var; demo yarıda kalır, sorulara cevap sınırlı." },
      { score: 3, label: "Yeterli", text: "Gerçek bir soruna çözüm; demo tutarlı; 3 dakikalık sunum net." },
      { score: 4, label: "İleri", text: "Ölçülebilir iyileştirme (süre, mesafe, doğruluk); jüri sorularını veriyle yanıtlar." },
    ],
  },
];

export const BOM: BomItem[] = [
  { item: "Arduino Uno R3 (veya uyumlu)", qtyPerTeam: "1", teamsOf8: "10", note: "2 yedek", phase: "Hafta 7+" },
  { item: "USB A–B kablo", qtyPerTeam: "1", teamsOf8: "10", note: "Veri kablosu olsun (şarj-only değil)", phase: "Hafta 7+" },
  { item: "Breadboard 830 delik", qtyPerTeam: "1", teamsOf8: "10", note: "Güç rayı renkli olanlar tercih", phase: "Hafta 5+" },
  { item: "Jumper (E-E, E-D, D-D) karışık", qtyPerTeam: "40", teamsOf8: "400", note: "Kırmızı/siyah ayrı paket", phase: "Hafta 5+" },
  { item: "LED 5 mm (K, Y, M) + RGB", qtyPerTeam: "8+1", teamsOf8: "80+10", note: "Kutupları öğretmek için bol", phase: "Hafta 5+" },
  { item: "Direnç 220 Ω", qtyPerTeam: "10", teamsOf8: "100", note: "LED koruma", phase: "Hafta 5+" },
  { item: "Direnç 10 kΩ", qtyPerTeam: "6", teamsOf8: "50", note: "Buton pull-down, LDR bölücü", phase: "Hafta 9+" },
  { item: "Direnç 1 kΩ / 4.7 kΩ yedek", qtyPerTeam: "4", teamsOf8: "40", note: "Ohm deneyi", phase: "Hafta 5+" },
  { item: "Tactile buton 6×6 mm", qtyPerTeam: "4", teamsOf8: "40", note: "4 bacaklı", phase: "Hafta 9+" },
  { item: "Potansiyometre 10 kΩ", qtyPerTeam: "1", teamsOf8: "10", note: "Breadboard uyumlu", phase: "Hafta 10+" },
  { item: "LDR (GL5528 veya eşdeğer)", qtyPerTeam: "1", teamsOf8: "12", note: "2 yedek", phase: "Hafta 11+" },
  { item: "Aktif buzzer 5 V", qtyPerTeam: "1", teamsOf8: "10", note: "Pasif buzzer ayrıca 4 adet (tone için)", phase: "Hafta 12+" },
  { item: "HC-SR04 ultrasonik", qtyPerTeam: "1", teamsOf8: "10", note: "5 V lojik", phase: "Hafta 17+" },
  { item: "IR çizgi sensörü (2 veya 3’lü modul)", qtyPerTeam: "1", teamsOf8: "10", note: "Dijital çıkışlı", phase: "Hafta 21+" },
  { item: "SG90 servo", qtyPerTeam: "1", teamsOf8: "10", note: "Harici 5 V önerilir", phase: "Hafta 19+" },
  { item: "DC motor + tekerlek çifti", qtyPerTeam: "2 motor", teamsOf8: "16 motor", note: "Redüktörlü 3–6 V", phase: "Hafta 19+" },
  { item: "L298N (veya L293D kalkan)", qtyPerTeam: "1", teamsOf8: "10", note: "L298N 12 V’ye kadar; 6 V pille de çalışır", phase: "Hafta 20+" },
  { item: "2WD şase kiti + top teker", qtyPerTeam: "1", teamsOf8: "8", note: "Vida seti dahil", phase: "Hafta 23+" },
  { item: "Pil yuvası 4–6×AA + pil", qtyPerTeam: "1", teamsOf8: "10", note: "Alkali; şarjlı NiMH de olur", phase: "Hafta 23+" },
  { item: "Multimetre", qtyPerTeam: "paylaşım", teamsOf8: "4", note: "İstasyon", phase: "Hafta 5+" },
  { item: "Bilgisayar + tarayıcı (Tinkercad)", qtyPerTeam: "1", teamsOf8: "8+", note: "Öğretmen hesabı ile sınıf", phase: "Tüm yıl" },
  { item: "Karton, bant, maket bıçağı (öğretmen)", qtyPerTeam: "—", teamsOf8: "sınıf seti", note: "Akıllı ev maketi", phase: "Hafta 13+" },
];

export const SEMESTER_META = [
  {
    id: 1 as const,
    title: "1. Dönem",
    span: "Ekim – Ocak · Hafta 1–16",
    focus: "Temel kodlama, algoritma ve elektronik",
    goal: "Donanım elemanlarını tanımak ve yazılım mantığını somut örneklerle kavramak.",
    units: [
      { weeks: "1–2", title: "Oryantasyon ve iş sağlığı" },
      { weeks: "3–4", title: "Algoritma ve akış şeması" },
      { weeks: "5–6", title: "Elektroniğin temelleri" },
      { weeks: "7–8", title: "Mikrodenetleyiciye giriş" },
      { weeks: "9–10", title: "Giriş birimleri" },
      { weeks: "11–12", title: "Işık ve ses sensörleri" },
      { weeks: "13–14", title: "Ara proje: akıllı ev" },
      { weeks: "15–16", title: "Dönem sonu değerlendirme" },
    ],
  },
  {
    id: 2 as const,
    title: "2. Dönem",
    span: "Şubat – Haziran · Hafta 17–36",
    focus: "Hareket, sensör füzyonu ve yıl sonu projeleri",
    goal: "Motor sürücü ve mesafe/çizgi sensörleriyle otonom robot inşa etmek; özgün projeyi sergilemek.",
    units: [
      { weeks: "17–18", title: "Mesafe sensörleri (HC-SR04)" },
      { weeks: "19–20", title: "Motorlar ve sürücüler" },
      { weeks: "21–22", title: "Otonom robot mantığı" },
      { weeks: "23–24", title: "Robot şasesi montajı" },
      { weeks: "25–26", title: "Engelden kaçan ve çizgi izleyen" },
      { weeks: "27–28", title: "Hackathon: fikir ve plan" },
      { weeks: "29–32", title: "Prototipleme ve inovasyon" },
      { weeks: "33–34", title: "Test ve dokümantasyon" },
      { weeks: "35–36", title: "Yıl sonu robotik sergisi" },
    ],
  },
];

export const PLATFORM_NOTE =
  "Kulüpteki sete göre (yalnız Arduino, LEGO SPIKE, mBot veya VEX) haftalık dağılım modüler uyarlanır. Her ders saatinin sonunda üç platform notu vardır. Ana iz: Arduino + Tinkercad + mBlock/Arduino IDE. SPIKE ve mBot aynı algoritmayı kendi bloklarıyla yapar; elektronik haftalarında SPIKE grupları mekanizma + sensör kalibrasyonuna kayar.";
