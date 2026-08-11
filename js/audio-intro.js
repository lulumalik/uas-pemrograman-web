/* ==========================================================================
   AUDIO INTRO OVERLAY & FLOATING CONTROLLER
   YouTube IFrame Player API Integration (Video ID: 6w6Cq3ZNUWk)
   ========================================================================== */
(function () {
  const YT_VIDEO_ID = '6w6Cq3ZNUWk';

  // UI Elements - Overlay
  const overlay   = document.getElementById('audio-overlay');
  const btnEnter  = document.getElementById('ao-btn-enter');
  const btnMute   = document.getElementById('ao-btn-mute');
  const volSlider = document.getElementById('ao-volume');
  const volRow    = document.getElementById('ao-volume-row');
  const nowPlay   = document.getElementById('ao-now-playing');
  const particles = document.getElementById('ao-particles');

  // UI Elements - Floating Control (Top Right)
  const floatCtrl = document.getElementById('audio-floating-control');
  const floatBtn  = document.getElementById('afc-btn-toggle');
  const floatVol  = document.getElementById('afc-vol-slider');

  let player = null;
  let isYtReady = false;
  let isPlaying = false;
  let isMuted = false;

  // ── Floating Particles ──────────────────────────────────────────
  if (particles) {
    const COLORS = ['#6366f1', '#818cf8', '#06b6d4', '#4f46e5', '#a5b4fc'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'ao-particle';
      const x = Math.random() * 100;
      const delay = (Math.random() * 8).toFixed(2);
      const dur   = (5 + Math.random() * 7).toFixed(2);
      p.style.cssText = `left:${x}%;bottom:${Math.random()*20}%;--dur2:${dur}s;--delay:${delay}s;background:${COLORS[i % COLORS.length]}`;
      particles.appendChild(p);
    }
  }

  // ── Load YouTube IFrame API ──────────────────────────────────────
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-player-element', {
      height: '1',
      width: '1',
      videoId: YT_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: YT_VIDEO_ID,
        playsinline: 1
      },
      events: {
        onReady: function () {
          isYtReady = true;
          if (player) player.setVolume(parseInt(volSlider ? volSlider.value * 100 : 35));
        },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            if (floatCtrl) {
              floatCtrl.classList.add('playing');
              floatCtrl.classList.add('active');
            }
          } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
            isPlaying = false;
            if (floatCtrl) floatCtrl.classList.remove('playing');
          }
        }
      }
    });
  };

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    document.head.appendChild(tag);
  }

  // ── Sync Floating Controller ────────────────────────────────────
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
    if (player && isYtReady) {
      player.setVolume(parseInt(volSlider.value * 100));
      player.playVideo();
      isPlaying = true;
      isMuted = false;
      updateFloatBtnUI();
    }
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
      setTimeout(dismissOverlay, 1800);
    });
  }

  if (btnMute) {
    btnMute.addEventListener('click', () => {
      dismissOverlay();
    });
  }

  if (volSlider) {
    volSlider.addEventListener('input', () => {
      const volVal = parseInt(volSlider.value * 100);
      if (player && isYtReady) player.setVolume(volVal);
      if (floatVol) floatVol.value = volVal;
    });
  }

  // ── Floating Controller Events ──────────────────────────────────
  if (floatBtn) {
    floatBtn.addEventListener('click', () => {
      if (!player || !isYtReady) return;
      if (isPlaying && !isMuted) {
        player.pauseVideo();
        isMuted = true;
      } else {
        player.playVideo();
        if (player.unMute) player.unMute();
        isMuted = false;
      }
      updateFloatBtnUI();
    });
  }

  if (floatVol) {
    floatVol.addEventListener('input', () => {
      const volVal = parseInt(floatVol.value);
      if (player && isYtReady) {
        player.setVolume(volVal);
        if (volVal === 0) {
          isMuted = true;
        } else if (isMuted) {
          isMuted = false;
          if (player.unMute) player.unMute();
        }
      }
      if (volSlider) volSlider.value = volVal / 100;
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
