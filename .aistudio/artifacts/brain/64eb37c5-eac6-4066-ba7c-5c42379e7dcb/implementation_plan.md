# YANKI (ECHO): 2045'e 5 Dakika — Oyun-Öncelikli & Bilimsel Temelli Karar Simülasyonu

"YANKI: 2045'e 5 Dakika" projesini, akademik bir bülten veya makale yayını gibi hissettirmeden; 10 hakemli araştırmanın ampirik gerçekleriyle organik olarak yoğrulmuş, saf bir sinematik oyun (*Detroit: Become Human* ve *We Become What We Behold* esintili) olarak Vercel Hobby üzerinde sıfır konfigürasyonla çalışan statik bir başyapıta dönüştürme planı.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Kullanıcı ile netleştirilen "Oyun-Öncelikli" tasarım kararları:

- **Confirmed Decision 1 (Oyun Akıcılığı & Sıfır Dikkat Dağınıklığı)**: Karar kartları akademik bilgi haplarıyla veya butonlarla doldurulmayacak; tamamen hikayeye, atmosferik siberpunk/solarpunk estetiğine ve oyuncunun ikilemine odaklanacaktır.
- **Confirmed Decision 2 (Arka Planda Ampirik Çevrebilim Motoru)**: 10 akademik makalenin bulguları (karayolu %74,5 emisyonu, hızlı modanın 2.700L su tüketimi, gıda israfı, veri merkezlerinin görünmeyen yükü, mikroplastik birikimi, iklim adaleti kubbeleri), oyunun senaryo kurgusuna ve 2045'teki **Somut Gezegensel Fatura** hesaplayıcısına (kg $CO_2$, kg atık, Litre sanal su) organik olarak işlenecektir.
- **Confirmed Decision 3 (Sessiz Proje Künyesi & Kaynakça Modalı)**: Üniversite vize ödevi teslimi ve akademik değerlendirme için HUD üst barına `[ 📖 Kaynakça & Künye ]` butonu eklenecektir. Bu pencere, oyunun arkasında yatan 10 makalenin tam APA 7 künyesini ve oyundaki yansımasını sessizce sunacaktır.
- **Confirmed Decision 4 (Vercel Hobby Uyumluluğu)**: Hiçbir harici ağır framework veya harici yapay zeka API anahtarına bağlı kalmaksızın, tamamen istemci taraflı (pure Vanilla JS, semantic HTML5, CSS3, Web Audio API) tek tıkla canlıya alınabilir statik mimari korunacaktır.

---

## 1. 10 Akademik Kaynağın Oyun Dünyasına Organik Yedirilmesi

Oyunun kararları ve sonuçları, aşağıdaki 10 ampirik araştırmanın gerçek verileriyle şekillenir:

1. **İdil & Koçak (2024) — Ciddi Oyunlar Pedagojisi:**
   - *Oyun İçi Yansıması:* Oyunun giriş manifestosu; sıradan bir çevre uyarısı yerine, oyuncunun kendi seçimlerinin bedeliyle yüzleşmesinin davranışsal gücü.
2. **Yürük & Sadioğlu (2024) — Dürtme (Nudge) Teorisi:**
   - *Oyun İçi Yansıması:* Seçeneklerin sunum mimarisi (anlık konfor tuzağına karşı bilinçli çaba ikilemi) ve Karar Ağacı'ndaki patika bağımlılığı.
3. **Demirtürk (2021) — Karayolu Emisyon Payı:**
   - *Oyun İçi Yansıması:* Act 2 Ulaşım Sahnesi; karayolu taşımacılığının %74,5'lik emisyon payı nedeniyle bireysel araç seçiminde $+4.8\text{ kg } CO_2$ yükünün hesaplanması.
4. **Sevgili & Pekacar (2024) — Hızlı Moda & Su Kirliliği:**
   - *Oyun İçi Yansıması:* Act 4 Kıyafet Sahnesi; hızlı teslimatlı ucuz sentetik ceket seçiminde bir giysinin $+2.700\text{ Litre}$ sanal su tüketimi ve $+16\text{ kg } CO_2$ faturasının yansıtılması.
5. **Arı & Öğüt (2021) — Mikroplastik Toksisitesi:**
   - *Oyun İçi Yansıması:* Tek kullanımlık bardak ve kurye köpük ambalajları; Ending A (Plastik Şafak) distopyasındaki solunum maskesi ve atmosferik mikroplastik sisi.
6. **Güngör (2023) — Döngüsel Ekonomi & Onarım Kültürü:**
   - *Oyun İçi Yansıması:* Zanaatkar perspektifi ve Ending C (Simbiyoz ve Onarım); hammadde azaltımı (%53) ve onarımın (%50) atıkları önlemedeki dönüştürücü gücü.
7. **Demir (2020) — Hane İçi Gıda İsrafı:**
   - *Oyun İçi Yansıması:* Act 1 Sabah Açlığı; tüketicilerin %70'inin gıda israfı yaptığı ve ekmeğin başı çektiği tespitiyle, bayat ekmeği değerlendirmenin su ve karbon tasarrufu.
8. **Koçyiğit & Özkul (2023) — Görünmeyen Dijital Ayak İzi:**
   - *Oyun İçi Yansıması:* Act 5 Gece Tüketimi; veri merkezlerinin ve yüksek güç tüketimli ekranların görünmeyen elektrik faturası ($+3.5\text{ kg } CO_2$).
9. **Balcılar (2022) — İklim Adaletsizliği & Kubbe Kastı:**
   - *Oyun İçi Yansıması:* Ending B (Tekno-Ayrışma); iklim krizinden kaçan varlıklı sınıfların biyo-kubbelere sığınması ve dışarıda kalanların çöl fırtınalarıyla boğuşması.
10. **Demir (2022) — Kuşaklararası Adalet & Rawls/Kant Etiği:**
    - *Oyun İçi Yansıması:* 2026'dan 2035'e Zaman Sıçraması; bugünkü küçük bencil alışkanlıkların 20 yıl sonra gelecek nesillere bıraktığı telafisiz ekolojik miras.

---

## 2. User Experience & Visual Design

### A. Ekran Akışı & Oyunculuk Deneyimi

```
[1. GİRİŞ EKRANI]
       ├── Karakter Seçimi (Kentli Çalışan / Öğrenci / Zanaatkar)
       ├── Tohum Zarı (#YANKI-XXXX)
       └── HUD: ◈ YANKI   [📖 Kaynakça]   [🏆 Başarımlar]   [🔊 Ses]
       │
       ▼
[2. OYUN SAHNESİ (ACT 1 - 5 + PROCEDURAL SÜRPRİZLER)]
       ├── Sinematik SVG Arka Plan (Şafak / Ticaret / Gece)
       ├── Edebi & Çarpıcı Karar Kartları (Sıfır dikkat dağıtıcı popup)
       └── Web Audio Akustik Tıklama & Sub-bas Yankısı
       │
       ▼
[3. ZAMAN SIÇRAMASI: 2026 ➔ 2035]
       ├── Hızla ilerleyen yıl sayacı ve kamera vizörü
       └── Kararlara göre değişen 2031-2035 gazete manşetleri
       │
       ▼
[4. 2045 NİHAİ DÜNYA & SOMUT GEZEGENSEL FATURA]
       ├── 5 Özgün Gelecek Sonu (Plastik Şafak, Kubbe Kastı, Simbiyoz vb.)
       ├── Ekoloji, Empati, Konfor % Barları
       ├── SOMUT ÇEVREBİLİM FATURASI (Gerçek Sayısal Birimler):
       │   * 💨 Toplam Karbon Ayak İzi: X kg CO2-e
       │   * 🥤 Üretilen Katı & Mikroplastik Atık: X kg
       │   * 💧 İsraf Edilen Sanal Su: X Litre
       └── Eyleme Dönük Gelecek Öğüdü
       │
       ▼
[5. KARAR GEÇMİŞİ & FLOWCHART (ÇİFT MOD)]
       ├── Görsel SVG Düğüm Grafiği (Detroit Tarzı)
       └── Kompakt Karar Karşılaştırma Listesi
```

### B. Kaynakça & Proje Künyesi Modalı (Teslimat Amaçlı)
- HUD üzerindeki `[ 📖 Kaynakça & Künye ]` butonu ile açılır.
- Sade, şık, dergi/kitap formatında hazırlanmış 10 makalenin tam künyesini (APA 7), DOI bağlantılarını ve araştırmanın simülasyondaki organik rolünü listeler.

---

## 3. Technical Architecture & Data Strategy

### A. Fiziksel Tüketim Katsayıları Motoru (`scenarios.js`)
Her seçeneğin (`choice`) arkasında 3 somut fiziksel tüketim katsayısı bulunur:
```javascript
// Örnek: Act 2 Araç Çağırma (Demirtürk 2021 & Koçyiğit 2023 bazlı)
metrics: { eco: -11, comfort: +12, social: -5 },
impact: {
  co2Kg: 4.8,       // Karayolu taşımacılığı karbon yükü
  plasticGrams: 0,  // Plastik atık
  waterLiters: 15   // Dolaylı su ayak izi
}
```

Finalde toplanan fiziksel değerler, oyuncunun tüm seçimlerine göre dinamik olarak hesaplanıp sonuç ekranındaki Gezegensel Fatura kutusunda gösterilir:
- **Karbon Yükü**: Toplam kg $CO_2$
- **Mikroplastik ve Katı Atık**: Toplam kg
- **Sanal Su İsrafı**: Toplam Litre

### B. Vercel Hobby Statik Yapılandırması
- Sıfır sunucu, saf HTML5, CSS3, `game.js`, `scenarios.js`, `audio.js`.
- `npm run build` ile anında `dist/` klasörü üretilir.
