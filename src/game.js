/**
 * YANKI (ECHO): 2045'e 5 Dakika
 * game.js - 3 Personas, Physical Impact Engine, Academic Dossier & Dual-Mode Flowchart
 * Pure Client-Side SPA for Vercel Hobby static hosting.
 */

(function () {
  'use strict';

  // --- DETERMINISTIC SEED & PRNG (Mulberry32) ---
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

  function clamp(val, min = 0, max = 100) {
    return Math.max(min, Math.min(max, val));
  }

  // --- PERSISTENT STORAGE (Achievements & Meta) ---
  const STORAGE_KEY_ACHIEVEMENTS = 'yanki_achievements_v1';
  const STORAGE_KEY_META = 'yanki_meta_v1';

  function loadSavedMeta() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_META);
      return data ? JSON.parse(data) : { totalRuns: 0, playedPersonas: [], endingsDiscovered: [] };
    } catch (e) {
      return { totalRuns: 0, playedPersonas: [], endingsDiscovered: [] };
    }
  }

  function saveMeta(meta) {
    try {
      localStorage.setItem(STORAGE_KEY_META, JSON.stringify(meta));
    } catch (e) {}
  }

  function loadUnlockedAchievements() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUnlockedAchievements(list) {
    try {
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(list));
    } catch (e) {}
  }

  // --- GAME STATE ---
  const state = {
    phase: 'intro',
    seed: generateRandomSeedString(),
    persona: 'adult',
    currentSceneIndex: 0,
    activeScenes: [],
    choices: {},
    history: [],
    metrics: {
      eco: 50,
      social: 50,
      comfort: 50
    },
    // Concrete Physical Footprint Totals (kg CO2, grams plastic, Liters water)
    physicalTotals: {
      co2Kg: 0,
      plasticGrams: 0,
      waterLiters: 0
    },
    unlockedEnding: null,
    meta: loadSavedMeta(),
    achievements: loadUnlockedAchievements(),
    flowchartMode: 'graph' // 'graph' or 'list'
  };

  // --- DOM REFERENCES ---
  const el = {
    // Screens
    screenIntro: document.getElementById('screen-intro'),
    screenGame: document.getElementById('screen-game'),
    screenTimeleap: document.getElementById('screen-timeleap'),
    screenEnding: document.getElementById('screen-ending'),

    // HUD
    hudSeedVal: document.getElementById('hud-seed-val'),
    hudPersona: document.getElementById('hud-persona'),
    hudTime: document.getElementById('hud-time'),
    hudStatus: document.getElementById('hud-status'),
    btnSoundToggle: document.getElementById('btn-sound-toggle'),
    btnOpenAchievements: document.getElementById('btn-open-achievements'),
    btnOpenDossier: document.getElementById('btn-open-dossier'),
    hudAchievementsCount: document.getElementById('hud-achievements-count'),

    // Intro controls
    seedCodeVal: document.getElementById('seed-code-val'),
    btnRerollSeed: document.getElementById('btn-reroll-seed'),
    btnCustomSeed: document.getElementById('btn-custom-seed'),
    btnStartGame: document.getElementById('btn-start-game'),
    personaCardsContainer: document.getElementById('persona-cards-container'),

    // Gameplay scene
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
    timeleapCounter: document.getElementById('timeleap-counter'),
    timeleapCardsContainer: document.getElementById('timeleap-cards'),
    btnProceed2045: document.getElementById('btn-proceed-2045'),

    // 2045 Ending
    endingBadge: document.getElementById('ending-badge'),
    endingTitle: document.getElementById('ending-title'),
    endingQuote: document.getElementById('ending-quote'),
    endingDesc: document.getElementById('ending-desc'),
    endingAdvice: document.getElementById('ending-advice'),
    finalEcoVal: document.getElementById('final-eco-val'),
    finalEcoBar: document.getElementById('final-eco-bar'),
    finalEcoStatus: document.getElementById('final-eco-status'),
    finalSocialVal: document.getElementById('final-social-val'),
    finalSocialBar: document.getElementById('final-social-bar'),
    finalSocialStatus: document.getElementById('final-social-status'),
    finalComfortVal: document.getElementById('final-comfort-val'),
    finalComfortBar: document.getElementById('final-comfort-bar'),
    finalComfortStatus: document.getElementById('final-comfort-status'),

    // Physical Footprint Elements
    footprintCo2Val: document.getElementById('footprint-co2-val'),
    footprintPlasticVal: document.getElementById('footprint-plastic-val'),
    footprintWaterVal: document.getElementById('footprint-water-val'),
    footprintVerdictText: document.getElementById('footprint-verdict-text'),

    btnOpenFlowchart: document.getElementById('btn-open-flowchart'),
    btnRestartGame: document.getElementById('btn-restart-game'),

    // Modal: Dual-Mode Flowchart
    modalFlowchart: document.getElementById('modal-flowchart'),
    btnCloseFlowchart: document.getElementById('btn-close-flowchart'),
    btnFlowchartRestart: document.getElementById('btn-flowchart-restart'),
    tabModeGraph: document.getElementById('tab-mode-graph'),
    tabModeList: document.getElementById('tab-mode-list'),
    flowchartGraphView: document.getElementById('flowchart-graph-view'),
    flowchartListView: document.getElementById('flowchart-list-view'),
    flowchartGrid: document.getElementById('flowchart-grid'),
    flowchartSvgLines: document.getElementById('flowchart-svg-lines'),
    flowchartCompactList: document.getElementById('flowchart-compact-list'),
    inspectTitle: document.getElementById('inspect-title'),
    inspectStat: document.getElementById('inspect-stat'),
    inspectDesc: document.getElementById('inspect-desc'),
    inspectTheory: document.getElementById('inspect-theory'),

    // Modal: Achievements
    modalAchievements: document.getElementById('modal-achievements'),
    achievementsGrid: document.getElementById('achievements-grid'),
    achievementsFill: document.getElementById('achievements-fill'),
    achievementsText: document.getElementById('achievements-text'),
    btnCloseAchievements: document.getElementById('btn-close-achievements'),

    // Modal: Academic Dossier
    modalDossier: document.getElementById('modal-dossier'),
    btnCloseDossier: document.getElementById('btn-close-dossier'),
    dossierStudiesList: document.getElementById('dossier-studies-list')
  };

  // --- AUDIO HELPERS ---
  function soundInit() {
    if (window.soundEngine) window.soundEngine.init();
  }
  function playClick() {
    if (window.soundEngine) window.soundEngine.playClick();
  }
  function playChoice() {
    if (window.soundEngine) window.soundEngine.playChoice();
  }
  function playButterfly() {
    if (window.soundEngine) window.soundEngine.playButterflyChime();
  }
  function playGlitch() {
    if (window.soundEngine) window.soundEngine.playGlitch();
  }
  function playTension() {
    if (window.soundEngine) window.soundEngine.playTensionRiser(1.8);
  }
  function playEndingChord(endingId) {
    if (window.soundEngine) window.soundEngine.playEndingChord(endingId);
  }

  // --- SVG SCENE TRANSITION ---
  function showSvgScene(svgId) {
    document.querySelectorAll('.svg-scene-container').forEach(svg => {
      svg.classList.remove('active');
    });
    const target = document.getElementById(svgId);
    if (target) target.classList.add('active');
  }

  // --- ACHIEVEMENTS SYSTEM ---
  function checkAchievements() {
    const db = window.YANKI_SCENARIOS.ACHIEVEMENTS_DATA;
    let newlyUnlocked = 0;

    db.forEach(ach => {
      if (!state.achievements.includes(ach.id)) {
        if (ach.condition(state, state.meta)) {
          state.achievements.push(ach.id);
          newlyUnlocked++;
          if (window.soundEngine) window.soundEngine.playAchievementSound();
        }
      }
    });

    if (newlyUnlocked > 0) {
      saveUnlockedAchievements(state.achievements);
      updateAchievementsBadge();
    }
  }

  function updateAchievementsBadge() {
    const total = window.YANKI_SCENARIOS.ACHIEVEMENTS_DATA.length;
    const count = state.achievements.length;
    if (el.hudAchievementsCount) {
      el.hudAchievementsCount.textContent = `${count}/${total}`;
    }
  }

  function renderAchievementsModal() {
    const db = window.YANKI_SCENARIOS.ACHIEVEMENTS_DATA;
    const total = db.length;
    const count = state.achievements.length;

    if (el.achievementsText) {
      el.achievementsText.textContent = `${count} / ${total} BAŞARIM TAMAMLANDI (${Math.round((count / total) * 100)}%)`;
    }
    if (el.achievementsFill) {
      el.achievementsFill.style.width = `${(count / total) * 100}%`;
    }

    if (!el.achievementsGrid) return;
    el.achievementsGrid.innerHTML = '';

    db.forEach(ach => {
      const isUnlocked = state.achievements.includes(ach.id);
      const card = document.createElement('div');
      card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="achievement-icon-box">${ach.icon}</div>
        <div class="achievement-details">
          <div class="achievement-title">${ach.title}</div>
          <div class="achievement-desc">${ach.desc}</div>
          <div class="achievement-status-tag">${isUnlocked ? '✓ KAZANILDI' : '🔒 KİLİTLİ'}</div>
        </div>
      `;
      el.achievementsGrid.appendChild(card);
    });
  }

  function closeAchievementsModal() {
    playClick();
    if (el.modalAchievements) el.modalAchievements.classList.remove('active');
  }

  // --- ACADEMIC DOSSIER MODAL ---
  function renderAcademicDossier() {
    if (!el.dossierStudiesList) return;
    const studies = window.YANKI_ACADEMIC.STUDIES;
    el.dossierStudiesList.innerHTML = '';

    studies.forEach((st, idx) => {
      const card = document.createElement('div');
      card.className = 'dossier-study-card';
      card.innerHTML = `
        <div class="study-card-header">
          <span class="study-index">${idx + 1}. ${st.category}</span>
          ${st.doi ? `<a href="${st.doi}" target="_blank" rel="noopener noreferrer" class="btn-doi-link">DOI Bağlantısı ↗</a>` : ''}
        </div>
        <div class="study-citation">
          <strong>${st.authors} (${st.year}).</strong> <em>${st.title}.</em> ${st.journal}, ${st.volume}.
        </div>
        <div class="study-finding-box">
          <span class="study-box-label">🔬 Temel Ampirik Bulgu:</span>
          <p class="study-box-text">${st.finding}</p>
        </div>
        <div class="study-game-box">
          <span class="study-box-label">🎮 YANKI Simülasyonundaki Rolü:</span>
          <p class="study-box-text">${st.roleInGame}</p>
        </div>
      `;
      el.dossierStudiesList.appendChild(card);
    });
  }

  function openDossierModal() {
    playClick();
    if (!el.modalDossier) return;
    renderAcademicDossier();
    el.modalDossier.classList.add('active');
  }

  function closeDossierModal() {
    playClick();
    if (el.modalDossier) el.modalDossier.classList.remove('active');
  }

  // --- PERSONA SELECTION ---
  function selectPersona(personaId) {
    soundInit();
    playClick();
    state.persona = personaId;
    resolveRunFromSeed(state.seed);
    renderPersonaCards();
  }

  function renderPersonaCards() {
    const pools = window.YANKI_SCENARIOS.SCENARIO_POOLS;
    if (!el.personaCardsContainer) return;
    el.personaCardsContainer.innerHTML = '';

    Object.keys(pools).forEach(key => {
      const p = pools[key];
      const isActive = state.persona === key;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `persona-card-btn ${isActive ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="persona-card-header">
          <span class="persona-card-icon">${p.avatarIcon}</span>
          <span class="persona-card-title">${p.personaTitle}</span>
        </div>
        <div class="persona-card-role">${p.personaRole}</div>
        <div class="persona-card-desc">${p.personaLore}</div>
      `;
      btn.addEventListener('click', () => selectPersona(key));
      el.personaCardsContainer.appendChild(btn);
    });
  }

  // --- RUN RESOLVER FROM SEED & PERSONA ---
  function resolveRunFromSeed(seedStr) {
    const hash = hashSeedString(seedStr);
    const rng = createRng(hash);

    const pools = window.YANKI_SCENARIOS.SCENARIO_POOLS;
    if (state.persona === 'craftsman') state.persona = 'teen';
    const pool = pools[state.persona] || pools.adult;

    const act1 = pool.act1[Math.floor(rng() * pool.act1.length)];
    const act2 = pool.act2[Math.floor(rng() * pool.act2.length)];
    const act3 = pool.act3[Math.floor(rng() * pool.act3.length)];
    const act4 = pool.act4[Math.floor(rng() * pool.act4.length)];
    const act5 = pool.act5[Math.floor(rng() * pool.act5.length)];

    const runtimeScenes = [act1, act2, act3, act4, act5];

    const availableSurprises = [...window.YANKI_SCENARIOS.SURPRISE_ACTS_POOL];
    const roll1 = rng();
    const roll2 = rng();

    if (roll1 > 0.25) {
      const sIdx1 = Math.floor(rng() * availableSurprises.length);
      const chosen1 = availableSurprises.splice(sIdx1, 1)[0];
      runtimeScenes.splice(2, 0, chosen1);
    }

    if (roll2 > 0.35 && availableSurprises.length > 0) {
      const sIdx2 = Math.floor(rng() * availableSurprises.length);
      const chosen2 = availableSurprises.splice(sIdx2, 1)[0];
      runtimeScenes.splice(runtimeScenes.length - 1, 0, chosen2);
    }

    state.seed = seedStr;
    state.activeScenes = runtimeScenes;

    if (el.seedCodeVal) el.seedCodeVal.textContent = seedStr;
    if (el.hudSeedVal) el.hudSeedVal.textContent = seedStr;
    if (el.hudPersona) el.hudPersona.textContent = pool.personaTitle;
  }

  // --- RENDER SCENE ---
  function renderScene(sceneIndex) {
    const scene = state.activeScenes[sceneIndex];
    if (!scene) return;

    state.phase = 'scene';
    state.currentSceneIndex = sceneIndex;

    el.screenIntro.classList.remove('active');
    el.screenTimeleap.classList.remove('active');
    el.screenEnding.classList.remove('active');
    el.screenGame.classList.add('active');

    el.hudTime.textContent = scene.timeLabel;
    el.hudStatus.textContent = `PERDE ${sceneIndex + 1} / ${state.activeScenes.length}`;

    if (el.sceneActTag) {
      el.sceneActTag.textContent = scene.actTag;
      if (scene.actTag.includes('SÜRPRİZ') || scene.actTag.includes('KESİŞME')) {
        el.sceneActTag.className = 'scene-step-tag act-surprise-tag';
        playButterfly();
      } else {
        el.sceneActTag.className = 'scene-step-tag';
      }
    }

    showSvgScene(scene.svgId);

    el.sceneTitle.textContent = scene.title;
    el.sceneNarration.textContent = scene.narration;

    const cA = scene.choices[0];
    el.choiceTitleA.textContent = cA.title;
    el.choiceDescA.textContent = cA.desc;

    const cB = scene.choices[1];
    el.choiceTitleB.textContent = cB.title;
    el.choiceDescB.textContent = cB.desc;

    el.btnChoiceA.disabled = false;
    el.btnChoiceB.disabled = false;
  }

  // --- HANDLE PLAYER CHOICE ---
  function handleChoice(choiceKey) {
    soundInit();
    playChoice();

    const scene = state.activeScenes[state.currentSceneIndex];
    const choice = scene.choices.find(c => c.key === choiceKey);
    const alternative = scene.choices.find(c => c.key !== choiceKey);
    if (!choice) return;

    el.btnChoiceA.disabled = true;
    el.btnChoiceB.disabled = true;

    // Track decision
    state.choices[scene.id] = choiceKey;
    state.history.push({
      actTag: scene.actTag,
      sceneId: scene.id,
      sceneTitle: scene.title,
      choiceKey: choiceKey,
      chosenTitle: choice.title,
      chosenDesc: choice.desc,
      chosenMetrics: { ...choice.metrics },
      chosenImpact: choice.impact ? { ...choice.impact } : { co2Kg: 0, plasticGrams: 0, waterLiters: 0 },
      studyId: choice.studyId || '',
      altTitle: alternative ? alternative.title : '',
      altMetrics: alternative ? { ...alternative.metrics } : null,
      summary: choice.summary
    });

    // Update internal balances silently (revealed at 2035 & 2045)
    state.metrics.eco = clamp(state.metrics.eco + choice.metrics.eco);
    state.metrics.comfort = clamp(state.metrics.comfort + choice.metrics.comfort);
    state.metrics.social = clamp(state.metrics.social + choice.metrics.social);

    // Accumulate Physical Empirical Footprint
    if (choice.impact) {
      state.physicalTotals.co2Kg += choice.impact.co2Kg || 0;
      state.physicalTotals.plasticGrams += choice.impact.plasticGrams || 0;
      state.physicalTotals.waterLiters += choice.impact.waterLiters || 0;
    }

    checkAchievements();

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
    el.hudTime.textContent = 'ZAMAN SIÇRAMASI: 2026 ➔ 2035';
    el.hudStatus.textContent = 'KUŞAKLARARASI ETİK KIRILMASI';

    showSvgScene('svg-timeleap');

    el.timeleapCardsContainer.innerHTML = '';
    el.btnProceed2045.classList.remove('visible');

    let currentYear = 2026;
    const yearInterval = setInterval(() => {
      currentYear += 1;
      el.timeleapCounter.textContent = currentYear;
      if (currentYear >= 2035) {
        clearInterval(yearInterval);
        displayTimeLeapHeadlines();
      }
    }, 95);
  }

  function getTimeLeapHeadlines() {
    const headlines = [];
    const isAdult = state.persona === 'adult';
    const isStudent = state.persona === 'student';

    if (state.metrics.eco < 40) {
      headlines.push({
        year: '2031',
        tag: 'METROPOL HABERLERİ // DEMİRTÜRK (2021)',
        title: isAdult ? 'MİKROPLASTİK SİSİ MERKEZLERİ ESİR ALDI' : (isStudent ? 'ÜNİVERSİTE KAMPÜSLERİNDE MASKELİ DÖNEM' : 'OKULLARDA DIŞ MEKAN MASKESİ VE DİJİTAL KARANTİNA'),
        body: 'Artan bireysel karayolu taşımacılığı (%74,5 küresel pay) ve ambalaj çılgınlığı kentsel partikül seviyesini rekor düzeye çıkardı. Hava kalitesi kırmızı alarmda.'
      });
    } else {
      headlines.push({
        year: '2031',
        tag: 'DÖNÜŞÜM RAPORU // GÜNGÖR (2023)',
        title: isAdult ? 'ŞEHİR MERKEZLERİNDE YAYA VE MİKROMOBİLİTE DEVRİMİ' : (isStudent ? 'GENÇLERİN SIFIR ATIK HAREKETİ KENTLERİ DEĞİŞTİRDİ' : 'OKULLARDA SIFIR ATIK VE BİSİKLETLİ ÖĞRENCİ REKORU'),
        body: 'Bireysel araç kullanımındaki radikal gerileme ve okullarda başlayan sıfır atık / matara hareketleri su havzalarındaki kirliliği %40 geri çekti.'
      });
    }

    if (state.metrics.comfort > 62) {
      headlines.push({
        year: '2033',
        tag: 'KÜRESEL EKONOMİ // KOÇYİĞİT & ÖZKUL (2023)',
        title: 'ANLIK TESLİMAT VE DEV VERİ MERKEZLERİ KITALARI ISITTI',
        body: 'Hızlı tüketim ve durmaksızın çalışan sunucu şebekelerinin görünmeyen dijital yükü küresel enerji talebini ikiye katladı. Fosil santraller acil durum için açıldı.'
      });
    } else {
      headlines.push({
        year: '2033',
        tag: 'DÖNGÜSEL EKONOMİ // SEVGİLİ & PEKACAR (2024)',
        title: 'HIZLI MODA DÖNEMİ BİTTİ: ONARIM DEV PERAKENDEYİ GEÇTİ',
        body: 'Tek kullanımlık ambalaj vergileri ve yerel giysi tamir kültürü, milyonlarca tonluk tekstil su israfını kaynağında engelledi.'
      });
    }

    headlines.push({
      year: '2035',
      tag: 'KUŞAKLARARASI ADALET // DEMİR (2022)',
      title: '2045 İKLİM VE GEZEGEN REJİMİ MÜHÜRLENDİ',
      body: '24 saatlik döngüde konfor uğruna verilen her taviz veya gösterilen küçük bilinçli direnç, gelecek neslin yaşayacağı dünyanın taban yasalarını belirledi.'
    });

    return headlines;
  }

  function displayTimeLeapHeadlines() {
    const headlines = getTimeLeapHeadlines();

    headlines.forEach((item, index) => {
      setTimeout(() => {
        playGlitch();

        const card = document.createElement('div');
        card.className = 'newspaper-card';
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
          }, 600);
        }
      }, (index + 1) * 650);
    });
  }

  // --- ENDINGS MATRIX (5 OUTCOMES) ---
  function calculateEnding() {
    const { eco, social, comfort } = state.metrics;
    const endings = window.YANKI_SCENARIOS.ENDINGS;

    if (eco <= 28) {
      return endings.ENDING_A; // Plastik Şafak
    } else if (comfort >= 68 && eco < 52) {
      return endings.ENDING_B; // Tekno-Ayrışma
    } else if (eco >= 72) {
      return endings.ENDING_C; // Simbiyoz & Onarım
    } else if (social <= 32 && comfort >= 50) {
      return endings.ENDING_E; // Dijital İnziva
    } else {
      return endings.ENDING_D; // Kırılgan Araf
    }
  }

  function showEnding() {
    state.phase = 'ending';
    const ending = calculateEnding();
    state.unlockedEnding = ending.id;

    playEndingChord(ending.id);

    state.meta.totalRuns = (state.meta.totalRuns || 0) + 1;
    if (!state.meta.playedPersonas) state.meta.playedPersonas = [];
    if (!state.meta.playedPersonas.includes(state.persona)) {
      state.meta.playedPersonas.push(state.persona);
    }
    if (!state.meta.endingsDiscovered) state.meta.endingsDiscovered = [];
    if (!state.meta.endingsDiscovered.includes(ending.id)) {
      state.meta.endingsDiscovered.push(ending.id);
    }
    saveMeta(state.meta);

    el.screenTimeleap.classList.remove('active');
    el.screenEnding.classList.add('active');

    el.hudTime.textContent = 'YIL: 2045 // NİHAİ DÜNYA';
    el.hudStatus.textContent = ending.badge;

    showSvgScene(ending.svgId);

    el.endingBadge.textContent = ending.badge;
    el.endingBadge.className = `ending-badge ${ending.badgeClass}`;
    el.endingTitle.textContent = ending.title;
    el.endingQuote.textContent = ending.quote;
    el.endingDesc.textContent = ending.desc;
    if (el.endingAdvice) el.endingAdvice.textContent = `💡 Gelecek Öğüdü: ${ending.advice}`;

    renderEndingMetrics();
    checkAchievements();
  }

  function renderEndingMetrics() {
    const { eco, social, comfort } = state.metrics;
    const { co2Kg, plasticGrams, waterLiters } = state.physicalTotals;

    // Render percentages
    if (el.finalEcoVal) el.finalEcoVal.textContent = `${eco}%`;
    if (el.finalSocialVal) el.finalSocialVal.textContent = `${social}%`;
    if (el.finalComfortVal) el.finalComfortVal.textContent = `${comfort}%`;

    // Render Concrete Physical Consumption Units
    if (el.footprintCo2Val) {
      el.footprintCo2Val.textContent = `+${co2Kg.toFixed(1)} kg CO₂-e`;
    }
    if (el.footprintPlasticVal) {
      el.footprintPlasticVal.textContent = `+${(plasticGrams / 1000).toFixed(2)} kg Atık`;
    }
    if (el.footprintWaterVal) {
      el.footprintWaterVal.textContent = `+${Math.round(waterLiters).toLocaleString('tr-TR')} L Su`;
    }

    if (el.footprintVerdictText) {
      if (co2Kg > 18 || waterLiters > 3000) {
        el.footprintVerdictText.textContent = 'Ağır Çevresel Borç: Tercihleriniz yüksek karayolu emisyonu ve hızlı tekstil/ambalaj su israfına yol açtı.';
      } else if (co2Kg < 6 && waterLiters < 800) {
        el.footprintVerdictText.textContent = 'Ekolojik Tasarruf Örneği: Onarım, raylı sistem ve sıfır atık adımlarıyla devasa kaynak kurtarıldı.';
      } else {
        el.footprintVerdictText.textContent = 'Orta Düzey Tüketim Yükü: Bazı tasarruflar sağlandı ancak konfor alışkanlıkları karbon borcu üretti.';
      }
    }

    // Verdict summaries
    if (el.finalEcoStatus) {
      if (eco <= 28) el.finalEcoStatus.textContent = 'Kritik Çöküş: Zehirli asit gökyüzü, yapay oksijen tüpü zorunlu (Arı & Öğüt, 2021).';
      else if (eco < 50) el.finalEcoStatus.textContent = 'Aşırı Yıpranma: Şiddetli hava kirliliği, kuraklık ve su kotaları.';
      else if (eco < 72) el.finalEcoStatus.textContent = 'Kısmi İyileşme: Şehir merkezlerinde hava koridorları açıldı.';
      else el.finalEcoStatus.textContent = 'Onarılan Gezegen: Dikey ormanlar, temiz nehirler, sıfır karbon (Güngör, 2023).';
    }

    if (el.finalSocialStatus) {
      if (social <= 32) el.finalSocialStatus.textContent = 'Bireysel İzolasyon: Toplumsal kutuplaşma, herkes kendi ekranında yalnız.';
      else if (social < 65) el.finalSocialStatus.textContent = 'Sınırlı Dayanışma: Parçalı ve kırılgan toplumsal iletişim.';
      else el.finalSocialStatus.textContent = 'Kolektif Dayanışma: Onarım kültürü, mahalle kooperatifleri, canlı sokaklar.';
    }

    if (el.finalComfortStatus) {
      if (comfort >= 68) el.finalComfortStatus.textContent = 'Aşırı Tüketim Borcu: Fosil enerji ve devasa çöp dağları krizi.';
      else if (comfort >= 45) el.finalComfortStatus.textContent = 'Orta Bağımlılık: Kolaylıktan vazgeçmekte zorlanan tüketici profili.';
      else el.finalComfortStatus.textContent = 'Yalın ve Bilinçli Yaşam: Düşük enerji ayak izi, özgür ve sade hayat.';
    }

    if (el.finalEcoBar) el.finalEcoBar.style.width = '0%';
    if (el.finalSocialBar) el.finalSocialBar.style.width = '0%';
    if (el.finalComfortBar) el.finalComfortBar.style.width = '0%';

    setTimeout(() => {
      if (el.finalEcoBar) el.finalEcoBar.style.width = `${eco}%`;
      if (el.finalSocialBar) el.finalSocialBar.style.width = `${social}%`;
      if (el.finalComfortBar) el.finalComfortBar.style.width = `${comfort}%`;
    }, 100);
  }

  // --- DUAL-MODE FLOWCHART & DECISION TREE ---
  let currentFlowchartConnections = [];

  function openFlowchartModal() {
    playClick();
    if (!el.modalFlowchart) return;
    el.modalFlowchart.classList.add('active');
    switchFlowchartMode(state.flowchartMode);
  }

  function closeFlowchartModal() {
    playClick();
    if (el.modalFlowchart) el.modalFlowchart.classList.remove('active');
  }

  function switchFlowchartMode(mode) {
    playClick();
    state.flowchartMode = mode;
    if (mode === 'graph') {
      if (el.tabModeGraph) el.tabModeGraph.classList.add('active');
      if (el.tabModeList) el.tabModeList.classList.remove('active');
      if (el.flowchartGraphView) el.flowchartGraphView.style.display = 'block';
      if (el.flowchartListView) el.flowchartListView.style.display = 'none';
      drawFlowchartGraph();
    } else {
      if (el.tabModeGraph) el.tabModeGraph.classList.remove('active');
      if (el.tabModeList) el.tabModeList.classList.add('active');
      if (el.flowchartGraphView) el.flowchartGraphView.style.display = 'none';
      if (el.flowchartListView) el.flowchartListView.style.display = 'block';
      renderFlowchartList();
    }
  }

  function renderFlowchartList() {
    if (!el.flowchartCompactList) return;
    el.flowchartCompactList.innerHTML = '';

    if (state.history.length === 0) {
      el.flowchartCompactList.innerHTML = '<p class="text-muted">Henüz kaydedilmiş bir karar bulunmuyor.</p>';
      return;
    }

    state.history.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'history-item-row';

      const ecoTxt = item.chosenMetrics.eco >= 0 ? `+${item.chosenMetrics.eco}` : `${item.chosenMetrics.eco}`;
      const comfTxt = item.chosenMetrics.comfort >= 0 ? `+${item.chosenMetrics.comfort}` : `${item.chosenMetrics.comfort}`;
      const socTxt = item.chosenMetrics.social >= 0 ? `+${item.chosenMetrics.social}` : `${item.chosenMetrics.social}`;

      row.innerHTML = `
        <div class="history-item-top">
          <span class="history-act-badge">${item.actTag} // Seçim: [${item.choiceKey}]</span>
          <span class="history-choice-title">${item.chosenTitle}</span>
        </div>
        <p class="history-choice-summary">${item.summary}</p>
        <div class="history-impact-strip">
          <span class="impact-chip ${item.chosenMetrics.eco >= 0 ? 'pos' : 'neg'}">🌿 Eko: ${ecoTxt}%</span>
          <span class="impact-chip ${item.chosenMetrics.comfort <= 0 ? 'pos' : 'neg'}">⚡ Konfor: ${comfTxt}%</span>
          <span class="impact-chip ${item.chosenMetrics.social >= 0 ? 'pos' : 'neg'}">🤝 Empati: ${socTxt}%</span>
          <span class="impact-chip" style="color: #67e8f9;">💨 ${item.chosenImpact.co2Kg} kg CO₂</span>
          <span class="impact-chip" style="color: #67e8f9;">💧 ${item.chosenImpact.waterLiters} L Su</span>
        </div>
      `;
      el.flowchartCompactList.appendChild(row);
    });
  }

  function renderFlowchartSvgLines() {
    const svg = el.flowchartSvgLines;
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

      const dx = Math.max(20, (x2 - x1) * 0.5);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
      path.setAttribute('class', `flowchart-path ${conn.active ? 'active-path-line' : 'locked-path-line'}`);
      svg.appendChild(path);
    });
  }

  function drawFlowchartGraph() {
    const grid = el.flowchartGrid;
    if (!grid) return;
    grid.innerHTML = '';

    const stages = [];
    currentFlowchartConnections = [];

    const startNode = {
      id: 'node-start',
      title: `${state.persona === 'adult' ? 'Kentli Çalışan' : (state.persona === 'student' ? 'Üniversite Öğrencisi' : 'Ortaokul Öğrencisi')}`,
      sub: `Tohum: ${state.seed}`,
      selected: true,
      stats: 'Başlangıç Noktası',
      desc: 'Simülasyon başlangıcı. Seçilen karakter perspektifiyle günün sıfır noktası.',
      theory: 'İdil & Koçak (2024): Dijital oyun tabanlı çevre pedagojisinin sorumluluk bilinci yaratma gücü.'
    };
    stages.push({ name: 'BAŞLANGIÇ', nodes: [startNode] });

    state.activeScenes.forEach((scene, sIdx) => {
      const chosenKey = state.choices[scene.id];
      const stageName = scene.actTag.split('//')[0].trim();

      const nodeA = {
        id: `node-${scene.id}-a`,
        title: scene.choices[0].title,
        sub: scene.actTag,
        selected: chosenKey === 'A',
        stats: chosenKey === 'A' ? 'Seçilen Rota' : 'Kilitli Alternatif',
        desc: scene.choices[0].desc,
        theory: 'Yürük & Sadioğlu (2024): Dürtme Teorisi ve anlık konfor tuzağının seçim mimarisindeki belirleyiciliği.'
      };

      const nodeB = {
        id: `node-${scene.id}-b`,
        title: scene.choices[1].title,
        sub: scene.actTag,
        selected: chosenKey === 'B',
        stats: chosenKey === 'B' ? 'Seçilen Rota' : 'Kilitli Alternatif',
        desc: scene.choices[1].desc,
        theory: 'Güngör (2023) & Demirtürk (2021): Kaynak tasarrufu, onarım kültürü ve düşük karbonlu mikromobilite tercihi.'
      };

      stages.push({ name: stageName, nodes: [nodeA, nodeB] });

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

    const timeleapNode = {
      id: 'node-timeleap',
      title: '2035: Eşik',
      sub: 'Zaman Sıçraması',
      selected: true,
      stats: 'Kritik Eşik',
      desc: 'Alınan kararların toplum ölçeğinde birikimi ve 2035 kentsel gazete manşetleri.',
      theory: 'Demir (2022): Rawls & Kant etiğinde kuşaklararası adalet ve telafisiz ekolojik borç devri.'
    };
    stages.push({ name: '2035 KIRILMA', nodes: [timeleapNode] });

    const lastScene = state.activeScenes[state.activeScenes.length - 1];
    const lastChosen = state.choices[lastScene.id];
    currentFlowchartConnections.push(
      { from: `node-${lastScene.id}-a`, to: 'node-timeleap', active: lastChosen === 'A' },
      { from: `node-${lastScene.id}-b`, to: 'node-timeleap', active: lastChosen === 'B' }
    );

    const endings = window.YANKI_SCENARIOS.ENDINGS;
    const endingNodes = [
      {
        id: 'node-end-a',
        title: 'ENDING A: Plastik Şafak',
        sub: 'Ekoloji ≤ 28',
        selected: state.unlockedEnding === 'ENDING_A',
        stats: state.unlockedEnding === 'ENDING_A' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: endings.ENDING_A.desc,
        theory: 'Arı & Öğüt (2021): Mikroplastik toksisitesi ve ambalaj atıklarının ekosistem çöküşü.'
      },
      {
        id: 'node-end-b',
        title: 'ENDING B: Tekno-Ayrışma',
        sub: 'Konfor ≥ 68',
        selected: state.unlockedEnding === 'ENDING_B',
        stats: state.unlockedEnding === 'ENDING_B' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: endings.ENDING_B.desc,
        theory: 'Balcılar (2022): İklim adaletsizliği, kubbe kastı ve çevresel felakete terk edilen sınıflar.'
      },
      {
        id: 'node-end-c',
        title: 'ENDING C: Simbiyoz',
        sub: 'Ekoloji ≥ 72',
        selected: state.unlockedEnding === 'ENDING_C',
        stats: state.unlockedEnding === 'ENDING_C' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: endings.ENDING_C.desc,
        theory: 'Güngör (2023): Döngüsel ekonomi, kaynak azaltımı (%53) ve kentsel onarım kültürü.'
      },
      {
        id: 'node-end-e',
        title: 'ENDING E: Dijital İnziva',
        sub: 'Sosyal ≤ 32',
        selected: state.unlockedEnding === 'ENDING_E',
        stats: state.unlockedEnding === 'ENDING_E' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: endings.ENDING_E.desc,
        theory: 'Koçyiğit & Özkul (2023): Görünmeyen dijital ayak izi ve siber yabancılaşma.'
      },
      {
        id: 'node-end-d',
        title: 'ENDING D: Kırılgan Araf',
        sub: 'Dengeli / Araf',
        selected: state.unlockedEnding === 'ENDING_D',
        stats: state.unlockedEnding === 'ENDING_D' ? 'Ulaşılan Son' : 'Kilitli Son',
        desc: endings.ENDING_D.desc,
        theory: 'Demir (2022): Kararsızlık ve yarı-gönüllü adımların geleceğe devrettiği gri denge.'
      }
    ];
    stages.push({ name: '2045 SONLAR', nodes: endingNodes });

    endingNodes.forEach(eNode => {
      currentFlowchartConnections.push({
        from: 'node-timeleap',
        to: eNode.id,
        active: eNode.selected
      });
    });

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
          inspectFlowchartNode(node);
        });

        col.appendChild(nodeEl);
      });

      grid.appendChild(col);
    });

    requestAnimationFrame(() => {
      renderFlowchartSvgLines();
    });

    const activeEnd = endingNodes.find(n => n.selected) || startNode;
    inspectFlowchartNode(activeEnd);
  }

  function inspectFlowchartNode(node) {
    if (el.inspectTitle) el.inspectTitle.textContent = node.title;
    if (el.inspectDesc) el.inspectDesc.textContent = node.desc;
    if (el.inspectStat) el.inspectStat.textContent = node.selected ? 'SİZİN SEÇTİĞİNİZ PATİKA' : 'KİLİTLİ ALTERNATİF';
    if (el.inspectTheory) el.inspectTheory.textContent = node.theory || 'Ampirik literatür dayanağı mevcut.';

    document.querySelectorAll('.flowchart-node').forEach(n => {
      if (n.id === node.id) n.classList.add('inspected');
      else n.classList.remove('inspected');
    });
  }

  // --- RESTART GAME ---
  function restartGame(newSeed = true) {
    playClick();
    state.phase = 'intro';
    state.currentSceneIndex = 0;
    state.metrics = { eco: 50, social: 50, comfort: 50 };
    state.physicalTotals = { co2Kg: 0, plasticGrams: 0, waterLiters: 0 };
    state.choices = {};
    state.history = [];
    state.unlockedEnding = null;

    if (newSeed) {
      resolveRunFromSeed(generateRandomSeedString());
    } else {
      resolveRunFromSeed(state.seed);
    }

    closeFlowchartModal();
    closeAchievementsModal();
    closeDossierModal();

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
    if (el.btnSoundToggle) {
      el.btnSoundToggle.addEventListener('click', () => {
        soundInit();
        if (window.soundEngine) {
          const isMuted = window.soundEngine.toggleMute();
          el.btnSoundToggle.innerHTML = isMuted ? '🔇 Ses: Kapalı' : '🔊 Ses: Açık';
          el.btnSoundToggle.classList.toggle('muted', isMuted);
        }
      });
    }

    // Achievements modal button
    if (el.btnOpenAchievements) {
      el.btnOpenAchievements.addEventListener('click', () => {
        playClick();
        renderAchievementsModal();
        el.modalAchievements.classList.add('active');
      });
    }
    if (el.btnCloseAchievements) {
      el.btnCloseAchievements.addEventListener('click', closeAchievementsModal);
    }

    // Academic Dossier modal buttons
    if (el.btnOpenDossier) {
      el.btnOpenDossier.addEventListener('click', openDossierModal);
    }
    if (el.btnCloseDossier) {
      el.btnCloseDossier.addEventListener('click', closeDossierModal);
    }

    // Seed controls
    if (el.btnRerollSeed) {
      el.btnRerollSeed.addEventListener('click', () => {
        playClick();
        const freshSeed = generateRandomSeedString();
        resolveRunFromSeed(freshSeed);
      });
    }

    if (el.btnCustomSeed) {
      el.btnCustomSeed.addEventListener('click', () => {
        playClick();
        const userInput = prompt('Oynamak istediğiniz tohum kodunu girin (Örn: #YANKI-1234):', state.seed);
        if (userInput && userInput.trim().length > 0) {
          const clean = userInput.trim().toUpperCase();
          resolveRunFromSeed(clean.startsWith('#') ? clean : `#${clean}`);
        }
      });
    }

    // Start button
    if (el.btnStartGame) {
      el.btnStartGame.addEventListener('click', () => {
        soundInit();
        playClick();
        renderScene(0);
      });
    }

    // Choices
    if (el.btnChoiceA) {
      el.btnChoiceA.addEventListener('click', () => handleChoice('A'));
    }
    if (el.btnChoiceB) {
      el.btnChoiceB.addEventListener('click', () => handleChoice('B'));
    }

    // Time leap proceed
    if (el.btnProceed2045) {
      el.btnProceed2045.addEventListener('click', () => {
        soundInit();
        playClick();
        showEnding();
      });
    }

    // Ending screen buttons
    if (el.btnOpenFlowchart) {
      el.btnOpenFlowchart.addEventListener('click', openFlowchartModal);
    }
    if (el.btnRestartGame) {
      el.btnRestartGame.addEventListener('click', () => restartGame(true));
    }

    // Flowchart modal buttons & mode tabs
    if (el.btnCloseFlowchart) {
      el.btnCloseFlowchart.addEventListener('click', closeFlowchartModal);
    }
    if (el.btnFlowchartRestart) {
      el.btnFlowchartRestart.addEventListener('click', () => restartGame(true));
    }
    if (el.tabModeGraph) {
      el.tabModeGraph.addEventListener('click', () => switchFlowchartMode('graph'));
    }
    if (el.tabModeList) {
      el.tabModeList.addEventListener('click', () => switchFlowchartMode('list'));
    }

    // Modal backdrops click to close
    document.querySelectorAll('.app-modal').forEach(modal => {
      const backdrop = modal.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      }
    });

    // Window resize updates SVG flowchart lines
    window.addEventListener('resize', () => {
      if (el.modalFlowchart && el.modalFlowchart.classList.contains('active') && state.flowchartMode === 'graph') {
        renderFlowchartSvgLines();
      }
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (el.modalFlowchart && el.modalFlowchart.classList.contains('active')) closeFlowchartModal();
        if (el.modalAchievements && el.modalAchievements.classList.contains('active')) closeAchievementsModal();
        if (el.modalDossier && el.modalDossier.classList.contains('active')) closeDossierModal();
        return;
      }

      if (state.phase === 'intro') {
        if (e.key === ' ' || e.key === 'Enter') {
          if (el.btnStartGame) el.btnStartGame.click();
        }
      } else if (state.phase === 'scene') {
        if (e.key === '1' || e.key === 'a' || e.key === 'A') {
          if (el.btnChoiceA && !el.btnChoiceA.disabled) handleChoice('A');
        } else if (e.key === '2' || e.key === 'b' || e.key === 'B') {
          if (el.btnChoiceB && !el.btnChoiceB.disabled) handleChoice('B');
        }
      } else if (state.phase === 'timeleap') {
        if (e.key === ' ' || e.key === 'Enter') {
          if (el.btnProceed2045 && el.btnProceed2045.classList.contains('visible')) {
            showEnding();
          }
        }
      }
    });
  }

  // --- INITIALIZE ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    renderPersonaCards();
    resolveRunFromSeed(state.seed);
    updateAchievementsBadge();
    initListeners();
    showSvgScene('svg-intro');
  });

})();
