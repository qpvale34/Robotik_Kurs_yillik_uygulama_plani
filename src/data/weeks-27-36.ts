import type { WeekPlan } from "./types";
import { F, H } from "./helpers";

export const WEEKS_27_36: WeekPlan[] = [
  // HAFTA 27: I2C LCD ve Telemetri Göstergesi
  {
    week: 27,
    month: "Nisan",
    dates: "26–30 Nisan 2027",
    semester: 2,
    unit: "Göstergeler ve Telemetri (I2C LCD Paneli)",
    title: "I2C LCD Ekran ile Canlı Robot Telemetri Paneli",
    why: "Mobil robotun bilgisayara bağlı kalmadan anlık hızını, ultrasonik mesafesini, zemin durumunu ve batarya voltajını göstermesi otonom mühendisliğin temelidir. I2C veri yolu sadece 2 pin (SDA/SCL) kullanarak kablo karmaşasını önler.",
    prior: ["HC-SR04 mesafe okuma", "DENEYAP IR çizgi sensörü", "I2C adresleme fikri"],
    weekGoal: "PCF8574 entegreli 16x2 LCD ekranı I2C ile bağlar, LiquidCrystal_I2C kütüphanesiyle robotun canlı telemetri gösterge panelini kodlar.",
    hours: [
      H({
        hour: 1,
        title: "I2C Protokolü, SDA/SCL Pinleri ve Ekrana Metin Yazdırma",
        aim: "16x2 I2C LCD ekranı DENEYAP Kart'ın SDA/SCL pinlerine bağlar; I2C tarayıcı ile adresi (0x27/0x3F) doğrular ve statik/dinamik metin yazar.",
        outcomes: [
          "RK.7.27.1.1 I2C veri yolunun çalışma mantığını ve SDA/SCL hatlarını açıklar.",
          "RK.7.27.1.2 I2C LCD ekranı 5V, GND, SDA ve SCL pinlerine doğru bağlar.",
          "RK.7.27.1.3 I2C Scanner kodu ile cihazın donanım adresini Serial monitörde bulur.",
          "RK.7.27.1.4 `lcd.init()`, `lcd.backlight()` ve `lcd.setCursor()` komutlarıyla ekrana bilgi yazar.",
        ],
        materials: ["DENEYAP Kart v2", "I2C 16x2 LCD Ekran", "4 dişi-dişi/dişi-erkek jumper", "USB Type-C kablo"],
        prep: ["Arduino IDE'de `LiquidCrystal_I2C` kütüphanesinin kurulu olduğunu kontrol et.", "Ekranın arkasındaki potansiyometre kontrast ayarını tornavidayla orta konuma getir."],
        safety: ["I2C hatlarını ters bağlama (VCC/GND tersliği PCF8574 çipini ısıtabilir).", "Bağlantıları kart enerjisizken yap."],
        flow: [
          F(5, "açılış", "Bilgisayarsız Robot", "Robot pistteyken ne düşündüğünü nasıl anlarız? Seri port kablosu yetmez, ekran gerekir.", "Kendi örneğini verir."),
          F(8, "anlatım", "I2C ve Adresleme", "Paralel 16 pin yerine sadece 2 kablo: SDA (Veri) ve SCL (Saat). Her cihazın bir adresi vardır.", "Adres mantığını deftere çizer."),
          F(17, "uygulama", "I2C Tarayıcı ve Merhaba", "I2C Scanner yükle, adresi öğren (0x27). Ardından takıma özel karşılama mesajı yaz.", "Kendi takım adını ekranda gösterir."),
          F(6, "paylaşım", "Kontrast Ayarı", "Yazı görünmüyorsa ekran arkasındaki mavi trimpotu döndür.", "Ekran kontrastını ayarlar."),
          F(4, "değerlendirme", "Çıkış Bileti", "SDA ve SCL ne işe yarar?", "Çıkış biletini cevaplar."),
        ],
        keyPoints: [
          "I2C veri yolunda onlarca cihaz aynı 2 kabloya bağlanabilir; cihazlar benzersiz adresleriyle ayrılır.",
          "DENEYAP Kart v2 üzerinde varsayılan I2C pinleri: SDA ve SCL etiketli pinlerdir.",
          "Ekranda sadece beyaz kareler görünüyorsa veya ekran boşsa mavi kontrast trimpotunu küçük tornavidayla ayarla.",
        ],
        steps: [
          "VCC -> 5V, GND -> GND, SDA -> SDA, SCL -> SCL bağla.",
          "I2C Scanner kodu ile adresi doğrula.",
          "LiquidCrystal_I2C kütüphanesiyle ilk mesajı yaz.",
          "Mavi potansiyometre ile yazı netliğini ayarla.",
        ],
        code: {
          title: "I2C 16x2 LCD Başlangıç Kodu",
          lang: "cpp",
          code: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Adres genellikle 0x27 veya 0x3F'tir
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Wire.begin();
  lcd.init();
  lcd.backlight();
  
  lcd.setCursor(0, 0);
  lcd.print("ROBOTIK ATOLYE");
  lcd.setCursor(0, 1);
  lcd.print("Takim 1 - HAZIR");
}

void loop() {
  // Statik karşılama ekranı
}`,
          notes: "Yazı görünmezse ekran arkasındaki potansiyometreyi küçük tornavidayla çevirerek kontrastı ayarlayın.",
        },
        wiring: {
          title: "I2C LCD Pin Bağlantıları",
          items: [
            "GND -> DENEYAP Kart GND",
            "VCC -> 5V (3.3V bağlandığında arka ışık soluk yanar)",
            "SDA -> DENEYAP Kart SDA pini",
            "SCL -> DENEYAP Kart SCL pini",
          ],
        },
        troubleshooting: [
          {
            problem: "Ekranda hiçbir yazı yok, sadece arka ışık yanıyor.",
            cause: "Kontrast potansiyometresi en uçta kalmış veya I2C adresi yanlıştır.",
            fix: "Arkada bulunan mavi trimpotu yavaşça çevir; I2C Scanner ile 0x27 / 0x3F adresini teyit et.",
          },
          {
            problem: "Kod derlenirken 'LiquidCrystal_I2C.h: No such file' hatası veriyor.",
            cause: "Kütüphane Arduino IDE'ye yüklenmemiş.",
            fix: "Araçlar -> Kütüphaneleri Yönet menüsünden Frank de Brabander'ın LiquidCrystal_I2C kütüphanesini kur.",
          },
        ],
        exitTicket: ["I2C ekran için mikrodenetleyiciden kaç sinyal kablosu çıkar?", "Ekrandaki mavi pot ne işe yarar?"],
        support: "Adres bulmakta zorlanan takıma doğrudan 0x27 tanımlı şablon kodu aç.",
        extension: "2. satıra `millis() / 1000` ile çalışan bir saniye sayacı eklet.",
        ortaokul: "Ekrana kendi adını ve takım numarasını yazdır.",
        lise: "Özel karakter oluşturma fonksiyonu (`createChar`) ile pil veya şimşek simgesi tasarlat.",
        homework: "Evde Tinkercad Circuits üzerinde I2C LCD ekran devresi kur.",
        tips: ["Ders öncesi laboratuvardaki ekranların I2C adresini etiketleyip arkasına yazın."],
        altArduino: "Arduino Uno'da SDA = A4, SCL = A5 pinleridir; kod tamamen aynıdır.",
        altMbot: "mBlock I2C LCD uzantısı ile bloklardan metin gönderimi.",
        altSpike: "SPIKE hub 5x5 LED matrisinde kayan yazı mantığıyla eşdeğer gösterim.",
      }),
      H({
        hour: 2,
        title: "Canlı Telemetri Paneli: Mesafe, Çizgi ve Durum Ekranı",
        aim: "HC-SR04 ultrasonik sensöründen okunan mesafeyi ve IR çizgi sensörü verisini LCD ekranda 200 ms aralıklarla canlı günceller.",
        outcomes: [
          "RK.7.27.2.1 Sensör verilerini string formatında birleştirerek LCD ekrana yazar.",
          "RK.7.27.2.2 Ekranın titreşmesini (flicker) önlemek için gereksiz `lcd.clear()` kullanımından kaçınır.",
          "RK.7.27.2.3 Robot engelle karşılaştığında ekranda 'ENGEL!', yol açıkken 'ILERI' durumunu gösterir.",
          "RK.7.27.2.4 Sensör hatası durumunda ekranda 'HATA' uyarısı üretir.",
        ],
        materials: ["DENEYAP Kart", "I2C LCD 16x2", "HC-SR04 Mesafe Sensörü", "DENEYAP Çizgi Sensörü", "Breadboard ve Jumperlar"],
        prep: ["Mesafe sensörü Trig/Echo pinlerini tahtaya yaz.", "Öğrencilere ekran yenileme frekansı kavramını açıkla."],
        safety: ["Tekerlekler dönerken elinizi şase dişlilerine yaklaştırmayın."],
        flow: [
          F(5, "açılış", "Telemetri Nedir?", "F1 araçlarında ve uzay roketlerinde pilotun önündeki göstergeler: hız, yakıt, sensörler.", "Kendi cümlesiyle telemetriyi açıklar."),
          F(8, "anlatım", "Flicker Önleme", "Her döngüde `clear()` yaparsak ekran yanıp söner (titrer). Sadece değişen alanın üzerine boşlukla yazılır.", "Not alır."),
          F(17, "uygulama", "Sensör Ekranı Kodlama", "HC-SR04 mesafesini oku, 'Mesafe: XX cm' olarak ekrana bas. 15 cm'den yakınsa 'DUR!', uzaksa 'YOL ACIK'.", "Kodu çalıştırır, engeli yaklaştırıp test eder."),
          F(6, "paylaşım", "Gözlem Turu", "Takımların panellerini karşılaştır: hangi takımın arayüzü daha okunabilir?", "Akran arayüzlerini inceler."),
          F(4, "değerlendirme", "Özet", "Neden her döngüde `lcd.clear()` yapmamalıyız?", "Cevabı tahtaya yazar."),
        ],
        keyPoints: [
          "`lcd.clear()` ekranı tamamen sıfırlar ve gözle görülür bir titreşime neden olur; bunun yerine `lcd.setCursor(x, y)` ile üzerine yazılır.",
          "Sayı basamakları azaldığında (ör. 100 cm'den 9 cm'ye düşüş) eski basamakların silinmesi için arkasına boşluk karakteri eklenmelidir.",
          "Telemetri paneli otonom robotun hata ayıklama süresini yarı yarıya kısaltır.",
        ],
        steps: [
          "HC-SR04 sensörünü karta bağla (Trig: D12, Echo: D11).",
          "Mesafe ölçüm fonksiyonunu yaz.",
          "Satır 0: 'MESAFE: ' + cm + ' cm'.",
          "Satır 1: Durum mesajı ('ILERI' veya 'DUR! ENGEL').",
        ],
        code: {
          title: "Canlı Telemetri Gösterge Kodu",
          lang: "cpp",
          code: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);
const int TRIG = 12;
const int ECHO = 11;

long readDistance() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long duration = pulseIn(ECHO, HIGH, 25000);
  if (duration == 0) return 999;
  return duration / 58;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Wire.begin();
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("TELEMETRI AKTIF");
  delay(1000);
  lcd.clear();
}

void loop() {
  long dist = readDistance();
  
  lcd.setCursor(0, 0);
  lcd.print("Mesafe: ");
  lcd.print(dist);
  lcd.print(" cm   "); // basamak silme boşluğu
  
  lcd.setCursor(0, 1);
  if (dist < 15) {
    lcd.print("DUR! [ENGEL]   ");
  } else {
    lcd.print("YOL ACIK [OK]  ");
  }
  delay(150);
}`,
          notes: "Basamak değişimlerinde eski karakterlerin kalmaması için `cm` sonrasına boşluk bırakılmıştır.",
        },
        wiring: {
          title: "Telemetri Sistemi Devre Şeması",
          items: [
            "I2C LCD: VCC->5V, GND->GND, SDA->SDA, SCL->SCL",
            "HC-SR04: VCC->5V, GND->GND, Trig->D12, Echo->D11",
          ],
        },
        troubleshooting: [
          {
            problem: "Mesafe 100 cm'den 9 cm'ye düşünce ekranda '90 cm' gibi garip sayılar kalıyor.",
            cause: "Eski üçüncü basamak temizlenmemiştir.",
            fix: "`lcd.print(' cm   ');` şeklinde sayı sonuna boşluk ekle veya formatlı yazdır.",
          },
        ],
        exitTicket: ["Telemetri paneli sahada robota ne kazandırır?", "Titreşimi önlemek için hangi komuttan kaçınırız?"],
        support: "Mesafeyi tek satıra yazdırıp ikinci satıra sabit yazı koydur.",
        extension: "İkinci satıra IR çizgi sensörünün sol/sağ durumunu (S:1 S:0) eklet.",
        ortaokul: "Mesafeye göre gülen yüz / üzgün yüz simgesi çıkart.",
        lise: "Ortalama alan 5 elemanlı hareketli pencere (moving average) filtresi uygulat.",
        homework: "I2C ekranın 2. satırına batarya durumu yazdıran mantık şeması çiz.",
        tips: ["Tüm takımların ekran parlaklıklarını kontrol edin, loş ekranları trimpotla netleştirin."],
        altArduino: "Arduino Uno ile birebir aynı kütüphane ve kod yapısı.",
        altMbot: "mBlock ekran bloğu ile mesafe değişkenini yazdırma.",
        altSpike: "Spike Prime hub ekranında sayı gösterme komutu.",
      }),
    ],
  },

  // HAFTA 28: Bluetooth BLE ve Mobil Kumanda
  {
    week: 28,
    month: "Mayıs",
    dates: "3–7 Mayıs 2027",
    semester: 2,
    unit: "Kablosuz İletişim ve IoT (Bluetooth BLE)",
    title: "DENEYAP Kart Dahili Bluetooth ile Telefondan Robot Kontrolü",
    why: "DENEYAP Kart v2 bünyesindeki ESP32 çipinde yerleşik Bluetooth (BLE) barındırır. Harici HC-05/06 modülüne ihtiyaç duymadan akıllı telefonla doğrudan eşleşebilir. Öğrenciler mobil arayüzle kablosuz robot yönlendirmeyi ve paket iletişimini öğrenir.",
    prior: ["DC motor PWM sürüşü", "I2C LCD telemetri", "Seri haberleşme"],
    weekGoal: "DENEYAP Kart dahili Bluetooth BLE modülünü aktif eder; akıllı telefon kumanda uygulamasından gelen ileri/geri/sağ/sol/far komutlarını kablosuz çözer.",
    hours: [
      H({
        hour: 1,
        title: "Dahili Bluetooth (BLE) Mimarisi ve Telefon Eşleşmesi",
        aim: "DENEYAP Kart'ın dahili Bluetooth modülünü adlandırarak başlatır; akıllı telefondaki BLE terminal veya kumanda uygulamasıyla kablosuz eşleşir.",
        outcomes: [
          "RK.7.28.1.1 Bluetooth Düşük Enerji (BLE) protokolünün temel özelliklerini açıklar.",
          "RK.7.28.1.2 DENEYAP Kart v2'nin dahili BLE kütüphanesini koda dahil eder.",
          "RK.7.28.1.3 Takıma özel cihaz adı (ör: 'Robot_Takim1') atayarak yayın başlatır.",
          "RK.7.28.1.4 Telefondan gönderilen karakterleri Serial monitörde ve I2C LCD ekranda görüntüler.",
        ],
        materials: ["DENEYAP Kart v2", "Akıllı Telefon / Tablet (Bluetooth açık)", "I2C LCD Ekran", "USB Kablo"],
        prep: ["Akıllı telefonlara Dabble, Serial Bluetooth Terminal veya DENEYAP Kumanda uygulamasını kurdur.", "Laboratuvarda Bluetooth isimlerinin karışmaması için her takıma numara ata."],
        safety: ["Sınıfta aynı isimde birden fazla cihaz açılırsa eşleşme karışır; takım numarasını mutlaka koda yaz."],
        flow: [
          F(5, "açılış", "Kablosuz Özgürlük", "Kablolu robot sınırlıdır. Arabamızı telefonumuzdan kumanda edebilir miyiz?", "Heyecanla telefonunu hazırlar."),
          F(8, "anlatım", "ESP32 Dahili BLE Gücü", "DENEYAP Kart'ta ek parça gerekmez; içinde Bluetooth radyosu vardır. Karakter bazlı haberleşme (F=Forward, B=Back, L=Left, R=Right, S=Stop).", "Protokolü defterine çizer."),
          F(17, "uygulama", "Eşleşme ve Terminal Testi", "Kodu yükle, telefondan bağlan, 'A', 'B' gönder, ekranda ve seri monitörde gör.", "Telefonla bağlanıp ilk veriyi gönderir."),
          F(6, "paylaşım", "Gecikme (Latency) Testi", "Tuşa basış ile ekrandaki yazı arasında kaç milisaniye fark var?", "Gecikmeyi gözlemler."),
          F(4, "değerlendirme", "Kontrol", "Bluetooth bağlıyken mavi LED yakma mantığı.", "Kodu doğrular."),
        ],
        keyPoints: [
          "Dahili Bluetooth sayesinde atölyede harici Bluetooth modülü maliyeti ve kablo kalabalığı ortadan kalkar.",
          "Her takım robotuna benzersiz ad vermelidir: ör. `DENEYAP_ROBOT_T1`.",
          "Telefondan tek karakter göndermek (byte haberleşmesi) paket bazlı haberleşmeye göre çok daha hızlı ve kesintisizdir.",
        ],
        steps: [
          "`BluetoothSerial` kütüphanesini dahil et.",
          "`SerialBT.begin('TAKIM_1_ROBOT');` başlat.",
          "`SerialBT.read()` ile gelen baytı oku.",
          "LCD ekrana ve Serial monitöre yazdır.",
        ],
        code: {
          title: "DENEYAP Dahili Bluetooth Alıcı Kodu",
          lang: "cpp",
          code: `#include <BluetoothSerial.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

BluetoothSerial SerialBT;
LiquidCrystal_I2C lcd(0x27, 16, 2);
const int BLUE_LED = 2; // Baglanti gosterge LED'i

void setup() {
  Serial.begin(115200);
  pinMode(BLUE_LED, OUTPUT);
  Wire.begin();
  lcd.init();
  lcd.backlight();
  
  // Takim adini benzersiz verin:
  SerialBT.begin("DENEYAP_ROBOT_T1");
  lcd.setCursor(0, 0);
  lcd.print("BLE: BEKLENIYOR");
  lcd.setCursor(0, 1);
  lcd.print("T1 Baglanti Yok");
}

void loop() {
  if (SerialBT.available()) {
    char cmd = SerialBT.read();
    digitalWrite(BLUE_LED, HIGH);
    
    lcd.setCursor(0, 0);
    lcd.print("BLE: BAGLANDI  ");
    lcd.setCursor(0, 1);
    lcd.print("Komut: ");
    lcd.print(cmd);
    lcd.print("       ");
    Serial.println(cmd);
  }
}`,
          notes: "DENEYAP Kart v2 ESP32 tabanlı olduğu için BluetoothSerial kütüphanesini doğrudan destekler.",
        },
        wiring: {
          title: "Bluetooth ve Durum Göstergesi",
          items: [
            "DENEYAP Kart Type-C USB ile bilgisayara bağlı",
            "Mavi LED -> D2 (220Ω dirençle) Bluetooth göstergesi",
            "I2C LCD -> SDA/SCL pinlerinde",
          ],
        },
        troubleshooting: [
          {
            problem: "Telefonda cihaz ismi görünmüyor.",
            cause: "Bluetooth izni verilmemiş veya kart yeniden başlamamıştır.",
            fix: "Telefonda konum ve Bluetooth izinlerini aç; DENEYAP Kart'ın RST butonuna bas.",
          },
        ],
        exitTicket: ["Bluetooth ile karta veri aktarırken baud rate neden önemlidir?", "Takım ismi neden benzersiz olmalı?"],
        support: "Bağlantı kuramayan takıma öğretmenin telefonundan test yaptır.",
        extension: "Telefondan '1' gelince buzzer bip sesi, '0' gelince susma kodu eklet.",
        ortaokul: "Sadece tek harf (F, B) göndererek LED açıp kapatsın.",
        lise: "BLE Characteristic ve UUID mimarisini tanıtan kısa teorik not incelet.",
        homework: "Mobil kumanda için ekranda buton yerleşimi taslağı çiz.",
        tips: ["Öğrencilerin telefonlarında Bluetooth adını kontrol etmelerini sağlayın."],
        altArduino: "Arduino Uno'da harici HC-05 modülü (RX/TX) gereklidir.",
        altMbot: "mBot Bluetooth uygulaması ile Makeblock App eşleşmesi.",
        altSpike: "SPIKE Prime Bluetooth BLE üzerinden bilgisayar/tablet kontrolü.",
      }),
      H({
        hour: 2,
        title: "Mobil Gamepad ile 4WD Robot Sürüşü, Far ve Korna",
        aim: "Gelen F, B, L, R, S komutlarını DENEYAP Motor Sürücüye iletir; mobil kumandadan robotu yönlendirir, RGB LED ile far ve buzzer ile korna çalar.",
        outcomes: [
          "RK.7.28.2.1 Gelen 'F' (İleri), 'B' (Geri), 'L' (Sol), 'R' (Sağ), 'S' (Dur) komutlarını sürüş fonksiyonlarına yönlendirir.",
          "RK.7.28.2.2 'W' komutuyla farları (RGB LED beyaz/sarı), 'H' komutuyla korna sesini (Buzzer) tetikler.",
          "RK.7.28.2.3 Bağlantı koptuğunda robotun güvenli şekilde durmasını (Fail-safe) kodlar.",
          "RK.7.28.2.4 Atölye zemininde mobil kumandayla slalom parkurunu başarıyla tamamlar.",
        ],
        materials: ["4WD Robot Şasesi", "DENEYAP Kart", "DENEYAP Motor Sürücü", "18650 Piller & Yuva", "RGB LED", "Buzzer", "Akıllı Telefon"],
        prep: ["Zemine koniler veya pet şişelerle slalom parkuru kur.", "Pil voltajlarının 7.4V üzerinde olduğunu multimetreyle doğrula."],
        safety: ["Robotu çalıştırmadan önce havada tekerlek testi yap; doğrudan yere bırakma.", "Piller aşırı ısınırsa anahtarı kapat."],
        flow: [
          F(5, "açılış", "Uzaktan Kumandalı RC Araç", "Kendi yaptığımız 4 çeker aracımızı telefonumuzla gerçek bir RC araba gibi süreceğiz.", "Heyecanla robotu hazırlar."),
          F(8, "anlatım", "Komut Tablosu ve Fail-Safe", "F=İleri, B=Geri, L=Sol, R=Sağ, S=Stop. Eğer bağlantı koparsa robot duvara çarpmasın; son veri üzerinden 500 ms geçerse otomatik durdur.", "Güvenlik kuralını anlar."),
          F(17, "uygulama", "Sürüş Kodu ve Slalom", "Kodu yükle, robotu piste koy, telefon kumandasıyla slalom parkurunu tamamla.", "Aracı sürer, far ve korna dener."),
          F(6, "paylaşım", "Tur Süreleri", "Takımların slalom sürelerini tahtaya yaz ve kıyasla.", "Sürüş tekniklerini tartışır."),
          F(4, "değerlendirme", "Özet", "Fail-safe neden hayat kurtarır?", "Özeti defterine yazar."),
        ],
        keyPoints: [
          "Fail-safe mekanizması: Eğer kumandadan belirli süre sinyal gelmezse robot kendiliğinden durmalıdır.",
          "Motor sürücünün lojik GND'si ile pil GND'si mutlaka ortak bağlanmalıdır.",
          "Far için RGB LED'in Kırmızı+Yeşil+Mavi pinleri aynı anda yakılarak beyaz ışık elde edilir.",
        ],
        steps: [
          "Motor sürücü yön pinlerini bağla.",
          "Buzzer ve RGB LED far bağlantılarını tamamla.",
          "Bluetooth switch-case sürüş kodunu yükle.",
          "Havada tekerlek yönlerini test et, ardından parkura çık.",
        ],
        code: {
          title: "Bluetooth RC Araba Tam Kontrol Kodu",
          lang: "cpp",
          code: `#include <BluetoothSerial.h>

BluetoothSerial SerialBT;
// Motor Surucu Pinleri
const int M1_IN1 = 14;
const int M1_IN2 = 27;
const int M2_IN1 = 26;
const int M2_IN2 = 25;
const int BUZZER = 19;
const int FAR_LED = 23;

void stopMotors() {
  digitalWrite(M1_IN1, LOW); digitalWrite(M1_IN2, LOW);
  digitalWrite(M2_IN1, LOW); digitalWrite(M2_IN2, LOW);
}

void forward() {
  digitalWrite(M1_IN1, HIGH); digitalWrite(M1_IN2, LOW);
  digitalWrite(M2_IN1, HIGH); digitalWrite(M2_IN2, LOW);
}

void backward() {
  digitalWrite(M1_IN1, LOW); digitalWrite(M1_IN2, HIGH);
  digitalWrite(M2_IN1, LOW); digitalWrite(M2_IN2, HIGH);
}

void turnLeft() {
  digitalWrite(M1_IN1, LOW); digitalWrite(M1_IN2, HIGH);
  digitalWrite(M2_IN1, HIGH); digitalWrite(M2_IN2, LOW);
}

void turnRight() {
  digitalWrite(M1_IN1, HIGH); digitalWrite(M1_IN2, LOW);
  digitalWrite(M2_IN1, LOW); digitalWrite(M2_IN2, HIGH);
}

void setup() {
  pinMode(M1_IN1, OUTPUT); pinMode(M1_IN2, OUTPUT);
  pinMode(M2_IN1, OUTPUT); pinMode(M2_IN2, OUTPUT);
  pinMode(BUZZER, OUTPUT); pinMode(FAR_LED, OUTPUT);
  
  SerialBT.begin("ROBOT_RC_T1");
  stopMotors();
}

void loop() {
  if (SerialBT.available()) {
    char cmd = SerialBT.read();
    switch (cmd) {
      case 'F': forward(); break;
      case 'B': backward(); break;
      case 'L': turnLeft(); break;
      case 'R': turnRight(); break;
      case 'S': stopMotors(); break;
      case 'H': // Korna
        tone(BUZZER, 1000, 150); break;
      case 'W': // Far ac/kapa
        digitalWrite(FAR_LED, !digitalRead(FAR_LED)); break;
    }
  }
}`,
          notes: "Telefondaki sanal joystick bırakıldığında 'S' göndererek robotun durması sağlanır.",
        },
        wiring: {
          title: "RC Araba Sürücü ve Eklenti Bağlantısı",
          items: [
            "Motor Sürücü IN1-IN4 -> D14, D27, D26, D25",
            "Far LED -> D23 (220Ω ile)",
            "Korna Buzzer -> D19",
            "18650 7.4V Pil -> Motor Sürücü Güç Klemensine (GND'ler ortak)",
          ],
        },
        troubleshooting: [
          {
            problem: "İleri komutunda tekerleklerden biri ters dönüyor, robot kendi etrafında dönüyor.",
            cause: "Motor kabloları ters takılmıştır.",
            fix: "Ters dönen motorun sürücü klemensindeki iki kablosunu birbiriyle yer değiştir.",
          },
        ],
        exitTicket: ["Robot sola dönerken sağ ve sol tekerlekler hangi yönlere dönmelidir?", "Far için hangi pin kullanıldı?"],
        support: "Tekerlek yönlerini düzeltmekte zorlanan takıma kablo yönlerini kontrol ettir.",
        extension: "Telefondan '0' ile '9' arası hız kademesi gönderilip PWM ile hız ayarı yaptır.",
        ortaokul: "Düz ileri ve dur komutlarıyla slalom yaptır.",
        lise: "PWM ile diferansiyel yumuşak dönüş (smooth steering) algoritması eklet.",
        homework: "Bluetooth kopması durumunda 1 saniye sonra robotu durduran `millis()` kodunu yaz.",
        tips: ["Pillerin tam dolu olduğundan emin olun, zayıf pilde motorlar kartı resetleyebilir."],
        altArduino: "Uno + L298N + HC-05 ile eşdeğer RC uygulaması.",
        altMbot: "mBlock Joystick bloklarıyla mBot sürüşü.",
        altSpike: "SPIKE Prime uzaktan kumanda bloğu ile iki motor sürüşü.",
      }),
    ],
  },

  // HAFTA 29: Sonlu Durum Makineleri (FSM) ile Çoklu Görev Robotu
  {
    week: 29,
    month: "Mayıs",
    dates: "10–14 Mayıs 2027",
    semester: 2,
    unit: "İleri Algoritmalar ve Durum Makineleri (FSM)",
    title: "Sonlu Durum Makinesi (FSM) ile Çok Fonksiyonlu Robot",
    why: "Gerçek endüstriyel robotlar tek bir iş yapmaz; duruma göre çizgi izler, engelden kaçar veya uzaktan kumanda moduna geçer. Spagetti `if-else` karmaşası yerine durum makinesi (Finite State Machine) mimarisi öğrenilir.",
    prior: ["Engelden kaçan robot", "Çizgi izleyen robot", "Bluetooth RC", "I2C LCD"],
    weekGoal: "Robotu [Mod 1: Çizgi İzleyen, Mod 2: Engelden Kaçan, Mod 3: Bluetooth RC] durumlarını içeren bir FSM mimarisinde kodlar; takt buton veya LCD menü ile mod geçişi yapar.",
    hours: [
      H({
        hour: 1,
        title: "FSM Mimarisi: Durum Tanımları (`enum`) ve Geçiş Mantığı",
        aim: "Sonlu Durum Makinesi kavramını kavrar; `enum State { IDLE, LINE, OBSTACLE, BLUETOOTH }` yapısıyla durumları ve butonla mod geçişini kodlar.",
        outcomes: [
          "RK.7.29.1.1 Sonlu Durum Makinesi (FSM) mimarisinin robotikteki önemini açıklar.",
          "RK.7.29.1.2 `enum` veri tipiyle sistem durumlarını tanımlar.",
          "RK.7.29.1.3 `switch-case` yapısını kullanarak aktif duruma göre ilgili fonksiyonu çağırır.",
          "RK.7.29.1.4 Takt butona her basıldığında modu bir sonrakine geçiren durum geçiş kodunu yazar.",
        ],
        materials: ["DENEYAP Kart", "I2C LCD Ekran", "RGB LED", "Takt Buton", "Direnç"],
        prep: ["Tahtaya Durum Diyagramı (State Diagram) çiz: Daireler durumları, oklar geçiş şartlarını göstersin."],
        safety: ["Durum geçişinde motorların anlık sıfırlanmasını sağla."],
        flow: [
          F(5, "açılış", "Spagetti Kod Çıkmazı", "Her şeyi tek `loop` içine yazarsak kod kilitlenir. Çözüm: Durum Makinesi!", "Örneği dinler."),
          F(8, "anlatım", "State Diagram ve Enum", "Durum 1: Bekleme (Sarı), Durum 2: Çizgi (Yeşil), Durum 3: Engel (Kırmızı), Durum 4: BLE (Mavi). Butonla geçiş.", "Şemayı çizer."),
          F(17, "uygulama", "Durum Seçici Kodlama", "Butona bas, RGB LED renk değiştirsin, LCD ekranda aktif mod yazılsın.", "Modları butonla değiştirir."),
          F(6, "paylaşım", "Akran Kontrolü", "Butona basınca sekme (debounce) sorunu oluyor mu?", "Çözümü dener."),
          F(4, "değerlendirme", "Değerlendirme", "FSM neden kodun okunabilirliğini artırır?", "Açıklar."),
        ],
        keyPoints: [
          "`enum` (numaralandırma) C++ dilinde okunabilir durum adları tanımlar.",
          "Her durum kendi bağımsız alt fonksiyonunu (`runLineFollower()`, `runObstacleAvoid()`) çağırır.",
          "Mod geçişlerinde önceki durumun motor komutları `stopMotors()` ile sıfırlanmalıdır.",
        ],
        steps: [
          "Durum `enum State { MOD_BEKLE, MOD_CIZGI, MOD_ENGEL, MOD_BLE };` tanımla.",
          "Buton girişini pull-down oku.",
          "`switch (aktifMod)` yapısını kur.",
          "I2C LCD ve RGB LED ile aktif modu göster.",
        ],
        code: {
          title: "Sonlu Durum Makinesi Mod Seçici İskeleti",
          lang: "cpp",
          code: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);
const int BTN_MOD = 18;
const int LED_R = 23;
const int LED_G = 22;
const int LED_B = 21;

enum RobotMod { BEKLE, CIZGI_IZLE, ENGEL_KAC, BLUETOOTH_RC };
RobotMod aktifMod = BEKLE;

void setRgb(bool r, bool g, bool b) {
  digitalWrite(LED_R, r); digitalWrite(LED_G, g); digitalWrite(LED_B, b);
}

void setup() {
  pinMode(BTN_MOD, INPUT_PULLUP);
  pinMode(LED_R, OUTPUT); pinMode(LED_G, OUTPUT); pinMode(LED_B, OUTPUT);
  Wire.begin(); lcd.init(); lcd.backlight();
  gosterMod();
}

void gosterMod() {
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("AKTIF ROBOT MODU:");
  lcd.setCursor(0, 1);
  switch (aktifMod) {
    case BEKLE:
      lcd.print("[0] BEKLEMEDE"); setRgb(1, 1, 0); break;
    case CIZGI_IZLE:
      lcd.print("[1] CIZGI TAKIP"); setRgb(0, 1, 0); break;
    case ENGEL_KAC:
      lcd.print("[2] ENGEL KACAN"); setRgb(1, 0, 0); break;
    case BLUETOOTH_RC:
      lcd.print("[3] BLUETOOTH RC"); setRgb(0, 0, 1); break;
  }
}

void loop() {
  if (digitalRead(BTN_MOD) == LOW) {
    delay(200); // debounce
    aktifMod = (RobotMod)((aktifMod + 1) % 4);
    gosterMod();
  }
}`,
          notes: "Butona her basıldığında mod sırayla döner ve RGB LED ile ekran güncellenir.",
        },
        wiring: {
          title: "FSM Menü Butonu ve RGB LED Bağlantısı",
          items: [
            "Mod Butonu -> D18 (Dahili PULLUP)",
            "RGB LED Kırmızı -> D23 (220Ω)",
            "RGB LED Yeşil -> D22 (220Ω)",
            "RGB LED Mavi -> D21 (220Ω)",
            "I2C LCD -> SDA/SCL",
          ],
        },
        troubleshooting: [
          {
            problem: "Butona bir kez basınca mod 2-3 adım birden atlıyor.",
            cause: "Buton arkı (bounce) nedeniyle birden fazla tetikleme oluşuyor.",
            fix: "`delay(200);` veya donanımsal 100nF kondansatör ekle.",
          },
        ],
        exitTicket: ["Robotun 4 durumu nelerdir?", "FSM yapısında `switch-case` ne işe yarar?"],
        support: "Mod sayısını 2'ye (Çizgi ve Engel) indirgeyerek sadeleştir.",
        extension: "Mod geçişinde pasif buzzer ile mod numarası kadar bip sesi çaldır.",
        ortaokul: "Durumları renklerle (Sarı, Yeşil, Kırmızı, Mavi) eşleştir.",
        lise: "Durum geçişlerini nesne yönelimli (C++ class) durum kalıbı (State Pattern) ile modelledirt.",
        homework: "Evde FSM diyagramını renkli kalemlerle A4 kağıda çiz.",
        tips: ["Öğrencilere çamaşır makinesi veya trafik lambası gibi günlük FSM örnekleri verin."],
        altArduino: "Arduino Uno üzerinde aynı C++ enum ve switch yapısı çalışır.",
        altMbot: "mBlock değişken ve çoklu 'eğer' bloklarıyla mod geçişi.",
        altSpike: "Spike Prime butonuna basıldığında durum değişkenini artırma.",
      }),
      H({
        hour: 2,
        title: "Çoklu Görev Entegrasyonu ve Sahada Mod Değiştirme",
        aim: "Otonom çizgi izleme, radar taramalı engelden kaçma ve Bluetooth kumanda fonksiyonlarını tek bir yazılımda birleştirir ve sahada test eder.",
        outcomes: [
          "RK.7.29.2.1 Daha önce yazılan otonom fonksiyonları FSM durumlarının içine yerleştirir.",
          "RK.7.29.2.2 Mod değişim anında motorları durdurarak robotun beklenmedik hareket yapmasını engeller.",
          "RK.7.29.2.3 Robotu çizgi pistine koyup 'Çizgi' modunu, labirente koyup 'Engel' modunu seçerek çalıştırır.",
          "RK.7.29.2.4 Telefondan komut geldiğinde otomatik olarak 'Bluetooth RC' moduna geçişi sağlar.",
        ],
        materials: ["Tam donanımlı 4WD Robot", "18650 Piller", "Çizgi Pisti", "Engel Parkuru", "Akıllı Telefon"],
        prep: ["Salonda iki ayrı istasyon kur: 1. İstasyon Çizgi Pisti, 2. İstasyon Engel Parkuru."],
        safety: ["Pist değiştirirken robotu kapatarak taşıyın."],
        flow: [
          F(5, "açılış", "Hepsi Bir Arada Robot", "Artık her görev için yeni kod yüklemeyeceğiz; robotumuz tüm görevleri hafızasında tutacak.", "Heyecanla dinler."),
          F(8, "anlatım", "Entegrasyon İpuçları", "Fonksiyonların birbirini engellememesi için global değişkenlerin yönetimi ve mod geçiş emniyeti.", "Not alır."),
          F(17, "uygulama", "Pistte Çoklu Görev Testi", "Robotu çizgiye koy, butona bas -> izlesin. Labirente koy, butona bas -> kaçsın. Telefona dokun -> kumandaya geçsin.", "Büyük entegrasyon testini yapar."),
          F(6, "paylaşım", "Karşılaşılan Sorunlar", "Mod geçerken hangi sensör karışıklığı oldu? Nasıl çözüldü?", "Deneyim paylaşır."),
          F(4, "değerlendirme", "Rubrik Değerlendirmesi", "FSM yazılım rubriğine göre takımları puanla.", "Sonuçları kaydeder."),
        ],
        keyPoints: [
          "Çoklu görev yazılımı sayesinde sergide tek bir robotla jüriye hem çizgi izleme, hem radarla kaçma hem de telefonla kontrol gösterilebilir.",
          "Kodun içine gömülü `delay()` süreleri mod geçiş butonunun tepki vermesini yavaşlatır; non-blocking kod tercih edilmelidir.",
        ],
        steps: [
          "Önceki haftaların fonksiyonlarını (`gorevCizgi()`, `gorevEngel()`, `gorevBLE()`) projeye ekle.",
          "Durum makinesi döngüsünü bağla.",
          "Pistlerde arka arkaya mod testlerini gerçekleştir.",
        ],
        code: {
          title: "FSM Entegre Çok Fonksiyonlu Robot Ana Döngüsü",
          lang: "cpp",
          code: `// ... Pin ve degisken tanimlari ...
void loop() {
  // 1. Mod secim butonu denetimi
  if (digitalRead(BTN_MOD) == LOW) {
    delay(200);
    stopMotors();
    aktifMod = (RobotMod)((aktifMod + 1) % 4);
    gosterMod();
  }
  
  // 2. Aktif duruma gore gorevi calistir
  switch (aktifMod) {
    case BEKLE:
      stopMotors();
      break;
    case CIZGI_IZLE:
      gorevCizgiIzle();
      break;
    case ENGEL_KAC:
      gorevEngeldenKac();
      break;
    case BLUETOOTH_RC:
      gorevBluetoothRC();
      break;
  }
}`,
          notes: "Her mod kendi fonksiyonunu çağırır, mod geçişinde motorlar güvenlik için durdurulur.",
        },
        wiring: {
          title: "Tüm Sistem Bütünleşik Kablolama",
          items: [
            "Tüm sensörler (HC-SR04, Çizgi, I2C LCD, Buton, Motor Sürücü, Servo, RGB LED)",
            "Ortak GND ve 18650 Li-ion 7.4V anahtarlı besleme",
          ],
        },
        troubleshooting: [
          {
            problem: "Mod geçişinde robot eski yöne doğru kontrolsüz hareket ediyor.",
            cause: "Önceki durumdan kalan motor değişkenleri sıfırlanmamıştır.",
            fix: "Mod geçiş kodunun içine hemen `stopMotors();` çağrısı ekle.",
          },
        ],
        exitTicket: ["Tek yazılımda çoklu görev çalıştırmanın sergideki avantajı nedir?", "Robot kilitlenirse ilk ne yapılır?"],
        support: "Zorlanan takımlara fonksiyonları adım adım eklet.",
        extension: "Ekranda modla birlikte geçen süreyi gösteren kronometre eklet.",
        ortaokul: "İki mod (Çizgi ve Engel) arasında geçiş yaptır.",
        lise: "Bluetooth üzerinden de FSM mod değiştirme komutu ('M1', 'M2') tanımlat.",
        homework: "Yıl sonu projesinde FSM'ye hangi özel durumu ekleyeceğini planla.",
        tips: ["Pillerin voltaj seviyesini sık sık kontrol edin."],
        altArduino: "Arduino Uno ile aynı çok fonksiyonlu FSM mantığı.",
        altMbot: "mBot üzerinde mod tuşu ile çizgi/engel geçişi.",
        altSpike: "Spike Prime sol/sağ butonlarıyla program modunu değiştirme.",
      }),
    ],
  },

  // HAFTA 30: İleri Çevre Sensörleri ve IoT Entegrasyonu
  {
    week: 30,
    month: "Mayıs",
    dates: "17–21 Mayıs 2027",
    semester: 2,
    unit: "İleri Çevre Sensörleri ve IoT Füzyonu (DHT11 & PIR)",
    title: "DHT11 Sıcaklık-Nem ve PIR Hareket Sensörleri ile Akıllı İstasyon",
    why: "Robotik sadece hareket eden araçlar değil; çevresini algılayan akıllı sistemlerdir. DHT11 ile sıcaklık/nem, HC-SR501 PIR ile insan hareketi algılanarak akıllı sera, afet erken uyarı ve güvenlik istasyonu projeleri inşa edilir.",
    prior: ["I2C LCD kullanımı", "Analog ve dijital okuma", "FSM mantığı"],
    weekGoal: "DHT11 ve PIR sensörlerini DENEYAP Kart'a bağlar; ortam sıcaklığını, nem oranını ve insan hareketini ölçüp LCD ekranda ve BLE terminalinde gösteren akıllı çevre istasyonunu kodlar.",
    hours: [
      H({
        hour: 1,
        title: "DHT11 Dijital Çevre Sensörü ve HC-SR501 PIR Dedektörü",
        aim: "DHT11 sıcaklık-nem sensörünü tek hat dijital protokolüyle okur; HC-SR501 PIR sensörünün zaman ve hassasiyet ayarlarını yaparak hareket algılar.",
        outcomes: [
          "RK.7.30.1.1 DHT11 sensörünün tek hatlı (Single-Bus) dijital haberleşme prensibini açıklar.",
          "RK.7.30.1.2 HC-SR501 PIR pasif kızılötesi sensörünün trimpot ayarlarını (süre ve mesafe) yapar.",
          "RK.7.30.1.3 Ortam sıcaklık (°C) ve bağıl nem (%) değerlerini Serial ve LCD ekranda görüntüler.",
          "RK.7.30.1.4 Hareket algılandığında buzzer ve kırmızı LED ile alarm durumuna geçer.",
        ],
        materials: ["DENEYAP Kart", "DHT11 Sensör Modülü", "HC-SR501 PIR Sensörü", "I2C LCD", "Buzzer", "Jumperlar"],
        prep: ["DHT sensor library kütüphanesini kontrol et.", "PIR sensörünün ısınma süresinin (yaklaşık 30-60 saniye) normal olduğunu öğrencilere belirt."],
        safety: ["PIR sensörünün VCC/GND bacaklarını ters takmayın; sıcaklık oluşabilir."],
        flow: [
          F(5, "açılış", "Akıllı Okul ve Çevre", "Sınıfın havası havasız mı? Koridorda kimse yokken ışıklar neden açık? Akıllı sensörlerle çözelim.", "Fikir yürütür."),
          F(8, "anlatım", "Sensör Çalışma Prensibi", "DHT11 polimer kondansatör ve NTC ile nem/sıcaklık ölçer. PIR vücut ısısının yaydığı kızılötesi dalgaları mercekle odaklar.", "Not alır."),
          F(17, "uygulama", "Çevre İstasyonu Devresi", "Devreyi kur, sıcaklık/nem değerlerini ekranda göster. PIR önünden elini geçirince alarm verdir.", "Sensörü üfleyerek nem artışını gözlemler."),
          F(6, "paylaşım", "Kalibrasyon", "PIR sensörünün arkasındaki iki sarı trimpot: Biri algılama mesafesi (3-7m), diğeri çıkış süresi.", "Trimpotları tornavidayla ayarlar."),
          F(4, "değerlendirme", "Özet", "DHT11 neden analog değil dijital pinle okunur?", "Açıklar."),
        ],
        keyPoints: [
          "DHT11 dijital sensördür; içinde analog-dijital dönüştürücü barındırır ve tek kablodan 40 bitlik veri paketi yollar.",
          "PIR sensörü ilk enerji verildiğinde 30 saniye ortam kızılötesi arka planını kalibre eder; bu sürede hareket ettirilmemelidir.",
          "Sıcaklık 28°C'yi geçtiğinde fan/alarm, nem %70'i geçtiğinde havalandırma senaryoları simüle edilebilir.",
        ],
        steps: [
          "DHT11 Data pinini D4'e bağla.",
          "PIR Out pinini D13'e bağla.",
          "`DHT.h` kütüphanesiyle `readTemperature()` ve `readHumidity()` çağır.",
          "Sonuçları LCD ekrana bas.",
        ],
        code: {
          title: "DHT11 ve PIR Akıllı Çevre İstasyonu Kodu",
          lang: "cpp",
          code: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);

const int PIR_PIN = 13;
const int ALARM_LED = 23;
const int BUZZER = 19;

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(ALARM_LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  Wire.begin(); lcd.init(); lcd.backlight();
  dht.begin();
  
  lcd.setCursor(0, 0); lcd.print("CEVRE SISTEMI");
  lcd.setCursor(0, 1); lcd.print("Kalibre ediliyor");
  delay(2000);
  lcd.clear();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int hareket = digitalRead(PIR_PIN);
  
  lcd.setCursor(0, 0);
  lcd.print("Sic:"); lcd.print((int)temp); lcd.print("C Nem:%"); lcd.print((int)hum);
  
  lcd.setCursor(0, 1);
  if (hareket == HIGH) {
    lcd.print("GUVENLIK: HAREKET");
    digitalWrite(ALARM_LED, HIGH);
    tone(BUZZER, 1500, 100);
  } else {
    lcd.print("GUVENLIK: TEMIZ  ");
    digitalWrite(ALARM_LED, LOW);
  }
  delay(1000);
}`,
          notes: "DHT11 sensörü saniyede birden fazla sorgulanmamalıdır; en az 1000 ms aralık önerilir.",
        },
        wiring: {
          title: "Çevre İstasyonu Devre Bağlantısı",
          items: [
            "DHT11: VCC->3.3V/5V, GND->GND, DATA->D4",
            "PIR: VCC->5V, GND->GND, OUT->D13",
            "Buzzer -> D19, LED -> D23",
            "LCD -> SDA/SCL",
          ],
        },
        troubleshooting: [
          {
            problem: "Sıcaklık ekranda 'nan' (Not a Number) olarak çıkıyor.",
            cause: "DHT11 data bacağı temassızdır veya yanlış pine bağlanmıştır.",
            fix: "Data bacağını kontrol et, direnç modüllü model kullanıyorsan 10k pull-up direncini doğrula.",
          },
        ],
        exitTicket: ["PIR sensörü ne tür dalgaları algılar?", "DHT11 ile hangi iki değer ölçülür?"],
        support: "Önce sadece DHT11'i çalıştır, sonra PIR'ı ekle.",
        extension: "Sıcaklık ve nem değerini Bluetooth üzerinden cep telefonuna gönder.",
        ortaokul: "Hareket algılanınca ekranda 'HOS GELDINIZ' yazdır.",
        lise: "Konfor indeksi (Heat Index) hesaplayan formülü koda eklet.",
        homework: "Akıllı sera için otomatik sulama ve havalandırma akış şeması çiz.",
        tips: ["PIR sensörünün önüne elinizi koyup bekleyin, sonra çekip hareket farkını görün."],
        altArduino: "Arduino Uno ile aynı kütüphanelerle birebir uyumlu.",
        altMbot: "mBot sıcaklık sensörü eklentisi.",
        altSpike: "Spike Prime renk ve kuvvet sensörü çevre deneyi.",
      }),
      H({
        hour: 2,
        title: "Tematik Sergi Projeleri: Akıllı Sera, Afet İstasyonu ve Devriye",
        aim: "Takımlar sergi projelerini belirler; çevre sensörleri ve robot şasesini harmanlayan tematik proje mimarisini kurar.",
        outcomes: [
          "RK.7.30.2.1 4 ana temadan (Akıllı Sera, Güneş Takip İstasyonu, Otonom Kurtarma, Akıllı Okul Güvenliği) birini seçer.",
          "RK.7.30.2.2 Projenin girdi-işlem-çıktı blok diyagramını çizer.",
          "RK.7.30.2.3 Gerekli ek donanımları (LCD, PIR, DHT11, Servo, Şase) bir araya getirir.",
          "RK.7.30.2.4 Takım içi rol dağılımını (Mekanik, Yazılım, Dokümantasyon, Test) yazılı taahhüde bağlar.",
        ],
        materials: ["A3 Proje Kanvası", "Tüm donanım kitleri", "Renkli kalemler"],
        prep: ["4 temanın örnek mimari şemalarını duvara as."],
        safety: ["Atölye aletlerini masada emniyetli konumlandır."],
        flow: [
          F(5, "açılış", "Sergiye 5 Hafta Kaldı!", "Yıl sonu bilim şenliğinde masanızda ne duracak? Bugün projenin temelini atıyoruz.", "Heyecanla takımına döner."),
          F(8, "anlatım", "4 Büyük Tema", "1) Akıllı Tarım & Sera, 2) Güneş Takipli Enerji, 3) Afet Arama-Kurtarma Robotu, 4) Akıllı Okul Devriyesi.", "Takımca tartışırlar."),
          F(17, "uygulama", "Proje Kanvası Doldurma", "Takım seçimini yapar, sistem şemasını çizer, hangi sensör ve aktüatörlerin kullanılacağını listeler.", "Kanvası hazırlar ve onay alır."),
          F(6, "paylaşım", "30 Saniyelik Tanıtım", "Her takım projesinin adını ve amacını tek cümleyle söyler.", "Sunum yapar."),
          F(4, "değerlendirme", "Öğretmen Onay Kapısı", "Proje uygulanabilir mi? Malzeme yeterli mi? Kontrol et.", "Onayı alır."),
        ],
        keyPoints: [
          "Projenin özgünlüğü kadar çalışabilirlik ve dayanıklılık puanı belirler.",
          "Mevcut 30 kalem malzeme listesi tüm bu temaları eksiksiz destekleyecek şekilde seçilmiştir.",
        ],
        steps: [
          "Temayı seç.",
          "Blok diyagramı çiz.",
          "Kullanılacak malzemeleri işaretle.",
          "Haftalık teslim çizelgesini imzala.",
        ],
        exitTicket: ["Takımınızın seçtiği proje nedir?", "Bu projede hangi 2 sensör ve hangi 2 eyleyici kullanılacak?"],
        support: "Kararsız kalan takıma doğrudan Otonom Kurtarma Robotu temasını ver.",
        extension: "Projeye web arayüzü veya mobil bildirim özelliği eklet.",
        ortaokul: "Proje adını ve sloganını belirlet.",
        lise: "Mühendislik kısıtlarını (enerji tüketimi, yanıt süresi) sayısal tanımlat.",
        homework: "Proje için 3 boyutlu taslak veya karton maket planı hazırla.",
        tips: ["Her takımın malzeme kutusunu etiketleyip ayırın."],
        altArduino: "Arduino Uno tabanlı tematik projeler.",
        altMbot: "mBot gövdesi üzerine ek sensör montajı.",
        altSpike: "Spike Prime ile akıllı fabrika/tarım modelleri.",
      }),
    ],
  },

  // HAFTA 31: Takım İnovasyon Projeleri: Mekanik ve Donanım Entegrasyonu
  {
    week: 31,
    month: "Mayıs",
    dates: "24–28 Mayıs 2027",
    semester: 2,
    unit: "Takım İnovasyon Projeleri: Mekanik & Donanım Entegrasyonu",
    title: "Özgün Tematik Robotik ve IoT Proje Prototipleme",
    why: "Kağıt üzerindeki fikirlerin somut bir robota veya istasyona dönüşmesi montaj disiplini gerektirir. Kablo bağları, çift taraflı köpük bant ve rijit bağlantılar ile sistem sergi dayanıklılığına kavuşturulur.",
    prior: ["Tematik proje seçimi", "4WD şase montajı", "Sensör devreleri"],
    weekGoal: "Takımlar seçtikleri özgün projenin mekanik gövdesini kurar; LCD ekranı, sensörleri, motor sürücüyü ve anahtarlı pil kutusunu gövdeye rijit şekilde sabitler.",
    hours: [
      H({
        hour: 1,
        title: "Gövde ve Mekanik Parçaların Rijit Montajı",
        aim: "Proje türüne göre şase veya maket gövde üzerine LCD ekran, servo radar kafası ve sensör braketlerini mekanik olarak sabitler.",
        outcomes: [
          "RK.7.31.1.1 Titreşim ve darbeye dayanıklı montaj tekniklerini (köpük bant, cırt cırt, vida) uygular.",
          "RK.7.31.1.2 SG90 servo üzerine HC-SR04 montaj braketini takarak rijit radar kafası oluşturur.",
          "RK.7.31.1.3 I2C LCD ekranı robotun veya istasyonun görünür ön paneline monte eder.",
          "RK.7.31.1.4 Ağırlık merkezini dengeleyerek robotun devrilmesini engeller.",
        ],
        materials: ["4WD Şase / Proje Gövdesi", "SG90 Radar Braketi", "Çift taraflı köpük bant", "Cırt cırt", "Tornavida"],
        prep: ["Mekanik montaj sarf paketlerini masalara dağıt."],
        safety: ["Vida sıkarken aşırı güç uygulayıp akrilik şaseyi çatlatmayın."],
        flow: [
          F(5, "açılış", "Sallanan Parça Düşer", "Sergide yürürken sensörü düşen robot sıfır alır. Dayanıklı montaj nasıl yapılır?", "Şaseyi inceler."),
          F(8, "anlatım", "Mekanik Sabitleme İlkeleri", "Ağır piller alta, sensörler öne, ekran üste. Cırt cırt ile pil değişimi kolaylaşır.", "İlkeleri anlar."),
          F(17, "uygulama", "Mekanik Montaj", "Braketleri tak, LCD ekranı ve servoyu sabitle, pil kutusunu cırt cırtla yerleştir.", "Montajı tamamlar."),
          F(6, "paylaşım", "Sallantı Testi", "Robotu hafifçe salla; ses çıkaran veya oynayan parça var mı?", "Kontrol eder."),
          F(4, "değerlendirme", "Onay", "Mekanik kontrol listesini imzalat.", "Onay alır."),
        ],
        keyPoints: [
          "Pil yuvasını cırt cırt bantla tutturmak, pilleri şarj etmek için çıkarırken kolaylık sağlar.",
          "Ultrasonik sensörün gövdesi eğik durursa yeri veya tavanı algılayıp yanlış ölçüm yapar; braket tam yatay olmalıdır.",
        ],
        steps: [
          "Servo miline ultrasonik braketi vidala.",
          "LCD ekranı şasenin üst katına çift taraflı bantla yapıştır.",
          "2'li anahtarlı 18650 pil kutusunu şase tabanına cırt cırtla sabitle.",
          "Gövde rijitlik testini yap.",
        ],
        troubleshooting: [
          {
            problem: "Servo dönerken ultrasonik sensör sallanıyor veya kablosu geriliyor.",
            cause: "Kabloya hareket payı (loop) bırakılmamıştır.",
            fix: "Sensör kablosuna 5 cm esneme payı bırakarak kablo bağıyla tuttur.",
          },
        ],
        exitTicket: ["Piller neden robotun alt merkezine yerleştirilir?", "Braket neden gereklidir?"],
        support: "Montajda zorlanan öğrencilere öğretmen modelleme yapsın.",
        extension: "Gövdeye 3D yazıcıdan basılmış özel tutucu veya koruma tamponu tasarlat.",
        ortaokul: "Tüm parçaları çift taraflı bantla sağlamlaştır.",
        lise: "Gövde statik ağırlık dağılımı hesabını incelet.",
        homework: "Projenin kablolama bağlantı şemasını deftere çiz.",
        tips: ["Tornavidaların uçlarının vidalarla uyumlu olduğundan emin olun."],
        altArduino: "Arduino montaj kiti ile aynı süreç.",
        altMbot: "mBot mekanik eklenti kolları.",
        altSpike: "Spike Prime kiriş ve pinlerle mekanizma kurulumu.",
      }),
      H({
        hour: 2,
        title: "Kablo Disiplini, Kelepçeleme ve Güç Devresi Bağlantısı",
        aim: "Kablo karmaşasını plastik kablo bağları (kelepçe) ve spiral boru ile toplar; 18650 anahtarlı pil kutusunu sürücüye bağlayarak güç emniyetini sağlar.",
        outcomes: [
          "RK.7.31.2.1 Kablo disiplini ilkelerini (renk kodu, gerilme payı, demetleme) eksiksiz uygular.",
          "RK.7.31.2.2 Plastik kablo bağları ile sarkan kabloları şase içine toplar.",
          "RK.7.31.2.3 2'li 18650 anahtarlı pil kutusunun artı ve eksi kutuplarını motor sürücü klemensine vidalar.",
          "RK.7.31.2.4 Anahtarı açıp kapayarak tüm sistemin tek tuşla güvenle enerjilendiğini doğrular.",
        ],
        materials: ["Plastik kablo bağları (cırt kelepçe)", "Yan keski / makas", "2'li 18650 Pil Yuvası", "DENEYAP Kart", "Tornavida"],
        prep: ["Kablo bağlarını her masaya 10'ar adet dağıt."],
        safety: ["Kablo bağlarının fazlalığını keserken telleri kesmemeye çok dikkat edin."],
        flow: [
          F(5, "açılış", "Kablo Çorbası", "Tekerleğe dolanan bir tek kablo robotu yakabilir. Temiz kablolama mühendisliğin imzasıdır.", "Kendi kablolarına bakar."),
          F(8, "anlatım", "Demetleme Tekniği", "Güç kabloları ayrı, sinyal kabloları ayrı demetlenir. Fazlalıklar arkadan plastik kelepçeyle kilitlenir.", "Gösteriyi izler."),
          F(17, "uygulama", "Kablo Toplama ve Güç Bağlantısı", "Tüm hatları bağla, kelepçele, fazlalıkları kes. Pil kutusunu sürücüye bağla.", "Kabloları jilet gibi düzenler."),
          F(6, "paylaşım", "Görsel Denetim", "En temiz kablolamaya sahip robotu sınıfa göster.", "Akran kablolamasını inceler."),
          F(4, "değerlendirme", "Güvenlik Kontrolü", "Kısa devre var mı? Multimetreyle kontrol et.", "Onay alır."),
        ],
        keyPoints: [
          "Dönen tekerleklerin ve hareketli servonun yakınına sarkan kablo bırakılmaz.",
          "Anahtarlı pil kutusu sayesinde yazılım güncellerken motorların kazara çalışması tek hareketle önlenir.",
        ],
        steps: [
          "Sinyal ve güç kablolarını grupla.",
          "Plastik kelepçeleri tak ve sık.",
          "Kelepçe uçlarını sıfıra yakın kes.",
          "Pil kablolarını motor sürücü Vin ve GND klemensine vidala.",
        ],
        troubleshooting: [
          {
            problem: "Kablo bağı çok sıkıldığı için içindeki bakır tel koptu.",
            cause: "Aşırı sıkma.",
            fix: "Kabloyu multimetre ile bip modunda test et, kopmuşsa yenisiyle değiştir.",
          },
        ],
        exitTicket: ["Kablo bağının ucu neden kesilir?", "Anahtar neden güç hattının başında olmalıdır?"],
        support: "Kablo bağı kesiminde öğretmen yardımcı olsun.",
        extension: "Kabloların üzerine etiket (VCC, GND, SDA, TRIG) yapıştırttır.",
        ortaokul: "Renklerine göre kabloları gruplattır.",
        lise: "Endüstriyel pano kablolama standartları (kablo kanalı, yüksük) hakkında bilgi ver.",
        homework: "Robotun son halinin üstten ve yandan fotoğrafını çekip dokümantasyon klasörüne ekle.",
        tips: ["Kesilen kablo bağı uçlarının sivri kalmamasına dikkat edin."],
        altArduino: "Arduino şasesi üzerinde kablo bağı düzeni.",
        altMbot: "mBot kablo tutucuları.",
        altSpike: "Spike kablo klipsleri.",
      }),
    ],
  },

  // HAFTA 32: Güç Yönetimi, Filtreleme ve Donanım Hata Ayıklama
  {
    week: 32,
    month: "Mayıs / Haziran",
    dates: "31 Mayıs–4 Haziran 2027",
    semester: 2,
    unit: "Güç Yönetimi, Filtreleme ve Saha Test Protokolü",
    title: "18650 Güç Kararlılığı, Filtreleme ve Elektriksel Teşhis",
    why: "Robotik projelerinde arızaların %80'i yazılımdan değil, yetersiz besleme ve motor gürültüsünden (parazit) kaynaklanır. 18650 pillerin voltaj düşümü (brownout) ve filtreleme teknikleri öğrenilerek robotun reset atması engellenir.",
    prior: ["Ohm kanunu", "Motor sürücü bağlantısı", "Multimetre kullanımı"],
    weekGoal: "18650 pil voltajını yük altında ölçer; motor parazitlerini kondansatör filtreleme ile önler; multimetre ile elektriksel hata teşhis protokolü uygular.",
    hours: [
      H({
        hour: 1,
        title: "Li-ion Voltaj Düşümü (Brownout) ve Kondansatör Filtreleme",
        aim: "Motorlar kalkış anında yüksek akım çektiğinde pil voltajındaki ani düşüşü multimetre ile gözlemler; besleme hattına filtre kondansatörü ekleyerek kart resetlerini önler.",
        outcomes: [
          "RK.7.32.1.1 'Brownout Reset' (düşük voltaj resetlenmesi) kavramını ve motor kalkış akımı ilişkisini açıklar.",
          "RK.7.32.1.2 18650 pillerin boşta ve yük altındaki voltajını multimetreyle ölçer.",
          "RK.7.32.1.3 Motor sürücü besleme hattına paralel elektrolitik kondansatör (100–470 µF) ekleyerek parazitleri sönümler.",
          "RK.7.32.1.4 Batarya voltajı 6.5V altına düştüğünde pilleri şarj istasyonuna yönlendirir.",
        ],
        materials: ["Multimetre", "18650 Piller", "Filtre Kondansatörü (100–470 µF)", "4'lü Şarj Cihazı", "Robot"],
        prep: ["Atölyedeki multimetreleri DC 20V kademesine hazırla.", "Boş ve dolu pil örneklerini göster."],
        safety: ["Kondansatörün kutuplarına (+/-) çok dikkat edin; ters bağlantıda patlayabilir."],
        flow: [
          F(5, "açılış", "Gizemli Reset", "Robot tam kalkış yaparken aniden durup yeniden başlıyor! Neden? Yazılım hatası mı, yoksa elektrik mi?", "Fikir üretir."),
          F(8, "anlatım", "Kalkış Akımı ve Filtreleme", "Motorlar dururken aniden 2 Amper çekebilir. Bu pil voltajını 7V'tan 3V'a düşürür ve beyin reset atar. Kondansatör minik bir su deposu gibi aradaki boşluğu doldurur.", "Analojiyi anlar."),
          F(17, "uygulama", "Multimetre ile Voltaj Testi", "Tekerlekleri havaya kaldır, gaza bas, ekrandaki voltaj değişimini multimetreyle kaydet. Filtre kondansatörünü bağla.", "Voltaj düşümünü ölçer ve kaydeder."),
          F(6, "paylaşım", "Ölçüm Sonuçları", "Hangi takımın pili zayıf? Kimin şarj olması gerekiyor?", "Verileri kıyaslar."),
          F(4, "değerlendirme", "Özet", "Brownout reset nedir?", "Deftere yazar."),
        ],
        keyPoints: [
          "18650 piller tam doluyken hücre başına 4.2V (seri ikisi 8.4V), nominal 3.7V (7.4V), boşken 3.0V (6.0V) değerindedir.",
          "7.0V altındaki batarya ile güvenilir motor sürüşü yapılamaz; mikrodenetleyici resetlenir.",
          "Besleme hattına konulan 100-470 µF elektrolitik kondansatör voltaj dalgalanmalarını filtreler.",
        ],
        steps: [
          "Multimetreyi DC 20V konumuna al.",
          "Boşta pil voltajını ölç (ör: 7.8V).",
          "Motorları tam güç çalıştırıp yükteki voltajı ölç (ör: 7.1V).",
          "Kondansatörü kutuplarına dikkat ederek sürücü klemensine paralel bağla.",
        ],
        troubleshooting: [
          {
            problem: "Motorlar dönmeye başladığı anda DENEYAP Kart'ın ışıkları sönüp yeniden yanıyor.",
            cause: "Pil voltajı düşmüş ve kart Brownout Reset korumasına girmiştir.",
            fix: "Pilleri çıkarıp 4'lü şarj istasyonuna koy; filtre kondansatörünü kontrol et.",
          },
        ],
        exitTicket: ["18650 iki pilin seri bağlı tam dolu voltajı kaçtır?", "Kondansatörün uzun bacağı hangi kutuptur?"],
        support: "Öğrencilere multimetre problarını güvenli tutma tekniğini göster.",
        extension: "DENEYAP Kart'ın analog pininden gerilim bölücü dirençle pil voltajını doğrudan LCD ekranda % olarak göster.",
        ortaokul: "Voltajı ölçüp pilin dolu veya boş olduğunu deftere yazsın.",
        lise: "Ohm kanunu ile motorun kalkış anındaki iç direncini ve akımını hesaplat.",
        homework: "Li-ion pillerin ömrünü uzatmak için dikkat edilmesi gereken 3 kuralı araştır.",
        tips: ["Şarj cihazının başında öğrencileri yalnız bırakmayın."],
        altArduino: "Arduino Uno 5V regülatör çökmesi önleme filtre devresi.",
        altMbot: "mBot 3.7V lityum pil seviye göstergesi.",
        altSpike: "Spike Prime batarya yüzde bloğu ile durum denetimi.",
      }),
      H({
        hour: 2,
        title: "Donanım Hata Teşhis Protokolü ve Hata Günlüğü (Debug Log)",
        aim: "Devrede oluşan elektriksel temas, gevşek kablo ve kısa devre sorunlarını sistematik bir hata teşhis matrisiyle (Debugging Checklist) çözer ve hata günlüğü tutar.",
        outcomes: [
          "RK.7.32.2.1 Multimetrenin sesli süreklilik (bip/kısa devre) modunu kullanarak kablo kopukluklarını bulur.",
          "RK.7.32.2.2 Donanım Hata Teşhis Protokolü adımlarını (Güç -> GND -> Sinyal -> Kod) sırayla uygular.",
          "RK.7.32.2.3 Karşılaşılan arızaları, nedenlerini ve çözümlerini Hata Günlüğü (Debug Log) tablosuna kaydeder.",
          "RK.7.32.2.4 Tüm sistemin hatasız çalıştığını öğretmen kontrol listesiyle onaylatır.",
        ],
        materials: ["Multimetre", "Yedek Jumper Kablolar", "Hata Teşhis Formu", "Robotik Sistem"],
        prep: ["Tahtaya 4 adımlı Hata Teşhis Protokolü piramidini çiz."],
        safety: ["Süreklilik (bip) testi yapılırken devrenin pili mutlaka kapalı olmalıdır."],
        flow: [
          F(5, "açılış", "Mühendis Hata Arar", "Gerçek mühendis 'çalışmıyor' demez; 'hangi hatta arıza var?' diye test eder.", "Piramidi inceler."),
          F(8, "anlatım", "Teşhis Piramidi", "1. Güç var mı? 2. GND ortak mı? 3. Sinyal kablosu sağlam mı? 4. Yazılım pini doğru mu?", "Adımları ezberler."),
          F(17, "uygulama", "Bip Modu ile Hat Kontrolü", "Enerjiyi kes, multimetreyi ses moduna al. Tüm GND ve VCC hatlarını baştan sona öttürerek sına.", "Kopuk kabloyu tespit edip değiştirir."),
          F(6, "paylaşım", "Hata Günlüğü Kayıtları", "Bugün bulunan en ilginç arızayı sınıfa anlat.", "Deneyimini aktarır."),
          F(4, "değerlendirme", "Onay Kapısı", "Sistem yeşil ışık aldı mı? İmzala.", "Formu teslim eder."),
        ],
        keyPoints: [
          "Enerji varken süreklilik (bip) ölçümü yapılmaz; multimetrenin sigortası atabilir.",
          "Ortak GND eksikliği sensörlerin rastgele saçma değerler üretmesine yol açar.",
        ],
        steps: [
          "Anahtarı kapat, USB'yi çek.",
          "Multimetreyi diyot/bip moduna al.",
          "Tüm GND hatlarının ortak olduğunu öttürerek doğrula.",
          "Sensör sinyal kablolarının breadboard'a tam oturduğunu kontrol et.",
          "Bulunan hataları forma kaydet.",
        ],
        troubleshooting: [
          {
            problem: "Multimetre iki ucu değdirince bip sesi vermiyor.",
            cause: "Prob kabloları COM ve V/Ω girişlerine doğru takılmamış veya prob ucu kirlidir.",
            fix: "Siyah probu COM, kırmızı probu V/Ω girişine tak; uçları zımparala/temizle.",
          },
        ],
        exitTicket: ["Hata teşhisinde ilk bakılan adım nedir?", "Süreklilik testi yaparken devre enerjili mi olmalıdır?"],
        support: "Takımlara arızalı kabloyu multimetreyle nasıl bulacaklarını birebir göster.",
        extension: "Devreye acil durum stop butonu ekle.",
        ortaokul: "Bip sesini duyup sağlam kabloları kenara ayırsın.",
        lise: "Gerilim düşümü analiziyle breadboard ray direncinin etkisini tartış.",
        homework: "Bugün düzelttiğiniz 2 arızanın çözüm hikayesini deftere yaz.",
        tips: ["Multimetre pillerinin sağlam olduğundan emin olun."],
        altArduino: "Arduino devrelerinde süreklilik denetimi.",
        altMbot: "mBot RJ25 kablo testi.",
        altSpike: "Spike port teşhis ekranı.",
      }),
    ],
  },

  // HAFTA 33: Standart Saha Test Protokolü ve İyileştirme
  {
    week: 33,
    month: "Haziran",
    dates: "7–11 Haziran 2027",
    semester: 2,
    unit: "Saha Test Protokolü ve İyileştirme Döngüsü",
    title: "10 Tekrarlı Standart Test Protokolü ve Performans Optimizasyonu",
    why: "Mühendislikte bir kez çalışan sistem başarılı sayılmaz; 10 denemede en az 8 kez aynı başarıyı tekrarlamalıdır. İstatistiksel veri toplama, hata oranını ölçme ve Fritzing devre şemasını dijitalleştirme becerisi kazandırılır.",
    prior: ["Donanım hata ayıklama", "FSM yazılımı", "Slalom ve engel pisti"],
    weekGoal: "10 tekrarlı standart saha test protokolü uygular; başarı yüzdesini ve süreleri hesaplar; Fritzing ile devre şemasını dijital dokümana dönüştürür.",
    hours: [
      H({
        hour: 1,
        title: "10 Tekrarlı Standart Test Protokolü ve Veri Toplama",
        aim: "Robotunu standart engel labirentine ve çizgi pistine 10 kez art arda sokar; başarı/başarısızlık verilerini tabloya işler ve başarı yüzdesini hesaplar.",
        outcomes: [
          "RK.7.33.1.1 Mühendislikte tekrarlanabilirlik (repeatability) ve güvenilirlik kavramlarını açıklar.",
          "RK.7.33.1.2 10 tekrarlı standart test protokolünü kronometre ve cetvelle uygular.",
          "RK.7.33.1.3 Başarılı deneme sayısı üzerinden yüzde başarı oranını (ör: 8/10 = %80) hesaplar.",
          "RK.7.33.1.4 Hata yapılan noktaları analiz ederek eşik mesafesi ve motor hızını optimize eder.",
        ],
        materials: ["Standart Test Pisti", "Kronometre", "Test Kayıt Formu", "Kalem", "Robot"],
        prep: ["Salondaki pisti bantla sabitle ve dış ortam ışıklarını standart seviyede tut."],
        safety: ["Pist çevresinde diğer takımların alanına müdahale etmeyin."],
        flow: [
          F(5, "açılış", "Şans mı, Mühendislik mi?", "Bir kez tesadüfen bitirmek yetmez. NASA roketleri neden defalarca test edilir?", "Güvenilirliği kavrar."),
          F(8, "anlatım", "Test Protokolü Kriterleri", "10 deneme. Kriter 1: Pistten çıkmamak, Kriter 2: Engele çarpmamak, Kriter 3: 30 saniye altında bitirmek.", "Kuralları yazar."),
          F(17, "uygulama", "10 Deneme Koşusu", "Sırayla piste çık, kronometreyi bas, her koşuyu 1 veya 0 olarak kaydet. Süreleri not al.", "10 denemeyi tamamlar."),
          F(6, "paylaşım", "Veri Analizi", "Takımların başarı oranlarını tahtada topla. Ortalama süre kaç saniye?", "Sonuçları kıyaslar."),
          F(4, "değerlendirme", "İyileştirme Planı", "Hangi parametreyi değiştirirsek %80'den %100'e çıkarız?", "Parametreyi belirler."),
        ],
        keyPoints: [
          "Pist yüzeyindeki toz ve ortam ışığı sensör okumalarını etkileyebilir; sensör temizliği protokolün ilk adımıdır.",
          "Motor hızı çok yüksekse çizgi kaçabilir; optimum hız maksimum hızdan daha değerlidir.",
        ],
        steps: [
          "Sensörleri mikrofiber bezle sil.",
          "Test formunu hazırla.",
          "10 resmi deneme koşusunu yap ve süreleri kaydet.",
          "Başarı yüzdesini ve ortalama süreyi hesapla.",
        ],
        troubleshooting: [
          {
            problem: "Robot 10 denemenin 5'inde aynı keskin virajda pistten çıkıyor.",
            cause: "Dönüş açısı yetersiz veya çizgi sensörünün okuma hızı düşüktür.",
            fix: "Dönüş yapan motorun ters motor gücünü artır veya eşik katsayısını ayarla.",
          },
        ],
        exitTicket: ["10 denemeden 9'unda başarılı olan robotun güvenilirlik yüzdesi kaçtır?", "Optimum hız nedir?"],
        support: "Test formunu doldurmakta zorlanan takımlara rehberlik et.",
        extension: "Standart sapma (standard deviation) hesabını hesap makinesiyle yaptır.",
        ortaokul: "Sadece başarılı/başarısız sayısını oranlasın.",
        lise: "Gauss dağılımı ve tolerans aralıkları hakkında konuş.",
        homework: "Test sonuçlarını sütun grafiğine dönüştür.",
        tips: ["Tüm takımlara aynı kronometre disiplinini uygulayın."],
        altArduino: "Arduino tabanlı araçta 10 deneme testi.",
        altMbot: "mBot parkur test protokolü.",
        altSpike: "Spike robot yarışma masası denemeleri.",
      }),
      H({
        hour: 2,
        title: "Fritzing ile Devre Şemasını Dijitalleştirme ve Parametre İyileştirme",
        aim: "Test sonuçlarına göre kod parametrelerini optimize eder; fiziksel devrenin Fritzing şemasını çizerek sergi dokümantasyonuna hazırlar.",
        outcomes: [
          "RK.7.33.2.1 Test verilerine dayanarak kod içindeki eşik mesafesini (ör: 15 cm -> 18 cm) günceller.",
          "RK.7.33.2.2 Fritzing veya Tinkercad Circuits üzerinde devrenin breadboard ve şematik görünümünü çizer.",
          "RK.7.33.2.3 Pin bağlantı listesini (Pinout Table) tablo halinde dokümana ekler.",
          "RK.7.33.2.4 Şema çıktısını A3 afiş için yüksek çözünürlüklü görsel (PNG/PDF) olarak dışa aktarır.",
        ],
        materials: ["Bilgisayar", "Fritzing / Tinkercad", "Test Sonuç Raporu", "Robot"],
        prep: ["Bilgisayarlarda Fritzing veya Tinkercad Circuits sınıfını hazır bulundur."],
        safety: ["Bilgisayar başında ergonomik oturuş kurallarına uy."],
        flow: [
          F(5, "açılış", "Şemasız Mühendislik Olmaz", "Robotunuzu başkası yapmak istese neye bakar? Kod yetmez, devre şeması şarttır.", "Şemanın önemini anlar."),
          F(8, "anlatım", "Fritzing Çizim Standartları", "Kırmızı=VCC, Siyah=GND, Sarı=Sinyal. Kablolar çapraz geçmez, 90 derece bükülür.", "Kuralları görür."),
          F(17, "uygulama", "Dijital Şema Çizimi", "Tinkercad/Fritzing'de parçaları yerleştir, kabloları renk standartlarıyla bağla, görseli kaydet.", "Devre şemasını tamamlar."),
          F(6, "paylaşım", "Şema Denetimi", "Akran şemasına bak: Kısa devre var mı? Kablolar okunuyor mu?", "Akran geribildirimi verir."),
          F(4, "değerlendirme", "Dışa Aktarma", "Şemayı PNG olarak proje klasörüne kaydet.", "Dosyayı teslim eder."),
        ],
        keyPoints: [
          "Düzenli bir şemada kablolar birbirinin üzerinden körlemesine geçmez; dik açılı kırılımlar tercih edilir.",
          "Fritzing şeması, sergi afişinin en dikkat çekici teknik bileşenidir.",
        ],
        steps: [
          "Fritzing/Tinkercad aç.",
          "DENEYAP Kart, LCD, Sensör ve Motor Sürücüyü ekle.",
          "Fiziksel robotundaki kabloların aynısını çiz.",
          "Görseli 'devre_semasi.png' olarak kaydet.",
        ],
        troubleshooting: [
          {
            problem: "Fritzing'de DENEYAP Kart v2 parçası bulunamıyor.",
            cause: "Özel kütüphane yüklü değildir.",
            fix: "DENEYAP resmi GitHub adresinden `.fzpz` dosyasını indirip Fritzing'e sürükle veya Uno eşdeğerini kullan.",
          },
        ],
        exitTicket: ["Devre şemasında kırmızı kablo hangi hatta çekilir?", "Şema neden sergide yer almalıdır?"],
        support: "Çizimde zorlanan takıma hazır blok şablonu ver.",
        extension: "Fritzing'de PCB (Baskı Devre) sekmesini incelet.",
        ortaokul: "Tinkercad Circuits'ta renkli kablolarla şema çizdir.",
        lise: "Eagle veya KiCAD gibi profesyonel EDA araçlarından kısaca bahset.",
        homework: "Şema görselini afiş taslağına yapıştır.",
        tips: ["Çizilen şemaların çözünürlüğünü kontrol edin, bulanık görselleri yeniden dışa aktarın."],
        altArduino: "Arduino Uno standart Fritzing kütüphanesi.",
        altMbot: "mBot bağlantı şeması görseli.",
        altSpike: "Spike Prime port haritası diyagramı.",
      }),
    ],
  },

  // HAFTA 34: Bilimsel Sergi Afişi ve Açık Kaynak Dokümantasyon
  {
    week: 34,
    month: "Haziran",
    dates: "14–18 Haziran 2027",
    semester: 2,
    unit: "Bilimsel Dokümantasyon, Proje Afişi ve Jüri Provası",
    title: "A3 Bilimsel Sergi Afişi ve GitHub Proje Dokümantasyonu",
    why: "Mühendislik ürünü sunumu ve açık kaynak dokümantasyonuyla değer kazanır. TÜBİTAK ve TEKNOFEST standartlarında bir A3 bilimsel proje afişi tasarlamak ve kodları GitHub/arşivde belgelemek öğrencilere akademik disiplin kazandırır.",
    prior: ["10 tekrarlı test verileri", "Fritzing şeması", "FSM yazılımı"],
    weekGoal: "Standart A3 bilimsel sergi posterini (Amaç, Yöntem, Blok Diyagram, Test Sonuçları, Tartışma) tasarlar; kod ve şemaları içeren proje dokümantasyon klasörünü tamamlar.",
    hours: [
      H({
        hour: 1,
        title: "TÜBİTAK/TEKNOFEST Standardında A3 Bilimsel Afiş Tasarımı",
        aim: "Projenin amacını, problem tanımını, kullanılan donanımları, test grafiklerini ve sonucunu içeren A3 bilimsel sergi posterini dijital ortamda tasarlar.",
        outcomes: [
          "RK.7.34.1.1 Bilimsel bir sergi afişinin ana bölümlerini (Özet, Problem, Yöntem, Bulgular, Sonuç) açıklar.",
          "RK.7.34.1.2 Canva, PowerPoint veya Figma üzerinde A3 ebatlı (297x420 mm) şablonu kullanır.",
          "RK.7.34.1.3 Robotun yüksek çözünürlüklü fotoğrafını ve Fritzing devre şemasını afişe yerleştirir.",
          "RK.7.34.1.4 10 denemelik test sonuçlarını içeren başarı grafiğini ve tabloyu afişe işler.",
        ],
        materials: ["Bilgisayar", "A3 Afiş Şablonu", "Proje Fotoğrafları", "Fritzing Şeması", "Test Grafikleri"],
        prep: ["Örnek başarılı TEKNOFEST/TÜBİTAK posterlerini akıllı tahtaya yansıt."],
        safety: ["Afiş içeriğinde internetten kopyala-yapıştır metin yerine öğrencinin kendi cümleleri yer almalıdır."],
        flow: [
          F(5, "açılış", "Afişin Gücü", "Jüri üyesi masanıza gelmeden önce ilk afişinizi görür. 10 saniyede projenizi anlatabilir misiniz?", "Afiş örneklerini inceler."),
          F(8, "anlatım", "Afiş Mimarisi", "Sol sütun: Problem ve Amaç. Orta sütun: Donanım, Fritzing Şeması, Büyük Robot Fotoğrafı. Sağ sütun: Test Verileri ve Sonuç.", "Şablonu açar."),
          F(17, "uygulama", "Afiş Düzenleme", "Kendi metinlerini, şemasını ve fotoğraflarını yerleştir. Yazı boyutlarını okunabilir ayarla.", "Afişini hazırlar."),
          F(6, "paylaşım", "3 Metre Kuralı", "Ekrana 3 metre uzaktan bak: Başlık ve şemalar okunabiliyor mu?", "Uzaklaşarak okunurluğu dener."),
          F(4, "değerlendirme", "Baskı Öncesi Kontrol", "Yazım hatası kontrolü yap ve PDF çıktısını al.", "PDF dosyasını kaydeder."),
        ],
        keyPoints: [
          "Afişte uzun paragraflar yerine madde imleri, akış şemaları ve fotoğraflar yer almalıdır.",
          "Başlık en az 48 punto, ana metinler en az 18-24 punto olmalıdır; uzaktan okunabilirlik esastır.",
        ],
        steps: [
          "A3 şablonunu aç.",
          "Proje başlığını ve takım üyelerinin isimlerini yaz.",
          "Problem ve Yöntem metinlerini yerleştir.",
          "Fritzing şemasını ve robot görselini merkeze koy.",
          "10 denemelik başarı tablosunu ekle.",
          "PDF olarak dışa aktar.",
        ],
        troubleshooting: [
          {
            problem: "Fotoğraflar afişte bulanık görünüyor.",
            cause: "Düşük çözünürlüklü WhatsApp görseli kullanılmıştır.",
            fix: "Orijinal kamera çekimini kablo veya Drive ile bilgisayara aktar.",
          },
        ],
        exitTicket: ["3 metre kuralı nedir?", "Afişin orta sütununda hangi görseller bulunur?"],
        support: "Tasarımda zorlanan takımlara hazır kutucuklu şablon ver.",
        extension: "Afişin köşesine projenin videosuna veya koduna giden QR Kod eklet.",
        ortaokul: "Hazır PowerPoint A3 şablonunda boşlukları doldursun.",
        lise: "LaTeX beamer veya Canva vektörel tasarım araçlarıyla profesyonel poster hazırlat.",
        homework: "Afişin renkli A3 çıktısını kırtasiyeden aldır.",
        tips: ["Arka planın beyaz veya çok açık renk olmasına dikkat edin, koyu renkler baskıda dağılır."],
        altArduino: "Arduino projesi için bilimsel poster.",
        altMbot: "mBot yarışma posteri.",
        altSpike: "FLL (First Lego League) proje panosu formatı.",
      }),
      H({
        hour: 2,
        title: "Açık Kaynak Kod Arşivi ve Teknik Dokümantasyon",
        aim: "Proje kodlarını açık kaynak standartlarında yorum satırlarıyla zenginleştirir; `README.md`, kütüphane listesi ve bağlantı şemasını içeren arşiv klasörü oluşturur.",
        outcomes: [
          "RK.7.34.2.1 Kod içindeki her kritik fonksiyonun başına açıklama başlığı (header comment) ekler.",
          "RK.7.34.2.2 Proje `README.md` dosyasında proje amacını, kullanılan malzemeleri ve kurulum adımlarını yazar.",
          "RK.7.34.2.3 Kullanılan harici kütüphaneleri (LiquidCrystal_I2C, DHT vb.) ve sürümleri listeler.",
          "RK.7.34.2.4 Kod dosyasını `.ino` veya `.cpp` olarak USB belleğe ve okul GitHub/Drive klasörüne yedekler.",
        ],
        materials: ["Bilgisayar", "Arduino IDE", "Proje Kodları", "USB Bellek"],
        prep: ["Örnek bir açık kaynak `README.md` dosyasını tahtada göster."],
        safety: ["Kod arşivinde şifre, özel veri veya kütüphane telif ihlali bırakmayın."],
        flow: [
          F(5, "açılış", "Kod Mirası", "Gelecek yıl kulübe gelecek öğrenciler kodunuza bakıp anlayabilecek mi? Temiz kod miras bırakmaktır.", "Kodunu açar."),
          F(8, "anlatım", "README ve Dokümantasyon", "README dosyasında ne olur: Proje Başlığı, Amacı, Malzeme Listesi, Devre Şeması, Kod Kurulumu.", "Başlıkları inceler."),
          F(17, "uygulama", "Kod Yorumlama ve Dosyalama", "Koddaki değişkenlere Türkçe açıklamalar yaz. README dosyasını hazırla ve klasörle.", "Yorum satırlarını tamamlar."),
          F(6, "paylaşım", "Akran Kod Okuması", "Yan takımdan biri senin koduna bakıp ne yaptığını anlayabiliyor mu?", "Akranına kodunu okutur."),
          F(4, "değerlendirme", "Arşiv Teslimi", "Proje klasörünü zipleyip öğretmene teslim et.", "Teslim eder."),
        ],
        keyPoints: [
          "İyi bir mühendislik projesi sadece donanımla değil, onu anlatan teknik dokümanla değer bulur.",
          "Başkası tarafından çalıştırılamayan kod, bitmiş sayılmaz.",
        ],
        steps: [
          "Kodu aç, başa proje künyesini (Yazar, Tarih, Versiyon) yaz.",
          "Fonksiyonlara açıklayıcı yorum satırları ekle.",
          "`README.md` dosyasını doldur.",
          "Tüm dosyaları `TakimX_Proje_2027.zip` olarak paketle.",
        ],
        troubleshooting: [
          {
            problem: "Koddaki Türkçe karakterler (ç, ğ, ı, ö, ş, ü) bazı bilgisayarlarda bozuk çıkıyor.",
            cause: "UTF-8 kodlama formatı uyumsuzluğu.",
            fix: "Dosyayı UTF-8 formatında kaydet; değişken adlarında İngilizce karakter kullan (`sicaklik` yerine `sicaklikDegeri`).",
          },
        ],
        exitTicket: ["README dosyasının en önemli 3 bölümü nedir?", "Değişken adlarında neden Türkçe karakter kullanılmaz?"],
        support: "Öğrencilere hazır README şablonu verip doldurt.",
        extension: "GitHub üzerinde takım adına ücretsiz repository açıp kodları commit ettir.",
        ortaokul: "Word belgesine kodu ve açıklamayı yapıştırıp PDF yapsın.",
        lise: "Markdown formatında README.md ve MIT lisans metni eklet.",
        homework: "Sergide standın üzerine konulacak kullanım kılavuzunu A5 ebatta bas.",
        tips: ["Tüm takımların kodlarının yedeğini mutlaka öğretmen harici diskine alın."],
        altArduino: "Arduino IDE kod açıklamaları.",
        altMbot: "mBlock projesinin `.sb3` olarak dışa aktarılması.",
        altSpike: "Spike Prime projesinin paylaşılabilir `.llsp3` formatında dışa aktarılması.",
      }),
    ],
  },

  // HAFTA 35: İnteraktif Stant Tasarımı ve Jüri Simülasyonu (Pitching)
  {
    week: 35,
    month: "Haziran",
    dates: "21–25 Haziran 2027",
    semester: 2,
    unit: "Yıl Sonu Robotik Sergisi",
    title: "3 Dakikalık Asansör Konuşması (Pitching) ve Stant Düzeni",
    why: "Harika bir proje kötü bir sunumla heba olabilir. Öğrencilere 3 dakikada projenin özünü, teknik derinliğini ve çözümünü jüriye etkileyici biçimde aktarma (Pitching) ve canlı demo stres yönetimi öğretilir.",
    prior: ["A3 Afiş", "Çalışan prototip", "10 tekrarlı test verileri"],
    weekGoal: "Sergi stant düzenini kurar; ziyaretçi etkileşim kurallarını belirler; öğretmen ve misafir jüri önünde 3 dakikalık asansör konuşması (Pitching) provası yapar.",
    hours: [
      H({
        hour: 1,
        title: "İnteraktif Stant Tasarımı ve Ziyaretçi Deneyimi",
        aim: "Masa örtüsü, A3 afiş, robot parkuru, yedek piller ve bilgilendirme kartlarını içeren profesyonel bir sergi standı kurar.",
        outcomes: [
          "RK.7.35.1.1 Stant alanını ergonomik ve güvenli bir yerleşim planıyla düzenler.",
          "RK.7.35.1.2 A3 afişi stant arkasına veya ayaklı panoya göz hizasında sabitler.",
          "RK.7.35.1.3 Robotun canlı gösteri yapacağı minyatür parkuru masada konumlandırır.",
          "RK.7.35.1.4 Ziyaretçilerin robotu denemesi için 'Ziyaretçi Etkileşim Yönergesi' hazırlar.",
        ],
        materials: ["Masa örtüsü", "A3 Afiş", "Minyatür Test Parkuru", "Tanıtım Kartları", "Yedek Piller"],
        prep: ["Atölyeyi gerçek sergi salonu düzenine dönüştür, masaları numaralandır."],
        safety: ["Masa kenarından yere düşme tehlikesine karşı pist kenarına bariyer koyun."],
        flow: [
          F(5, "açılış", "Sergiye 48 Saat!", "Salon dolacak; okul müdürü, veliler ve jüri gelecek. Masanız nasıl görünmeli?", "Standına bakar."),
          F(8, "anlatım", "Profesyonel Stant İlkeleri", "Temiz örtü, dik duran afiş, göz hizasında bilgi kartı, kablosu gizlenmiş düzen ve çalışan demo.", "İlkeleri inceler."),
          F(17, "uygulama", "Stant Kurulumu", "Masayı kur, afişi as, robotu piste yerleştir, ziyaretçi tabletini/telefonunu hazırla.", "Standı baştan sona kurar."),
          F(6, "paylaşım", "Karşılıklı Stant Ziyareti", "A takımı B takımının standına gidip bir ziyaretçi gibi baksın. Neler eksik?", "Akranına geribildirim verir."),
          F(4, "değerlendirme", "Stant Denetimi", "Eksik malzemeleri listele.", "Eksikleri tamamlar."),
        ],
        keyPoints: [
          "Ziyaretçinin dokunabileceği, deneyebileceği interaktif bir buton veya kumanda ilgiyi 5 kat artırır.",
          "Masada dağınık alet, tornavida, açıkta cips veya pet şişe bulunmamalıdır.",
        ],
        steps: [
          "Masa örtüsünü ser.",
          "Afişi panoya sabitle.",
          "Test pistini yerleştir.",
          "Robotu ve yedek pili şarjlı olarak masaya koy.",
        ],
        troubleshooting: [
          {
            problem: "Masa yüzeyi kaygan olduğu için tekerlekler patinaj çekiyor.",
            cause: "Kaygan plastik masa örtüsü.",
            fix: "Pist altına mat siyah veya mat beyaz mukavva/keçe zemin ser.",
          },
        ],
        exitTicket: ["Stantta afiş nereye yerleştirilir?", "Ziyaretçiyi standa çeken en önemli unsur nedir?"],
        support: "Masa düzeninde zorlanan takımlara rehberlik et.",
        extension: "Bilgisayarda projenin 30 saniyelik tanıtım videosunu döngüsel (loop) oynat.",
        ortaokul: "Standına renkli bayraklar ve takım logosu koysun.",
        lise: "Endüstriyel ürün broşürü (brochure) tasarlayıp masaya bıraksın.",
        homework: "Yedek pilleri bu gece tam şarj et.",
        tips: ["Tüm takımların pil kutusu anahtarlarını kontrol edin."],
        altArduino: "Arduino proje standı kurulumu.",
        altMbot: "mBot gösteri alanı.",
        altSpike: "Spike Prime yarışma masası stant düzeni.",
      }),
      H({
        hour: 2,
        title: "3 Dakikalık Asansör Konuşması (Pitching) ve Jüri Simülasyonu",
        aim: "Jüri üyelerinin önüne çıkarak 3 dakikalık asansör konuşmasını yapar; canlı demo gösterir ve teknik çapraz sorulara veriyle yanıt verir.",
        outcomes: [
          "RK.7.35.2.1 3 dakikalık sunum akışını (1. dk: Problem & Çözüm, 2. dk: Donanım & Canlı Demo, 3. dk: Test Verisi & Gelecek) yönetir.",
          "RK.7.35.2.2 Sunum sırasında paniklemeden canlı robot demosunu başarıyla icra eder.",
          "RK.7.35.2.3 Jüri üyelerinin 'Neden bu sensörü seçtiniz?', 'Pil ne kadar dayanıyor?' gibi teknik sorularını veriyle yanıtlar.",
          "RK.7.35.2.4 Akran takımların provasını rubrik kriterlerine göre puanlayarak yapıcı eleştiri sunar.",
        ],
        materials: ["Kronometre", "Jüri Değerlendirme Rubriği", "Mikrofon / Sunum Kartları", "Robot"],
        prep: ["Misafir öğretmenleri veya okul idaresinden birini prova jürisi olarak davet et."],
        safety: ["Süre aşımında kronometre ile durdur; süre disiplinine saygı göster."],
        flow: [
          F(5, "açılış", "Jüri Önünde", "Jüri geldiğinde ne yapacaksınız? 'Şeyy, işte yaptık...' mı, yoksa profesyonel bir mühendis gibi mi?", "Duruşunu düzeltir."),
          F(8, "anlatım", "Pitching Formülü", "İlk 30 saniye kanca (problem), 60 saniye canlı gösteri, 60 saniye mühendislik derinliği (FSM, I2C, BLE), 30 saniye kapanış.", "Süre dağılımını yazar."),
          F(17, "uygulama", "Jüri Provatı & Canlı Demo", "Her takım sırayla jüri önüne çıkar, 3 dakikayı doldurur, demo yapar, gelen 2 soruyu cevaplar.", "Sunumunu yapar ve savunur."),
          F(6, "paylaşım", "Jüri Geribildirimi", "Jüri eksikleri söyler: 'Ses tonunu yükselt', 'Demoyu daha önce göster'.", "Notlarını alır."),
          F(4, "değerlendirme", "Rubrik Puanlaması", "Takımın prova puanını açıkla ve son revizyonları ver.", "Yarışmaya hazır hisseder."),
        ],
        keyPoints: [
          "Canlı demo sırasında aksilik olursa panik yapılmaz; 'Mühendislikte arıza doğaldır, işte fail-safe sistemimiz' denilerek profesyonelce toparlanır.",
          "Jüri sorularında tahmin yürütmek yerine '10 test protokolümüzde %80 başarı elde ettik' gibi net sayılar verilmelidir.",
        ],
        steps: [
          "Giriş: Merhaba, ben X takımından Y. Bugün Z problemini çözen robotumuzu tanıtıyoruz.",
          "Canlı demo: Butona bas, robot pistte görevini yapsın.",
          "Teknik detay: DENEYAP ESP32, I2C telemetri paneli ve FSM durum makinesi mimarimiz.",
          "Veri: 10 denemede 8 başarı, ortalama 22 saniye.",
          "Kapanış: Teşekkür ederiz, sorularınızı yanıtlamaktan memnuniyet duyarız.",
        ],
        troubleshooting: [
          {
            problem: "Sunum sırasında öğrenci heyecandan susup kalıyor.",
            cause: "Topluluk önünde konuşma stresi.",
            fix: "Takım arkadaşı devreye girip sözü devralsın; sunumu tek kişiye yıkmayın, görevleri bölüştürün.",
          },
        ],
        exitTicket: ["Asansör konuşması kaç dakikadır?", "Canlı demo bozulursa jüriye ne söylenir?"],
        support: "Çok heyecanlanan öğrencilere konuşma kartı (flashcard) hazırlat.",
        extension: "İngilizce 1 dakikalık özet sunum provası yaptır.",
        ortaokul: "Takım üyeleri ikişer cümle sırayla konuşsun.",
        lise: "Maliyet-fayda analizi ve seri üretim potansiyeli eklet.",
        homework: "Ayna karşısında 3 dakikalık sunumu 2 kez tekrar et.",
        tips: ["Jüriye karşı göz teması kurmayı ve gülümsemeyi hatırlatın."],
        altArduino: "Arduino projesi jüri savunması.",
        altMbot: "mBot yarışma jüri mülakatı.",
        altSpike: "FLL Robot Tasarım jüri değerlendirmesi.",
      }),
    ],
  },

  // HAFTA 36: Büyük Robotik Bilim Şenliği ve Yıl Sonu Sergisi (Demo Day)
  {
    week: 36,
    month: "Haziran",
    dates: "25–27 Haziran 2027",
    semester: 2,
    unit: "Yıl Sonu Robotik Sergisi",
    title: "Büyük Robotik Bilim Şenliği, Canlı Yarışmalar ve Demo Day",
    why: "36 haftalık emeğin taçlandığı gündür. Tüm okul, veliler ve akademik jüri önünde projeler canlı yarışma parkurunda yarışır; öğrenciler mühendislik başarılarını sergileyerek sertifika ve madalyalarını alır.",
    prior: ["Tüm dönem kazanımları", "Stant kurulumu", "Pitching provası"],
    weekGoal: "Büyük Robotik Bilim Şenliğinde projesini sergiler; canlı pist yarışmalarına katılır; jüri değerlendirmesinden geçerek başarı sertifikasını alır.",
    hours: [
      H({
        hour: 1,
        title: "Bilim Şenliği Açılışı, Canlı Parkur Yarışmaları ve Ziyaretçiler",
        aim: "Okul çapında düzenlenen bilim şenliğinde standını açar; velilere ve ziyaretçilere sunum yapar; canlı engel labirenti ve çizgi izleme hız yarışmasına katılır.",
        outcomes: [
          "RK.7.36.1.1 Yıl sonu robotik bilim şenliğinde projesini protokol ve ziyaretçilere başarıyla sunar.",
          "RK.7.36.1.2 Canlı engel labirenti parkurunda robotunu otonom yarıştırır.",
          "RK.7.36.1.3 Çizgi izleme hız mücadelesinde pisti en kısa sürede tamamlamayı hedefler.",
          "RK.7.36.1.4 Ziyaretçilerin mobil Bluetooth üzerinden robotu test etmelerine rehberlik eder.",
        ],
        materials: ["Yarışma Parkurları", "Kronometre", "Canlı Skor Tahtası", "Afişler", "Robotlar"],
        prep: ["Okul spor salonunda veya fuaye alanında stantları ve resmi yarışma parkurunu kur."],
        safety: ["Pist çevresinde güvenlik şeridi oluşturun; kalabalığın robotlara basmasını engelleyin."],
        flow: [
          F(5, "açılış", "Büyük Gün Geldi!", "Okul müdürü ve misafirlerin açılış konuşması. Şenlik resmi olarak başlar.", "Stant başında hazır durur."),
          F(8, "anlatım", "Yarışma Akışı", "Önce Stant Ziyaretleri, ardından Canlı Parkur Yarışmaları (Engel Labirenti ve Çizgi Hız).", "Yarışma sırasını takip eder."),
          F(17, "uygulama", "Canlı Yarışmalar & Ziyaretçi Akını", "Robotlar piste çıkar, alkışlar arasında canlı yarışır. Veliler stantları gezer.", "Standını tanıtır, yarışır."),
          F(6, "paylaşım", "Pist Dereceleri", "Skor tahtasına en iyi dereceler yazılır.", "Başarıları kutlar."),
          F(4, "değerlendirme", "Jüri Puanlaması", "Resmi jüri heyeti stantları tek tek gezerek puan verir.", "Jüri sorularını yanıtlar."),
        ],
        keyPoints: [
          "Bilim şenliği bir sınav değil, bir başarı kutlamasıdır; centilmenlik ve takım ruhu esastır.",
          "Robotun şarjı bitmesin diye bekleme anlarında motor anahtarı kapalı tutulmalıdır.",
        ],
        steps: [
          "Standı aç ve sistemleri başlat.",
          "Ziyaretçilere projeyi anlat.",
          "Sıran gelince yarışma pistine çık ve robotu başlat.",
          "Jüri heyetine resmi sunumunu yap.",
        ],
        troubleshooting: [
          {
            problem: "Yarışma anında pil zayıfladı veya gevşek kablo çıktı.",
            cause: "Yoğun gösteri nedeniyle pil tükenmesi.",
            fix: "Yedek dolu pili tak; atölye sarf çantasındaki bant ve tornavidayla anında müdahale et.",
          },
        ],
        exitTicket: ["Bugün sergide seni en çok gururlandıran an neydi?", "En beğendiğin akran projesi hangisiydi?"],
        support: "Yarışmada elenen takımlara teselli ve moral desteği sağla.",
        extension: "Gelecek yılın robot kulübüne mentorluk yapacak kıdemli öğrencileri belirle.",
        ortaokul: "Tüm velilerine robotunun nasıl çalıştığını göstersin.",
        lise: "Teknik detayları okul gazetesine veya bültene makale olarak hazırlat.",
        homework: "Yıl boyunca öğrendiğin en önemli 3 mühendislik ilkesini bir sayfada özetle.",
        tips: ["Bol bol fotoğraf ve video çekin, okul web sitesinde haber yapın."],
        altArduino: "Arduino robotik bilim şenliği.",
        altMbot: "mBot şenlik turnuvası.",
        altSpike: "Spike Prime robot şenliği.",
      }),
      H({
        hour: 2,
        title: "Jüri Değerlendirmesi, Sertifika Töreni ve Atölye Kapanışı",
        aim: "Jüri değerlendirme sonuçlarını açıklar; başarı sertifikaları ve madalyalarını takdim eder; atölye malzemelerini sayarak gelecek yıla devreder.",
        outcomes: [
          "RK.7.36.2.1 Yıl sonu başarı rubriği sonuçlarına göre geri bildirim alır.",
          "RK.7.36.2.2 MEB onaylı Robotik Kodlama Kursu Başarı Sertifikasını ve madalyasını alır.",
          "RK.7.36.2.3 Takım malzemelerini zimmet listesine göre eksiksiz sayarak atölye dolabına teslim eder.",
          "RK.7.36.2.4 Bir yıllık mühendislik yolculuğunu öz değerlendirme formuyla tamamlar.",
        ],
        materials: ["Başarı Sertifikaları", "Madalyalar / Plaketler", "Zimmet Teslim Formu", "Atölye Saklama Kutuları"],
        prep: ["Öğrenci isimlerine özel sertifikaları imzalı ve kaşeli hazırla."],
        safety: ["Pilleri şaseden sökerek yangın güvenlik kutusuna kaldırın."],
        flow: [
          F(5, "açılış", "Büyük Kapanış", "Bir yıl önce LED yakmayı bilmiyorduk; bugün otonom, I2C ekranlı, Bluetooth kontrollü robotlar ürettik.", "Duygulanır ve alkışlar."),
          F(8, "anlatım", "Ödüller ve Değerlendirme", "Jürinin belirlediği En İnovatif Proje, En İyi Tasarım, Pist Şampiyonu ve Azim Ödülleri.", "Heyecanla bekler."),
          F(17, "uygulama", "Sertifika ve Madalya Töreni", "Tüm öğrencilere tek tek sertifikaları ve madalyaları takdim edilir, toplu fotoğraf çekilir.", "Sertifikasını gururla alır."),
          F(6, "paylaşım", "Envanter ve Düzen", "Robot parçalarını güvenle kutula, pilleri ayır, atölyeyi gelecek yıla pırıl pırıl bırak.", "Kutusunu teslim eder."),
          F(4, "değerlendirme", "Veda ve Gelecek", "Robotik serüveni burada bitmiyor; TEKNOFEST ve üniversite yolunda devam edecek!", "Mutlulukla vedalaşır."),
        ],
        keyPoints: [
          "Yıl sonunda tüm 18650 piller şaseden sökülmeli, nominal saklama voltajında (yaklaşık 3.8V) serin yerde muhafaza edilmelidir.",
          "Öğrencilerin kazandığı problem çözme ve algoritmik düşünme becerisi tüm akademik hayatlarında rehber olacaktır.",
        ],
        steps: [
          "Ödül ve sertifika törenine katıl.",
          "Toplu hatıra fotoğrafı çektir.",
          "Robot üzerindeki pilleri çıkar ve pil kutusuna koy.",
          "Zimmet formunu imzala ve atölyeyi topla.",
        ],
        troubleshooting: [
          {
            problem: "Takım kutusunda eksik parça var (ör: bir tornavida veya jumper eksik).",
            cause: "Sergi alanında masada unutulmuş olabilir.",
            fix: "Sergi salonunu takımca tarayarak eksik parçaları tamamlayın.",
          },
        ],
        exitTicket: ["Bu kursta öğrendiğin en değerli beceri neydi?", "Gelecek yıl hangi projeyi yapmak istersin?"],
        support: "Tüm öğrencilerin eşit şekilde takdir edilmesini ve alkışlanmasını sağla.",
        extension: "Yaz dönemi için online açık kaynak robotik projeleri öner.",
        ortaokul: "Sertifikasını ailesine göstermek üzere saklasın.",
        lise: "CV ve üniversite portfolyosuna sertifikayı ve GitHub linkini eklesin.",
        homework: "Gelecek yıl için bir robotik proje fikri taslağı yaz.",
        tips: ["Tüm velilerle ve okul idaresiyle toplu fotoğraf çektirmeyi unutmayın."],
        altArduino: "Arduino kulüp sertifikası.",
        altMbot: "mBot kurs bitirme belgesi.",
        altSpike: "Spike Prime eğitim tamamlama sertifikası.",
      }),
    ],
  },
];
