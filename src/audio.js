/**
 * YANKI (ECHO): 2045'e 5 Dakika
 * audio.js - 100% Procedural Web Audio API Synthesizer
 * Zero external audio files or network requests. Works offline and on Vercel.
 */

(function () {
  'use strict';

  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.masterGain = null;
      this.droneGain = null;
      this.droneOscs = [];
      this.droneFilter = null;
      this.isDronePlaying = false;
      this.currentMood = 'calm';
    }

    init() {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        return;
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.startAmbientDrone();
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.masterGain && this.ctx) {
        const t = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(t);
        this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.8, t + 0.1);
      }
      return this.isMuted;
    }

    // --- PROCEDURAL AMBIENT DRONE SYNTHESIZER ---
    startAmbientDrone() {
      if (!this.ctx || this.isDronePlaying) return;

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 3.0);

      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
      this.droneFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      this.droneGain.connect(this.droneFilter);
      this.droneFilter.connect(this.masterGain);

      this.setDroneMood('calm');
      this.isDronePlaying = true;
    }

    setDroneMood(mood) {
      if (!this.ctx || !this.droneGain) return;
      this.currentMood = mood;

      // Stop existing oscillators smoothly
      const now = this.ctx.currentTime;
      this.droneOscs.forEach(({ osc, gain }) => {
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
        setTimeout(() => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        }, 1600);
      });
      this.droneOscs = [];

      // Harmonic chords based on emotional state
      let frequencies = [55, 110, 164.81]; // Calm A minor / Open 5th
      let filterFreq = 300;

      if (mood === 'tense') {
        frequencies = [48.99, 97.99, 138.59, 195.99]; // G-C#-G tritone tension
        filterFreq = 420;
      } else if (mood === 'dystopia') {
        frequencies = [41.20, 82.41, 123.47, 155.56]; // E minor / deep sub industrial
        filterFreq = 220;
      } else if (mood === 'utopia') {
        frequencies = [65.41, 130.81, 196.00, 246.94]; // C major 7th / luminous
        filterFreq = 580;
      } else if (mood === 'limbo') {
        frequencies = [58.27, 116.54, 174.61]; // Bb neutral suspended
        filterFreq = 320;
      }

      this.droneFilter.frequency.cancelScheduledValues(now);
      this.droneFilter.frequency.linearRampToValueAtTime(filterFreq, now + 2.0);

      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = idx === 0 ? 'sine' : (idx % 2 === 0 ? 'triangle' : 'sawtooth');
        osc.frequency.setValueAtTime(freq, now);

        // Detune slightly for lush chorus
        osc.detune.setValueAtTime((idx - 1) * 7, now);

        oscGain.gain.setValueAtTime(0.0001, now);
        oscGain.gain.linearRampToValueAtTime(0.12 / frequencies.length, now + 2.5);

        osc.connect(oscGain);
        oscGain.connect(this.droneGain);

        osc.start(now);
        this.droneOscs.push({ osc, gain: oscGain });
      });
    }

    // --- SOUND EFFECTS (PROCEDURAL SFX) ---

    // Clean UI navigation click
    playClick() {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.05);
    }

    // Meaningful decision choice confirmation
    playChoice() {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;

      // Resonant ping
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.22);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.26);

      // Low sub pulse
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(110, t);
      sub.frequency.exponentialRampToValueAtTime(45, t + 0.35);

      subGain.gain.setValueAtTime(0.4, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      sub.connect(subGain);
      subGain.connect(this.masterGain);

      sub.start(t);
      sub.stop(t + 0.36);
    }

    // Quantic Dream style Butterfly Chime (High sparkle)
    playButterflyChime() {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [880, 1108.73, 1318.51, 1661.22, 2217.46]; // E Major pentatonic

      notes.forEach((freq, i) => {
        const noteTime = t + i * 0.06;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.18, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.45);
      });
    }

    // Time leap glitch sound
    playGlitch() {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, t);
      filter.Q.setValueAtTime(5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(t);
      noise.stop(t + 0.13);
    }

    // Tension riser leading into 2035 Time Leap
    playTensionRiser(duration = 2.0) {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, t);
      filter.frequency.exponentialRampToValueAtTime(2200, t + duration);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.32, t + duration);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + duration + 0.15);
    }

    // Epic Ending Chord for 2045 Finale
    playEndingChord(endingId) {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;

      let chord = [130.81, 164.81, 196.00, 261.63]; // Default C major
      let isDistorted = false;

      if (endingId === 'ENDING_A') {
        // Plastik Şafak: Dark Dissonant Diminished (C - Eb - Gb - B)
        chord = [65.41, 130.81, 155.56, 185.00, 246.94];
        isDistorted = true;
        this.setDroneMood('dystopia');
      } else if (endingId === 'ENDING_B') {
        // Tekno-Ayrışma: Suspended Cold Augmented (F# - A# - C# - F)
        chord = [92.50, 138.59, 185.00, 233.08, 349.23];
        this.setDroneMood('tense');
      } else if (endingId === 'ENDING_C') {
        // Simbiyoz: Radiant Warm Pentatonic (C - E - G - B - D)
        chord = [130.81, 196.00, 246.94, 329.63, 392.00, 587.33];
        this.setDroneMood('utopia');
      } else if (endingId === 'ENDING_E') {
        // Dijital İnziva: Pure Sine Octaves & Cold Fifths
        chord = [110.00, 220.00, 329.63, 440.00, 659.25];
        this.setDroneMood('limbo');
      } else {
        // Kırılgan Araf: Neutral open fourths
        chord = [110.00, 146.83, 220.00, 293.66];
        this.setDroneMood('limbo');
      }

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = isDistorted ? 'sawtooth' : (idx === 0 ? 'triangle' : 'sine');
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.18 / chord.length, t + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 4.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 4.8);
      });
    }

    // Triumphant Achievement Unlocked Jingle
    playAchievementSound() {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C high

      notes.forEach((freq, idx) => {
        const noteTime = t + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.24, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.65);
      });
    }
  }

  window.soundEngine = new SoundEngine();
})();
