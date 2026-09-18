import type { LessonHour } from "./types";

type Narrative = {
  eyebrow: string;
  story: string;
  teacherVoice: string;
};

const NARRATIVES: Array<{ match: RegExp; narrative: Narrative }> = [
  {
    match: /güvenlik|takım|workspace|zimmet/i,
    narrative: {
      eyebrow: "Atölyeye güvenli başlangıç",
      story:
        "Bu ders, öğrencinin yalnızca bir devre kurmasını değil, atölyede birlikte üretmenin sorumluluğunu üstlenmesini hedefler. Kurallar ezberletilmez; her kural, malzeme kaybını, kısa devreyi veya ekip içindeki belirsizliği önleyen gerçek bir çalışma alışkanlığı olarak uygulanır.",
      teacherVoice:
        "Önce sınıfta görmek istediğiniz davranışı kısa bir örnekle gösterin. Ardından öğrencilerin aynı davranışı kendi masalarında uygulamasını ve neden gerekli olduğunu kendi cümleleriyle açıklamasını isteyin.",
    },
  },
  {
    match: /algoritma|akış|döngü|blok/i,
    narrative: {
      eyebrow: "Fikri adıma ve karara dönüştürme",
      story:
        "Bu dersin odağı, robotu çalıştırmadan önce problemi anlaşılır bir sıraya koymaktır. Öğrenciler gündelik bir işi parçalara ayırırken aslında robotun izleyeceği talimatları tasarlar; sonra aynı mantığı koşul, tekrar ve akış şemasıyla görünür hâle getirir.",
      teacherVoice:
        "Öğrenciden doğrudan doğru cevabı istemek yerine, eksik veya hatalı bir adımı bulmasını isteyin. Bir algoritmanın neden çalışmadığını tartışmak, hazır bir algoritmayı kopyalamaktan daha kalıcı öğrenme sağlar.",
    },
  },
  {
    match: /ohm|led|breadboard|elektronik|tinkercad/i,
    narrative: {
      eyebrow: "Elektriği görünür hâle getirme",
      story:
        "Bu derste soyut elektrik kavramları, öğrencinin gözünün önünde ışığa dönüşen küçük bir devreyle anlam kazanır. Gerilim, akım ve direnç arasındaki ilişki; formül olarak kalmaması için önce tahmin edilir, sonra simülasyonda ve fiziksel devrede karşılaştırılır.",
      teacherVoice:
        "Her bağlantıdan önce öğrenciden akımın hangi yoldan ilerleyeceğini parmağıyla göstermesini isteyin. LED’in yanması sonucu, doğru düşünmenin kanıtı olarak ele alınmalı; yalnızca ‘çalıştı’ demekle yetinilmemelidir.",
    },
  },
  {
    match: /arduino|blink|mikrodenetleyici|trafik/i,
    narrative: {
      eyebrow: "Kodun fiziksel karşılığı",
      story:
        "Bu ders, öğrencinin yazdığı bir komutun gerçek dünyada ölçülebilir bir etki oluşturduğunu fark ettiği geçiş noktasıdır. Kartın pinleri, programın zaman akışı ve LED’in davranışı birlikte incelenerek kod ile donanım arasındaki ilişki somutlaştırılır.",
      teacherVoice:
        "Kodu yüklemeden önce öğrencilerden beklenen ışık sırasını ve süreyi tahmin etmelerini isteyin. Tahmin ile gözlem arasındaki fark, hata ayıklama konuşmasını kendiliğinden başlatır.",
    },
  },
  {
    match: /buton|potansiyometre|analog|ldr|ışık|buzzer|ses/i,
    narrative: {
      eyebrow: "Robotun çevreden bilgi alması",
      story:
        "Bu ders, robotun yalnızca komut bekleyen bir cihaz olmadığını gösterir: çevreden veri alır, bu veriyi yorumlar ve buna göre davranır. Öğrenciler dijital bir basış ile analog bir değişimin farkını ölçerek sensör verisinin neden kalibre edilmesi gerektiğini deneyimler.",
      teacherVoice:
        "Öğrencileri doğrudan kabloya yönlendirmeden önce ‘hangi ölçümü bekliyoruz?’ sorusunu yanıtlatın. Beklenen aralık tahtada görünür olduğunda, seri porttaki sayıların anlamı ve hatanın kaynağı daha kolay tartışılır.",
    },
  },
  {
    match: /mesafe|ultrasonik|park|servo|motor|L298|çizgi|şase|hareket/i,
    narrative: {
      eyebrow: "Ölçümden harekete",
      story:
        "Bu ders, sensör bilgisini fiziksel bir karara bağlar. Öğrenci önce ölçümün güvenilirliğini sınar, sonra eşik veya hız gibi bir karar kuralı belirler ve en sonunda motorun bu karara verdiği tepkiyi gözlemler.",
      teacherVoice:
        "Hareketli sistemi ilk denemede serbest bırakmayın. Önce masada, işaretlenmiş mesafelerde ve düşük hızda ölçüm–karar–eylem zincirini doğrulayın; ardından kapsamı kontrollü biçimde büyütün.",
    },
  },
  {
    match: /proje|akıllı ev|hackathon|prototip|entegrasyon|test|sergi|sunum|rapor/i,
    narrative: {
      eyebrow: "Fikri çalışan ürüne dönüştürme",
      story:
        "Bu ders, öğrencinin tek bir parçayı çalıştırmasından daha fazlasını ister: problemi tanımlamasını, kısıtları kabul etmesini ve kararlarını kanıtla savunmasını bekler. Tasarım, prototip, test ve anlatım aynı üretim döngüsünün parçaları olarak ele alınır.",
      teacherVoice:
        "Öğrencinin fikrini övmekle yetinmeyin; hangi varsayımı test ettiğini ve başarısız olursa neyi değiştireceğini sorun. Kısa hata günlüğü, projenin kusursuz görünmesinden daha değerli bir öğrenme kanıtıdır.",
    },
  },
];

const FALLBACK: Narrative = {
  eyebrow: "Uygulamalı robotik öğrenmesi",
  story:
    "Bu ders, kavramı kısa bir açıklama olarak bırakmak yerine öğrencinin gözlem, uygulama ve değerlendirme adımlarıyla anlamlandırmasını sağlar. Öğrenci önce ne beklediğini söyler, ardından kontrollü bir deneme yapar ve sonuçtan hareketle kendi açıklamasını geliştirir.",
  teacherVoice:
    "Dersi küçük bir tahminle başlatın; uygulama sırasında öğrencilerin kanıt toplamasını, kapanışta ise sonucu kendi cümleleriyle savunmasını isteyin.",
};

export function getLessonNarrative(hour: LessonHour): Narrative {
  return NARRATIVES.find(({ match }) => match.test(`${hour.title} ${hour.aim}`))?.narrative ?? FALLBACK;
}
