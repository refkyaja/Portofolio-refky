/**

 * Refky Favian Mahardika - Portfolio Interactive Script

 * Pure Vanilla JavaScript (No dependencies)

 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------

  // 1. Elements Selection

  // -------------------------------------------------------------------------

    let guildRulesAgreeCheckbox = null;
  let guildSubmitBtn = null;

  let scrollLockCount = 0;
  function lockBodyScroll() {
    scrollLockCount++;
    if (scrollLockCount === 1) {
      document.body.style.overflow = 'hidden';
    }
  }

  function unlockBodyScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.overflow = '';
    }
  }
const themeToggle = document.getElementById('themeToggle');

  const bgNight = document.getElementById('bgNight');

  const bgDay = document.getElementById('bgDay');

  const soundToggle = document.getElementById('soundToggle');

  const settingsToggle = document.getElementById('settingsToggle');

  const settingsModalBackdrop = document.getElementById('settingsModalBackdrop');

  const settingsModalDialog = document.getElementById('settingsModalDialog');

  const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');

  const btnSaveSettings = document.getElementById('btnSaveSettings');

  const btnToggleDragon = document.getElementById('btnToggleDragon');

  const btnToggleMascots = document.getElementById('btnToggleMascots');

  const isl = document.getElementById('isl');

  const lbl = document.getElementById('lbl');

  const logoBtn = document.getElementById('logo');

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  const navLinks = document.getElementById('navLinks');

  const navLinksItems = document.querySelectorAll('.isl .lnk, .lnk, .nav-link');

  const headerContainer = document.querySelector('.header-container');

  const filterBtns = document.querySelectorAll('.filter-btn');

  const projectCards = document.querySelectorAll('.project-card');

  const contactForm = document.getElementById('contactForm');

  const pixelToast = document.getElementById('pixelToast');

  const toastMessage = document.getElementById('toastMessage');

  // -------------------------------------------------------------------------

  // 2. Synthesized 8-Bit Retro Sound Engine (Web Audio API)

  // -------------------------------------------------------------------------

  let audioCtx = null;

  let isSoundEnabled = true;

  function initAudio() {

    if (!audioCtx) {

      const AudioContext = window.AudioContext || window.webkitAudioContext;

      if (AudioContext) {

        audioCtx = new AudioContext();

      }

    }

    if (audioCtx && audioCtx.state === 'suspended') {

      audioCtx.resume();

    }

  }

  // Play retro synth sound

  function playSound(type = 'blip') {

    if (!isSoundEnabled) return;

    try {

      initAudio();

      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();

      const gain = audioCtx.createGain();

      osc.connect(gain);

      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'blip') {

        // High-pitched square wave blip

        osc.type = 'square';

        osc.frequency.setValueAtTime(440, now);

        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

        gain.gain.setValueAtTime(0.08, now);

        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);

        osc.start(now);

        osc.stop(now + 0.08);

      } else if (type === 'click') {

        // Low retro button click

        osc.type = 'triangle';

        osc.frequency.setValueAtTime(320, now);

        osc.frequency.linearRampToValueAtTime(160, now + 0.06);

        gain.gain.setValueAtTime(0.12, now);

        gain.gain.linearRampToValueAtTime(0.001, now + 0.06);

        osc.start(now);

        osc.stop(now + 0.06);

      } else if (type === 'toggle') {

        // Chime for Day/Night mode

        osc.type = 'sine';

        osc.frequency.setValueAtTime(587.33, now); // D5

        osc.frequency.setValueAtTime(880, now + 0.1); // A5

        gain.gain.setValueAtTime(0.1, now);

        gain.gain.linearRampToValueAtTime(0.001, now + 0.25);

        osc.start(now);

        osc.stop(now + 0.25);

      } else if (type === 'unroll') {

        // Rustle & unfurl sweep

        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(180, now);

        osc.frequency.exponentialRampToValueAtTime(540, now + 0.18);

        gain.gain.setValueAtTime(0.04, now);

        gain.gain.linearRampToValueAtTime(0.001, now + 0.22);

        osc.start(now);

        osc.stop(now + 0.22);

      } else if (type === 'roll') {

        // Roll up whoosh

        osc.type = 'triangle';

        osc.frequency.setValueAtTime(480, now);

        osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);

        gain.gain.setValueAtTime(0.06, now);

        gain.gain.linearRampToValueAtTime(0.001, now + 0.2);

        osc.start(now);

        osc.stop(now + 0.2);

      } else if (type === 'fire') {

        // Dragon fire breath sizzle

        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(320, now);

        osc.frequency.exponentialRampToValueAtTime(80, now + 0.14);

        gain.gain.setValueAtTime(0.045, now);

        gain.gain.linearRampToValueAtTime(0.001, now + 0.14);

        osc.start(now);

        osc.stop(now + 0.14);

      } else if (type === 'victory') {

        // RPG Quest Completed fanfare

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, idx) => {

          const subOsc = audioCtx.createOscillator();

          const subGain = audioCtx.createGain();

          subOsc.connect(subGain);

          subGain.connect(audioCtx.destination);

          subOsc.type = 'square';

          subOsc.frequency.setValueAtTime(freq, now + idx * 0.1);

          subGain.gain.setValueAtTime(0.08, now + idx * 0.1);

          subGain.gain.linearRampToValueAtTime(0.001, now + (idx + 1) * 0.1 + 0.1);

          subOsc.start(now + idx * 0.1);

          subOsc.stop(now + (idx + 1) * 0.1 + 0.12);

        });

      }

    } catch (e) {

      console.warn('Audio play error:', e);

    }

  }

  // Sound toggle button

  if (soundToggle) {

    soundToggle.addEventListener('click', (e) => {

      e.stopPropagation();

      isSoundEnabled = !isSoundEnabled;

      soundToggle.classList.toggle('muted', !isSoundEnabled);

      if (isl) isl.classList.toggle('muted', !isSoundEnabled);

      if (isSoundEnabled) {

        playSound('blip');

      }

      showToast(isSoundEnabled ? '🔔 Lonceng kastil berdentang!' : '🤫 Seluruh kerajaan hening...');

    });

  }

  // -------------------------------------------------------------------------

  // 3. Day / Night Mode Switching

  // -------------------------------------------------------------------------

  function setTheme(theme) {

    if (theme === 'day') {

      document.body.classList.remove('theme-night');

      document.body.classList.add('theme-day');

      document.documentElement.dataset.theme = 'light';

      if (bgNight) bgNight.classList.remove('active');

      if (bgDay) bgDay.classList.add('active');

    } else {

      document.body.classList.remove('theme-day');

      document.body.classList.add('theme-night');

      document.documentElement.dataset.theme = 'dark';

      if (bgDay) bgDay.classList.remove('active');

      if (bgNight) bgNight.classList.add('active');

    }

    localStorage.setItem('rfm_theme', theme);

  }

  // Check saved theme or default to night (matching photo)

  const savedTheme = localStorage.getItem('rfm_theme') || 'night';

  setTheme(savedTheme);

  if (themeToggle) {

    themeToggle.addEventListener('click', (e) => {

      e.stopPropagation();

      const isCurrentlyNight = document.body.classList.contains('theme-night');

      const nextTheme = isCurrentlyNight ? 'day' : 'night';

      setTheme(nextTheme);

      playSound('toggle');

      showToast(

        nextTheme === 'day' 

          ? '☀️ matahari menyinari kastil!' 

          : '🌙 bintang-bintang mulai bersinar...'

      );

    });

  }

  // -------------------------------------------------------------------------

  // 4. Dynamic Island Controller & Logic

  // -------------------------------------------------------------------------

  let islandTimer = null;

  let isHovered = false;

  function openIsland() {

    clearTimeout(islandTimer);

    if (isl) isl.classList.add('open');

  }

  function closeIsland() {

    if (!isHovered && isl && window.scrollY > 40) {

      isl.classList.remove('open');

    }

  }

  function closeIslandLater(ms) {

    clearTimeout(islandTimer);

    islandTimer = setTimeout(closeIsland, ms);

  }

  function setActiveSection(name) {

    const targetHref = '#' + name.toLowerCase();

    navLinksItems.forEach(a => {

      const href = a.getAttribute('href');

      const on = href === targetHref || 

        (name.toLowerCase() === 'sertifikat' && (href === '#sertifikat' || href === '#sertificat')) ||

        ((name.toLowerCase() === 'education' || name.toLowerCase() === 'pendidikan') && (href === '#education' || href === '#pendidikan'));

      a.classList.toggle('active', on);

      if (on) {

        a.setAttribute('aria-current', 'page');

      } else {

        a.removeAttribute('aria-current');

      }

    });

    if (lbl) {

      lbl.textContent = name;

    }

  }

  // Label click expands island

  if (lbl) {

    lbl.addEventListener('click', () => {

      openIsland();

    });

  }

  // Hover & Focus handlers for Dynamic Island

  if (isl) {

    isl.addEventListener('mouseenter', () => {

      isHovered = true;

      openIsland();

    });

    isl.addEventListener('mouseleave', () => {

      isHovered = false;

      if (window.scrollY > 40) {

        closeIslandLater(500);

      }

    });

    isl.addEventListener('focusin', () => {

      openIsland();

    });

  }

  // Logo home button click

  if (logoBtn) {

    logoBtn.addEventListener('click', () => {

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setActiveSection('Home');

      playSound('blip');

      openIsland();

    });

  }

  // Nav links smooth scroll & active state

  navLinksItems.forEach(link => {

    link.addEventListener('click', (e) => {

      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {

        e.preventDefault();

        const targetId = href.slice(1);

        const targetSec = document.getElementById(targetId) || (targetId === 'sertifikat' ? document.getElementById('sertificat') : null);

        if (targetSec) {

          targetSec.scrollIntoView({ behavior: 'smooth' });

        }

        setActiveSection(link.textContent.trim());

        playSound('blip');

        if (window.scrollY > 40) {

          closeIslandLater(700);

        }

      }

    });

  });

  // -------------------------------------------------------------------------

  // 5. Scroll Handler, First Scroll Animation & Scroll Reveal

  // -------------------------------------------------------------------------

  let hasTriggeredFirstScroll = false;

  window.addEventListener('scroll', () => {

    // Animasi scroll pertama kali

    if (!hasTriggeredFirstScroll && window.scrollY > 15) {

      hasTriggeredFirstScroll = true;

      document.body.classList.add('first-scroll-active');

      if (typeof playSound === 'function') playSound('blip');

    }

    if (window.scrollY > 40) {

      if (!isHovered) {

        closeIslandLater(150);

      }

    } else {

      openIsland();

    }

    updateActiveNavLink();

  }, { passive: true });

  // Inisialisasi Scroll Reveal untuk elemen-elemen halaman

  const scrollRevealTargets = document.querySelectorAll(

    '.section-header, .pixel-card, .project-card, .cert-wrap, .gallery-card, .guild-board-wrapper, .parchment-stage'

  );

  scrollRevealTargets.forEach((el) => {

    el.classList.add('scroll-reveal-item');

    // Stagger delay antar kartu yang bersebelahan

    const sibIdx = Array.from(el.parentElement ? el.parentElement.children : []).indexOf(el);

    if (sibIdx > 0) {

      el.style.transitionDelay = `${Math.min(sibIdx * 0.12, 0.48)}s`;

    }

  });

  if ('IntersectionObserver' in window) {

    const scrollRevealObserver = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('revealed');

          scrollRevealObserver.unobserve(entry.target);

        }

      });

    }, {

      threshold: 0.08,

      rootMargin: '0px 0px -30px 0px'

    });

    scrollRevealTargets.forEach(el => scrollRevealObserver.observe(el));

  } else {

    scrollRevealTargets.forEach(el => el.classList.add('revealed'));

  }

  const sectionNameMap = {

    'home': 'Home',

    'about': 'About',

    'education': 'Education',

    'pendidikan': 'Education',

    'projects': 'Projects',

    'sertifikat': 'Sertifikat',

    'sertificat': 'Sertifikat',

    'gallery': 'Gallery',

    'comments': 'Comments',

    'contact': 'Contact'

  };

  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {

    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {

      const top = section.offsetTop;

      const height = section.offsetHeight;

      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {

        const prettyName = sectionNameMap[id] || (id.charAt(0).toUpperCase() + id.slice(1));

        setActiveSection(prettyName);

      }

    });

  }

  // Add click sounds to all interactive buttons

  document.querySelectorAll('.pixel-btn, .filter-btn, .proj-btn, .social-btn').forEach(btn => {

    btn.addEventListener('click', () => playSound('click'));

  });

  // -------------------------------------------------------------------------

  // 6. Interactive Typing Effect on Hero Subtitle

  // -------------------------------------------------------------------------

  const typingElement = document.getElementById('typingText');

  const rolePhrases = [

    "UI/UX Designer",

    "Web Developer",

    "Mobile Developer",

    "Fullstack Engineer"

  ];

  let phraseIndex = 0;

  let charIndex = 0;

  let isDeleting = false;

  const typeSpeed = 70;

  const deleteSpeed = 35;

  const pauseEnd = 2000;

  function typeEffect() {

    if (!typingElement) return;

    const currentPhrase = rolePhrases[phraseIndex];

    if (!isDeleting) {

      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);

      charIndex++;

      if (charIndex === currentPhrase.length) {

        isDeleting = true;

        setTimeout(typeEffect, pauseEnd);

        return;

      }

      setTimeout(typeEffect, typeSpeed);

    } else {

      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);

      charIndex--;

      if (charIndex === 0) {

        isDeleting = false;

        phraseIndex = (phraseIndex + 1) % rolePhrases.length;

        setTimeout(typeEffect, 400);

        return;

      }

      setTimeout(typeEffect, deleteSpeed);

    }

  }

  // Start typing after initial load entrance animation

  setTimeout(typeEffect, 1050);

    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
  // 6.5. Visual Novel & Knight Character Profile Controller (About Me)
  // -------------------------------------------------------------------------
  (function initAboutVisualNovel() {
    const $ = function(i) { return document.getElementById(i); };
    const w = $('vnw');
    const v = $('vnv');
    const vnf = $('vnf');
    const tx = $('vtx');
    const mk = $('vnm');
    const pg = $('vpg');
    const pv = $('vpv');
    const nx = $('vnx');
    const vb = $('vnb');
    const vnd = $('vnd');
    const npj = $('npj');
    const nrp = $('nrp');

    if (!w || !v || !tx) return;

    // Golden decorative frame
    const FR = '<span class="o tl"></span><span class="o tr"></span><span class="o bl"></span><span class="o br"></span><span class="o ts"></span><span class="o bs"></span><span class="o gt"></span><span class="o gb"></span><span class="o gl"></span><span class="o gr"></span>';
    if (vnf) vnf.insertAdjacentHTML('afterbegin', FR);

    // Pixel sword sprite in .swc canvas
    const swd = $('swd');
    if (swd) {
      const g = swd.getContext('2d');
      function rc(x, y, sw, sh, c) { g.fillStyle = c; g.fillRect(x, y, sw, sh); }
      rc(7, 0, 2, 1, '#ffffff');
      rc(7, 1, 2, 2, '#e8edf7');
      rc(6, 3, 4, 41, '#c0262d');
      rc(6, 3, 1, 41, '#e8edf7');
      rc(9, 3, 1, 41, '#8f9ab5');
      rc(1, 44, 14, 3, '#f5b73b');
      rc(1, 44, 2, 3, '#c98a22');
      rc(13, 44, 2, 3, '#c98a22');
      rc(6, 47, 4, 9, '#7d1a20');
      rc(6, 50, 4, 1, '#3a0f12');
      rc(6, 53, 4, 1, '#3a0f12');
      rc(5, 56, 6, 4, '#f5b73b');
      rc(5, 59, 6, 1, '#c98a22');
    }

    // Sparkles & Castle ambient dust
    for (let k = 0; k < 18; k++) {
      const s = document.createElement('i');
      s.className = 'tw';
      s.style.left = (Math.random() * 98) + '%';
      s.style.top = (Math.random() * 46) + '%';
      s.style.animationDelay = (Math.random() * 2.4) + 's';
      v.appendChild(s);
    }
    for (let k = 0; k < 12; k++) {
      const f = document.createElement('i');
      f.className = 'fl';
      f.style.left = (5 + Math.random() * 90) + '%';
      f.style.top = (52 + Math.random() * 38) + '%';
      f.style.animationDelay = (Math.random() * 6) + 's';
      v.appendChild(f);
    }

    // Story Dialogues
    const L = [
      {
        t: 'Halo! Saya seorang siswa SMK jurusan Rekayasa Perangkat Lunak di SMKN 13 Bandung yang memiliki ketertarikan besar di dunia pengembangan web dan mobile application.',
        g: ['RPL', 'SMKN 13 Bandung']
      },
      {
        t: 'Saya senang membangun aplikasi yang fungsional, tangguh, dan nyaman digunakan.',
        g: ['Fungsional', 'Tangguh', 'Nyaman digunakan']
      },
      {
        t: 'Fokus saya saat ini adalah mempelajari dan mengembangkan proyek menggunakan Laravel, Flutter, dan teknologi modern lainnya.',
        g: ['Laravel', 'Flutter', 'Web', 'Mobile']
      },
      {
        t: 'Bagi saya, coding bukan cuma sekadar baris kode, tapi tentang bagaimana ide bisa diwujudkan menjadi sesuatu yang nyata dan berguna.',
        g: ['Ide ▸ Nyata']
      }
    ];

    let i = 0;
    let typing = false;
    let timer = null;
    let pose = 'idle';

    function tags(g) {
      if (!vb) return;
      vb.innerHTML = (g || []).map((t, n) => '<i style="animation-delay:' + (n * 0.12) + 's">' + t + '</i>').join('');
    }

    function fin() {
      clearInterval(timer);
      tx.textContent = L[i].t;
      typing = false;
      if (mk) mk.classList.add('on');
    }

    function setPose(p) {
      if (p === pose) return;
      pose = p;
      v.classList.toggle('up', p === 'up');
      if (p === 'up') {
        v.classList.remove('fx');
        void v.offsetWidth;
        v.classList.add('fx');
        if (typeof playSound === 'function') playSound('victory');
      }
    }

    function show(n) {
      i = n;
      clearInterval(timer);
      const s = L[n].t;
      let c = 0;
      tx.textContent = '';
      typing = true;
      if (mk) mk.classList.remove('on');
      if (pg) pg.textContent = (n + 1) + ' / ' + L.length;
      if (pv) pv.disabled = (n === 0);
      if (nx) nx.textContent = (n === L.length - 1) ? 'Selesai ▶' : 'Lanjut ▶';
      tags(L[n].g);
      setPose(n === L.length - 1 ? 'up' : 'idle');

      timer = setInterval(() => {
        c++;
        tx.textContent = s.slice(0, c);
        if (c % 3 === 0 && typeof playSound === 'function') {
          playSound('blip');
        }
        if (c >= s.length) {
          fin();
        }
      }, 22);
    }

    function nxt() {
      if (typing) {
        fin();
        return;
      }
      if (i < L.length - 1) {
        if (typeof playSound === 'function') playSound('click');
        show(i + 1);
      } else {
        if (typeof playSound === 'function') playSound('unroll');
        setMode('norm');
      }
    }

    function setMode(m) {
      const n = $('nrm');
      if (!w || !n || !v) return;
      const from = w.offsetHeight;
      w.dataset.m = m;
      const to = (m === 'norm') ? n.offsetHeight : v.offsetHeight;
      w.style.height = from + 'px';
      w.offsetHeight; // force reflow
      w.style.height = to + 'px';

      if (m === 'story') {
        clearInterval(timer);
        tx.textContent = '';
        tags([]);
        setTimeout(() => {
          w.style.height = '';
          show(0);
        }, 650);
      }
    }

    window.addEventListener('resize', () => {
      const n = $('nrm');
      if (w && w.dataset.m === 'norm' && n) {
        w.style.height = n.offsetHeight + 'px';
      }
    });

    if (npj) {
      npj.onclick = () => {
        const p = $('projects');
        if (typeof playSound === 'function') playSound('click');
        if (p) p.scrollIntoView({ behavior: 'smooth' });
      };
    }

    if (nrp) {
      nrp.onclick = () => {
        if (typeof playSound === 'function') playSound('unroll');
        setMode('story');
      };
    }

    if (nx) {
      nx.onclick = (e) => {
        e.stopPropagation();
        nxt();
      };
    }

    if (pv) {
      pv.onclick = (e) => {
        e.stopPropagation();
        if (i > 0) {
          if (typeof playSound === 'function') playSound('click');
          show(i - 1);
        }
      };
    }

    if (vnd) {
      vnd.addEventListener('click', nxt);
    }

    document.addEventListener('keydown', (e) => {
      if (!w || w.dataset.m !== 'story') return;
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (['input', 'textarea'].includes(tag) || (document.activeElement && document.activeElement.isContentEditable)) return;
      const r = v.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight - 80) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nxt();
      } else if (e.key === 'ArrowLeft' && i > 0 && !typing) {
        if (typeof playSound === 'function') playSound('click');
        show(i - 1);
      }
    });

    // -------------------------------------------------------------
    // Portrait Pixelation Engine & Photo Swapping
    // -------------------------------------------------------------
    function initPortrait() {
      const PHOTO = 'Assets/Images/foto-about-me.jpg';
      const S = 360, M = 120;
      const main = $('pmain');
      const med = $('pmc');
      const pmed = $('pmed');
      if (!main || !med) return;

      const mc = main.getContext('2d');
      const dc = med.getContext('2d');
      let face = 'k';
      let busy = false;
      let srcK = null;
      let srcP = null;
      const KI = new Image();
      const tmp = document.createElement('canvas');
      const tc = tmp.getContext('2d');

      function cv() {
        const c = document.createElement('canvas');
        c.width = c.height = S;
        return c;
      }

      function cover(g, img) {
        const s = Math.max(S / img.naturalWidth, S / img.naturalHeight);
        const cw = img.naturalWidth * s;
        const ch = img.naturalHeight * s;
        g.drawImage(img, (S - cw) / 2, (S - ch) / 2, cw, ch);
      }

      function mkPlace() {
        const c = cv();
        const g = c.getContext('2d');
        g.fillStyle = '#0b1a3d';
        g.fillRect(0, 0, S, S);
        g.strokeStyle = 'rgba(245,183,59,.12)';
        for (let x = 0; x < S; x += 24) {
          g.beginPath(); g.moveTo(x, 0); g.lineTo(x, S); g.stroke();
          g.beginPath(); g.moveTo(0, x); g.lineTo(S, x); g.stroke();
        }
        g.fillStyle = '#1d3f80';
        for (let y = 70; y < 200; y += 12) {
          for (let x = 100; x < 260; x += 12) {
            let dx = (x + 6 - 180) / 78, dy = (y + 6 - 135) / 68;
            if (dx * dx + dy * dy <= 1) g.fillRect(x, y, 11, 11);
          }
        }
        for (let y = 214; y < S; y += 12) {
          for (let x = 30; x < 330; x += 12) {
            let ex = (x + 6 - 180) / 160, ey = (y + 6 - 330) / 118;
            if (ex * ex + ey * ey <= 1) g.fillRect(x, y, 11, 11);
          }
        }
        g.fillStyle = '#f5b73b';
        g.font = 'bold 22px "Courier Prime", monospace';
        g.textAlign = 'center';
        g.fillText('REFKY FAVIAN', 180, 50);
        return c;
      }

      function render() {
        mc.imageSmoothingEnabled = true;
        dc.imageSmoothingEnabled = true;
        mc.clearRect(0, 0, S, S);
        dc.clearRect(0, 0, M, M);
        if (srcK && srcP) {
          mc.drawImage(face === 'k' ? srcK : srcP, 0, 0);
          dc.drawImage(face === 'k' ? srcP : srcK, 0, 0, S, S, 0, 0, M, M);
        }
      }

      function build() {
        srcK = cv();
        const g = srcK.getContext('2d');
        const sc = KI.naturalWidth / 1671;
        g.drawImage(KI, 470 * sc, 40 * sc, 580 * sc, 560 * sc, 0, 0, S, S);

        const P = new Image();
        P.onload = function() {
          srcP = cv();
          cover(srcP.getContext('2d'), P);
          render();
        };
        P.onerror = function() {
          srcP = mkPlace();
          render();
        };
        P.src = PHOTO;
        srcP = mkPlace();
        render();
      }

      function pix(ctx, src, width, pxVal) {
        const n = Math.max(4, Math.round(width / pxVal));
        tmp.width = tmp.height = n;
        tc.imageSmoothingEnabled = true;
        tc.drawImage(src, 0, 0, n, n);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, width, width);
        ctx.drawImage(tmp, 0, 0, n, n, 0, 0, width, width);
      }

      function swap() {
        if (busy || !srcK || !srcP) return;
        busy = true;
        if (pmed) pmed.classList.remove('hint');
        if (typeof playSound === 'function') playSound('victory');
        const t0 = performance.now();
        const D = 750;
        let sw = false;

        function step(now) {
          const t = Math.min(1, (now - t0) / D);
          const p = 1 - Math.abs(2 * t - 1);
          const pxVal = 1 + p * p * 44;
          if (t >= 0.5 && !sw) {
            sw = true;
            face = face === 'k' ? 'p' : 'k';
          }
          pix(mc, face === 'k' ? srcK : srcP, S, pxVal);
          pix(dc, face === 'k' ? srcP : srcK, M, pxVal * 0.34 + 1);
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            render();
            busy = false;
          }
        }
        requestAnimationFrame(step);
      }

      if (pmed) pmed.onclick = swap;
      KI.onload = build;
      KI.src = 'Assets/Images/ksatria.png';
    }

    initPortrait();

    let hasStarted = false;
    function startStoryOnce() {
      if (!hasStarted) {
        hasStarted = true;
        show(0);
      }
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          startStoryOnce();
          io.disconnect();
        }
      }, { threshold: 0.1 });
      io.observe(v);
    } else {
      startStoryOnce();
    }

    document.querySelectorAll('a[href="#about"]').forEach(a => {
      a.addEventListener('click', () => {
        setTimeout(startStoryOnce, 250);
      });
    });
  })();

// 7. RPG Interactive Quest Map (Pixel Island Adventure)

  // -------------------------------------------------------------------------

  (function initQuestMap() {

    const $ = function(i) { return document.getElementById(i); };

    const cv = $('qc');

    if (!cv) return;

    const cx = cv.getContext('2d');

    const qv = $('qv');

    const qw = $('qw');

    const qp = $('qp');

    const hint = $('qhint');

    const qmap = $('qmap');

    const projectPhotoModal = $('projectPhotoModal');

    const projectPhotoModalClose = $('projectPhotoModalClose');

    const modalProjectImg = $('modalProjectImg');

    const modalProjectPrev = $('modalProjectPrev');

    const modalProjectNext = $('modalProjectNext');

    const modalProjectBadge = $('modalProjectBadge');

    let currentModalImages = [];

    let currentUpdatePhotoFn = null;

    function closeProjectPhotoModal() {

      if (!projectPhotoModal) return;

      projectPhotoModal.classList.remove('active');

      projectPhotoModal.setAttribute('aria-hidden', 'true');

      if (typeof unlockBodyScroll === 'function') unlockBodyScroll();

      if (typeof playSound === 'function') playSound('click');

    }

    if (projectPhotoModalClose) projectPhotoModalClose.onclick = closeProjectPhotoModal;

    if (projectPhotoModal) {

      projectPhotoModal.onclick = function(e) {

        if (e.target === projectPhotoModal) closeProjectPhotoModal();

      };

    }

    if (modalProjectPrev) {

      modalProjectPrev.onclick = function(e) {

        e.stopPropagation();

        if (typeof currentUpdatePhotoFn === 'function') currentUpdatePhotoFn(-1);

      };

    }

    if (modalProjectNext) {

      modalProjectNext.onclick = function(e) {

        e.stopPropagation();

        if (typeof currentUpdatePhotoFn === 'function') currentUpdatePhotoFn(1);

      };

    }

    document.addEventListener('keydown', function(e) {

      if (!projectPhotoModal || !projectPhotoModal.classList.contains('active')) return;

      if (e.key === 'Escape') {

        closeProjectPhotoModal();

      } else if (e.key === 'ArrowLeft') {

        if (typeof currentUpdatePhotoFn === 'function') currentUpdatePhotoFn(-1);

      } else if (e.key === 'ArrowRight') {

        if (typeof currentUpdatePhotoFn === 'function') currentUpdatePhotoFn(1);

      }

    });

    const W = 220;

    const H = 100;

    const FR = '<span class="o tl"></span><span class="o tr"></span><span class="o bl"></span><span class="o br"></span><span class="o ts"></span><span class="o bs"></span><span class="o gt"></span><span class="o gb"></span><span class="o gl"></span><span class="o gr"></span>';

    if (qmap) qmap.insertAdjacentHTML('afterbegin', FR);

    const Q = [

      {

        s: 'EduVerse',

        n: 'EduVerse - LMS & Kelas Digital',

        w: 'Akademi EduVerse',

        x: 14,

        y: 60,

        t: ['Laravel', 'React', 'MySQL'],

        d: 'Platform Learning Management System (LMS) interaktif untuk guru dan siswa. Menyediakan ruang kelas digital, distribusi materi pelajaran, kuis interaktif, serta kolaborasi pembelajaran dalam satu ruang digital terpadu.',

        img: 'Assets/images-project/eduverse1.png',

        imgs: [

          'Assets/images-project/eduverse1.png',

          'Assets/images-project/eduverse2.png',

          'Assets/images-project/eduverse3.png',

          'Assets/images-project/eduverse4.png',

          'Assets/images-project/eduverse5.png',

          'Assets/images-project/eduverse6.png'

        ],

        code: 'https://github.com/refkyaja/EduVerse_PaAri'

      },

      {

        s: 'Lekture AI',

        n: 'LektureAi - AI Study Assistant',

        w: 'Menara Lekture AI',

        x: 30,

        y: 32,

        t: ['Flutter', 'AI', 'Firebase'],

        d: 'Aplikasi mobile smart study companion berbasis AI. Memiliki fitur dictation & transkripsi suara materi perkuliahan, pembuatan kuis adaptif instan dari catatan, OCR scan buku teks, serta integrasi Firebase real-time.',

        img: 'Assets/images-project/lectureai1.png',

        imgs: [

          'Assets/images-project/lectureai1.png',

          'Assets/images-project/lectureai2.png',

          'Assets/images-project/lectureai3.png',

          'Assets/images-project/lectureai4.png',

          'Assets/images-project/lectureai5.png',

          'Assets/images-project/lectureai6.png'

        ],

        code: 'https://github.com/refkyaja/LektureAi'

      },

      {

        s: 'Aplikasi RT/RW',

        n: 'Sistem Informasi Pengelolaan RT/RW Terpadu',

        w: 'Benteng Rukun Warga',

        x: 46,

        y: 58,

        t: ['WinForms', 'Desktop', 'SQL Server / SSMS'],

        d: 'Aplikasi desktop terpadu administrasi rukun tetangga & rukun warga (RT/RW). Dilengkapi dashboard monitoring data kependudukan warga, rekap iuran bulanan kas, penerbitan surat pengantar, dan galeri dokumentasi kegiatan lingkungan.',

        img: 'Assets/images-project/rtrwmultimedia3.png',

        imgs: [

          'Assets/images-project/rtrwmultimedia3.png',

          'Assets/images-project/rtrwmultimedia1.png',

          'Assets/images-project/rtrwmultimedia2.png',

          'Assets/images-project/rtrwmultimedia4.png'

        ],

        code: 'https://github.com/refkyaja/RTRWMultimedia'

      },

      {

        s: 'MyMBG',

        n: 'MyMbg - Makan Bergizi Gratis Manager',

        w: 'Lumbung Gizi MBG',

        x: 62,

        y: 30,

        t: ['WinForms', 'Desktop', 'Supabase'],

        d: 'Aplikasi desktop manajemen distribusi program Makan Bergizi Gratis (MBG). Menyediakan kalkulasi nutrisi harian (kalori, protein nabati/hewani, karbohidrat, lemak), pencatatan alokasi menu bergizi, serta sinkronisasi data cloud Supabase.',

        img: 'Assets/images-project/mymbg3.png',

        imgs: [

          'Assets/images-project/mymbg3.png',

          'Assets/images-project/mymbg1.png',

          'Assets/images-project/mymbg2.png',

          'Assets/images-project/mymbg4.png'

        ],

        code: 'https://github.com/refkyaja/MyMbg'

      },

      {

        s: 'Kelola Masjid',

        n: 'Sistem Pengelolaan Kas & Donasi Masjid',

        w: 'Kubah Cahaya Masjid',

        x: 80,

        y: 56,

        t: ['WinForms', 'Desktop', 'SQL Server / SSMS'],

        d: 'Sistem informasi desktop manajemen operasional dan keuangan masjid. Memfasilitasi pembukuan kas masuk & kas keluar, pengelolaan data donatur & jamaah, penjadwalan kegiatan ibadah, serta pelaporan kas yang transparan.',

        img: 'Assets/images-project/pengelolaanmasjid2.png',

        imgs: [

          'Assets/images-project/pengelolaanmasjid2.png',

          'Assets/images-project/pengelolaanmasjid1.png',

          'Assets/images-project/pengelolaanmasjid3.png'

        ],

        code: 'https://github.com/refkyaja/SistemPengelolaanMasjid'

      },

      {

        s: 'Bisnis Center',

        n: 'Bisnis Center - E-Commerce & POS Sekolah',

        w: 'Pusat Niaga Digital',

        x: 70,

        y: 82,

        t: ['Laravel', 'MySQL', 'AI'],

        d: 'Platform e-commerce dan aplikasi kasir Point of Sale (POS) terintegrasi untuk unit usaha sekolah. Memudahkan katalogisasi peralatan belajar, keranjang transaksi kasir instan, cetak struk belanja, dan integrasi fitur AI.',

        img: 'Assets/images-project/bisnis-center1.png',

        imgs: [

          'Assets/images-project/bisnis-center1.png',

          'Assets/images-project/bisnis-center4.png',

          'Assets/images-project/bisnis-center2.png',

          'Assets/images-project/bisnis-center3.png'

        ],

        code: 'https://github.com/refkyaja/Bisnis-Center'

      }

    ];

    /* ---- terrain pixel-art generation ---- */

    function hs(x, y) {

      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;

      return n - Math.floor(n);

    }

    function vn(x, y) {

      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;

      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);

      const a = hs(xi, yi), b = hs(xi + 1, yi), c = hs(xi, yi + 1), d = hs(xi + 1, yi + 1);

      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;

    }

    function fb(x, y) {

      return vn(x, y) * 0.5 + vn(x * 2, y * 2) * 0.25 + vn(x * 4, y * 4) * 0.15 + vn(x * 8, y * 8) * 0.1;

    }

    const Hm = new Float32Array(W * H);

    const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

    let i, x, y;

    for (y = 0; y < H; y++) {

      for (x = 0; x < W; x++) {

        const nx = (x / W - 0.5) / 0.5, ny = (y / H - 0.5) / 0.5;

        const r = Math.sqrt(nx * nx + ny * ny);

        const m = Math.max(0, 1 - Math.pow(r, 2.2));

        let hh = fb(x / 34 + 7.3, y / 34 + 2.1) * 0.7 + m * 0.32;

        for (i = 0; i < Q.length; i++) {

          const d = Math.hypot(x - Q[i].x * 2.2, y - Q[i].y * 1);

          if (d < 14) hh = Math.max(Math.min(hh, 0.6 + d * 0.012), 0.52 - d * 0.004);

        }

        Hm[y * W + x] = hh;

      }

    }

    const id = cx.createImageData(W, H);

    const D = id.data;

    function sp(x, y, c, f) {

      if (x < 0 || y < 0 || x >= W || y >= H) return;

      f = f || 1;

      const o = (y * W + x) * 4;

      D[o] = Math.min(255, c[0] * f);

      D[o + 1] = Math.min(255, c[1] * f);

      D[o + 2] = Math.min(255, c[2] * f);

      D[o + 3] = 255;

    }

    const C = {

      deep: [4, 16, 42],

      sh: [9, 38, 84],

      sand: [176, 128, 62],

      gr: [26, 86, 98],

      gr2: [31, 98, 104],

      fo: [14, 62, 72],

      fo2: [10, 48, 60],

      mo: [58, 74, 120],

      mo2: [82, 100, 146],

      sn: [214, 226, 250],

      gold: [245, 183, 59],

      plaza: [199, 146, 74]

    };

    for (y = 0; y < H; y++) {

      for (x = 0; x < W; x++) {

        const h0 = Hm[y * W + x];

        const nw = (x && y) ? Hm[(y - 1) * W + x - 1] : h0;

        const sh = Math.max(-0.5, Math.min(0.5, (h0 - nw) * 7));

        let f = 1 + sh * 0.35;

        const v = h0 + (B[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * 0.03;

        let c;

        if (v < 0.36) c = C.deep;

        else if (v < 0.42) c = C.sh;

        else if (v < 0.455) c = C.sand;

        else if (v < 0.66) {

          const n2 = fb(x / 9 + 31, y / 9 + 5);

          c = n2 > 0.58 ? C.fo2 : n2 > 0.5 ? C.fo : n2 > 0.43 ? C.gr2 : C.gr;

          if (n2 > 0.5 && hs(x, y) > 0.84) f *= 0.7;

          if (n2 > 0.5 && hs(x + 3, y) > 0.96) f *= 1.3;

        } else if (v < 0.70) {

          c = hs(x, y) > 0.6 ? C.mo2 : C.mo;

        } else if (v < 0.80) {

          c = hs(x, y) > 0.3 ? C.mo2 : C.mo;

        } else {

          c = C.sn;

        }

        sp(x, y, c, f);

      }

    }

    // Draw gold quest path between locations

    for (i = 0; i < Q.length - 1; i++) {

      const p0 = [Q[i].x * 2.2, Q[i].y * 1];

      const p1 = [Q[i + 1].x * 2.2, Q[i + 1].y * 1];

      const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);

      const sg = i % 2 ? 1 : -1;

      const cx0 = (p0[0] + p1[0]) / 2 - (p1[1] - p0[1]) * 0.18 * sg;

      const cy0 = (p0[1] + p1[1]) / 2 + (p1[0] - p0[0]) * 0.18 * sg;

      let k = 0, lx = -1, ly = -1;

      for (let t = 0; t <= 1; t += 1 / (L * 2)) {

        const qx = Math.round((1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * cx0 + t * t * p1[0]);

        const qy = Math.round((1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * cy0 + t * t * p1[1]);

        if (qx === lx && qy === ly) continue;

        lx = qx; ly = qy;

        if (k++ % 6 < 3) sp(qx, qy, C.gold);

      }

    }

    // Draw stone plazas around quest pins

    for (i = 0; i < Q.length; i++) {

      const px = Math.round(Q[i].x * 2.2);

      const py = Math.round(Q[i].y * 1);

      for (y = -3; y <= 3; y++) {

        for (x = -3; x <= 3; x++) {

          const dd = x * x + y * y;

          if (dd <= 9) sp(px + x, py + y, dd > 6 ? C.sand : C.plaza);

        }

      }

    }

    cx.putImageData(id, 0, 0);

    /* ---- pin gem (pixel art icon) ---- */

    const gc = document.createElement('canvas');

    gc.width = gc.height = 13;

    const g = gc.getContext('2d');

    for (y = 0; y < 13; y++) {

      for (x = 0; x < 13; x++) {

        const q = Math.abs(x - 6) + Math.abs(y - 6);

        if (q > 6) continue;

        g.fillStyle = q === 6 ? '#f5b73b' : q === 5 ? '#b9771c' : (x + y > 12 ? '#0d4f9a' : '#2f9fe0');

        g.fillRect(x, y, 1, 1);

      }

    }

    g.fillStyle = '#fff';

    g.fillRect(5, 3, 1, 1);

    g.fillRect(4, 4, 1, 1);

    const G = gc.toDataURL();

    const pins = [];

    let cur = -1, tk = 0;

    /* ---- create interactive pins ---- */

    Q.forEach(function(q, idx) {

      const b = document.createElement('button');

      b.className = 'qpin';

      const px = Math.round(q.x * 2.2);

      const py = Math.round(q.y * 1);

      b.style.left = ((px + 0.5) / W * 100) + '%';

      b.style.top = ((py + 0.5) / H * 100) + '%';

      b.setAttribute('aria-label', q.n);

      b.innerHTML = '<img alt="" src="' + G + '"><span>' + q.s + '</span>';

      b.onclick = function(e) {

        e.stopPropagation();

        if (typeof playSound === 'function') playSound('blip');

        openQuest(idx);

      };

      qw.appendChild(b);

      pins.push(b);

    });

    function zoom(idx) {

      const q = Q[idx];

      const isSmallPhone = window.matchMedia('(max-width:540px)').matches;

      const z = isSmallPhone ? 2.1 : 2.4;

      const Wv = qv.clientWidth;

      const Hv = qv.clientHeight;

      const px = ((Math.round(q.x * 2.2) + 0.5) / W) * Wv;

      const py = ((Math.round(q.y * 1) + 0.5) / H) * Hv;

      let tx = (isSmallPhone ? 0.35 : 0.28) * Wv - z * px;

      let ty = 0.52 * Hv - z * py;

      tx = Math.max(Wv - z * Wv, Math.min(0, tx));

      ty = Math.max(Hv - z * Hv, Math.min(0, ty));

      qw.style.setProperty('--z', z);

      qw.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + z + ')';

    }

    let activeImgIdx = 0;

    function fillCard(idx) {

      const q = Q[idx];

      const images = (q.imgs && q.imgs.length > 0) ? q.imgs : (q.img ? [q.img] : []);

      activeImgIdx = 0;

      const hasMulti = images.length > 1;

      const curImg = images[0] || '';

      const mo = q.s.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();

      const ph = curImg 

        ? '<img id="qphImg" src="' + curImg + '" alt="' + q.n + '">' 

        : '<span>' + mo + '</span><em>FOTO PROYEK</em>';

      const galleryControls = hasMulti 

        ? '<button type="button" class="qph-btn qph-prev" id="qphPrev" aria-label="Foto Sebelumnya">&#9664;</button>' +

          '<button type="button" class="qph-btn qph-next" id="qphNext" aria-label="Foto Berikutnya">&#9654;</button>' +

          '<div class="qph-badge" id="qphBadge">1 / ' + images.length + '</div>'

        : '';

      qp.innerHTML = FR +

        '<div class="qi">' +

          '<div class="qph' + (hasMulti ? ' has-gallery' : '') + '" id="qphBox">' + 

            ph + 

            galleryControls + 

          '</div>' +

          '<h3>' + q.n + '</h3>' +

          '<p>' + q.d + '</p>' +

          '<div class="qs"><b>SENJATA</b><div class="tg">' + q.t.map(function(t) { return '<i>' + t + '</i>'; }).join('') + '</div></div>' +

          '<div class="qb">' +

            '<a href="' + (q.code || '#') + '" target="_blank" rel="noopener noreferrer">Source Code</a>' +

            '<button type="button" id="qx">◀ Peta</button>' +

            '<button type="button" id="qn">Next ▶</button>' +

          '</div>' +

        '</div>';

      currentModalImages = images;

      function updatePhoto(step) {

        if (!hasMulti) return;

        activeImgIdx = (activeImgIdx + step + images.length) % images.length;

        const imgEl = $('qphImg');

        const badgeEl = $('qphBadge');

        if (imgEl) {

          imgEl.style.opacity = '0.3';

          setTimeout(function() {

            imgEl.src = images[activeImgIdx];

            imgEl.style.opacity = '1';

          }, 120);

        }

        if (badgeEl) {

          badgeEl.textContent = (activeImgIdx + 1) + ' / ' + images.length;

        }

        if (modalProjectImg && projectPhotoModal && projectPhotoModal.classList.contains('active')) {

          modalProjectImg.style.opacity = '0.3';

          setTimeout(function() {

            modalProjectImg.src = images[activeImgIdx];

            modalProjectImg.style.opacity = '1';

          }, 120);

        }

        if (modalProjectBadge) {

          modalProjectBadge.textContent = (activeImgIdx + 1) + ' / ' + images.length;

        }

        if (typeof playSound === 'function') playSound('click');

      }

      function openProjectPhotoModal() {

        if (!projectPhotoModal || !images.length) return;

        const curSrc = images[activeImgIdx] || images[0];

        if (modalProjectImg) {

          modalProjectImg.src = curSrc;

          modalProjectImg.alt = q.n || 'Foto Proyek';

        }

        if (modalProjectBadge) {

          modalProjectBadge.textContent = (activeImgIdx + 1) + ' / ' + images.length;

          modalProjectBadge.style.display = images.length > 1 ? 'block' : 'none';

        }

        if (modalProjectPrev) modalProjectPrev.style.display = images.length > 1 ? 'flex' : 'none';

        if (modalProjectNext) modalProjectNext.style.display = images.length > 1 ? 'flex' : 'none';

        projectPhotoModal.classList.add('active');

        projectPhotoModal.setAttribute('aria-hidden', 'false');

        if (typeof lockBodyScroll === 'function') lockBodyScroll();

        if (typeof playSound === 'function') playSound('powerup');

      }

      const qphBox = $('qphBox');

      const btnPrevImg = $('qphPrev');

      const btnNextImg = $('qphNext');

      if (btnPrevImg) {

        btnPrevImg.onclick = function(e) {

          e.stopPropagation();

          updatePhoto(-1);

        };

      }

      if (btnNextImg) {

        btnNextImg.onclick = function(e) {

          e.stopPropagation();

          updatePhoto(1);

        };

      }

      if (qphBox) {

        qphBox.onclick = function(e) {

          if (e.target === btnPrevImg || e.target === btnNextImg) return;

          openProjectPhotoModal();

        };

      }

      // Link current project's photo changer to modal

      currentUpdatePhotoFn = updatePhoto;

      const btnClose = $('qx');

      const btnNext = $('qn');

      if (btnClose) {

        btnClose.onclick = function(e) {

          e.stopPropagation();

          if (typeof playSound === 'function') playSound('blip');

          closeQuest();

        };

      }

      if (btnNext) {

        btnNext.onclick = function(e) {

          e.stopPropagation();

          if (typeof playSound === 'function') playSound('powerup');

          openQuest((idx + 1) % Q.length);

        };

      }

    }

    function openQuest(idx) {

      const was = cur >= 0;

      cur = idx;

      tk++;

      const my = tk;

      zoom(idx);

      qw.classList.add('zoomed');

      if (hint) hint.classList.add('h');

      pins.forEach(function(p, k) {

        p.classList.toggle('on', k === idx);

      });

      qp.classList.remove('open');

      setTimeout(function() {

        if (my !== tk) return;

        fillCard(idx);

        qp.classList.add('open');

      }, was ? 380 : 600);

    }

    function closeQuest() {

      if (cur < 0) return;

      cur = -1;

      tk++;

      qp.classList.remove('open');

      qw.style.setProperty('--z', 1);

      qw.style.transform = 'none';

      qw.classList.remove('zoomed');

      if (hint) hint.classList.remove('h');

      pins.forEach(function(p) {

        p.classList.remove('on');

      });

    }

    const qm = document.querySelector('.qm');

    const btnFullscreen = $('qfb');

    let isFull = false;

    function setFull(on) {

      isFull = on;

      if (qm) qm.classList.toggle('full', on);

      document.body.style.overflow = on ? 'hidden' : '';

      if (btnFullscreen) btnFullscreen.textContent = on ? '✕ Keluar' : 'Layar Penuh';

      if (on) {

        const r = qm && qm.requestFullscreen && qm.requestFullscreen();

        if (r && r.catch) r.catch(function() {});

      } else if (document.fullscreenElement) {

        document.exitFullscreen().catch(function() {});

      }

      setTimeout(function() {

        if (cur >= 0) zoom(cur);

      }, 80);

    }

    if (btnFullscreen) {

      btnFullscreen.onclick = function(e) {

        e.stopPropagation();

        if (typeof playSound === 'function') playSound('blip');

        setFull(!isFull);

      };

    }

    document.addEventListener('fullscreenchange', function() {

      if (!document.fullscreenElement && isFull) setFull(false);

    });

    if (qv) {

      qv.addEventListener('click', function(e) {

        if (e.target === qv || e.target === cv || e.target === qw) {

          closeQuest();

        }

      });

    }

    document.addEventListener('keydown', function(e) {

      if (e.key === 'Escape') {

        if (cur >= 0) closeQuest();

        else if (isFull) setFull(false);

      }

    });

    window.addEventListener('resize', function() {

      if (cur >= 0) zoom(cur);

    });

  })();

  // -------------------------------------------------------------------------

  // 8. Animated Paper Scroll Controller (Buka & Tutup Gulungan Kertas)

  // -------------------------------------------------------------------------

  const paper = document.getElementById('paper');

  const btn = document.getElementById('btn');

  const parchmentCloseCornerBtn = document.getElementById('parchmentCloseCornerBtn');

  const contactSection = document.getElementById('contact');

  // Awal-awal gulungan tertutup rapat

  if (btn) btn.textContent = 'Buka Gulungan';

  let updateAllScalers = null;

  function togglePaperScroll(forceState, isAuto = false) {

    if (!paper) return;

    const willOpen = (typeof forceState === 'boolean') 

      ? forceState 

      : !paper.classList.contains('open');

    if (willOpen) {

      paper.classList.add('open');

      playSound('unroll');

      if (btn) btn.textContent = 'Tutup Gulungan';

    } else {

      paper.classList.remove('open');

      playSound('roll');

      if (btn) btn.textContent = 'Buka Gulungan';

    }

    if (typeof updateAllScalers === 'function') {

      updateAllScalers();

      setTimeout(updateAllScalers, 100);

      setTimeout(updateAllScalers, 500);

      setTimeout(updateAllScalers, 1350);

    }

  }

  // Buka otomatis saat discroll ke bagian contact me

  let hasAutoOpenedScroll = false;

  function checkAutoOpenPaper() {

    if (hasAutoOpenedScroll || !paper || !contactSection) return;

    const rect = contactSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {

      hasAutoOpenedScroll = true;

      setTimeout(() => togglePaperScroll(true, true), 250);

    }

  }

  if ('IntersectionObserver' in window && contactSection) {

    const scrollObserver = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting && !hasAutoOpenedScroll) {

          hasAutoOpenedScroll = true;

          setTimeout(() => togglePaperScroll(true, true), 250);

        }

      });

    }, {

      threshold: 0.2

    });

    scrollObserver.observe(contactSection);

  } else {

    window.addEventListener('scroll', checkAutoOpenPaper, { passive: true });

  }

  if (btn) {

    btn.addEventListener('click', () => togglePaperScroll());

  }

  if (parchmentCloseCornerBtn) {

    parchmentCloseCornerBtn.addEventListener('click', () => togglePaperScroll(false));

  }

  // Click on the rollers themselves to toggle open when closed

  document.querySelectorAll('.roller').forEach(roller => {

    roller.addEventListener('click', () => {

      if (paper && !paper.classList.contains('open')) {

        togglePaperScroll(true);

      }

    });

  });

  // Contact Form Submission (Inside Parchment Sheet)

  if (contactForm) {

    contactForm.addEventListener('submit', async (e) => {

      e.preventDefault();

      const nameVal = document.getElementById('senderName').value;

      const emailVal = document.getElementById('senderEmail') ? document.getElementById('senderEmail').value : '';

      const subjectVal = document.getElementById('senderSubject') ? document.getElementById('senderSubject').value : 'Pesan dari Portofolio';

      const msgVal = document.getElementById('senderMessage') ? document.getElementById('senderMessage').value : '';

      

      // Play celebratory retro RPG sound

      playSound('victory');

            const submitBtn = document.getElementById('submitBtn');

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.innerHTML = '<span class="btn-sword">🕊️</span> <span class="btn-label">Mengirim Pesan...</span>';

      }

      try {

        const response = await fetch('https://formsubmit.co/ajax/refkyfm2012@gmail.com', {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json',

            'Accept': 'application/json'

          },

          body: JSON.stringify({

            name: nameVal,

            email: emailVal,

            _subject: `⚔️ [Portofolio] ${subjectVal} - dari ${nameVal}`,

            message: msgVal,

            _template: 'table'

          })

        });

        if (response.ok) {

          playSound('victory');

          showToast(`📜 Burung merpati telah membawa pesan ${nameVal} langsung ke email Refky! 🕊️✨`);

          contactForm.reset();

        } else {

          throw new Error('Gagal mengirim');

        }

      } catch (err) {

        console.warn('FormSubmit AJAX fallback/error:', err);

        const mailtoSubject = encodeURIComponent(`[Portofolio] ${subjectVal}`);

        const mailtoBody = encodeURIComponent(`Nama: ${nameVal}\nEmail: ${emailVal}\n\nPesan:\n${msgVal}`);

        window.location.href = `mailto:refkyfm2012@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      } finally {

        if (submitBtn) {

          submitBtn.disabled = false;

          submitBtn.innerHTML = originalBtnHtml;

        }

      }

    });

  }

  // -------------------------------------------------------------------------

  

  // Guild Rules Checkbox & Submit Button Helper (Defined early to prevent TDZ ReferenceError)

  // updateGuildSubmitButtonState defined at top of section 9

// 9. Adventurer's Guild Quest Board Logic (6 Cards Per Page with Pagination)

  // -------------------------------------------------------------------------

  const guildSliderViewport = document.getElementById('guildSliderViewport');

  const guildSliderTrack = document.getElementById('guildSliderTrack');

  const guildPrevBtn = document.getElementById('guildPrevBtn');

  const guildNextBtn = document.getElementById('guildNextBtn');

  const openCommentModalBtn = document.getElementById('openCommentModalBtn');

  const closeGuildModalBtn = document.getElementById('closeGuildModalBtn');

  const guildModalOverlay = document.getElementById('guildModalOverlay');

  const guildMessageForm = document.getElementById('guildMessageForm');

  const guildMessageInput = document.getElementById('guildMessageInput');

  const guildAuthorInput = document.getElementById('guildAuthorInput');

  const guildAnonCheckbox = document.getElementById('guildAnonCheckbox');

  const guildAuthorFieldWrap = document.getElementById('guildAuthorFieldWrap');

  // Guild Rules Decree Modal Elements

  const guildRulesBtn = document.getElementById('guildRulesBtn');

  guildRulesAgreeCheckbox = document.getElementById('guildRulesAgreeCheckbox');
  guildSubmitBtn = document.getElementById('guildSubmitBtn') || document.querySelector('.guild-pin-submit-btn');

  function updateGuildSubmitButtonState() {
    if (!guildSubmitBtn) return;
    const isChecked = Boolean(guildRulesAgreeCheckbox && guildRulesAgreeCheckbox.checked);
    guildSubmitBtn.disabled = !isChecked;
  }

  if (guildRulesAgreeCheckbox) {
    guildRulesAgreeCheckbox.addEventListener('change', () => {
      updateGuildSubmitButtonState();
      playSound('click');
    });
  }

  const closeGuildRulesModalBtn = document.getElementById('closeGuildRulesModalBtn');

  const guildRulesModalOverlay = document.getElementById('guildRulesModalOverlay');

  const understandRulesBtn = document.getElementById('understandRulesBtn');

  // Limit to 6 cards per view

  const MESSAGES_PER_PAGE = 6;

  let currentPage = 0;

  // =========================================================================

  // CLOUD DATABASE CONFIGURATION FOR ONLINE COMMENTS (HOSTING)

  // Masukkan URL & Anon Key Supabase kamu agar komentar tersimpan online

  // dan bisa dilihat oleh semua pengunjung saat website kamu di-hosting!

  // =========================================================================

  const GUILD_CLOUD_CONFIG = {

    // Isi URL dan Anon Key dari dashboard Supabase milikmu:

    supabaseUrl: 'https://zkzpvxvjpahpydztcaki.supabase.co',      // Contoh: 'https://xxxx.supabase.co'

    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprenB2eHZqcGFocHlkenRjYWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMjYzMjMsImV4cCI6MjEwODgwMjMyM30.sWpH9yEDPt41G8pGVWsxR2Z0n6KU_j6UezdaTVPVjz0',  // Contoh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

    tableName: 'guild_comments'

  };

  // Real-time Relative Time Formatter (100% Real-Time & Live)

  function formatRelativeTime(timestamp) {

    if (!timestamp) return 'Baru saja';

    let ts = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();

    if (isNaN(ts) || ts <= 0) return 'Baru saja';

    const now = Date.now();

    const diffSec = Math.floor(Math.max(0, now - ts) / 1000);

    if (diffSec < 45) return 'Baru saja';

    if (diffSec < 90) return '1 menit lalu';

    const diffMin = Math.floor(diffSec / 60);

    if (diffMin < 60) return diffMin + ' menit lalu';

    const diffHour = Math.floor(diffMin / 60);

    if (diffHour < 24) return diffHour + ' jam lalu';

    const diffDay = Math.floor(diffHour / 24);

    if (diffDay < 7) return diffDay + ' hari lalu';

    const diffWeek = Math.floor(diffDay / 7);

    if (diffWeek < 4) return diffWeek + ' minggu lalu';

    const diffMonth = Math.floor(diffDay / 30);

    if (diffMonth < 12) return diffMonth + ' bulan lalu';

    const diffYear = Math.floor(diffDay / 365);

    return diffYear + ' tahun lalu';

  }

  // Default authentic quest notices (Dengan createdAt dinamis real-time)

  const nowAnchor = Date.now();

  const defaultQuests = [

    {

      id: 1,

      author: 'Andi',

      createdAt: nowAnchor - (1 * 24 + 3) * 3600 * 1000,

      text: 'Buset, keren banget',

      baseLikes: 18,

      avatarType: 'rafzz',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '-0.6deg'

    },

    {

      id: 2,

      author: 'Bima',

      createdAt: nowAnchor - (2 * 24 + 5) * 3600 * 1000,

      text: 'Deym, keren banget jir, info source code',

      baseLikes: 24,

      avatarType: 'guest',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '0.7deg'

    },

    {

      id: 3,

      author: 'adit',

      createdAt: nowAnchor - (2 * 24 + 14) * 3600 * 1000,

      text: 'Tutorial desainnya bang',

      baseLikes: 15,

      avatarType: 'jmnz',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '-0.5deg'

    },

    {

      id: 4,

      author: 'Meisa',

      createdAt: nowAnchor - (3 * 24 + 8) * 3600 * 1000,

      text: 'Portofolio paling estetik yang pernah aku liat',

      baseLikes: 32,

      avatarType: 'l1mx',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '0.6deg'

    },

    {

      id: 5,

      author: 'mei',

      createdAt: nowAnchor - (4 * 24 + 2) * 3600 * 1000,

      text: 'Desainnya bagus, lagu nya ngademin apalagi dark mode nya',

      baseLikes: 29,

      avatarType: 'rafzz2',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '-0.4deg'

    },

    {

      id: 6,

      author: 'Guest',

      createdAt: nowAnchor - (4 * 24 + 18) * 3600 * 1000,

      text: 'Wow, deym',

      baseLikes: 11,

      avatarType: 'guest',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '0.5deg'

    },

    {

      id: 7,

      author: 'rei',

      createdAt: nowAnchor - 5 * 24 * 3600 * 1000,

      text: 'Anjay bisa desain juga yah',

      baseLikes: 19,

      avatarType: 'rafzz',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '-0.7deg'

    },

    {

      id: 8,

      author: 'Guest',

      createdAt: nowAnchor - 6 * 24 * 3600 * 1000,

      text: 'ini yang katanya pemula teh?',

      baseLikes: 22,

      avatarType: 'guest',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '0.8deg'

    },

    {

      id: 9,

      author: 'intan',

      createdAt: nowAnchor - (7 * 24 + 12) * 3600 * 1000,

      text: 'makin jago aja nih, ditunggu project berikutnya 🔥',

      baseLikes: 35,

      avatarType: 'l1mx',

      hasRibbon: true,

      sealType: 'wax',

      tilt: '-0.5deg'

    }

  ];

  // Pixel Avatars Generator for authentic RPG character portraits

  function getCharacterAvatarSvg(type) {

    if (type === 'jmnz') {

      return `

        <svg viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">

          <circle cx="18" cy="18" r="17" fill="#EAD8B1" stroke="#2B180C" stroke-width="1.5"/>

          <path d="M9 8h18v5h2v6h-3v-3h-2v-2h-10v2h-2v3H7v-6h2V8z" fill="#EAECEE"/>

          <path d="M11 7h14v2H11z" fill="#FFFFFF"/>

          <rect x="12" y="13" width="12" height="9" fill="#FADCB9"/>

          <rect x="14" y="16" width="2" height="2" fill="#1F2A44"/>

          <rect x="20" y="16" width="2" height="2" fill="#1F2A44"/>

          <rect x="14" y="16" width="1" height="1" fill="#FFFFFF"/>

          <rect x="20" y="16" width="1" height="1" fill="#FFFFFF"/>

          <rect x="17" y="20" width="3" height="1" fill="#8C4336"/>

          <rect x="10" y="22" width="16" height="7" fill="#20407A"/>

          <rect x="16" y="22" width="4" height="4" fill="#FFFFFF"/>

        </svg>

      `;

    } else if (type === 'guest') {

      return `

        <svg viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">

          <circle cx="18" cy="18" r="17" fill="#EAD8B1" stroke="#2B180C" stroke-width="1.5"/>

          <path d="M9 8h18v6h3v8h-3v-4h-2v-3h-12v3h-2v4H6v-8h3V8z" fill="#6E4226"/>

          <path d="M12 7h12v2H12z" fill="#8D5B38"/>

          <rect x="12" y="14" width="12" height="9" fill="#FCE5CD"/>

          <rect x="14" y="17" width="2" height="2" fill="#2C1B10"/>

          <rect x="20" y="17" width="2" height="2" fill="#2C1B10"/>

          <rect x="13" y="19" width="2" height="1" fill="#E5988F"/>

          <rect x="21" y="19" width="2" height="1" fill="#E5988F"/>

          <rect x="17" y="21" width="2" height="1" fill="#A84332"/>

          <rect x="11" y="23" width="14" height="6" fill="#8C5832"/>

        </svg>

      `;

    } else if (type === 'rafzz2') {

      return `

        <svg viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">

          <circle cx="18" cy="18" r="17" fill="#EAD8B1" stroke="#2B180C" stroke-width="1.5"/>

          <path d="M9 8h18v6h3v5h-4v-2h-16v2H6v-5h3V8z" fill="#1A2D4C"/>

          <rect x="11" y="7" width="14" height="3" fill="#2B4673"/>

          <rect x="10" y="13" width="16" height="2" fill="#D4AF37"/>

          <rect x="12" y="15" width="12" height="8" fill="#FADCB9"/>

          <rect x="14" y="17" width="2" height="2" fill="#0C1422"/>

          <rect x="20" y="17" width="2" height="2" fill="#0C1422"/>

          <rect x="17" y="21" width="3" height="1" fill="#7A392D"/>

          <rect x="11" y="23" width="14" height="6" fill="#152640"/>

        </svg>

      `;

    } else if (type === 'l1mx') {

      return `

        <svg viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">

          <circle cx="18" cy="18" r="17" fill="#EAD8B1" stroke="#2B180C" stroke-width="1.5"/>

          <path d="M9 8h18v6h2v6h-3v-4h-2v-2h-10v2h-2v4H7v-6h2V8z" fill="#206368"/>

          <path d="M12 7h12v3H12z" fill="#2E878E"/>

          <rect x="12" y="14" width="12" height="9" fill="#FADCB9"/>

          <rect x="14" y="17" width="2" height="2" fill="#132B2E"/>

          <rect x="20" y="17" width="2" height="2" fill="#132B2E"/>

          <rect x="14" y="17" width="1" height="1" fill="#FFFFFF"/>

          <rect x="20" y="17" width="1" height="1" fill="#FFFFFF"/>

          <rect x="17" y="21" width="3" height="1" fill="#8C3E33"/>

          <rect x="11" y="23" width="14" height="6" fill="#16393C"/>

        </svg>

      `;

    } else {

      // Default / Rafzz (navy blue anime hair)

      return `

        <svg viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">

          <circle cx="18" cy="18" r="17" fill="#EAD8B1" stroke="#2B180C" stroke-width="1.5"/>

          <path d="M10 9h16v4h2v7h-2v-3h-2v-2h-10v2h-2v3H9v-7h1V9z" fill="#1C355E"/>

          <rect x="13" y="10" width="10" height="2" fill="#2E5592"/>

          <rect x="12" y="14" width="12" height="9" fill="#FADCB9"/>

          <rect x="14" y="17" width="2" height="2" fill="#0F172A"/>

          <rect x="20" y="17" width="2" height="2" fill="#0F172A"/>

          <rect x="14" y="17" width="1" height="1" fill="#FFFFFF"/>

          <rect x="20" y="17" width="1" height="1" fill="#FFFFFF"/>

          <rect x="17" y="21" width="3" height="1" fill="#8C4336"/>

          <rect x="11" y="23" width="14" height="6" fill="#162947"/>

          <rect x="16" y="23" width="4" height="3" fill="#D4AF37"/>

        </svg>

      `;

    }

  }

  // Convert numbers to Roman Numerals (e.g., 1 -> I, 2 -> II, 3 -> III)

  function toRoman(num) {

    const romanNumerals = [

      { value: 10, numeral: 'X' },

      { value: 9, numeral: 'IX' },

      { value: 5, numeral: 'V' },

      { value: 4, numeral: 'IV' },

      { value: 1, numeral: 'I' }

    ];

    let result = '';

    for (const { value, numeral } of romanNumerals) {

      while (num >= value) {

        result += numeral;

        num -= value;

      }

    }

    return result || 'I';

  }

  // Retrieve saved custom user comments with bulletproof persistence

  let userQuests = [];

  try {

    const savedCustom = localStorage.getItem('rfm_user_guild_comments');

    if (savedCustom) {

      const parsed = JSON.parse(savedCustom);

      if (Array.isArray(parsed)) {

        userQuests = parsed.map(q => ({

          ...q,

          createdAt: q.createdAt || (typeof q.id === 'number' && q.id > 1000000000 ? q.id : (Date.now() - 3600000)),

          baseLikes: q.baseLikes !== undefined ? q.baseLikes : (q.likes || 0)

        }));

      }

    }

    // Also check legacy keys if empty

    if (!userQuests.length) {

      const legacySaved = localStorage.getItem('rfm_guild_quests_v3') || localStorage.getItem('rfm_guild_quests_v2');

      if (legacySaved) {

        const parsed = JSON.parse(legacySaved);

        if (Array.isArray(parsed)) {

          const customOnly = parsed.filter(item => item && item.id > 1000000000).map(q => ({

            ...q,

            createdAt: q.createdAt || q.id,

            baseLikes: q.baseLikes !== undefined ? q.baseLikes : (q.likes || 0)

          }));

          if (customOnly.length > 0) {

            userQuests = customOnly;

            localStorage.setItem('rfm_user_guild_comments', JSON.stringify(userQuests));

          }

        }

      }

    }

  } catch (e) {

    userQuests = [];

  }

  // Load liked items set

  let likedQuestIds = new Set();

  try {

    const savedLikes = localStorage.getItem('rfm_guild_liked_ids_v1');

    if (savedLikes) {

      likedQuestIds = new Set(JSON.parse(savedLikes));

    }

  } catch (e) {}

  // Load deleted items set (for Secret Guildmaster Admin Delete)

  let deletedQuestIds = new Set();

  try {

    const savedDeleted = localStorage.getItem('rfm_deleted_quest_ids');

    if (savedDeleted) {

      deletedQuestIds = new Set(JSON.parse(savedDeleted));

    }

  } catch (e) {}

  function getCompleteQuestsList() {

    // Sort custom user comments by createdAt descending (newest first)

    const sortedUserQuests = [...userQuests].sort((a, b) => {

      const ta = a.createdAt || a.id || 0;

      const tb = b.createdAt || b.id || 0;

      return tb - ta;

    });

    return [...sortedUserQuests, ...defaultQuests]

      .filter(quest => !deletedQuestIds.has(String(quest.id)))

      .map(quest => {

      const isLiked = likedQuestIds.has(quest.id);

      const base = quest.baseLikes !== undefined ? quest.baseLikes : (quest.likes || 0);

      return {

        ...quest,

        baseLikes: base,

        isLiked: isLiked,

        likes: base + (isLiked ? 1 : 0)

      };

    });

  }

  let questsList = getCompleteQuestsList();

  function escapeHTML(str) {

    return String(str || '')

      .replace(/&/g, '&amp;')

      .replace(/</g, '&lt;')

      .replace(/>/g, '&gt;')

      .replace(/"/g, '&quot;');

  }

  // Build single quest card DOM element

  function createQuestCardElement(quest) {

    const card = document.createElement('div');

    card.className = 'quest-parchment-card';

    card.setAttribute('data-id', quest.id);

    if (quest.tilt) {

      card.style.setProperty('--card-tilt', quest.tilt);

    }

    // Top-right royal crown banner ribbon

    const ribbonHtml = `<div class="quest-banner-ribbon ribbon-blue"><span class="ribbon-crown">👑</span></div>`;

    // Bottom-right red wax seal with gold fleur-de-lis

    const sealHtml = `<div class="quest-wax-seal" title="Royal Wax Seal">⚜️</div>`;

    // Avatar

    const avatarSvg = getCharacterAvatarSvg(quest.avatarType || 'rafzz');

    // Dynamic Real-Time Time

    const displayTime = quest.createdAt ? formatRelativeTime(quest.createdAt) : (quest.time || 'Baru saja');

    card.innerHTML = `

      <div class="quest-pin pin-left"></div>

      <div class="quest-pin pin-right"></div>

      ${ribbonHtml}

      <button type="button" class="quest-delete-btn" data-id="${quest.id}" title="Hapus Komentar (Guildmaster)">

        <span class="delete-icon">✕</span> Hapus

      </button>

      <div class="quest-card-header">

        <div class="quest-author-avatar">${avatarSvg}</div>

        <div class="quest-author-meta">

          <span class="quest-author-name">${escapeHTML(quest.author)}</span>

          <span class="quest-time" data-created="${quest.createdAt || ''}">${escapeHTML(displayTime)}</span>

        </div>

      </div>

      <div class="quest-message-text">${escapeHTML(quest.text)}</div>

      <div class="quest-card-divider">

        <span class="quest-divider-line"></span>

        <span class="quest-divider-gem">✦</span>

        <span class="quest-divider-line"></span>

      </div>

      <div class="quest-card-footer">

        <button type="button" class="quest-like-btn ${quest.isLiked ? 'liked' : ''}" data-id="${quest.id}" aria-label="Like Quest Notice">

          <svg class="heart-icon" viewBox="0 0 24 24" width="16" height="16">

            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>

          </svg>

          <span class="like-count">${quest.likes}</span>

        </button>

        ${sealHtml}

      </div>

    `;

    // Like button click handler

    const likeBtn = card.querySelector('.quest-like-btn');

    likeBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleQuestLike(quest.id, likeBtn);

    });

    

    // Delete button click handler (Guildmaster Mode)

    const deleteBtn = card.querySelector('.quest-delete-btn');

    if (deleteBtn) {

      deleteBtn.addEventListener('click', (e) => {

        e.stopPropagation();

        const shortText = quest.text.length > 50 ? quest.text.substring(0, 50) + '...' : quest.text;

        if (confirm(`⚔️ GUILDMASTER ACTION ⚔️\n\nHapus pesan petualang ini secara permanen?\n\nPengirim: ${quest.author}\nPesan: "${shortText}"`)) {

          deleteQuestComment(quest.id);

        }

      });

    }

    return card;

  }

  // Render all Pages (Each page limited to 6 quest cards in a 3x2 grid)

  function renderQuestPages() {

    if (!guildSliderTrack) return;

    guildSliderTrack.innerHTML = '';

    const totalPages = Math.max(1, Math.ceil(questsList.length / MESSAGES_PER_PAGE));

    // Clamp currentPage

    if (currentPage >= totalPages) {

      currentPage = totalPages - 1;

    }

    if (currentPage < 0) {

      currentPage = 0;

    }

    // Render each page grid

    for (let p = 0; p < totalPages; p++) {

      const pageGrid = document.createElement('div');

      pageGrid.className = 'guild-page-grid';

      const startIdx = p * MESSAGES_PER_PAGE;

      const endIdx = startIdx + MESSAGES_PER_PAGE;

      const pageQuests = questsList.slice(startIdx, endIdx);

      // Append up to 6 quest cards

      pageQuests.forEach(quest => {

        pageGrid.appendChild(createQuestCardElement(quest));

      });

      guildSliderTrack.appendChild(pageGrid);

    }

    updateSliderUI();

  }

  // Update slider position & side arrows state

  function updateSliderUI() {

    const totalPages = Math.max(1, Math.ceil(questsList.length / MESSAGES_PER_PAGE));

    // Translate track horizontally

    if (guildSliderTrack) {

      guildSliderTrack.style.transform = `translateX(-${currentPage * 100}%)`;

    }

    // Side arrows visibility & disabled state

    if (guildPrevBtn) {

      guildPrevBtn.disabled = currentPage === 0;

      guildPrevBtn.style.display = totalPages > 1 ? 'flex' : 'none';

    }

    if (guildNextBtn) {

      guildNextBtn.disabled = currentPage === totalPages - 1;

      guildNextBtn.style.display = totalPages > 1 ? 'flex' : 'none';

    }

  }

  // Navigate to specific page with sound

  function goToPage(targetPage) {

    const totalPages = Math.max(1, Math.ceil(questsList.length / MESSAGES_PER_PAGE));

    if (targetPage < 0 || targetPage >= totalPages || targetPage === currentPage) return;

    currentPage = targetPage;

    updateSliderUI();

    playSound('click');

  }

  // Hook navigation side arrows

  if (guildPrevBtn) {

    guildPrevBtn.addEventListener('click', () => goToPage(currentPage - 1));

  }

  if (guildNextBtn) {

    guildNextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  }

  // Mobile Swipe Gesture Handling on Quest Board

  if (guildSliderViewport) {

    let touchStartX = 0;

    let touchEndX = 0;

    guildSliderViewport.addEventListener('touchstart', (e) => {

      touchStartX = e.changedTouches[0].screenX;

    }, { passive: true });

    guildSliderViewport.addEventListener('touchend', (e) => {

      touchEndX = e.changedTouches[0].screenX;

      const diff = touchStartX - touchEndX;

      const totalPages = Math.max(1, Math.ceil(questsList.length / MESSAGES_PER_PAGE));

      if (Math.abs(diff) > 45) {

        if (diff > 0 && currentPage < totalPages - 1) {

          goToPage(currentPage + 1);

        } else if (diff < 0 && currentPage > 0) {

          goToPage(currentPage - 1);

        }

      }

    }, { passive: true });

  }

  // Toggle Like on Quest Note

  function toggleQuestLike(id, btn) {

    const isCurrentlyLiked = likedQuestIds.has(id);

    if (isCurrentlyLiked) {

      likedQuestIds.delete(id);

    } else {

      likedQuestIds.add(id);

      playSound('heartbeat');

    }

    try {

      localStorage.setItem('rfm_guild_liked_ids_v1', JSON.stringify([...likedQuestIds]));

    } catch (e) {}

    questsList = getCompleteQuestsList();

    const countSpan = btn.querySelector('.like-count');

    const targetQuest = questsList.find(q => q.id === id);

    if (btn) {

      btn.classList.toggle('liked', !isCurrentlyLiked);

      if (countSpan && targetQuest) {

        countSpan.textContent = targetQuest.likes;

      }

    }

  }

  

  // Delete Quest Comment (Guildmaster Admin Action)

  async function deleteQuestComment(questId) {

    const qIdStr = String(questId);

    deletedQuestIds.add(qIdStr);

    try {

      localStorage.setItem('rfm_deleted_quest_ids', JSON.stringify([...deletedQuestIds]));

    } catch (e) {}

    userQuests = userQuests.filter(q => String(q.id) !== qIdStr);

    try {

      localStorage.setItem('rfm_user_guild_comments', JSON.stringify(userQuests));

    } catch (e) {}

    // Hapus dari database cloud Supabase

    deleteCloudComment(questId);

    questsList = getCompleteQuestsList();

    const totalPages = Math.max(1, Math.ceil(questsList.length / MESSAGES_PER_PAGE));

    if (currentPage >= totalPages) {

      currentPage = Math.max(0, totalPages - 1);

    }

    renderQuestPages();

    showToast('🗑️ Pesan petualang berhasil dihapus dari Papan Guild!');

    playSound('click');

  }

  async function deleteCloudComment(commentId) {

    if (!GUILD_CLOUD_CONFIG.supabaseUrl || !GUILD_CLOUD_CONFIG.supabaseAnonKey) return;

    try {

      const cleanUrl = GUILD_CLOUD_CONFIG.supabaseUrl.replace(/\/+$/, '').replace(/\/rest\/v1\/?$/, '');

      const res = await fetch(`${cleanUrl}/rest/v1/${GUILD_CLOUD_CONFIG.tableName}?id=eq.${commentId}`, {

        method: 'DELETE',

        headers: {

          'apikey': GUILD_CLOUD_CONFIG.supabaseAnonKey,

          'Authorization': `Bearer ${GUILD_CLOUD_CONFIG.supabaseAnonKey}`

        }

      });

      if (res.ok) {

        console.log(`[Supabase] Komentar ID ${commentId} berhasil dihapus dari database cloud!`);

      }

    } catch (err) {

      console.warn('Network error saat delete di Supabase:', err);

    }

  }

  // =========================================================================

  // SUPABASE / CLOUD PERSISTENCE SYNC

  // =========================================================================

  async function fetchCloudComments() {

    if (!GUILD_CLOUD_CONFIG.supabaseUrl || !GUILD_CLOUD_CONFIG.supabaseAnonKey) return;

    try {

      const cleanUrl = GUILD_CLOUD_CONFIG.supabaseUrl.replace(/\/+$/, '');

      const res = await fetch(`${cleanUrl}/rest/v1/${GUILD_CLOUD_CONFIG.tableName}?select=*&order=created_at.desc`, {

        headers: {

          'apikey': GUILD_CLOUD_CONFIG.supabaseAnonKey,

          'Authorization': `Bearer ${GUILD_CLOUD_CONFIG.supabaseAnonKey}`

        }

      });

      if (!res.ok) return;

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {

        const cloudQuests = data.map(item => ({

          id: item.id || Date.now(),

          author: item.author || 'Guest',

          createdAt: item.created_at ? new Date(item.created_at).getTime() : Date.now(),

          text: item.text || item.message || '',

          baseLikes: item.likes || 0,

          avatarType: item.avatar_type || item.avatarType || 'guest',

          hasRibbon: true,

          sealType: 'wax',

          tilt: item.tilt || '0.5deg'

        }));

        // Merge with existing local comments without duplicates
        const cloudIds = new Set(cloudQuests.map(c => String(c.id)));
        const cloudTextKeys = new Set(cloudQuests.map(c => `${c.author.trim()}:::${c.text.trim()}`));
        const uniqueLocal = userQuests.filter(l => !cloudIds.has(String(l.id)) && !cloudTextKeys.has(`${(l.author || '').trim()}:::${(l.text || '').trim()}`));
        userQuests = [...cloudQuests, ...uniqueLocal];

        try {

          localStorage.setItem('rfm_user_guild_comments', JSON.stringify(userQuests));

        } catch (e) {}

        questsList = getCompleteQuestsList();

        renderQuestPages();

      }

    } catch (err) {

      console.warn('Guild cloud comments sync fallback to local:', err);

    }

  }

  async function postCloudComment(newQuest) {
    if (!GUILD_CLOUD_CONFIG.supabaseUrl || !GUILD_CLOUD_CONFIG.supabaseAnonKey) return;
    try {
      const cleanUrl = GUILD_CLOUD_CONFIG.supabaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/rest/v1/${GUILD_CLOUD_CONFIG.tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': GUILD_CLOUD_CONFIG.supabaseAnonKey,
          'Authorization': `Bearer ${GUILD_CLOUD_CONFIG.supabaseAnonKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          author: newQuest.author,
          text: newQuest.text,
          avatar_type: newQuest.avatarType,
          likes: newQuest.baseLikes || 0,
          tilt: newQuest.tilt
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data[0] && data[0].id) {
          const cloudId = data[0].id;
          const oldId = newQuest.id;
          newQuest.id = cloudId;
          const delBtn = document.querySelector(`.quest-delete-btn[data-id="${oldId}"]`);
          if (delBtn) delBtn.setAttribute('data-id', cloudId);
          try {
            const stored = JSON.parse(localStorage.getItem('rfm_user_guild_comments') || '[]');
            const idx = stored.findIndex(q => String(q.id) === String(oldId) || (q.author === newQuest.author && q.text === newQuest.text));
            if (idx !== -1) {
              stored[idx].id = cloudId;
              localStorage.setItem('rfm_user_guild_comments', JSON.stringify(stored));
            }
          } catch(e) {}
        }
      }
    } catch (err) {
      console.warn('Failed to post comment to cloud, saved locally:', err);
    }
  }

  // Handle Form Submission (Pin New Quest Notice - Persistent Storage)

  if (guildMessageForm) {

    guildMessageForm.addEventListener('submit', (e) => {

      e.preventDefault();

      if (guildRulesAgreeCheckbox && !guildRulesAgreeCheckbox.checked) {

        playSound('toggle');

        showToast('Harap centang persetujuan peraturan sebelum berkomentar!');

        return;

      }

      const text = guildMessageInput.value.trim();

      if (!text) return;

      const isAnon = guildAnonCheckbox ? guildAnonCheckbox.checked : false;

      let author = 'Guest';

      if (!isAnon && guildAuthorInput && guildAuthorInput.value.trim()) {

        author = guildAuthorInput.value.trim();

      }

      const avatarPool = ['rafzz', 'jmnz', 'guest', 'rafzz2', 'l1mx'];

      const randomAvatar = isAnon ? 'guest' : avatarPool[Math.floor(Math.random() * avatarPool.length)];

      const tilts = ['-0.8deg', '0.6deg', '-0.5deg', '0.8deg', '-0.7deg', '0.5deg'];

      const randomTilt = tilts[Math.floor(Math.random() * tilts.length)];

      const newQuest = {

        id: Date.now(),

        createdAt: Date.now(),

        author: author,

        text: text,

        baseLikes: 0,

        likes: 0,

        isLiked: false,

        avatarType: randomAvatar,

        hasRibbon: true,

        sealType: 'wax',

        tilt: randomTilt

      };

      // Prepend to persistent user quests (Never gets lost/deleted)

      userQuests.unshift(newQuest);

      try {

        localStorage.setItem('rfm_user_guild_comments', JSON.stringify(userQuests));

      } catch (err) {}

      // Refresh combined list

      questsList = getCompleteQuestsList();

      // Reset to Page 1 so author immediately views their pinned notice

      currentPage = 0;

      renderQuestPages();

      // Reset form & close modal

      guildMessageForm.reset();

      updateGuildSubmitButtonState();

      if (guildAuthorInput) {

        guildAuthorInput.disabled = false;

        guildAuthorInput.placeholder = 'Nama Pengembara';

        guildAuthorInput.style.opacity = '1';

        guildAuthorInput.style.backgroundColor = '';

      }

      closeGuildModal();

      // Victory sound and medieval toast

      playSound('victory');

      showToast(`📌 Pesan petualangmu berhasil tertancap di Papan Guild! ⚔️`);

      // Post asynchronously to cloud database for hosting

      postCloudComment(newQuest);

    });

  }

  // Live real-time ticker that updates all timestamps on screen every 30 seconds

  setInterval(() => {

    document.querySelectorAll('.quest-time[data-created]').forEach(el => {

      const ts = el.getAttribute('data-created');

      if (ts) {

        const num = Number(ts);

        el.textContent = formatRelativeTime(isNaN(num) ? ts : num);

      }

    });

  }, 30000);

  // Guild Notice Modal Open & Close Functions

  function openGuildModal() {

    if (!guildModalOverlay) return;

    guildModalOverlay.classList.add('open');

    guildModalOverlay.setAttribute('aria-hidden', 'false');

    updateGuildSubmitButtonState();

    lockBodyScroll();

    playSound('click');

    setTimeout(() => {

      if (guildMessageInput) guildMessageInput.focus();

    }, 100);

  }

  // Initial render of Adventurer's Guild Quest Board & submit button state & cloud sync

  renderQuestPages();

  updateGuildSubmitButtonState();

  fetchCloudComments();

  function closeGuildModal() {

    if (!guildModalOverlay) return;

    guildModalOverlay.classList.remove('open');

    guildModalOverlay.setAttribute('aria-hidden', 'true');

    unlockBodyScroll();

    playSound('click');

  }

  // Guild Rules Decree Modal Open & Close Functions

  function openGuildRulesModal() {

    if (!guildRulesModalOverlay) return;

    guildRulesModalOverlay.classList.add('open');

    guildRulesModalOverlay.setAttribute('aria-hidden', 'false');

    lockBodyScroll();

    playSound('click');

  }

  function closeGuildRulesModal() {

    if (!guildRulesModalOverlay) return;

    guildRulesModalOverlay.classList.remove('open');

    guildRulesModalOverlay.setAttribute('aria-hidden', 'true');

    unlockBodyScroll();

    playSound('click');

  }

  // Modal event triggers - Post Comment

  if (openCommentModalBtn) {

    openCommentModalBtn.addEventListener('click', openGuildModal);

  }

  if (closeGuildModalBtn) {

    closeGuildModalBtn.addEventListener('click', closeGuildModal);

  }

  if (guildModalOverlay) {

    guildModalOverlay.addEventListener('click', (e) => {

      if (e.target === guildModalOverlay) {

        closeGuildModal();

      }

    });

  }

  // Modal event triggers - Guild Rules

  if (guildRulesBtn) {

    guildRulesBtn.addEventListener('click', openGuildRulesModal);

  }

  const guildRulesTriggerLink = document.getElementById('guildRulesTriggerLink');

  if (guildRulesTriggerLink) {

    guildRulesTriggerLink.addEventListener('click', (e) => {

      e.preventDefault();

      e.stopPropagation();

      openGuildRulesModal();

    });

  }

  if (closeGuildRulesModalBtn) {

    closeGuildRulesModalBtn.addEventListener('click', closeGuildRulesModal);

  }

  if (understandRulesBtn) {

    understandRulesBtn.addEventListener('click', () => {

      closeGuildRulesModal();

      if (guildRulesAgreeCheckbox && !guildRulesAgreeCheckbox.checked) {

        guildRulesAgreeCheckbox.checked = true;

        updateGuildSubmitButtonState();

      }

    });

  }

  if (guildRulesModalOverlay) {

    guildRulesModalOverlay.addEventListener('click', (e) => {

      if (e.target === guildRulesModalOverlay) {

        closeGuildRulesModal();

      }

    });

  }

  window.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

      if (guildRulesModalOverlay && guildRulesModalOverlay.classList.contains('open')) {

        closeGuildRulesModal();

      } else if (guildModalOverlay && guildModalOverlay.classList.contains('open')) {

        closeGuildModal();

      }

    }

  });

  // Anonymous Toggle Handler

  if (guildAnonCheckbox && guildAuthorInput) {

    guildAnonCheckbox.addEventListener('change', () => {

      if (guildAnonCheckbox.checked) {

        guildAuthorInput.disabled = true;

        guildAuthorInput.value = '';

        guildAuthorInput.placeholder = 'Guest (Anonymous)';

        guildAuthorInput.style.opacity = '0.6';

        guildAuthorInput.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';

      } else {

        guildAuthorInput.disabled = false;

        guildAuthorInput.placeholder = 'Nama Pengembara';

        guildAuthorInput.style.opacity = '1';

        guildAuthorInput.style.backgroundColor = '';

      }

      playSound('click');

    });

  }

  renderQuestPages();
  updateGuildSubmitButtonState();

  // -------------------------------------------------------------------------

  // 9a. Proportional Scalers for Adventurer's Guild Board & Royal Dispatch Scroll

  // (Memastikan bentuk kedua elemen persis seperti desktop tanpa pernah berubah di mobile)

  // -------------------------------------------------------------------------

  function initFixedShapeScalers() {

    const guildScaler = document.getElementById('guildBoardScaler');

    const guildWrapper = document.getElementById('guildBoardWrapper');

    const scrollScaler = document.getElementById('dispatchScrollScaler');

    const scrollWrapper = document.getElementById('dispatchScrollWrapper');

    const paperEl = document.getElementById('paper');

    const GUILD_BASE_WIDTH = 1084;

    const SCROLL_BASE_WIDTH = 1062;

    function updateScaler(scaler, wrapper, baseWidth, isScroll = false) {

      if (!scaler || !wrapper) return;

      const parentWidth = scaler.parentElement ? scaler.parentElement.clientWidth : scaler.clientWidth;

      const availableWidth = Math.max(260, parentWidth - 8);

      let scale = 1;

      if (isScroll) {

        const isOpen = paperEl && paperEl.classList.contains('open');

        if (isOpen) {

          scale = Math.min(1, availableWidth / baseWidth);

        } else {

          scale = 1;

        }

      } else {

        scale = Math.min(1, availableWidth / baseWidth);

      }

      if (scale < 1) {

        wrapper.style.transform = `scale(${scale})`;

        wrapper.style.transformOrigin = 'top center';

        const unscaledH = wrapper.offsetHeight;

        if (unscaledH > 0) {

          scaler.style.height = `${Math.ceil(unscaledH * scale)}px`;

        }

      } else {

        wrapper.style.transform = '';

        wrapper.style.transformOrigin = '';

        scaler.style.height = '';

      }

    }

    updateAllScalers = function() {

      updateScaler(guildScaler, guildWrapper, GUILD_BASE_WIDTH, false);

      updateScaler(scrollScaler, scrollWrapper, SCROLL_BASE_WIDTH, true);

    };

    window.addEventListener('resize', updateAllScalers, { passive: true });

    window.addEventListener('orientationchange', updateAllScalers, { passive: true });

    if (window.ResizeObserver) {

      const ro = new ResizeObserver(() => {

        requestAnimationFrame(updateAllScalers);

      });

      if (guildScaler && guildScaler.parentElement) ro.observe(guildScaler.parentElement);

      if (guildWrapper) ro.observe(guildWrapper);

      if (scrollScaler && scrollScaler.parentElement) ro.observe(scrollScaler.parentElement);

      if (scrollWrapper) ro.observe(scrollWrapper);

    }

    if (paperEl) {

      paperEl.addEventListener('transitionend', updateAllScalers);

    }

    const btnEl = document.getElementById('btn');

    if (btnEl) {

      btnEl.addEventListener('click', () => {

        updateAllScalers();

        setTimeout(updateAllScalers, 80);

        setTimeout(updateAllScalers, 300);

        setTimeout(updateAllScalers, 700);

        setTimeout(updateAllScalers, 1350);

      });

    }

    updateAllScalers();

    setTimeout(updateAllScalers, 150);

    setTimeout(updateAllScalers, 600);

    setTimeout(updateAllScalers, 1200);

  }

  initFixedShapeScalers();

  // -------------------------------------------------------------------------

  // 9b. Certificate 3D Perspective Gallery Carousel (Data Asli)

  // -------------------------------------------------------------------------

  const certificates = [

    {

      tag: "DICODING ACADEMY • CLOUD COMPUTING",

      title: "Dicoding: Belajar Dasar AWS Cloud",

      url: "dicoding.com/certificates/belajar-dasar-aws-cloud",

      img: "Assets/Images/cert-google.jpg",

      desc: "Sertifikasi kelulusan resmi dari Dicoding Indonesia tentang pemahaman dasar Cloud Computing, konsep arsitektur AWS, tata kelola keamanan cloud, serta implementasi layanan AWS.",

      tech: ["AWS Cloud", "Cloud Computing", "Infrastructure", "Security"],

      link: "Assets/Images/cert-google.jpg",

      verifyUrl: "https://www.dicoding.com"

    },

    {

      tag: "DICODING ACADEMY • WEB DEVELOPMENT",

      title: "Dicoding: Pemrograman JavaScript (Dasar)",

      url: "dicoding.com/certificates/pemrograman-javascript-dasar",

      img: "Assets/Images/cert-laravel.jpg",

      desc: "Sertifikasi kompetensi fundamental bahasa pemrograman JavaScript, struktur data, fungsi, pemrograman berorientasi objek (OOP), hingga penanganan proses asynchronous.",

      tech: ["JavaScript", "ES6+", "OOP", "Async/Await", "Logic"],

      link: "Assets/Images/cert-laravel.jpg",

      verifyUrl: "https://www.dicoding.com"

    },

    {

      tag: "AMAZON WEB SERVICES • CLOUD INFRASTRUCTURE",

      title: "AWS Academy Cloud Foundations",

      url: "awsacademy.com/certificates/cloud-foundations",

      img: "Assets/Images/cert-frontend.jpg",

      desc: "Sertifikasi akreditasi resmi AWS Academy Cloud Foundations yang memvalidasi keahlian komprehensif dalam arsitektur cloud global, layanan komputasi, storage, dan jaringan AWS.",

      tech: ["AWS Academy", "Cloud Architecture", "DevOps", "Networking"],

      link: "Assets/Images/cert-frontend.jpg",

      verifyUrl: "https://aws.amazon.com/training/awsacademy/"

    }

  ];

  let certActive = 0;

  const certStage = document.getElementById('certStage');

  const certPanel = document.getElementById('certPanel');

  const certTitle = document.getElementById('certTitle');

  const certDesc = document.getElementById('certDesc');

  const certDetail = document.getElementById('certDetail');

  const certCount = document.getElementById('certCount');

  const certDots = document.getElementById('certDots');

  const certPrev = document.getElementById('certPrev');

  const certNext = document.getElementById('certNext');

  // Modal elements (Foto & Tombol X saja)

  const certModal = document.getElementById('certModal');

  const certModalClose = document.getElementById('certModalClose');

  const modalCertImg = document.getElementById('modalCertImg');

  if (certStage && certPanel && certificates.length > 0) {

    const totalCerts = certificates.length;

    // Build mockup frames

    certificates.forEach((c, idx) => {

      const frame = document.createElement('div');

      frame.className = 'cert-frame';

      frame.tabIndex = 0;

      frame.setAttribute('role', 'button');

      frame.setAttribute('aria-label', `Tampilkan sertifikat: ${c.title}`);

      frame.innerHTML = `

        <div class="cert-bar">

          <div class="bar-dots"><i></i><i></i><i></i></div>

          <span class="bar-url">${c.url}</span>

        </div>

        <div class="cert-screen">

          <img src="${c.img}" alt="${c.title}" loading="lazy">

          <div class="cert-screen-overlay"></div>

          <div class="cert-screen-zoom-hint"><span>🔍</span> Perbesar Foto</div>

        </div>

      `;

      // Clicking active frame opens zoom lightbox modal; clicking side frames navigates

      frame.addEventListener('click', () => {

        if (certActive === idx) {

          openCertModal(idx);

        } else {

          goCert(idx);

          resetCertAutoSlide();

        }

      });

      frame.addEventListener('keydown', (e) => {

        if (e.key === 'Enter' || e.key === ' ') {

          e.preventDefault();

          if (certActive === idx) openCertModal(idx);

          else {

            goCert(idx);

            resetCertAutoSlide();

          }

        }

      });

      certStage.appendChild(frame);

    });

    // Build dots

    certificates.forEach((_, idx) => {

      const dot = document.createElement('button');

      dot.className = 'cert-dot';

      dot.setAttribute('aria-label', `Sertifikat ${idx + 1}`);

      dot.addEventListener('click', () => {

        goCert(idx);

        resetCertAutoSlide();

      });

      if (certDots) certDots.appendChild(dot);

    });

    function renderCertificates(animate = false) {

      const frames = certStage.children;

      for (let i = 0; i < totalCerts; i++) {

        let diff = ((i - certActive + totalCerts) % totalCerts);

        if (diff > totalCerts / 2) diff -= totalCerts;

        frames[i].dataset.pos = Math.abs(diff) <= 1 ? String(diff) : 'hide';

        frames[i].tabIndex = diff === 0 ? 0 : 0;

      }

      if (certDots) {

        [...certDots.children].forEach((dot, i) => {

          dot.classList.toggle('on', i === certActive);

        });

      }

      if (certCount) {

        certCount.textContent = `${String(certActive + 1).padStart(2, '0')} / ${String(totalCerts).padStart(2, '0')}`;

      }

      const fillData = () => {

        const c = certificates[certActive];

        if (certTitle) certTitle.textContent = c.title;

        if (certDesc) certDesc.textContent = c.desc;

      };

      if (!animate) {

        fillData();

      } else {

        certPanel.classList.add('swap');

        setTimeout(() => {

          fillData();

          certPanel.classList.remove('swap');

        }, 220);

      }

    }

    function goCert(targetIndex, playSfx = true) {

      targetIndex = (targetIndex + totalCerts) % totalCerts;

      if (targetIndex === certActive) return;

      certActive = targetIndex;

      if (playSfx && typeof playSound === 'function') playSound('blip');

      renderCertificates(true);

    }

    if (certNext) certNext.addEventListener('click', () => {

      goCert(certActive + 1);

      resetCertAutoSlide();

    });

    if (certPrev) certPrev.addEventListener('click', () => {

      goCert(certActive - 1);

      resetCertAutoSlide();

    });

    // Keyboard arrow keys when interacting with certificate section

    const certSection = document.getElementById('sertificat');

    if (certSection) {

      certSection.addEventListener('keydown', (e) => {

        if (e.key === 'ArrowRight') {

          e.preventDefault();

          goCert(certActive + 1);

          resetCertAutoSlide();

        } else if (e.key === 'ArrowLeft') {

          e.preventDefault();

          goCert(certActive - 1);

          resetCertAutoSlide();

        }

      });

    }

    // Touch swipe gesture support for mobile

    let touchStartX = 0;

    let touchEndX = 0;

    certStage.addEventListener('touchstart', (e) => {

      touchStartX = e.changedTouches[0].screenX;

      stopCertAutoSlide();

    }, { passive: true });

    certStage.addEventListener('touchend', (e) => {

      touchEndX = e.changedTouches[0].screenX;

      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > 40) {

        if (swipeDistance < 0) goCert(certActive + 1);

        else goCert(certActive - 1);

      }

      resetCertAutoSlide();

    }, { passive: true });

    // Photo Lightbox Modal (Hanya Foto & Tombol X)

    function openCertModal(index) {

      stopCertAutoSlide();

      const c = certificates[index];

      if (!certModal || !c) return;

      if (modalCertImg) {

        modalCertImg.src = c.img;

        modalCertImg.alt = c.title;

      }

      certModal.classList.add('active');

      certModal.setAttribute('aria-hidden', 'false');

      lockBodyScroll();

      playSound('powerup');

    }

    function closeCertModal() {

      if (!certModal) return;

      certModal.classList.remove('active');

      certModal.setAttribute('aria-hidden', 'true');

      unlockBodyScroll();

      playSound('click');

      startCertAutoSlide();

    }

    if (certDetail) {

      certDetail.addEventListener('click', () => openCertModal(certActive));

    }

    if (certModalClose) {

      certModalClose.addEventListener('click', closeCertModal);

    }

    if (certModal) {

      certModal.addEventListener('click', (e) => {

        if (e.target === certModal) closeCertModal();

      });

    }

    document.addEventListener('keydown', (e) => {

      if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {

        closeCertModal();

      }

    });

    // -----------------------------------------------------------------------

    // Sertifikat Auto-Slide Otomatis (3.5s interval + pause on hover)

    // -----------------------------------------------------------------------

    let certAutoSlideTimer = null;

    const CERT_AUTO_INTERVAL = 3500;

    function startCertAutoSlide() {

      stopCertAutoSlide();

      certAutoSlideTimer = setInterval(() => {

        if (certModal && certModal.classList.contains('active')) return;

        goCert(certActive + 1, false);

      }, CERT_AUTO_INTERVAL);

    }

    function stopCertAutoSlide() {

      if (certAutoSlideTimer) {

        clearInterval(certAutoSlideTimer);

        certAutoSlideTimer = null;

      }

    }

    function resetCertAutoSlide() {

      stopCertAutoSlide();

      startCertAutoSlide();

    }

    if (certStage) {

      certStage.addEventListener('mouseenter', stopCertAutoSlide);

      certStage.addEventListener('mouseleave', startCertAutoSlide);

    }

    if (certPanel) {

      certPanel.addEventListener('mouseenter', stopCertAutoSlide);

      certPanel.addEventListener('mouseleave', startCertAutoSlide);

    }

    const certSecTarget = document.getElementById('sertifikat') || document.getElementById('sertificat');

    if ('IntersectionObserver' in window && certSecTarget) {

      const certObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            startCertAutoSlide();

          } else {

            stopCertAutoSlide();

          }

        });

      }, { threshold: 0.15 });

      certObserver.observe(certSecTarget);

    } else {

      startCertAutoSlide();

    }

    // Initial render without animation

    renderCertificates(false);

  }

  // =========================================================================

  // 9c. Pixel Island Cinematic Gallery Showcase

  // =========================================================================

  function initPixelIslandGallery() {

    const FR = '<span class="o tl"></span><span class="o tr"></span><span class="o bl"></span><span class="o br"></span><span class="o ts"></span><span class="o bs"></span><span class="o gt"></span><span class="o gb"></span><span class="o gl"></span><span class="o gr"></span>';

    function sv(c, p) {

      return 'url("data:image/svg+xml,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40' preserveAspectRatio='none'><polygon fill='" + c + "' points='" + p + "'/></svg>") + '")';

    }

    function sc(a, b, m1, m2, sun) {

      return sv(m1, '0,40 0,24 14,12 28,26 46,6 66,28 84,14 100,26 100,40') + ' bottom/100% 52% no-repeat,' +

             sv(m2, '0,40 0,30 20,20 38,32 60,18 80,32 100,22 100,40') + ' bottom/100% 34% no-repeat,radial-gradient(circle at 72% 30%,' + sun + ' 0,transparent 15%),linear-gradient(180deg,' + a + ',' + b + ')';

    }

    const S = [

      {

        t: 'Wisata Religi',

        s: 'Momen 01',

        d: 'Menikmati ketenangan dan kemegahan arsitektur islami di dalam masjid.',

        bg: sc('#0a1a44', '#e6993a', 'rgb(8,22,52)', 'rgb(14,38,84)', 'rgba(255,214,128,.9)'),

        img: 'Assets/Images/gallery-1.jpg'

      },

      {

        t: 'Nonton Bioskop',

        s: 'Momen 02',

        d: 'Waktu santai nonton film favorit bareng teman sambil jajan popcorn di CGV.',

        bg: sc('#06122e', '#2a5aa8', 'rgb(4,14,36)', 'rgb(10,32,76)', 'rgba(190,225,255,.85)'),

        img: 'Assets/Images/gallery-2.jpg'

      },

      {

        t: 'Waterpark & Wisata',

        s: 'Momen 03',

        d: 'Bersenang-senang main air dan refreshing di tengah panorama alam pegunungan yang asri.',

        bg: sc('#3a1f4d', '#f08a4b', 'rgb(18,12,38)', 'rgb(40,24,70)', 'rgba(255,190,120,.9)'),

        img: 'Assets/Images/gallery-3.jpg'

      },

      {

        t: 'Workspace & Coding',

        s: 'Momen 04',

        d: 'Fokus di depan layar, merangkai baris kode dan mengasah keterampilan programming.',

        bg: sc('#0b2d3f', '#58b6c9', 'rgb(6,24,36)', 'rgb(12,52,70)', 'rgba(220,250,255,.85)'),

        img: 'Assets/Images/gallery-4.jpg'

      },

      {

        t: 'SMKN 13 Bandung',

        s: 'Momen 05',

        d: 'Suasana lingkungan sekolah dan lapangan tempat belajar serta beraktivitas sehari-hari.',

        bg: sc('#1a1030', '#c8742e', 'rgb(12,8,28)', 'rgb(30,20,60)', 'rgba(255,205,140,.9)'),

        img: 'Assets/Images/gallery-5.jpg'

      },

      {

        t: 'Night Owl Coding',

        s: 'Momen 06',

        d: 'Suasana tenang saat larut malam, ditemani laptop untuk eksplorasi dan riset ide digital baru.',

        bg: sc('#0c183a', '#d97724', 'rgb(10,18,44)', 'rgb(24,36,78)', 'rgba(255,210,140,.9)'),

        img: 'Assets/Images/gallery-6.jpg'

      }

    ];

    const N = S.length;

    let c = 0;

    let busy = false;

    const $ = id => document.getElementById(id);

    const st = $('gst');

    const gbg = $('gbg');

    const gtx = $('gtx');

    const gcs = $('gcs');

    if (!st || !gbg || !gtx || !gcs) return;

    function im(s) {

      return s.img ? 'url("' + s.img + '") center/cover no-repeat' : s.bg;

    }

    function txt(i) {

      const sub = $('gsub');

      const tt = $('gtt');

      const ds = $('gds');

      const ct = $('gct');

      const pi = $('gpi');

      if (sub) sub.textContent = S[i].s;

      if (tt) tt.textContent = S[i].t;

      if (ds) ds.textContent = S[i].d;

      if (ct) ct.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');

      if (pi) pi.style.width = ((i + 1) / N * 100) + '%';

    }

    function mk(i) {

      const e = document.createElement('div');

      e.className = 'pc gcd';

      e.tabIndex = 0;

      e.setAttribute('role', 'button');

      e.setAttribute('aria-label', S[i].t);

      e.innerHTML = FR + '<div class="gim"><div class="gcp"><small>' + S[i].s + '</small><b>' + S[i].t + '</b></div></div>';

      const gim = e.querySelector('.gim');

      if (gim) gim.style.background = im(S[i]);

      e.onclick = function() {

        if (typeof playSound === 'function') playSound('blip');

        go(i, e);

        resetGalleryAutoSlide();

      };

      e.onkeydown = function(ev) {

        if (ev.key === 'Enter' || ev.key === ' ') {

          ev.preventDefault();

          if (typeof playSound === 'function') playSound('blip');

          go(i, e);

          resetGalleryAutoSlide();

        }

      };

      return e;

    }

    function cards(na) {

      gcs.innerHTML = '';

      for (let k = 1; k <= Math.min(3, N - 1); k++) {

        const e = mk((c + k) % N);

        if (na) e.classList.add('na');

        gcs.appendChild(e);

      }

    }

    function go(i, el, prev) {

      if (busy || i === c) return;

      busy = true;

      const sr = st.getBoundingClientRect();

      const x = document.createElement('div');

      const D = 1100;

      const E = 'cubic-bezier(.65,0,.25,1)';

      const kids = Array.from(gcs.children);

      const first = el && !prev && kids.indexOf(el) === 0;

      let from;

      let slid = false;

      const xw = document.createElement('div');

      xw.className = 'gxp-wrap';

      x.className = 'gxp';

      x.style.background = im(S[i]);

      if (el && !prev) {

        const gimEl = el.querySelector('.gim');

        const r = (gimEl || el).getBoundingClientRect();

        const l = r.left - sr.left;

        const t = r.top - sr.top;

        from = 'inset(' + t + 'px ' + (sr.width - l - r.width) + 'px ' + (sr.height - t - r.height) + 'px ' + l + 'px)';

        el.style.visibility = 'hidden';

      } else {

        from = 'inset(0px 100% 0px 0px)';

      }

      x.style.clipPath = from;

      xw.appendChild(x);

      st.appendChild(xw);

      const a = x.animate([{ clipPath: from }, { clipPath: 'inset(0px 0px 0px 0px)' }], {

        duration: D,

        easing: E,

        fill: 'forwards'

      });

      xw.animate([

        { filter: 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 18px rgba(0, 0, 0, 0.85))' },

        { filter: 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 18px rgba(0, 0, 0, 0.85))', offset: 0.85 },

        { filter: 'drop-shadow(0 0 0 transparent)', offset: 1 }

      ], {

        duration: D,

        easing: E,

        fill: 'forwards'

      });

      gbg.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }], {

        duration: D,

        easing: E

      });

      if (first && kids.length > 1) {

        const g = gcs.getBoundingClientRect();

        const d = kids[1].getBoundingClientRect().left - kids[0].getBoundingClientRect().left;

        kids.slice(1).forEach(k => {

          k.animate([{ transform: 'none' }, { transform: 'translateX(' + (-d) + 'px)' }], {

            duration: D * 0.8,

            easing: E,

            fill: 'forwards'

          });

        });

        const ne = mk((c + 4) % N);

        ne.classList.add('na');

        ne.style.cssText = 'position:absolute;bottom:0;left:' + (kids[kids.length - 1].getBoundingClientRect().left + d - g.left) + 'px';

        gcs.appendChild(ne);

        ne.animate([{ opacity: 0, transform: 'none' }, { opacity: 1, transform: 'translateX(' + (-d) + 'px)' }], {

          duration: D * 0.8,

          easing: E,

          fill: 'forwards'

        });

        slid = true;

      } else {

        kids.forEach(k => {

          if (k !== el) {

            k.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });

          }

        });

      }

      const o = gtx.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-18px)' }], {

        duration: 420,

        easing: 'ease-in',

        fill: 'forwards'

      });

      o.finished.then(() => {

        txt(i);

        o.cancel();

        gtx.animate([{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }], {

          duration: 700,

          easing: 'cubic-bezier(.2,.8,.2,1)'

        });

      });

      a.finished.then(() => {

        gbg.style.background = im(S[i]);

        xw.remove();

        c = i;

        cards(slid);

        busy = false;

      });

    }

    gbg.style.background = im(S[0]);

    txt(0);

    cards();

    const nxb = $('gnx');

    if (nxb) {

      nxb.onclick = () => {

        if (typeof playSound === 'function') playSound('blip');

        const f = gcs.firstElementChild;

        go((c + 1) % N, f);

        resetGalleryAutoSlide();

      };

    }

    const pvb = $('gpv');

    if (pvb) {

      pvb.onclick = () => {

        if (typeof playSound === 'function') playSound('blip');

        go((c - 1 + N) % N, null, true);

        resetGalleryAutoSlide();

      };

    }

    // -----------------------------------------------------------------------

    // Auto-Swap Otomatis (Interval 4 detik, pause saat hover & touch)

    // -----------------------------------------------------------------------

    let galleryAutoTimer = null;

    const GALLERY_AUTO_INTERVAL = 4000;

    function nextGallerySlide(playSfx = false) {

      if (busy) return;

      if (playSfx && typeof playSound === 'function') playSound('blip');

      const f = gcs.firstElementChild;

      go((c + 1) % N, f);

    }

    function startGalleryAutoSlide() {

      stopGalleryAutoSlide();

      galleryAutoTimer = setInterval(() => {

        nextGallerySlide(false);

      }, GALLERY_AUTO_INTERVAL);

    }

    function stopGalleryAutoSlide() {

      if (galleryAutoTimer) {

        clearInterval(galleryAutoTimer);

        galleryAutoTimer = null;

      }

    }

    function resetGalleryAutoSlide() {

      stopGalleryAutoSlide();

      startGalleryAutoSlide();

    }

    // Pause saat kursor berada di atas panggung galeri

    st.addEventListener('mouseenter', stopGalleryAutoSlide);

    st.addEventListener('mouseleave', startGalleryAutoSlide);

    // Touch gesture swipe untuk layar sentuh / mobile

    let touchStartX = 0;

    let touchEndX = 0;

    st.addEventListener('touchstart', (e) => {

      touchStartX = e.changedTouches[0].screenX;

      stopGalleryAutoSlide();

    }, { passive: true });

    st.addEventListener('touchend', (e) => {

      touchEndX = e.changedTouches[0].screenX;

      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > 40) {

        if (swipeDistance < 0) {

          nextGallerySlide(true);

        } else {

          if (typeof playSound === 'function') playSound('blip');

          go((c - 1 + N) % N, null, true);

        }

      }

      resetGalleryAutoSlide();

    }, { passive: true });

    // Pause jika tab browser diminimalkan / tidak aktif

    document.addEventListener('visibilitychange', () => {

      if (document.hidden) stopGalleryAutoSlide();

      else startGalleryAutoSlide();

    });

    // Jalankan auto-swap saat section terlihat di layar

    const galSection = document.getElementById('gallery');

    if ('IntersectionObserver' in window && galSection) {

      const galObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            startGalleryAutoSlide();

          } else {

            stopGalleryAutoSlide();

          }

        });

      }, { threshold: 0.15 });

      galObserver.observe(galSection);

    } else {

      startGalleryAutoSlide();

    }

  }

  // Initialize Pixel Island Gallery

  initPixelIslandGallery();

  // -------------------------------------------------------------------------

  // 10. Toast Notification System

  // -------------------------------------------------------------------------

  let toastTimer = null;

  let isToastEnabled = localStorage.getItem('rfm_toast_enabled') !== 'false';

  function showToast(msg) {

    if (!isToastEnabled || !pixelToast) return;

    toastMessage.textContent = msg;

    pixelToast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      pixelToast.classList.remove('show');

    }, 3800);

  }

  // -------------------------------------------------------------------------

  // 11. Castle Mascot Characters & Flying Dragon Cursor

  // -------------------------------------------------------------------------

  const waitMs = ms => new Promise(r => setTimeout(r, ms));

  const randNum = (a, b) => a + Math.random() * (b - a);

  class Mascot {

    constructor(el, hello, brave = false) {

      this.el = el;

      this.hello = hello;

      this.brave = brave;

      this.bubble = el ? el.querySelector('.bubble') : null;

      this.sleeping = false;

      this.fleeing = false;

      this.fighting = false;

      this.hits = [];

      if (this.el) {

        this.el.addEventListener('click', () => this.poke());

        this.loop();

      }

    }

    async say(text, ms = 2200, wave = true) {

      if (!this.bubble || !this.el) return;

      this.bubble.textContent = text;

      this.bubble.classList.add('show');

      if (wave) this.el.classList.add('hi');

      await waitMs(ms);

      this.bubble.classList.remove('show');

      this.el.classList.remove('hi');

    }

    async blink() {

      if (!this.el) return;

      this.el.classList.add('blink');

      await waitMs(140);

      this.el.classList.remove('blink');

    }

    async look() {

      if (!this.el) return;

      const d = Math.random() < 0.5 ? 'look-l' : 'look-r';

      this.el.classList.add(d);

      await waitMs(randNum(900, 1800));

      this.el.classList.remove(d);

    }

    async walk() {

      if (!this.el || !this.el.parentElement || this.fleeing || this.fighting) return;

      const W = this.el.parentElement.clientWidth - 90;

      const from = this.el.offsetLeft;

      const to = randNum(10, Math.max(20, W));

      const dur = Math.max(0.6, Math.abs(to - from) / 110);

      this.el.style.transitionDuration = dur + 's';

      this.el.classList.add(to < from ? 'look-l' : 'look-r', 'walk');

      this.el.style.left = to + 'px';

      await waitMs(dur * 1000);

      this.el.classList.remove('walk', 'look-l', 'look-r');

    }

    async sleep() {

      if (!this.el || this.fighting) return;

      this.sleeping = true;

      await this.blink();

      this.el.classList.add('sleep');

      await waitMs(randNum(5000, 9000));

      if (this.sleeping) await this.wake();

    }

    async wake() {

      if (!this.el || !this.sleeping) return;

      this.sleeping = false;

      this.el.classList.remove('sleep');

      this.el.classList.add('jump');

      await waitMs(400);

      this.el.classList.remove('jump');

    }

    async poke() {

      if (!this.el || this.fighting) return;

      if (this.sleeping) {

        await this.wake();

        await this.say('Hah? Hamba tertidur…', 1800, false);

      } else {

        this.el.classList.add('jump');

        await this.say(this.hello, 1800);

        this.el.classList.remove('jump');

      }

    }

    async fight(mx) {

      if (!this.el) return;

      this.fighting = true;

      this.hits = [];

      if (this.sleeping) {

        this.sleeping = false;

        this.el.classList.remove('sleep');

      }

      const isToRight = (this.el.offsetLeft + 38 < mx);

      this.el.classList.remove('look-l', 'look-r');

      this.el.classList.add('fight', isToRight ? 'look-r' : 'look-l');

      this.say('Hadapi aku, naga!', 1800, false);

      await waitMs(3800);

      this.el.classList.remove('fight', 'look-l', 'look-r');

      this.say('Hmph! Jangan kembali!', 1400, false);

      await waitMs(500);

      this.fighting = false;

    }

    async flee(mx) {

      if (!this.el || !this.el.parentElement || this.fleeing || this.fighting) return;

      const now = performance.now();

      this.hits = (this.hits || []).filter(t => now - t < 5000);

      this.hits.push(now);

      if (this.brave && this.hits.length >= 4) {

        return this.fight(mx);

      }

      this.fleeing = true;

      if (this.sleeping) {

        this.sleeping = false;

        this.el.classList.remove('sleep');

      }

      const W = this.el.parentElement.clientWidth - 90;

      const from = this.el.offsetLeft;

      const dir = (from + 38 < mx) ? -1 : 1;

      let to = from + dir * randNum(170, 270);

      if (to < 10 || to > W) to = dir < 0 ? W - randNum(0, 40) : 10 + randNum(0, 40);

      to = Math.min(W, Math.max(10, to));

      const dur = Math.max(0.35, Math.abs(to - from) / 330);

      this.el.style.transitionDuration = dur + 's';

      this.el.classList.add('scared', 'walk', to < from ? 'look-l' : 'look-r');

      if (Math.random() < 0.5) {

        this.say('Ampun, naga!', 900, false);

      }

      this.el.style.left = to + 'px';

      await waitMs(dur * 1000);

      this.el.classList.remove('scared', 'walk', 'look-l', 'look-r');

      await waitMs(250);

      this.fleeing = false;

    }

    async loop() {

      while (true) {

        await waitMs(randNum(1200, 3500));

        if (this.sleeping || this.fleeing || this.fighting) continue;

        const r = Math.random();

        if (r < 0.45) await this.blink();

        else if (r < 0.65) await this.look();

        else if (r < 0.88) await this.walk();

        else await this.sleep();

      }

    }

  }

  // -------------------------------------------------------------------------

  // 11. Medieval Parchment Settings Modal (Center Modal with Sidebar Tabs)

  // -------------------------------------------------------------------------

  let isDragonEnabled = localStorage.getItem('portfolio_dragon_active') !== 'false';

  let isMascotsEnabled = localStorage.getItem('portfolio_mascots_active') !== 'false';

  let isParticlesEnabled = localStorage.getItem('rfm_particles_active') !== 'false';

  let isToastAudioEnabled = localStorage.getItem('rfm_toast_sound') !== 'false';

  // Modal Open & Close Handlers

  function openSettingsModal() {

    if (!settingsModalBackdrop) return;

    document.body.classList.add('settings-open');

    settingsModalBackdrop.classList.add('active', 'show');

    settingsModalBackdrop.setAttribute('aria-hidden', 'false');

    if (settingsToggle) settingsToggle.classList.add('active');

    document.body.style.overflow = 'hidden';

    playSound('unroll');

    syncAllSettingsUI();

  }

  function closeSettingsModal() {

    if (!settingsModalBackdrop || !settingsModalBackdrop.classList.contains('show')) return;

    stopAudioPreview();

    document.body.classList.remove('settings-open');

    settingsModalBackdrop.classList.remove('active', 'show');

    settingsModalBackdrop.setAttribute('aria-hidden', 'true');

    if (settingsToggle) settingsToggle.classList.remove('active');

    document.body.style.overflow = '';

    playSound('roll');

  }

  if (settingsToggle) {

    settingsToggle.addEventListener('click', (e) => {

      e.stopPropagation();

      if (settingsModalBackdrop && settingsModalBackdrop.classList.contains('show')) {

        closeSettingsModal();

      } else {

        openSettingsModal();

      }

    });

  }

  if (closeSettingsModalBtn) {

    closeSettingsModalBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      closeSettingsModal();

    });

  }

  if (settingsModalBackdrop) {

    settingsModalBackdrop.addEventListener('click', (e) => {

      if (e.target === settingsModalBackdrop) {

        closeSettingsModal();

      }

    });

  }

  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' && settingsModalBackdrop && settingsModalBackdrop.classList.contains('show')) {

      closeSettingsModal();

    }

  });

  // Sidebar Tab Switching (General, Appearance, Notifications)

  const settingsTabBtns = document.querySelectorAll('.settings-tab-btn');

  const settingsTabPanels = document.querySelectorAll('.settings-tab-panel');

  settingsTabBtns.forEach(btn => {

    btn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('blip');

      const targetTab = btn.getAttribute('data-tab');

      // Update button active state

      settingsTabBtns.forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      // Update panel visibility

      settingsTabPanels.forEach(panel => {

        panel.classList.remove('active');

      });

      const activePanel = document.getElementById('tabPanel' + targetTab.charAt(0).toUpperCase() + targetTab.slice(1));

      if (activePanel) {

        activePanel.classList.add('active');

      }

    });

  });

  // Switch UI Helper

  function setSwitchUI(btn, isActive) {

    if (!btn) return;

    const label = btn.querySelector('.switch-label');

    if (isActive) {

      btn.classList.add('active');

      btn.setAttribute('aria-checked', 'true');

      if (label) label.textContent = 'ON';

    } else {

      btn.classList.remove('active');

      btn.setAttribute('aria-checked', 'false');

      if (label) label.textContent = 'OFF';

    }

  }

  // Dragon & Mascot Handlers

  function updateDragonSwitchUI() {

    setSwitchUI(btnToggleDragon, isDragonEnabled);

  }

  function updateMascotsSwitchUI() {

    setSwitchUI(btnToggleMascots, isMascotsEnabled);

  }

  function applyDragonState() {

    updateDragonSwitchUI();

    const dr = document.getElementById('dragon');

    if (dr) {

      dr.style.display = isDragonEnabled ? 'block' : 'none';

    }

  }

  function applyMascotsState() {

    updateMascotsSwitchUI();

    const stage = document.getElementById('stage');

    const floor = document.querySelector('.floor');

    const castle = document.querySelector('.castle');

    if (stage) stage.style.display = isMascotsEnabled ? '' : 'none';

    if (floor) floor.style.display = isMascotsEnabled ? '' : 'none';

    if (castle) castle.style.display = isMascotsEnabled ? '' : 'none';

  }

  function toggleDragonAction() {

    playSound('toggle');

    isDragonEnabled = !isDragonEnabled;

    localStorage.setItem('portfolio_dragon_active', isDragonEnabled);

    applyDragonState();

  }

  function toggleMascotsAction() {

    playSound('toggle');

    isMascotsEnabled = !isMascotsEnabled;

    localStorage.setItem('portfolio_mascots_active', isMascotsEnabled);

    applyMascotsState();

  }

  const rowToggleDragon = document.getElementById('rowToggleDragon');

  const rowToggleMascots = document.getElementById('rowToggleMascots');

  if (btnToggleDragon) {

    btnToggleDragon.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleDragonAction();

    });

  }

  if (rowToggleDragon) {

    rowToggleDragon.addEventListener('click', (e) => {

      if (e.target !== btnToggleDragon && !btnToggleDragon.contains(e.target)) {

        toggleDragonAction();

      }

    });

  }

  if (btnToggleMascots) {

    btnToggleMascots.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleMascotsAction();

    });

  }

  if (rowToggleMascots) {

    rowToggleMascots.addEventListener('click', (e) => {

      if (e.target !== btnToggleMascots && !btnToggleMascots.contains(e.target)) {

        toggleMascotsAction();

      }

    });

  }

  // Sound Effects Switch

  const btnToggleSound = document.getElementById('btnToggleSound');

  const rowToggleSound = document.getElementById('rowToggleSound');

  function updateSoundSwitchUI() {

    setSwitchUI(btnToggleSound, isSoundEnabled);

    if (soundToggle) {

      soundToggle.classList.toggle('muted', !isSoundEnabled);

    }

    if (isl) {

      isl.classList.toggle('muted', !isSoundEnabled);

    }

  }

  function toggleSoundAction() {

    isSoundEnabled = !isSoundEnabled;

    updateSoundSwitchUI();

    if (isSoundEnabled) {

      playSound('blip');

    }

  }

  if (btnToggleSound) {

    btnToggleSound.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleSoundAction();

    });

  }

  if (rowToggleSound) {

    rowToggleSound.addEventListener('click', (e) => {

      if (e.target !== btnToggleSound && !btnToggleSound.contains(e.target)) {

        toggleSoundAction();

      }

    });

  }

  // Dark Mode Switch (Appearance Tab)

  const btnToggleTheme = document.getElementById('btnToggleTheme');

  const rowToggleTheme = document.getElementById('rowToggleTheme');

  function updateThemeSwitchUI() {

    const isNight = document.body.classList.contains('theme-night');

    setSwitchUI(btnToggleTheme, isNight);

  }

  function toggleThemeAction() {

    playSound('toggle');

    const isCurrentlyNight = document.body.classList.contains('theme-night');

    const nextTheme = isCurrentlyNight ? 'day' : 'night';

    setTheme(nextTheme);

    updateThemeSwitchUI();

  }

  if (btnToggleTheme) {

    btnToggleTheme.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleThemeAction();

    });

  }

  if (rowToggleTheme) {

    rowToggleTheme.addEventListener('click', (e) => {

      if (e.target !== btnToggleTheme && !btnToggleTheme.contains(e.target)) {

        toggleThemeAction();

      }

    });

  }

  // Star Particles Switch (Appearance Tab)

  const btnToggleParticles = document.getElementById('btnToggleParticles');

  const rowToggleParticles = document.getElementById('rowToggleParticles');

  function toggleParticlesAction() {

    playSound('toggle');

    isParticlesEnabled = !isParticlesEnabled;

    localStorage.setItem('rfm_particles_active', isParticlesEnabled);

    setSwitchUI(btnToggleParticles, isParticlesEnabled);

    const starsLayer = document.querySelector('.stars-layer, .sky-stars, #stars');

    if (starsLayer) {

      starsLayer.style.display = isParticlesEnabled ? '' : 'none';

    }

  }

  if (btnToggleParticles) {

    btnToggleParticles.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleParticlesAction();

    });

  }

  if (rowToggleParticles) {

    rowToggleParticles.addEventListener('click', (e) => {

      if (e.target !== btnToggleParticles && !btnToggleParticles.contains(e.target)) {

        toggleParticlesAction();

      }

    });

  }

  // Settings Modal Opacity Slider (Appearance Tab)

  const settingModalOpacity = document.getElementById('settingModalOpacity');

  const modalOpacityVal = document.getElementById('modalOpacityVal');

  let savedModalOpacity = parseInt(localStorage.getItem('rfm_modal_opacity') || '100', 10);

  function applyModalOpacity(val) {

    const modalDialog = document.getElementById('settingsModalDialog');

    if (modalDialog) {

      modalDialog.style.opacity = (val / 100);

    }

    if (modalOpacityVal) {

      modalOpacityVal.textContent = val + '%';

    }

    if (settingModalOpacity) {

      settingModalOpacity.value = val;

    }

  }

  if (settingModalOpacity) {

    settingModalOpacity.addEventListener('input', () => {

      applyModalOpacity(settingModalOpacity.value);

    });

  }

  // Toast Banner Notification Switch (Notifications Tab)

  const btnToggleToast = document.getElementById('btnToggleToast');

  const rowToggleToast = document.getElementById('rowToggleToast');

  function toggleToastAction() {

    playSound('toggle');

    isToastEnabled = !isToastEnabled;

    localStorage.setItem('rfm_toast_enabled', isToastEnabled);

    setSwitchUI(btnToggleToast, isToastEnabled);

    if (!isToastEnabled && pixelToast) {

      pixelToast.classList.remove('show');

    }

  }

  if (btnToggleToast) {

    btnToggleToast.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleToastAction();

    });

  }

  if (rowToggleToast) {

    rowToggleToast.addEventListener('click', (e) => {

      if (e.target !== btnToggleToast && !btnToggleToast.contains(e.target)) {

        toggleToastAction();

      }

    });

  }

  // Toast Audio Switch (Notifications Tab)

  const btnToggleToastAudio = document.getElementById('btnToggleToastAudio');

  const rowToggleToastAudio = document.getElementById('rowToggleToastAudio');

  function toggleToastAudioAction() {

    playSound('toggle');

    isToastAudioEnabled = !isToastAudioEnabled;

    localStorage.setItem('rfm_toast_sound', isToastAudioEnabled);

    setSwitchUI(btnToggleToastAudio, isToastAudioEnabled);

  }

  if (btnToggleToastAudio) {

    btnToggleToastAudio.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleToastAudioAction();

    });

  }

  if (rowToggleToastAudio) {

    rowToggleToastAudio.addEventListener('click', (e) => {

      if (e.target !== btnToggleToastAudio && !btnToggleToastAudio.contains(e.target)) {

        toggleToastAudioAction();

      }

    });

  }

  // -------------------------------------------------------------------------

  // Language & Translation System (i18n)

  // -------------------------------------------------------------------------

  const i18n = {

    id: {

      navHome: 'Home',

      navAbout: 'About',

      navEducation: 'Education',

      navProjects: 'Projects',

      navCertificates: 'Sertifikat',

      navGallery: 'Gallery',

      navComments: 'Comments',

      navContact: 'Contact',

      settingsTitle: '✦ PENGATURAN ✦',

      settingsSub: 'Sesuaikan preferensi kerajaan untuk pengalaman terbaik.',

      tabGeneral: 'Umum',

      tabAppearance: 'Tampilan',

      tabAudio: 'Musik & Audio',

      tabNotifications: 'Notifikasi',

      labelLanguage: 'Bahasa',

      labelDarkMode: '🌙 Mode Gelap (Dark Mode)',

      subDarkMode: 'Beralih antara malam kastil berbintang dan siang hari.',

      labelDragon: '🐉 Kursor Naga (Dragon Cursor)',

      subDragon: 'Efek naga terbang & semburan api pada kursor mouse.',

      labelMascots: '🛡️ Penjaga Kastil (Castle Mascots)',

      subMascots: 'Karakter pixel prajurit & penyihir di pojok layar.',

      labelParticles: '✨ Bintang Kelap-Kelip',

      subParticles: 'Efek partikel kelap-kelip di langit malam.',

      labelOpacity: '📜 Transparansi Kertas Pengaturan',

      subOpacity: 'Turunkan transparansi agar kamu bisa melihat kastil di balik gulungan pengaturan.',

      labelBgm: '🎵 Musik Latar Kerajaan (BGM)',

      subBgm: 'Putar alunan instrumen musik saat menjelajahi portofolio.',

      labelTrack: 'Pilihan Lagu / Musik',

      labelShuffle: '🔀 Acak Lagu (Shuffle Mode)',

      subShuffle: 'Putar lagu berikutnya secara acak otomatis dari daftar lagu.',

      btnShuffleNow: '🎲 Acak Lagu Sekarang',

      previewTitle: '🎧 Pratinjau Lagu',

      btnPreviewPlay: 'Play Preview',

      labelVolume: '🔊 Volume Musik:',

      labelSfx: '🔊 Efek Suara (SFX)',

      subSfx: 'Efek suara tombol, gulungan, dan interaksi 8-bit.',

      btnTestSfx: '🔔 Uji Efek Suara (SFX)',

      labelToast: '💬 Notifikasi Banner (Toast Popup)',

      subToast: 'Tampilkan pesan pop-up informasi di bagian atas layar.',

      labelToastAudio: '🔔 Lonceng Notifikasi',

      subToastAudio: 'Bunyikan lonceng setiap kali notifikasi toast muncul.',

      saveChanges: 'Simpan Perubahan',

      savedToast: '💾 Pengaturan berhasil disimpan!'

    },

    en: {

      navHome: 'Home',

      navAbout: 'About',

      navEducation: 'Education',

      navProjects: 'Projects',

      navCertificates: 'Certificates',

      navGallery: 'Gallery',

      navComments: 'Comments',

      navContact: 'Contact',

      settingsTitle: '✦ SETTINGS ✦',

      settingsSub: 'Adjust your kingdom preferences for the best experience.',

      tabGeneral: 'General',

      tabAppearance: 'Appearance',

      tabAudio: 'Music & Audio',

      tabNotifications: 'Notifications',

      labelLanguage: 'Language',

      labelDarkMode: '🌙 Dark Mode',

      subDarkMode: 'Switch between starry castle night and daylight mode.',

      labelDragon: '🐉 Dragon Cursor',

      subDragon: 'Flying dragon & flame burst effects on your mouse cursor.',

      labelMascots: '🛡️ Castle Mascots',

      subMascots: 'Pixel knights & wizards guarding screen corners.',

      labelParticles: '✨ Twinkling Stars',

      subParticles: 'Twinkling star particle effects in the night sky.',

      labelOpacity: '📜 Settings Scroll Transparency',

      subOpacity: 'Lower opacity to see the castle background behind the settings scroll.',

      labelBgm: '🎵 Background Music (BGM)',

      subBgm: 'Play instrumental melodies while exploring the portfolio.',

      labelTrack: 'Select Track / Music',

      labelShuffle: '🔀 Shuffle Mode',

      subShuffle: 'Automatically play next track randomly from the playlist.',

      btnShuffleNow: '🎲 Shuffle Track Now',

      previewTitle: '🎧 Track Preview',

      btnPreviewPlay: 'Play Preview',

      labelVolume: '🔊 Music Volume:',

      labelSfx: '🔊 Sound Effects (SFX)',

      subSfx: 'Button clicks, parchment rolls, and 8-bit interaction sounds.',

      btnTestSfx: '🔔 Test Sound Effects (SFX)',

      labelToast: '💬 Banner Notifications (Toast Popup)',

      subToast: 'Display informational pop-up banners at top of screen.',

      labelToastAudio: '🔔 Notification Chime',

      subToastAudio: 'Play chime sound whenever a toast notification appears.',

      saveChanges: 'Save Changes',

      savedToast: '💾 Settings saved successfully!'

    }

  };

  const settingLanguage = document.getElementById('settingLanguage');

  function applyLanguage(lang) {

    const currentLang = (lang === 'en') ? 'en' : 'id';

    const dict = i18n[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(el => {

      const key = el.getAttribute('data-i18n');

      if (dict[key]) {

        el.textContent = dict[key];

      }

    });

    if (settingLanguage) {

      settingLanguage.value = currentLang;

    }

    localStorage.setItem('rfm_language', currentLang);

    document.documentElement.lang = currentLang;

  }

  const savedLang = localStorage.getItem('rfm_language') || 'id';

  applyLanguage(savedLang);

  if (settingLanguage) {

    settingLanguage.value = savedLang;

    settingLanguage.addEventListener('change', () => {

      playSound('blip');

      applyLanguage(settingLanguage.value);

    });

  }

  // -------------------------------------------------------------------------

  // Music & Audio Management & Preview Player

  // -------------------------------------------------------------------------

  const bgmAudio = document.getElementById('bgmAudio');

  const previewAudio = document.getElementById('previewAudio');

  const btnToggleBgm = document.getElementById('btnToggleBgm');

  const rowToggleBgm = document.getElementById('rowToggleBgm');

  const settingBgmTrack = document.getElementById('settingBgmTrack');

  const btnPreviewPlay = document.getElementById('btnPreviewPlay');

  const previewPlayIcon = document.getElementById('previewPlayIcon');

  const previewPlayLabel = document.getElementById('previewPlayLabel');

  const previewProgressBar = document.getElementById('previewProgressBar');

  const previewCurrentTime = document.getElementById('previewCurrentTime');

  const previewDuration = document.getElementById('previewDuration');

  const settingBgmVolume = document.getElementById('settingBgmVolume');

  const bgmVolumeVal = document.getElementById('bgmVolumeVal');

  const previewTrackTitle = document.getElementById('previewTrackTitle');

  const previewStatusText = document.getElementById('previewStatusText');

  const btnToggleSfx = document.getElementById('btnToggleSfx');

  const rowToggleSfx = document.getElementById('rowToggleSfx');

  const btnTestSfx = document.getElementById('btnTestSfx');

  // Default BGM aktif (true) memutar Music 5 saat pertama kali masuk web

  let isBgmActive = true;

  let savedBgmTrack = 'Assets/music/music 5.mp3';

  // Jika belum ada preferensi khusus yang disimpan manual oleh pengguna di menu pengaturan, selalu default ke Music 5

  if (localStorage.getItem('rfm_bgm_track_custom') !== 'true') {

    isBgmActive = true;

    savedBgmTrack = 'Assets/music/music 5.mp3';

    try {

      localStorage.setItem('rfm_bgm_active', 'true');

      localStorage.setItem('rfm_bgm_track', 'Assets/music/music 5.mp3');

      localStorage.setItem('rfm_bgm_track_default_v5', 'applied');

    } catch (e) {}

  } else {

    isBgmActive = localStorage.getItem('rfm_bgm_active') !== 'false';

    savedBgmTrack = localStorage.getItem('rfm_bgm_track') || 'Assets/music/music 5.mp3';

    if (!savedBgmTrack.includes('music') || savedBgmTrack.includes('Audio')) {

      savedBgmTrack = 'Assets/music/music 5.mp3';

    }

  }

  let savedBgmVolume = parseInt(localStorage.getItem('rfm_bgm_volume') || '70', 10);

  let isPreviewPlaying = false;

  let synthPreviewTimer = null;

  let synthGainNode = null;

  let wasBgmPlayingBeforePreview = false;

  const trackTitles = {

    'Assets/music/music 1.mp3': 'Music 1',

    'Assets/music/music 2.mp3': 'Music 2',

    'Assets/music/music 3.mp3': 'Music 3',

    'Assets/music/music 4.mp4': 'Music 4',

    'Assets/music/music 5.mp3': 'Music 5'

  };

  function formatAudioTime(seconds) {

    if (isNaN(seconds) || seconds < 0) return '0:00';

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return mins + ':' + (secs < 10 ? '0' : '') + secs;

  }

  // Update preview title based on selected dropdown

  function updatePreviewTitle() {

    if (!settingBgmTrack || !previewTrackTitle) return;

    const trackVal = settingBgmTrack.value;

    previewTrackTitle.textContent = trackTitles[trackVal] || 'Lagu Pilihan';

  }

  // Procedural Synth Melody for Preview/BGM

  function playSynthMelody(type = 'tavern', volume = 0.5) {

    initAudio();

    if (!audioCtx) return;

    if (synthGainNode) {

      try { synthGainNode.disconnect(); } catch (e) {}

    }

    synthGainNode = audioCtx.createGain();

    synthGainNode.gain.setValueAtTime(volume * 0.12, audioCtx.currentTime);

    synthGainNode.connect(audioCtx.destination);

    let notes = [293.66, 329.63, 349.23, 392.00, 440.00, 523.25, 587.33]; // D Dorian

    if (type === 'peaceful') {

      notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C Pentatonic

    } else if (type === 'adventure') {

      notes = [329.63, 392.00, 440.00, 493.88, 587.33, 659.25]; // E Minor Fanfare

    }

    let noteIdx = 0;

    const tempo = type === 'peaceful' ? 420 : (type === 'adventure' ? 240 : 300);

    function step() {

      if (!isPreviewPlaying && (!isBgmActive || !settingBgmTrack.value.startsWith('synth:'))) return;

      try {

        const osc = audioCtx.createOscillator();

        const noteGain = audioCtx.createGain();

        osc.type = type === 'peaceful' ? 'sine' : (type === 'adventure' ? 'square' : 'triangle');

        const freq = notes[noteIdx % notes.length];

        noteIdx++;

        const now = audioCtx.currentTime;

        osc.frequency.setValueAtTime(freq, now);

        noteGain.gain.setValueAtTime(0.08, now);

        noteGain.gain.exponentialRampToValueAtTime(0.001, now + (tempo / 1000) * 0.85);

        osc.connect(noteGain);

        noteGain.connect(synthGainNode);

        osc.start(now);

        osc.stop(now + (tempo / 1000) * 0.9);

      } catch (e) {}

      synthPreviewTimer = setTimeout(step, tempo);

    }

    step();

  }

  function stopSynthMelody() {

    if (synthPreviewTimer) {

      clearTimeout(synthPreviewTimer);

      synthPreviewTimer = null;

    }

    if (synthGainNode) {

      try { synthGainNode.disconnect(); } catch (e) {}

      synthGainNode = null;

    }

  }

  // Audio Preview Logic

  function startAudioPreview() {

    initAudio();

    stopAudioPreview(false);

    // Jeda sementara BGM utama agar preview terdengar jelas

    if (bgmAudio && !bgmAudio.paused) {

      wasBgmPlayingBeforePreview = true;

      bgmAudio.pause();

    }

    const selectedTrack = settingBgmTrack ? settingBgmTrack.value : 'Assets/music/music 1.mp3';

    const volume = settingBgmVolume ? parseInt(settingBgmVolume.value, 10) : 70;

    isPreviewPlaying = true;

    if (btnPreviewPlay) {

      btnPreviewPlay.classList.add('playing');

      if (previewPlayIcon) previewPlayIcon.textContent = '⏸';

      if (previewPlayLabel) previewPlayLabel.textContent = 'Pause Preview';

    }

    if (previewStatusText) {

      previewStatusText.textContent = 'Sedang memutar preview...';

      previewStatusText.style.color = '#1b4a25';

    }

    if (selectedTrack.startsWith('synth:')) {

      const synthType = selectedTrack.replace('synth:', '');

      playSynthMelody(synthType, volume / 100);

      if (previewDuration) previewDuration.textContent = 'Looping';

      if (previewCurrentTime) previewCurrentTime.textContent = 'Synth';

    } else {

      if (previewAudio) {

        previewAudio.src = selectedTrack;

        previewAudio.volume = volume / 100;

        previewAudio.play().catch(err => {

          console.warn('Preview play warning:', err);

          if (previewStatusText) previewStatusText.textContent = 'Gagal memutar (klik untuk izin audio)';

        });

      }

    }

  }

  function stopAudioPreview(resumeBgm = true) {

    isPreviewPlaying = false;

    stopSynthMelody();

    if (previewAudio) {

      previewAudio.pause();

      previewAudio.currentTime = 0;

    }

    if (btnPreviewPlay) {

      btnPreviewPlay.classList.remove('playing');

      if (previewPlayIcon) previewPlayIcon.textContent = '▶';

      if (previewPlayLabel) previewPlayLabel.textContent = 'Play Preview';

    }

    if (previewProgressBar) previewProgressBar.value = 0;

    if (previewCurrentTime) previewCurrentTime.textContent = '0:00';

    if (previewStatusText) {

      previewStatusText.textContent = 'Siap diputar';

      previewStatusText.style.color = '';

    }

    // Lanjutkan BGM jika sebelumnya sempat dijeda oleh preview

    if (resumeBgm && wasBgmPlayingBeforePreview && isBgmActive && bgmAudio && bgmAudio.paused) {

      wasBgmPlayingBeforePreview = false;

      bgmAudio.play().catch(() => {});

    }

  }

  // Preview Play Button click

  if (btnPreviewPlay) {

    btnPreviewPlay.addEventListener('click', (e) => {

      e.stopPropagation();

      if (isShuffleEnabled) return;

      playSound('click');

      if (isPreviewPlaying) {

        stopAudioPreview();

      } else {

        startAudioPreview();

      }

    });

  }

  // Preview Audio events

  if (previewAudio) {

    previewAudio.addEventListener('timeupdate', () => {

      if (!isPreviewPlaying) return;

      if (previewAudio.duration) {

        const percent = (previewAudio.currentTime / previewAudio.duration) * 100;

        if (previewProgressBar) previewProgressBar.value = percent;

        if (previewCurrentTime) previewCurrentTime.textContent = formatAudioTime(previewAudio.currentTime);

      }

    });

    previewAudio.addEventListener('loadedmetadata', () => {

      if (previewDuration) previewDuration.textContent = formatAudioTime(previewAudio.duration);

    });

    previewAudio.addEventListener('ended', () => {

      stopAudioPreview();

    });

  }

  // Seek bar input

  if (previewProgressBar) {

    previewProgressBar.addEventListener('input', () => {

      if (isShuffleEnabled) return;

      if (previewAudio && previewAudio.duration) {

        previewAudio.currentTime = (previewProgressBar.value / 100) * previewAudio.duration;

      }

    });

  }

  // Volume slider input

  if (settingBgmVolume) {

    settingBgmVolume.addEventListener('input', () => {

      const vol = parseInt(settingBgmVolume.value, 10);

      if (bgmVolumeVal) bgmVolumeVal.textContent = vol + '%';

      if (previewAudio) previewAudio.volume = vol / 100;

      if (bgmAudio) bgmAudio.volume = vol / 100;

      if (synthGainNode && audioCtx) {

        synthGainNode.gain.setValueAtTime((vol / 100) * 0.12, audioCtx.currentTime);

      }

    });

  }

  // Track select dropdown change

  if (settingBgmTrack) {

    settingBgmTrack.addEventListener('change', () => {

      if (isShuffleEnabled) return;

      updatePreviewTitle();

      playSound('blip');

      if (isPreviewPlaying) {

        startAudioPreview();

      }

    });

  }

  // All available background tracks for shuffle

  const allTracks = [

    'Assets/music/music 1.mp3',

    'Assets/music/music 2.mp3',

    'Assets/music/music 3.mp3',

    'Assets/music/music 4.mp4',

    'Assets/music/music 5.mp3'

  ];

  let isShuffleEnabled = localStorage.getItem('rfm_bgm_shuffle') === 'true';

  const btnToggleShuffle = document.getElementById('btnToggleShuffle');

  const rowToggleShuffle = document.getElementById('rowToggleShuffle');

  const btnShuffleNow = document.getElementById('btnShuffleNow');

  // Update visual state and interactivity of track dropdown & preview card when Shuffle Mode is on/off

  function updateShuffleDependencies() {

    const groupTrackSelect = document.getElementById('groupTrackSelect');

    const audioPreviewCard = document.getElementById('audioPreviewCard');

    const trackSelectElem = document.getElementById('settingBgmTrack');

    if (isShuffleEnabled) {

      // Hentikan pratinjau audio jika sedang berjalan

      stopAudioPreview(false);

      if (groupTrackSelect) {

        groupTrackSelect.classList.add('control-disabled');

      }

      if (audioPreviewCard) {

        audioPreviewCard.classList.add('control-disabled');

      }

      if (trackSelectElem) {

        trackSelectElem.disabled = true;

      }

      if (previewStatusText) {

        previewStatusText.textContent = 'Nonaktif (Mode Acak aktif)';

      }

    } else {

      if (groupTrackSelect) {

        groupTrackSelect.classList.remove('control-disabled');

      }

      if (audioPreviewCard) {

        audioPreviewCard.classList.remove('control-disabled');

      }

      if (trackSelectElem) {

        trackSelectElem.disabled = false;

      }

      if (previewStatusText && !isPreviewPlaying) {

        previewStatusText.textContent = 'Siap diputar';

      }

    }

  }

  function getRandomTrack(exclude) {

    const pool = allTracks.filter(t => t !== exclude);

    if (pool.length === 0) return allTracks[0];

    const randomIndex = Math.floor(Math.random() * pool.length);

    return pool[randomIndex];

  }

  function toggleShuffleAction() {

    playSound('toggle');

    isShuffleEnabled = !isShuffleEnabled;

    localStorage.setItem('rfm_bgm_shuffle', isShuffleEnabled);

    setSwitchUI(btnToggleShuffle, isShuffleEnabled);

    if (bgmAudio) {

      bgmAudio.loop = !isShuffleEnabled;

    }

    updateShuffleDependencies();

  }

  if (btnToggleShuffle) {

    btnToggleShuffle.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleShuffleAction();

    });

  }

  if (rowToggleShuffle) {

    rowToggleShuffle.addEventListener('click', (e) => {

      if (e.target !== btnToggleShuffle && !btnToggleShuffle.contains(e.target)) {

        toggleShuffleAction();

      }

    });

  }

  function pickRandomTrackNow() {

    playSound('click');

    const newTrack = getRandomTrack(settingBgmTrack ? settingBgmTrack.value : savedBgmTrack);

    if (settingBgmTrack) {

      settingBgmTrack.value = newTrack;

      updatePreviewTitle();

    }

    if (isPreviewPlaying) {

      startAudioPreview();

    } else if (isBgmActive) {

      savedBgmTrack = newTrack;

      localStorage.setItem('rfm_bgm_track', savedBgmTrack);

      applyBgmState(true);

    }

  }

  if (btnShuffleNow) {

    btnShuffleNow.addEventListener('click', (e) => {

      e.stopPropagation();

      pickRandomTrackNow();

    });

  }

  // Toggle BGM Action

  function toggleBgmAction() {

    playSound('toggle');

    isBgmActive = !isBgmActive;

    setSwitchUI(btnToggleBgm, isBgmActive);

  }

  if (btnToggleBgm) {

    btnToggleBgm.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleBgmAction();

    });

  }

  if (rowToggleBgm) {

    rowToggleBgm.addEventListener('click', (e) => {

      if (e.target !== btnToggleBgm && !btnToggleBgm.contains(e.target)) {

        toggleBgmAction();

      }

    });

  }

  // SFX Toggle Action

  function toggleSfxAction() {

    toggleSoundAction();

    setSwitchUI(btnToggleSfx, isSoundEnabled);

  }

  if (btnToggleSfx) {

    btnToggleSfx.addEventListener('click', (e) => {

      e.stopPropagation();

      toggleSfxAction();

    });

  }

  if (rowToggleSfx) {

    rowToggleSfx.addEventListener('click', (e) => {

      if (e.target !== btnToggleSfx && !btnToggleSfx.contains(e.target)) {

        toggleSfxAction();

      }

    });

  }

  // Test SFX Button

  if (btnTestSfx) {

    btnTestSfx.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('victory');

    });

  }

  // Track ended handler: loop current or pick next random track

  if (bgmAudio) {

    bgmAudio.addEventListener('ended', () => {

      if (isShuffleEnabled) {

        const nextTrack = getRandomTrack(savedBgmTrack);

        savedBgmTrack = nextTrack;

        localStorage.setItem('rfm_bgm_track', savedBgmTrack);

        if (settingBgmTrack) {

          settingBgmTrack.value = savedBgmTrack;

          updatePreviewTitle();

        }

        applyBgmState(true);

      } else {

        bgmAudio.currentTime = 0;

        bgmAudio.play().catch(() => {});

      }

    });

  }

  // Helper untuk memulai pemutaran BGM dengan penanganan promise yang tepat

  function startBgmPlayback() {

    if (!isBgmActive || !bgmAudio || savedBgmTrack.startsWith('synth:')) return;

    if (!bgmAudio.src || !decodeURIComponent(bgmAudio.src).endsWith(savedBgmTrack)) {

      bgmAudio.src = savedBgmTrack;

    }

    bgmAudio.volume = savedBgmVolume / 100;

    bgmAudio.loop = !isShuffleEnabled;

    const playPromise = bgmAudio.play();

    if (playPromise !== undefined) {

      playPromise.then(() => {

        // Berhasil diputar! Lepas listener interaksi unlocker

        removeAudioUnlockListeners();

      }).catch(err => {

        // Browser menahan autoplay sebelum ada interaksi sah. Listener tetap aktif.

      });

    }

  }

  // Apply Background Music on Page

  function applyBgmState(forceRestart = false) {

    if (!bgmAudio) return;

    if (isBgmActive) {

      if (!savedBgmTrack.startsWith('synth:')) {

        bgmAudio.volume = savedBgmVolume / 100;

        bgmAudio.loop = !isShuffleEnabled;

        const currentSrc = bgmAudio.src ? decodeURIComponent(bgmAudio.src).replace(/\\/g, '/') : '';

        const isSameTrack = currentSrc.endsWith(savedBgmTrack);

        // Hanya muat ulang src dan restart jika lagu diubah atau belum ada src

        if (forceRestart || !isSameTrack || !bgmAudio.src) {

          bgmAudio.src = savedBgmTrack;

        }

        // Coba putar langsung

        startBgmPlayback();

      }

    } else {

      bgmAudio.pause();

    }

  }

  // Event interaksi pengguna yang sah menurut kebijakan autoplay browser (Chrome, Edge, Safari, Firefox)

  const audioActivationEvents = ['click', 'pointerdown', 'mousedown', 'keydown', 'touchstart'];

  function handleAudioUnlockInteraction() {

    if (isBgmActive && bgmAudio && bgmAudio.paused) {

      startBgmPlayback();

    }

  }

  function removeAudioUnlockListeners() {

    audioActivationEvents.forEach(evt => {

      window.removeEventListener(evt, handleAudioUnlockInteraction, true);

      document.removeEventListener(evt, handleAudioUnlockInteraction, true);

    });

  }

  // Pasang listener pada fase capture agar terpanggil bahkan sebelum event bubbling dihentikan

  audioActivationEvents.forEach(evt => {

    window.addEventListener(evt, handleAudioUnlockInteraction, { capture: true, passive: true });

    document.addEventListener(evt, handleAudioUnlockInteraction, { capture: true, passive: true });

  });

  // Save Changes Button

  if (btnSaveSettings) {

    btnSaveSettings.addEventListener('click', (e) => {

      e.stopPropagation();

      const prevBgmTrack = savedBgmTrack;

      const prevBgmActive = localStorage.getItem('rfm_bgm_active') === 'true';

      // Hentikan preview jika sedang jalan

      stopAudioPreview(false);

      // Save Opacity

      if (settingModalOpacity) {

        savedModalOpacity = parseInt(settingModalOpacity.value, 10);

        localStorage.setItem('rfm_modal_opacity', savedModalOpacity);

      }

      // Save Language

      if (settingLanguage) {

        applyLanguage(settingLanguage.value);

      }

      // Commit Audio & Music Preferences

      if (settingBgmTrack) {

        savedBgmTrack = settingBgmTrack.value;

        localStorage.setItem('rfm_bgm_track', savedBgmTrack);

        localStorage.setItem('rfm_bgm_track_custom', 'true');

      }

      if (settingBgmVolume) {

        savedBgmVolume = parseInt(settingBgmVolume.value, 10);

        localStorage.setItem('rfm_bgm_volume', savedBgmVolume);

      }

      localStorage.setItem('rfm_bgm_active', isBgmActive);

      localStorage.setItem('rfm_bgm_shuffle', isShuffleEnabled);

      // Cek apakah lagunya diganti atau baru saja diaktifkan dari kondisi mati

      const trackChanged = (prevBgmTrack !== savedBgmTrack);

      const becameActive = (!prevBgmActive && isBgmActive);

      // Terapkan musik: jika lagu tidak diubah, audio tetap mengalun tanpa jeda/restart

      applyBgmState(trackChanged || becameActive);

      wasBgmPlayingBeforePreview = false;

      playSound('victory');

      const currentLang = localStorage.getItem('rfm_language') || 'id';

      showToast(i18n[currentLang] ? i18n[currentLang].savedToast : '💾 Pengaturan berhasil disimpan!');

      setTimeout(() => {

        closeSettingsModal();

      }, 500);

    });

  }

  // Synchronize all settings UI elements with stored state

  function syncAllSettingsUI() {

    updateDragonSwitchUI();

    updateMascotsSwitchUI();

    updateSoundSwitchUI();

    updateThemeSwitchUI();

    setSwitchUI(btnToggleParticles, isParticlesEnabled);

    setSwitchUI(btnToggleToast, isToastEnabled);

    setSwitchUI(btnToggleToastAudio, isToastAudioEnabled);

    setSwitchUI(btnToggleBgm, isBgmActive);

    setSwitchUI(btnToggleShuffle, isShuffleEnabled);

    setSwitchUI(btnToggleSfx, isSoundEnabled);

    applyModalOpacity(savedModalOpacity);

    updateShuffleDependencies();

    if (settingBgmTrack) {

      if (!trackTitles[savedBgmTrack]) {

        savedBgmTrack = 'Assets/music/music 5.mp3';

        localStorage.setItem('rfm_bgm_track', savedBgmTrack);

      }

      settingBgmTrack.value = savedBgmTrack;

      updatePreviewTitle();

    }

    if (settingBgmVolume) {

      settingBgmVolume.value = savedBgmVolume;

      if (bgmVolumeVal) bgmVolumeVal.textContent = savedBgmVolume + '%';

    }

  }

  // Terapkan preferensi awal yang tersimpan

  applyDragonState();

  applyMascotsState();

  applyBgmState();

  applyModalOpacity(savedModalOpacity);

  syncAllSettingsUI();

  // -------------------------------------------------------------------------

  // 12. Castle Mascot Characters & Flying Dragon Cursor

  // -------------------------------------------------------------------------

  const charA = document.getElementById('a');

  const charB = document.getElementById('b');

  let mascotA = null;

  let mascotB = null;

  let recoilT = 0;

  function recoil(x, y) {

    const n = performance.now();

    if (n - recoilT < 500) return;

    recoilT = n;

    if (typeof playSound === 'function') playSound('blip');

    const dr = document.getElementById('dragon');

    if (dr) {

      dr.classList.add('recoil');

      setTimeout(() => dr.classList.remove('recoil'), 300);

    }

    const s = document.createElement('span');

    s.className = 'fire';

    s.textContent = '✦';

    s.style.cssText = 'left:' + (x - 14) + 'px;top:' + (y - 14) + 'px;color:#ffd84a;--dx:' + randNum(-30, 30) + 'px;';

    document.body.appendChild(s);

    setTimeout(() => s.remove(), 900);

  }

  if (charA && charB) {

    // Mascot A adalah ksatria gagah pemberani (brave = true) yang siap menghunus pedang jika didekati naga terus menerus

    mascotA = new Mascot(charA, 'Salam, Tuan!', true);

    // Mascot B adalah penyihir ramah (brave = false)

    mascotB = new Mascot(charB, 'Salam, Puan!', false);

    window.addEventListener('pointermove', e => {

      if (!isMascotsEnabled || !isDragonEnabled) return;

      if (e.pointerType !== 'mouse') return;

      for (const m of [mascotA, mascotB]) {

        if (!m || !m.el) continue;

        const r = m.el.getBoundingClientRect();

        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));

        if (m.fighting) {

          const L = e.clientX < r.left + r.width / 2;

          m.el.classList.toggle('look-l', L);

          m.el.classList.toggle('look-r', !L);

          if (d < 160) recoil(e.clientX, e.clientY);

        } else if (d < 160) {

          m.flee(e.clientX);

        }

      }

    });

    setTimeout(() => mascotA && isMascotsEnabled && mascotA.say('Salam, Tuan!', 2800), 1000);

    setTimeout(() => mascotB && isMascotsEnabled && mascotB.say('Selamat datang!', 2200), 2200);

  }

  // Flying Dragon Cursor (Desktop / Mouse Pointer)

  if (window.matchMedia('(pointer:fine)').matches) {

    const dr = document.getElementById('dragon');

    if (dr) {

      const di = dr.querySelector('i');

      let tx = 0, ty = 0, x = 0, y = 0, shown = false, face = 1;

      window.addEventListener('pointermove', e => {

        if (!isDragonEnabled) return;

        if (e.pointerType !== 'mouse') return;

        if (!shown) {

          shown = true;

          x = tx = e.clientX;

          y = ty = e.clientY;

          dr.style.display = 'block';

        }

        if (Math.abs(e.clientX - tx) > 2) {

          face = e.clientX > tx ? -1 : 1;

        }

        tx = e.clientX;

        ty = e.clientY;

        if (di) di.style.transform = 'scaleX(' + face + ')';

      });

      window.addEventListener('pointerdown', e => {

        if (!isDragonEnabled) return;

        if (e.pointerType !== 'mouse') return;

        playSound('fire');

        requestAnimationFrame(() => {

          for (let i = 0; i < 5; i++) {

            const f = document.createElement('span');

            f.className = 'fire';

            f.textContent = '🔥';

            f.style.left = (e.clientX + (face === 1 ? -16 : 16) + randNum(-8, 8)) + 'px';

            f.style.top = (e.clientY - 30 + randNum(-10, 10)) + 'px';

            f.style.setProperty('--dx', ((-face) * randNum(30, 80)) + 'px');

            f.style.animationDelay = (i * 40) + 'ms';

            document.body.appendChild(f);

            setTimeout(() => f.remove(), 800 + i * 40);

          }

        });

      });

      document.addEventListener('mouseleave', () => {

        dr.style.display = 'none';

        shown = false;

      });

      (function tick() {

        if (isDragonEnabled) {

          x += (tx - x) * 0.25;

          y += (ty - y) * 0.25;

          // Naga berukuran besar melayang megah di atas kursor

          const offsetX = face === 1 ? 18 : -170;

          const offsetY = -80;

          dr.style.transform = 'translate(' + (x + offsetX) + 'px,' + (y + offsetY) + 'px)';

        }

        requestAnimationFrame(tick);

      })();

    }

  }

  // -------------------------------------------------------------------------

  // 3D Medieval Tome: Riwayat Pendidikan (Grimoire Semanggi 5 Reference)

  // -------------------------------------------------------------------------

  const eduStage = document.getElementById('eduStage');

  const bookCover = document.getElementById('cover');

  const bookEl = document.getElementById('book');

  const backCover = document.getElementById('back');

  if (bookCover && bookEl && backCover) {

    const DATA = [

      {

        y: "2014 – 2020",

        n: "SDN 161 SUKAPURA",

        l: "Sekolah Dasar",

        d: "Menyelesaikan pendidikan dasar dan membangun dasar ilmu pengetahuan serta karakter diri yang kuat.",

        b: [

          "Belajar membaca, menulis, dan berhitung",

          "Mulai mengenal teman dan lingkungan sekolah",

          "Aktif dalam kegiatan pramuka dan minat belajar"

        ],

        q: "“Pendidikan adalah pintu menuju masa depan yang lebih baik.”",

        img: "Assets/Images/SDN-161-sukapura.png"

      },

      {

        y: "2020 – 2023",

        n: "MTSN 2 KOTA BANDUNG",

        l: "Sekolah Menengah Pertama",

        d: "Menempuh pendidikan menengah pertama dengan berbagai pengalaman berharga dan mulai mendalami minat.",

        b: [

          "Mengenal berbagai mata pelajaran baru & sains",

          "Mulai tertarik pada dunia teknologi dan komputer",

          "Mengasah kemampuan logika dan kerjasama tim"

        ],

        q: "“Aku tidak akan menyerah, itulah jalan ninjaku!”",

        img: "Assets/Images/mtsn-2-bandung.png"

      },

      {

        y: "2023 – Sekarang",

        n: "SMKN 13 BANDUNG",

        l: "Jurusan Rekayasa Perangkat Lunak (RPL)",

        d: "Aktif belajar dan mengembangkan skill di bidang pengembangan perangkat lunak, desain UI/UX, dan teknologi web.",

        b: [

          "Membuat berbagai proyek website dan aplikasi modern",

          "Mendalami Laravel, Flutter, JavaScript, dan basis data",

          "Terus belajar dan berkembang menjadi fullstack developer andal"

        ],

        q: "“Lampaui batasmu, lagi dan lagi!”",

        img: "Assets/Images/smkn-13-bandung.png"

      }

    ];

    let eduIdx = 0;

    let eduBusy = false;

    function renderL(k) {

      const p = DATA[k];

      const quoteEl = document.getElementById("quote");

      if (quoteEl) quoteEl.textContent = p.q;

      const badgeWrap = document.getElementById("eduBadgeWrap");

      if (badgeWrap) {

        if (p.img) {

          badgeWrap.innerHTML = `<img src="${p.img}" alt="Logo ${p.n}" class="edu-school-badge">`;

        } else {

          badgeWrap.innerHTML = '<svg viewBox="0 0 200 190" style="width:140px;height:auto"><use href="#wm"/></svg>';

        }

      }

    }

    function renderR(k) {

      const p = DATA[k];

      const yrEl = document.getElementById("yr");

      const nmEl = document.getElementById("nm");

      const lvEl = document.getElementById("lv");

      const dsEl = document.getElementById("ds");

      const ulEl = document.getElementById("ul");

      const dotsEl = document.getElementById("dots");

      const prevEl = document.getElementById("prev");

      const nextEl = document.getElementById("next");

      if (yrEl) yrEl.textContent = p.y;

      if (nmEl) nmEl.textContent = p.n;

      if (lvEl) lvEl.textContent = p.l;

      if (dsEl) dsEl.textContent = p.d;

      if (ulEl) {

        ulEl.innerHTML = p.b.map(() => "<li></li>").join("");

        [].forEach.call(ulEl.children, (li, idx) => {

          li.textContent = p.b[idx];

        });

      }

      if (dotsEl) {

        dotsEl.innerHTML = DATA.map((_, j) => `<i class="${j === k ? 'on' : ''}"></i>`).join("");

      }

      if (prevEl) {

        prevEl.textContent = k === 0 ? "◂ Sampul" : "◂ Kembali";

      }

      if (nextEl) {

        nextEl.textContent = k === DATA.length - 1 ? "Tutup ▸" : "Next ▸";

      }

    }

    function renderEdu() {

      renderL(eduIdx);

      renderR(eduIdx);

    }

    function wide() {

      return !window.matchMedia("(max-width:640px)").matches;

    }

    function desk(k) {

      eduBusy = true;

      const bk = document.getElementById("book");

      const pl = document.getElementById("pl");

      const pr = document.getElementById("pr");

      const cv = document.getElementById("cover");

      const bc = document.getElementById("back");

      const opening = k[0] === "o";

      const front = k[1] === "f";

      const next = opening === front;

      const shift = front ? "calc(var(--wp) * -.5)" : "calc(var(--wp) * .5)";

      const strip = h => h.replace(/ id="[^"]*"/g, "");

      const mk = (c, h) => {

        const e = document.createElement("div");

        e.className = c;

        e.innerHTML = strip(h);

        return e;

      };

      const leaf = document.createElement("div");

      let f, b;

      const hid = front ? pl : pr;

      const cov = front ? cv : bc;

      if (opening) {

        eduIdx = front ? 0 : DATA.length - 1;

        renderEdu();

        if (typeof playSound === 'function') playSound('unroll');

      } else {

        if (typeof playSound === 'function') playSound('roll');

      }

      if (k === "of") { f = mk("face cover", cv.innerHTML); b = mk("face bk pg l", pl.innerHTML); }

      if (k === "ob") { f = mk("face cover back", bc.innerHTML); b = mk("face bk pg r", pr.innerHTML); }

      if (k === "cf") { f = mk("face pg l", pl.innerHTML); b = mk("face bk cover", cv.innerHTML); }

      if (k === "cb") { f = mk("face pg r", pr.innerHTML); b = mk("face bk cover back", bc.innerHTML); }

      leaf.className = "leaf " + (next ? "next" : "prev");

      leaf.appendChild(f);

      leaf.appendChild(b);

      if (opening) {

        bk.style.transition = "none";

        bk.classList.add("open", "pre");

        bk.style.transform = "translateX(" + shift + ")";

        hid.style.visibility = "hidden";

        bk.appendChild(leaf);

        cov.style.display = "none";

        void bk.offsetWidth;

        bk.style.transition = "";

        leaf.classList.add("go");

        bk.style.transform = "";

      } else {

        hid.style.visibility = "hidden";

        bk.appendChild(leaf);

        void leaf.offsetWidth;

        leaf.classList.add("go");

        bk.classList.add("pre");

        bk.style.transform = "translateX(" + shift + ")";

      }

      setTimeout(() => {

        bk.classList.remove("pre");

        if (!opening) {

          bk.classList.remove("open");

          bk.style.transform = "";

          cov.style.display = "flex";

          if (typeof playSound === 'function') playSound('click');

        }

        pl.style.visibility = pr.style.visibility = "";

        leaf.remove();

        eduBusy = false;

      }, 950);

    }

    function flip(d) {

      if (eduBusy) return;

      if (window.matchMedia("(max-width:640px)").matches) {

        eduIdx += d;

        renderEdu();

        ["pl", "pr"].forEach(x => {

          const e = document.getElementById(x);

          if (e) {

            e.classList.remove("fade");

            void e.offsetWidth;

            e.classList.add("fade");

          }

        });

        if (typeof playSound === 'function') playSound('unroll');

        return;

      }

      eduBusy = true;

      if (typeof playSound === 'function') playSound('unroll');

      const bk = document.getElementById("book");

      const pl = document.getElementById("pl");

      const pr = document.getElementById("pr");

      const o = eduIdx;

      const n = eduIdx + d;

      const strip = h => h.replace(/ id="[^"]*"/g, "");

      const leaf = document.createElement("div");

      const f = document.createElement("div");

      const b = document.createElement("div");

      leaf.className = "leaf " + (d > 0 ? "next" : "prev");

      f.className = "face pg " + (d > 0 ? "r" : "l");

      b.className = "face bk pg " + (d > 0 ? "l" : "r");

      if (d > 0) {

        f.innerHTML = strip(pr.innerHTML);

        renderL(n);

        b.innerHTML = strip(pl.innerHTML);

        renderL(o);

        renderR(n);

      } else {

        f.innerHTML = strip(pl.innerHTML);

        renderR(n);

        b.innerHTML = strip(pr.innerHTML);

        renderR(o);

        renderL(n);

      }

      leaf.appendChild(f);

      leaf.appendChild(b);

      bk.appendChild(leaf);

      void leaf.offsetWidth;

      leaf.classList.add("go");

      setTimeout(() => {

        eduIdx = n;

        renderEdu();

        leaf.remove();

        eduBusy = false;

      }, 900);

    }

    function openFrom(el) {

      if (eduBusy) return;

      if (wide()) return desk(el.id === "back" ? "ob" : "of");

      eduBusy = true;

      el.classList.add("opening");

      if (typeof playSound === 'function') playSound('unroll');

      setTimeout(() => {

        eduIdx = el.id === "back" ? DATA.length - 1 : 0;

        document.getElementById("book").classList.add("open", "bookin");

        renderEdu();

      }, 450);

      setTimeout(() => {

        el.style.display = "none";

        el.classList.remove("opening");

        document.getElementById("book").classList.remove("bookin");

        eduBusy = false;

      }, 950);

    }

    function closeTo(el) {

      if (eduBusy) return;

      if (wide()) return desk(el.id === "back" ? "cb" : "cf");

      eduBusy = true;

      const b = document.getElementById("book");

      b.classList.add("bookout");

      if (typeof playSound === 'function') playSound('roll');

      setTimeout(() => {

        b.classList.remove("open", "bookout");

        el.style.display = "flex";

        el.classList.add("closing");

        if (typeof playSound === 'function') playSound('click');

      }, 450);

      setTimeout(() => {

        el.classList.remove("closing");

        eduBusy = false;

      }, 1350);

    }

    bookCover.onclick = () => openFrom(bookCover);

    backCover.onclick = () => openFrom(backCover);

    const closeBtn = document.getElementById("close");

    if (closeBtn) {

      closeBtn.onclick = () => closeTo(eduIdx < DATA.length / 2 ? bookCover : backCover);

    }

    const prevBtn = document.getElementById("prev");

    if (prevBtn) {

      prevBtn.onclick = () => {

        if (eduBusy) return;

        if (eduIdx > 0) flip(-1);

        else closeTo(bookCover);

      };

    }

    const nextBtn = document.getElementById("next");

    if (nextBtn) {

      nextBtn.onclick = () => {

        if (eduBusy) return;

        if (eduIdx < DATA.length - 1) flip(1);

        else closeTo(backCover);

      };

    }

    renderEdu();

    // Keyboard Navigation for open book

    window.addEventListener("keydown", (e) => {

      if (!bookEl.classList.contains("open")) return;

      if (e.key === "ArrowRight") {

        if (eduIdx < DATA.length - 1) flip(1);

        else closeTo(backCover);

      }

      if (e.key === "ArrowLeft") {

        if (eduIdx > 0) flip(-1);

        else closeTo(bookCover);

      }

      if (e.key === "Escape") {

        closeTo(eduIdx < DATA.length / 2 ? bookCover : backCover);

      }

    });

    // Auto-open on scroll when visible

    let hasAutoOpenedBook = false;

    function checkAndAutoOpenBook() {

      if (hasAutoOpenedBook || !bookCover || !bookEl) return;

      if (bookEl.classList.contains("open")) return;

      const rect = bookCover.getBoundingClientRect();

      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < windowHeight * 0.65 && rect.bottom > windowHeight * 0.20) {

        hasAutoOpenedBook = true;

        setTimeout(() => {

          if (!bookEl.classList.contains("open") && !eduBusy) {

            openFrom(bookCover);

          }

        }, 300);

      }

    }

    window.addEventListener("scroll", checkAndAutoOpenBook, { passive: true });

  }

  // =========================================================================

  // RELAX MODE CONTROLLER & ATMOSPHERIC CANVAS

  // =========================================================================

  const relaxToggle = document.getElementById('relaxToggle');

  const relaxConfirmModalOverlay = document.getElementById('relaxConfirmModalOverlay');

  const relaxConfirmYesBtn = document.getElementById('relaxConfirmYesBtn');

  const relaxConfirmCancelBtn = document.getElementById('relaxConfirmCancelBtn');

  const relaxHideDockBtn = document.getElementById('relaxHideDockBtn');

  const relaxUnhideDockBtn = document.getElementById('relaxUnhideDockBtn');

  const relaxDock = document.getElementById('relaxDock');

  const relaxPrevBtn = document.getElementById('relaxPrevBtn');

  const relaxPlayBtn = document.getElementById('relaxPlayBtn');

  const relaxPlayIcon = document.getElementById('relaxPlayIcon');

  const relaxNextBtn = document.getElementById('relaxNextBtn');

  const relaxTrackBtn = document.getElementById('relaxTrackBtn');

  const relaxCurrentTrackLabel = document.getElementById('relaxCurrentTrackLabel');

  const relaxTrackMenu = document.getElementById('relaxTrackMenu');

  const relaxProgressBar = document.getElementById('relaxProgressBar');

  const relaxCurrentTime = document.getElementById('relaxCurrentTime');

  const relaxDuration = document.getElementById('relaxDuration');

  const relaxVolumeBtn = document.getElementById('relaxVolumeBtn');

  const relaxVolIcon = document.getElementById('relaxVolIcon');

  const relaxVolumeBar = document.getElementById('relaxVolumeBar');

  const relaxVolumeVal = document.getElementById('relaxVolumeVal');

  let relaxPreviousVolume = savedBgmVolume || 70;

  const relaxThemeToggleBtn = document.getElementById('relaxThemeToggleBtn');

  const relaxThemeIcon = document.getElementById('relaxThemeIcon');

  const relaxSceneryBtn = document.getElementById('relaxSceneryBtn');

  const relaxSceneryIcon = document.getElementById('relaxSceneryIcon');

  const relaxSceneryText = document.getElementById('relaxSceneryText');

  const relaxSceneryThumb = document.getElementById('relaxSceneryThumb');

  const relaxSceneryMenu = document.getElementById('relaxSceneryMenu');

  const relaxSettingsBtn = document.getElementById('relaxSettingsBtn');

  const relaxExitDockBtn = document.getElementById('relaxExitDockBtn');

  const relaxExitConfirmModalOverlay = document.getElementById('relaxExitConfirmModalOverlay');

  const relaxExitConfirmYesBtn = document.getElementById('relaxExitConfirmYesBtn');

  const relaxExitConfirmCancelBtn = document.getElementById('relaxExitConfirmCancelBtn');

  const relaxAtmosphereCanvas = document.getElementById('relaxAtmosphereCanvas');

  let isRelaxModeActive = false;

  let activeRelaxScenery = localStorage.getItem('rfm_relax_scenery') || 'stars';

  let relaxAnimFrameId = null;

  let isUserSeekingRelax = false;

  const relaxTrackList = [

    'Assets/music/music 1.mp3',

    'Assets/music/music 2.mp3',

    'Assets/music/music 3.mp3',

    'Assets/music/music 4.mp4',

    'Assets/music/music 5.mp3'

  ];

  const sceneryMeta = {

    stars: {

      svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="#ffd278"><path d="M12 2l2.4 7.2h7.6l-6.2 4.6 2.4 7.2-6.2-4.6-6.2 4.6 2.4-7.2-6.2-4.6h7.6z"/></svg>',

      thumbSvg: '<svg viewBox="0 0 36 24" width="36" height="24" class="scenery-thumb-svg"><rect width="36" height="24" rx="3" fill="#0b1730"/><polygon points="0,24 10,14 18,24" fill="#070e20"/><polygon points="12,24 22,11 32,24" fill="#132342"/><polygon points="20,24 28,15 36,24" fill="#070e20"/><rect x="23" y="9" width="3" height="10" fill="#ffd278" opacity="0.85"/><polygon points="21.5,9 24.5,4 27.5,9" fill="#ffd278"/><circle cx="6" cy="5" r="0.8" fill="#ffffff"/><circle cx="15" cy="4" r="1" fill="#ffeaa7"/><circle cx="31" cy="6" r="0.8" fill="#ffffff"/><circle cx="28" cy="3" r="0.6" fill="#ffeaa7"/><line x1="4" y1="8" x2="12" y2="12" stroke="#fff" stroke-width="0.8" stroke-linecap="round" opacity="0.75"/></svg>',

      label: 'Bintang Jatuh'

    },

    fireflies: {

      svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffd278" stroke-width="2"><circle cx="12" cy="12" r="5" fill="#ffd278"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',

      thumbSvg: '<svg viewBox="0 0 36 24" width="36" height="24" class="scenery-thumb-svg"><rect width="36" height="24" rx="3" fill="#051512"/><path d="M0,24 Q9,14 18,24 Q27,15 36,24 Z" fill="#030c0a"/><circle cx="8" cy="11" r="1.4" fill="#a3e635"/><circle cx="18" cy="7" r="1.8" fill="#bef264"/><circle cx="27" cy="13" r="1.5" fill="#a3e635"/><circle cx="31" cy="6" r="1.2" fill="#84cc16"/></svg>',

      label: 'Kunang-kunang'

    },

    rain: {

      svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffd278" stroke-width="2" stroke-linecap="round"><path d="M16 13a4 4 0 0 0-8 0"/><line x1="8" y1="17" x2="8" y2="21"/><line x1="12" y1="16" x2="12" y2="20"/><line x1="16" y1="17" x2="16" y2="21"/></svg>',

      thumbSvg: '<svg viewBox="0 0 36 24" width="36" height="24" class="scenery-thumb-svg"><rect width="36" height="24" rx="3" fill="#0b172a"/><polygon points="0,24 12,14 22,24" fill="#070e1b"/><polygon points="18,24 27,13 36,24" fill="#070e1b"/><line x1="7" y1="3" x2="5" y2="10" stroke="#60a5fa" stroke-width="0.9" opacity="0.8"/><line x1="17" y1="5" x2="15" y2="13" stroke="#93c5fd" stroke-width="0.9" opacity="0.85"/><line x1="28" y1="2" x2="26" y2="9" stroke="#60a5fa" stroke-width="0.9" opacity="0.8"/><line x1="33" y1="8" x2="31" y2="15" stroke="#93c5fd" stroke-width="0.9" opacity="0.85"/></svg>',

      label: 'Hujan Rintik'

    },

    petals: {

      svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="#ffd278"><path d="M12 2C8 6 6 10 12 16C18 10 16 6 12 2Z"/></svg>',

      thumbSvg: '<svg viewBox="0 0 36 24" width="36" height="24" class="scenery-thumb-svg"><rect width="36" height="24" rx="3" fill="#1a1024"/><polygon points="0,24 14,15 26,24" fill="#0f0717"/><polygon points="20,24 29,14 36,24" fill="#0f0717"/><path d="M7 6 C5 4, 10 3, 9 7 C8 9, 5 8, 7 6 Z" fill="#f472b6"/><path d="M19 11 C17 9, 22 8, 21 12 C20 14, 17 13, 19 11 Z" fill="#fb7185"/><path d="M29 5 C27 3, 32 2, 31 6 C30 8, 27 7, 29 5 Z" fill="#f472b6"/></svg>',

      label: 'Kelopak Sakura'

    },

    none: {

      svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffd278" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="5" y1="19" x2="19" y2="5"/></svg>',

      thumbSvg: '<svg viewBox="0 0 36 24" width="36" height="24" class="scenery-thumb-svg"><rect width="36" height="24" rx="3" fill="#0d1424"/><polygon points="0,24 15,16 28,24" fill="#080c16"/><polygon points="20,24 30,15 36,24" fill="#080c16"/></svg>',

      label: 'Hening Polos'

    }

  };

  // Open confirmation modal

  if (relaxToggle) {

    relaxToggle.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('blip');

      if (relaxConfirmModalOverlay) {

        relaxConfirmModalOverlay.classList.add('active');

      }

    });

  }

  // Cancel confirmation modal

  if (relaxConfirmCancelBtn) {

    relaxConfirmCancelBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('click');

      if (relaxConfirmModalOverlay) {

        relaxConfirmModalOverlay.classList.remove('active');

      }

    });

  }

  if (relaxConfirmModalOverlay) {

    relaxConfirmModalOverlay.addEventListener('click', (e) => {

      if (e.target === relaxConfirmModalOverlay) {

        playSound('click');

        relaxConfirmModalOverlay.classList.remove('active');

      }

    });

  }

  // Enter Relax Mode

  function enterRelaxMode() {

    isRelaxModeActive = true;

    document.body.classList.add('relax-mode-active');

    if (relaxConfirmModalOverlay) {

      relaxConfirmModalOverlay.classList.remove('active');

    }

    // Reset dock hidden state so dock appears

    if (relaxDock) relaxDock.classList.remove('dock-hidden');

    // Close any other open modals/menus

    if (settingsModalBackdrop) settingsModalBackdrop.classList.remove('active');

    closeAllRelaxDropdowns();

    // Start atmosphere rendering

    startAtmosphereEngine();

    // Sync controls

    updateRelaxPlayBtnState();

    updateRelaxTrackUI();

    updateRelaxThemeUI();

    updateRelaxSceneryUI();

    updateRelaxProgressUI();

    updateRelaxVolumeUI();

    // Autoplay music if available

    if (bgmAudio) {

      isBgmActive = true;

      if (bgmAudio.paused) {

        startBgmPlayback();

      }

    }

    playSound('toggle');

    showToast('Masuk ke Relax Mode... Selamat bersantai.');

  }

  // Exit Relax Mode

  function exitRelaxMode() {

    if (!isRelaxModeActive) return;

    isRelaxModeActive = false;

    document.body.classList.remove('relax-mode-active');

    if (relaxDock) relaxDock.classList.remove('dock-hidden');

    closeAllRelaxDropdowns();

    stopAtmosphereEngine();

    playSound('roll');

    showToast('Kembali ke kerajaan utama.');

  }

  // Confirm Yes button

  if (relaxConfirmYesBtn) {

    relaxConfirmYesBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      enterRelaxMode();

    });

  }

  // Hide Dock button

  if (relaxHideDockBtn) {

    relaxHideDockBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      closeAllRelaxDropdowns();

      if (relaxDock) relaxDock.classList.add('dock-hidden');

      playSound('blip');

      showToast('Menu kontrol disembunyikan. Klik Menu Kontrol di bawah untuk membuka kembali.');

    });

  }

  // Unhide / Restore Dock button

  if (relaxUnhideDockBtn) {

    relaxUnhideDockBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      if (relaxDock) relaxDock.classList.remove('dock-hidden');

      playSound('click');

    });

  }

  // Settings button in Relax Dock

  if (relaxSettingsBtn) {

    relaxSettingsBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('click');

      closeAllRelaxDropdowns();

      if (typeof openSettingsModal === 'function') {

        openSettingsModal();

      } else if (settingsModalBackdrop) {

        settingsModalBackdrop.classList.add('active');

      }

    });

  }

  // Exit dock button (opens confirmation modal)

  if (relaxExitDockBtn) {

    relaxExitDockBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('blip');

      closeAllRelaxDropdowns();

      if (relaxExitConfirmModalOverlay) {

        relaxExitConfirmModalOverlay.classList.add('active');

      } else {

        exitRelaxMode();

      }

    });

  }

  // Cancel exit confirmation

  if (relaxExitConfirmCancelBtn) {

    relaxExitConfirmCancelBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('click');

      if (relaxExitConfirmModalOverlay) {

        relaxExitConfirmModalOverlay.classList.remove('active');

      }

    });

  }

  // Confirm exit action

  if (relaxExitConfirmYesBtn) {

    relaxExitConfirmYesBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      if (relaxExitConfirmModalOverlay) {

        relaxExitConfirmModalOverlay.classList.remove('active');

      }

      exitRelaxMode();

    });

  }

  if (relaxExitConfirmModalOverlay) {

    relaxExitConfirmModalOverlay.addEventListener('click', (e) => {

      if (e.target === relaxExitConfirmModalOverlay) {

        playSound('click');

        relaxExitConfirmModalOverlay.classList.remove('active');

      }

    });

  }

  // Sync play/pause state

  function updateRelaxPlayBtnState() {

    if (!relaxPlayBtn || !relaxPlayIcon) return;

    const isPlaying = bgmAudio && !bgmAudio.paused;

    const svgPlay = relaxPlayIcon.querySelector('.svg-play');

    const svgPause = relaxPlayIcon.querySelector('.svg-pause');

    if (svgPlay) svgPlay.style.display = isPlaying ? 'none' : 'block';

    if (svgPause) svgPause.style.display = isPlaying ? 'block' : 'none';

    relaxPlayBtn.classList.toggle('is-playing', isPlaying);

    relaxPlayBtn.setAttribute('title', isPlaying ? 'Jeda Musik' : 'Putar Musik');

  }

  if (bgmAudio) {

    bgmAudio.addEventListener('play', updateRelaxPlayBtnState);

    bgmAudio.addEventListener('pause', updateRelaxPlayBtnState);

  }

  if (relaxPlayBtn) {

    relaxPlayBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      if (!bgmAudio) return;

      playSound('click');

      if (bgmAudio.paused) {

        isBgmActive = true;

        bgmAudio.play().then(() => updateRelaxPlayBtnState()).catch(() => {});

      } else {

        isBgmActive = false;

        bgmAudio.pause();

        updateRelaxPlayBtnState();

      }

    });

  }

  // Music Progress & Seeking logic

  function updateRelaxProgressUI() {

    if (!bgmAudio || isUserSeekingRelax) return;

    const cur = bgmAudio.currentTime || 0;

    const dur = bgmAudio.duration || 0;

    if (relaxCurrentTime) relaxCurrentTime.textContent = formatAudioTime(cur);

    if (relaxDuration) relaxDuration.textContent = (dur && !isNaN(dur)) ? formatAudioTime(dur) : '0:00';

    if (relaxProgressBar && dur > 0) {

      const pct = (cur / dur) * 100;

      relaxProgressBar.value = pct;

      relaxProgressBar.style.setProperty('--seek-percent', pct + '%');

    }

  }

  if (bgmAudio) {

    bgmAudio.addEventListener('timeupdate', updateRelaxProgressUI);

    bgmAudio.addEventListener('loadedmetadata', () => {

      if (relaxDuration && bgmAudio.duration) {

        relaxDuration.textContent = formatAudioTime(bgmAudio.duration);

      }

    });

  }

  if (relaxProgressBar) {

    relaxProgressBar.addEventListener('input', () => {

      isUserSeekingRelax = true;

      if (bgmAudio && bgmAudio.duration) {

        const targetTime = (parseFloat(relaxProgressBar.value) / 100) * bgmAudio.duration;

        if (relaxCurrentTime) relaxCurrentTime.textContent = formatAudioTime(targetTime);

        relaxProgressBar.style.setProperty('--seek-percent', relaxProgressBar.value + '%');

      }

    });

    relaxProgressBar.addEventListener('change', () => {

      if (bgmAudio && bgmAudio.duration) {

        const targetTime = (parseFloat(relaxProgressBar.value) / 100) * bgmAudio.duration;

        bgmAudio.currentTime = targetTime;

      }

      isUserSeekingRelax = false;

    });

  }

  // Volume Control in Relax Dock

  function updateRelaxVolumeUI(vol = savedBgmVolume) {

    if (relaxVolumeBar) {

      relaxVolumeBar.value = vol;

      relaxVolumeBar.style.setProperty('--vol-percent', vol + '%');

    }

    if (relaxVolumeVal) {

      relaxVolumeVal.textContent = vol + '%';

    }

    if (relaxVolIcon) {

      if (vol === 0) {

        relaxVolIcon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#ffd278">

          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>

        </svg>`;

      } else if (vol < 50) {

        relaxVolIcon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#ffd278">

          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>

        </svg>`;

      } else {

        relaxVolIcon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#ffd278">

          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>

        </svg>`;

      }

    }

  }

  function applyRelaxVolume(newVol) {

    savedBgmVolume = newVol;

    try { localStorage.setItem('rfm_bgm_volume', newVol); } catch (e) {}

    if (bgmAudio) bgmAudio.volume = newVol / 100;

    if (settingBgmVolume) settingBgmVolume.value = newVol;

    if (bgmVolumeVal) bgmVolumeVal.textContent = newVol + '%';

    updateRelaxVolumeUI(newVol);

  }

  if (relaxVolumeBar) {

    relaxVolumeBar.addEventListener('input', () => {

      const vol = parseInt(relaxVolumeBar.value, 10);

      applyRelaxVolume(vol);

      if (vol > 0) relaxPreviousVolume = vol;

    });

  }

  if (relaxVolumeBtn) {

    relaxVolumeBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('blip');

      if (savedBgmVolume > 0) {

        relaxPreviousVolume = savedBgmVolume;

        applyRelaxVolume(0);

      } else {

        applyRelaxVolume(relaxPreviousVolume || 70);

      }

    });

  }

  // Change Track Helper

  function switchRelaxTrack(newTrack) {

    savedBgmTrack = newTrack;

    try {

      localStorage.setItem('rfm_bgm_track', newTrack);

      localStorage.setItem('rfm_bgm_track_custom', 'true');

    } catch (e) {}

    if (settingBgmTrack) {

      settingBgmTrack.value = newTrack;

      if (typeof updatePreviewTitle === 'function') updatePreviewTitle();

    }

    if (bgmAudio) {

      bgmAudio.src = newTrack;

      isBgmActive = true;

      if (relaxProgressBar) {

        relaxProgressBar.value = 0;

        relaxProgressBar.style.setProperty('--seek-percent', '0%');

      }

      bgmAudio.play().then(() => updateRelaxPlayBtnState()).catch(() => {});

    }

    updateRelaxTrackUI();

  }

  function updateRelaxTrackUI() {

    const curTrack = savedBgmTrack || 'Assets/music/music 5.mp3';

    const cleanTitle = trackTitles[curTrack] || 'Music 5';

    if (relaxCurrentTrackLabel) {

      relaxCurrentTrackLabel.textContent = cleanTitle;

    }

    if (relaxTrackMenu) {

      const items = relaxTrackMenu.querySelectorAll('.relax-menu-item');

      items.forEach(item => {

        const trk = item.getAttribute('data-track');

        item.classList.toggle('active', curTrack.includes(trk) || trk.includes(curTrack));

      });

    }

  }

  // Prev / Next track buttons

  if (relaxPrevBtn) {

    relaxPrevBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('blip');

      let idx = relaxTrackList.findIndex(t => (savedBgmTrack || '').includes(t));

      if (idx === -1) idx = 4;

      const prevIdx = (idx - 1 + relaxTrackList.length) % relaxTrackList.length;

      switchRelaxTrack(relaxTrackList[prevIdx]);

    });

  }

  if (relaxNextBtn) {

    relaxNextBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('blip');

      let idx = relaxTrackList.findIndex(t => (savedBgmTrack || '').includes(t));

      if (idx === -1) idx = 4;

      const nextIdx = (idx + 1) % relaxTrackList.length;

      switchRelaxTrack(relaxTrackList[nextIdx]);

    });

  }

  // Dropdown toggle helpers

  function closeAllRelaxDropdowns() {

    document.querySelectorAll('.relax-dropdown-wrap').forEach(wrap => wrap.classList.remove('open'));

  }

  if (relaxTrackBtn) {

    relaxTrackBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('click');

      const wrap = relaxTrackBtn.closest('.relax-dropdown-wrap');

      const wasOpen = wrap.classList.contains('open');

      closeAllRelaxDropdowns();

      if (!wasOpen) wrap.classList.add('open');

    });

  }

  if (relaxTrackMenu) {

    relaxTrackMenu.querySelectorAll('.relax-menu-item').forEach(item => {

      item.addEventListener('click', (e) => {

        e.stopPropagation();

        playSound('click');

        const track = item.getAttribute('data-track');

        if (track) switchRelaxTrack(track);

        closeAllRelaxDropdowns();

      });

    });

  }

  // Theme toggle inside relax dock (ICON ONLY, NO TEXT)

  function updateRelaxThemeUI() {

    const isNight = document.body.classList.contains('theme-night');

    if (relaxThemeIcon) {

      relaxThemeIcon.innerHTML = isNight

        ? `<svg viewBox="0 0 24 24" width="18" height="18">

             <circle cx="12" cy="12" r="5" fill="#f5b73b"/>

             <path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#f5b73b" stroke-width="2.2" stroke-linecap="round"/>

           </svg>`

        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="#f5b73b">

             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>

           </svg>`;

    }

    if (relaxThemeToggleBtn) {

      relaxThemeToggleBtn.setAttribute('title', isNight ? 'Ubah ke Mode Terang (Siang)' : 'Ubah ke Mode Gelap (Malam)');

    }

  }

  if (relaxThemeToggleBtn) {

    relaxThemeToggleBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      const isNight = document.body.classList.contains('theme-night');

      const nextTheme = isNight ? 'day' : 'night';

      setTheme(nextTheme);

      updateRelaxThemeUI();

      playSound('toggle');

      showToast(nextTheme === 'day' ? 'Suasana siang yang cerah' : 'Suasana malam berbintang');

    });

  }

  // Scenery selector

  function updateRelaxSceneryUI() {

    const meta = sceneryMeta[activeRelaxScenery] || sceneryMeta.stars;

    if (relaxSceneryIcon) relaxSceneryIcon.innerHTML = meta.svg;

    if (relaxSceneryText) relaxSceneryText.textContent = meta.label;

    if (relaxSceneryThumb && meta.thumbSvg) {

      relaxSceneryThumb.innerHTML = meta.thumbSvg;

    }

    if (relaxSceneryMenu) {

      relaxSceneryMenu.querySelectorAll('.relax-menu-item').forEach(item => {

        item.classList.toggle('active', item.getAttribute('data-scenery') === activeRelaxScenery);

      });

    }

  }

  if (relaxSceneryBtn) {

    relaxSceneryBtn.addEventListener('click', (e) => {

      e.stopPropagation();

      playSound('click');

      const wrap = relaxSceneryBtn.closest('.relax-dropdown-wrap');

      const wasOpen = wrap.classList.contains('open');

      closeAllRelaxDropdowns();

      if (!wasOpen) wrap.classList.add('open');

    });

  }

  if (relaxSceneryMenu) {

    relaxSceneryMenu.querySelectorAll('.relax-menu-item').forEach(item => {

      item.addEventListener('click', (e) => {

        e.stopPropagation();

        playSound('click');

        const scen = item.getAttribute('data-scenery');

        if (scen) {

          activeRelaxScenery = scen;

          try { localStorage.setItem('rfm_relax_scenery', scen); } catch (err) {}

          updateRelaxSceneryUI();

          initSceneryParticles();

        }

        closeAllRelaxDropdowns();

      });

    });

  }

  // Close dropdowns on outside click

  document.addEventListener('click', () => {

    closeAllRelaxDropdowns();

  });

  // Global Esc Handler for Relax Mode

  window.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

      if (relaxConfirmModalOverlay && relaxConfirmModalOverlay.classList.contains('active')) {

        relaxConfirmModalOverlay.classList.remove('active');

      } else if (relaxExitConfirmModalOverlay && relaxExitConfirmModalOverlay.classList.contains('active')) {

        relaxExitConfirmModalOverlay.classList.remove('active');

      } else if (document.querySelector('.relax-dropdown-wrap.open')) {

        closeAllRelaxDropdowns();

      } else if (isRelaxModeActive) {

        exitRelaxMode();

      }

    }

  });

  // -------------------------------------------------------------------------

  // Dynamic Canvas Atmosphere Engine (Shooting stars, fireflies, rain, petals)

  // -------------------------------------------------------------------------

  let starsData = [];

  let shootingStars = [];

  let firefliesData = [];

  let raindrops = [];

  let petalsData = [];

  let nextShootingStarTime = 0;

  function resizeAtmosphereCanvas() {

    if (!relaxAtmosphereCanvas) return;

    relaxAtmosphereCanvas.width = window.innerWidth;

    relaxAtmosphereCanvas.height = window.innerHeight;

  }

  window.addEventListener('resize', resizeAtmosphereCanvas);

  function initSceneryParticles() {

    resizeAtmosphereCanvas();

    const w = relaxAtmosphereCanvas ? relaxAtmosphereCanvas.width : window.innerWidth;

    const h = relaxAtmosphereCanvas ? relaxAtmosphereCanvas.height : window.innerHeight;

    if (activeRelaxScenery === 'stars') {

      starsData = [];

      const starCount = Math.floor(w * 0.05);

      for (let i = 0; i < starCount; i++) {

        starsData.push({

          x: Math.random() * w,

          y: Math.random() * (h * 0.75),

          size: Math.random() * 2 + 0.8,

          alpha: Math.random(),

          speed: Math.random() * 0.03 + 0.01,

          color: Math.random() > 0.3 ? '#ffd875' : '#ffffff'

        });

      }

      shootingStars = [];

      nextShootingStarTime = performance.now() + 800;

    } else if (activeRelaxScenery === 'fireflies') {

      firefliesData = [];

      for (let i = 0; i < 35; i++) {

        firefliesData.push({

          x: Math.random() * w,

          y: Math.random() * h,

          radius: Math.random() * 2.5 + 1.5,

          angle: Math.random() * Math.PI * 2,

          speed: Math.random() * 0.5 + 0.3,

          glow: Math.random() * 0.5 + 0.5,

          glowSpeed: Math.random() * 0.04 + 0.02

        });

      }

    } else if (activeRelaxScenery === 'rain') {

      raindrops = [];

      for (let i = 0; i < 90; i++) {

        raindrops.push({

          x: Math.random() * w,

          y: Math.random() * h,

          length: Math.random() * 18 + 12,

          speed: Math.random() * 8 + 14,

          opacity: Math.random() * 0.35 + 0.25

        });

      }

    } else if (activeRelaxScenery === 'petals') {

      petalsData = [];

      for (let i = 0; i < 30; i++) {

        petalsData.push({

          x: Math.random() * w,

          y: Math.random() * h,

          size: Math.random() * 7 + 6,

          angle: Math.random() * Math.PI * 2,

          angularSpeed: (Math.random() - 0.5) * 0.03,

          speedX: Math.random() * 1.5 + 0.8,

          speedY: Math.random() * 1.8 + 1.2,

          opacity: Math.random() * 0.35 + 0.55

        });

      }

    }

  }

  function startAtmosphereEngine() {

    initSceneryParticles();

    if (relaxAnimFrameId) cancelAnimationFrame(relaxAnimFrameId);

    function renderLoop(timestamp) {

      if (!isRelaxModeActive) return;

      if (!relaxAtmosphereCanvas) return;

      const ctx = relaxAtmosphereCanvas.getContext('2d');

      if (!ctx) return;

      const w = relaxAtmosphereCanvas.width;

      const h = relaxAtmosphereCanvas.height;

      ctx.clearRect(0, 0, w, h);

      if (activeRelaxScenery === 'stars') {

        // Draw static twinkling stars

        starsData.forEach(s => {

          s.alpha += s.speed;

          const currentAlpha = 0.3 + Math.abs(Math.sin(s.alpha)) * 0.7;

          ctx.fillStyle = s.color;

          ctx.globalAlpha = currentAlpha;

          ctx.beginPath();

          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);

          ctx.fill();

        });

        // Spawn Shooting Stars

        if (timestamp > nextShootingStarTime) {

          shootingStars.push({

            x: Math.random() * (w * 0.8),

            y: Math.random() * (h * 0.35),

            length: Math.random() * 110 + 70,

            speed: Math.random() * 9 + 11,

            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg

            opacity: 1,

            color: Math.random() > 0.4 ? '#ffeaa7' : '#ffffff'

          });

          nextShootingStarTime = timestamp + Math.random() * 2200 + 1200;

        }

        // Render & Update Shooting Stars

        for (let i = shootingStars.length - 1; i >= 0; i--) {

          const ss = shootingStars[i];

          const tailX = ss.x - Math.cos(ss.angle) * ss.length;

          const tailY = ss.y - Math.sin(ss.angle) * ss.length;

          const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);

          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');

          grad.addColorStop(1, ss.color);

          ctx.strokeStyle = grad;

          ctx.lineWidth = 2.2;

          ctx.lineCap = 'round';

          ctx.globalAlpha = Math.max(0, ss.opacity);

          ctx.beginPath();

          ctx.moveTo(tailX, tailY);

          ctx.lineTo(ss.x, ss.y);

          ctx.stroke();

          // Star head spark

          ctx.fillStyle = '#ffffff';

          ctx.beginPath();

          ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);

          ctx.fill();

          ss.x += Math.cos(ss.angle) * ss.speed;

          ss.y += Math.sin(ss.angle) * ss.speed;

          ss.opacity -= 0.016;

          if (ss.opacity <= 0 || ss.x > w + 100 || ss.y > h + 100) {

            shootingStars.splice(i, 1);

          }

        }

      } else if (activeRelaxScenery === 'fireflies') {

        firefliesData.forEach(f => {

          f.angle += 0.02;

          f.x += Math.cos(f.angle) * f.speed;

          f.y += Math.sin(f.angle * 0.8) * f.speed;

          if (f.x < -20) f.x = w + 20;

          if (f.x > w + 20) f.x = -20;

          if (f.y < -20) f.y = h + 20;

          if (f.y > h + 20) f.y = -20;

          f.glow += f.glowSpeed;

          const pulse = (Math.sin(f.glow) + 1) * 0.5;

          const currentAlpha = 0.2 + pulse * 0.7;

          // Glow halo

          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 4.5);

          grad.addColorStop(0, `rgba(255, 220, 100, ${currentAlpha})`);

          grad.addColorStop(0.5, `rgba(245, 183, 59, ${currentAlpha * 0.4})`);

          grad.addColorStop(1, 'rgba(245, 183, 59, 0)');

          ctx.fillStyle = grad;

          ctx.globalAlpha = 1;

          ctx.beginPath();

          ctx.arc(f.x, f.y, f.radius * 4.5, 0, Math.PI * 2);

          ctx.fill();

          // Center bright firefly core

          ctx.fillStyle = '#fffbe8';

          ctx.globalAlpha = currentAlpha;

          ctx.beginPath();

          ctx.arc(f.x, f.y, f.radius * 0.7, 0, Math.PI * 2);

          ctx.fill();

        });

      } else if (activeRelaxScenery === 'rain') {

        ctx.strokeStyle = 'rgba(186, 215, 255, 0.5)';

        ctx.lineWidth = 1.2;

        ctx.lineCap = 'round';

        raindrops.forEach(r => {

          ctx.globalAlpha = r.opacity;

          ctx.beginPath();

          ctx.moveTo(r.x, r.y);

          ctx.lineTo(r.x + 2, r.y + r.length);

          ctx.stroke();

          r.x += 1.8;

          r.y += r.speed;

          if (r.y > h) {

            r.y = -20;

            r.x = Math.random() * w;

          }

        });

      } else if (activeRelaxScenery === 'petals') {

        petalsData.forEach(p => {

          p.x += p.speedX;

          p.y += p.speedY;

          p.angle += p.angularSpeed;

          if (p.y > h + 20) {

            p.y = -20;

            p.x = Math.random() * w;

          }

          if (p.x > w + 20) {

            p.x = -20;

          }

          ctx.save();

          ctx.translate(p.x, p.y);

          ctx.rotate(p.angle);

          ctx.fillStyle = 'rgba(255, 192, 203, 0.75)';

          ctx.globalAlpha = p.opacity;

          ctx.beginPath();

          ctx.moveTo(0, 0);

          ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size * 1.5);

          ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);

          ctx.fill();

          ctx.restore();

        });

      }

      ctx.globalAlpha = 1;

      relaxAnimFrameId = requestAnimationFrame(renderLoop);

    }

    relaxAnimFrameId = requestAnimationFrame(renderLoop);

  }

  function stopAtmosphereEngine() {

    if (relaxAnimFrameId) {

      cancelAnimationFrame(relaxAnimFrameId);

      relaxAnimFrameId = null;

    }

    if (relaxAtmosphereCanvas) {

      const ctx = relaxAtmosphereCanvas.getContext('2d');

      if (ctx) ctx.clearRect(0, 0, relaxAtmosphereCanvas.width, relaxAtmosphereCanvas.height);

    }

  }

  // Back to top button in Pixel Island footer (#tp)

  

  // =========================================================================

  // SECRET GUILDMASTER ADMIN MODE TRIGGER (Ketik admin / Klik perisai R 3x)

  // =========================================================================

  const GUILDMASTER_SECRET_KEY = 'admin';

  let adminTypedStr = '';

  let adminTypedTimer = null;

  if (sessionStorage.getItem('rfm_guildmaster_active') === 'true') {

    document.body.classList.add('guildmaster-mode');

  }

  function promptGuildmasterAuth() {

    if (document.body.classList.contains('guildmaster-mode')) {

      const deactivate = confirm('⚔️ Mode Guildmaster saat ini sedang aktif.\n\nApakah kamu ingin menonaktifkannya?');

      if (deactivate) {

        document.body.classList.remove('guildmaster-mode');

        sessionStorage.removeItem('rfm_guildmaster_active');

        showToast('🛡️ Mode Guildmaster telah dinonaktifkan.');

        playSound('toggle');

      }

      return;

    }

    playSound('click');

    const inputKey = prompt('⚔️ GUILDMASTER AUTHENTICATION ⚔️\n\nMasukkan Kunci Rahasia Guildmaster:');

    if (inputKey === null) return;

    if (inputKey.trim() === GUILDMASTER_SECRET_KEY || inputKey.trim() === '1234') {

      document.body.classList.add('guildmaster-mode');

      sessionStorage.setItem('rfm_guildmaster_active', 'true');

      playSound('victory');

      showToast('⚔️ MODE GUILDMASTER AKTIF! Tombol [✕ Hapus] sekarang muncul di setiap komentar.');

    } else {

      playSound('toggle');

      showToast('❌ Mantra salah! Akses Guildmaster ditolak.');

    }

  }

  const exitGuildmasterBtn = document.getElementById('exitGuildmasterBtn');

  if (exitGuildmasterBtn) {

    exitGuildmasterBtn.addEventListener('click', () => {

      document.body.classList.remove('guildmaster-mode');

      sessionStorage.removeItem('rfm_guildmaster_active');

      showToast('🛡️ Mode Guildmaster telah dinonaktifkan.');

      playSound('toggle');

    });

  }

  window.addEventListener('keydown', (e) => {

    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';

    if (tag === 'input' || tag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable)) {

      return;

    }

    const k = e.key.toLowerCase();

    if (['shift', 'control', 'alt', 'meta', 'capslock'].includes(k)) return;

    clearTimeout(adminTypedTimer);

    adminTypedStr += k;

    if (adminTypedStr.length > 10) adminTypedStr = adminTypedStr.slice(-10);

    if (adminTypedStr.endsWith('admin')) {

      adminTypedStr = '';

      promptGuildmasterAuth();

      return;

    }

    adminTypedTimer = setTimeout(() => { adminTypedStr = ''; }, 3000);

  });

  const crestShield = document.querySelector('.roof-crest-shield');

  let crestClickCount = 0;

  let crestClickTimer = null;

  if (crestShield) {

    crestShield.style.cursor = 'pointer';

    crestShield.title = 'Adventurer Crest';

    crestShield.addEventListener('click', () => {

      crestClickCount++;

      clearTimeout(crestClickTimer);

      if (crestClickCount >= 3) {

        crestClickCount = 0;

        promptGuildmasterAuth();

      } else {

        crestClickTimer = setTimeout(() => { crestClickCount = 0; }, 1200);

      }

    });

  }

  const tpBtn = document.getElementById('tp');

  if (tpBtn) {

    tpBtn.addEventListener('click', (e) => {

      e.preventDefault();

      if (typeof playSound === 'function') playSound('click');

      window.scrollTo({ top: 0, behavior: 'smooth' });

    });

  }

});

