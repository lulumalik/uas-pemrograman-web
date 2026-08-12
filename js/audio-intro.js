/* ==========================================================================
   AUDIO INTRO OVERLAY & FLOATING CONTROLLER
   Dual Engine: HTML5 Audio + Web Audio Ambient Synth Fallback
   ========================================================================== */
(function () {
  // UI Elements - Overlay
  const overlay = document.getElementById('audio-overlay');
  const btnEnter = document.getElementById('ao-btn-enter');
  const btnMute = document.getElementById('ao-btn-mute');
  const volSlider = document.getElementById('ao-volume');
  const volRow = document.getElementById('ao-volume-row');
  const nowPlay = document.getElementById('ao-now-playing');
  const particles = document.getElementById('ao-particles');

  // UI Elements - Floating Control (Top Right)
  const floatCtrl = document.getElementById('audio-floating-control');
  const floatBtn = document.getElementById('afc-btn-toggle');
  const floatVol = document.getElementById('afc-vol-slider');

  let isPlaying = false;
  let isMuted = false;
  let audioEl = null;

  // Web Audio Synth Fallback Variables
  let audioCtx = null;
  let masterGain = null;
  let chordInterval = null;
  let synthActive = false;

  // ── Floating Particles ──────────────────────────────────────────
  if (particles) {
    const COLORS = ['#6366f1', '#818cf8', '#06b6d4', '#4f46e5', '#a5b4fc'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'ao-particle';
      const x = Math.random() * 100;
      const delay = (Math.random() * 8).toFixed(2);
      const dur = (5 + Math.random() * 7).toFixed(2);
      p.style.cssText = `left:${x}%;bottom:${Math.random() * 20}%;--dur2:${dur}s;--delay:${delay}s;background:${COLORS[i % COLORS.length]}`;
      particles.appendChild(p);
    }
  }

  // ── HTML5 Audio Setup ───────────────────────────────────────────
  try {
    audioEl = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
    audioEl.loop = true;
    audioEl.preload = 'auto';
  } catch (e) {
    console.warn('HTML5 Audio init fallback to Web Audio Synth');
  }

  // ── Web Audio Ambient Synthesizer (Fallback Engine) ─────────────
  const CHORDS = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 349.23], // Fmaj7
    [196.00, 246.94, 293.66, 349.23]  // G7
  ];

  function initWebAudioSynth() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 550;

    masterGain.connect(filter);
    filter.connect(audioCtx.destination);
  }

  function playSynthChord() {
    if (!audioCtx) initWebAudioSynth();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const chordIndex = Math.floor(Math.random() * CHORDS.length);
    const freqs = CHORDS[chordIndex];
    const now = audioCtx.currentTime;

    freqs.forEach(f => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.035, now + 1.5);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

      osc.connect(g);
      g.connect(masterGain);

      osc.start(now);
      osc.stop(now + 5.0);
    });
  }

  function startSynthEngine() {
    synthActive = true;
    initWebAudioSynth();
    playSynthChord();
    if (chordInterval) clearInterval(chordInterval);
    chordInterval = setInterval(playSynthChord, 4500);
  }

  function stopSynthEngine() {
    synthActive = false;
    if (chordInterval) clearInterval(chordInterval);
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  }

  // ── Unified Volume Controller ───────────────────────────────────
  function setGlobalVolume(volVal) {
    // volVal is 0.0 to 1.0
    const clamped = Math.max(0, Math.min(1, volVal));
    if (audioEl) audioEl.volume = clamped;
    if (masterGain && audioCtx) masterGain.gain.value = clamped;
  }

  // ── Sync Floating Controller UI ────────────────────────────────
  function updateFloatBtnUI() {
    if (!floatBtn) return;
    const icon = floatBtn.querySelector('i');
    if (isMuted || !isPlaying) {
      floatBtn.classList.add('is-muted');
      if (icon) icon.className = 'fa-solid fa-volume-xmark';
      if (floatCtrl) floatCtrl.classList.remove('playing');
    } else {
      floatBtn.classList.remove('is-muted');
      if (icon) icon.className = 'fa-solid fa-volume-high';
      if (floatCtrl) floatCtrl.classList.add('playing');
    }
  }

  function startMusic() {
    const currentVol = parseFloat(volSlider ? volSlider.value : 0.35);
    setGlobalVolume(currentVol);

    if (audioEl) {
      audioEl.play().then(() => {
        isPlaying = true;
        isMuted = false;
        updateFloatBtnUI();
      }).catch(err => {
        console.warn('HTML5 Audio play failed, falling back to Web Audio Synth:', err);
        startSynthEngine();
        isPlaying = true;
        isMuted = false;
        updateFloatBtnUI();
      });
    } else {
      startSynthEngine();
      isPlaying = true;
      isMuted = false;
      updateFloatBtnUI();
    }
  }

  function pauseMusic() {
    if (audioEl) audioEl.pause();
    stopSynthEngine();
    isPlaying = false;
    isMuted = true;
    updateFloatBtnUI();
  }

  function dismissOverlay() {
    if (!overlay) return;
    overlay.classList.add('hiding');
    overlay.addEventListener('transitionend', () => {
      overlay.remove();
      document.body.style.overflow = '';
      if (floatCtrl) floatCtrl.classList.add('active');
    }, { once: true });
  }

  // ── Overlay Events ──────────────────────────────────────────────
  if (btnEnter) {
    btnEnter.addEventListener('click', () => {
      startMusic();
      if (volRow) volRow.style.display = 'flex';
      if (nowPlay) nowPlay.classList.add('visible');
      btnEnter.disabled = true;
      btnEnter.innerHTML = '<i class="fa-solid fa-check"></i> Menikmati musik...';
      setTimeout(dismissOverlay, 1500);
    });
  }

  if (btnMute) {
    btnMute.addEventListener('click', () => {
      dismissOverlay();
    });
  }

  if (volSlider) {
    volSlider.addEventListener('input', () => {
      const volVal = parseFloat(volSlider.value);
      setGlobalVolume(volVal);
      if (floatVol) floatVol.value = Math.round(volVal * 100);
    });
  }

  // ── Floating Controller Events ──────────────────────────────────
  if (floatBtn) {
    floatBtn.addEventListener('click', () => {
      if (isPlaying && !isMuted) {
        pauseMusic();
      } else {
        startMusic();
      }
    });
  }

  if (floatVol) {
    floatVol.addEventListener('input', () => {
      const volVal = parseFloat(floatVol.value) / 100;
      setGlobalVolume(volVal);
      if (volVal === 0) {
        isMuted = true;
      } else if (isMuted) {
        isMuted = false;
      }
      if (volSlider) volSlider.value = volVal;
      updateFloatBtnUI();
    });
  }

  // Lock scroll while overlay visible
  document.body.style.overflow = 'hidden';

  // ESC key = mute dismiss
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') btnMute.click();
  }, { once: true });
})();
