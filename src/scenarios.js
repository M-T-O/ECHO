/**
 * YANKI (ECHO): 2045'e 5 Dakika
 * scenarios.js - 3 Personas, Procedural Acts, 5 Endings & Empirical Impact Coefficients
 * Grounded in 10 Peer-Reviewed Academic Studies. Pure Client-side Data.
 */

(function () {
  'use strict';

  // --- 3 DETAILED PERSONAS WITH EMPIRICAL METRICS ---
  const SCENARIO_POOLS = {
    // ==========================================
    // PERSPECTIVE 1: KENTLİ ÇALIŞAN (ADULT)
    // ==========================================
    adult: {
      personaId: 'adult',
      personaTitle: 'KENTLİ ÇALIŞAN',
      personaRole: 'Finans Analisti, 31 Yaşında',
      personaLore: 'Mesai baskısı, teslim tarihleri, anlık teslimat bağımlılığı ve kentsel yorgunluk.',
      avatarIcon: '💼',

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
              impact: { co2Kg: 2.4, plasticGrams: 0, waterLiters: 10 },
              studyId: 'study_8_digital',
              summary: 'Anlık yüksek elektrikli ısıtıcı kullanımı tercih edildi.'
            },
            {
              key: 'B',
              title: 'Katmanlı Uyum: Kalın Kazak ve Sıcak Çay',
              desc: 'Eski kalın yün kazağını üstüne çek. Mutfakta sıcak bir demlik su kaynatıp fincanın sıcaklığına sarıl.',
              metrics: { eco: +10, comfort: -4, social: +6 },
              impact: { co2Kg: 0.2, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_2_nudge',
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
              impact: { co2Kg: 1.6, plasticGrams: 85, waterLiters: 380 },
              studyId: 'study_7_food_waste',
              summary: 'Tek kullanımlık ambalajlı ekspres kahvaltı siparişi tercih edildi.'
            },
            {
              key: 'B',
              title: 'Dolaptakini Kurtar: Zeytinyağlı Çıtır Ekmek',
              desc: 'Kuru ekmeği tavada zeytinyağı ve kekikle çıtırdat. Kendi hazırladığın sade ve telaşsız kahvaltıyı yap.',
              metrics: { eco: +10, comfort: -4, social: +7 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 30 },
              studyId: 'study_7_food_waste',
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
              impact: { co2Kg: 4.8, plasticGrams: 0, waterLiters: 15 },
              studyId: 'study_3_transport',
              summary: 'Araç çağırma ve kişisel konfor alanı tercih edildi (Karayolu %74.5 emisyon payı).'
            },
            {
              key: 'B',
              title: 'Sabahın Ayazına Çık: Metroya Yürü',
              desc: 'Ceketinin yakasını kaldır, kulaklığı tak. Islak kaldırım taşlarında tempolu 12 dakikalık yürüyüşle zihnini aç.',
              metrics: { eco: +11, comfort: -5, social: +8 },
              impact: { co2Kg: 0.3, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_3_transport',
              summary: 'Toplu taşıma ve kentsel raylı sistem ritmi tercih edildi.'
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
              impact: { co2Kg: 0.9, plasticGrams: 35, waterLiters: 140 },
              studyId: 'study_5_microplastics',
              summary: 'Tek kullanımlık bardaklı kahve tüketimi tercih edildi (Mikroplastik riski).'
            },
            {
              key: 'B',
              title: 'Ofisi Bekle: Kendi Kupanda Demle',
              desc: 'Sırayı pas geç, ofis mutfağındaki cam cezveyi kullanarak kendi porselen kupanda sade kahve hazırla.',
              metrics: { eco: +10, comfort: -3, social: +7 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 25 },
              studyId: 'study_6_circular',
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
              impact: { co2Kg: 2.1, plasticGrams: 110, waterLiters: 480 },
              studyId: 'study_5_microplastics',
              summary: 'Plastik ambalajlı hızlı paket servis tercih edildi.'
            },
            {
              key: 'B',
              title: 'Sokağa İn: Köşedeki Esnaf Lokantası',
              desc: 'Ekranı kilitle, aşağı in. Porselen tabakta sıcak günün çorbasını iç, garsonla selamlaş, zihnini dinlendir.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              impact: { co2Kg: 0.4, plasticGrams: 0, waterLiters: 110 },
              studyId: 'study_6_circular',
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
              impact: { co2Kg: 2.8, plasticGrams: 0, waterLiters: 15 },
              studyId: 'study_8_digital',
              summary: 'Ofis içi iklim gerginliğinde çekimser kalınarak aşırı tüketime uyuldu.'
            },
            {
              key: 'B',
              title: 'Uzlaşma Öner: Karşılıklı Pencereleri Açtır',
              desc: 'Klimayı kapatmayı ve binanın rüzgar alan karşılıklı camlarını aralamayı teklif et; doğal hava koridoru oluştur.',
              metrics: { eco: +11, comfort: -3, social: +9 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_2_nudge',
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
              impact: { co2Kg: 16.5, plasticGrams: 420, waterLiters: 2700 },
              studyId: 'study_4_fashion',
              summary: 'Aynı gün teslimatlı hızlı moda ürünü tercih edildi (Tekstilde 2.700L sanal su maliyeti).'
            },
            {
              key: 'B',
              title: 'Mesai Çıkışı Koştur: Mahalle Terzisi',
              desc: 'Ofisten 15 dakika erken çıkıp ara sokaktaki yaşlı terziye uğra; astarı diktirip düğmeyi sağlamlaştır.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              impact: { co2Kg: 0.3, plasticGrams: 5, waterLiters: 40 },
              studyId: 'study_6_circular',
              summary: 'Mahalle esnafında giysi onarımı tercih edildi (%50 yeniden kullanım döngüsü).'
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
              impact: { co2Kg: 1.1, plasticGrams: 45, waterLiters: 120 },
              studyId: 'study_5_microplastics',
              summary: 'Tek kullanımlık plastik pipetli içecek tüketildi.'
            },
            {
              key: 'B',
              title: 'Meyve Tezgâhından Bir Mandalina Al',
              desc: 'Köşedeki manavdan taze bir mandalina al; parmaklarınla soyarken kokusuyla ferahla, ambalajsız ve sade bir an yaşa.',
              metrics: { eco: +10, comfort: -3, social: +8 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 35 },
              studyId: 'study_7_food_waste',
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
              impact: { co2Kg: 3.6, plasticGrams: 0, waterLiters: 80 },
              studyId: 'study_8_digital',
              summary: 'Yüksek enerjili dijital konfor sığınağı tercih edildi (Veri merkezlerinin soğutma yükü).'
            },
            {
              key: 'B',
              title: 'Sokağın Çağrısı: Telefonu Bırakıp Yürü',
              desc: 'Telefonu şarjda bırak, kapıyı çek. Gece esintisinde sahile ve parka doğru amaçsız 20 dakikalık bir yürüyüşe çık.',
              metrics: { eco: +13, comfort: -5, social: +8 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_2_nudge',
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
              impact: { co2Kg: 5.2, plasticGrams: 160, waterLiters: 320 },
              studyId: 'study_8_digital',
              summary: 'Gece yarısı dürtüsel online alışveriş yapıldı.'
            },
            {
              key: 'B',
              title: 'Ekranı Karart: Balkona Çıkıp Hava Al',
              desc: 'Telefonu ters çevirip komodine koy. Balkon kapısını arala, gecenin serinliğinde yıldızları ve kenti dinle.',
              metrics: { eco: +11, comfort: -4, social: +7 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_10_intergenerational',
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
      personaTitle: 'ÜNİVERSİTE ÖĞRENCİSİ',
      personaRole: 'Mimarlık 2. Sınıf, 20 Yaşında',
      personaLore: 'Okul telaşı, akran baskısı, harçlık kısıtı, popüler tüketim trendleri ve geleceğin sorumluluğu.',
      avatarIcon: '🎓',

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
              impact: { co2Kg: 1.2, plasticGrams: 55, waterLiters: 280 },
              studyId: 'study_5_microplastics',
              summary: 'Tek kullanımlık ambalajlı pratik atıştırmalık tercih edildi.'
            },
            {
              key: 'B',
              title: 'Evden Kap: Elma ve Çelik Matara Suyu',
              desc: 'Masadaki elmayı cebine at, çelik matarana musluktan su doldur, servise telaşsız bin.',
              metrics: { eco: +11, comfort: -4, social: +7 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 20 },
              studyId: 'study_7_food_waste',
              summary: 'Evden matara ve taze meyveyle sıfır atık sabahı yapıldı.'
            }
          ]
        },
        {
          id: 'student_act1_heavy_book',
          actTag: 'ACT 1 // 07:20',
          timeLabel: '2026 // 07:20',
          title: 'Şafak: Ağır Çanta ve Yeni Proje Kitabı',
          svgId: 'svg-morning',
          narration: 'Hoca bugün 400 sayfalık kalın kuşe kağıtlı yeni mimari tasarım kataloğunu derse getirmeyenleri uyaracağını söyledi. Çantan omuzlarını ezecek kadar ağır.',
          choices: [
            {
              key: 'A',
              title: 'Kırtasiyeden Sıfır Kitap Satın Al',
              desc: 'Her dönem başında olduğu gibi jelatinli yeni parlak baskı kitabı masana koy, harçlığını harca.',
              metrics: { eco: -10, comfort: +11, social: -4 },
              impact: { co2Kg: 2.8, plasticGrams: 30, waterLiters: 450 },
              studyId: 'study_6_circular',
              summary: 'Jelatinli sıfır kuşe kağıt katalog satın alındı.'
            },
            {
              key: 'B',
              title: 'Üst Sınıf Komşudan İkinci El Kitap İste',
              desc: 'Geçen yıl mezun olan komşu abiden kalan yıpranmış ama tertemiz çözümlü kitabı ödünç al.',
              metrics: { eco: +11, comfort: -4, social: +8 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 10 },
              studyId: 'study_6_circular',
              summary: 'İkinci el kitap döngüsü tercih edildi (%50 kaynak korunumu).'
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
              impact: { co2Kg: 3.9, plasticGrams: 0, waterLiters: 12 },
              studyId: 'study_3_transport',
              summary: 'Kısa mesafe için bireysel araçla okul ulaşımı seçildi (Karayolu emisyonu).'
            },
            {
              key: 'B',
              title: 'Yağmurluğu Giy: Arkadaşlarla Yürü',
              desc: 'Kapüşonu çek, sokak başında bekleyen sınıf arkadaşlarına katıl, su birikintilerini aşarak yürü.',
              metrics: { eco: +11, comfort: -4, social: +8 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 2 },
              studyId: 'study_3_transport',
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
              impact: { co2Kg: 0.5, plasticGrams: 20, waterLiters: 40 },
              studyId: 'study_5_microplastics',
              summary: 'Tek kullanımlık bilet plastik atığı üretildi.'
            },
            {
              key: 'B',
              title: 'Sıradaki Birinden Kartını Basmasını Rica Et',
              desc: 'Nezaketle sıradaki yolcudan kart basmasını rica et, parasını elden vererek gereksiz plastik kart alımını önle.',
              metrics: { eco: +10, comfort: -3, social: +8 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_2_nudge',
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
              impact: { co2Kg: 1.4, plasticGrams: 60, waterLiters: 160 },
              studyId: 'study_5_microplastics',
              summary: 'Akran baskısıyla viral plastik ambalajlı içecek alındı.'
            },
            {
              key: 'B',
              title: 'Kuyruğu Boşver: Bahçede Maça Koş',
              desc: 'Tüketim kuyruğundan çık, bahçede ceketlerden kale kuran arkadaşlarına katılıp topun peşinde terle.',
              metrics: { eco: +11, comfort: -4, social: +8 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 10 },
              studyId: 'study_1_pedagogy',
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
              impact: { co2Kg: 1.8, plasticGrams: 75, waterLiters: 220 },
              studyId: 'study_5_microplastics',
              summary: 'Tek kullanımlık köpük tabak ve plastik çatal kullanıldı.'
            },
            {
              key: 'B',
              title: 'Kendi Yıkanabilir Çatalını Çıkar',
              desc: 'Çantandaki çelik kamp çatalını çıkar; görevliden porselen tabak rica ederek plastik atığını reddet.',
              metrics: { eco: +11, comfort: -3, social: +7 },
              impact: { co2Kg: 0.2, plasticGrams: 0, waterLiters: 30 },
              studyId: 'study_6_circular',
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
              impact: { co2Kg: 3.2, plasticGrams: 80, waterLiters: 260 },
              studyId: 'study_4_fashion',
              summary: 'AVM ve tek kullanımlık içecek tüketimi seçildi.'
            },
            {
              key: 'B',
              title: 'Parkta Oturmayı Öner: Çimlere Yayılın',
              desc: 'Arkadaşları ikna et; okulun yanındaki eski çınar ağacının altına oturup gitar dinleyerek sohbet edin.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 10 },
              studyId: 'study_1_pedagogy',
              summary: 'Doğal park alanı ve açık hava arkadaşlığı seçildi.'
            }
          ]
        },
        {
          id: 'student_act4_science_project',
          actTag: 'ACT 4 // 17:30',
          timeLabel: '2026 // 17:30',
          title: 'Okul Çıkışı: Mimari Maket Malzemeleri',
          svgId: 'svg-afternoon',
          narration: 'Haftaya jüri sunumu var. Proje ortağın "İnternetten 400 liralık hazır pleksi plastik maket kiti sipariş edelim, hiç uğraşmayalım" diyor.',
          choices: [
            {
              key: 'A',
              title: 'Siparişi Onayla: Zahmetsiz Not',
              desc: 'Kutuda hazır gelen plastik parçaları birleştirip projeyi 20 dakikada bitirmenin kolaylığını seç.',
              metrics: { eco: -11, comfort: +11, social: -5 },
              impact: { co2Kg: 4.5, plasticGrams: 310, waterLiters: 520 },
              studyId: 'study_5_microplastics',
              summary: 'Hazır plastik proje kiti sipariş edildi.'
            },
            {
              key: 'B',
              title: 'Karton ve Atıklardan Kendin Yap',
              desc: 'Evdeki eski koli kartonlarını, kapakları ve telleri topla; el emeğiyle çalışan bir prototip üret.',
              metrics: { eco: +12, comfort: -4, social: +9 },
              impact: { co2Kg: 0.2, plasticGrams: 10, waterLiters: 25 },
              studyId: 'study_6_circular',
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
              impact: { co2Kg: 3.5, plasticGrams: 0, waterLiters: 70 },
              studyId: 'study_8_digital',
              summary: 'Oyun bilgisayarı başında yüksek enerjili ekran seansı seçildi (Veri merkezi elektrik yükü).'
            },
            {
              key: 'B',
              title: 'Bisiklete Atla: Sahilde Gece Turu',
              desc: 'Eski bisikleti bodrumdan çıkar. Rüzgar yüzüne vururken sahil yolunda pedalla, zihnini dinlendir.',
              metrics: { eco: +12, comfort: -4, social: +8 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_3_transport',
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
              impact: { co2Kg: 1.8, plasticGrams: 0, waterLiters: 45 },
              studyId: 'study_8_digital',
              summary: 'Gece boyu pasif ekran ve şebeke tüketimi sürdürüldü.'
            },
            {
              key: 'B',
              title: 'Telefonu Başucundan Kaldır: Kitap Aç',
              desc: 'Telefonu odanın diğer ucundaki masaya koy. Başucundaki loş lambayı yakıp birkaç sayfa roman oku.',
              metrics: { eco: +10, comfort: -3, social: +6 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_10_intergenerational',
              summary: 'Dijital detoks ve bilinçli gece dinlenmesi seçildi.'
            }
          ]
        }
      ]
    },

    // ==========================================
    // PERSPECTIVE 3: ORTAOKUL ÖĞRENCİSİ (TEEN / 12-15 YAŞ)
    // ==========================================
    teen: {
      personaId: 'teen',
      personaTitle: 'ORTAOKUL ÖĞRENCİSİ',
      personaRole: '8. Sınıf Öğrencisi, 13 Yaşında (LGS & Akran Dünyası)',
      personaLore: 'Okul servisi, kantin abur cuburları, akran baskısı, TikTok/oyun trendleri ve sınav stresi arasında çevre bilinci.',
      avatarIcon: '🎒',

      // ACT 1: Şafak & Okula Hazırlık (07:00 - 08:00)
      act1: [
        {
          id: 'teen_act1_commute',
          actTag: 'ACT 1 // 07:15',
          timeLabel: '2026 // 07:15',
          title: 'Sabah: Okula Gidiş ve Servis İkilemi',
          svgId: 'svg-morning',
          narration: 'Alarm çaldı, sırt çantan hazır. Yağmur çiseliyor ve ilk ders LGS deneme sınavı var. Baban arabayla işe gitmek üzere anahtarı aldı.',
          choices: [
            {
              key: 'A',
              title: 'Babana Israr Et: "Beni Okulun Kapısına Bırak"',
              desc: 'Sıcak koltukta konforla git, okul kapısındaki araç kuyruğuna katıl ve egzoz dumanı bırak.',
              metrics: { eco: -11, comfort: +12, social: -4 },
              impact: { co2Kg: 3.4, plasticGrams: 0, waterLiters: 15 },
              studyId: 'study_3_transport',
              summary: 'Bireysel karayolu taşıtıyla okula bırakılma tercih edildi (+3.4 kg CO2).'
            },
            {
              key: 'B',
              title: 'Yağmurluğunu Giy: Arkadaşlarla Servise Bin & Yürü',
              desc: 'Servis durağına yürü, arkadaşlarınla sohbet ederek toplu taşıma bilinciyle okula ulaş.',
              metrics: { eco: +12, comfort: -4, social: +8 },
              impact: { co2Kg: 0.2, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_3_transport',
              summary: 'Toplu servis ve yürüyüşle düşük karbonlu ulaşım seçildi.'
            }
          ]
        },
        {
          id: 'teen_act1_water',
          actTag: 'ACT 1 // 07:45',
          timeLabel: '2026 // 07:45',
          title: 'Sabah: Beslenme ve Su İhtiyacı',
          svgId: 'svg-morning',
          narration: 'Ayakkabılarını bağlarken mutfaktaki çelik mataranı unuttuğunu fark ettin. Geri dönmek 2 dakika kaybettirecek.',
          choices: [
            {
              key: 'A',
              title: '"Kantinden 2 Pet Şişe Su Alırım" Deyip Koş',
              desc: 'Boşver, teneffüste kantinden tek kullanımlık plastik şişede su ve pipetli meyve suyu alırsın.',
              metrics: { eco: -10, comfort: +10, social: -5 },
              impact: { co2Kg: 0.8, plasticGrams: 65, waterLiters: 90 },
              studyId: 'study_5_microplastics',
              summary: 'Tek kullanımlık pet şişeler tercih edildi (Mikroplastik yükü).'
            },
            {
              key: 'B',
              title: 'Geri Dön: Çelik Matarayı Doldur ve Çantana At',
              desc: '2 dakika harca, evdeki filtrelenmiş suyu çelik matarana doldur, plastik atık üretme.',
              metrics: { eco: +11, comfort: -3, social: +6 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_5_microplastics',
              summary: 'Yeniden kullanılabilir çelik matara ile sıfır plastik atık sağlandı.'
            }
          ]
        }
      ],

      // ACT 2: Kuşluk Vakti & Teneffüs (10:00 - 11:30)
      act2: [
        {
          id: 'teen_act2_canteen',
          actTag: 'ACT 2 // 10:15',
          timeLabel: '2026 // 10:15',
          title: 'Kuşluk Vakti: Büyük Teneffüs ve Kantin Kuyruğu',
          svgId: 'svg-morning',
          narration: 'Zil çaldı. 20 dakikalık teneffüs. Arkadaş grubun kantine hücum ediyor. Masanda annenin hazırladığı cevizli ve peynirli ev sandviçi duruyor.',
          choices: [
            {
              key: 'A',
              title: 'Ev Sandviçini Gizle: Kantinden Cips ve Çikolata Al',
              desc: 'Arkadaşlarının yanında "ev yemeği" açmaktan çekin, parlak metalize ambalajlı cips ve gazoz al.',
              metrics: { eco: -11, comfort: +10, social: -6 },
              impact: { co2Kg: 1.5, plasticGrams: 80, waterLiters: 320 },
              studyId: 'study_7_food_waste',
              summary: 'Akran baskısıyla ev yemeği israf edildi, paketli abur cubur alındı.'
            },
            {
              key: 'B',
              title: 'Sandviçi Çıkar: Arkadaşlarınla Bölüşerek Ye',
              desc: 'Gülümseyerek sandviçi ikiye böl, kantin sırasına para ve plastik gömmek yerine arkadaşına ikram et.',
              metrics: { eco: +12, comfort: -3, social: +10 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 20 },
              studyId: 'study_7_food_waste',
              summary: 'Ev gıdası paylaşıldı ve ambalaj atığı kaynağında engellendi.'
            }
          ]
        },
        {
          id: 'teen_act2_stationery',
          actTag: 'ACT 2 // 11:00',
          timeLabel: '2026 // 11:00',
          title: 'Kuşluk Vakti: Yırtılan Kalemlik Fermuarı',
          svgId: 'svg-morning',
          narration: 'Görsel Sanatlar dersinde kalem kutunun fermuarı koptu, boya kalemleri sıranın altına saçıldı. Arkadaşın: "TikTok\'taki ışıklı popüler kalemlikten sipariş etsene" diyor.',
          choices: [
            {
              key: 'A',
              title: '"Bugün Sipariş Edelim": Trend Plastik Kalemlik Al',
              desc: 'Eve gidince e-ticaret sitesinden aynı gün teslimatlı ucuz vinil kalemlik sipariş ettir.',
              metrics: { eco: -10, comfort: +11, social: -5 },
              impact: { co2Kg: 2.8, plasticGrams: 140, waterLiters: 480 },
              studyId: 'study_4_fashion',
              summary: 'Hızlı tüketim trendiyle yeni plastik kırtasiye sipariş edildi.'
            },
            {
              key: 'B',
              title: 'Güvenlik İğnesi ve İple Fermuarı Kendin Onar',
              desc: 'Öğretmenden ataş ve iğne iste, fermuarı sağlamlaştırıp üzerine kendi çizdiğin çıkartmayı yapıştır.',
              metrics: { eco: +13, comfort: -4, social: +8 },
              impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 10 },
              studyId: 'study_6_circular',
              summary: 'Küçük yaşta onarım ve dönüştürme kültürü uygulandı.'
            }
          ]
        }
      ],

      // ACT 3: Öğle Molası & Yemekhane (12:30 - 14:00)
      act3: [
        {
          id: 'teen_act3_lunch',
          actTag: 'ACT 3 // 13:00',
          timeLabel: '2026 // 13:00',
          title: 'Öğle Molası: Yemekhane Tabağı ve Kalan Ekmek',
          svgId: 'svg-afternoon',
          narration: 'Okul yemekhanesinde günün menüsü: sebzeli güveç, pilav ve ayran. Masadaki arkadaşların tabaklarındaki sebzeleri yemeden doğrudan çöpe dökmeye yöneldi.',
          choices: [
            {
              key: 'A',
              title: 'Tabağı Aynen Çöpe Bırak: "Ben de Sebze Sevmiyorum"',
              desc: 'Çoğunluğa uy, tabağın yarısını çöp bidonuna dök ve boş mideni kantinden bisküviyle bastır.',
              metrics: { eco: -12, comfort: +9, social: -7 },
              impact: { co2Kg: 2.6, plasticGrams: 50, waterLiters: 650 },
              studyId: 'study_7_food_waste',
              summary: 'Yemekhane gıda israfı yapıldı (650 Litre sanal su kaybı).'
            },
            {
              key: 'B',
              title: 'Tabağını Bitir: "Gıda Çöp Değil" Deyip Örnek Ol',
              desc: 'Porsiyonunu bitir, arkadaşlarına tarladan sofraya gelen emeği hatırlatarak israfı durdurmaya çalış.',
              metrics: { eco: +13, comfort: -3, social: +9 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 15 },
              studyId: 'study_1_pedagogy',
              summary: 'Akranlara gıda tasarrufu ve saygısı konusunda rol model olundu.'
            }
          ]
        },
        {
          id: 'teen_act3_project',
          actTag: 'ACT 3 // 13:45',
          timeLabel: '2026 // 13:45',
          title: 'Öğle Molası: Fen Bilgisi Proje Maketi',
          svgId: 'svg-afternoon',
          narration: 'Fen Bilgisi dersinde yarın "Ekosistem Maketi" teslimi var. Grup arkadaşın: "Kırtasiyeden hazır strafor köpük ve plastik yapay ağaçlar alalım, hemen biter" diyor.',
          choices: [
            {
              key: 'A',
              title: 'Kırtasiyeden Strafor Köpük ve Plastik Figürler Al',
              desc: 'Parayı ver, kolay yoldan strafor köpüğü kesip plastik maket hazırla; strafor tozları sınıfa saçılsın.',
              metrics: { eco: -13, comfort: +12, social: -6 },
              impact: { co2Kg: 4.5, plasticGrams: 320, waterLiters: 290 },
              studyId: 'study_5_microplastics',
              summary: 'Tek kullanımlık strafor köpük ve mikroplastik materyalleri tercih edildi.'
            },
            {
              key: 'B',
              title: 'Evdeki Atık Karton Koli, Kozalak ve Kuru Dallar',
              desc: 'Parktan dökülen dalları ve evdeki yumurta viyollerini topla, gerçek bir sıfır atık ekosistemi yarat.',
              metrics: { eco: +14, comfort: -5, social: +10 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 10 },
              studyId: 'study_1_pedagogy',
              summary: 'Doğal biyobozunur atıklardan geri dönüştürülmüş bilim maketi yapıldı.'
            }
          ]
        }
      ],

      // ACT 4: Okul Çıkışı & Akran Baskısı (16:30 - 18:30)
      act4: [
        {
          id: 'teen_act4_trend',
          actTag: 'ACT 4 // 17:00',
          timeLabel: '2026 // 17:00',
          title: 'Okul Çıkışı: Yırtılan Sneaker ve Marka Çılgınlığı',
          svgId: 'svg-afternoon',
          narration: 'Beden eğitimi maçında spor ayakkabının burun dikişi açıldı. Sınıftaki herkesin ayağında sosyal medyada viral olan 5 bin liralık sentetik yeni model sneaker var.',
          choices: [
            {
              key: 'A',
              title: '"Herkes Bunu Giyiyor!": Ailene Pahalı Sneaker Aldır',
              desc: 'Ayakkabıyı köşeye fırlat, "bu halde okula gitmem" diyerek sentetik ve ağır su ayak izli yeni çift aldır.',
              metrics: { eco: -13, comfort: +12, social: -8 },
              impact: { co2Kg: 9.8, plasticGrams: 450, waterLiters: 2850 },
              studyId: 'study_4_fashion',
              summary: 'Akran baskısıyla yüksek su ve karbon ayak izli sentetik ayakkabı tüketildi.'
            },
            {
              key: 'B',
              title: 'Mahalle Lostrasına Götür: Dikim ve Yeni Renkli Bağcık',
              desc: 'Lostracı amcaya uğra, dikiş attır ve harçlığından 20 liraya fosforlu bağcık alarak kendi tarzını yarat.',
              metrics: { eco: +14, comfort: -4, social: +9 },
              impact: { co2Kg: 0.2, plasticGrams: 0, waterLiters: 25 },
              studyId: 'study_6_circular',
              summary: 'Tamir ettirilip özelleştirilerek 2.850 Litrelik su israfı kurtarıldı.'
            }
          ]
        },
        {
          id: 'teen_act4_boba',
          actTag: 'ACT 4 // 17:45',
          timeLabel: '2026 // 17:45',
          title: 'Okul Çıkışı: AVM ve Plastik Bardaklı İçecek',
          svgId: 'svg-afternoon',
          narration: 'Sınav çıkışı arkadaşlarınla AVM\'ye gittiniz. Herkes devasa plastik bardakta, kalın plastik pipetli şekerli soğuk çay/boba kuyruğunda.',
          choices: [
            {
              key: 'A',
              title: 'Kuyruğa Gir: Plastik Bardak ve Kalın Pipetle Al',
              desc: 'Trend içeceği al, fotoğrafını çekip sosyal medyaya yükle, 10 dakika sonra kalın plastik bardağı çöpe at.',
              metrics: { eco: -11, comfort: +11, social: -4 },
              impact: { co2Kg: 1.8, plasticGrams: 110, waterLiters: 240 },
              studyId: 'study_5_microplastics',
              summary: 'Sosyal medya trendi için tek kullanımlık plastik bardak tüketildi.'
            },
            {
              key: 'B',
              title: 'Cam Bardaklı Yerel Çay Ocağına / Parka Davet Et',
              desc: '"Parktaki çimenlere oturalım, bakkaldan cam şişe maden suyu içelim" diyerek arkadaş grubunu yönlendir.',
              metrics: { eco: +12, comfort: -3, social: +10 },
              impact: { co2Kg: 0.2, plasticGrams: 0, waterLiters: 20 },
              studyId: 'study_2_nudge',
              summary: 'Akran grubuna çevre dostu ve ambalajsız buluşma alternatifi sunuldu.'
            }
          ]
        }
      ],

      // ACT 5: Akşam & Gece Mesaisi (20:00 - 22:30)
      act5: [
        {
          id: 'teen_act5_gaming',
          actTag: 'ACT 5 // 20:30',
          timeLabel: '2026 // 20:30',
          title: 'Gece: Online Oyun ve Bilgisayar Açık Kalması',
          svgId: 'svg-night',
          narration: 'Saat 22:30. Yarın okul var. Bilgisayarında oynadığın online oyunda arkadaşların: "Hadi bir el daha, sabaha kadar yayındayız!" diye sesli sohbetten ısrar ediyor.',
          choices: [
            {
              key: 'A',
              title: 'Sabaha Kadar Oyna, Ekranı ve RGB LED\'leri Açık Bırak',
              desc: 'Oyun başından 02:30\'a kadar kalkma, tüm ışıkları ve güçlü ekran kartını sabaha kadar tam güç çalıştır.',
              metrics: { eco: -12, comfort: +12, social: -7 },
              impact: { co2Kg: 3.8, plasticGrams: 0, waterLiters: 35 },
              studyId: 'study_8_digital',
              summary: 'Gece boyu yüksek watt dijital oyun ve veri merkezi yükü üretildi.'
            },
            {
              key: 'B',
              title: '"Yarın Görüşürüz" De: Bilgisayarı Kapat, Fişi Çek',
              desc: 'Oyundan çık, ana prizin anahtarını kapat, derin ve dinlendirici bir uykuya geç.',
              metrics: { eco: +12, comfort: -4, social: +7 },
              impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 5 },
              studyId: 'study_8_digital',
              summary: 'Dijital karbon ayak izi sıfırlandı, enerji tasarrufu sağlandı.'
            }
          ]
        },
        {
          id: 'teen_act5_tablet',
          actTag: 'ACT 5 // 21:15',
          timeLabel: '2026 // 21:15',
          title: 'Gece: Yavaşlayan Tablet ve Yeni Cihaz Baskısı',
          svgId: 'svg-night',
          narration: 'Ders videolarını izlediğin 4 yıllık tabletin şarjı çabuk bitiyor ve uygulamalar bazen geç açılıyor. Reklamlarda en yeni yapay zekalı tablet parlıyor.',
          choices: [
            {
              key: 'A',
              title: 'Anne-Babaya Trip At: "Bana Yeni Tablet Alın"',
              desc: 'Eski tableti çekmeceye kilitle, aileyi borca sokup fabrikadan yeni çıkan elektronik aygıt aldır.',
              metrics: { eco: -14, comfort: +12, social: -9 },
              impact: { co2Kg: 18.0, plasticGrams: 350, waterLiters: 1900 },
              studyId: 'study_6_circular',
              summary: 'Elektronik atık ve nadir metal tüketimi körüklendi (+18 kg CO2).'
            },
            {
              key: 'B',
              title: 'Gereksiz Dosyaları Sil, Hafızayı Temizle ve Bataryayı Koru',
              desc: 'Ayarlardan önbelleği boşalt, arka plan uygulamalarını kapat; tabletin ömrünü 2 yıl daha uzat.',
              metrics: { eco: +14, comfort: -4, social: +8 },
              impact: { co2Kg: 0.2, plasticGrams: 0, waterLiters: 15 },
              studyId: 'study_6_circular',
              summary: 'Mevcut cihazın ömrü optimize edilerek elektronik atık engellendi.'
            }
          ]
        }
      ]
    }
  };

  // --- PROCEDURAL SURPRISE ACTS POOL ---
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
          impact: { co2Kg: 0.8, plasticGrams: 0, waterLiters: 850 },
          studyId: 'study_7_food_waste',
          summary: 'Sokakta boşa akan su hattı görmezden gelindi (850L su kaybı).'
        },
        {
          key: 'B',
          title: 'Eğil ve Müdahale Et: Vanayı Sık',
          desc: 'Kıyafetinin ıslanmasını göze alarak eğil, paslı demir kolu zorlayarak hattı kapat ve su israfını kes.',
          metrics: { eco: +14, comfort: -5, social: +12 },
          impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 10 },
          studyId: 'study_10_intergenerational',
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
          impact: { co2Kg: 2.5, plasticGrams: 0, waterLiters: 10 },
          studyId: 'study_3_transport',
          summary: 'Rölantide duman salan araç karşısında pasif kalındı (Demirtürk, 2021).'
        },
        {
          key: 'B',
          title: 'Nezaketle Uyar: Kontağı Kapattır',
          desc: 'Şoförün yanına yaklaş; tebessümle motorun boşuna çalıştığını söyleyip kontağı kapatmasını rica et.',
          metrics: { eco: +12, comfort: -4, social: +12 },
          impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 0 },
          studyId: 'study_2_nudge',
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
          impact: { co2Kg: 1.2, plasticGrams: 280, waterLiters: 120 },
          studyId: 'study_5_microplastics',
          summary: 'Parktaki plastik atık yığını görmezden gelindi (Arı & Öğüt, 2021).'
        },
        {
          key: 'B',
          title: '3 Dakikanı Ver: Çöp Kutusuna Taşı',
          desc: 'Dur, yerdeki şişeleri toplayıp 20 metre ötedeki geri dönüşüm kafesine at, alanı temizle.',
          metrics: { eco: +14, comfort: -5, social: +14 },
          impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 15 },
          studyId: 'study_6_circular',
          summary: 'Parktaki plastik atıklar toplanarak geri dönüşüme atıldı.'
        }
      ]
    },
    {
      id: 'surprise_stray_cat',
      actTag: 'SÜRPRİZ KESİŞME // 19:15',
      timeLabel: '2026 // 19:15',
      title: 'Yoldaki Kırılma: Kuru Su Kabı ve Sokak Canlısı',
      svgId: 'svg-night',
      narration: 'Mahalle köşesindeki sokak kedisi kuru betonun üstünde boş bir plastik kabın yanında miyavlıyor. Mataranda veya çantanda yarım litre içme suyun var.',
      choices: [
        {
          key: 'A',
          title: 'Suyunu Kendine Sakla: Yola Devam Et',
          desc: 'Eve kadar yolun var, susarsan su bulamazsın. Hızlanıp köşeyi dön.',
          metrics: { eco: -8, comfort: +5, social: -8 },
          impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 0 },
          studyId: 'study_10_intergenerational',
          summary: 'Kendi suyu sokak hayvanıyla paylaşılmadı.'
        },
        {
          key: 'B',
          title: 'Mataradaki Suyu Kaba Doldur',
          desc: 'Diz çök, mataranın kapağını aç ve suyu kaba dök. Kedinin susuzluğunu giderişini izle.',
          metrics: { eco: +11, comfort: -3, social: +12 },
          impact: { co2Kg: 0.05, plasticGrams: 0, waterLiters: 0 },
          studyId: 'study_2_nudge',
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
          impact: { co2Kg: 1.5, plasticGrams: 150, waterLiters: 90 },
          studyId: 'study_6_circular',
          summary: 'Apartmandaki koli atıkları görmezden gelindi.'
        },
        {
          key: 'B',
          title: 'Kolileri Katla: Geri Dönüşüm Bölmesine Koy',
          desc: '2 dakikanı ayırıp kutuları düzleştir, ıslanmadan kağıt geri dönüşüm kafesine yerleştir.',
          metrics: { eco: +12, comfort: -4, social: +12 },
          impact: { co2Kg: 0.1, plasticGrams: 0, waterLiters: 15 },
          studyId: 'study_6_circular',
          summary: 'Koli atıkları katlanarak geri dönüşüme kazandırıldı.'
        }
      ]
    }
  ];

  // --- 5 DISTINCT 2045 ENDINGS GROUNDED IN STUDIES ---
  const ENDINGS = {
    ENDING_A: {
      id: 'ENDING_A',
      title: 'PLASTİK ŞAFAK',
      badge: 'DİSTOPİK ÇÖKÜŞ',
      badgeClass: 'badge-danger',
      svgId: 'svg-ending-a',
      quote: '"Konfor arayışımızın bedelini ciğerlerimizle ödüyoruz."',
      desc: 'Yıl 2045. Şehir artık nefes alınamaz bir sera. Temiz hava, abonelikle satın alınan lüks bir meta haline geldi. 2026\'daki o acil tek kullanımlık kararlar, aşırı enerji tüketimi ve sokağa karşı kayıtsızlık, gökyüzünü zehirli turuncu bir sise dönüştürdü. Dışarı çıkmak için 3. seviye solunum cihazı zorunlu.',
      advice: 'Gündelik konforun anlık rahatlığı, geleceğin solunabilir havasını ipotek altına aldı (Arı & Öğüt, 2021 mikroplastik toksisitesi). Bir dahaki sefere atıkları kaynağında durdurmayı dene.',
      scientificAnchor: 'Arı & Öğüt (2021) mikroplastik partiküllerin atmosferik ve hücresel birikimi bulgusu.',
      mood: 'dystopia'
    },
    ENDING_B: {
      id: 'ENDING_B',
      title: 'TEKNO-AYRIŞMA',
      badge: 'KUBBE KASTI',
      badgeClass: 'badge-warning',
      svgId: 'svg-ending-b',
      quote: '"Dünya yandı, biz ise cam bir fanusun içine sığındık."',
      desc: 'Yıl 2045. Dünya ekolojik çöküşten kurtulamadı ama teknoloji parası yetenleri izole etti. Devasa iklim kontrollü cam kubbelerin altında yapay çimler ve steril kafeler yükseliyor; kubbenin dışında ise çöl fırtınalarıyla boğuşan milyonlar var. Kendi konforunu kurtardın ama insanlığın yarısını dışarıda bıraktın.',
      advice: 'Yüksek bireysel konfor ve düşük empati, toplumu birbirinden yalıtılmış kalelere böldü (Balcılar, 2022 iklim adaletsizliği). Bir dahaki sefere kolektif dayanışmayı gözet.',
      scientificAnchor: 'Balcılar (2022) iklim krizinde sınır korumacılığı ve eko-ayrışma analizi.',
      mood: 'tense'
    },
    ENDING_C: {
      id: 'ENDING_C',
      title: 'SİMBİYOZ & ONARIM',
      badge: 'EKOLOJİK ÜTOPYA',
      badgeClass: 'badge-success',
      svgId: 'svg-ending-c',
      quote: '"Geçmişin küçük onarımları, geleceğin yemyeşil ormanlarına dönüştü."',
      desc: 'Yıl 2045. Beton ile doğa barıştı. Şehirler devasa birer karbon yutucusu ve yaşayan organizma haline geldi. 2026\'da termosa koyduğun o su, onardığın o ceket, kapattığın o vana ve ayrıştırdığın hammadde, kolektif bir uyanışın ilk kelebek kanatlarıydı. Temiz su, berrak gökyüzü ve serin nehirler artık herkesin hakkı.',
      advice: 'Küçük adımların birikimli gücüyle bir gezegen kurtarıldı (Güngör, 2023 döngüsel ekonomi modelleri). Bu bilinçli yaşam tarzını gerçek hayatta da sürdür!',
      scientificAnchor: 'Güngör (2023) kaynak azaltımı ve onarım kültürünün atığı %50+ engelleme potansiyeli.',
      mood: 'utopia'
    },
    ENDING_E: {
      id: 'ENDING_E',
      title: 'DİJİTAL İNZİVA',
      badge: 'SOĞUK İZOLASYON',
      badgeClass: 'badge-purple',
      svgId: 'svg-ending-e',
      quote: '"Sokaklar boşaldı; herkes kendi sanal odasında tek başına yaşlandı."',
      desc: 'Yıl 2045. Gezegen tamamen çökmedi ama toplum çözüldü. İnsanlar sokaktan, mahalleden ve yüz yüze temastan tamamen koptu. Herkes nöral kasklar ve 8K ekranlar arkasında yalnız birer ada gibi yaşıyor. Ekolojik felaket yaşanmadı ama ruhsal bir kış mevsimi başladı.',
      advice: 'Aşırı ekran bağımlılığı ve komşudan kaçış, insani sıcaklığı dondurdu (Koçyiğit & Özkul, 2023 dijital ayak izi). Bir dahaki sefere sokağa ve arkadaşlığa adım at.',
      scientificAnchor: 'Koçyiğit & Özkul (2023) görünmeyen dijital tüketimin bireysel izolasyon üzerindeki etkileri.',
      mood: 'limbo'
    },
    ENDING_D: {
      id: 'ENDING_D',
      title: 'KIRILGAN ARAF',
      badge: 'BELİRSİZ DENGE',
      badgeClass: 'badge-neutral',
      svgId: 'svg-ending-d',
      quote: '"Ne tam battık ne de kurtulduk; gri bir arafta asılı kaldık."',
      desc: 'Yıl 2045. Ne tam bir çöküş yaşandı ne de gerçek bir kurtuluş gerçekleşti. Dünya sürekli bir kriz yönetimi modunda, gri ve yorgun bir dengede nefes alıyor. Bir gün bilinçli davranıp ertesi gün hoyratça tüketen kararsızlığımız, 2045\'i de kararsız bir arafta bıraktı.',
      advice: 'Kararsızlık ve yarı-gönüllü adımlar gezegeni arafta tuttu (Demir, 2022 kuşaklararası adalet). Gelecek kuşaklara borç bırakmamak için daha tutarlı tercihler yap.',
      scientificAnchor: 'Demir (2022) Rawls & Kant etiğinde kuşaklararası ekolojik borç kavramı.',
      mood: 'tense'
    }
  };

  // --- 10 PERSISTENT ACHIEVEMENTS ---
  const ACHIEVEMENTS_DATA = [
    {
      id: 'ACH_ZERO_WASTE',
      icon: '🌿',
      title: 'Sıfır Atık Şampiyonu',
      desc: 'Bir oyunu en az %80 Ekolojik Bakiye ile tamamla.',
      condition: (state) => state.metrics.eco >= 80
    },
    {
      id: 'ACH_COMFORT_ADDICT',
      icon: '⚡',
      title: 'Konfor Müptelası',
      desc: 'Bir oyunu %85 veya üzeri Konfor Bağımlılığı ile bitir.',
      condition: (state) => state.metrics.comfort >= 85
    },
    {
      id: 'ACH_SOCIAL_PILLAR',
      icon: '🤝',
      title: 'Mahalle Ruhu',
      desc: 'Kolektif Empati seviyesini %80 veya üzerine çıkar.',
      condition: (state) => state.metrics.social >= 80
    },
    {
      id: 'ACH_ENDING_A',
      icon: '☣️',
      title: 'Zehirli Şafak Şahidi',
      desc: 'Plastik Şafak (Distopik Çöküş) sonunu deneyimle.',
      condition: (state) => state.unlockedEnding === 'ENDING_A'
    },
    {
      id: 'ACH_ENDING_B',
      icon: '🏙️',
      title: 'Kubbe Sakini',
      desc: 'Tekno-Ayrışma (Kubbe Kastı) sonuna ulaş.',
      condition: (state) => state.unlockedEnding === 'ENDING_B'
    },
    {
      id: 'ACH_ENDING_C',
      icon: '🌲',
      title: 'Geleceğin Mimarı',
      desc: 'Simbiyoz & Onarım (Ekolojik Ütopya) sonunu inşa et.',
      condition: (state) => state.unlockedEnding === 'ENDING_C'
    },
    {
      id: 'ACH_ENDING_E',
      icon: '🥽',
      title: 'Ağın Hayaleti',
      desc: 'Dijital İnziva (Soğuk İzolasyon) sonunu aç.',
      condition: (state) => state.unlockedEnding === 'ENDING_E'
    },
    {
      id: 'ACH_ALL_PERSONAS',
      icon: '🎭',
      title: 'Çok Yönlü Bakış',
      desc: '3 farklı karakter perspektifiyle de en az bir tur oyna.',
      condition: (state, meta) => meta.playedPersonas && meta.playedPersonas.length >= 3
    },
    {
      id: 'ACH_BUTTERFLY_RESOLVER',
      icon: '🦋',
      title: 'Kelebek Koruyucusu',
      desc: 'Sürpriz bir sokak kesişmesinde fedakarlık yaparak müdahale et.',
      condition: (state) => state.history.some(h => h.sceneId.startsWith('surprise_') && h.choiceKey === 'B')
    },
    {
      id: 'ACH_TIME_TRAVELER',
      icon: '⏳',
      title: 'Zaman Yolcusu',
      desc: 'Toplamda 3 tam oyun turunu tamamla.',
      condition: (state, meta) => (meta.totalRuns || 0) >= 3
    }
  ];

  window.YANKI_SCENARIOS = {
    SCENARIO_POOLS,
    SURPRISE_ACTS_POOL,
    ENDINGS,
    ACHIEVEMENTS_DATA
  };
})();
