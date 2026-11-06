/**
 * YANKI (ECHO): 2045'e 5 Dakika
 * academicData.js - 10 Hakemli Akademik Araştırma ve Kuramsal Çerçeve Veritabanı
 * Üniversite düzeyi teslimat, APA 7 künyeleri ve DOI referansları.
 */

(function () {
  'use strict';

  const ACADEMIC_STUDIES = [
    {
      id: 'study_1_pedagogy',
      category: 'Ciddi Oyunlar & Çevre Pedagojisi',
      title: "The reflections of the 'stop climate change digital game' on primary school students' learning about climate change",
      authors: 'İdil, S., & Koçak, O.',
      year: 2024,
      journal: 'Journal of Education in Science, Environment and Health',
      volume: '10(1), 18–31',
      doi: 'https://doi.org/10.55549/jeseh.1417905',
      finding: 'Dijital oyun tabanlı çevre simülasyonları, geleneksel bilgilendirme metinlerine kıyasla öğrencilerin iklim krizine karşı sorumluluk ve eylemlilik bilincini kalıcı biçimde artırmaktadır.',
      roleInGame: 'Simülasyonun giriş manifestosu ve pedagojik altyapısı; oyuncunun kendi tercihlerinin sonuçlarını deneyimlemesinin davranışsal gerekçesi.'
    },
    {
      id: 'study_2_nudge',
      category: 'Davranışsal İktisat & Dürtme Teorisi',
      title: 'Dürtme teorisinin davranışsal kamu politikası aracı olarak kullanılması: Eskişehir Tepebaşı Belediyesi uygulaması',
      authors: 'Yürük, E., & Sadioğlu, U.',
      year: 2024,
      journal: 'İDEALKENT',
      volume: '16(46), 2733–2757',
      doi: 'https://doi.org/10.31198/idealkent.1569471',
      finding: 'Kişilerin seçim özgürlüğünü kısıtlamadan, çevre dostu alternatifleri görünür kılan ve karar mimarisini yeniden çerçeveleyen mikro dürtmeler (nudges), kentsel sürdürülebilirlikte yüksek geri dönüş sağlamaktadır.',
      roleInGame: 'Karar kartlarının mikro-seçim mimarisi (anlık konfor tuzağına karşı bilinçli çaba ikilemi) ve Karar Ağacı mekanizması.'
    },
    {
      id: 'study_3_transport',
      category: 'Kentsel Ulaşım & Karayolu Emisyon Payı',
      title: 'Sürdürülebilir ulaşımda sera gazı etkisini azaltmaya yönelik çalışmalar',
      authors: 'Demirtürk, D.',
      year: 2021,
      journal: 'Mühendislik Bilimleri ve Tasarım Dergisi',
      volume: '9(4), 1080–1092',
      doi: 'https://doi.org/10.21923/jesd.932385',
      finding: 'Küresel ulaşım kaynaklı sera gazı emisyonlarının %74,5 gibi ezici bir çoğunluğu karayolu taşımacılığından kaynaklanmakta olup, raylı sistem ve mikromobiliteye geçiş emisyonları doğrudan düşürmektedir.',
      roleInGame: 'Act 2 Ulaşım Sahnesi (Bireysel araç/taksi vs. Metro ve yürüyüş) ve yıllık karbon faturası katsayıları (+4.8 kg CO2).'
    },
    {
      id: 'study_4_fashion',
      category: 'Hızlı Moda, Sentetik Lifler & Su Kirliliği',
      title: 'Hızlı modanın çevresel etkileri',
      authors: 'Sevgili, Ş., & Pekacar, M.',
      year: 2024,
      journal: 'TAM Akademi Dergisi',
      volume: '3(1), 119–134',
      doi: 'https://doi.org/10.58239/tamde.2024.01.008.x',
      finding: 'Tekstil endüstrisi küresel karbon salınımının %8\'i ve endüstriyel atık suların %20\'sinden sorumludur. Tek bir pamuklu giysinin üretimi ortalama 2.700 litre sanal su tüketmektedir.',
      roleInGame: 'Act 4 Kıyafet Sahnesi (Ekspres kargolu sentetik blazer vs. Terzide onarım) ve 2.700 Litre sanal su tüketim hesabı.'
    },
    {
      id: 'study_5_microplastics',
      category: 'Tek Kullanımlık Plastikler & Mikroplastik Toksisitesi',
      title: 'Mikroplastikler ve çevresel etkileri',
      authors: 'Arı, M., & Öğüt, S.',
      year: 2021,
      journal: 'Düzce Üniversitesi Bilim ve Teknoloji Dergisi',
      volume: '9(2), 864–877',
      doi: 'https://doi.org/10.29130/dubited.757698',
      finding: 'Gündelik tek kullanımlık ambalajlar ve sentetik giysiler aşınarak doğaya mikrometre altı partiküller salmakta; solunum ve besin zinciri yoluyla organizmalarda toksik birikim yapmaktadır.',
      roleInGame: 'Act 1 & 2 Kahve/karton bardak ve paket gıda seçimleri; Ending A (Plastik Şafak) atmosferik mikroplastik solunum krizi.'
    },
    {
      id: 'study_6_circular',
      category: 'Döngüsel Ekonomi & Kurumsal Onarım Kültürü',
      title: "Sürdürülebilirlik raporlarında döngüsel ekonomi: Borsa İstanbul'da bir araştırma",
      authors: 'Güngör, N.',
      year: 2023,
      journal: 'Denetim ve Güvence Hizmetleri Dergisi',
      volume: '3(1), 36–47',
      doi: '',
      finding: 'Döngüsel ekonomiye geçişte kaynak kullanımının azaltılması (%53) ve yeniden kullanım / onarım modelleri (%50) atık oluşumunu engellemede en yüksek kurumsal başarı faktörüdür.',
      roleInGame: 'Ending C (Simbiyoz ve Onarım) ve Mahalle Zanaatkarı perspektifindeki hurda dönüştürme ve onarım pratikleri.'
    },
    {
      id: 'study_7_food_waste',
      category: 'Hane İçi Gıda İsrafı & Ekmek Atığı',
      title: 'Bireylerin hane içi gıda israfı ile ilgili algılamalarını değerlendirmeye yönelik bir araştırma',
      authors: 'Demir, Y.',
      year: 2020,
      journal: 'Karadeniz Uluslararası Bilimsel Dergi',
      volume: '1(48), 10–26',
      doi: 'https://doi.org/10.17498/kdeniz.750092',
      finding: 'Bireylerin %70\'i evlerinde gıda israfı yaptığını belirtmekte ve israfta unlu mamuller (özellikle ekmek) başı çekmektedir. Bu durum ciddi miktarda gizli toprak ve su israfı doğurmaktadır.',
      roleInGame: 'Act 1 Sabah Açlığı sahnesi (Bayat ekmeği değerlendirme vs. Paket sıcak sipariş) ve sıfır atık gıda hesaplamaları.'
    },
    {
      id: 'study_8_digital',
      category: 'Görünmeyen Dijital Ayak İzi & Veri Merkezleri',
      title: 'Bireylerin dijital ayakizi farkındalık ve yönetim düzeylerine yönelik bir araştırma',
      authors: 'Koçyiğit, İ., & Özkul, A. S.',
      year: 2023,
      journal: 'Süleyman Demirel Üniversitesi Vizyoner Dergisi',
      volume: '14(40), 1290–1310',
      doi: 'https://doi.org/10.21076/vizyoner.1219704',
      finding: 'Bireyler fiziksel atıkların farkında olsa da, veri merkezlerinin 7/24 soğutma ve elektrik tüketiminden kaynaklanan görünmeyen dijital karbon ayak izi konusunda ciddi bir farkındalık açığı bulunmaktadır.',
      roleInGame: 'Act 5 Gece Tüketimi (Yüksek watt ekran kartı, 4K video akışı ve sabaha kadar şarjda bırakma).'
    },
    {
      id: 'study_9_climate_justice',
      category: 'İklim Adaletsizliği & Ekolojik Sınırlar',
      title: 'İklim adaleti bağlamında sınırlar ve iklim göçü',
      authors: 'Balcılar, A. N.',
      year: 2022,
      journal: 'Uluslararası Eşitlik Politikası Dergisi',
      volume: '2(1), 118–132',
      doi: '',
      finding: 'İklim krizinin sorumluluğu gelişmiş tüketici sınıflarına aitken, en ağır bedeli kırılgan ve yoksul toplumlar ödemekte; bu durum eko-ayrışma ve iklim mülteciliği krizlerini derinleştirmektedir.',
      roleInGame: 'Ending B (Tekno-Ayrışma); zenginlerin biyo-kubbelerde izole olup halkın çölleşen sokaklarda terk edilmesi senaryosu.'
    },
    {
      id: 'study_10_intergenerational',
      category: 'Kuşaklararası Adalet & Rawls/Kant Etiği',
      title: "İklim adaletine Kant ve Rawls'un etik temelli adalet teorileri çerçevesinde felsefi bir yaklaşım",
      authors: 'Demir, A.',
      year: 2022,
      journal: 'İnsan ve İnsan',
      volume: '9(33), 63–75',
      doi: 'https://doi.org/10.29224/insanveinsan.1103781',
      finding: 'Kant\'ın ödev ahlakı ve Rawls\'un adalet teorisi uyarınca, mevcut kuşağın konfor adına ekosistemi tüketmesi gelecek nesillerin varoluşsal haklarını çiğneyen ahlaki bir borçlanmadır.',
      roleInGame: '2026\'dan 2035\'e Zaman Sıçraması ve 2045 Nihai Gezegensel Fatura; kuşaklararası devredilen ekolojik borç.'
    }
  ];

  window.YANKI_ACADEMIC = {
    STUDIES: ACADEMIC_STUDIES
  };
})();
