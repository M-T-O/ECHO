/**
 * YANKI (ECHO): 2045'e 5 Dakika
 * game.js - 5-Act Epic Cinematic Day Cycle, Surprise Emergent Acts & Dual Persona Engine
 * Pure Vanilla JavaScript. Zero external dependencies.
 */

(function () {
  'use strict';

  // --- DETERMINISTIC SEED & PRNG ENGINE (Mulberry32) ---
  function createRng(seedInt) {
    let s = (seedInt >>> 0) || 1337;
    return function () {
      let t = (s += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashSeedString(str) {
    let hash = 0;
    const cleanStr = String(str).toUpperCase().trim();
    for (let i = 0; i < cleanStr.length; i++) {
      hash = (hash << 5) - hash + cleanStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) || 8421;
  }

  function generateRandomSeedString() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `#YANKI-${num}`;
  }

  // --- 5-ACT SCENARIO POOLS (ADULT & STUDENT PERSONAS) ---
  const SCENARIO_POOLS = {
    // ==========================================
    // PERSPECTIVE 1: KENTLİ ÇALIŞAN (ADULT)
    // ==========================================
    adult: {
      personaId: 'adult',
      personaTitle: 'KENTLİ ÇALIŞAN',
      personaLore: 'Mesai baskısı, teslim tarihleri, anlık teslimat bağımlılığı ve kentsel yorgunluk.',

      // ACT 1: Şafak & Evin İçi (07:00 - 08:00)
      act1: [
        {
          id: 'adult_act1_cold_room',
          actTag: 'ACT 1 // 07:15',
          timeLabel: '2026 // 07:15',
          title: 'Şafak: Tıkanan Radyatör ve Soğuk Oda',
          svgId: 'svg-morning',
          narration: 'Gözlerini açtığında odanın buz kestiğini fark ettin; kalorifer peteği hava yapmış, borular buz gibi. Duştan yeni çıktın, için titriyor. İş kıyafetlerini giymek için sadece 15 dakikan var.',
          choices: [
            {
              key: 'A',
              title: 'Hızlı Sıcaklık: Fanlı Isıtıcıyı Aç',
              desc: 'Dolaptaki 2200W portatif ısıtıcıyı prize tak. Odayı 3 dakikada kavurucu ve kuru bir sıcaklığa boğ.',
              metrics: { eco: -10, comfort: +12, social: -4 },
              summary: 'Anlık yüksek elektrikli ısıtıcı kullanımı tercih edildi.'
            },
            {
              key: 'B',
              title: 'Katmanlı Uyum: Kalın Kazak ve Sıcak Çay',
              desc: 'Eski kalın yün kazağını üstüne çek. Mutfakta sıcak bir demlik su kaynatıp fincanın sıcaklığına sarıl.',
              metrics: { eco: +10, comfort: -4, social: +6 },
              summary: 'Doğal ısınma ve kalın giyinme uyumu tercih edildi.'
            }
          ]
        },
        {
          id: 'adult_act1_empty_fridge',
          actTag: 'ACT 1 // 07:35',
          timeLabel: '2026 // 07:35',
          title: 'Şafak: Boş Buzdolabı ve Sabah Açlığı',
          svgId: 'svg-morning',
          narration: 'Miden kazınıyor ama buzdolabında sadece kurumuş yarım somun ekmek ve biraz zeytin var. Masada çalışırken açlıktan dikkatinin dağılmasını istemiyorsun.',
          choices: [
            {
              key: 'A',
              title: 'Kapıya Paket: Sıcak Kruvasan ve Karton Kahve',
              desc: 'Uygulamadan tek tıkla sipariş ver. Motosikletli kurye 15 dakikada ambalajlı sıcak kahvaltıyı kapına bıraksın.',
              metrics: { eco: -10, comfort: +11, social: -5 },
              summary: 'Tek kullanımlık ambalajlı ekspres kahvaltı siparişi tercih edildi.'
            },
            {
              key: 'B',
              title: 'Dolaptakini Kurtar: Zeytinyağlı Çıtır Ekmek',
              desc: 'Kuru ekmeği tavada zeytinyağı ve kekikle çıtırdat. Kendi hazırladığın sade ve telaşsız kahvaltıyı yap.',
              metrics: { eco: +10, comfort: -4, social: +7 },
              summary: 'Evdeki gıdayı değerlendiren sıfır atık sabahı tercih edildi.'
            }
          ]
        }
      ],

      // ACT 2: Sabah Yolu & Ulaşım (08:15 - 09:30)
      act2: [
        {
          id: 'adult_act2_rainy_commute',
          actTag: 'ACT 2 // 08:20',
          timeLabel: '2026 // 08:20',
          title: 'Sabah Yolu: Yağmurlu Sunum Sabahı',
          svgId: 'svg-morning',
          narration: 'Şirketin çeyrek dönem sunumuna sadece yarım saat var. Dışarıda puslu, ıslak bir İstanbul sabahı. Kapının önündesin; zihnin günün stresini taşımaya başladı bile.',
          choices: [
            {
              key: 'A',
              title: 'Zamanı Satın Al: Araç Çağır',
              desc: 'Arka koltuğun sessizliğinde dizüstü bilgisayarı aç, sunum slaytlarını gözden geçir, zihnini toparla.',
              metrics: { eco: -11, comfort: +12, social: -5 },
              summary: 'Araç çağırma ve kişisel konfor alanı tercih edildi.'
            },
            {
              key: 'B',
              title: 'Sabahın Ayazına Çık: Metroya Yürü',
              desc: 'Ceketinin yakasını kaldır, kulaklığı tak. Islak kaldırım taşlarında tempolu 12 dakikalık yürüyüşle zihnini aç.',
              metrics: { eco: +11, comfort: -5, social: +8 },
              summary: 'Toplu taşıma ve kentsel yürüyüş ritmi tercih edildi.'
            }
          ]
        },
        {
          id: 'adult_act2_coffee_rush',
          actTag: 'ACT 2 // 08:45',
          timeLabel: '2026 // 08:45',
          title: 'Sabah Yolu: İstasyon Çıkışı Kahve Kuyruğu',
          svgId: 'svg-morning',
          narration: 'İstasyondan çıktın, ofise 5 dakika var. Köşedeki ünlü zincir kahvecinin önünde kuyruk var; plastik kapaklı karton bardaklar hızla el değiştiriyor.',
          choices: [
            {
              key: 'A',
              title: 'Kuyruğa Gir: Plastik Kapaklı Büyük Boy Kahve',
              desc: 'Güne enerjik başlamak için sıraya gir. Yürürken elinde taşıyıp ofise girerken yudumla.',
              metrics: { eco: -10, comfort: +10, social: -4 },
              summary: 'Tek kullanımlık bardaklı kahve tüketimi tercih edildi.'
            },
            {
              key: 'B',
              title: 'Ofisi Bekle: Kendi Kupanda Demle',
              desc: 'Sırayı pas geç, ofis mutfağındaki cam cezveyi kullanarak kendi porselen kupanda sade kahve hazırla.',
              metrics: { eco: +10, comfort: -3, social: +7 },
              summary: 'Ofis mutfağında kalıcı kupayla sıfır atık kahve tercih edildi.'
            }
          ]
        }
      ],

      // ACT 3: Gün Ortası & Tüketim (12:30 - 14:00)
      act3: [
        {
          id: 'adult_act3_lunch_rush',
          actTag: 'ACT 3 // 12:45',
          timeLabel: '2026 // 12:45',
          title: 'Günün Ortası: 30 Dakikalık Mola ve Yemek',
          svgId: 'svg-afternoon',
          narration: 'Toplantı sarktı, öğle molasına sadece yarım saat kaldı. Masanın üzerinde bekleyen e-posta yığını büyüyor.',
          choices: [
            {
              key: 'A',
              title: 'Masaya Sıcak Kurye: Plastik Kutulu Menü',
              desc: 'Tek kullanımlık plastik ambalaj ve şeffaf çatal-bıçakla 10 dakikada karnını doyurup hemen ekrana dön.',
              metrics: { eco: -11, comfort: +11, social: -5 },
              summary: 'Plastik ambalajlı hızlı paket servis tercih edildi.'
            },
            {
              key: 'B',
              title: 'Sokağa İn: Köşedeki Esnaf Lokantası',
              desc: 'Ekranı kilitle, aşağı in. Porselen tabakta sıcak günün çorbasını iç, garsonla selamlaş, zihnini dinlendir.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              summary: 'Yerel lokantada oturarak sıfır ambalajlı yemek tercih edildi.'
            }
          ]
        },
        {
          id: 'adult_act3_ac_war',
          actTag: 'ACT 3 // 13:30',
          timeLabel: '2026 // 13:30',
          title: 'Günün Ortası: Açık Ofiste Derece Çatışması',
          svgId: 'svg-afternoon',
          narration: 'Öğle sonrası ofis havası ağırlaştı. Karşı masadaki ekip arkadaşın klimayı 17 dereceye alıp menfezleri kökledi. Birkaç kişi hırkalarına sarılırken ortam gergin.',
          choices: [
            {
              key: 'A',
              title: 'Tartışmaya Girme: Kendi Ekranına Gömül',
              desc: 'Klimanın dondurucu uğultusuna aldırma, üzerine montunu çekip kulaklığı tak, kimseyle ters düşme.',
              metrics: { eco: -9, comfort: +8, social: -7 },
              summary: 'Ofis içi iklim gerginliğinde çekimser kalınarak aşırı tüketime uyuldu.'
            },
            {
              key: 'B',
              title: 'Uzlaşma Öner: Karşılıklı Pencereleri Açtır',
              desc: 'Klimayı kapatmayı ve binanın rüzgar alan karşılıklı camlarını aralamayı teklif et; doğal hava koridoru oluştur.',
              metrics: { eco: +11, comfort: -3, social: +9 },
              summary: 'Doğal havalandırma ve ofis içi kolektif uzlaşma sağlandı.'
            }
          ]
        }
      ],

      // ACT 4: Gün Batımı & Çıkış Telaşı (16:30 - 19:30)
      act4: [
        {
          id: 'adult_act4_blazer',
          actTag: 'ACT 4 // 17:15',
          timeLabel: '2026 // 17:15',
          title: 'Akşamüstü: Kokteyl Daveti & Sökük Astar',
          svgId: 'svg-afternoon',
          narration: 'Telefonuna anlık bildirim düştü: Akşam şirketin önemli bir kokteyli var. Dolabındaki tek kaliteli blazer ceketin kol astarı sökülmüş ve düğmesi sallanıyor.',
          choices: [
            {
              key: 'A',
              title: 'Tek Tıkla Yeni Sipariş: 2 Saatte Teslim',
              desc: 'Hızlı moda uygulamasından aynı gün teslimatlı ucuz sentetik şık bir ceket sipariş et, kurye masana getirsin.',
              metrics: { eco: -12, comfort: +12, social: -7 },
              summary: 'Aynı gün teslimatlı hızlı moda ürünü tercih edildi.'
            },
            {
              key: 'B',
              title: 'Mesai Çıkışı Koştur: Mahalle Terzisi',
              desc: 'Ofisten 15 dakika erken çıkıp ara sokaktaki yaşlı terziye uğra; astarı diktirip düğmeyi sağlamlaştır.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              summary: 'Mahalle esnafında giysi onarımı tercih edildi.'
            }
          ]
        },
        {
          id: 'adult_act4_coffee_takeaway',
          actTag: 'ACT 4 // 18:30',
          timeLabel: '2026 // 18:30',
          title: 'Akşamüstü: Mesai Çıkışı Baş Ağrısı',
          svgId: 'svg-afternoon',
          narration: 'Monitör karşısında geçen 8 saatin ardından şakakların zonkluyor. Eve dönüş yolunda bir takviyeye ihtiyacın var.',
          choices: [
            {
              key: 'A',
              title: 'Plastik Bardaklı Şekerli Soğuk İçecek',
              desc: 'Kaldırımdaki kafeden kalın plastik bardaklı, dev plastik pipetli tatlı bir kahve alıp yürürken iç.',
              metrics: { eco: -10, comfort: +10, social: -4 },
              summary: 'Tek kullanımlık plastik pipetli içecek tüketildi.'
            },
            {
              key: 'B',
              title: 'Meyve Tezgâhından Bir Mandalina Al',
              desc: 'Köşedeki manavdan taze bir mandalina al; parmaklarınla soyarken kokusuyla ferahla, ambalajsız ve sade bir an yaşa.',
              metrics: { eco: +10, comfort: -3, social: +8 },
              summary: 'Yerel manavdan ambalajsız doğal atıştırmalık seçildi.'
            }
          ]
        }
      ],

      // ACT 5: Gece Yarısı & Günün Muhasebesi (21:00 - 23:45)
      act5: [
        {
          id: 'adult_act5_evening_escape',
          actTag: 'ACT 5 // 21:30',
          timeLabel: '2026 // 21:30',
          title: 'Gece Yarısı: Ağırlaşan Zihin ve Kapanış',
          svgId: 'svg-night',
          narration: 'Saat 21:30. Eve döndün, omuzların kaskatı. Beynin gün boyu gelen bildirimlerden uğulduyor. Evin havası basık ve durgun.',
          choices: [
            {
              key: 'A',
              title: 'Dijital Sığınak: Klima & 4K Dizi Maratonu',
              desc: 'Klimayı aç, perdeleri kapat, 4K ekran karşısında beynini sabaha kadar uyuşturacak bir diziye gömül.',
              metrics: { eco: -12, comfort: +14, social: -6 },
              summary: 'Yüksek enerjili dijital konfor sığınağı tercih edildi.'
            },
            {
              key: 'B',
              title: 'Sokağın Çağrısı: Telefonu Bırakıp Yürü',
              desc: 'Telefonu şarjda bırak, kapıyı çek. Gece esintisinde sahile ve parka doğru amaçsız 20 dakikalık bir yürüyüşe çık.',
              metrics: { eco: +13, comfort: -5, social: +8 },
              summary: 'Teknolojiden uzaklaşılarak gece yürüyüşü tercih edildi.'
            }
          ]
        },
        {
          id: 'adult_act5_flash_sale',
          actTag: 'ACT 5 // 22:45',
          timeLabel: '2026 // 22:45',
          title: 'Gece Yarısı: Ekran Işığı ve Gece İndirimi',
          svgId: 'svg-night',
          narration: 'Saat 22:45. Yatakta uyku tutmadı. Ekranda gezinirken "Sadece Bu Gece: %70 İndirimli Akıllı Ev Ürünü" bildirimi parlıyor. İhtiyacın yok ama fiyatı cezbedici.',
          choices: [
            {
              key: 'A',
              title: 'Satın Al Tuşuna Dokun: Anlık Rahatlama',
              desc: 'Kart bilgilerini onayla. Yarın kapına gelecek o kargonun getireceği küçük heyecanı satın al.',
              metrics: { eco: -11, comfort: +12, social: -6 },
              summary: 'Gece yarısı dürtüsel online alışveriş yapıldı.'
            },
            {
              key: 'B',
              title: 'Ekranı Karart: Balkona Çıkıp Hava Al',
              desc: 'Telefonu ters çevirip komodine koy. Balkon kapısını arala, gecenin serinliğinde yıldızları ve kenti dinle.',
              metrics: { eco: +11, comfort: -4, social: +7 },
              summary: 'Dürtüsel tüketim bastırılarak gece havası solundu.'
            }
          ]
        }
      ]
    },

    // ==========================================
    // PERSPECTIVE 2: GENÇ ÖĞRENCİ (STUDENT)
    // ==========================================
    student: {
      personaId: 'student',
      personaTitle: 'GENÇ ÖĞRENCİ',
      personaLore: 'Okul telaşı, akran baskısı, harçlık kısıtı, popüler tüketim trendleri ve geleceğin sorumluluğu.',

      // ACT 1: Şafak & Hazırlık (07:15 - 08:00)
      act1: [
        {
          id: 'student_act1_bus_rush',
          actTag: 'ACT 1 // 07:30',
          timeLabel: '2026 // 07:30',
          title: 'Şafak: Servis Kornası ve İlk Ders Sınav',
          svgId: 'svg-morning',
          narration: 'Alarmı iki kez erteledin. Servis şoförü sokakta kornaya basıyor. İlk ders matematik sınavı var ve zihnin henüz açılmadı. Çantanı kapıp kapıdan fırlıyorsun.',
          choices: [
            {
              key: 'A',
              title: 'Bakkaldan Kap: Paketli Çörek & Pipetli Süt',
              desc: 'Serviste hızlıca atıştır, ambalajı çantana tıkıp arka sırada sınav formüllerini tekrarla.',
              metrics: { eco: -10, comfort: +11, social: -5 },
              summary: 'Tek kullanımlık ambalajlı pratik atıştırmalık tercih edildi.'
            },
            {
              key: 'B',
              title: 'Evden Kap: Elma ve Çelik Matara Suyu',
              desc: 'Masadaki elmayı cebine at, çelik matarana musluktan su doldur, servise telaşsız bin.',
              metrics: { eco: +11, comfort: -4, social: +7 },
              summary: 'Evden matara ve taze meyveyle sıfır atık sabahı yapıldı.'
            }
          ]
        },
        {
          id: 'student_act1_heavy_book',
          actTag: 'ACT 1 // 07:20',
          timeLabel: '2026 // 07:20',
          title: 'Şafak: Ağır Çanta ve Yeni Soru Bankası',
          svgId: 'svg-morning',
          narration: 'Öğretmen bugün 400 sayfalık kalın kuşe kağıtlı yeni soru bankasını derse getirmeyenleri uyaracağını söyledi. Çantan omuzlarını ezecek kadar ağır.',
          choices: [
            {
              key: 'A',
              title: 'Kırtasiyeden Sıfır Kitap Satın Al',
              desc: 'Her dönem başında olduğu gibi jelatinli yeni parlak baskı kitabı masana koy, harçlığını harca.',
              metrics: { eco: -10, comfort: +11, social: -4 },
              summary: 'Jelatinli sıfır kağıt soru bankası satın alındı.'
            },
            {
              key: 'B',
              title: 'Üst Sınıf Komşudan İkinci El Kitap İste',
              desc: 'Geçen yıl mezun olan komşu abiden kalan yıpranmış ama tertemiz çözümlü kitabı ödünç al.',
              metrics: { eco: +11, comfort: -4, social: +8 },
              summary: 'İkinci el kitap döngüsü tercih edildi.'
            }
          ]
        }
      ],

      // ACT 2: Okul Yolu & Sabahın Ritmi (08:15 - 08:50)
      act2: [
        {
          id: 'student_act2_rainy_walk',
          actTag: 'ACT 2 // 08:15',
          timeLabel: '2026 // 08:15',
          title: 'Okul Yolu: Yağmur ve Arkadaş Grubu',
          svgId: 'svg-morning',
          narration: 'Dışarıda ince bir yağmur var. Okula 15 dakikalık yürüme mesafesindesin. Baban arabayla bırakmayı teklif ediyor ama okul yolu sabah trafiğinde kilit.',
          choices: [
            {
              key: 'A',
              title: 'Arabanın Sıcak Koltuğuna Atla',
              desc: 'Trafikte tampon tampona 20 dakika radyo dinleyerek tam okul kapısının önüne kadar git.',
              metrics: { eco: -11, comfort: +12, social: -5 },
              summary: 'Kısa mesafe için bireysel araçla okul ulaşımı seçildi.'
            },
            {
              key: 'B',
              title: 'Yağmurluğu Giy: Arkadaşlarla Yürü',
              desc: 'Kapüşonu çek, sokak başında bekleyen sınıf arkadaşlarına katıl, su birikintilerini aşarak yürü.',
              metrics: { eco: +11, comfort: -4, social: +8 },
              summary: 'Arkadaşlarla yürüyerek kentsel hareketlilik tercih edildi.'
            }
          ]
        },
        {
          id: 'student_act2_bus_card',
          actTag: 'ACT 2 // 08:35',
          timeLabel: '2026 // 08:35',
          title: 'Okul Yolu: Duraktaki Tek Kullanımlık Bilet',
          svgId: 'svg-morning',
          narration: 'Belediye otobüsü durağındasın. Öğrenci kartını evde unuttuğunu fark ettin. Büfede tek kullanımlık plastik manyetik kartlar satılıyor.',
          choices: [
            {
              key: 'A',
              title: 'Büfeden Tek Kullanımlık Manyetik Kart Al',
              desc: 'Otobüsü kaçırmamak için hemen plastik kaplı tek binişlik kartı alıp turnikeden geç.',
              metrics: { eco: -9, comfort: +9, social: -4 },
              summary: 'Tek kullanımlık bilet plastik atığı üretildi.'
            },
            {
              key: 'B',
              title: 'Sıradaki Birinden Kartını Basmasını Rica Et',
              desc: 'Nezaketle sıradaki yolcudan kart basmasını rica et, parasını elden vererek gereksiz plastik kart alımını önle.',
              metrics: { eco: +10, comfort: -3, social: +8 },
              summary: 'Toplumsal dayanışmayla tek kullanımlık bilet önlendi.'
            }
          ]
        }
      ],

      // ACT 3: Gün Ortası & Kantin Baskısı (12:30 - 14:00)
      act3: [
        {
          id: 'student_act3_viral_drink',
          actTag: 'ACT 3 // 12:45',
          timeLabel: '2026 // 12:45',
          title: 'Günün Ortası: Kantindeki Viral Plastik Şişe',
          svgId: 'svg-afternoon',
          narration: 'Öğle zili çaldı. Kantinde herkes sosyal medyada viral olan, renkli neon plastik kılıflı ithal içeceğin etrafına üşüşmüş durumda.',
          choices: [
            {
              key: 'A',
              title: 'Akımdan Geri Kalma: Harçlığı Çıkar',
              desc: 'Sıraya gir, o renkli plastik şişeyi eline alıp arkadaş grubundaki sohbetin ve fotoğrafın parçası ol.',
              metrics: { eco: -11, comfort: +10, social: -5 },
              summary: 'Akran baskısıyla viral plastik ambalajlı içecek alındı.'
            },
            {
              key: 'B',
              title: 'Kuyruğu Boşver: Bahçede Maça Koş',
              desc: 'Tüketim kuyruğundan çık, bahçede ceketlerden kale kuran arkadaşlarına katılıp topun peşinde terle.',
              metrics: { eco: +11, comfort: -4, social: +8 },
              summary: 'Tüketim hevesi yerine fiziksel oyun ve spor seçildi.'
            }
          ]
        },
        {
          id: 'student_act3_canteen_tray',
          actTag: 'ACT 3 // 13:10',
          timeLabel: '2026 // 13:10',
          title: 'Günün Ortası: Yemekhane ve Köpük Tabak',
          svgId: 'svg-afternoon',
          narration: 'Kantin yemekhanesinde sıcak yemek sırasındasın. Görevli yemeği tek kullanımlık köpük tabakta ve şeffaf naylon çatal-bıçakla uzatıyor.',
          choices: [
            {
              key: 'A',
              title: 'Köpük Tabağı Al: Masaya Otur',
              desc: 'Zil çalmadan hızlıca ye, kalkarken köpük tabağı ve plastik çatalı çöpe fırlat, vakit kaybetme.',
              metrics: { eco: -10, comfort: +9, social: -4 },
              summary: 'Tek kullanımlık köpük tabak ve plastik çatal kullanıldı.'
            },
            {
              key: 'B',
              title: 'Kendi Yıkanabilir Çatalını Çıkar',
              desc: 'Çantandaki çelik kamp çatalını çıkar; görevliden porselen tabak rica ederek plastik atığını reddet.',
              metrics: { eco: +11, comfort: -3, social: +7 },
              summary: 'Kendi çatalını kullanarak tek kullanımlık plastik reddedildi.'
            }
          ]
        }
      ],

      // ACT 4: Okul Çıkışı & Boş Zaman (16:00 - 18:30)
      act4: [
        {
          id: 'student_act4_mall_vs_park',
          actTag: 'ACT 4 // 16:30',
          timeLabel: '2026 // 16:30',
          title: 'Okul Çıkışı: AVM mi, Mahalle Parkı mı?',
          svgId: 'svg-afternoon',
          narration: 'Sınıf arkadaşların okul çıkışında: "Hadi büyük AVM\'ye gidelim, klimalı katta bir şeyler içer, mağazaları turlarız" diyorlar.',
          choices: [
            {
              key: 'A',
              title: 'AVM Kalabalığına Karış: Plastik Bardakla Gez',
              desc: 'Yapay ışıklar altında saatlerce mağazalarda turlayıp plastik kaplı tatlı içeceklerle vakit öldür.',
              metrics: { eco: -11, comfort: +11, social: -5 },
              summary: 'AVM ve tek kullanımlık içecek tüketimi seçildi.'
            },
            {
              key: 'B',
              title: 'Parkta Oturmayı Öner: Çimlere Yayılın',
              desc: 'Arkadaşları ikna et; okulun yanındaki eski çınar ağacının altına oturup gitar dinleyerek sohbet edin.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              summary: 'Doğal park alanı ve açık hava arkadaşlığı seçildi.'
            }
          ]
        },
        {
          id: 'student_act4_science_project',
          actTag: 'ACT 4 // 17:30',
          timeLabel: '2026 // 17:30',
          title: 'Okul Çıkışı: Fen Projesi Malzemeleri',
          svgId: 'svg-afternoon',
          narration: 'Haftaya fen fuarı var. Proje ortağın "İnternetten 400 liralık hazır plastik maket kiti sipariş edelim, hiç uğraşmayalım" diyor.',
          choices: [
            {
              key: 'A',
              title: 'Siparişi Onayla: Zahmetsiz Not',
              desc: 'Kutuda hazır gelen plastik parçaları birleştirip projeyi 20 dakikada bitirmenin kolaylığını seç.',
              metrics: { eco: -11, comfort: +11, social: -5 },
              summary: 'Hazır plastik proje kiti sipariş edildi.'
            },
            {
              key: 'B',
              title: 'Karton ve Atıklardan Kendin Yap',
              desc: 'Evdeki eski koli kartonlarını, kapakları ve telleri topla; el emeğiyle çalışan bir prototip üret.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              summary: 'Atık malzemelerden dönüştürülmüş özgün proje yapıldı.'
            }
          ]
        }
      ],

      // ACT 5: Gece & Kapanış (20:30 - 23:00)
      act5: [
        {
          id: 'student_act5_pc_vs_bike',
          actTag: 'ACT 5 // 20:30',
          timeLabel: '2026 // 20:30',
          title: 'Gece: RGB Işıklar ve 650W Ekran Kartı',
          svgId: 'svg-night',
          narration: 'Ödevler bitti. Odanın kapısı aralık, bilgisayarın güç ışığı yanıp sönüyor. Discord\'da tüm takım seni oyuna çağırıyor.',
          choices: [
            {
              key: 'A',
              title: 'Ekran Başı: Sabaha Kadar Online Oyun',
              desc: 'Odayı karart, yüksek güç tüketimli oyun bilgisayarı başında gece yarılarına kadar ekrana gömül.',
              metrics: { eco: -12, comfort: +13, social: -6 },
              summary: 'Oyun bilgisayarı başında yüksek enerjili ekran seansı seçildi.'
            },
            {
              key: 'B',
              title: 'Bisiklete Atla: Sahilde Gece Turu',
              desc: 'Eski bisikleti bodrumdan çıkar. Rüzgar yüzüne vururken sahil yolunda pedalla, zihnini dinlendir.',
              metrics: { eco: +12, comfort: -4, social: +8 },
              summary: 'Ekrandan uzaklaşılarak açık hava bisiklet turu seçildi.'
            }
          ]
        },
        {
          id: 'student_act5_night_scroll',
          actTag: 'ACT 5 // 22:15',
          timeLabel: '2026 // 22:15',
          title: 'Gece: Yatakta Mavi Işık ve Sonsuz Akış',
          svgId: 'svg-night',
          narration: 'Yatağa yattın ama uyku yok. Telefonun ekranında videolar ardı ardına akıyor, odadaki tüm prizler şarj aletleriyle dolu.',
          choices: [
            {
              key: 'A',
              title: 'Sabaha Kadar Kaydır: Sonsuz Algoritma',
              desc: 'Uykun gelene kadar ekrandaki hızlı videolara kapıl, telefon elinden düşene kadar açık kalsın.',
              metrics: { eco: -10, comfort: +10, social: -5 },
              summary: 'Gece boyu pasif ekran ve şebeke tüketimi sürdürüldü.'
            },
            {
              key: 'B',
              title: 'Telefonu Başucundan Kaldır: Kitap Aç',
              desc: 'Telefonu odanın diğer ucundaki masaya koy. Başucundaki loş lambayı yakıp birkaç sayfa roman oku.',
              metrics: { eco: +10, comfort: -3, social: +6 },
              summary: 'Dijital detoks ve bilinçli gece dinlenmesi seçildi.'
            }
          ]
        }
      ]
    }
  };

  // --- SURPRISE EMERGENT MICRO-ACTS POOL (SPRINKLED BY SEED RNG) ---
  const SURPRISE_ACTS_POOL = [
    {
      id: 'surprise_broken_pipe',
      actTag: 'SÜRPRİZ KESİŞME // 10:15',
      timeLabel: '2026 // 10:15',
      title: 'Yoldaki Kırılma: Park Köşesindeki Patlak Vana',
      svgId: 'svg-morning',
      narration: 'Parkın kenarındaki belediye sulama hattının vanası çatlamış; berrak şebeke suyu asfalta ve mazgala oluk oluk boşa akıyor. Çevrede senden başka kimse yok. Hava serin.',
      choices: [
        {
          key: 'A',
          title: 'Geç Git: Belediyenin Sorumluluğu',
          desc: 'Günün telaşıyla ellerini ıslatma; nasılsa belediye ekipleri fark edip tamir eder.',
          metrics: { eco: -12, comfort: +6, social: -10 },
          summary: 'Sokakta boşa akan su hattı görmezden gelindi.'
        },
        {
          key: 'B',
          title: 'Eğil ve Müdahale Et: Vanayı Sık',
          desc: 'Kıyafetinin ıslanmasını göze alarak eğil, paslı demir kolu zorlayarak hattı kapat ve su israfını kes.',
          metrics: { eco: +14, comfort: -5, social: +12 },
          summary: 'Bozuk vana kapatılarak sokak kaynağı kurtarıldı.'
        }
      ]
    },
    {
      id: 'surprise_idling_car',
      actTag: 'SÜRPRİZ KESİŞME // 14:40',
      timeLabel: '2026 // 14:40',
      title: 'Yoldaki Kırılma: Rölantide Çalışan Kurye Aracı',
      svgId: 'svg-afternoon',
      narration: 'Dar sokakta park etmiş bir kurye minibüsü, içi boş olmasına rağmen motoru ve kliması açık halde rölantide duman salıyor. Şoför az ilerideki binadan çıkmak üzere.',
      choices: [
        {
          key: 'A',
          title: 'Adımlarını Hızlandır: Başını Ağrıtma',
          desc: 'Şehirde her gün binlerce araç böyle çalışıyor, şoförle münakaşaya girmeye gerek yok.',
          metrics: { eco: -10, comfort: +5, social: -8 },
          summary: 'Rölantide duman salan araç karşısında pasif kalındı.'
        },
        {
          key: 'B',
          title: 'Nezaketle Uyar: Kontağı Kapattır',
          desc: 'Şoförün yanına yaklaş; tebessümle motorun boşuna çalıştığını söyleyip kontağı kapatmasını rica et.',
          metrics: { eco: +12, comfort: -4, social: +12 },
          summary: 'Kentsel diyalog kurularak egzoz kirliliği engellendi.'
        }
      ]
    },
    {
      id: 'surprise_bottle_pile',
      actTag: 'SÜRPRİZ KESİŞME // 16:50',
      timeLabel: '2026 // 16:50',
      title: 'Yoldaki Kırılma: Park Bankındaki Plastik Dağı',
      svgId: 'svg-afternoon',
      narration: 'Parkın kenarındaki bankta piknikçilerden kalma onlarca ezilmiş pet şişe ve atık rüzgarda çimlere saçılıyor. İnsanlar aldırmadan yanından geçip gidiyor.',
      choices: [
        {
          key: 'A',
          title: 'Görmezden Gel: Benim Çöpüm Değil',
          desc: 'Adımlarını hızlandır; başkalarının sorumsuzluğunun faturasını sen mi toplayacaksın?',
          metrics: { eco: -11, comfort: +5, social: -10 },
          summary: 'Parktaki plastik atık yığını görmezden gelindi.'
        },
        {
          key: 'B',
          title: '3 Dakikanı Ver: Çöp Kutusuna Taşı',
          desc: 'Dur, yerdeki şişeleri toplayıp 20 metre ötedeki geri dönüşüm kafesine at, alanı temizle.',
          metrics: { eco: +14, comfort: -5, social: +14 },
          summary: 'Parktaki plastik atıklar toplanarak geri dönüşüme atıldı.'
        }
      ]
    },
    {
      id: 'surprise_stray_cat',
      actTag: 'SÜRPRİZ KESİŞME // 19:15',
      timeLabel: '2026 // 19:15',
      title: 'Yoldaki Kırılma: Kuru Su Kabı ve Sokak Kedisi',
      svgId: 'svg-night',
      narration: 'Mahalle köşesindeki sokak kedisi kuru betonun üstünde boş bir plastik kabın yanında miyavlıyor. Mataranda veya çantanda yarım litre içme suyun var.',
      choices: [
        {
          key: 'A',
          title: 'Suyunu Kendine Sakla: Yola Devam Et',
          desc: 'Eve kadar yolun var, susarsan su bulamazsın. Hızlanıp köşeyi dön.',
          metrics: { eco: -8, comfort: +5, social: -8 },
          summary: 'Kendi suyu sokak hayvanıyla paylaşılmadı.'
        },
        {
          key: 'B',
          title: 'Mataradaki Suyu Kaba Doldur',
          desc: 'Diz çök, mataranın kapağını aç ve suyu kaba dök. Kedinin susuzluğunu giderişini izle.',
          metrics: { eco: +11, comfort: -3, social: +12 },
          summary: 'Kendi suyu sokak canlısıyla paylaşıldı.'
        }
      ]
    },
    {
      id: 'surprise_cardboard_stack',
      actTag: 'SÜRPRİZ KESİŞME // 20:45',
      timeLabel: '2026 // 20:45',
      title: 'Yoldaki Kırılma: Apartman Girişindeki Koli Dağı',
      svgId: 'svg-night',
      narration: 'Apartman girişinde komşuların açıp bıraktığı büyük koli yığınları kapı önünü kapatmış; yağmur altında ıslanıp hamur olmak üzere.',
      choices: [
        {
          key: 'A',
          title: 'Üstünden Atla: Dairene Çık',
          desc: 'Yorgunsun, apartman görevlisi veya koli sahipleri yarın toplar diye düşünerek geç.',
          metrics: { eco: -9, comfort: +5, social: -9 },
          summary: 'Apartmandaki koli atıkları görmezden gelindi.'
        },
        {
          key: 'B',
          title: 'Kolileri Katla: Geri Dönüşüm Bölmesine Koy',
          desc: '2 dakikanı ayırıp kutuları düzleştir, ıslanmadan kağıt geri dönüşüm kafesine yerleştir.',
          metrics: { eco: +12, comfort: -4, social: +12 },
          summary: 'Koli atıkları katlanarak geri dönüşüme kazandırıldı.'
        }
      ]
    }
  ];

  // --- GAME STATE ---
  const state = {
    phase: 'intro',
    seed: generateRandomSeedString(),
    persona: 'adult',
    personaTitle: 'KENTLİ ÇALIŞAN',
    currentSceneIndex: 0,
    activeScenes: [], // Array of resolved scenario objects for this run (5 to 7 acts)
    choices: {}, // Map of sceneId -> 'A' | 'B'
    history: [],
    metrics: {
      eco: 50,
      social: 50,
      comfort: 50
    },
    unlockedEnding: null,
    sessionId: 'sess_' + Math.random().toString(36).substring(2, 8).toUpperCase()
  };

  // --- 2045 ENDINGS MATRIX ---
  const ENDINGS = {
    ENDING_A: {
      id: 'ENDING_A',
      title: 'PLASTİK ŞAFAK',
      badge: 'DİSTOPİK ÇÖKÜŞ',
      badgeClass: 'badge-danger',
      svgId: 'svg-ending-a',
      quote: '"Konfor arayışımızın bedelini ciğerlerimizle ödüyoruz."',
      desc: 'Yıl 2045. Şehir artık nefes alınamaz bir sera. Temiz hava, abonelikle satın alınan lüks bir meta haline geldi. 2026\'daki o acil tek kullanımlık kararlar, aşırı enerji tüketimi ve sokağa karşı kayıtsızlık, gökyüzünü zehirli turuncu bir sise dönüştürdü. Dışarı çıkmak için 3. seviye solunum cihazı zorunlu.',
      mood: 'dystopia'
    },
    ENDING_B: {
      id: 'ENDING_B',
      title: 'TEKNO-AYRIŞMA',
      badge: 'KUBBE KASTI',
      badgeClass: 'badge-warning',
      svgId: 'svg-ending-b',
      quote: '"Dünya yandı, biz ise cam bir fanusun içine sığındık."',
      desc: 'Yıl 2045. Dünya ekolojik çöküşten kurtulamadı ama teknoloji zenginleri izole etti. Devasa iklim kontrollü cam kubbelerin altında yapay çimler ve steril kafeler yükseliyor; kubbenin dışında ise çöl fırtınalarıyla boğuşan milyonlar var. Kendi konforunu kurtardın ama insanlığın yarısını dışarıda bıraktın.',
      mood: 'tense'
    },
    ENDING_C: {
      id: 'ENDING_C',
      title: 'SİMBİYOZ & ONARIM',
      badge: 'EKOLOJİK ÜTOPYA',
      badgeClass: 'badge-success',
      svgId: 'svg-ending-c',
      quote: '"Geçmişin küçük onarımları, geleceğin yemyeşil ormanlarına dönüştü."',
      desc: 'Yıl 2045. Beton ile doğa barıştı. Şehirler devasa birer karbon yutucusu ve yaşayan organizma haline geldi. 2026\'da termosa koyduğun o su, onardığın o ceket, kapattığın o vana ve topladığın o plastik, kolektif bir uyanışın ilk kelebek kanatlarıydı. Temiz su, berrak gökyüzü ve serin nehirler artık herkesin hakkı.',
      mood: 'utopia'
    },
    ENDING_D: {
      id: 'ENDING_D',
      title: 'KIRILGAN ARAF',
      badge: 'BELİRSİZ DENGE',
      badgeClass: 'badge-neutral',
      svgId: 'svg-ending-d',
      quote: '"Ne tam battık ne de kurtulduk; gri bir arafta asılı kaldık."',
      desc: 'Yıl 2045. Ne tam bir çöküş yaşandı ne de gerçek bir kurtuluş gerçekleşti. Dünya sürekli bir kriz yönetimi modunda, gri ve yorgun bir dengede nefes alıyor. Bir gün bilinçli davranıp ertesi gün hoyratça tüketen kararsızlığımız, 2045\'i de kararsız bir arafta bıraktı.',
      mood: 'tense'
    }
  };

  function calculateEnding() {
    const { eco, comfort } = state.metrics;

    if (eco <= 28) {
      return ENDINGS.ENDING_A; // Plastik Şafak
    } else if (comfort >= 68 && eco < 52) {
      return ENDINGS.ENDING_B; // Tekno-Ayrışma
    } else if (eco >= 72) {
      return ENDINGS.ENDING_C; // Simbiyoz & Onarım
    } else {
      return ENDINGS.ENDING_D; // Kırılgan Araf
    }
  }

  function clamp(val, min = 0, max = 100) {
    return Math.max(min, Math.min(max, val));
  }

  // --- RUN RESOLVER FROM SEED (5 ACTS + SEEDED SURPRISE MICRO-ACTS) ---
  function resolveRunFromSeed(seedStr) {
    const hash = hashSeedString(seedStr);
    const rng = createRng(hash);

    // 1. Determine Persona (Adult vs Student)
    const personaKey = rng() > 0.5 ? 'adult' : 'student';
    const pool = SCENARIO_POOLS[personaKey];

    // 2. Pick the 5 Core Acts from persona pool
    const act1 = pool.act1[Math.floor(rng() * pool.act1.length)];
    const act2 = pool.act2[Math.floor(rng() * pool.act2.length)];
    const act3 = pool.act3[Math.floor(rng() * pool.act3.length)];
    const act4 = pool.act4[Math.floor(rng() * pool.act4.length)];
    const act5 = pool.act5[Math.floor(rng() * pool.act5.length)];

    // 3. Procedural Surprise Acts: Sprinkled into the run based on RNG
    const runtimeScenes = [act1, act2, act3, act4, act5];

    // Seed decides if and where surprise acts appear (1 to 2 surprise acts per run)
    const availableSurprises = [...SURPRISE_ACTS_POOL];
    const surpriseRoll1 = rng();
    const surpriseRoll2 = rng();

    if (surpriseRoll1 > 0.25) { // 75% chance of first surprise
      const sIndex1 = Math.floor(rng() * availableSurprises.length);
      const chosenSurprise1 = availableSurprises.splice(sIndex1, 1)[0];
      // Insert after Act 2 (Midday)
      runtimeScenes.splice(2, 0, chosenSurprise1);
    }

    if (surpriseRoll2 > 0.35 && availableSurprises.length > 0) { // 65% chance of second surprise
      const sIndex2 = Math.floor(rng() * availableSurprises.length);
      const chosenSurprise2 = availableSurprises.splice(sIndex2, 1)[0];
      // Insert before Act 5 (Evening)
      runtimeScenes.splice(runtimeScenes.length - 1, 0, chosenSurprise2);
    }

    state.seed = seedStr;
    state.persona = personaKey;
    state.personaTitle = pool.personaTitle;
    state.activeScenes = runtimeScenes;

    // Update UI elements for persona & seed
    if (el.seedCodeVal) el.seedCodeVal.textContent = seedStr;
    if (el.hudSeedVal) el.hudSeedVal.textContent = seedStr;
    if (el.hudPersona) el.hudPersona.textContent = pool.personaTitle;
  }

  // --- DOM ELEMENTS ---
  const el = {
    screenIntro: document.getElementById('screen-intro'),
    screenGame: document.getElementById('screen-game'),
    screenTimeleap: document.getElementById('screen-timeleap'),
    screenEnding: document.getElementById('screen-ending'),
    modalFlowchart: document.getElementById('modal-flowchart'),

    // HUD
    hudSeedVal: document.getElementById('hud-seed-val'),
    hudPersona: document.getElementById('hud-persona'),
    hudTime: document.getElementById('hud-time'),
    hudStatus: document.getElementById('hud-status'),
    soundToggleBtn: document.getElementById('btn-sound-toggle'),

    // Seed controls
    seedCodeVal: document.getElementById('seed-code-val'),
    btnRerollSeed: document.getElementById('btn-reroll-seed'),
    btnCustomSeed: document.getElementById('btn-custom-seed'),

    // Scene elements
    sceneActTag: document.getElementById('scene-act-tag'),
    sceneTitle: document.getElementById('scene-title'),
    sceneNarration: document.getElementById('scene-narration'),
    btnChoiceA: document.getElementById('btn-choice-a'),
    btnChoiceB: document.getElementById('btn-choice-b'),
    choiceTitleA: document.getElementById('choice-title-a'),
    choiceDescA: document.getElementById('choice-desc-a'),
    choiceTitleB: document.getElementById('choice-title-b'),
    choiceDescB: document.getElementById('choice-desc-b'),

    // Time leap
    timeleapCardsContainer: document.getElementById('timeleap-cards'),
    timeleapCounter: document.getElementById('timeleap-counter'),
    btnProceed2045: document.getElementById('btn-proceed-2045'),

    // Ending
    endingBadge: document.getElementById('ending-badge'),
    endingTitle: document.getElementById('ending-title'),
    endingQuote: document.getElementById('ending-quote'),
    endingDesc: document.getElementById('ending-desc'),
    btnOpenFlowchart: document.getElementById('btn-open-flowchart'),
    btnRestartGame: document.getElementById('btn-restart-game'),

    // Ending Final Metrics Panel
    finalEcoVal: document.getElementById('final-eco-val'),
    finalEcoBar: document.getElementById('final-eco-bar'),
    finalEcoStatus: document.getElementById('final-eco-status'),
    finalSocialVal: document.getElementById('final-social-val'),
    finalSocialBar: document.getElementById('final-social-bar'),
    finalSocialStatus: document.getElementById('final-social-status'),
    finalComfortVal: document.getElementById('final-comfort-val'),
    finalComfortBar: document.getElementById('final-comfort-bar'),
    finalComfortStatus: document.getElementById('final-comfort-status'),

    // Flowchart
    flowchartCanvas: document.getElementById('flowchart-canvas'),
    flowchartInspectTitle: document.getElementById('inspect-title'),
    flowchartInspectDesc: document.getElementById('inspect-desc'),
    flowchartInspectStat: document.getElementById('inspect-stat'),
    btnCloseFlowchart: document.getElementById('btn-close-flowchart'),
    btnFlowchartRestart: document.getElementById('btn-flowchart-restart'),

    toastNotification: document.getElementById('toast-notification')
  };

  // --- TOAST HELPER ---
  function showToast(msg, duration = 3000) {
    if (!el.toastNotification) return;
    el.toastNotification.textContent = msg;
    el.toastNotification.classList.add('visible');
    setTimeout(() => {
      el.toastNotification.classList.remove('visible');
    }, duration);
  }

  // --- AUDIO INTERFACE ---
  function playClick() {
    if (window.soundEngine) window.soundEngine.playClick();
  }
  function playButterfly() {
    if (window.soundEngine) window.soundEngine.playButterflyChime();
  }
  function playGlitch() {
    if (window.soundEngine) window.soundEngine.playGlitch();
  }
  function playTension() {
    if (window.soundEngine) window.soundEngine.playTensionRiser(2.0);
  }
  function playEndingChord(endingId) {
    if (window.soundEngine) window.soundEngine.playEndingChord(endingId);
  }

  // --- SVG SCENE TRANSITION ---
  function showSvgScene(svgId) {
    const allSvgs = document.querySelectorAll('.svg-scene-container');
    allSvgs.forEach(svg => {
      svg.classList.remove('active');
    });
    const target = document.getElementById(svgId);
    if (target) {
      target.classList.add('active');
    }
  }

  // --- RENDER SCENE ---
  function renderScene(sceneIndex) {
    const scene = state.activeScenes[sceneIndex];
    if (!scene) return;

    state.phase = 'scene';
    state.currentSceneIndex = sceneIndex;

    // Switch screen visibility
    el.screenIntro.classList.remove('active');
    el.screenTimeleap.classList.remove('active');
    el.screenEnding.classList.remove('active');
    el.screenGame.classList.add('active');

    // Update HUD
    el.hudTime.textContent = scene.timeLabel;
    el.hudStatus.textContent = `PERDE ${sceneIndex + 1} / ${state.activeScenes.length}`;
    if (el.hudPersona) el.hudPersona.textContent = state.personaTitle;

    // Render Act Tag (Normal vs Surprise Act)
    if (el.sceneActTag) {
      el.sceneActTag.textContent = scene.actTag;
      if (scene.actTag.includes('SÜRPRİZ') || scene.actTag.includes('KESİŞME')) {
        el.sceneActTag.className = 'scene-step-tag act-surprise-tag';
        playButterfly(); // subtle audio shimmer for surprise act
      } else {
        el.sceneActTag.className = 'scene-step-tag';
      }
    }

    // Render SVG
    showSvgScene(scene.svgId);

    // Narration & Choices
    el.sceneTitle.textContent = scene.title;
    el.sceneNarration.textContent = scene.narration;

    const cA = scene.choices[0];
    el.choiceTitleA.textContent = cA.title;
    el.choiceDescA.textContent = cA.desc;

    const cB = scene.choices[1];
    el.choiceTitleB.textContent = cB.title;
    el.choiceDescB.textContent = cB.desc;

    // Re-enable choice buttons
    el.btnChoiceA.disabled = false;
    el.btnChoiceB.disabled = false;
  }

  // --- HANDLE PLAYER CHOICE ---
  function handleChoice(choiceKey) {
    playClick();
    const scene = state.activeScenes[state.currentSceneIndex];
    const choice = scene.choices.find(c => c.key === choiceKey);
    if (!choice) return;

    // Disable buttons to avoid multi-clicks
    el.btnChoiceA.disabled = true;
    el.btnChoiceB.disabled = true;

    // Record decision
    state.choices[scene.id] = choiceKey;
    state.history.push({
      sceneId: scene.id,
      choiceKey: choiceKey,
      title: scene.title,
      choiceTitle: choice.title,
      summary: choice.summary,
      metricsSnapshot: { ...state.metrics }
    });

    // Update internal metrics
    state.metrics.eco = clamp(state.metrics.eco + choice.metrics.eco);
    state.metrics.comfort = clamp(state.metrics.comfort + choice.metrics.comfort);
    state.metrics.social = clamp(state.metrics.social + choice.metrics.social);

    // Advance snappily to the next scene or time leap
    setTimeout(() => {
      if (state.currentSceneIndex < state.activeScenes.length - 1) {
        renderScene(state.currentSceneIndex + 1);
      } else {
        startTimeLeap();
      }
    }, 450);
  }

  // --- TIME LEAP (2026 -> 2035) ---
  function startTimeLeap() {
    state.phase = 'timeleap';
    playTension();

    el.screenGame.classList.remove('active');
    el.screenTimeleap.classList.add('active');
    el.hudTime.textContent = 'ZAMAN SIÇRAMASI: 2026 -> 2035';
    el.hudStatus.textContent = 'SİSTEM ANALİZİ';

    showSvgScene('svg-timeleap');

    // Reset container
    el.timeleapCardsContainer.innerHTML = '';
    el.btnProceed2045.classList.remove('visible');

    // Animate Year Counter
    let currentYear = 2026;
    const yearInterval = setInterval(() => {
      currentYear += 1;
      el.timeleapCounter.textContent = currentYear;
      if (currentYear >= 2035) {
        clearInterval(yearInterval);
        displayTimeLeapHeadlines();
      }
    }, 105);
  }

  // Contextual headlines based on persona and decisions
  function getTimeLeapHeadlines() {
    const headlines = [];
    const isAdult = state.persona === 'adult';

    if (state.metrics.eco < 40) {
      headlines.push({
        year: '2031',
        tag: 'METROPOL HABERLERİ',
        title: isAdult ? 'MİKROPLASTİK SİSİ MERKEZLERİ ESİR ALDI' : 'OKULLARDA DIŞ MEKAN MASKESİ ZORUNLU OLDU',
        body: 'Artan bireysel taşıma ve tek kullanımlık ambalaj tüketimi kentsel partikül seviyesini rekor düzeye çıkardı. Hava kalitesi indeksi kırmızı alarmda.'
      });
    } else {
      headlines.push({
        year: '2031',
        tag: 'DÖNÜŞÜM RAPORU',
        title: isAdult ? 'ŞEHİR MERKEZLERİNDE YAYA VE MİKROMOBİLİTE DEVRİMİ' : 'GENÇLERİN SIFIR ATIK HAREKETİ KENTLERİ DEĞİŞTİRDİ',
        body: 'Bireysel araç trafiğindeki belirgin düşüş ve mahalle düzeyindeki onarım dayanışması, metropol havasında son 15 yılın en berrak günlerini başlattı.'
      });
    }

    if (state.metrics.comfort > 60) {
      headlines.push({
        year: '2033',
        tag: 'KÜRESEL EKONOMİ',
        title: 'ANLIK TESLİMAT VE ATIK DEPOLARI KITALARI DOLDURDU',
        body: 'Hızlı tüketim ve durmaksızın çalışan sunucu şebekeleri küresel enerji talebini ikiye katladı. Fosil yakıt rezervleri acil durum için açıldı.'
      });
    } else {
      headlines.push({
        year: '2033',
        tag: 'DÖNGÜSEL EKONOMİ',
        title: 'ONARIM HAKKI VE YEREL ATÖLYELER DEV PERAKENDEYİ GEÇTİ',
        body: 'Tek kullanımlık ambalajlara getirilen radikal vergilendirmeler ve kompost kültürü, su havzalarındaki kirliliği %38 oranında geri çekti.'
      });
    }

    headlines.push({
      year: '2035',
      tag: 'KÜRESEL BİLANÇO',
      title: '2045 İKLİM REJİMİ MÜHÜRLENDİ',
      body: '24 saatlik döngüde verdiğin her sıradan insani taviz veya gösterdiğin küçük direnç, 2045\'in solunabilir hava kotalarını belirledi.'
    });

    return headlines;
  }

  function displayTimeLeapHeadlines() {
    const headlines = getTimeLeapHeadlines();

    headlines.forEach((item, index) => {
      setTimeout(() => {
        playGlitch();

        const card = document.createElement('div');
        card.className = 'newspaper-card card-pop-in';
        card.innerHTML = `
          <div class="newspaper-header">
            <span class="news-year">${item.year}</span>
            <span class="news-tag">${item.tag}</span>
          </div>
          <h3 class="news-title">${item.title}</h3>
          <p class="news-body">${item.body}</p>
        `;
        el.timeleapCardsContainer.appendChild(card);

        if (index === headlines.length - 1) {
          setTimeout(() => {
            el.btnProceed2045.classList.add('visible');
          }, 800);
        }
      }, (index + 1) * 750);
    });
  }

  // --- 2045 ENDING SCREEN ---
  function showEnding() {
    state.phase = 'ending';
    const ending = calculateEnding();
    state.unlockedEnding = ending.id;

    playEndingChord(ending.id);

    el.screenTimeleap.classList.remove('active');
    el.screenEnding.classList.add('active');

    el.hudTime.textContent = 'YIL: 2045 // NİHAİ STATÜ';
    el.hudStatus.textContent = ending.badge;

    showSvgScene(ending.svgId);

    el.endingBadge.textContent = ending.badge;
    el.endingBadge.className = `ending-badge ${ending.badgeClass}`;
    el.endingTitle.textContent = ending.title;
    el.endingQuote.textContent = ending.quote;
    el.endingDesc.textContent = ending.desc;

    // Render the Final Life & Planet Metrics balance sheet
    renderEndingMetrics();
  }

  function renderEndingMetrics() {
    const { eco, social, comfort } = state.metrics;

    if (el.finalEcoVal) el.finalEcoVal.textContent = `${eco}%`;
    if (el.finalSocialVal) el.finalSocialVal.textContent = `${social}%`;
    if (el.finalComfortVal) el.finalComfortVal.textContent = `${comfort}%`;

    // Qualitative Verdicts based on final choices
    if (el.finalEcoStatus) {
      if (eco <= 28) {
        el.finalEcoStatus.textContent = 'Kritik Çöküş: Zehirli asit gökyüzü, yapay oksijen tüpü zorunlu.';
      } else if (eco < 50) {
        el.finalEcoStatus.textContent = 'Aşırı Yıpranma: Şiddetli hava kirliliği, kuraklık ve su kotaları.';
      } else if (eco < 72) {
        el.finalEcoStatus.textContent = 'Kısmi İyileşme: Şehir merkezlerinde hava koridorları açıldı.';
      } else {
        el.finalEcoStatus.textContent = 'Onarılan Gezegen: Dikey ormanlar, temiz nehirler, sıfır karbon.';
      }
    }

    if (el.finalSocialStatus) {
      if (social <= 30) {
        el.finalSocialStatus.textContent = 'Bireysel İzolasyon: Toplumsal kutuplaşma, herkes kendi fanusunda.';
      } else if (social < 65) {
        el.finalSocialStatus.textContent = 'Sınırlı Dayanışma: Parçalı ve kırılgan toplumsal iletişim.';
      } else {
        el.finalSocialStatus.textContent = 'Kolektif Dayanışma: Onarım kültürü, mahalle kooperatifleri.';
      }
    }

    if (el.finalComfortStatus) {
      if (comfort >= 68) {
        el.finalComfortStatus.textContent = 'Aşırı Tüketim Borcu: Fosil enerji ve tek kullanımlık atık krizi.';
      } else if (comfort >= 45) {
        el.finalComfortStatus.textContent = 'Orta Bağımlılık: Kolaylıktan vazgeçmekte zorlanan tüketici profili.';
      } else {
        el.finalComfortStatus.textContent = 'Yalın ve Bilinçli Yaşam: Düşük enerji ayak izi, özgürleşme.';
      }
    }

    // Animate bars filling up smoothly
    if (el.finalEcoBar) el.finalEcoBar.style.width = '0%';
    if (el.finalSocialBar) el.finalSocialBar.style.width = '0%';
    if (el.finalComfortBar) el.finalComfortBar.style.width = '0%';

    setTimeout(() => {
      if (el.finalEcoBar) el.finalEcoBar.style.width = `${eco}%`;
      if (el.finalSocialBar) el.finalSocialBar.style.width = `${social}%`;
      if (el.finalComfortBar) el.finalComfortBar.style.width = `${comfort}%`;
    }, 120);
  }

  // --- FLOWCHART RENDERER (Detroit: Become Human Style) ---
  function openFlowchart() {
    playClick();
    el.modalFlowchart.classList.add('active');
    drawFlowchart();
  }

  function closeFlowchart() {
    playClick();
    el.modalFlowchart.classList.remove('active');
  }

  let currentFlowchartConnections = [];

  function renderFlowchartLines() {
    const svg = document.getElementById('flowchart-svg-lines');
    if (!svg) return;
    const wrapper = svg.closest('.flowchart-wrapper');
    if (!wrapper) return;

    const w = wrapper.scrollWidth;
    const h = wrapper.scrollHeight;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = '';

    const wrapperRect = wrapper.getBoundingClientRect();

    currentFlowchartConnections.forEach(conn => {
      const fromEl = document.getElementById(conn.from);
      const toEl = document.getElementById(conn.to);
      if (!fromEl || !toEl) return;

      const rFrom = fromEl.getBoundingClientRect();
      const rTo = toEl.getBoundingClientRect();

      const x1 = (rFrom.right - wrapperRect.left) + wrapper.scrollLeft;
      const y1 = (rFrom.top + rFrom.height / 2 - wrapperRect.top) + wrapper.scrollTop;

      const x2 = (rTo.left - wrapperRect.left) + wrapper.scrollLeft;
      const y2 = (rTo.top + rTo.height / 2 - wrapperRect.top) + wrapper.scrollTop;

      const dx = Math.max(24, (x2 - x1) * 0.5);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
      path.setAttribute('class', `flowchart-path ${conn.active ? 'active-path-line' : 'locked-path-line'}`);
      svg.appendChild(path);
    });
  }

  function drawFlowchart() {
    const grid = document.getElementById('flowchart-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const stages = [];
    currentFlowchartConnections = [];

    // Stage 1: BAŞLANGIÇ
    const startNode = {
      id: 'node-start',
      title: `${state.personaTitle}`,
      sub: `Tohum: ${state.seed}`,
      selected: true,
      stats: 'Başlangıç Noktası',
      desc: `Simülasyon başlangıcı. ${state.personaTitle} perspektifinden kurgulanan günün sıfır noktası.`
    };
    stages.push({ name: 'BAŞLANGIÇ', nodes: [startNode] });

    // Dynamic Stages for each active scene in run (5 to 7 acts)
    state.activeScenes.forEach((scene, sIdx) => {
      const chosenKey = state.choices[scene.id];
      const stageName = scene.actTag.split('//')[0].trim();

      const nodeA = {
        id: `node-${scene.id}-a`,
        title: scene.choices[0].title,
        sub: scene.actTag,
        selected: chosenKey === 'A',
        stats: chosenKey === 'A' ? 'Seçilen Rota' : 'Kilitli Alternatif',
        desc: scene.choices[0].desc
      };

      const nodeB = {
        id: `node-${scene.id}-b`,
        title: scene.choices[1].title,
        sub: scene.actTag,
        selected: chosenKey === 'B',
        stats: chosenKey === 'B' ? 'Seçilen Rota' : 'Kilitli Alternatif',
        desc: scene.choices[1].desc
      };

      stages.push({ name: stageName, nodes: [nodeA, nodeB] });

      // Connect from previous stage
      if (sIdx === 0) {
        currentFlowchartConnections.push(
          { from: 'node-start', to: nodeA.id, active: chosenKey === 'A' },
          { from: 'node-start', to: nodeB.id, active: chosenKey === 'B' }
        );
      } else {
        const prevScene = state.activeScenes[sIdx - 1];
        const prevChosen = state.choices[prevScene.id];

        currentFlowchartConnections.push(
          { from: `node-${prevScene.id}-a`, to: nodeA.id, active: prevChosen === 'A' && chosenKey === 'A' },
          { from: `node-${prevScene.id}-a`, to: nodeB.id, active: prevChosen === 'A' && chosenKey === 'B' },
          { from: `node-${prevScene.id}-b`, to: nodeA.id, active: prevChosen === 'B' && chosenKey === 'A' },
          { from: `node-${prevScene.id}-b`, to: nodeB.id, active: prevChosen === 'B' && chosenKey === 'B' }
        );
      }
    });

    // Timeleap Stage
    const timeleapNode = {
      id: 'node-timeleap',
      title: '2035: Kırılma Eşiği',
      sub: 'Zaman Sıçraması',
      selected: true,
      stats: 'Kritik Eşik',
      desc: 'Alınan kararların toplum ölçeğinde birikimi ve 2035 gazete manşetleri.'
    };
    stages.push({ name: '2035 KIRILMA', nodes: [timeleapNode] });

    // Connect last active scene to timeleap
    const lastScene = state.activeScenes[state.activeScenes.length - 1];
    const lastChosen = state.choices[lastScene.id];
    currentFlowchartConnections.push(
      { from: `node-${lastScene.id}-a`, to: 'node-timeleap', active: lastChosen === 'A' },
      { from: `node-${lastScene.id}-b`, to: 'node-timeleap', active: lastChosen === 'B' }
    );

    // Endings Stage
    const endingNodes = [
      {
        id: 'node-end-a',
        title: 'ENDING A: Plastik Şafak',
        sub: 'Ekoloji ≤ 28',
        selected: state.unlockedEnding === 'ENDING_A',
        stats: state.unlockedEnding === 'ENDING_A' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: ENDINGS.ENDING_A.desc
      },
      {
        id: 'node-end-b',
        title: 'ENDING B: Tekno-Ayrışma',
        sub: 'Konfor ≥ 68',
        selected: state.unlockedEnding === 'ENDING_B',
        stats: state.unlockedEnding === 'ENDING_B' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: ENDINGS.ENDING_B.desc
      },
      {
        id: 'node-end-c',
        title: 'ENDING C: Simbiyoz & Onarım',
        sub: 'Ekoloji ≥ 72',
        selected: state.unlockedEnding === 'ENDING_C',
        stats: state.unlockedEnding === 'ENDING_C' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: ENDINGS.ENDING_C.desc
      },
      {
        id: 'node-end-d',
        title: 'ENDING D: Kırılgan Araf',
        sub: 'Dengeli / Kararsız',
        selected: state.unlockedEnding === 'ENDING_D',
        stats: state.unlockedEnding === 'ENDING_D' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: ENDINGS.ENDING_D.desc
      }
    ];
    stages.push({ name: '2045 SONLAR', nodes: endingNodes });

    // Connect timeleap to endings
    endingNodes.forEach(eNode => {
      currentFlowchartConnections.push({
        from: 'node-timeleap',
        to: eNode.id,
        active: eNode.selected
      });
    });

    // Build DOM columns
    stages.forEach(stage => {
      const col = document.createElement('div');
      col.className = 'flowchart-col';
      const colHeader = document.createElement('div');
      colHeader.className = 'flowchart-col-header';
      colHeader.textContent = stage.name;
      col.appendChild(colHeader);

      stage.nodes.forEach(node => {
        const nodeEl = document.createElement('div');
        nodeEl.className = `flowchart-node ${node.selected ? 'active-path' : 'locked-path'}`;
        nodeEl.id = node.id;
        nodeEl.innerHTML = `
          <div class="node-icon">${node.selected ? '✦' : '🔒'}</div>
          <div class="node-content">
            <div class="node-title">${node.title}</div>
            <div class="node-sub">${node.sub}</div>
            <div class="node-stat">${node.stats}</div>
          </div>
        `;

        nodeEl.addEventListener('click', () => {
          playClick();
          inspectNode(node);
        });

        col.appendChild(nodeEl);
      });

      grid.appendChild(col);
    });

    // Render lines after DOM paint
    requestAnimationFrame(() => {
      renderFlowchartLines();
    });

    // Default inspect active ending
    const activeEnd = endingNodes.find(n => n.selected) || startNode;
    inspectNode(activeEnd);
  }

  function inspectNode(node) {
    if (!el.flowchartInspectTitle) return;
    el.flowchartInspectTitle.textContent = node.title;
    el.flowchartInspectDesc.textContent = node.desc;
    el.flowchartInspectStat.textContent = node.selected ? 'SİZİN SEÇTİĞİNİZ PATİKA' : 'KİLİTLİ ALTERNATİF GELECEK';

    document.querySelectorAll('.flowchart-node').forEach(n => {
      if (n.id === node.id) {
        n.classList.add('inspected');
      } else {
        n.classList.remove('inspected');
      }
    });
  }

  // --- RESTART GAME ---
  function restartGame(newSeed = true) {
    playClick();
    state.phase = 'intro';
    state.currentSceneIndex = 0;
    state.metrics = { eco: 50, social: 50, comfort: 50 };
    state.choices = {};
    state.history = [];
    state.unlockedEnding = null;
    state.sessionId = 'sess_' + Math.random().toString(36).substring(2, 8).toUpperCase();

    if (newSeed) {
      resolveRunFromSeed(generateRandomSeedString());
    } else {
      resolveRunFromSeed(state.seed);
    }

    el.modalFlowchart.classList.remove('active');
    el.screenEnding.classList.remove('active');
    el.screenTimeleap.classList.remove('active');
    el.screenGame.classList.remove('active');
    el.screenIntro.classList.add('active');

    el.hudTime.textContent = '2026.03.15 // 07:00';
    el.hudStatus.textContent = 'BAŞLANGIÇ BEKLENİYOR';

    showSvgScene('svg-intro');
    if (window.soundEngine) window.soundEngine.setDroneMood('calm');
  }

  // --- ATTACH EVENT LISTENERS ---
  function initListeners() {
    // Sound toggle
    if (el.soundToggleBtn) {
      el.soundToggleBtn.addEventListener('click', () => {
        if (window.soundEngine) {
          const isMuted = window.soundEngine.toggleMute();
          el.soundToggleBtn.innerHTML = isMuted ? '🔇 Ses: Kapalı' : '🔊 Ses: Açık';
          el.soundToggleBtn.classList.toggle('muted', isMuted);
        }
      });
    }

    // Seed controls
    if (el.btnRerollSeed) {
      el.btnRerollSeed.addEventListener('click', () => {
        playClick();
        const freshSeed = generateRandomSeedString();
        resolveRunFromSeed(freshSeed);
        showToast(`Yeni gün ve perspektif zarı atıldı: ${freshSeed}`);
      });
    }

    if (el.btnCustomSeed) {
      el.btnCustomSeed.addEventListener('click', () => {
        playClick();
        const userInput = prompt('Oynamak istediğiniz tohum kodunu girin (Örn: #YANKI-1234):', state.seed);
        if (userInput && userInput.trim().length > 0) {
          const clean = userInput.trim().toUpperCase();
          resolveRunFromSeed(clean.startsWith('#') ? clean : `#${clean}`);
          showToast(`Tohum yüklendi: ${state.seed}`);
        }
      });
    }

    // Start button
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.init();
        playClick();
        renderScene(0);
      });
    }

    // Choice buttons
    if (el.btnChoiceA) {
      el.btnChoiceA.addEventListener('click', () => handleChoice('A'));
    }
    if (el.btnChoiceB) {
      el.btnChoiceB.addEventListener('click', () => handleChoice('B'));
    }

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (el.modalFlowchart && el.modalFlowchart.classList.contains('active')) {
          closeFlowchart();
          return;
        }
      }

      if (state.phase === 'intro') {
        if (e.key === ' ' || e.key === 'Enter') {
          if (btnStart) btnStart.click();
        }
      } else if (state.phase === 'scene') {
        if (e.key === '1' || e.key === 'a' || e.key === 'A') {
          if (!el.btnChoiceA.disabled) handleChoice('A');
        } else if (e.key === '2' || e.key === 'b' || e.key === 'B') {
          if (!el.btnChoiceB.disabled) handleChoice('B');
        }
      } else if (state.phase === 'timeleap') {
        if (e.key === ' ' || e.key === 'Enter') {
          if (el.btnProceed2045 && el.btnProceed2045.classList.contains('visible')) {
            showEnding();
          }
        }
      }
    });

    // Modal backdrop click
    document.querySelectorAll('.app-modal').forEach(modal => {
      const backdrop = modal.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          if (modal.id === 'modal-flowchart') closeFlowchart();
        });
      }
    });

    // Time leap proceed button
    if (el.btnProceed2045) {
      el.btnProceed2045.addEventListener('click', () => {
        playClick();
        showEnding();
      });
    }

    // Ending screen buttons
    if (el.btnOpenFlowchart) {
      el.btnOpenFlowchart.addEventListener('click', openFlowchart);
    }
    if (el.btnRestartGame) {
      el.btnRestartGame.addEventListener('click', () => restartGame(true));
    }

    // Flowchart buttons
    if (el.btnCloseFlowchart) {
      el.btnCloseFlowchart.addEventListener('click', closeFlowchart);
    }
    if (el.btnFlowchartRestart) {
      el.btnFlowchartRestart.addEventListener('click', () => restartGame(true));
    }

    // Window resize updates flowchart lines
    window.addEventListener('resize', () => {
      if (el.modalFlowchart && el.modalFlowchart.classList.contains('active')) {
        renderFlowchartLines();
      }
    });
  }

  // --- INITIALIZE ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    resolveRunFromSeed(state.seed);
    initListeners();
    showSvgScene('svg-intro');
  });

})();
