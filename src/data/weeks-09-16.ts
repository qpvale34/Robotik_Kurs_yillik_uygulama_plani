import type { WeekPlan } from "./types";
import { F, H } from "./helpers";

export const WEEKS_09_16: WeekPlan[] = [
  {
    week: 9,
    month: "Aralık",
    dates: "30 Kasım–4 Aralık 2026",
    semester: 1,
    unit: "Giriş birimleri",
    title: "Buton: dijital giriş ve LED kontrolü",
    why: "Şimdiye kadar kart konuştu, öğrenci dinledi. Buton ilk gerçek girdidir; yüzer pin ve pull-up olmadan ‘hayalet basış’ haftalarca avlanır.",
    prior: ["D8 LED", "trafik ışığı sıralı kod", "akış şemasında karar kutusu"],
    weekGoal: "INPUT_PULLUP ile butonu okur, LED’i basışa bağlar, seviye ile kenar farkını söyler.",
    hours: [
      H({
        hour: 1,
        title: "digitalRead ve INPUT_PULLUP",
        aim: "Öğrenci yüzer pini görür, dahili pull-up’ı gerekçeler ve butonu GND’ye bağlayarak okur.",
        outcomes: [
          "RK.5.09.1.1 Dijital girişin HIGH/LOW olduğunu ve yüzer pinin rastgele okunduğunu açıklar.",
          "RK.5.09.1.2 INPUT_PULLUP ile butonu pin–GND arasına bağlar (ek direnç yok).",
          "RK.5.09.1.3 digitalRead sonucunu Serial’e yazar.",
          "RK.5.09.1.4 ‘Basınca LOW’ kuralını kendi cümlesiyle söyler.",
        ],
        materials: ["Uno", "tactile buton 6×6", "2 jumper", "USB", "Serial Monitor"],
        prep: ["Tahtaya iki şema: pull-down 10 kΩ vs PULLUP. Bugün PULLUP zorunlu.", "IDE’de 9600 hazır."],
        safety: ["USB takılıyken buton bacaklarını eğme.", "Butonun 4 bacağı köşegen kısa — yanlış satır LED’i kısa eder."],
        flow: [
          F(5, "açılış", "Hayalet basış", "Pini INPUT yap, Serial yaz, kabloyu tutarak sayıları oynat.", "‘Dokununca değişiyor’ gözlemini söyler."),
          F(8, "anlatım", "Pull-up neden", "Açık pin anten. Dahili direnç pini HIGH’ta tutar; basınca GND’ye iner = LOW.", "Şemayı deftere çizer: pin–buton–GND."),
          F(18, "uygulama", "D2 buton + Serial", "Çiftli programlama. 10. dk rol değiş.", "Bağlar, yükler, 1/0 izler."),
          F(5, "paylaşım", "Basınca kaç", "Tahtada beklenen: basılı 0, boş 1.", "Kendi ekranını doğrular."),
          F(4, "değerlendirme", "Tek cümle", "‘Neden pull-up?’", "Yazar."),
        ],
        keyPoints: [
          "INPUT_PULLUP = extra 10 kΩ taşımana gerek yok; okul stoku için varsayılan bu.",
          "Mantık ters: basılı = LOW. if (digitalRead(BTN)==LOW) ‘basıldı’ demektir.",
          "Butonun bacakları çiftler hâlindedir; breadboard’da kanalı atlat.",
          "Serial.begin(9600) setup’ta bir kez; Monitor baud aynı olmazsa çöp karakter.",
        ],
        steps: [
          "USB sök. Butonu orta kanalı atlatacak koy.",
          "D2 → buton bir kanat; diğer kanat → GND.",
          "pinMode(2, INPUT_PULLUP); Serial.begin(9600);",
          "loop: Serial.println(digitalRead(2)); delay(100);",
          "Monitor’de basınca 0, bırakınca 1 gör.",
        ],
        code: {
          title: "Buton Serial",
          lang: "cpp",
          code: `const int BTN = 2;

void setup() {
  pinMode(BTN, INPUT_PULLUP); // basınca LOW
  Serial.begin(9600);
}

void loop() {
  Serial.println(digitalRead(BTN));
  delay(100);
}`,
          notes: "10 kΩ pull-down alternatifi: buton 5V’a, direnç pin–GND, INPUT (PULLUP değil). Bu yıl PULLUP.",
        },
        wiring: {
          title: "PULLUP buton",
          items: ["Uno D2 → buton bacak A", "Buton bacak B (köşegen değil, aynı anahtar) → GND"],
        },
        troubleshooting: [
          { problem: "Hep 0 veya hep 1", cause: "Yanlış bacak çifti (buton sürekli kısa) veya GND kopuk", fix: "Butonu 90° döndür; sürekliliği USB’süz multimetreyle bak." },
          { problem: "Serial çöp", cause: "Baud 9600 değil", fix: "Monitor sağ alt 9600; USB kabloyu bir kez sök-tak." },
          { problem: "Değer zıplıyor", cause: "Yüzer / kablo gevşek", fix: "INPUT_PULLUP yazıldığından emin ol; breadboard satırını değiştir." },
        ],
        exitTicket: ["Basılı buton hangi mantık seviyesini üretir?", "Neden extra direnç yok?"],
        support: "mBlock ‘pin 2 pullup oku’ bloğu; Serial yerine LED hazır (saat 2’ye bırakma, sadece 1/0 göster).",
        extension: "5 sn boyunca basılı kalma süresini milisaniye say (delay’siz değil, kaba delay(10) sayacı).",
        ortaokul: "‘Yay pini HIGH’ta tutar, parmak GND’ye çeker’ hikâyesi.",
        lise: "Dahili ~20–50 kΩ, debounce’un nedeni mekanik sekme — saat 2.",
        homework: "Trafik şemana ‘yaya butonu?’ karar kutusunu ekle (kod yok).",
        tips: ["İlk 10 dk’da her masada Serial’in açıldığını gör.", "Klon kartta D13 buton olmasın — L LED çeker."],
        altArduino: "Ana iz, D2.",
        altMbot: "Dahili buton veya RJ25 anahtar; pull-up gizli, ‘basınca 0’ yine söylet.",
        altSpike: "Force sensor / orange button; ‘pressed?’ bloğu. Yüzer pin tartışması Tinkercad’de 5 dk.",
      }),
      H({
        hour: 2,
        title: "Butonla LED ve basış kenarı",
        aim: "Buton LED’i yakar; basılı tutma ile tek basış (kenar) ayırt edilir, kaba debounce uygulanır.",
        outcomes: [
          "RK.5.09.2.1 Buton LOW iken D8 LED’ini yakar.",
          "RK.5.09.2.2 Seviye kontrolü ile kenar (önce 1 şimdi 0) farkını açıklar.",
          "RK.5.09.2.3 delay(50) ile kaba sekme bastırmayı dener.",
          "RK.5.09.2.4 Tek basışta LED’i mandallayan (toggle) kodu çalıştırır.",
        ],
        materials: ["D2 buton", "D8 LED + 220 Ω", "önceki Blink kodu"],
        prep: ["İki görev kartı: A seviye (basılıyken yan), B toggle (her basışta değiş). B uzatma değil, asıl hedef."],
        safety: ["USB kes, LED’i tak, USB tak."],
        flow: [
          F(4, "anımsama", "Basınca LOW", "Koro.", "Cevap."),
          F(6, "gösteri", "Seviye vs kenar", "Kapı zili = seviye, ışık anahtarı = kenar.", "Görev kartını seçmez, sırayla ikisini yapacak."),
          F(20, "uygulama", "A sonra B", "Önce if LOW yak. Sonra lastButton değişkeni ile kenar + delay(50).", "İki kodu kaydeder: H9A, H9B."),
          F(6, "paylaşım", "Çift yanıp sönme", "Sekmesiz toggle’ı 3 takım gösterir.", "Kendi B kodunda delay yerini parmakla gösterir."),
          F(4, "değerlendirme", "İki terim", "seviye / kenar.", "Yazar."),
        ],
        keyPoints: [
          "Seviye: ‘şu an basılı mı?’. Kenar: ‘şimdi mi basıldı?’.",
          "Toggle kenar ister; seviyeyle yazarsan LED 100 Hz yanar.",
          "delay(50) kaba debounce; millis tabanlı lise uzantısı.",
          "lastState değişkeni setup’ta HIGH (çekilmiş) başlamalı.",
        ],
        steps: [
          "D8 LED’i hafta 8 gibi bağla, D2 buton kalsın.",
          "Seviye kodunu yükle, basılı tut — LED sürekli yanmalı.",
          "last = HIGH; if (last==HIGH && now==LOW) led = !led; last = now; delay(50);",
          "Tek kısa basışta LED durum değiştirsin.",
          "H9A ve H9B diye iki dosya kaydet.",
        ],
        code: {
          title: "Kenar ile toggle",
          lang: "cpp",
          code: `const int BTN = 2;
const int LED = 8;
int last = HIGH;
int ledOn = LOW;

void setup() {
  pinMode(BTN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}

void loop() {
  int now = digitalRead(BTN);
  if (last == HIGH && now == LOW) {
    ledOn = !ledOn;
    digitalWrite(LED, ledOn);
    delay(50); // kaba debounce
  }
  last = now;
}`,
        },
        wiring: {
          title: "Buton + LED",
          items: ["D2 → buton → GND", "D8 → 220 Ω → LED anot; katot GND"],
        },
        troubleshooting: [
          { problem: "Toggle çılgınca değişiyor", cause: "Kenar yok, seviye var", fix: "last değişkeni ve HIGH→LOW şartı." },
          { problem: "İki kez değişiyor", cause: "Sekme", fix: "delay(50) kenarın içinde." },
        ],
        exitTicket: ["Kapı zili seviye mi kenar mı?", "last değişkeni neden var?"],
        support: "Sadece seviye kodu; toggle öğretmenle birlikte.",
        extension: "3 basışta SOS (kısa-kısa-kısa) — sayaç.",
        ortaokul: "mBlock ‘eğer basıldı’ + ‘LED tersine çevir’.",
        lise: "millis debounce, falling edge isimlendirmesi.",
        homework: "Akıllı ev için hangi butonlar seviye, hangisi kenar? 3 satır.",
        tips: ["B kodunu kopyalatma, last’i tahtada evrimleştir.", "D13 LED ile toggle görünmez kalmasın — harici D8."],
        altArduino: "Ana iz.",
        altMbot: "Onboard button + RGB toggle.",
        altSpike: "Event ‘when button pressed’ zaten kenar — seviye için ‘while pressed’.",
      }),
    ],
  },
  {
    week: 10,
    month: "Aralık",
    dates: "7–11 Aralık 2026",
    semester: 1,
    unit: "Giriş birimleri",
    title: "Potansiyometre ve analog okuma / PWM parlaklık",
    why: "Dünya 0/1 değildir; ışık, mesafe, ses analogdur. 10-bit ADC (0–1023) sonraki tüm sensörlerin dilidir.",
    prior: ["digitalRead", "Serial"],
    weekGoal: "A0’dan 0–1023 okur, PWM ile LED parlaklığını map eder.",
    hours: [
      H({
        hour: 1,
        title: "analogRead 0–1023 ve Serial",
        aim: "Potansiyometreyi gerilim bölücü olarak bağlar, 0–1023 aralığını okur ve yorumlar.",
        outcomes: [
          "RK.5.10.1.1 Analog pinin 0–5 V’u 0–1023 tam sayıya çevirdiğini söyler.",
          "RK.5.10.1.2 10 kΩ potansiyometreyi 5V–A0–GND bağlar.",
          "RK.5.10.1.3 analogRead değerini Serial’de izler.",
          "RK.5.10.1.4 0, ~512, 1023 uçlarını fiziksel olarak üretir.",
        ],
        materials: ["10 kΩ pot (breadboard uyumlu)", "3 jumper", "Uno"],
        prep: ["Pot’un üç bacağını işaretle: sol 5V, orta sinyal, sağ GND (veya ters, yine çalışır, yön değişir)."],
        safety: ["5V ile GND’yi pot’suz birleştirmeyin.", "USB takılıyken orta bacağı eğmeyin."],
        flow: [
          F(5, "açılış", "Musluk", "Pot = ayarlı direnç; orta bacak gerilimi böler.", "Kendi potunu evirir."),
          F(8, "anlatım", "10 bit", "2^10=1024 basamak. 5/1023 ≈ 4.9 mV. analogRead(A0).", "Formülü deftere yazar."),
          F(18, "uygulama", "Üç uç", "Serial 200 ms. Sol, orta, sağ duruşları not.", "0 / 512 / 1023 bandını tabloya işler."),
          F(5, "paylaşım", "Sapma", "Kim 1023 göremedi?", "Kablo yerini söyler."),
          F(4, "değerlendirme", "Kaç bit", "Tek soru.", "10 ve 0–1023."),
        ],
        keyPoints: [
          "Orta bacak sinyal, iki yan güç. Yanları ters bağlamak sadece yönü tersler, yakmaz.",
          "A0–A5 analog; D pin analogRead vermez (Uno).",
          "Gürültü ±2–5 birim normal; ‘tam 512’ takıntısı yok.",
          "Serial Plotter (IDE) değer dansını gösterir — 1 dk gösteri yeter.",
        ],
        steps: [
          "USB sök (S1). Pot: sol 5V, orta A0, sağ GND.",
          "Serial.begin(9600); analogRead(A0); delay(200);",
          "Monitor’ü 9600 aç; Plotter’ı 1 dk dene.",
          "Sol / orta / sağ duruşları tabloya yaz (0, ~512, 1023 bandı).",
          "USB sökmeden kablo oynatma; sapmayı kablo satırıyla yorumla.",
        ],
        code: {
          title: "Pot Serial",
          lang: "cpp",
          code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  int v = analogRead(A0);
  Serial.println(v);
  delay(200);
}`,
        },
        wiring: {
          title: "Potansiyometre",
          items: ["Pot sol → 5V", "Pot orta → A0", "Pot sağ → GND"],
        },
        troubleshooting: [
          { problem: "Hep 0", cause: "Orta bacak takılı değil veya A0 yerine D2", fix: "Orta bacak A0; kod analogRead(A0)." },
          { problem: "Hep 1023", cause: "Sinyal 5V’ta kısa", fix: "Orta bacak aynı satırda 5V ile birleşmiş — satır değiştir." },
          { problem: "Sayı ±30 zıplıyor, Tinkercad’de zıplamaz", cause: "Donanım gürültüsü / gevşek jumper; simülasyon temiz", fix: "Jumper ittir; 5 okumanın ortasını yaz. Tinkercad kanıt değil." },
        ],
        exitTicket: ["analogRead aralığı nedir?", "Potun orta bacağı nereye gider?"],
        support: "Tinkercad’de aynı pot, sonra fiziksel.",
        extension: "v * (5.0/1023) ile voltaj yazdır (float).",
        ortaokul: "0–1023 ‘ne kadar çevirdim’ dili; voltaj lise.",
        lise: "ADC çözünürlük ve 4.9 mV LSB.",
        homework: "Evde bir ses düğmesinin 3 bacağını (sökmeden) fotoğrafla etiketle.",
        tips: ["Plotter’ı bir kez göster, 8 ekran kalabalığı olmasın.", "Trimmer (törpü) pot da olur, breadboard zor — hoparlör pot tercih."],
        altArduino: "Ana iz.",
        altMbot: "Dahili potansiyometre yoksa harici analog pin; veya ‘light sensor’ 0–100 ön izleme.",
        altSpike: "Force 0–10 veya color brightness; 0–1023 Tinkercad’de.",
      }),
      H({
        hour: 2,
        title: "PWM ile LED parlaklığı (map)",
        aim: "0–1023 değeri 0–255 PWM’e map edilir; D9’da LED parlar.",
        outcomes: [
          "RK.5.10.2.1 PWM’in ‘çok hızlı yan-sön’ olduğunu ve ~ işaretli pinleri söyler.",
          "RK.5.10.2.2 analogWrite(pin, 0–255) kullanır.",
          "RK.5.10.2.3 map(v, 0, 1023, 0, 255) uygular.",
          "RK.5.10.2.4 D8’in PWM olmadığını fark edip D9’a taşır.",
        ],
        materials: ["LED + 220 Ω", "D9 (PWM)", "pot A0"],
        prep: ["Uno siluetinde ~3,5,6,9,10,11 işaretli. D8 ~ yok."],
        safety: ["220 Ω hâlâ zorunlu; PWM LED’i yakmaz ama pin akımı kuralı durur."],
        flow: [
          F(5, "anımsama", "0–1023", "Dün tablo.", "Bir uç değer söyler."),
          F(7, "anlatım", "PWM ve map", "Göz 500 Hz’i ortalama parlaklık sanır. analogWrite 8 bit.", "D9’u haritada boyar."),
          F(20, "uygulama", "Pot → LED", "D8’de dene (çalışmaz/garip), D9’a geç.", "Parlaklığı evirir, map satırını gösterir."),
          F(4, "paylaşım", "D8 dersi", "Neden D8 sönük kaldı?", "PWM pin listesi."),
          F(4, "değerlendirme", "map imzası", "Dört argüman.", "Yazar."),
        ],
        keyPoints: [
          "analogWrite analog değildir; dijital nabızdır.",
          "Uno PWM: 3,5,6,9,10,11. D8 listede yok.",
          "map tamsayı; 1023→255, 0→0.",
          "constrain(v,0,255) analogWrite öncesi alışkanlık.",
        ],
        steps: [
          "USB sök. LED’i D9 + 220 Ω + GND taşı (D8 ~ değil).",
          "int v = analogRead(A0); int p = map(v,0,1023,0,255); analogWrite(9,p);",
          "Potu çevir, parlaklığın süzülmesini doğrula.",
          "Bilerek analogWrite(8, p) dene, farkı not et, D9’a dön.",
          "map satırını deftere dört argümanla yaz.",
        ],
        code: {
          title: "Pot → PWM LED",
          lang: "cpp",
          code: `const int LED = 9; // PWM

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  int v = analogRead(A0);
  int p = map(v, 0, 1023, 0, 255);
  analogWrite(LED, p);
}`,
        },
        wiring: {
          title: "Pot + PWM LED",
          items: ["Pot 5V–A0–GND", "D9 → 220 Ω → LED anot; katot GND"],
        },
        troubleshooting: [
          { problem: "LED yan/sön, kısılmaz", cause: "digitalWrite veya PWM’siz pin", fix: "analogWrite + D9." },
          { problem: "Parlaklık ters", cause: "Pot yönü", fix: "5V/GND yer değiştir veya map’i 255,0 yap — bilinçli seç." },
        ],
        exitTicket: ["Uno’da 3 PWM pin yaz.", "map’in 4 argümanı ne işe yarar?"],
        support: "Hazır kod, sadece pini 9 yapar ve potu çevirir.",
        extension: "İkinci LED D10, ters map (biri açılırken diğeri kısılır).",
        ortaokul: "mBlock ‘analog yaz pin 9’ 0–255 kaydırıcı önce, sonra pot.",
        lise: "Görev döngüsü % = p/255; analogWrite 5,6 pinleri 980 Hz vs 490 Hz farkı tek cümle.",
        homework: "LDR’nin de analog olacağını 1 cümleyle tahmin et (hafta 11).",
        tips: ["D8 tuzağını kasıtlı kur — kavram orada oturur.", "analogWrite setup’ta pinMode şart değil ama alışkanlık iyi."],
        altArduino: "Ana iz.",
        altMbot: "RGB parlaklık 0–255 pot ile.",
        altSpike: "Light brightness 0–100; map fikri çeteleyle.",
      }),
    ],
  },
  {
    week: 11,
    month: "Aralık",
    dates: "14–18 Aralık 2026",
    semester: 1,
    unit: "Işık ve ses",
    title: "LDR gerilim bölücü ve gece lambası",
    why: "Akıllı evin çekirdeği ‘ortam karanınca yak’. LDR ucuzdur, bölücü yanlış kurulunca 1023’te kilitlenir.",
    prior: ["analogRead", "map", "if"],
    weekGoal: "LDR gerilim bölücüsünü kurar, eşik belirler, karanlıkta LED yakar.",
    hours: [
      H({
        hour: 1,
        title: "Gerilim bölücü ve ışık kalibrasyonu",
        aim: "LDR + 10 kΩ bölücüyü A0’a bağlar, aydınlık/karanlık aralığını tabloya döker.",
        outcomes: [
          "RK.6.11.1.1 LDR direncinin karanlıkta arttığını söyler.",
          "RK.6.11.1.2 5V–LDR–A0–10kΩ–GND (veya ters) bölücüyü çizer ve kurar.",
          "RK.6.11.1.3 El, kâğıt, fener ile 6 okuma kaydeder.",
          "RK.6.11.1.4 Eşik adayını (iki kümenin ortası) seçer.",
        ],
        materials: ["LDR GL5528", "10 kΩ", "A0", "fener veya telefon ışığı", "kalibrasyon tablosu"],
        prep: ["Standart topolojiyi tek yaz: 5V-LDR-A0-10k-GND. Tersi de çalışır ama eşik yönü değişir — sınıfta tek topoloji."],
        safety: ["LED bu saatte yok; sadece okuma.", "Telefon ışığını göze tutma."],
        flow: [
          F(5, "açılış", "Göz bebeği", "Karanlıkta direnç artar.", "Tahmin: karanlıkta analog sayı büyür mı küçülür mü? (topolojiye bağlı — şimdi söyleme)."),
          F(8, "anlatım", "Bölücü", "İki direnç gerilimi paylaşır. LDR değişir, 10 kΩ sabit.", "Şemayı çizer."),
          F(18, "uygulama", "6 okuma", "Açık, gölge, avuç, kâğıt, fener, dolap.", "Tabloyu doldurur, min-max yazar."),
          F(5, "paylaşım", "Eşik adayı", "İki küme arası.", "Sayıyı deftere."),
          F(4, "değerlendirme", "Neden 10 k", "GL5528 gündüz ~1–10 k, gece yüzlerce k.", "1 cümle."),
        ],
        keyPoints: [
          "Kalibrasyon koddan önce gelir; başkasının eşiği senin sınıfında işe yaramaz.",
          "Avuç içi ‘gece’ sayılmaz; gerçek gece daha karanlık — eşiği biraz aydınlık tarafa al.",
          "Aynı satırda LDR ve 10 k orta düğümü A0.",
          "Tinkercad LDR’si gerçek GL5528’den farklı ölçekler; eşiği simülasyondan kopyalama.",
        ],
        steps: [
          "USB sök. 5V → LDR → düğüm A0 → 10 kΩ → GND.",
          "Serial analogRead(A0), delay(300).",
          "6 ortam, 6 sayı (açık, gölge, avuç, kâğıt, fener, kutu).",
          "Aydınlık küme ile karanlık küme arasına eşik çiz.",
          "Tinkercad değerini kopyalama — donanım tablosu esas.",
        ],
        code: {
          title: "LDR kalibrasyon",
          lang: "cpp",
          code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(analogRead(A0));
  delay(300);
}`,
        },
        wiring: {
          title: "LDR bölücü",
          items: ["5V → LDR bacak 1", "LDR bacak 2 → A0 ve 10 kΩ bacak 1 (aynı düğüm)", "10 kΩ bacak 2 → GND"],
        },
        troubleshooting: [
          { problem: "Hep 0 veya 1023", cause: "Bölücü yok (LDR doğrudan 5V–A0) veya kısa", fix: "10 kΩ’un gerçekten GND’ye gittiğini kontrol et." },
          { problem: "Değişmiyor", cause: "LDR yerine 10 kΩ iki tane", fix: "LDR bacakları simetrik, gövde kare fotoğraf; 10 k renk halkası." },
        ],
        exitTicket: ["Eşik sayın kaç?", "Neden başkasının eşiğini kullanmıyoruz?"],
        support: "Tablo önceden çizgili; sadece sayı.",
        extension: "İki eşik (histerezis fikri, hafta 18’de tam): alçak/yüksek.",
        ortaokul: "Sayıları ‘az ışık / çok ışık’ diye boya, eşik çizgisi cetvelle.",
        lise: "R_LDR yaklaşık hesabı, Vout = 5 * 10k/(10k+RL).",
        homework: "Evde gece lambası eşiğini ‘ne kadar karanlık’ cümlesiyle yaz (sayı yok).",
        tips: ["Pencereli labda ‘karanlık’ zordur — karton kutu istasyonu kur.", "Her takımın eşiği farklı kalsın, tek sınıf eşiği dayatma."],
        altArduino: "Ana iz.",
        altMbot: "Onboard light sensor 0–100; yine 6 okuma tablosu.",
        altSpike: "Color sensor brightness / light; kutu kalibrasyonu aynı.",
      }),
      H({
        hour: 2,
        title: "Eşik değeriyle otomatik lamba",
        aim: "if (analogRead < esik) LED yak — gece lambası çalışır ve histerezis yokluğunda titreme gözlenir.",
        outcomes: [
          "RK.6.11.2.1 Kendi eşiğiyle LED’i karanlıkta yakar.",
          "RK.6.11.2.2 const int ESIK kullanır.",
          "RK.6.11.2.3 Eşik sınırında titremeyi fark eder ve 20 birim pay önerir.",
          "RK.6.11.2.4 Tinkercad kopyasını (isteğe) doğrular.",
        ],
        materials: ["LDR bölücü", "D9 LED + 220 Ω", "karton kutu"],
        prep: ["Saat 1 tabloları masada. ESIK’i öğrencinin sayısından alsın, sen verme."],
        safety: ["USB kesip LED ekle."],
        flow: [
          F(4, "anımsama", "Eşik oku", "Defterden.", "Söyler."),
          F(6, "gösteri", "if yapısı", "Yön: sizin topolojide karanlık küçük mü büyük mü? Saat 1 verisi.", "if yönünü yazar."),
          F(20, "uygulama", "Gece lambası", "Kutu kapağı test. Eşiği ±50 oynat.", "Çalışan lamba + ESIK yorum satırı."),
          F(6, "paylaşım", "Titreme", "Sınırda el gezdir.", "Pay (histerezis) cümlesi."),
          F(4, "değerlendirme", "const ESIK", "Neden sihirli sayı değil.", "Yazar."),
        ],
        keyPoints: [
          "Eşik yorumda birimli değil, ADC birimi: ‘// avuç 340, açık 780, eşik 500’.",
          "Titreme: analog gürültü eşiği sürekli keser. Çözüm histerezis (iki eşik) — bu yıl park sensöründe tam.",
          "LED D9 PWM değil digital de olur; gece lambası on/off.",
          "Karton ev hafta 13’e bu kod gidecek.",
        ],
        steps: [
          "LED D8 veya D9 + 220 Ω.",
          "const int ESIK = (senin sayı);",
          "if (analogRead(A0) < ESIK) HIGH; else LOW; // yönünü tablona göre çevir",
          "Kutuyla 5 kez aç-kapa.",
          "Yoruma kalibrasyon notu.",
        ],
        code: {
          title: "Gece lambası",
          lang: "cpp",
          code: `const int LDR = A0;
const int LED = 8;
const int ESIK = 500; // kendi tablon

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  int isik = analogRead(LDR);
  if (isik < ESIK) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
}`,
          notes: "Ters topolojide karşılaştırma yönünü çevir. Serial ile doğrula.",
        },
        wiring: {
          title: "LDR + lamba",
          items: ["5V–LDR–A0–10k–GND", "D8 → 220 Ω → LED → GND"],
        },
        troubleshooting: [
          { problem: "LED hep yanık", cause: "Eşik yönü ters veya ESIK uçta", fix: "Serial aç, sayıya bak, if yönünü çevir." },
          { problem: "Titriyor", cause: "Eşik tam sınırda", fix: "ESIK’i 40–80 kaydır; histerezisi sözlü not et." },
        ],
        exitTicket: ["ESIK sayın ve bir kalibrasyon notu yaz.", "Titreme neden olur?"],
        support: "if iskeleti boş ESIK; öğretmen yönü birlikte seçer.",
        extension: "İki eşik: aşağıda yak, yukarıda söndür (histerezis).",
        ortaokul: "mBlock ‘eğer ışık < 40’.",
        lise: "Histerezis kodu uzatma olarak tam yazılır.",
        homework: "Akıllı eve bu lambayı hangi odaya koyarsın, 2 cümle.",
        tips: ["Yön savaşını veriyle bitir, ‘benim kodumda <’ dayatması yok — topoloji tek ise yön tek.", "Kutu yoksa ceketle kapa."],
        altArduino: "Ana iz.",
        altMbot: "Onboard light + LED matrix ‘gece’.",
        altSpike: "Light < eşik → lamp on.",
      }),
    ],
  },
  {
    week: 12,
    month: "Aralık",
    dates: "21–25 Aralık 2026",
    semester: 1,
    unit: "Işık ve ses",
    title: "Aktif buzzer, tone, buton+ışık ikaz",
    why: "Çıkış artık yalnızca ışık değil. Aktif buzzer ile pasif tone karışınca ‘ses yok’ 40 dakikayı yer. Alarm, akıllı evin ikinci katmanı.",
    prior: ["digitalWrite", "buton kenar", "LDR eşik"],
    weekGoal: "Aktif buzzer ile ikaz çalar; buton veya LDR ile basit alarm kurar.",
    hours: [
      H({
        hour: 1,
        title: "Aktif buzzer ve dijital ikaz",
        aim: "Aktif 5 V buzzer’ı D6’da yak-söndürür; pasif buzzer / tone farkını söyler.",
        outcomes: [
          "RK.6.12.1.1 Aktif buzzer’ın dahili osilatörlü olduğunu, pasifin tone() istediğini ayırt eder.",
          "RK.6.12.1.2 D6–buzzer–GND bağlar (direnç genelde yok, polarite var).",
          "RK.6.12.1.3 digitalWrite ile 200 ms’lik bipler üretir.",
          "RK.6.12.1.4 Hoparlöre dayanmayacağını (S7) uygular.",
        ],
        materials: ["Aktif buzzer 5 V", "isteğe 1 pasif buzzer gösteri", "D6"],
        prep: ["Aktif olanların üstünde siyah sticker / ‘aktif’ poşet. Karışanı ayır.", "Ses kısık test: HIGH kısa."],
        safety: ["Buzzer kulağa dayanmaz.", "Aktif buzzer’ı 9 V’a bağlama."],
        flow: [
          F(5, "açılış", "İki kutu", "Aktif vs pasif fiziksel. Pasife digitalWrite ≈ sessiz veya tık.", "Hangisinin osilatörü içeride?"),
          F(7, "anlatım", "Polarite ve pin", "+ işaretli bacak D6, diğer GND. tone() bu saat yasak (pasif uzatma).", "Şema."),
          F(18, "uygulama", "Bip kalıbı", "200 ms HIGH, 800 ms LOW. Sonra 3’lü SOS kaba.", "D6’da duyulur bip."),
          F(6, "paylaşım", "S7", "Kim kulağına götürdü — kuralı tekrar.", "Mesafe 30 cm."),
          F(4, "değerlendirme", "Aktif/pasif", "1 fark.", "Yazar."),
        ],
        keyPoints: [
          "Aktif = kare dalgayı kendi üretir; Arduino sadece besler.",
          "Pasif = hoparlör; tone(pin, 440) gerekir.",
          "Bazı aktifler LOW’da çalar (aktif LOW) — o zaman HIGH sessiz. 10 sn deneme.",
          "Motor gibi akım çekmez ama USB hoparlör cızırtısı normal.",
        ],
        steps: [
          "USB sök. Buzzer + → D6, − → GND.",
          "pinMode OUTPUT; 200 ms HIGH, 800 ms LOW.",
          "3 bip SOS kalıbı yükle.",
          "Ters polarite dene (yanmaz, susar), düzelt.",
          "Pasif varsa 1 dk tone(440) istasyonu; aktifle karıştırma.",
        ],
        code: {
          title: "Aktif buzzer bip",
          lang: "cpp",
          code: `const int BUZ = 6;

void setup() {
  pinMode(BUZ, OUTPUT);
}

void loop() {
  digitalWrite(BUZ, HIGH);
  delay(200);
  digitalWrite(BUZ, LOW);
  delay(800);
}`,
        },
        wiring: {
          title: "Aktif buzzer",
          items: ["D6 → buzzer +", "buzzer − → GND"],
        },
        troubleshooting: [
          { problem: "Ses yok", cause: "Pasif buzzer veya ters polarite veya aktif LOW", fix: "Poşeti kontrol; bacak çevir; LOW ile dene." },
          { problem: "Sürekli çığlık", cause: "loop’ta delay yok / sürekli HIGH", fix: "LOW süresi ekle." },
        ],
        exitTicket: ["Aktif buzzer neden tone() istemez?", "S7 kuralı nedir?"],
        support: "Öğretmen onaylı aktif buzzer; pasif masadan toplanır.",
        extension: "tone(8, 440, 200) pasif ile la notası — kulaklık yok, kısa.",
        ortaokul: "mBlock ‘play tone’ yerine ‘buzzer on’ aktif için.",
        lise: "tone / noTone, kare dalga %50.",
        homework: "Yok; ses şikayeti olmasın diye ev ödevi sessiz: alarm akış şeması.",
        tips: ["Lab bitişik sınıfa 8 buzzer cehennem — 3’er li nöbetle test, diğerleri USB sökük.", "Aktif LOW modelleri Çin kitlerinde sık; ‘HIGH sus, LOW çal’ notunu tahtaya yaz."],
        altArduino: "Ana iz.",
        altMbot: "Onboard buzzer playTone.",
        altSpike: "Hub speaker ‘beep’ / MIDI; polarite yok, S7 var.",
      }),
      H({
        hour: 2,
        title: "Buton + LDR alarm sistemi",
        aim: "Kurulu alarm: buton arm/disarm (toggle), karanlıkta buzzer. Akıllı ev provası.",
        outcomes: [
          "RK.6.12.2.1 Buton kenarıyla sistemi kurulu/değil yapar.",
          "RK.6.12.2.2 Kurulu ve karanlıksa buzzer çalar.",
          "RK.6.12.2.3 LED ile kurulu durumunu gösterir.",
          "RK.6.12.2.4 Akış şemasını kod satırlarıyla eşler.",
        ],
        materials: ["D2 buton", "A0 LDR", "D6 buzzer", "D8 LED durum"],
        prep: ["4’lü görev: ARM led, LDR eşik, buzzer, buton kenar. Kapsam: ‘çalışan demo’ — siren melodisi yok."],
        safety: ["USB kes, dört parçayı bağla.", "Alarm testini 5 sn ile sınırla."],
        flow: [
          F(5, "anımsama", "Kenar + eşik", "İki kural.", "Koro."),
          F(5, "anlatım", "Durum değişkeni", "bool armed. Buton kenar armed = !armed.", "Şema: iki if iç içe değil, ve."),
          F(22, "uygulama", "Birleşik kod", "Çiftli programlama, 11. dk değiş.", "Demo: kutu kapa + armed LED + bip."),
          F(4, "paylaşım", "Şema eşle", "armed satır no.", "Yazar."),
          F(4, "temizlik", "Sayım", "4 parça poşet.", "İmza."),
        ],
        keyPoints: [
          "Durum (armed) olmadan alarm ‘hep dinler’ — evde yaşanmaz.",
          "Buzzer’ı if (armed && dark) içine al; değilse LOW.",
          "Bu, hafta 13 maketinin yazılım iskeletidir.",
          "Kapsamı kes: SMS, Bluetooth yok.",
        ],
        steps: [
          "Kenar toggle → armed, D8 LED armed.",
          "LDR eşik → dark.",
          "if (armed && dark) buzzer bip; else LOW.",
          "Kutu testi 3 kez.",
          "Şemaya satır no.",
        ],
        code: {
          title: "Kuru alarm",
          lang: "cpp",
          code: `const int BTN = 2, LED = 8, BUZ = 6, LDR = A0;
const int ESIK = 500;
int last = HIGH;
bool armed = false;

void setup() {
  pinMode(BTN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZ, OUTPUT);
}

void loop() {
  int now = digitalRead(BTN);
  if (last == HIGH && now == LOW) {
    armed = !armed;
    delay(50);
  }
  last = now;
  digitalWrite(LED, armed ? HIGH : LOW);

  bool dark = analogRead(LDR) < ESIK;
  if (armed && dark) {
    digitalWrite(BUZ, HIGH);
    delay(80);
    digitalWrite(BUZ, LOW);
    delay(80);
  } else {
    digitalWrite(BUZ, LOW);
  }
}`,
        },
        wiring: {
          title: "Alarm seti",
          items: ["D2 buton GND", "A0 LDR bölücü", "D6 buzzer", "D8 LED 220 Ω"],
        },
        troubleshooting: [
          { problem: "Buzzer hep çalar", cause: "armed true başlamış veya eşik ters", fix: "armed=false; Serial eşik." },
          { problem: "Buton alarmı rastgele kurar", cause: "Kenar yok", fix: "Hafta 9B kodunu geri al." },
        ],
        exitTicket: ["armed değişkeni neden var?", "Hangi iki şart birlikte buzzer’ı açar?"],
        support: "armed’siz sadece karanlıkta bip — sonra birlikte armed ekle.",
        extension: "Kuru LED yanıp sönsün (armed ve değilken farklı tempo).",
        ortaokul: "mBlock iki ‘eğer’ ve bir değişken.",
        lise: "enum { DISARMED, ARMED, ALARM } durum makinesi.",
        homework: "Karton ev eskizi: kapı, pencere, LED konumu (hafta 13).",
        tips: ["4 kablolu masada renk disiplini ölürse 20 dk kayar — kırmızı 5V siyah GND sarı sinyal.", "Komşu sınıf için buzzer testini perdenin arkasına al."],
        altArduino: "Ana iz.",
        altMbot: "Button + light + buzzer aynı mantık.",
        altSpike: "Same; hub light + speaker.",
      }),
    ],
  },
  {
    week: 13,
    month: "Aralık / Ocak",
    dates: "28 Aralık 2026–1 Ocak 2027",
    semester: 1,
    unit: "Ara proje",
    title: "Akıllı ev: problem, karton maket, şema",
    why: "Parçalar ayrı ayrı çalışır; ev henüz yoktur. Mühendislik, kısıt altında bir senaryo seçmekle başlar. 1 Ocak Cuma tatil — planı Perşembe’ye sıkıştır.",
    prior: ["gece lambası", "alarm iskeleti", "trafik LED"],
    weekGoal: "Senaryo + kısıt yazar, karton maketi kurar, devre şemasını çizer; lehim yok.",
    hours: [
      H({
        hour: 1,
        title: "Senaryo, kısıt, karton ev",
        aim: "Takım bir ev problemi seçer (karanlık hol, kapı zili, hırsız) ve karton maketin odalarını keser.",
        outcomes: [
          "RK.7.13.1.1 En az bir kullanıcı + bir problem + bir başarı ölçütü yazar.",
          "RK.7.13.1.2 Eldeki malzeme kısıtını listeler (yeni parça yok).",
          "RK.7.13.1.3 Karton makette en az iki hacim (oda/hol) oluşturur.",
          "RK.7.13.1.4 1 Ocak tatil planını (kim neyi Perşembe bitirecek) yazar.",
        ],
        materials: ["karton, makas, bant, cetvel", "maket bıçağı yalnızca öğretmen", "A4 senaryo şablonu"],
        prep: ["Bıçağı sen kullan veya yasakla. Hazır kutu = 10 dk kazanç.", "Tatil notu tahtada."],
        safety: ["Maket bıçağı öğretmen masasında.", "Sıcak silikon varsa öğretmen, gözlük."],
        flow: [
          F(5, "açılış", "Kısıt", "Yeni alış yok. Eldeki: LED, buton, LDR, buzzer, Uno.", "Poşeti sayar."),
          F(8, "anlatım", "EDP 1 sayfa", "Kullanıcı, sorun, ölçüt (ör. ‘karanlıkta 2 sn’de yanar’).", "Şablonu doldurmaya başlar."),
          F(20, "uygulama", "Maket", "İki oda, pencere deliği LDR için, kapı butonu.", "Keser, bantlar, odaları adlandırır."),
          F(4, "paylaşım", "Tur", "2 maket göster.", "Bir ölçüt okur."),
          F(3, "değerlendirme", "Şablon teslim", "İmza.", "Verir."),
        ],
        keyPoints: [
          "Ölçüt sayısal olmazsa ‘çalışıyor’ tartışması bitmez.",
          "Üç özellik tuzak: bir çekirdek (lamba veya zil) + bir bonus.",
          "LDR pencereye, buton kapıya, buzzer çatıya — kablo yolu çiz.",
          "Cuma tatil: elektronik bağlama yok bu saat, maket bitsin.",
        ],
        steps: [
          "Şablon: kullanıcı, sorun, ölçüt, kısıt.",
          "Kartonu 12×12×8 cm civarı kutula.",
          "Pencere deliği, kapı çizgisi.",
          "Parça yerlerini kalemle işaretle.",
          "Cuma yoksa: ne evde yapılır (boya) yaz.",
        ],
        troubleshooting: [
          { problem: "Gösterişli villa", cause: "Kapsam şişmesi", fix: "Tek kat, iki oda, 20 dk kuralı." },
          { problem: "Bıçak isteği", cause: "Karton kalın", fix: "Öğretmen keser veya tavanı bantsız bırak." },
        ],
        exitTicket: ["Başarı ölçütünü birimli yaz.", "Cuma/Perşembe planın nedir?"],
        support: "Hazır kutu + şablon boşluk doldurma.",
        extension: "Engelli kullanıcı senaryosu (yüksek buton, sesli geri bildirim).",
        ortaokul: "Senaryo hikâye cümlesi.",
        lise: "Ölçüte tolerans: ‘2 sn ±0.5’.",
        homework: "Maketi evde boyamak serbest, elektronik yok.",
        tips: ["1 Ocak’ı saklama: veliye ‘Cuma kulüp yok’ notu hafta 12’de gitti mi bak.", "Sıcak silikon dumanı küçük odada birikmesin."],
        altArduino: "Maket Uno’yu evin ‘bodrumuna’ (yanına) koy, üstüne değil — USB kablo.",
        altMbot: "mBot ev değil ‘garaj’; senaryo yine ev aygıtı olabilir (hub içeride).",
        altSpike: "SPIKE brick evin jeneratörü; mekanizma kapı.",
      }),
      H({
        hour: 2,
        title: "Devre şeması ve görev bölüşümü",
        aim: "Fritzing/Tinkercad veya kâğıt şema + rol kartı: kim kablolar, kim kodlar, kim belgeler, kim sınar.",
        outcomes: [
          "RK.7.13.2.1 Tinkercad veya kâğıtta tam şemayı çizer (pin numaraları yazılı).",
          "RK.7.13.2.2 Hafta 14 için 4 rolü kişilere bağlar.",
          "RK.7.13.2.3 Yazılım iskeletini (armed, eşik, pin const) listeler.",
          "RK.7.13.2.4 Güvenlik kontrol listesini (USB, direnç, polarite) işaretler.",
        ],
        materials: ["PC Tinkercad", "pin listesi", "rol kartları"],
        prep: ["Hafta 12 alarm kodu örnek açık, kopyala-düşün serbest, kopyala-yapıştır değil: pinler makete uymalı."],
        safety: ["Bu saat enerji yok."],
        flow: [
          F(4, "anımsama", "Ölçüt", "Şablonu oku.", "Koro ölçüt."),
          F(6, "anlatım", "Şema kuralı", "Her kablonun iki ucu pin veya düğüm. Renk.", "Eksik şema örneği."),
          F(22, "uygulama", "Tinkercad + roller", "Şema + 4 rol imzası.", "Link/isim H13-Takım."),
          F(4, "paylaşım", "İki şema", "Pin çatışması (aynı D8 iki iş) avı.", "Düzeltir."),
          F(4, "değerlendirme", "Pin tablosu", "3 satır.", "Teslim."),
        ],
        keyPoints: [
          "Pin çatışması: LED ve buzzer aynı pin olmaz.",
          "GND yıldızı: tüm GND’ler Uno GND.",
          "Belgelendirici ‘sonra yazarım’ diyemez — şema bugün.",
          "Simülasyon çalışanı fizikselde yine kalibre edilir (LDR).",
        ],
        steps: [
          "Pin tablosu: buton D2, LED D8, buzzer D6, LDR A0, 5V, GND.",
          "Tinkercad’de aynı tablo (veya kâğıt şema, ortaokul).",
          "Dört rol imza: kurucu, kodlayıcı, belgelendirici, sınayıcı.",
          "Güvenlik 4 tik: USB yok, 220 Ω, PULLUP GND, buzzer polarite.",
          "Pin çatışması avı: aynı dijital pin iki işe gitmesin.",
        ],
        wiring: {
          title: "Hafta 14 hedef pinleri",
          items: [
            "D2 → buton → GND (INPUT_PULLUP)",
            "A0: 5V–LDR–A0–10k–GND",
            "D8 → 220 Ω → durum/gece LED → GND",
            "D6 → aktif buzzer + ; − → GND",
          ],
        },
        troubleshooting: [
          { problem: "Tinkercad’de ev yok", cause: "3D değil Circuits", fix: "Circuits; ev karton, simülasyon düz breadboard." },
          { problem: "Herkes kodlayıcı", cause: "Rol kaçışı", fix: "Hafta 14 notu: belge yoksa demo 0." },
        ],
        exitTicket: ["Üç pin numaranı yaz.", "Senin rolün?"],
        support: "Pin tablosu basılı, Tinkercad öğretmen kopyası remiks.",
        extension: "Yaya/kapı 2. buton, pin D4.",
        ortaokul: "Kâğıt şema yeterli, Tinkercad isteğe.",
        lise: "Tinkercad zorunlu + netlist.",
        homework: "1 Ocak sonrası: maket sağlam gelsin, parça evde sökülmesin.",
        tips: ["Cuma tatilse bu saati Çarşamba çiftleyemezsen şemayı ödev yap, maketi saat 1’de bitir.", "Şema fotoğrafını sen çek, kaybolan Tinkercad hesabı olmasın."],
        altArduino: "Ana iz.",
        altMbot: "Port eşlemesi tablosu (light, button, RGB).",
        altSpike: "Port A–F haritası fotoğraf.",
      }),
    ],
  },
  {
    week: 14,
    month: "Ocak",
    dates: "4–8 Ocak 2027",
    semester: 1,
    unit: "Ara proje",
    title: "Akıllı ev: LDR+buton+buzzer+LED entegrasyonu",
    why: "Ara değerlendirme ürünü bugün doğar. Entegrasyon, ayrı çalışan parçaların bir arada sucuk gibi durmasıdır.",
    prior: ["şema", "maket", "alarm iskeleti"],
    weekGoal: "Makette çalışan en az bir çekirdek işlev + belge (şema, kod, test 3 deneme).",
    hours: [
      H({
        hour: 1,
        title: "LDR + buton + LED + buzzer entegrasyonu",
        aim: "Şemadaki devreyi makete taşır, çekirdek işlevi 20 dk’da ayağa kaldırır.",
        outcomes: [
          "RK.7.14.1.1 USB’süz kablolamayı şemadan bire bir yapar.",
          "RK.7.14.1.2 Çekirdek işlevi (lamba veya alarm) çalıştırır.",
          "RK.7.14.1.3 Kabloyu evin ‘duvarından’ geçirir, gerilme payı bırakır.",
          "RK.7.14.1.4 Çalışmayanı 3 soruyla ayıklar (güç, kablo, kod).",
        ],
        materials: ["maket", "kit", "şema çıktısı", "bant"],
        prep: ["Kapsam kesme kartı: 25. dakikada çekirdek yoksa bonusu sil.", "Yedek 220 Ω ve jumper tepsi."],
        safety: ["USB son. LED direnç. Buzzer kulağa yok."],
        flow: [
          F(4, "anımsama", "Pin tablosu", "Defter.", "Okur."),
          F(4, "anlatım", "Sıra", "Kablo → kod iskelet → kalibrasyon. Tersi kaos.", "Sırayı yazar."),
          F(26, "uygulama", "Kur ve çalıştır", "Öğretmen turu 8 masa × 2 dk.", "Çekirdek demo hazır."),
          F(3, "paylaşım", "Tıkanma", "Bir sorun-çözüm.", "Not."),
          F(3, "değerlendirme", "Çekirdek tik", "Öğretmen evet/hayır.", "Alır."),
        ],
        keyPoints: [
          "25. dakikada ‘bir de şunu ekleyelim’ yok — kes.",
          "Gerilme payı: kapağı açınca D2 kopmasın.",
          "Kalibrasyon makette yeniden (karton ışığı keser).",
          "3 soru: yanıyor mu 5V LED test, kablo süreklilik, kod pin const.",
        ],
        steps: [
          "USB yok, şemadan kablo (D2 buton GND, A0 LDR bölücü, D8 LED 220 Ω, D6 buzzer).",
          "Hafta 12 iskelet kodu pin tablosuna uyarlayıp yükle.",
          "LDR eşiğini makette (karton gölgesi) yeniden al.",
          "Çekirdek işlevi 3 kez tekrarla (aydınlık / karanlık / buton).",
          "Öğretmen çekirdek tik’i; USB sökmeden kablo oynatma.",
        ],
        code: {
          title: "Çekirdek: gece lambası + zil (iskelet)",
          lang: "cpp",
          code: `const int BTN = 2, LED = 8, BUZ = 6, LDR = A0;
const int ESIK = 500; // makette yeniden ölç
int last = HIGH;
bool armed = false;

void setup() {
  pinMode(BTN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  pinMode(BUZ, OUTPUT);
}

void loop() {
  int now = digitalRead(BTN);
  if (last == HIGH && now == LOW) { armed = !armed; delay(50); }
  last = now;
  digitalWrite(LED, armed ? HIGH : LOW);
  if (armed && analogRead(LDR) < ESIK) {
    digitalWrite(BUZ, HIGH); delay(80);
    digitalWrite(BUZ, LOW); delay(80);
  } else {
    digitalWrite(BUZ, LOW);
  }
}`,
          notes: "Tek özellik (yalnız lamba) yeter: armed’i sil, if (analogRead < ESIK) LED. Bonus ikinci özellik tik’ten sonra.",
        },
        wiring: {
          title: "Maket entegrasyon",
          items: [
            "D2 → buton → GND (INPUT_PULLUP, kapı)",
            "5V – LDR – A0 – 10 kΩ – GND (pencere)",
            "D8 – 220 Ω – LED – GND",
            "D6 – aktif buzzer + ; − GND",
            "Uno USB dışarı, gerilme payı U kıvrım",
          ],
        },
        troubleshooting: [
          { problem: "Makette çalışmıyor, breadboard’da evet", cause: "Kopuk jumper / LDR gölgede değil", fix: "Kablo gerilme; eşiği yeniden." },
          { problem: "Kapsam şişti, hiçbir şey yok", cause: "İki özellik paralel", fix: "Bonus kablolarını sök, çekirdek." },
        ],
        exitTicket: ["Çekirdek işlev bir cümle.", "Makette yeni ESIK?"],
        support: "Öğretmenin hafta 12 kodunu pin tablosuna uyarlayarak ver.",
        extension: "İkinci özellik ancak çekirdek tik’ten sonra.",
        ortaokul: "Tek özellik zorunlu.",
        lise: "İki özellik + yorumlu fonksiyonlar.",
        homework: "Yok; maket okulda kalır, fotoğrafı öğretmen çeker.",
        tips: ["Turunu saate bağla, bir masada 8 dk kalma.", "Başarısız tik utanç değil, saat 2’nin girdisi."],
        altArduino: "Ana iz.",
        altMbot: "Modüller evin odalarına bant.",
        altSpike: "Brick dışarı, kablo gerilme payı.",
      }),
      H({
        hour: 2,
        title: "Test, hata ayıklama, belge",
        aim: "3 denemelik test tablosu, kod yorumu, şema fotoğrafı; rubrik ön izleme.",
        outcomes: [
          "RK.7.14.2.1 Üç senaryoyu (aydınlık, karanlık, buton) tabloya işler.",
          "RK.7.14.2.2 En az 4 yorum satırı ve pin const kullanır.",
          "RK.7.14.2.3 Şema-kod-maket tutarlılığını akran denetletir.",
          "RK.7.14.2.4 Rubrikte donanım ve belge maddelerini özdeğerlendirir (1–4).",
        ],
        materials: ["test tablosu", "rubrik kısaltması R2 R3", "telefon öğretmen fotoğraf"],
        prep: ["Akran çifti komşu masa. 6 dk denetim."],
        safety: ["Demo kısa buzzer."],
        flow: [
          F(4, "anımsama", "Ölçüt", "Şablon hafta 13.", "Okur."),
          F(16, "uygulama", "Üç deneme", "Tablo: beklenen / olan / not.", "Doldurur, kodu temizler."),
          F(10, "paylaşım", "Akran", "Şema vs pin, kablo rengi, yorum.", "Bir düzeltme."),
          F(6, "değerlendirme", "Öz 1–4", "R2 ve R3.", "Yazar."),
          F(4, "temizlik", "Foto + poşet", "Öğretmen çekimi.", "Maket dolaba adı yazılı."),
        ],
        keyPoints: [
          "‘Çalışıyor’ satır değildir; beklenen/olan vardır.",
          "Akran düşman değil, pin denetçisi.",
          "Hafta 15 sunum bu belgeden okunur, ezber değil.",
          "Maket isimsiz dolaba girerse kayıp sayılır.",
        ],
        steps: [
          "3 senaryo tablo.",
          "Yorum ve const.",
          "Komşu denetim.",
          "R2 R3 öznot.",
          "Foto, isim, dolap.",
        ],
        troubleshooting: [
          { problem: "Tablo boş, kod ‘bitmedi’", cause: "Saat 1 çekirdeksiz", fix: "Tek senaryo yaz, dürüst ‘kısmi’." },
          { problem: "Akran milisaniye tartışıyor", cause: "Ölçüt yok", fix: "Hafta 13 ölçütüne dön." },
        ],
        exitTicket: ["Bir beklenen/olan çifti yaz.", "R3 öz puanın ve gerekçe."],
        support: "Tabloya 3 satır basılı.",
        extension: "Hata günlüğü 3 satır (tarih, belirti, düzeltme).",
        ortaokul: "Özdeğerlendirme gülen yüz 1–4 değil kelime: başlangıç/yeterli.",
        lise: "Test tekrar sayısı 5, sapma notu.",
        homework: "3 dk sunum taslağı (sorun, çözüm, demo sırası).",
        tips: ["Fotoğraf senin arşivin; öğrenci telefonu yok kuralı duruyor.", "Kısmi ürünü de sergile — dürüstlük rubrikte iletişim."],
        altArduino: "Ana iz.",
        altMbot: "Aynı tablo.",
        altSpike: "Aynı tablo + port fotoğrafı.",
      }),
    ],
  },
  {
    week: 15,
    month: "Ocak",
    dates: "11–15 Ocak 2027",
    semester: 1,
    unit: "Dönem sonu",
    title: "Akran demo, rubrik, kod-şema denetimi",
    why: "Sergi provası 1. dönemde küçük yapılır. 3 dakika, bir demo, bir soru. Öğretmen konuşmaz, jüri gibi dinler.",
    prior: ["çalışan veya kısmi maket", "sunum taslağı"],
    weekGoal: "Her takım 3 dakikada sunar; akran ve öğretmen rubrik doldurur; kod-şema denetimi yapılır.",
    hours: [
      H({
        hour: 1,
        title: "3 dakikalık akran sunumu",
        aim: "8 takım × 3 dk + 1 dk geçiş = 32 dk; açılış ve kapanış payı ile 40.",
        outcomes: [
          "RK.8.15.1.1 Sorun–çözüm–demo sırasıyla 3 dakikayı tutar.",
          "RK.8.15.1.2 Demo’yu canlı yapar (video yedek, asıl değil).",
          "RK.8.15.1.3 Bir jüri sorusuna cevap verir.",
          "RK.8.15.1.4 Akran rubriğinde kanıt yazar (boş puan yok).",
        ],
        materials: ["süre tutucu", "akran rubrik 8 kopya", "sıra listesi kura"],
        prep: ["Kura çek, süre tahtada. 3:00’te alkış değil zil.", "Video yedek yalnızca donanım öldüyse."],
        safety: ["Kablolar koridora sarkmaz.", "Buzzer 1 bip demo."],
        flow: [
          F(2, "açılış", "Kural", "3 dk, 1 soru, alkış kısa. Rubrik 20-30-20-30.", "Sıra no öğrenir."),
          F(2, "anlatım", "İskelet", "Sorun 30 sn, çözüm 60, demo 60, soru 30.", "Kartına bakar."),
          F(32, "uygulama", "Sunum turu", "8×3 dk + geçiş. Öğretmen süre, akran kanıt yazar.", "Sunar veya dinler."),
          F(2, "değerlendirme", "Kâğıt topla", "İsim-takım kodu.", "Verir."),
          F(2, "paylaşım", "Bir iyi örnek", "Süre tutan takım.", "Not."),
        ],
        keyPoints: [
          "Demo canlı başarısız olursa 10 sn dur, söyle, yedek video — panik yok.",
          "Akran ‘güzel olmuş’ yazamaz; ‘ölçüt 2 sn, ölçtük 3’ yazılır.",
          "8 takım 32 dk sıkı — geçiş masayı taşımaz, gezersin.",
          "Konuşan iki kişi; belgelendirici afiş/defteri tutar.",
        ],
        steps: [
          "Kura sırası; kim sorun söyler, kim demo basar.",
          "3 dk: sorun 30 sn, çözüm 60, demo 60, soru 30.",
          "Akran kanıt satırı (ölçüt + gözlenen).",
          "Rubrik R1/R4 kutusunu işaretle — boş puan yok.",
          "Kâğıt teslim, USB sök.",
        ],
        troubleshooting: [
          { problem: "5. takımda süre bitti", cause: "Geçiş şişmesi", fix: "Soruyu kes, sonraki. Saat 2’ye sarkan 1 takım." },
          { problem: "Demo yok video var", cause: "USB unutulmuş", fix: "Yedek kabul, rubrikte donanım 2 tavan." },
        ],
        exitTicket: ["Bir akranın ölçülebilir kanıt cümlesi.", "Kendi süren doldu mu?"],
        support: "Konuşma kartı 4 madde.",
        extension: "Jüri sorusu veri istesin: ‘eşiğin kaçtı’.",
        ortaokul: "Karttan okuma serbest.",
        lise: "Kartan okuma puan düşer; göz teması.",
        homework: "Yok; saat 2 aynı gün.",
        tips: ["Sen konuşma, 3 sn sessizlik jüri gerçekliği.", "Zili telefon değil, fiziksel kum saati daha az tartışma."],
        altArduino: "Aynı.",
        altMbot: "Aynı.",
        altSpike: "Aynı.",
      }),
      H({
        hour: 2,
        title: "Kod-şema-devre denetimi",
        aim: "Öğretmen + akran mini denetim listesi: const, yorum, direnç, pull-up, pin çatışması.",
        outcomes: [
          "RK.8.15.2.1 Denetim listesinde 6 maddeden en az 4’ünü karşılar veya açık açık eksi yazar.",
          "RK.8.15.2.2 Kodda sihirli sayıyı const’a çeker.",
          "RK.8.15.2.3 Şema ile fiziksel pinleri eşler.",
          "RK.8.15.2.4 İyileştirme taahhüdü (hafta 16 öncesi 1 madde) yazar.",
        ],
        materials: ["denetim listesi 6 madde", "kalem kırmızı/yeşil"],
        prep: ["Liste: 1 const pin 2 yorum 3 220 Ω 4 PULLUP 5 GND ortak 6 eşik notu."],
        safety: ["Denetimde USB isteğe; kısa yoksa açık."],
        flow: [
          F(4, "anımsama", "R2 %30", "‘Çalışan ama şemasız’ hangi düzey? Gelişen (2).", "Koro."),
          F(5, "anlatım", "6 madde", "const, yorum, 220 Ω, PULLUP, ortak GND, eşik notu. Kanıt göster.", "Listeyi okur."),
          F(18, "uygulama", "Çift denetim", "9 dk ev sahibi, 9 dk misafir. USB sökerek düzelt.", "Kırmızı/yeşil tik + 1 taahhüt."),
          F(8, "paylaşım", "Sık eksi", "Çetele tahtada.", "Kendi eksisini işaretler."),
          F(5, "değerlendirme", "Taahhüt", "Hafta 16’ya 1 madde, imza.", "Yazar."),
        ],
        keyPoints: [
          "Eksik gizlemek 16. hafta pratikte yakalanır.",
          "Akran kırmızısı düşmanlık değil, kartı yakmamak.",
          "Taahhüt ölçülebilir: ‘D4 yorum ekle’ — ‘daha iyi yap’ değil.",
          "Bu saat notun %’si değil, 16’nın girdisi.",
        ],
        steps: [
          "USB sök. 6 maddeyi ev sahibi kendi kod-şema-kablosuna uygular.",
          "Misafir 9 dk doğrular (farklı göz).",
          "Sihirli sayıyı const’a çek, yükle, USB sök.",
          "1 ölçülebilir taahhüt yaz (pin/yorum/eşik).",
          "Çeteleye eksi türünü ekle.",
        ],
        troubleshooting: [
          { problem: "Her şey yeşil, kod boş", cause: "Arkadaşlık puanı", fix: "Öğretmen 2 rastgele maddeyi kendin aç." },
          { problem: "Tartışma", cause: "PULLUP vs 10k", fix: "İkisi de doğru; listede ‘giriş tanımlanmış mı?’." },
        ],
        exitTicket: ["Kırmızı bir madden.", "Taahhüdün."],
        support: "Liste resimli (direnç foto).",
        extension: "millis’e bir delay taşıma taahhüdü (lise).",
        ortaokul: "3 madde yeter, 6’dan seç.",
        lise: "6’nın hepsi + fonksiyon imzası.",
        homework: "Taahhüdü kodda yap, 16’da göster.",
        tips: ["Rastgele 2 masayı sen denetle, akran enflasyonu düşer.", "Çetele duvarda kalsın."],
        altArduino: "Aynı.",
        altMbot: "Liste: port etiketi, kablo sıkı, program adı.",
        altSpike: "Aynı + parça envanter.",
      }),
    ],
  },
  {
    week: 16,
    month: "Ocak",
    dates: "18–22 Ocak 2027",
    semester: 1,
    unit: "Dönem sonu",
    title: "3 dk sunum, mini pratik yoklama, 1. dönem portfolyosu",
    why: "1. dönem 22 Ocak Cuma kapanır. Portfolyo (şema, kod çıktısı, test, hedef) 2. dönemin bellek kartıdır. Mini pratik ‘kopya değil, transfer’ bakar.",
    prior: ["taahhüt", "maket", "güvenlik barajı hafta 2"],
    weekGoal: "Mini pratik geçer, 1. dönem klasörü teslim, 2. dönem motor uyarısını alır.",
    hours: [
      H({
        hour: 1,
        title: "Dönem sonu sunumları (kalan + seçilen)",
        aim: "Hafta 15’e sığmayan takımlar ve isteyen iyileştirilmiş demo; 3 dk kuralı aynı. Sertifika değil, sözlü geribildirim.",
        outcomes: [
          "RK.8.16.1.1 İyileştirme taahhüdünün kanıtını gösterir.",
          "RK.8.16.1.2 3 dakikayı tutar.",
          "RK.8.16.1.3 Öğretmen geribildirimini deftere geçer.",
          "RK.8.16.1.4 2. dönem ‘motor 5V değil’ kuralını duyar (ön izleme).",
        ],
        materials: ["süre", "geri bildirim yapışkan not"],
        prep: ["Sıra: önce 15’e sığmayanlar. Kalan süre isteğe bağlı 1 iyileştirme."],
        safety: ["Standart."],
        flow: [
          F(4, "açılış", "S3 fısıltı", "Motor Arduino 5V’den sürülmez — 2. dönem.", "Tekrarlar."),
          F(4, "anlatım", "3 dk + taahhüt", "Önce 15’e sığmayanlar; taahhüt kanıtı 20 sn.", "Sırasını öğrenir."),
          F(24, "uygulama", "Kalan sunumlar", "Aynı 3 dk kuralı, 1 soru.", "Sunar / dinler."),
          F(5, "paylaşım", "Yapışkan not", "Bir güç, bir sonraki adım.", "Deftere yapıştırır."),
          F(3, "değerlendirme", "Yoklama", "Klasör saat 2.", "Not."),
        ],
        keyPoints: [
          "İyileştirme yoksa yalan söyleme; ‘yapamadık çünkü süre’ kabul.",
          "S3’ü şimdi ekmek, Şubat’ta kart yanmasını keser.",
          "Sertifika Haziran’da; bugün belge.",
          "Veli videosu yok — KVKK, okul izni ayrı.",
        ],
        steps: [
          "Taahhüt kanıtı 20 sn (önce/sonra).",
          "3 dk demo; zilde dur.",
          "Yapışkan notu deftere yapıştır.",
          "S3 cümlesini koro: ‘motor 5V’den değil’.",
          "USB sök, maketi arka masaya, klasörü saat 2’ye bırak.",
        ],
        troubleshooting: [
          { problem: "Kimse iyileştirmedi", cause: "Sınav haftası", fix: "Dürüst not, pratik saat 2 asıl baraj." },
          { problem: "Sunum 3 dakikayı aşıyor", cause: "Hikâye", fix: "Zil; kes. Kalan cümle yapışkan nota." },
        ],
        exitTicket: ["S3’ü yaz.", "Bir sonraki adımın."],
        support: "Sunum kartı.",
        extension: "S3 için neden 200–400 mA pin toplamı sayısal.",
        ortaokul: "Kısa demo.",
        lise: "Akım sayıları.",
        homework: "Yok.",
        tips: ["Dönem sonu sınav gürültüsü: kulübü 8:00’e alan okullarda bu saati 35’e sıkıştır.", "Yapışkan not renk: yeşil güç, sarı adım."],
        altArduino: "Aynı.",
        altMbot: "S3 yerine ‘hub motor portu ayrı’.",
        altSpike: "Aynı, pil kutusu resmi.",
      }),
      H({
        hour: 2,
        title: "Mini pratik + 1. dönem klasörü",
        aim: "Bireysel 12 dakikalık istasyon: breadboard LED + buton PULLUP + 5 soruluk kâğıt. Klasör teslim.",
        outcomes: [
          "RK.8.16.2.1 Bireysel olarak LED+buton devresini 12 dk’da çalıştırır (baraj: yanar).",
          "RK.8.16.2.2 5 soruluk kavram kâğıdında %60+",
          "RK.8.16.2.3 Klasör: sözleşme, şema, kod, test, hedef.",
          "RK.8.16.2.4 Kiti sayar, eksik formunu doldurur.",
        ],
        materials: ["istasyon kâğıdı A/B", "klasör listesi", "envanter"],
        prep: ["Bireysel — takım yok. 8 istasyon döner veya hepsi aynı anda yeter malzeme varsa.", "Barajı geçemeyene 6 dk telafi köşesi."],
        safety: ["USB disiplin. Bireysel kablo karmaşası artar, tur sıkı."],
        flow: [
          F(3, "anlatım", "Baraj", "LED butonla yanacak. Kâğıt 5 soru.", "İstasyon no."),
          F(12, "değerlendirme", "Pratik", "Konuşma yok.", "Kurur, çağırır."),
          F(8, "değerlendirme", "Kâğıt", "Ohm, PULLUP, PWM pin, S3, eşik.", "Yazar."),
          F(10, "uygulama", "Klasör + sayım", "5 belge tik. Kit say.", "Teslim."),
          F(7, "paylaşım", "Telafi + kapanış", "Köşe. 2. dönem tarihi 8 Şubat.", "Not."),
        ],
        keyPoints: [
          "Bireysel pratik takım ‘ücretsiz yolcu’yu yakalar — amaç utandırmak değil, 2. dönem motorunda yalnız kalmasın.",
          "Klasör 2. dönem kaybını keser.",
          "Piller çıksın, korozyon yarıyıl tatilinde.",
          "8 Şubat HC-SR04; Tinkercad isteğe bağlı tatil ödevi (zorunlu değil).",
        ],
        steps: [
          "12 dk LED+buton.",
          "5 soru.",
          "Klasör 5 tik.",
          "Kit sayım, pil çıkar.",
          "Telafi köşe.",
        ],
        code: {
          title: "Pratik iskeleti (öğretmen masasında kapalı zarf)",
          lang: "cpp",
          code: `// Öğrenci kendi yazar. Beklenen minimum:
const int BTN = 2;
const int LED = 8;
void setup() {
  pinMode(BTN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}
void loop() {
  digitalWrite(LED, digitalRead(BTN) == LOW ? HIGH : LOW);
}`,
          notes: "Form B (lise): kenar toggle. INPUT_PULLUP unutan yüzen pine 6 dk gömer.",
        },
        wiring: {
          title: "Pratik A istasyonu (maket yok)",
          items: [
            "D2 → buton → GND (INPUT_PULLUP)",
            "D8 → 220 Ω → LED anot; katot GND",
            "Form B: LED D9 — kopya ayırımı",
          ],
        },
        troubleshooting: [
          { problem: "12 dk yetmedi", cause: "Kablo karmaşası", fix: "Yarı puan: şema doğru, yanmıyorsa 6 dk telafi." },
          { problem: "Kopya", cause: "Masa yakın", fix: "A/B pin: D8 vs D9." },
        ],
        exitTicket: ["Klasöründe eksik belge var mı?", "2. dönem ilk ders tarihi?"],
        support: "Pratikte resimli kablo kartı, kod boş.",
        extension: "Pratikte toggle iste (lise form B).",
        ortaokul: "Seviye LED (basılı yak), toggle değil.",
        lise: "Toggle + Serial bir satır.",
        homework: "Tatil: kiti eve yok. İsteğe Tinkercad park sensörü önizleme.",
        tips: ["Pilleri gerçekten çıkar — Şubat’ta sızdıran AA efsanesi gerçektir.", "Geçemeyen 1–2 kişiye 8 Şubat 10 dk ön kapı."],
        altArduino: "Ana iz.",
        altMbot: "Pratik: buton-LED onboard 8 dk + 5 soru.",
        altSpike: "Pratik: button–light 8 dk.",
      }),
    ],
  },
];
