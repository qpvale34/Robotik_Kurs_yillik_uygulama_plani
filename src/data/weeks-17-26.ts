import type { WeekPlan } from "./types";
import { F, H } from "./helpers";

export const WEEKS_17_26: WeekPlan[] = [
  {
    week: 17,
    month: "Şubat",
    dates: "8–12 Şubat 2027",
    semester: 2,
    unit: "Mesafe sensörleri (HC-SR04)",
    title: "Ultrasonik mesafe ölçümü",
    why: "2. dönem ‘hareket eden sistem’e geçişin gözü mesafedir. HC-SR04 ucuz, 5 V lojik, yanlış kabloyla analog sanılır.",
    prior: ["digitalWrite", "pulse zamanı fikri", "S3 motor uyarısı"],
    weekGoal: "Trig/echo kablolar, pulseIn ile mikro-saniye okur, cm = us/58 hesabını yapar.",
    hours: [
      H({
        hour: 1,
        title: "Trig, echo, pulseIn, cm = us/58",
        aim: "HC-SR04’ü 5V/GND/D12/D11 bağlar, 10 µs tetik gönderir, mesafeyi Serial’de cm okur.",
        outcomes: [
          "RK.6.17.1.1 Ultrasonik yankının gidiş-dönüş süresiyle mesafe ilişkisini söyler.",
          "RK.6.17.1.2 Vcc 5V, GND, Trig D12, Echo D11 kablolar.",
          "RK.6.17.1.3 10 µs HIGH tetik ve pulseIn(echo, HIGH, 30000) kullanır.",
          "RK.6.17.1.4 cm = us / 58 (veya us * 0.034 / 2) hesabını deftere yazar.",
        ],
        materials: ["HC-SR04", "4 jumper", "cetvel 30 cm", "Uno"],
        prep: ["3.3 V karta HC-SR04 bağlanmaz. 5V. Timeout 30000 µs ≈ 5 m, pratikte 30 cm cetvel."],
        safety: ["Sensörü göze dayama (S7) — zararlı değil, kalibrasyonu bozar.", "5V/GND ters: modül ısınır, USB kes."],
        flow: [
          F(5, "açılış", "Yarasa", "Ses gider, duvar döner, süre × hız / 2.", "Kendi cümlesi."),
          F(8, "anlatım", "4 bacak + formül", "340 m/s ≈ 29 µs/cm tek yön, gidiş-dönüş 58.", "Formül."),
          F(18, "uygulama", "Cetvel testi", "10, 20, 30 cm. Tablo: cetvel vs us/58.", "3 okuma."),
          F(5, "paylaşım", "Sapma", "±2 cm normal mi?", "Yorum."),
          F(4, "değerlendirme", "Timeout", "Neden 30000?", "Yazar."),
        ],
        keyPoints: [
          "Echo 5 V’dur; Uno tolere eder. 3.3 V kartlarda bölücü gerekir — bu yıl Uno.",
          "pulseIn timeout 0 döner: kablo kopuk veya çok uzak.",
          "2 cm’den yakın kör; 400 cm iddia gerçek sınıfta 30–100 cm.",
          "15° koni: dar kenarı ölçmez, yan duvarı görür.",
        ],
        steps: [
          "Vcc 5V, GND GND, Trig D12, Echo D11.",
          "10 µs tetik.",
          "pulseIn timeout’lu.",
          "cm yaz, cetvelle 3 nokta.",
        ],
        code: {
          title: "HC-SR04 cm",
          lang: "cpp",
          code: `const int TRIG = 12;
const int ECHO = 11;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long us = pulseIn(ECHO, HIGH, 30000);
  int cm = us / 58;
  Serial.println(cm);
  delay(200);
}`,
        },
        wiring: {
          title: "HC-SR04",
          items: ["Vcc → 5V", "GND → GND", "Trig → D12", "Echo → D11"],
        },
        troubleshooting: [
          { problem: "Hep 0", cause: "Echo/Trig ters, timeout, 3.3V", fix: "Bacak yazısı oku; 5V; timeout’u geçici 0 yap (kilit riski)." },
          { problem: "Zıplayan sayı", cause: "Koni yan duvar, USB kablo", fix: "Masayı boşalt, sensörü tahta kenarına bantla." },
        ],
        exitTicket: ["cm = us / ? ", "Kör bölge yaklaşık kaç cm?"],
        support: "Tinkercad ultrasonic + cetvel, sonra fiziksel.",
        extension: "Fonksiyon int mesafeCm().",
        ortaokul: "Formülü ezber 58; türetim lise.",
        lise: "0.034 cm/µs × /2 türevi.",
        homework: "Park senaryosu: 15 cm’de bip temposu tahmini (hafta 18).",
        tips: ["İlk okumalar 0 ise 90° bacak tersi %40.", "Cetveli yatay, sensör de yatay — açı sapması öğretme, şimdi değil."],
        altArduino: "Ana iz.",
        altMbot: "Onboard ultrasonic block; yine cetvel tablosu.",
        altSpike: "Distance sensor cm; aynı tablo, pulseIn yok.",
      }),
      H({
        hour: 2,
        title: "Eşik, kör bölge, seri izleme",
        aim: "15 cm eşiğinde LED yakar; 0 ve aşırı değerleri geçersiz sayar.",
        outcomes: [
          "RK.6.17.2.1 cm==0 veya cm>200 değerini yok sayar.",
          "RK.6.17.2.2 Eşik 15 cm’de LED yakar.",
          "RK.6.17.2.3 Serial’de ‘cm ve durum’ yazar.",
          "RK.6.17.2.4 El yaklaşınca 5 kez tutarlı tetik alır.",
        ],
        materials: ["HC-SR04", "D8 LED", "15 cm işaretli bant masada"],
        prep: ["Masaya 15 cm bant. Eşik const."],
        safety: ["USB kes LED ekle."],
        flow: [
          F(4, "anımsama", "58", "Koro.", "Cevap."),
          F(6, "anlatım", "Geçersiz", "0 = yok echo. if (cm==0) return;", "Yazar."),
          F(22, "uygulama", "LED eşik", "15 cm bant. El ile 5 tetik.", "Demo."),
          F(4, "paylaşım", "Yanlış pozitif", "Kol yan koni.", "Açı notu."),
          F(4, "değerlendirme", "const ESIK_CM", "Neden 15.", "Yazar."),
        ],
        keyPoints: [
          "0’ı ‘çok yakın’ sanma — timeout da 0.",
          "Park ve engel aynı eşik fikri, farklı eylem (bip vs dur).",
          "delay(200) okuma hızı; daha sık gürültü.",
          "Şaseye monte edilmeden el testi yeter.",
        ],
        steps: [
          "LED D8.",
          "Geçersiz filtre.",
          "if (cm>0 && cm<15) LED.",
          "5 tetik tik.",
        ],
        code: {
          title: "Eşik LED",
          lang: "cpp",
          code: `const int TRIG = 12, ECHO = 11, LED = 8, ESIK = 15;

int mesafeCm() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long us = pulseIn(ECHO, HIGH, 30000);
  if (us == 0) return -1;
  return us / 58;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int cm = mesafeCm();
  Serial.println(cm);
  digitalWrite(LED, (cm > 0 && cm < ESIK) ? HIGH : LOW);
  delay(150);
}`,
        },
        wiring: {
          title: "Mesafe + LED",
          items: ["HC-SR04 D12/D11/5V/GND", "D8 LED 220 Ω"],
        },
        troubleshooting: [
          { problem: "LED hep yanık", cause: "Eşik büyük / cm hep küçük", fix: "Serial cm; bant 15 gerçek mi." },
          { problem: "Fonksiyon derlenmez", cause: "ortaokul mBlock", fix: "Blok ‘mesafe oku’ + eğer." },
        ],
        exitTicket: ["Neden cm==0 yok sayılır?", "ESIK_CM değerin."],
        support: "Fonksiyonsuz, loop içi kopya.",
        extension: "3 örnek ortalama (basit filtre).",
        ortaokul: "mBlock mesafe < 15 LED.",
        lise: "Fonksiyon + ortalama.",
        homework: "Park: 30/15/5 cm üç bölge düşün (hafta 18).",
        tips: ["Fonksiyonu tahtada evrimleştir, yapıştırma.", "El yüzük / saat metal yankı yapar, çıplak avuç."],
        altArduino: "Ana iz.",
        altMbot: "Aynı eşik onboard.",
        altSpike: "Aynı.",
      }),
    ],
  },
  {
    week: 18,
    month: "Şubat",
    dates: "15–19 Şubat 2027",
    semester: 2,
    unit: "Mesafe sensörleri (HC-SR04)",
    title: "Park sensörü uygulaması",
    why: "Üç bölge + tempo, gerçek ürün hissi verir. Histerezis yoksa buzzer sınırda çıldırır.",
    prior: ["mesafeCm", "aktif buzzer", "üç LED"],
    weekGoal: "30/15/5 cm bölgelerinde LED bar ve buzzer temposu; histerezis ile titreme kesilir.",
    hours: [
      H({
        hour: 1,
        title: "Mesafeye bağlı buzzer temposu",
        aim: "Uzak sessiz, orta yavaş bip, yakın hızlı, çok yakın sürekli.",
        outcomes: [
          "RK.6.18.1.1 Üç eşiği const ile tanımlar.",
          "RK.6.18.1.2 delay süresini mesafeye bağlar.",
          "RK.6.18.1.3 cm<=0 iken susar.",
          "RK.6.18.1.4 4 duruşu (100, 25, 10, 3 cm) doğru tempola gösterir.",
        ],
        materials: ["HC-SR04", "D6 buzzer", "metre"],
        prep: ["Bölgeler tahtada: >30 sessiz, 15–30 yavaş, 5–15 hızlı, <5 sürekli."],
        safety: ["Buzzer kısa test, S7."],
        flow: [
          F(5, "anımsama", "15 cm LED", "Dün.", "Cevap."),
          F(7, "anlatım", "Tempo map", "Yakın = küçük delay. if-else if zinciri.", "Tablo."),
          F(20, "uygulama", "4 duruş", "Cetvel işaretleri.", "Demo 4 tempo."),
          F(4, "paylaşım", "Sınır titreme", "15 cm’de zıplama.", "Not: saat 2 histerezis."),
          F(4, "değerlendirme", "else if sırası", "Küçükten mi büyükten mi?", "Küçükten başla (<5 önce)."),
        ],
        keyPoints: [
          "if sırası: en yakın şart önce.",
          "Sürekli tonda delay(20) kısa HIGH — kilit gibi duyulur.",
          "Park ürünü arabayı taklit eder, robot değil henüz.",
          "Gürültü: 15’te in-out; histerezis saat 2.",
        ],
        steps: [
          "Üç const eşik.",
          "else-if zinciri.",
          "4 duruş tik.",
          "0’da sus.",
        ],
        code: {
          title: "Park temposu",
          lang: "cpp",
          code: `const int TRIG = 12, ECHO = 11, BUZ = 6;

int mesafeCm() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long us = pulseIn(ECHO, HIGH, 30000);
  if (us == 0) return -1;
  return us / 58;
}

void bip(int msOn, int msOff) {
  digitalWrite(BUZ, HIGH); delay(msOn);
  digitalWrite(BUZ, LOW); delay(msOff);
}

void setup() {
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT); pinMode(BUZ, OUTPUT);
}

void loop() {
  int cm = mesafeCm();
  if (cm < 0 || cm > 30) { digitalWrite(BUZ, LOW); delay(80); }
  else if (cm < 5) { digitalWrite(BUZ, HIGH); delay(40); }
  else if (cm < 15) bip(60, 80);
  else bip(80, 280);
}`,
        },
        wiring: { title: "Park", items: ["HC-SR04 D12/D11", "D6 buzzer"] },
        troubleshooting: [
          { problem: "Hep sürekli", cause: "<5 şartı hep doğru / cm yanlış küçük", fix: "Serial cm." },
          { problem: "Sıra yanlış", cause: ">30’u alta yazmış", fix: "En yakın önce." },
        ],
        exitTicket: ["Neden <5, <15’ten önce yazılır?", "30 cm üstünde ne olur?"],
        support: "İki bölge (uzak/yakın) yeter.",
        extension: "map(cm,5,30,40,400) ile sürekli tempo.",
        ortaokul: "mBlock mesafe üç ‘eğer’.",
        lise: "map + constrain.",
        homework: "LED bar 3 kırmızı-sarı-yeşil yerleşim eskizi.",
        tips: ["4 duruşu yerde bantla, tartışma bitir.", "Sürekli HIGH komşuyu delirtir — 5 sn tavan."],
        altArduino: "Ana iz.",
        altMbot: "playTone tempo.",
        altSpike: "beep wait.",
      }),
      H({
        hour: 2,
        title: "Üç LED bar ve histerezis",
        aim: "Yeşil/sarı/kırmızı bar + giren/çıkan eşik farkı titremeyi keser.",
        outcomes: [
          "RK.6.18.2.1 Üç LED’i bölgelere map eder.",
          "RK.6.18.2.2 Histerezisi ‘içeri 14, dışarı 16’ diye uygular.",
          "RK.6.18.2.3 Titreme öncesi/sonrası 10 sn gözlemler.",
          "RK.6.18.2.4 Park demo’sunu 30 sn’de sunar.",
        ],
        materials: ["3 LED 220 Ω D8 D9 D10", "buzzer", "HC-SR04"],
        prep: ["Histerezis 2 sayı: ON 14 OFF 16. Durum değişkeni zone."],
        safety: ["USB kes üç LED."],
        flow: [
          F(5, "anımsama", "Trafik pinleri", "D8-9-10.", "Bağlar."),
          F(8, "anlatım", "Histerezis", "Termostat. İçeri sıkı, dışarı gevşek.", "2 sayı defter."),
          F(20, "uygulama", "Bar + zone", "LED + buzzer birlikte.", "30 sn demo."),
          F(4, "paylaşım", "Titreme gitti mi", "Evet/hayır.", "Not."),
          F(3, "değerlendirme", "İki eşik", "Yazar.", "Teslim."),
        ],
        keyPoints: [
          "Tek eşik + gürültü = röle tık tık. İki eşik = kararlı.",
          "zone değişkeni son kararı tutar.",
          "Bu kod şase üstünde engel duruşunun kardeşidir.",
          "Demo: el 40’tan 3’e yavaş yaklaşsın.",
        ],
        steps: [
          "3 LED bölgeler.",
          "zone int.",
          "ON/OFF eşik.",
          "30 sn demo.",
        ],
        code: {
          title: "Histerezis zone",
          lang: "cpp",
          code: `int zone = 0; // 0 sessiz 1 yavaş 2 hızlı 3 sürekli
// cm 16 üstü zone=0; cm 14 altı zone en az 1 örneği
// Tam tabloyu takım kendi eşikleriyle doldurur.`,
          notes: "Öğrenci saat 1 temposuna LED digitalWrite ekler; zone ile eşikleri 2’şer cm ayırır.",
        },
        wiring: {
          title: "Bar",
          items: ["D8 yeşil, D9 sarı, D10 kırmızı + 220 Ω", "D6 buzzer", "HC-SR04"],
        },
        troubleshooting: [
          { problem: "Hâlâ titrer", cause: "ON/OFF aynı sayı", fix: "En az 3 cm boşluk." },
          { problem: "LED yanlış renk", cause: "pin karıştı", fix: "Yakın=kırmızı fiziksel olarak sağda/altta." },
        ],
        exitTicket: ["Histerezis neden iki sayı ister?", "Kırmızı hangi cm bandı?"],
        support: "LED’siz sadece zone Serial.",
        extension: "Servo ile ‘radar’ 0–180 tarama (hafta 19 ön izleme, 5 dk).",
        ortaokul: "Histerezis sözlü, kod tek eşik.",
        lise: "Tam zone kodu zorunlu.",
        homework: "S3’ü tekrar yaz: motor neden 5V değil (hafta 19).",
        tips: ["Zone’u Serial’e yazdırmadan LED’i ayarlama.", "Renk körü: konum kodu, renk değil."],
        altArduino: "Ana iz.",
        altMbot: "RGB bölgeler.",
        altSpike: "3 status light.",
      }),
    ],
  },
  {
    week: 19,
    month: "Şubat",
    dates: "22–26 Şubat 2027",
    semester: 2,
    unit: "Motorlar ve motor sürücüler",
    title: "Servo ve DC motor temeli",
    why: "İlk hareket. SG90 masum görünür, USB’den üç servo = port ölümü. DC motor 5V pininden sürülmez — S3 artık deneyim.",
    prior: ["PWM fikri", "S3 teori"],
    weekGoal: "Servo 0–180 döner; DC motorun ayrı koldan beslendiğini ölçer/gerekçeler (sürücü hafta 20).",
    hours: [
      H({
        hour: 1,
        title: "SG90 0–180 derece",
        aim: "Servo.h ile 0, 90, 180 konumları; harici 5V yoksa tek servo USB’den, titreme konuşulur.",
        outcomes: [
          "RK.6.19.1.1 Servo’nun konum motoru (sürekli dönüş değil) olduğunu söyler.",
          "RK.6.19.1.2 Kahverengi GND, kırmızı 5V, turuncu sinyal D9.",
          "RK.6.19.1.3 myservo.write(0/90/180) + delay(400) uygular.",
          "RK.6.19.1.4 0–180 ‘tokat’ yerine ara değer kullanır.",
        ],
        materials: ["SG90", "3 jumper", "Servo.h (IDE built-in)"],
        prep: ["Tek servo kuralı. Kolları sökük — mil boşta, tıkırdamasın.", "USB hub zayıfse harici 5V bank öğretmen."],
        safety: ["Parmak milde değil. 3 servo aynı anda USB’den yok.", "Li-ion yok."],
        flow: [
          F(5, "açılış", "Konum vs dönüş", "Kapı kolu vs teker. SG90 kapı kolu.", "Ayırt eder."),
          F(7, "gösteri", "Üç kablo", "Renk kodu. attach(9).", "Eşler."),
          F(20, "uygulama", "0-90-180-90", "Yavaş yaz. Pot ile açı (uzatma değil asıl: const açılar).", "Dört duruş."),
          F(4, "paylaşım", "Titreme", "USB gerilim düşümü.", "S3 köprüsü."),
          F(4, "değerlendirme", "Kablo renk", "3 renk.", "Yazar."),
        ],
        keyPoints: [
          "write(0) ardından write(180) dişliye zulüm; 90 ara.",
          "attach PWM pin (D9). D13 kötü.",
          "Titreme ≠ bozuk servo; çoğu kez besleme.",
          "360° ‘continuous’ SG90 farklı kütüphane/komut — bu yıl yok.",
        ],
        steps: [
          "GND, 5V, D9.",
          "#include Servo.h; attach(9);",
          "0, 90, 180, 90 delay 400.",
          "Mil boşta.",
        ],
        code: {
          title: "Servo tarama",
          lang: "cpp",
          code: `#include <Servo.h>
Servo boyun;
const int PIN = 9;

void setup() {
  boyun.attach(PIN);
}

void loop() {
  boyun.write(0); delay(500);
  boyun.write(90); delay(500);
  boyun.write(180); delay(500);
  boyun.write(90); delay(500);
}`,
        },
        wiring: {
          title: "SG90",
          items: ["Kahverengi → GND", "Kırmızı → 5V", "Turuncu → D9"],
        },
        troubleshooting: [
          { problem: "Tıkırdar gitmez", cause: "Mekanik takılı / 5V yetersiz / analogWrite karışmış", fix: "Kolu sök; Servo.h; tek servo." },
          { problem: "Ters yönde", cause: "0-180 algı", fix: "write(180-aci) bilinçli." },
        ],
        exitTicket: ["Servo konum mu hız mı üretir?", "Üç kablo rengi?"],
        support: "mBlock servo bloğu D9.",
        extension: "Pot A0 map 0–180.",
        ortaokul: "0/90/180 durakları.",
        lise: "writeMicroseconds 1000–2000.",
        homework: "DC motor resmi: 2 kablo, fırça, mıknatıs — sökülmez.",
        tips: ["Kolu takılıyken 0–180 ilk yükleme mil kırar — mil boş.", "Kırmızı-kahve ters: servo ısınır, 3 sn USB kes."],
        altArduino: "Ana iz.",
        altMbot: "Onboard servo port.",
        altSpike: "Medium motor 0–90°; 5V tartışması Tinkercad.",
      }),
      H({
        hour: 2,
        title: "DC motor: neden 5V pin değil",
        aim: "Multimetre / gösteri: stall akımı yüzlerce mA. Transistör/sürücü ihtiyacı. Bu saat motor döndürme yok (veya öğretmen kontrollü ayrı pil 2 sn).",
        outcomes: [
          "RK.6.19.2.1 Arduino pin ~20 mA, motor stall 0.5–2 A ayırt eder.",
          "RK.6.19.2.2 Ortak GND ve ayrı pil kuralını çizer.",
          "RK.6.19.2.3 Flyback (ters emk) diyodunu 1 cümleyle gerekçeler.",
          "RK.6.19.2.4 L298N’nin hafta 20’de dolduracağı kutuları listeler.",
        ],
        materials: ["redüktörlü DC motor (bağlanmadan)", "multimetre", "öğretmenin L298N’si kapalı kutu", "6×AA yuva gösteri"],
        prep: ["ÖĞRENCİ MOTORU UNO 5V’YE TAKMASIN. Gösteri: öğretmen, seri ampermetre, 1 sn.", "Yanan pin hikâyesi, gerçek duman yok."],
        safety: ["S3 mutlak. Li-ion yok. Gösteri gözetimli."],
        flow: [
          F(6, "açılış", "20 mA vs 1 A", "50 kat. Pin koruma diyotu yer.", "Sayıyı yazar."),
          F(10, "gösteri", "Ayrı pil", "Motor 6×AA, Uno USB, GND ortak çizimi. Ampermetre 1 sn.", "Şema."),
          F(12, "anlatım", "Sürücü ve diyot", "L298N köprü: yön + PWM. Motor indüktör, kesilince kıvılcım — diyot sürücüde dahili.", "Kutu doldur: ENA IN1 IN2."),
          F(8, "uygulama", "Şema ödevi", "Hafta 20 kablo taslağı kâğıt.", "Çizer."),
          F(4, "değerlendirme", "S3 cümle", "Yazar.", "Teslim."),
        ],
        keyPoints: [
          "GND ortak olmazsa sinyal referansı yok, ‘çalışmıyor’.",
          "Vin’e 12 V motor pili bağlamak Uno’yu ısıtır — bu yıl Vin kullanma, sürücüye doğrudan.",
          "L293D zayıf, L298N 2 A civarı, 2WD için yeter.",
          "Şase yok bu hafta; motor elde sallanır, vida yok.",
        ],
        steps: [
          "Pin akımı not.",
          "Ayrı pil şema.",
          "L298N kutu isimleri.",
          "S3 cümle.",
        ],
        wiring: {
          title: "Yasak ve doğru (kâğıt)",
          items: ["YASAK: motor + → Uno 5V", "DOĞRU: motor → L298N OUT; pil → L298N VS; Uno GND ↔ sürücü GND"],
        },
        troubleshooting: [
          { problem: "Öğrenci 5V’ye taktı", cause: "Merak", fix: "USB kes, kartı 10 dk dinlendir, o takımı sürücüye erken geçir, pin test LED." },
        ],
        exitTicket: ["Pin akım limiti yaklaşık kaç mA?", "Neden GND ortak?"],
        support: "Boyama şeması.",
        extension: "H-köprü 4 anahtar çizimi.",
        ortaokul: "Sayıları hikâye: ‘iğne vs hortum’.",
        lise: "Stall vs no-load akım, P=VI.",
        homework: "L298N fotoğrafındaki ENA jumper’ını işaretle (internet, sökme).",
        tips: ["Duman gösterisi yapma.", "S3 afişine ‘hafta 19 yaşandı’ raptiyesi."],
        altArduino: "Ana iz.",
        altMbot: "Motor portu hub’da sürücülü — yine ‘neden ayrı’ 5 dk Tinkercad.",
        altSpike: "Hub motor sürücüsü gizli; akım konuşması 5 dk, sonra mekanizma.",
      }),
    ],
  },
  {
    week: 20,
    month: "Mart",
    dates: "1–5 Mart 2027",
    semester: 2,
    unit: "Motorlar ve motor sürücüler",
    title: "L298N ile yön ve hız",
    why: "H-köprü somutlanır. Yanlış IN1/IN2 = tek yön; jumper ENA çıkarılmazsa PWM yok. 8–12 Mart ara tatil öncesi kablolar lastiklenir.",
    prior: ["S3", "PWM analogWrite", "ayrı pil şema"],
    weekGoal: "İki motor ileri/geri/sol/sağ; PWM hız; ortak GND; ara tatile söküm.",
    hours: [
      H({
        hour: 1,
        title: "ENA, IN1–IN4, ortak GND",
        aim: "Tek motoru L298N ile iki yönde döndürür; pil ve USB ayrı, GND köprü.",
        outcomes: [
          "RK.6.20.1.1 VS=pil, VSS=5V mantık (jumper), GND ortak kablolar.",
          "RK.6.20.1.2 IN1 HIGH IN2 LOW = ileri tanımını kendi şasesine yazar.",
          "RK.6.20.1.3 ENA jumper’lı (tam hız) çalıştırır.",
          "RK.6.20.1.4 3 sn ileri, dur, 3 sn geri güvenlik ritüelini uygular.",
        ],
        materials: ["L298N", "1 DC motor", "6×AA", "jumperler", "Uno"],
        prep: ["Pil yeni. Jumper ENA takılı başla (PWM saat 2).", "Motoru masaya bantla, kaçmasın."],
        safety: ["S3. Parmak dişliye yok. USB takılıyken VS kablo değişmez.", "Kısa 12V yok — 6×AA ~9V max."],
        flow: [
          F(6, "gösteri", "Modül turu", "VS, GND, OUT1-2, IN1-2, ENA jumper, 5V jumper.", "Parmakla izler."),
          F(6, "anlatım", "Yön tablosu", "10=ileri, 01=geri, 00=serbest, 11=fren (kısa).", "Tablo."),
          F(20, "uygulama", "Tek motor", "3 sn ileri dur geri. Bantlı motor.", "İki yön."),
          F(4, "paylaşım", "Ters yön", "IN1/IN2 swap veya kablo swap.", "Seçimini yazar."),
          F(4, "değerlendirme", "GND ortak?", "Göster.", "Kablo."),
        ],
        keyPoints: [
          "5V jumper: motor pili ≤12V ise L298N 5V üretebilir; Uno’yu yine USB’den besle, o 5V’yi Uno’ya verme (karışır).",
          "ENA jumper = daima enable tam hız.",
          "OUT polaritesi ‘ileri’yi sen tanımlarsın; şase sonra bakacak.",
          "Isınan L298N normal; yanık koku değil.",
        ],
        steps: [
          "Pil VS+GND, Uno GND–sürücü GND.",
          "IN1 D4, IN2 D5, ENA jumper.",
          "Motor OUT1-OUT2.",
          "3 sn 10, 3 sn 00, 3 sn 01.",
        ],
        code: {
          title: "Tek motor yön",
          lang: "cpp",
          code: `const int IN1 = 4, IN2 = 5;

void setup() {
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

void loop() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); delay(3000);
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW); delay(1000);
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH); delay(3000);
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW); delay(1000);
}`,
        },
        wiring: {
          title: "L298N tek kanal",
          items: [
            "6×AA + → VS, − → sürücü GND",
            "Uno GND → sürücü GND",
            "IN1 → D4, IN2 → D5, ENA jumper takılı",
            "Motor → OUT1 / OUT2",
          ],
        },
        troubleshooting: [
          { problem: "Motor ölü", cause: "ENA jumper yok, pil boş, GND kopuk", fix: "Jumper; pil voltajı; siyah kablo." },
          { problem: "Uno reset atıyor", cause: "GND ortak değil / motor USB’den", fix: "Ayrı pil doğrula, 5V motor yok." },
        ],
        exitTicket: ["İleri için IN1 IN2 nedir?", "Uno 5V’si motorla paylaşılır mı?"],
        support: "Renkli kablo haritası A4.",
        extension: "11 fren vs 00 serbest farkı 2 sn el ile çevirme.",
        ortaokul: "mBlock motor bloğu + aynı kablo (mBot skip L298N).",
        lise: "11 fren (short brake).",
        homework: "Yok; kabloları çekmeyin diye fotoğraf.",
        tips: ["Motoru havada tutma, tork bileği döndürür.", "Ara tatil uyarısı: saat 2 sonunda lastik."],
        altArduino: "Ana iz.",
        altMbot: "Bu saat port motor 3 sn ileri geri — L298N Tinkercad 10 dk.",
        altSpike: "Motor 3 sn, yön, dur; sürücü konuşması kısa.",
      }),
      H({
        hour: 2,
        title: "İleri, geri, sol, sağ fonksiyonları",
        aim: "İki motor, PWM ENA/ENB, dört fonksiyon; ara tatil söküm protokolü.",
        outcomes: [
          "RK.6.20.2.1 İkinci motoru IN3 IN4 ENB bağlar.",
          "RK.6.20.2.2 analogWrite(ENA, hız) için jumper’ı çıkarır.",
          "RK.6.20.2.3 ileri/geri/sol/sağ/dur fonksiyonlarını çağırır.",
          "RK.6.20.2.4 Ara tatil söküm: pil çıkar, lastik, etiket.",
        ],
        materials: ["2 motor", "L298N", "PWM D5 D6 dikkat IN ile çakışmasın"],
        prep: ["Pin planı sabitle: ENA D9, IN1 D4, IN2 D5, ENB D10, IN3 D7, IN4 D8 — D5 PWM çakışmasın diye IN2’yi D5’ten taşı. ÖNERİ: IN1=4 IN2=5 değil PWM: ENA=9 ENB=10, IN1=4 IN2=3 IN3=7 IN4=8."],
        safety: ["İki motor masaya bant. PWM kablosu ENA pin, jumper OUT."],
        flow: [
          F(5, "gösteri", "Jumper çıkar", "ENA kablo D9. analogWrite 160.", "Jumper poşete."),
          F(5, "anlatım", "Dört fonksiyon", "sol = sol motor geri sağ ileri (tank).", "Defter."),
          F(20, "uygulama", "Sıra: ileri dur sol dur sağ dur geri", "Hız 160, süre 800 ms.", "Tank dönüşü."),
          F(5, "paylaşım", "Ters teker", "Bir motor polarite.", "OUT swap."),
          F(5, "temizlik", "Ara tatil", "Pil çıkar, lastik, kutu, 15 Mart’a not.", "Sayım."),
        ],
        keyPoints: [
          "Tank dönüşü yerinde: zıt yön. Yay dönüşü: bir taraf durur — sonra şasede seçersiniz.",
          "PWM 255 stall ısınır; 140–180 gezinme.",
          "D9 D10 servo ile paylaşılmaz bu yıl aynı anda.",
          "8–12 Mart: piller evde şarj değil, öğretmen dolabı.",
        ],
        steps: [
          "Pin planı yapıştır.",
          "Jumper ENA/ENB çıkar, kablo PWM.",
          "5 fonksiyon.",
          "Söküm protokolü.",
        ],
        code: {
          title: "Tank fonksiyonları",
          lang: "cpp",
          code: `const int ENA = 9, IN1 = 4, IN2 = 3;
const int ENB = 10, IN3 = 7, IN4 = 8;
const int HIZ = 160;

void setup() {
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
}

void dur() {
  analogWrite(ENA, 0); analogWrite(ENB, 0);
}
void ileri() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, HIZ); analogWrite(ENB, HIZ);
}
void geri() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  analogWrite(ENA, HIZ); analogWrite(ENB, HIZ);
}
void sol() { // tank
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  analogWrite(ENA, HIZ); analogWrite(ENB, HIZ);
}
void sag() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  analogWrite(ENA, HIZ); analogWrite(ENB, HIZ);
}

void loop() {
  ileri(); delay(800); dur(); delay(400);
  sol(); delay(500); dur(); delay(400);
  sag(); delay(500); dur(); delay(400);
  geri(); delay(800); dur(); delay(1500);
}`,
        },
        wiring: {
          title: "İki kanal PWM",
          items: [
            "ENA D9, ENB D10 (jumper çıkarıldı)",
            "IN1 D4 IN2 D3 IN3 D7 IN4 D8",
            "Motor A OUT1-2, Motor B OUT3-4",
            "Pil VS, GND ortak",
          ],
        },
        troubleshooting: [
          { problem: "PWM etkisiz tam hız", cause: "Jumper hâlâ takılı", fix: "Jumper çıkar." },
          { problem: "D5’te servo/IN çakıştı", cause: "Eski pin planı", fix: "Yukarıdaki pin haritasına dön." },
        ],
        exitTicket: ["Tank solu nasıl üretirsin?", "Ara tatilde pil nerede?"],
        support: "Tek motor PWM, ikinci motor öğretmenle.",
        extension: "HIZ 100 vs 200 çizgi — hafta 26 notu.",
        ortaokul: "mBlock dört yön.",
        lise: "void git(int l, int r) imzalı hız.",
        homework: "Ara tatil ödevi yok. İsteğe akış: engel görünce dur.",
        tips: ["Söküm 5 dk’yı kesme — sızdıran pil Mayıs’ı öldürür.", "Fonksiyon isimleri Türkçe serbest, tutarlı olsun."],
        altArduino: "Ana iz.",
        altMbot: "Aynı 4 fonksiyon Live.",
        altSpike: "Move tank blocks.",
      }),
    ],
  },
  {
    week: 21,
    month: "Mart",
    dates: "15–19 Mart 2027",
    semester: 2,
    unit: "Otonom robot mantığı",
    title: "IR çizgi sensörü",
    why: "Şase yok; masaüstü kalibrasyon olmazsa sahada ‘kör robot’ haftalarca suçlanır. IR yükseklik 5–8 mm kritik.",
    prior: ["digitalRead", "eşik fikri"],
    weekGoal: "2 veya 3’lü IR modülde siyah/beyaz okur, yükseklik kalibre eder, tablo tutar.",
    hours: [
      H({
        hour: 1,
        title: "Siyah/beyaz ve yükseklik kalibrasyonu",
        aim: "Modülü 5–8 mm’de tutarak beyaz kâğıt / siyah bant değerlerini dijital okur.",
        outcomes: [
          "RK.6.21.1.1 IR yansımanın siyahta az, beyazda çok olduğunu söyler.",
          "RK.6.21.1.2 Modül Vcc 5V, GND, D0 çıkışlarını bağlar.",
          "RK.6.21.1.3 Pot trimmer ile LED eşik ayarını yapar (modül üzerinde).",
          "RK.6.21.1.4 5 mm ve 15 mm yükseklik farkını tabloya işler.",
        ],
        materials: ["2 veya 3’lü IR dijital modül", "siyah elektrik bandı", "beyaz A4", "6 mm conta/lego ayak"],
        prep: ["Dijital çıkışlı modül (analog A0’lı da var — D0 kullan). Trimmer tornavida öğretmen."],
        safety: ["IR LED’e bakma takıntısı yok, yine de 5 cm. Tornavida trimmer: insülin gibi, zorlama."],
        flow: [
          F(5, "açılış", "Siyah yer", "Işık dönmez, ‘çizgi’.", "Tahmin HIGH/LOW — modüle bağlı, ölç."),
          F(8, "anlatım", "D0 ve trim", "Onboard LED sönünce eşik. HIGH/LOW datasheet değil, senin tablo.", "Şema."),
          F(20, "uygulama", "Tablo", "Beyaz 5 mm, siyah 5 mm, beyaz 15 mm.", "3×10 okuma."),
          F(4, "paylaşım", "Ters lojik", "Bazı modül siyahta LOW.", "Kendi ‘siyah=’ notu."),
          F(3, "değerlendirme", "Yükseklik", "Neden 15 mm bozar?", "Yazar."),
        ],
        keyPoints: [
          "Şase yüksekliği sonradan değişirse kalibrasyon ölür — conta kalınlığını not et.",
          "Güneş / sarı lamba IR’yi bozar; perde.",
          "3’lü: L, C, R. 2’lü yeter, 3 kavşak için iyi.",
          "Lojik tersini kodda !digitalRead ile düzelt, kabloyla değil.",
        ],
        steps: [
          "5V GND D0→D2 (sol), D3 (sağ).",
          "5–8 mm ayak.",
          "Trim LED.",
          "Tablo 3 ortam.",
        ],
        code: {
          title: "IR Serial",
          lang: "cpp",
          code: `const int L = 2, R = 3;

void setup() {
  pinMode(L, INPUT);
  pinMode(R, INPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.print(digitalRead(L));
  Serial.print(' ');
  Serial.println(digitalRead(R));
  delay(100);
}`,
        },
        wiring: {
          title: "IR 2’li",
          items: ["Vcc 5V GND GND", "Sol D0 → D2", "Sağ D0 → D3"],
        },
        troubleshooting: [
          { problem: "Hep 1", cause: "Yükseklik fazla / trim / güneş", fix: "5 mm; trim; perde." },
          { problem: "Siyah-beyaz aynı", cause: "Parlak siyah bant veya kahverengi zemin", fix: "Mat elektrik bandı, beyaz köpük zemin." },
        ],
        exitTicket: ["Senin modülde siyah hangi sayı?", "Hedef yükseklik?"],
        support: "Tek sensör.",
        extension: "3. orta D4.",
        ortaokul: "Tablo boyama.",
        lise: "Analog A0’lı modülde eşik kodda.",
        homework: "Çizgi izleme 4 durum şeması (SS, SB, BS, BB).",
        tips: ["Sarı parke felakettir — beyaz A4 pist yap.", "Trim’i her takım kendisi, sen dokunma."],
        altArduino: "Ana iz.",
        altMbot: "Onboard line; yine yükseklik (teker çapı).",
        altSpike: "Color sensor reflected light; siyah/beyaz eşik.",
      }),
      H({
        hour: 2,
        title: "İki ve üç sensör okuma",
        aim: "L/R (ve C) birleşik durum kodu; 4 durum LED ile gösterilir (motor yok).",
        outcomes: [
          "RK.6.21.2.1 Dört durumu (SS SB BS BB) adlandırır.",
          "RK.6.21.2.2 Durumu Serial ve 2 LED ile gösterir.",
          "RK.6.21.2.3 ‘Siyah nedir’ const bool ile tek yerde tutar.",
          "RK.6.21.2.4 Ödev şemasındaki 4 kutuyu kodla eşler.",
        ],
        materials: ["IR", "2 LED durum", "şema ödevi"],
        prep: ["bool siyah(int pin) { return digitalRead(pin)==SIYAH_MANTIK; }"],
        safety: ["Standart."],
        flow: [
          F(4, "anımsama", "Siyah=?", "Defter.", "Söyler."),
          F(6, "anlatım", "4 durum", "İzle / sol kaçtı / sağ kaçtı / kaybettim.", "Şema."),
          F(22, "uygulama", "Durum makinesi kâğıt+LED", "Pistte kaydır.", "4 durum LED."),
          F(4, "paylaşım", "BB kavşak", "İleri mi dur mu — hafta 22 seçim.", "Not."),
          F(4, "değerlendirme", "4 isim", "Yazar.", "Teslim."),
        ],
        keyPoints: [
          "Motor yok: önce göz doğru görecek.",
          "SIYAH_MANTIK tek const; modül değişince bir satır.",
          "Kaybettim (beyaz-beyaz) ayrı durum, ‘düz git’ değil.",
          "3. sensör kavşağı ayırır (C siyah, L R beyaz = çizgide).",
        ],
        steps: [
          "siyah() fonksiyonu.",
          "4 if.",
          "LED L/R.",
          "Pistte kaydır 4 durum.",
        ],
        code: {
          title: "Dört durum",
          lang: "cpp",
          code: `const int L = 2, R = 3;
const int SIYAH = LOW; // kendi tablon

bool siyah(int pin) { return digitalRead(pin) == SIYAH; }

void setup() {
  pinMode(L, INPUT); pinMode(R, INPUT);
  Serial.begin(9600);
}

void loop() {
  bool sl = siyah(L), sr = siyah(R);
  if (sl && sr) Serial.println("kavsak_veya_kalin");
  else if (sl) Serial.println("sol_cizgi");
  else if (sr) Serial.println("sag_cizgi");
  else Serial.println("kaybettim");
  delay(80);
}`,
        },
        troubleshooting: [
          { problem: "Hep kaybettim", cause: "SIYAH ters / yükseklik", fix: "const’u çevir; 5 mm." },
        ],
        exitTicket: ["Kaybettim durumunda motor ne yapmamalı (tahmin)?", "SIYAH const değerin."],
        support: "Serial’siz LED sadece sol/sağ.",
        extension: "C sensörü üçüncü.",
        ortaokul: "mBlock 4 eğer.",
        lise: "enum Durum.",
        homework: "Akış: kaybettim → son görülen tarafa dön (hafta 22).",
        tips: ["Pisti 3 cm eninde siyah bant, T kavşak bir tane.", "Motor yok diye sıkılma — kör robotu şasede düzeltmek 3 hafta."],
        altArduino: "Ana iz.",
        altMbot: "line follower 2 analog, eşik 200 civarı — yine tablo.",
        altSpike: "2 color sensor veya 1 kaydırarak 4 durum tiyatrosu.",
      }),
    ],
  },
  {
    week: 22,
    month: "Mart",
    dates: "22–26 Mart 2027",
    semester: 2,
    unit: "Otonom robot mantığı",
    title: "Çizgi izleme algoritması",
    why: "Kod şaseyi beklemez. Masaüstü ‘hayali motor’ Serial’i, hafta 24’te bire bir attach edilecek.",
    prior: ["4 durum", "ileri/sol/sağ fonksiyonları (kâğıt veya hafta 20 kodu)"],
    weekGoal: "İzle / düzelt / kaybettim-arama şemasını kodlar, stand üzerinde Serial ile doğrular.",
    hours: [
      H({
        hour: 1,
        title: "Akış şeması: izle / kaybettim / kavşak",
        aim: "Şemayı netleştirir: SB/BS düzelt, SS ileri, BB kavşak=ileri, WW arama (son yön).",
        outcomes: [
          "RK.6.22.1.1 Beş durumlu şema çizer (sol, sağ, iz, kavşak, kayıp).",
          "RK.6.22.1.2 ‘Son görülen taraf’ belleğini gerekçeler.",
          "RK.6.22.1.3 Arama döngüsüne kaçış (3 sn sonra dur) ekler.",
          "RK.6.22.1.4 Şemadaki her kutuya fonksiyon adı yazar.",
        ],
        materials: ["kareli kâğıt", "şablon sembol"],
        prep: ["Yanlış şema: kaybettim→ileri (uçurum)."],
        safety: ["Kâğıt."],
        flow: [
          F(4, "anımsama", "4 durum", "Koro.", "Adlar."),
          F(8, "anlatım", "Bellek", "Son siyah sol ise kaybınca sola tarama.", "Şema iskele."),
          F(20, "uygulama", "Şema temize", "Kaçış 3 sn.", "Teslim şema."),
          F(4, "paylaşım", "Uçurum şeması", "Neden yanlış.", "İşaret."),
          F(4, "değerlendirme", "Fonksiyon adları", "5 ad.", "Yazar."),
        ],
        keyPoints: [
          "Belleksiz kayıp = rastgele, pistten çıkar.",
          "Kavşak SS veya BB — 2’li sensör ayırt edemez; ‘ileri geç’ okul kuralı.",
          "3 sn kaçış: sonsuz dönmesin, masadan düşmesin.",
          "Fonksiyon adları hafta 20 ile aynı olsun (ileri/sol/sağ/dur).",
        ],
        steps: [
          "5 kutu.",
          "lastDir değişkeni.",
          "timeout.",
          "Fonksiyon etiket.",
        ],
        troubleshooting: [
          { problem: "Şema spagetti", cause: "Çapraz ok", fix: "90° köşe, yukarıdan aşağı." },
        ],
        exitTicket: ["Kayıpta neden bellek?", "Kaçış süresi?"],
        support: "Noktalı şablon.",
        extension: "T kavşakta rastgele değil, ‘hep sol’ kuralı.",
        ortaokul: "4 durum, kavşak=ileri.",
        lise: "timeout millis.",
        homework: "Şemayı fotoğrafla, saat 2 kod.",
        tips: ["Motor yok diye kod yazdırmayı erteleme — Serial ‘motor emri’ yeter.", "Uçurum şemasını utandırmadan as."],
        altArduino: "Ana iz.",
        altMbot: "Aynı şema, blok adları.",
        altSpike: "Aynı.",
      }),
      H({
        hour: 2,
        title: "Masaüstü stand testi",
        aim: "IR pistte kayar, Serial ‘ILERI/SOL/SAG/ARA’ basar; hayali motor. Şase yok.",
        outcomes: [
          "RK.6.22.2.1 Şemayı if zincirine çevirir.",
          "RK.6.22.2.2 lastDir günceller.",
          "RK.6.22.2.3 Pistte 50 cm’lik S eğrisini ‘emir’ olarak doğru üretir.",
          "RK.6.22.2.4 Kod dosyasını H22 diye kaydeder (hafta 25 eklenecek).",
        ],
        materials: ["A4 pist S eğrisi", "IR stand (kitap + conta)", "Uno"],
        prep: ["Stand yüksekliği 6 mm sabit. Pist masaya bant."],
        safety: ["USB kablo standı devirmesin."],
        flow: [
          F(4, "anımsama", "Şema", "Masada.", "Parmak."),
          F(4, "gösteri", "Stand", "Öğretmen kaydırır, Serial.", "İzler."),
          F(24, "uygulama", "S pisti", "Çiftli. 12. dk değiş.", "S eğrisi Serial doğru."),
          F(4, "paylaşım", "ARA yanlış", "Bellek unutulmuş.", "lastDir satırı."),
          F(4, "değerlendirme", "Kaydet H22", "Tik.", "Dosya."),
        ],
        keyPoints: [
          "Bu dosya altın; şasede sadece ileri() içini dolduracaksınız.",
          "Stand kaydıran insan ‘gürültü’ ekler, yavaş kaydır.",
          "Serial 115200 de olur, 9600 yeter.",
          "H22’yi USB’de unutmak = hafta 25 gözyaşı — okul klasörü.",
        ],
        steps: [
          "if zinciri + lastDir.",
          "Serial emir.",
          "S pisti 3 tur.",
          "H22 kaydet.",
        ],
        code: {
          title: "Hayali çizgi izle",
          lang: "cpp",
          code: `const int L = 2, R = 3, SIYAH = LOW;
int lastDir = 0; // -1 sol 1 sağ 0 bilinmiyor

bool siyah(int p) { return digitalRead(p) == SIYAH; }

void setup() {
  pinMode(L, INPUT); pinMode(R, INPUT);
  Serial.begin(9600);
}

void loop() {
  bool sl = siyah(L), sr = siyah(R);
  if (sl && !sr) { Serial.println("SOL"); lastDir = -1; }
  else if (sr && !sl) { Serial.println("SAG"); lastDir = 1; }
  else if (sl && sr) { Serial.println("ILERI"); }
  else {
    Serial.println(lastDir < 0 ? "ARA_SOL" : "ARA_SAG");
  }
  delay(50);
}`,
        },
        troubleshooting: [
          { problem: "S eğrisinde hep ILERI", cause: "Sensörler çok iç içe / çizgi kalın", fix: "Sensör aralığı ~1.5–2 cm, bant 1.5–2 cm." },
        ],
        exitTicket: ["H22 dosya adı tam yol?", "lastDir ne zaman güncellenir?"],
        support: "Öğretmen H22 iskeleti, öğrenci SIYAH const.",
        extension: "millis kayıp timeout Serial ‘DUR’.",
        ortaokul: "mBlock 4 eğer + değişken last.",
        lise: "timeout millis.",
        homework: "Şase vidası sayımı (hafta 23 poşet).",
        tips: ["Dosyayı senin USB yedekle.", "S pisti evde yazıcıdan 1 sayfa."],
        altArduino: "Ana iz.",
        altMbot: "Aynı ama gerçek teker yavaş hız — havada şase tutma, kaza.",
        altSpike: "Aynı şema, hub’ı elde kaydır.",
      }),
    ],
  },
  {
    week: 23,
    month: "Mart / Nisan",
    dates: "29 Mart–2 Nisan 2027",
    semester: 2,
    unit: "Robot şasesi montajı",
    title: "Mekanik kurulum",
    why: "Vida kaybolur, teker ters biner, top teker sıkışır. Mekanik derstir; kod yok. Gözlük.",
    prior: ["kit envanter", "S5 el aleti"],
    weekGoal: "2WD şase, iki motor, iki teker, top teker, vida torku ‘sıkı ama çizmiyor’.",
    hours: [
      H({
        hour: 1,
        title: "2WD şase, vida, teker",
        aim: "Alt plaka, motor yuvaları, teker yönü (diş dışarı), vida sıralaması.",
        outcomes: [
          "RK.6.23.1.1 Parça listesini şase poşetinden sayar.",
          "RK.6.23.1.2 Motoru yuvaya doğru yönde (şaft dışarı) bağlar.",
          "RK.6.23.1.3 Tekerleği şafta klips/vida ile takar, sürtünme yok.",
          "RK.6.23.1.4 ‘Sağ sıkı sol gevşek’ tork farkını akran denetletir.",
        ],
        materials: ["2WD kit", "tornavida", "gözlük", "kayıp vida tepsi beyaz"],
        prep: ["Eksik vida yedek kutu. Yanlış kit (4WD) ayır.", "Örnek şase 1 adet bitmiş."],
        safety: ["Gözlük. Vida ağızda yok. İnce şaft bükülmez."],
        flow: [
          F(5, "anımsama", "Sayım", "Poşet.", "Eksik form."),
          F(6, "gösteri", "Sıra", "Motor→plaka→teker→top teker sonra. Elektronik yok.", "İzler."),
          F(22, "uygulama", "Montaj", "Öğretmen tork turu.", "İki teker döner, sürtmez."),
          F(4, "paylaşım", "Sürtünen teker", "Vida uzun / yuva ters.", "Düzeltir."),
          F(3, "değerlendirme", "Tik", "Sürtünme yok.", "Alır."),
        ],
        keyPoints: [
          "Motor kablosu öne veya arkaya tutarlı — hafta 24 lehim yok, kablo yeri.",
          "Teker lastiği yağlıysa çizgi izlemez; el temiz.",
          "Üst plaka henüz kapama — sürücü yerini saat 2.",
          "Kayıp M3 = 5 dk arama; beyaz tepsi.",
        ],
        steps: [
          "Say.",
          "Motor yuva.",
          "Teker.",
          "Sürtünme testi elde çevir.",
        ],
        troubleshooting: [
          { problem: "Şaft kısa teker oynamıyor", cause: "Adaptör halka unutuldu", fix: "Kit halkası." },
          { problem: "Plaka çatladı", cause: "Aşırı tork", fix: "Yedek plaka, ‘iki parmak tork’." },
        ],
        exitTicket: ["Motor şaftı hangi yöne bakmalı?", "Sürtünen tekeri nasıl anlarsın?"],
        support: "Öğretmen ilk motoru birlikte.",
        extension: "3D teker adaptörü yoksa bu saat yok.",
        ortaokul: "Hazır yuva, az vida.",
        lise: "Kendi 3D ayak isteğe hafta 30.",
        homework: "Yok, şase okulda kalır.",
        tips: ["Müzik kapalı, vida sesi duyulsun.", "Bitmiş örneği masada döndür."],
        altArduino: "Ana iz.",
        altMbot: "Teker tak, şase hazır — 20 dk mekanizma (fork) ek görevi.",
        altSpike: "Build book 15 dk chassis + 25 dk sağlamlık testi.",
      }),
      H({
        hour: 2,
        title: "Motor ve top teker montajı",
        aim: "Caster / top teker yüksekliği iki tekerle aynı düzlem; sürücü ve Uno için delik planı.",
        outcomes: [
          "RK.6.23.2.1 Top tekeri 3 noktayı düzleme oturtur (sallanmaz).",
          "RK.6.23.2.2 L298N ve Uno yerini bantla işaretler (vida saat 24).",
          "RK.6.23.2.3 Motor kablolarını etiketler (A/B, +/− geçici).",
          "RK.6.23.2.4 10 cm masada itince düz gider (pasif test).",
        ],
        materials: ["top teker", "bant", "kalem", "etiket"],
        prep: ["Düz mermer/masa. Eğri masa yalan söyler."],
        safety: ["Şase kenarından düşmesin, 10 cm itiş."],
        flow: [
          F(4, "anımsama", "Sürtünme", "Saat 1 tik.", "Çevirir."),
          F(6, "gösteri", "3 nokta", "Sallantı = top teker yüksek/alçak.", "Ayar."),
          F(22, "uygulama", "Caster + yerleşim", "İşaret, etiket, itiş.", "10 cm düz."),
          F(4, "paylaşım", "Sola ceken", "Teker çapı / sıkışma.", "Düzelt."),
          F(4, "değerlendirme", "Foto yerleşim", "Öğretmen.", "Çeker."),
        ],
        keyPoints: [
          "Pasif itiş eğriyse otonom da eğri — mekanik önce.",
          "Uno USB kablosu arkadan çıksın, çizgi sensörü önde.",
          "L298N vs altında, ısınır; hava boşluğu.",
          "Etiket: sonra OUT swap 5 dk değil 30.",
        ],
        steps: [
          "Top teker ayar.",
          "Sallantı 0.",
          "Uno/L298N izi.",
          "10 cm itiş.",
        ],
        troubleshooting: [
          { problem: "Sürekli sol", cause: "Bir teker sürtünür / top teker eğik", fix: "Saat 1 sürtünme; conta." },
        ],
        exitTicket: ["USB kablo hangi yönden çıkacak?", "Neden pasif itiş?"],
        support: "Öğretmen caster birlikte yönlendirir.",
        extension: "Ön tampon karton (engel için).",
        ortaokul: "İşaret bant yeter, vida deliği öğretmen.",
        lise: "Delik merkezleme cetvel.",
        homework: "Yok.",
        tips: ["Foto arşiv: ters motor kablosu hafta 24’te altın.", "Şaseyi dolaba teker üstü, ezilmesin."],
        altArduino: "Ana iz.",
        altMbot: "Caster zaten var; itiş testi + ultrasonik kule yönü.",
        altSpike: "Wheel alignment 10 cm.",
      }),
    ],
  },
  {
    week: 24,
    month: "Nisan",
    dates: "5–9 Nisan 2027",
    semester: 2,
    unit: "Robot şasesi montajı",
    title: "Besleme ve ilk hareket",
    why: "İlk kez yerde gidiyor. Kablo düzeni yoksa ilk turda ENA kopar. Kısa, yavaş, güvenli.",
    prior: ["L298N fonksiyonlar", "şase mekanik"],
    weekGoal: "Pil, sürücü, Uno montaj; 1 m ileri dur; acil durma ritüeli.",
    hours: [
      H({
        hour: 1,
        title: "Pil, sürücü, kablo düzeni",
        aim: "L298N ve Uno şaseye bağlanır, kablolar gerilmez, fermuar/kelepçe, polarite tik.",
        outcomes: [
          "RK.6.24.1.1 Sürücü ve Uno’yu işaretli yere vidalar veya çift taraflı bantlar.",
          "RK.6.24.1.2 Kablo düzeni: güç ayrı demet, sinyal ayrı.",
          "RK.6.24.1.3 Polarite tik listesi 6 madde.",
          "RK.6.24.1.4 Şaseyi masadan düşürmeden 180° çevirip kablo taraması yapar.",
        ],
        materials: ["vida/bant", "kelepçe", "6×AA", "polarite listesi"],
        prep: ["İlk hareket YOK bu saatin 35 dk’sı. Enerji son 5 dk LED test."],
        safety: ["Pil takılı değilken vida. S3."],
        flow: [
          F(4, "anımsama", "Yerleşim foto", "Hafta 23.", "Gösterir."),
          F(6, "anlatım", "İki demet", "Güç kırmızı-siyah; sinyal sarı. USB gergi payı.", "Kural."),
          F(22, "uygulama", "Montaj + tarama", "Çevir, çek, gerilme.", "6 tik polarite."),
          F(5, "gösteri", "LED 5V test", "Pil tak, sürücü 5V LED, Uno USB ayrı.", "Yanar."),
          F(3, "değerlendirme", "Liste teslim", "İmza.", "Verir."),
        ],
        keyPoints: [
          "USB ve pil aynı anda: GND ortak, 5V çift besleme çatışmasın — Uno jack/Vin boş.",
          "Kelepçe dişlisi tekeri yalamasın.",
          "IR önde henüz takılmayabilir — tampon boş.",
          "Çevirme testi: kopan kablo şimdi kopsun.",
        ],
        steps: [
          "Vida/bant.",
          "Demet.",
          "Çevir tarama.",
          "Polarite 6 tik.",
          "LED test.",
        ],
        wiring: {
          title: "Şase güç",
          items: [
            "6×AA → L298N VS + GND",
            "Uno USB (bilgisayar veya powerbank)",
            "GND Uno–L298N",
            "Vin boş",
          ],
        },
        troubleshooting: [
          { problem: "Sürücü LED yanmıyor", cause: "Pil ters / anahtar", fix: "Bazı yuvalarda switch; polarite." },
        ],
        exitTicket: ["Vin’e ne bağlanır bu yıl?", "İki kablo demeti neden ayrı?"],
        support: "Bant, vida öğretmen.",
        extension: "Powerbank Uno, pil sadece motor — iki paket.",
        ortaokul: "Bant kabul.",
        lise: "Pirinç ayak + vida.",
        homework: "Yok.",
        tips: ["İlk hareketi saat 2’ye sakla, bu saat kopuk kablo avı.", "Powerbank okul malı, öğrenci telefonu değil."],
        altArduino: "Ana iz.",
        altMbot: "Pil kapağı, kablo toparlama 20 dk + 20 dk yavaş ileri.",
        altSpike: "Battery alignment, cable clips.",
      }),
      H({
        hour: 2,
        title: "Zamanlı ileri gidiş",
        aim: "HIZ 120–160, 1 metre ileri, dur; acil USB/pil kesme provası. Dönüş yok zorunlu.",
        outcomes: [
          "RK.6.24.2.1 ileri() ve dur() ile 1 m gider, masadan düşmez.",
          "RK.6.24.2.2 Eğri gidişte bir OUT swap veya PWM denge dener.",
          "RK.6.24.2.3 Acil durma: el, USB, pil anahtarı 3’lüsünü 2 sn’de yapar.",
          "RK.6.24.2.4 HIZ const değerini deftere yazar.",
        ],
        materials: ["1 m bant pist", "engel yok", "spotter (takım arkadaşı)"],
        prep: ["Pist duvardan 1 m içerde. Spotter kuralı: el robotun üstünde değil yanında."],
        safety: ["İlk koşu HIZ 120. Ayak kablo. Acil durma prova önce."],
        flow: [
          F(5, "gösteri", "Acil durma", "USB çek / pil switch. 8 takım koro prova.", "Yapar."),
          F(5, "anlatım", "1 m = delay deneme", "HIZ 140, delay 1200 ile başla, ölç.", "Not."),
          F(22, "uygulama", "3 koşu", "Düzelt eğri. Spotter.", "1 m dur."),
          F(4, "paylaşım", "Eğri neden", "Mekanik vs PWM.", "Karar."),
          F(4, "değerlendirme", "HIZ ve delay", "Defter.", "Yazar."),
        ],
        keyPoints: [
          "Yazılımla eğri düzeltmek mekanik sürtünmeyi gizler; önce teker.",
          "1 m sonra dur: loop’ta ileri+delay+dur+delay(99999) veya while(1) dur.",
          "Spotter ‘eğlence kovalamaca’ değil güvenlik.",
          "IR/ultrasonik bu saat takılı değil — tek iş.",
        ],
        steps: [
          "Acil prova.",
          "HIZ 140 delay ayar.",
          "3 koşu.",
          "Eğri: mekanik sonra PWM.",
          "Defter HIZ.",
        ],
        code: {
          title: "1 m ileri dur",
          lang: "cpp",
          code: `// hafta 20 fonksiyonları
void loop() {
  ileri();
  delay(1200); // kendi 1 m kalibrasyonun
  dur();
  while (true) { delay(1000); }
}`,
        },
        troubleshooting: [
          { problem: "Dönerek gidiyor", cause: "Bir motor ters / teker sürtünme", fix: "OUT swap bir kanal; saat 23 itiş." },
          { problem: "Uno reset", cause: "GND kopuk, motor USB", fix: "Pil VS, GND köprü." },
        ],
        exitTicket: ["Acil durma 3 adımın?", "HIZ değerin?"],
        support: "Tek motor 1 m (diğeri havada değil, PWM 0).",
        extension: "Geri 0.5 m.",
        ortaokul: "mBlock move 1 saniye, kalibre.",
        lise: "Süre yerine encoder yok — dürüst delay.",
        homework: "Engel kaçınma şeması 15 cm (hafta 25).",
        tips: ["Kovalamaca çıkarsa pist kapanır, kâğıt işi.", "while(true) dur’u unutan robot duvara — spotter."],
        altArduino: "Ana iz.",
        altMbot: "Move forward 1 s, aynı acil (stop tuşu hub).",
        altSpike: "Move 50 cm if has distance.",
      }),
    ],
  },
  {
    week: 25,
    month: "Nisan",
    dates: "12–16 Nisan 2027",
    semester: 2,
    unit: "Engelden kaçan ve çizgi izleyen",
    title: "Engel kaçınma kodu",
    why: "Göz (HC-SR04) + kas (L298N) ilk kez aynı vücutta. 15 cm dur-geri-sap okul varsayılanı.",
    prior: ["mesafeCm", "ileri/sol/sağ", "şase 1 m"],
    weekGoal: "Önde HC-SR04, 15 cm’de dur, geri, rastgele veya sol sap, tekrar ileri.",
    hours: [
      H({
        hour: 1,
        title: "HC-SR04 şase üzerinde dur-geri",
        aim: "Sensörü ön tampona 2–4 cm taşır, titreşimsiz bağlar, 15 cm’de dur+geri.",
        outcomes: [
          "RK.6.25.1.1 HC-SR04’ü teker/kabloya değmeden monte eder.",
          "RK.6.25.1.2 Yerde 15 cm kutuya karşı durur.",
          "RK.6.25.1.3 Geri 300 ms, dur.",
          "RK.6.25.1.4 False 0 mesafede durmayı (timeout) ‘engel’ saymaz.",
        ],
        materials: ["HC-SR04", "çift taraflı bant / 3D braket", "kutu 15 cm"],
        prep: ["Braket yoksa Lego/karton. Sensör yerden 4–8 cm — zemin yankısı."],
        safety: ["Geri giderken kablo takılmasın. Spotter."],
        flow: [
          F(5, "gösteri", "Yükseklik", "Zemin 0 sahte engel.", "8 cm hedef."),
          F(5, "anlatım", "0 ≠ engel", "timeout. if (cm>0 && cm<15).", "Kod."),
          F(22, "uygulama", "Montaj + dur-geri", "Kutu testi 5 kez.", "5/5 duruş."),
          F(4, "paylaşım", "Zemin sahte", "Eğik sensör.", "Açı."),
          F(4, "değerlendirme", "Yükseklik cm", "Cetvel.", "Yazar."),
        ],
        keyPoints: [
          "Zemin yankısı: açı 0° en kötü, hafif yukarı bakış iyi.",
          "Kablo motor miline sarılır = ölüm. Kelepçe.",
          "5/5 duruş yoksa sapma yazma.",
          "USB kablo yer testini yalanlar — powerbank veya kısa kablo.",
        ],
        steps: [
          "Montaj 8 cm.",
          "cm>0 && <15 dur.",
          "geri 300 ms.",
          "5 kutu testi.",
        ],
        code: {
          title: "Dur geri",
          lang: "cpp",
          code: `void loop() {
  int cm = mesafeCm();
  if (cm > 0 && cm < 15) {
    dur(); delay(80);
    geri(); delay(300);
    dur(); delay(80);
  } else {
    ileri();
  }
}`,
        },
        troubleshooting: [
          { problem: "Zeminde duruyor", cause: "Açı aşağı", fix: "Yukarı 10°." },
          { problem: "USB kablo çekiyor", cause: "Laptop bağlı", fix: "Powerbank / dahili." },
        ],
        exitTicket: ["Zemin sahte engeli nasıl kesersin?", "Geri ms?"],
        support: "Sadece dur, geri yok.",
        extension: "Servo radar 3 okuma min.",
        ortaokul: "mBlock ultrasonic < 15 stop.",
        lise: "min of 3 samples.",
        homework: "Sapma yönü şeması (saat 2).",
        tips: ["USB yalanını ilk koşuda yaşat, powerbank’e geç.", "Kutu yumuşak, robot kırılmasın."],
        altArduino: "Ana iz.",
        altMbot: "Onboard ultrasonic aynı.",
        altSpike: "Distance < 15, reverse 0.3 s.",
      }),
      H({
        hour: 2,
        title: "Sapma ve tarama",
        aim: "Dur-geri-sol (veya rastgele) ile kutular arasında dolaşır; sonsuz duvar dansı yok.",
        outcomes: [
          "RK.6.25.2.1 Sapma süresini const SAP_MS ile ayarlar.",
          "RK.6.25.2.2 İki kutu slalomunu 30 sn’de tamamlar (düşmeden).",
          "RK.6.25.2.3 Aynı yöne sonsuz sapmayı 2. engelde tersine çevirerek kırar (basit).",
          "RK.6.25.2.4 HIZ düşürerek çarpışmayı azaltır.",
        ],
        materials: ["2 kutu slalom", "spotter"],
        prep: ["Pist 2×1 m. HIZ 130."],
        safety: ["Ayaklar pist dışı. 30 sn heat."],
        flow: [
          F(4, "anımsama", "5/5 duruş", "Yoksa sapma yok.", "Tik."),
          F(6, "anlatım", "SAP_MS", "400–700. lastTurn değişkeni.", "Şema."),
          F(22, "uygulama", "Slalom 3 heat", "Ayar defteri.", "1 başarılı heat."),
          F(4, "paylaşım", "En iyi SAP_MS", "Çetele.", "Yazar."),
          F(4, "değerlendirme", "Ayar defteri", "HIZ, ESIK, SAP.", "Teslim."),
        ],
        keyPoints: [
          "Ayar defteri yıl sonu rubrik belgesi.",
          "Rastgele sapma (millis()%2) duvar köşesinde işe yarar.",
          "Hız düşürmek kahramanlıktır.",
          "Çizgi izleme yarın; bugün engel dosyası H25 ayrı kalsın.",
        ],
        steps: [
          "SAP_MS const.",
          "lastTurn.",
          "3 heat slalom.",
          "Defter 3 sayı.",
        ],
        code: {
          title: "Sap",
          lang: "cpp",
          code: `const int SAP_MS = 500;
int lastTurn = 1;

void sap() {
  if (lastTurn > 0) sol(); else sag();
  delay(SAP_MS);
  dur();
  lastTurn = -lastTurn;
}`,
        },
        troubleshooting: [
          { problem: "Köşede sonsuz", cause: "Aynı yön sap", fix: "lastTurn flip / rastgele." },
        ],
        exitTicket: ["SAP_MS?", "Ayar defterinde 3 sayı."],
        support: "Hep sol sap, flip yok.",
        extension: "Servo 0-90-180 tarama, min cm yön seç.",
        ortaokul: "Hep sol.",
        lise: "Rastgele + flip.",
        homework: "H22 çizgi kodunu getir (hafta 26 birleşir).",
        tips: ["Heat 30 sn, alkış kısa.", "Kutu ağır olmasın, robot devrilmesin."],
        altArduino: "Ana iz.",
        altMbot: "Aynı slalom.",
        altSpike: "Aynı.",
      }),
    ],
  },
  {
    week: 26,
    month: "Nisan",
    dates: "19–23 Nisan 2027",
    semester: 2,
    unit: "Engelden kaçan ve çizgi izleyen",
    title: "Saha testi ve mini yarış",
    why: "23 Nisan Cuma tatil — mini yarış Çarşamba/Perşembe. Çizgi + isteğe engel füzyonu. Düzey kapısı: pistte 1 tur.",
    prior: ["H22 hayali izleme", "şase hareket", "H25 engel"],
    weekGoal: "Çizgi pistinde en az 1 tur; ayar defteri; mini yarış sıralaması (not değil, geribildirim).",
    hours: [
      H({
        hour: 1,
        title: "Çizgi pistinde kalibrasyon",
        aim: "IR şase yüksekliği 5–8 mm; H22 koduna gerçek ileri/sol/sağ bağlanır; 1 tur hedef.",
        outcomes: [
          "RK.6.26.1.1 IR’yi şase altına 6 mm’de bağlar, tablosunu yerde yeniler.",
          "RK.6.26.1.2 H22 emirlerini motor fonksiyonlarına bağlar.",
          "RK.6.26.1.3 HIZ 100–140 çizgide (düşük).",
          "RK.6.26.1.4 1 tur veya dürüst ‘nerede çıktı’ haritası.",
        ],
        materials: ["siyah bant oval pist ~2 m", "IR", "H22 kod"],
        prep: ["Pist önceden yapışık. 23 Nisan ise bu saati Çarşamba yap.", "Güneş perdesi."],
        safety: ["Düşük hız. Spotter. Kablo sarma."],
        flow: [
          F(5, "anımsama", "SIYAH const", "Yeni tablo yerde.", "Günceller."),
          F(5, "anlatım", "H22 bağla", "Serial yerine ileri/sol/sağ. ARA lastDir.", "Kod."),
          F(22, "uygulama", "Tur denemeleri", "Ayar defteri HIZ.", "1 tur veya harita."),
          F(4, "paylaşım", "Çıkış noktası", "S, kavşak, kayıp.", "Çetele."),
          F(4, "değerlendirme", "Tur tik / harita", "Dürüst.", "Teslim."),
        ],
        keyPoints: [
          "Yerde kalibrasyon masadakini ezer.",
          "Hız kahramanı çizgiden uçar.",
          "Engel füzyonu uzatma: çizgideyken cm<12 dur.",
          "1 tur barajı utanç değil kapı — saat 2 tuning.",
        ],
        steps: [
          "IR 6 mm.",
          "Tablo yenile.",
          "H22 motor bağla.",
          "Tur / harita.",
        ],
        code: {
          title: "Çizgi bağlama",
          lang: "cpp",
          code: `void loop() {
  bool sl = siyah(L), sr = siyah(R);
  if (sl && !sr) { sol(); lastDir = -1; }
  else if (sr && !sl) { sag(); lastDir = 1; }
  else if (sl && sr) { ileri(); }
  else { if (lastDir < 0) sol(); else sag(); }
}`,
          notes: "PWM çizgide 110–140. ARA’da biraz daha yavaş olabilir.",
        },
        troubleshooting: [
          { problem: "Anında çıkar", cause: "SIYAH ters / hız / yükseklik", fix: "Serial durarak oku; HIZ 100; 6 mm." },
          { problem: "Titreyerek zikzak", cause: "Sensör çok aralıklı / HIZ yüksek", fix: "HIZ düşür; orta çizgi." },
        ],
        exitTicket: ["Yeni SIYAH const?", "Tur tamam mı, nerede çıktı?"],
        support: "Düz çizgi 50 cm, oval değil.",
        extension: "Engel+çizgi: cm<12 dur, yoksa izle.",
        ortaokul: "mBlock line follow örnek, eşik ayar.",
        lise: "PID sözü yok; P: hata = L-R PWM farkı isteğe.",
        homework: "Yok (23 Nisan).",
        tips: ["Pist bantını gece önceden yap.", "Güneş öğlen felaket — perde veya yer değiştir."],
        altArduino: "Ana iz.",
        altMbot: "Line follow, speed 40/100.",
        altSpike: "Reflected light pid-like simple.",
      }),
      H({
        hour: 2,
        title: "Mini yarış ve ayar defteri",
        aim: "2 heat, en iyi tur süresi veya ‘en uzak nokta’. Rubrik R3 ön izleme. 23 Nisan kaydırma.",
        outcomes: [
          "RK.6.26.2.1 Heat kuralına uyar (start çizgisi, 60 sn tavan).",
          "RK.6.26.2.2 Ayar defterine heat sonucu işler.",
          "RK.6.26.2.3 Bir iyileştirme (HIZ, yükseklik, const) yapıp 2. heat’e çıkar.",
          "RK.6.26.2.4 Akran ‘bir güç bir öneri’ yazar.",
        ],
        materials: ["kronometre", "sıra kura", "ayar defteri", "akran kartı"],
        prep: ["Cuma tatilse bu saat Perşembe. Jüri sen + 1 öğrenci asistan."],
        safety: ["Tek robot pistte. Diğerleri 1 m geri."],
        flow: [
          F(4, "anlatım", "Kural", "60 sn, start alkış değil ‘üç-iki-bir’. Çarpışma yok.", "Kura."),
          F(16, "uygulama", "Heat 1", "8× ~2 dk.", "Süre/harita."),
          F(6, "uygulama", "Tek iyileştirme", "Bir parametre.", "Değiştirir."),
          F(10, "uygulama", "Heat 2", "Aynı.", "Süre."),
          F(4, "değerlendirme", "Defter + akran", "Teslim.", "Kart."),
        ],
        keyPoints: [
          "Sıralama not değil; R3 kanıtı ‘iyileştirme yaptım’.",
          "Tek parametre kuralı bilimsel alışkanlık.",
          "Çizgi kaybeden durur, kovalamaz.",
          "Hackathon haftaya: robot zorunlu değil, problem seçimi.",
        ],
        steps: [
          "Kura.",
          "Heat 1.",
          "1 parametre.",
          "Heat 2.",
          "Defter.",
        ],
        troubleshooting: [
          { problem: "Tüm robotlar çıkıyor", cause: "Pist parlak / bant kalitesi", fix: "Mat bant, ışık, HIZ tavan 120 zorunlu." },
        ],
        exitTicket: ["Değiştirdiğin tek parametre?", "Heat 2 daha mı iyi, kanıt?"],
        support: "Heat yerine 30 sn demo.",
        extension: "Engel füzyon heat ayrı.",
        ortaokul: "Süre değil tur tamamlama ikili (evet/hayır).",
        lise: "Süre + kesinti sayısı.",
        homework: "Okul sorunu 3 aday (hafta 27).",
        tips: ["Asistan öğrenci kapı tutar, sen kronometre.", "23 Nisan konuşması: Cuma yok, veli notu gitti mi."],
        altArduino: "Ana iz.",
        altMbot: "Aynı heat.",
        altSpike: "Aynı.",
      }),
    ],
  },
];
