/**
 * Refky Favian Mahardika - Portfolio Interactive Script
 * Pure Vanilla JavaScript (No dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Elements Selection
  // -------------------------------------------------------------------------
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
  // 7. Projects Filter Functionality
  // -------------------------------------------------------------------------
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // 8. Animated Paper Scroll Controller (Buka & Tutup Gulungan Kertas)
  // -------------------------------------------------------------------------
  const paper = document.getElementById('paper');
  const btn = document.getElementById('btn');
  const parchmentCloseCornerBtn = document.getElementById('parchmentCloseCornerBtn');
  const contactSection = document.getElementById('contact');

  // Awal-awal gulungan tertutup rapat
  if (btn) btn.textContent = 'Buka Gulungan';

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
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('senderName').value;
      const emailVal = document.getElementById('senderEmail') ? document.getElementById('senderEmail').value : '';
      const subjectVal = document.getElementById('senderSubject') ? document.getElementById('senderSubject').value : 'Pesan dari Portofolio';
      const msgVal = document.getElementById('senderMessage') ? document.getElementById('senderMessage').value : '';
      
      // Play celebratory retro RPG sound
      playSound('victory');

      // Direct mailto link to Refky's real email
      const mailtoSubject = encodeURIComponent(`[Portofolio] ${subjectVal}`);
      const mailtoBody = encodeURIComponent(`Nama: ${nameVal}\nEmail: ${emailVal}\n\nPesan:\n${msgVal}`);
      window.location.href = `mailto:refkyfm2012@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Show toast
      showToast(`📜 Burung merpati telah membawa pesan ${nameVal} menuju istana kerajaan! 🕊️`);

      // Reset form fields
      contactForm.reset();
    });
  }

  // -------------------------------------------------------------------------
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
  const closeGuildRulesModalBtn = document.getElementById('closeGuildRulesModalBtn');
  const guildRulesModalOverlay = document.getElementById('guildRulesModalOverlay');
  const understandRulesBtn = document.getElementById('understandRulesBtn');

  // Limit to 6 cards per view
  const MESSAGES_PER_PAGE = 6;
  let currentPage = 0;

  // Default authentic quest notices (Exact 9 comments requested by user)
  const defaultQuests = [
    {
      id: 1,
      author: 'Andi',
      time: '1 hari lalu',
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
      time: '2 hari lalu',
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
      time: '2 hari lalu',
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
      time: '3 hari lalu',
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
      time: '4 hari lalu',
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
      time: '4 hari lalu',
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
      time: '5 hari lalu',
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
      time: '6 hari lalu',
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
      time: '1 minggu lalu',
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

  // Retrieve saved custom user comments
  let userQuests = [];
  try {
    const savedCustom = localStorage.getItem('rfm_user_guild_comments');
    if (savedCustom) {
      userQuests = JSON.parse(savedCustom).map(q => ({
        ...q,
        baseLikes: 0,
        time: (q.time === 'just now' || !q.time) ? 'Baru saja' : q.time
      }));
    } else {
      // Migrate any previously submitted user comments from legacy key
      const legacySaved = localStorage.getItem('rfm_guild_quests_v3') || localStorage.getItem('rfm_guild_quests_v2');
      if (legacySaved) {
        const parsed = JSON.parse(legacySaved);
        if (Array.isArray(parsed)) {
          // User-created comments have numeric timestamp ID (> 1000000000)
          const customOnly = parsed.filter(item => item && item.id > 1000000000).map(q => ({
            ...q,
            baseLikes: 0,
            time: (q.time === 'just now' || !q.time) ? 'Baru saja' : q.time
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

  function getCompleteQuestsList() {
    return [...userQuests, ...defaultQuests].map(quest => {
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

    // Top-right royal crown banner ribbon (Consistent across ALL cards per user request)
    const ribbonHtml = `<div class="quest-banner-ribbon ribbon-blue"><span class="ribbon-crown">👑</span></div>`;

    // Bottom-right red wax seal with gold fleur-de-lis (Consistent across ALL cards per user request)
    const sealHtml = `<div class="quest-wax-seal" title="Royal Wax Seal">⚜️</div>`;

    // Avatar
    const avatarSvg = getCharacterAvatarSvg(quest.avatarType || 'rafzz');

    card.innerHTML = `
      <div class="quest-pin pin-left"></div>
      <div class="quest-pin pin-right"></div>
      ${ribbonHtml}

      <div class="quest-card-header">
        <div class="quest-author-avatar">${avatarSvg}</div>
        <div class="quest-author-meta">
          <span class="quest-author-name">${escapeHTML(quest.author)}</span>
          <span class="quest-time">${escapeHTML(quest.time)}</span>
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
    if (!isCurrentlyLiked) {
      likedQuestIds.add(id);
      playSound('blip');
    } else {
      likedQuestIds.delete(id);
    }

    try {
      localStorage.setItem('rfm_guild_liked_ids_v1', JSON.stringify([...likedQuestIds]));
    } catch (e) {}

    questsList = getCompleteQuestsList();

    const targetQuest = questsList.find(q => q.id === id);
    if (targetQuest) {
      btn.classList.toggle('liked', !isCurrentlyLiked);
      const countEl = btn.querySelector('.like-count');
      if (countEl) countEl.textContent = targetQuest.likes;
    }
  }

  // Scroll lock helper for all dialog modals
  function lockBodyScroll() {
    document.body.classList.add('modal-scroll-locked');
  }

  function unlockBodyScroll() {
    const hasOpenModal = document.querySelector('.guild-modal-overlay.open, .cert-modal-backdrop.active');
    if (!hasOpenModal) {
      document.body.classList.remove('modal-scroll-locked');
    }
  }

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
    understandRulesBtn.addEventListener('click', closeGuildRulesModal);
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

  // Rules Agreement Checkbox & Submit Button State Controller
  const guildRulesAgreeCheckbox = document.getElementById('guildRulesAgreeCheckbox');
  const guildSubmitBtn = document.getElementById('guildSubmitBtn') || document.querySelector('.guild-pin-submit-btn');

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
        author: author,
        time: 'Baru saja',
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
    });
  }

  // Initial render of Adventurer's Guild Quest Board & submit button state
  renderQuestPages();
  updateGuildSubmitButtonState();

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
    constructor(el, hello) {
      this.el = el;
      this.hello = hello;
      this.bubble = el ? el.querySelector('.bubble') : null;
      this.sleeping = false;
      this.fleeing = false;
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
      if (!this.el || !this.el.parentElement) return;
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
      if (!this.el) return;
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
      if (!this.el) return;
      if (this.sleeping) {
        await this.wake();
        await this.say('Hah? Hamba tertidur…', 1800, false);
      } else {
        this.el.classList.add('jump');
        await this.say(this.hello, 1800);
        this.el.classList.remove('jump');
      }
    }

    async flee(mx) {
      if (!this.el || !this.el.parentElement || this.fleeing) return;
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
        if (this.sleeping || this.fleeing) continue;
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
    if (stage) stage.style.display = isMascotsEnabled ? '' : 'none';
    if (floor) floor.style.display = isMascotsEnabled ? '' : 'none';
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

  if (charA && charB) {
    mascotA = new Mascot(charA, 'Salam, Tuan!');
    mascotB = new Mascot(charB, 'Salam, Tuan!');

    window.addEventListener('pointermove', e => {
      if (!isMascotsEnabled || !isDragonEnabled) return;
      if (e.pointerType !== 'mouse') return;
      for (const m of [mascotA, mascotB]) {
        if (!m || !m.el) continue;
        const r = m.el.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        if (d < 175) m.flee(e.clientX);
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
  // 3D Medieval Tome: Riwayat Pendidikan (Interactive Education Book)
  // -------------------------------------------------------------------------
  const bookWrap = document.getElementById('wrap');
  const bookCover = document.getElementById('cover');
  const bookSheet = document.getElementById('sheet');
  const bookPhoto = document.getElementById('photo');

  if (bookCover && bookSheet && bookPhoto) {
    const educationPages = [
      {
        y: "2014 – 2020",
        n: "SDN 161 SUKAPURA",
        s: "Sekolah Dasar",
        d: "Menyelesaikan pendidikan dasar dan membangun dasar ilmu pengetahuan serta karakter diri yang kuat.",
        p: [
          "Belajar membaca, menulis, dan berhitung",
          "Mulai mengenal teman dan lingkungan sekolah",
          "Aktif dalam kegiatan pramuka dan minat belajar"
        ],
        img: "Assets/Images/SDN-161-sukapura.png"
      },
      {
        y: "2020 – 2023",
        n: "MTSN 2 KOTA BANDUNG",
        s: "Sekolah Menengah Pertama",
        d: "Menempuh pendidikan menengah pertama dengan berbagai pengalaman berharga dan mulai mendalami minat.",
        p: [
          "Mengenal berbagai mata pelajaran baru & sains",
          "Mulai tertarik pada dunia teknologi dan komputer",
          "Mengasah kemampuan logika dan kerjasama tim"
        ],
        img: "Assets/Images/mtsn-2-bandung.png"
      },
      {
        y: "2023 – Sekarang",
        n: "SMKN 13 BANDUNG",
        s: "Jurusan Rekayasa Perangkat Lunak (RPL)",
        d: "Aktif belajar dan mengembangkan skill di bidang pengembangan perangkat lunak, desain UI/UX, dan teknologi web.",
        p: [
          "Membuat berbagai proyek website dan aplikasi modern",
          "Mendalami Laravel, Flutter, JavaScript, dan basis data",
          "Terus belajar dan berkembang menjadi fullstack developer andal"
        ],
        img: "Assets/Images/smkn-13-bandung.png"
      }
    ];

    const schoolBuildingSvg = '<svg width="64" height="64" viewBox="0 0 24 24"><path d="M3 21h18M5 21V10l7-5 7 5v11M12 5V2.5h3M10 21v-5a2 2 0 014 0v5M8 12.5h1.500M14.500 12.500H16"/></svg>';
    let currentBookPageIndex = 0;
    let isBookTurningPage = false;

    function getBookPhotoHtml() {
      const p = educationPages[currentBookPageIndex];
      return `<div class="frame">${p.img ? `<img src="${p.img}" alt="Foto ${p.n}" class="school-photo-img">` : `<div class="ph">${schoolBuildingSvg}<span>Foto ${p.n}</span></div>`}</div>
      <p class="quote">“Pendidikan adalah pintu menuju masa depan yang lebih baik.”</p>`;
    }

    function getBookPageHtml() {
      const p = educationPages[currentBookPageIndex];
      const isLastPage = currentBookPageIndex === educationPages.length - 1;
      return `<span class="badge">${p.y}</span>
      <div class="school"><div><h2>${p.n}</h2></div></div>
      <p class="sub">${p.s}</p>
      <p class="desc">${p.d}</p>
      <ul>${p.p.map(x => `<li>${x}</li>`).join('')}</ul>
      <div class="foot">
        <button class="ghost" id="bookPrevBtn" ${currentBookPageIndex === 0 ? 'disabled' : ''}>◂ Kembali</button>
        <div class="dots" aria-label="Halaman ${currentBookPageIndex + 1} dari ${educationPages.length}">
          ${educationPages.map((_, k) => `<i class="${k === currentBookPageIndex ? 'on' : ''}"></i>`).join('')}
        </div>
        <button id="bookNextBtn">${isLastPage ? 'Tutup Buku' : 'Next ▸'}</button>
      </div>`;
    }

    function renderBook(animate) {
      const isLastPage = currentBookPageIndex === educationPages.length - 1;
      bookSheet.innerHTML = getBookPageHtml();
      bookPhoto.innerHTML = getBookPhotoHtml();
      bookSheet.className = bookPhoto.className = 'sheet' + (animate ? ' in' : '');

      const nextBtn = document.getElementById('bookNextBtn');
      const prevBtn = document.getElementById('bookPrevBtn');
      if (nextBtn) {
        if (isLastPage) {
          nextBtn.onclick = () => closeBook();
        } else {
          nextBtn.onclick = () => turnBookPage(1);
        }
      }
      if (prevBtn) {
        prevBtn.onclick = () => turnBookPage(-1);
      }
    }

    function turnBookPage(dir) {
      const nextIndex = currentBookPageIndex + dir;
      if (isBookTurningPage || nextIndex < 0 || nextIndex >= educationPages.length) return;
      isBookTurningPage = true;
      if (typeof playSound === 'function') playSound('unroll');
      bookSheet.className = bookPhoto.className = 'sheet out';
      setTimeout(() => {
        currentBookPageIndex = nextIndex;
        renderBook(true);
        isBookTurningPage = false;
      }, window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 340);
    }

    let isBookClosing = false;

    function openBook() {
      if (isBookClosing) return;
      if (bookWrap) bookWrap.classList.remove('closed');
      setTimeout(() => {
        if (bookCover) bookCover.classList.add('open');
        if (typeof playSound === 'function') playSound('unroll');
      }, 50);
    }

    function closeBook() {
      if (isBookClosing || isBookTurningPage) return;
      isBookClosing = true;
      if (typeof playSound === 'function') playSound('roll');

      // Tahap 1: Putar sampul 3D menutup ke arah kanan
      if (bookCover) bookCover.classList.remove('open');

      // Tahap 2: Saat sampul sudah melewati tengah (~420ms), geser wadah buku kembali ke tengah secara halus
      setTimeout(() => {
        if (bookWrap) bookWrap.classList.add('closed');
      }, 420);

      // Tahap 3: Saat sampul menutup sempurna (~850ms), bunyikan klik kunci buku & reset halaman
      setTimeout(() => {
        if (typeof playSound === 'function') playSound('click');
        currentBookPageIndex = 0;
        renderBook(false);
        isBookClosing = false;
      }, 850);
    }

    bookCover.addEventListener('click', openBook);
    renderBook(false);

    // Auto-open buku HANYA saat buku (#wrap) sudah benar-benar terlihat di depan mata pengguna
    let hasAutoOpenedBook = false;

    function checkAndAutoOpenBook() {
      if (hasAutoOpenedBook || !bookWrap || !bookCover) return;
      const rect = bookWrap.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Pastikan buku sudah berada di area pandang aktif (puncak buku sudah melewati 70% tinggi layar)
      if (rect.top < windowHeight * 0.70 && rect.bottom > windowHeight * 0.20) {
        hasAutoOpenedBook = true;
        // Jeda sejenak agar pengguna sempat melihat buku tertutup, lalu melihat animasi sampul terbuka secara nyata
        setTimeout(() => {
          if (!bookCover.classList.contains('open')) {
            openBook();
          }
        }, 350);
      }
    }

    if ('IntersectionObserver' in window && bookWrap) {
      const bookObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAutoOpenedBook) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            // Hanya buka saat buku sudah naik di layar dan terlihat jelas
            if (rect.top < windowHeight * 0.70 && rect.bottom > windowHeight * 0.20) {
              hasAutoOpenedBook = true;
              bookObserver.disconnect();
              setTimeout(() => {
                if (!bookCover.classList.contains('open')) {
                  openBook();
                }
              }, 350);
            }
          }
        });
      }, {
        threshold: [0.25, 0.4, 0.6]
      });
      bookObserver.observe(bookWrap);
      window.addEventListener('scroll', checkAndAutoOpenBook, { passive: true });
    } else {
      window.addEventListener('scroll', checkAndAutoOpenBook, { passive: true });
    }

    window.addEventListener('keydown', (e) => {
      if (bookCover && bookCover.classList.contains('open')) {
        if (e.key === 'ArrowRight') turnBookPage(1);
        if (e.key === 'ArrowLeft') turnBookPage(-1);
      }
    });
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
});

