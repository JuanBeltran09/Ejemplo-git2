/**
 * CRAFT & CODE — INTERACTIVE JS ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initThemeToggle();
  initMobileMenu();
  initHeroRandomizer();
  initAnatomyExplorer();
  initStudioLab();
  initQuizEngine();
});

/* --------------------------------------------------------------------------
   1. Cursor Ambient Glow Tracker
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.transform = `translate(${glowX - 225}px, ${glowY - 225}px)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* --------------------------------------------------------------------------
   2. Theme Toggle (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    showToast(isLight ? 'Modo Claro Activado' : 'Modo Oscuro Cyber Activado');
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const isOpen = navLinks.classList.contains('mobile-open');
    menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu when clicking links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* --------------------------------------------------------------------------
   4. Hero Swatch Randomizer
   -------------------------------------------------------------------------- */
function initHeroRandomizer() {
  const btn = document.getElementById('randomizeHeroColor');
  const swatch = document.getElementById('heroSwatch');
  const hexText = document.getElementById('heroColorHex');
  if (!btn || !swatch || !hexText) return;

  const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#f43f5e', '#38bdf8'];
  let currIdx = 0;

  btn.addEventListener('click', () => {
    currIdx = (currIdx + 1) % colors.length;
    const selectedColor = colors[currIdx];
    
    swatch.style.backgroundColor = selectedColor;
    swatch.style.boxShadow = `0 0 12px ${selectedColor}`;
    hexText.textContent = selectedColor.toUpperCase();
    document.documentElement.style.setProperty('--accent-cyan', selectedColor);

    showToast(`Color de Acento: ${selectedColor.toUpperCase()}`);
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Anatomy Explorer
   -------------------------------------------------------------------------- */
function initAnatomyExplorer() {
  const boxes = document.querySelectorAll('.anatomy-box');
  const badge = document.getElementById('anatomyBadge');
  const title = document.getElementById('anatomyTitle');
  const desc = document.getElementById('anatomyDesc');
  const code = document.getElementById('anatomyCodeSnippet');
  const copyBtn = document.getElementById('copyCodeBtn');

  const anatomyData = {
    header: {
      tag: '<header>',
      title: 'Header & Navegación Principal',
      desc: 'Alberga la identidad de marca (logo) y los enlaces clave. Utiliza posición fija o pegajosa con backdrop-filter glassmorphic para dar contexto persistente al usuario.',
      snippet: `/* CSS del Header Semántico */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(16px);
  background: rgba(23, 32, 54, 0.7);
  border-bottom: 1px solid var(--border);
}`
    },
    hero: {
      tag: '<section class="hero">',
      title: 'Sección Hero (Héroe)',
      desc: 'Es la propuesta de valor principal de la web. Captura la atención en los primeros 3 segundos con un titular impactante, llamado a la acción (CTA) e ilustración o demostración interactiva.',
      snippet: `<!-- HTML de la Sección Héroe -->
<section class="hero">
  <h1>Diseño Web Expresivo</h1>
  <p>Construyendo el futuro digital...</p>
  <button class="btn-primary">Empieza Ahora</button>
</section>`
    },
    content: {
      tag: '<main>',
      title: 'Contenido Principal (Main Area)',
      desc: 'El núcleo de la página que contiene los artículos, tarjetas, laboratorios e información relevante. Estructurado con retícula (CSS Grid) adaptativa.',
      snippet: `/* CSS Grid para Tarjetas */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}`
    },
    sidebar: {
      tag: '<aside>',
      title: 'Barra Lateral (Sidebar)',
      desc: 'Proporciona información secundaria, filtros de búsqueda, widgets o navegación contextual relacionada sin distraer del contenido principal.',
      snippet: `<!-- HTML de la Barra Lateral -->
<aside class="sidebar">
  <h3>Filtros de Búsqueda</h3>
  <ul class="filter-list">...</ul>
</aside>`
    },
    footer: {
      tag: '<footer>',
      title: 'Pie de Página (Footer)',
      desc: 'Cierra la experiencia de navegación con copyright, enlaces legales, redes sociales y mapas del sitio secundario.',
      snippet: `/* CSS del Pie de Página */
footer {
  margin-top: 80px;
  padding: 40px 0;
  border-top: 1px solid var(--border-color);
  background: var(--bg-base);
}`
    }
  };

  boxes.forEach(box => {
    box.addEventListener('click', () => {
      boxes.forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');

      const partKey = box.getAttribute('data-part');
      const data = anatomyData[partKey];

      if (data) {
        badge.textContent = data.tag;
        title.textContent = data.title;
        desc.textContent = data.desc;
        code.textContent = data.snippet;
      }
    });
  });

  // Select default box (Hero)
  const defaultBox = document.querySelector('.anatomy-box[data-part="hero"]');
  if (defaultBox) defaultBox.click();

  if (copyBtn && code) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(code.textContent);
      showToast('Código HTML/CSS copiado al portapapeles');
    });
  }
}

/* --------------------------------------------------------------------------
   6. Studio Lab Interactivity
   -------------------------------------------------------------------------- */
function initStudioLab() {
  // Tabs Switcher
  const tabBtns = document.querySelectorAll('.lab-tab-btn');
  const panels = document.querySelectorAll('.lab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Tab 1: Typography Lab
  const fontSelect = document.getElementById('fontSelect');
  const fontSizeRange = document.getElementById('fontSizeRange');
  const fontSizeVal = document.getElementById('fontSizeVal');
  const lineHeightRange = document.getElementById('lineHeightRange');
  const lineHeightVal = document.getElementById('lineHeightVal');
  const letterSpacingRange = document.getElementById('letterSpacingRange');
  const letterSpacingVal = document.getElementById('letterSpacingVal');
  
  const typoHeading = document.getElementById('typoHeadingDemo');
  const typoPara = document.getElementById('typoParagraphDemo');

  if (fontSelect && fontSizeRange) {
    fontSelect.addEventListener('change', () => {
      typoHeading.style.fontFamily = fontSelect.value;
      typoPara.style.fontFamily = fontSelect.value;
    });

    fontSizeRange.addEventListener('input', () => {
      const val = `${fontSizeRange.value}px`;
      fontSizeVal.textContent = val;
      typoHeading.style.fontSize = val;
    });

    lineHeightRange.addEventListener('input', () => {
      const val = lineHeightRange.value;
      lineHeightVal.textContent = val;
      typoHeading.style.lineHeight = val;
      typoPara.style.lineHeight = val;
    });

    letterSpacingRange.addEventListener('input', () => {
      const val = `${letterSpacingRange.value}px`;
      letterSpacingVal.textContent = val;
      typoHeading.style.letterSpacing = val;
    });
  }

  // Tab 2: Color Palettes Lab
  const paletteCards = document.querySelectorAll('.palette-card');
  const copyPaletteBtn = document.getElementById('copyPaletteCss');

  paletteCards.forEach(card => {
    card.addEventListener('click', () => {
      paletteCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const themeName = card.getAttribute('data-theme');
      if (themeName === 'cyber') {
        document.documentElement.removeAttribute('data-active-theme');
      } else {
        document.documentElement.setAttribute('data-active-theme', themeName);
      }
      showToast(`Paleta aplicada: ${card.querySelector('h5').textContent}`);
    });
  });

  if (copyPaletteBtn) {
    copyPaletteBtn.addEventListener('click', () => {
      const cssVars = `:root {
  --bg-base: ${getComputedStyle(document.body).getPropertyValue('--bg-base')};
  --bg-card: ${getComputedStyle(document.body).getPropertyValue('--bg-card')};
  --accent-cyan: ${getComputedStyle(document.body).getPropertyValue('--accent-cyan')};
  --accent-violet: ${getComputedStyle(document.body).getPropertyValue('--accent-violet')};
}`;
      navigator.clipboard.writeText(cssVars);
      showToast('Variables CSS de la paleta copiadas al portapapeles');
    });
  }

  // Tab 3: Layout & Grid Lab
  const gridModeSelect = document.getElementById('gridModeSelect');
  const gapRange = document.getElementById('gapRange');
  const gapVal = document.getElementById('gapVal');
  const radiusRange = document.getElementById('radiusRange');
  const radiusVal = document.getElementById('radiusVal');
  const layoutDemoTarget = document.getElementById('layoutDemoTarget');

  if (gridModeSelect && layoutDemoTarget) {
    gridModeSelect.addEventListener('change', () => {
      layoutDemoTarget.className = `layout-demo-target ${gridModeSelect.value}`;
    });

    gapRange.addEventListener('input', () => {
      const val = `${gapRange.value}px`;
      gapVal.textContent = val;
      layoutDemoTarget.style.gap = val;
    });

    radiusRange.addEventListener('input', () => {
      const val = `${radiusRange.value}px`;
      radiusVal.textContent = val;
      const demoBoxes = layoutDemoTarget.querySelectorAll('.demo-grid-box');
      demoBoxes.forEach(box => box.style.borderRadius = val);
    });
  }

  // Tab 4: Glassmorphism & FX Lab
  const blurRange = document.getElementById('blurRange');
  const blurVal = document.getElementById('blurVal');
  const opacityRange = document.getElementById('opacityRange');
  const opacityVal = document.getElementById('opacityVal');
  const shadowRange = document.getElementById('shadowRange');
  const shadowVal = document.getElementById('shadowVal');
  const glassDemoCard = document.getElementById('glassDemoCard');

  if (blurRange && glassDemoCard) {
    blurRange.addEventListener('input', () => {
      const val = `${blurRange.value}px`;
      blurVal.textContent = val;
      glassDemoCard.style.backdropFilter = `blur(${val})`;
      glassDemoCard.style.webkitBackdropFilter = `blur(${val})`;
    });

    opacityRange.addEventListener('input', () => {
      const val = opacityRange.value;
      opacityVal.textContent = val;
      glassDemoCard.style.backgroundColor = `rgba(255, 255, 255, ${val})`;
    });

    shadowRange.addEventListener('input', () => {
      const val = `${shadowRange.value}px`;
      shadowVal.textContent = val;
      glassDemoCard.style.boxShadow = `0 8px ${val} rgba(0, 0, 0, 0.3)`;
    });
  }
}

/* --------------------------------------------------------------------------
   7. Interactive Quiz Engine
   -------------------------------------------------------------------------- */
function initQuizEngine() {
  const quizQuestions = [
    {
      q: 'Al comenzar un diseño web, ¿qué elemento priorizas ante todo?',
      options: [
        { text: 'Alineación de rejillas, márgenes matemáticos y jerarquía de datos.', type: 'architect' },
        { text: 'Eliminar elementos innecesarios y buscar la máxima simplicidad.', type: 'minimalist' },
        { text: 'Seleccionar colores vibrantes, sombras fluidas y transiciones al hacer scroll.', type: 'motion' }
      ]
    },
    {
      q: '¿Cómo abordas la elección de fuentes tipográficas?',
      options: [
        { text: 'Establezco una escala tipográfica estricta con ratio armónico.', type: 'architect' },
        { text: 'Una sola familia tipográfica versátil (p. ej. Inter) con pocos pesos.', type: 'minimalist' },
        { text: 'Emparejo una fuente Display expresiva e inusual con efectos en hover.', type: 'motion' }
      ]
    },
    {
      q: '¿Qué opinión tienes sobre las animaciones en un sitio web?',
      options: [
        { text: 'Deben ser utilitarias y breves (menos de 200ms) para dar feedback.', type: 'architect' },
        { text: 'Menos es más; solo utilizo transiciones cuando son indispensables.', type: 'minimalist' },
        { text: 'Son el alma de la web: interacciones micro, parallax y secuencias de carga.', type: 'motion' }
      ]
    },
    {
      q: '¿Cuál es tu métrica de éxito principal para una interfaz?',
      options: [
        { text: 'Consistencia visual absoluta y facilidad de escalabilidad en código.', type: 'architect' },
        { text: 'Claridad mental y velocidad instantánea de comprensión por el usuario.', type: 'minimalist' },
        { text: 'El factor "WOW" que enamora al usuario desde el primer vistazo.', type: 'motion' }
      ]
    }
  ];

  let currentStep = 0;
  const scores = { architect: 0, minimalist: 0, motion: 0 };

  const progressBar = document.getElementById('quizProgressBar');
  const stepText = document.getElementById('quizStep');
  const questionText = document.getElementById('quizQuestion');
  const optionsContainer = document.getElementById('quizOptions');
  const quizBody = document.getElementById('quizBody');
  const quizResult = document.getElementById('quizResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const restartBtn = document.getElementById('restartQuizBtn');

  if (!optionsContainer) return;

  function renderQuestion() {
    const qData = quizQuestions[currentStep];
    stepText.textContent = `Pregunta ${currentStep + 1} de ${quizQuestions.length}`;
    questionText.textContent = qData.q;
    progressBar.style.width = `${((currentStep + 1) / quizQuestions.length) * 100}%`;

    optionsContainer.innerHTML = '';
    qData.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${opt.text}</span> <i class="fa-solid fa-chevron-right"></i>`;
      btn.addEventListener('click', () => {
        scores[opt.type]++;
        currentStep++;
        if (currentStep < quizQuestions.length) {
          renderQuestion();
        } else {
          showResult();
        }
      });
      optionsContainer.appendChild(btn);
    });
  }

  function showResult() {
    quizBody.classList.add('hidden');
    quizResult.classList.remove('hidden');

    let highestType = 'architect';
    if (scores.minimalist > scores[highestType]) highestType = 'minimalist';
    if (scores.motion > scores[highestType]) highestType = 'motion';

    const archetypes = {
      architect: {
        title: 'El Arquitecto del Grid',
        desc: 'Amas la estructura impecable, los sistemas de diseño rigurosos, el CSS Grid estructurado y la disciplina visual. Tus sitios destacan por su organización cristalina.'
      },
      minimalist: {
        title: 'El Maestro Minimalista',
        desc: 'Tu lema es "Menos es Más". Crees en la elegancia del espacio en blanco, la tipografía pulida y la eliminación total del ruido visual secundario.'
      },
      motion: {
        title: 'El Poeta de la Animación',
        desc: 'Vives para deslumbrar. Para ti la web es un lienzo dinámico donde el color, la física de movimiento, las sombras y la interactividad crean emociones memorables.'
      }
    };

    const res = archetypes[highestType];
    resultTitle.textContent = res.title;
    resultDesc.textContent = res.desc;
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentStep = 0;
      scores.architect = 0;
      scores.minimalist = 0;
      scores.motion = 0;
      quizResult.classList.add('hidden');
      quizBody.classList.remove('hidden');
      renderQuestion();
    });
  }

  renderQuestion();
}

/* --------------------------------------------------------------------------
   8. Helper Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
