<template>
  <section ref="sectionRef" class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-14">
    <!-- لایه‌ی تزئینی تمام‌عرض (مستقل از عرض محدودِ محتوا، برای جلوگیری از برش بلاب در دسکتاپ بزرگ) -->
    <div class="decor-layer pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden -z-10">
      <div class="blob blob-1 absolute -top-12 end-6 md:end-24 w-72 h-72 rounded-full bg-blush/15 blur-[110px]"></div>
      <div class="blob blob-2 absolute -bottom-16 start-6 md:start-24 w-64 h-64 rounded-full bg-lilac/15 blur-[100px]"></div>
      <span class="particle particle-1" aria-hidden="true"></span>
      <span class="particle particle-2" aria-hidden="true"></span>
      <span class="particle particle-3" aria-hidden="true"></span>
    </div>

    <!-- اسکلتون لودینگ -->
    <div v-if="loading" class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 fade-in">
      <div v-for="n in 2" :key="n" class="h-[200px] sm:h-[230px] md:h-[250px] rounded-[24px] skeleton-shimmer" />
    </div>

    <!-- خالی -->
    <div
      v-else-if="!banners.length"
      class="relative z-10 h-[180px] rounded-[24px] border border-dashed border-ink/15 bg-ink/[0.02] flex flex-col items-center justify-center gap-2 text-ink/40 text-sm fade-in"
    >
      <svg class="w-8 h-8 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 15l4.5-4.5a2 2 0 012.8 0L15 15M14 13l1.5-1.5a2 2 0 012.8 0L21 14" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
      بنری برای نمایش وجود ندارد.
    </div>

    <!-- بنرها -->
    <div v-else class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      <div
        v-for="(banner, index) in banners"
        :key="banner.id ?? index"
        :ref="(el) => setCardRef(el, index)"
        class="banner-card-wrap"
        :class="[{ 'is-visible': visible[index] }, index % 2 === 0 ? 'from-right' : 'from-left']"
        :style="{ transitionDelay: index * 0.15 + 's' }"
      >
        <NuxtLink
          :to="banner.link || '/shop'"
          class="banner-card group relative h-[200px] sm:h-[230px] md:h-[250px] rounded-[24px] overflow-hidden border border-ink/5 block"
          @pointerenter="onCardEnter"
          @mousemove="onCardMouseMove"
          @mouseleave="onCardLeave"
          @pointerdown="onCardRipple"
        >
          <!-- قاب نور دور کارت -->
          <span class="glow-ring" aria-hidden="true"></span>

          <!-- تصویر با پرده‌کشی ورودی + نفس‌کشیدن آرام + زوم هاور -->
          <div class="img-reveal absolute inset-0">
            <div class="img-breathe absolute inset-0">
              <img
                :src="banner.image"
                :alt="banner.title"
                class="banner-img w-full h-full object-cover object-center block"
                loading="lazy"
              />
            </div>
          </div>

          <!-- گرادیانت -->
          <div class="banner-overlay absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/5" />

          <!-- نور دنبال‌کننده‌ی موس -->
          <span class="cursor-spot absolute inset-0" aria-hidden="true"></span>

          <!-- درخشش‌های شاین: ورودی + هاور -->
          <span class="banner-shine shine-auto absolute inset-0" aria-hidden="true"></span>
          <span class="banner-shine shine-hover absolute inset-0 opacity-0" aria-hidden="true"></span>

          <!-- کادر داخلی -->
          <div class="absolute inset-3 rounded-[18px] border border-white/10 pointer-events-none banner-frame" />

          <!-- محتوا -->
          <div class="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
            <!-- بج -->
            <div class="flex justify-start">
              <span
                v-if="banner.badge"
                class="banner-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide bg-white/15 backdrop-blur-md text-white border border-white/20"
              >
                <span class="badge-dot w-1.5 h-1.5 rounded-full bg-gold" />
                {{ banner.badge }}
              </span>
            </div>

            <!-- پایین -->
            <div class="flex items-end justify-between gap-4">
              <div class="space-y-1.5 overflow-hidden">
                <h3
                  v-if="banner.title"
                  class="banner-title relative w-fit text-white font-display text-lg sm:text-2xl font-bold tracking-wide"
                >
                  {{ banner.title }}
                  <span class="title-underline absolute -bottom-1 right-0 h-[2px] bg-gold" aria-hidden="true"></span>
                </h3>

                <p
                  v-if="banner.subtitle"
                  class="banner-subtitle text-white/75 text-xs sm:text-sm max-w-[280px] leading-relaxed line-clamp-1"
                >
                  {{ banner.subtitle }}
                </p>
              </div>

              <!-- دکمه فلش (مغناطیسی) -->
              <span class="banner-btn relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shrink-0 shadow-lg">
                <svg class="banner-arrow w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  sliderId: {
    type: [Number, String],
    default: 1,
  },
});

const banners = ref([]);
const loading = ref(true);
const sectionRef = ref(null);
const cardRefs = ref([]);
const visible = reactive({});

let observer = null;
let fallbackTimer = null;

/* ---------- رفرنس کارت‌ها فقط برای Scroll Reveal (روی wrapper ساده) ---------- */
const setCardRef = (el, i) => {
  if (el) cardRefs.value[i] = el;
};

/* =========================================================
   افکت‌های تعاملی خارج از reactivity ویو (بدون لرزش/جلپی)
   ========================================================= */
const onCardEnter = (e) => {
  const card = e.currentTarget;
  card._rect = card.getBoundingClientRect();
  card._btn = card.querySelector('.banner-btn');
  if (card._btn) card._btnRect = card._btn.getBoundingClientRect();
};

const onCardMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card._rect || (card._rect = card.getBoundingClientRect());

  const px = ((e.clientX - rect.left) / rect.width) * 100;
  const py = ((e.clientY - rect.top) / rect.height) * 100;
  card.style.setProperty('--mx', `${px}%`);
  card.style.setProperty('--my', `${py}%`);

  const btn = card._btn;
  const btnRect = card._btnRect;
  if (btn && btnRect) {
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxDist = 80;

    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * 8;
      const angle = Math.atan2(dy, dx);
      btn.style.translate = `${Math.cos(angle) * strength}px ${Math.sin(angle) * strength}px`;
    } else {
      btn.style.translate = '0px 0px';
    }
  }
};

const onCardLeave = (e) => {
  const card = e.currentTarget;
  card.style.setProperty('--mx', '50%');
  card.style.setProperty('--my', '50%');
  if (card._btn) card._btn.style.translate = '0px 0px';
};

const onCardRipple = (e) => {
  const card = e.currentTarget;
  const rect = card._rect || card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'card-ripple';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  card.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
};

/* ---------- Scroll Reveal با IntersectionObserver + fallback ایمن ---------- */
const revealAll = () => {
  banners.value.forEach((_, i) => {
    visible[i] = true;
  });
};

const setupObserver = () => {
  if (observer) observer.disconnect();
  clearTimeout(fallbackTimer);

  if (typeof IntersectionObserver === 'undefined') {
    revealAll();
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = cardRefs.value.findIndex((el) => el === entry.target);
        if (idx !== -1 && entry.isIntersecting) {
          visible[idx] = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  cardRefs.value.forEach((el) => el && observer.observe(el));
  fallbackTimer = setTimeout(revealAll, 1000);
};

/* ---------- دریافت بنرها ---------- */
const getContent = () => {
  loading.value = true;

  useGarnetApiFetch('sliders/show', { id: props.sliderId })
    .then((response) => {
      const items = response?.Slider?.slider_images || [];

      banners.value = items.map((item) => ({
        id: item.id,
        image: item.file,
        link: item.button_link,
        title: item.title || item.name || '',
        subtitle: item.subtitle || item.description || '',
        badge: item.button_text || '',
      }));

      cardRefs.value = [];
      nextTick(() => setupObserver());
    })
    .catch((error) => {
      toast.error(t(error));
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  getContent();
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  clearTimeout(fallbackTimer);
});
</script>

<style scoped>
.decor-layer { max-width: 100vw; }
.fade-in { animation: fadeIn 0.5s ease both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* ── بلاب‌های شناور ──────────────────────────────────────── */
.blob { animation: blobFloat 12s ease-in-out infinite; }
.blob-2 { animation-duration: 14s; animation-delay: -4s; }
@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33%      { transform: translate(15px, -18px) scale(1.07) rotate(6deg); }
  66%      { transform: translate(-12px, 14px) scale(0.95) rotate(-5deg); }
}

/* ── ذرات تزئینی ─────────────────────────────────────────── */
.particle {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: radial-gradient(circle, theme('colors.gold', #c5a059), transparent 70%);
  opacity: 0;
}
.particle-1 { top: 15%; inset-inline-start: 12%; animation: floatParticle 8s ease-in-out infinite 0.3s; }
.particle-2 { top: 60%; inset-inline-end: 10%; animation: floatParticle 9s ease-in-out infinite 2s; width: 4px; height: 4px; }
.particle-3 { top: 40%; inset-inline-end: 30%; animation: floatParticle 10s ease-in-out infinite 1s; }
@keyframes floatParticle {
  0%   { opacity: 0; transform: translateY(0) scale(0.6); }
  15%  { opacity: 0.8; }
  50%  { opacity: 0.5; transform: translateY(-36px) scale(1.15); }
  85%  { opacity: 0.6; }
  100% { opacity: 0; transform: translateY(-70px) scale(0.6); }
}

/* ── Scroll Reveal کارت‌ها (زیگزاگ) ──────────────────────── */
.banner-card-wrap {
  opacity: 0;
  filter: blur(5px);
  transition:
    opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.85s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card-wrap.from-right { transform: translate(36px, 30px) rotate(1.2deg) scale(0.96); }
.banner-card-wrap.from-left  { transform: translate(-36px, 30px) rotate(-1.2deg) scale(0.96); }
.banner-card-wrap.is-visible {
  opacity: 1;
  filter: blur(0);
  transform: translate(0, 0) rotate(0deg) scale(1);
}

/* ── کارت ────────────────────────────────────────────────── */
.banner-card {
  position: relative;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  backface-visibility: hidden;
}
.banner-card:hover {
  transform: scale(1.005);
  box-shadow: 0 24px 48px rgba(63, 58, 53, 0.18), 0 8px 16px rgba(63, 58, 53, 0.08);
}

/* ── پرده‌کشی تصویر ورودی ────────────────────────────────── */
.img-reveal {
  clip-path: inset(0 0 0 100%);
  transition: clip-path 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card-wrap.is-visible .img-reveal {
  clip-path: inset(0 0 0 0%);
  transition-delay: 0.1s;
}

/* ── نفس‌کشیدن آرام (idle) + زوم هاور ─────────────────────── */
.img-breathe { animation: breathe 6.5s ease-in-out infinite; }
.banner-card:hover .img-breathe { animation-play-state: paused; }
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.02); }
}
.banner-img {
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
}
.banner-card:hover .banner-img {
  transform: scale(1.08);
  filter: brightness(1.02) saturate(1.05);
}

/* ── گرادیانت ───────────────────────────────────────────── */
.banner-overlay { transition: opacity 0.5s ease; }
.banner-card:hover .banner-overlay { opacity: 0.92; }

/* ── نور دنبال‌کننده‌ی موس ──────────────────────────────── */
.cursor-spot {
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  mix-blend-mode: overlay;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.35), transparent 45%);
}
.banner-card:hover .cursor-spot { opacity: 1; }

/* ── شاین ورودی + هاور ──────────────────────────────────── */
.banner-shine {
  z-index: 4;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.35) 50%, transparent 65%);
}
.shine-auto { transform: translateX(-130%); }
.banner-card-wrap.is-visible .shine-auto {
  animation: shineSweep 1.2s ease forwards;
  animation-delay: 0.5s;
}
.shine-hover { transform: translateX(-130%); }
.banner-card:hover .shine-hover {
  opacity: 1;
  animation: shineSweep 0.9s ease forwards;
}
@keyframes shineSweep { to { transform: translateX(130%); } }

/* ── کادر داخلی ─────────────────────────────────────────── */
.banner-frame {
  transition: border-color 0.5s ease, inset 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card:hover .banner-frame {
  border-color: rgba(255, 255, 255, 0.28);
  inset: 8px;
}

/* ── قاب نور چرخان دور کارت ─────────────────────────────── */
.glow-ring {
  position: absolute;
  inset: 0;
  z-index: 5;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.glow-ring::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  padding: 2px;
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent 0deg,
    theme('colors.gold', #c5a059) 60deg,
    transparent 140deg,
    theme('colors.blush', #e8b0a8) 220deg,
    transparent 300deg
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: spinAngle 5s linear infinite;
}
.banner-card-wrap.is-visible .glow-ring {
  animation: ringWelcome 1.6s ease-out;
  animation-delay: 0.7s;
}
@keyframes ringWelcome { 0% { opacity: 0; } 35% { opacity: 1; } 100% { opacity: 0; } }
.banner-card:hover .glow-ring { opacity: 1; animation: none; }
@property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
@keyframes spinAngle { to { --angle: 360deg; } }

/* ── بج ─────────────────────────────────────────────────── */
.banner-badge {
  opacity: 0;
  transform: translateY(-6px) scale(0.85);
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
}
.banner-card-wrap.is-visible .banner-badge {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.55s;
}
.banner-card:hover .banner-badge {
  background-color: rgba(162, 132, 102, 0.35);
  border-color: rgba(162, 132, 102, 0.5);
  transform: translateY(-2px) scale(1);
}
.badge-dot { animation: badgePulse 2s ease-in-out infinite; }
@keyframes badgePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.7); }
}

/* ── عنوان + زیرخط متحرک ────────────────────────────────── */
.banner-title {
  transition: color 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 0.4s ease;
}
.banner-card:hover .banner-title {
  transform: translateY(-3px);
  letter-spacing: 0.01em;
}
.title-underline {
  width: 0%;
  transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card:hover .title-underline { width: 100%; }

/* ── زیرعنوان ───────────────────────────────────────────── */
.banner-subtitle {
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.04s;
}
.banner-card:hover .banner-subtitle {
  opacity: 0.95;
  transform: translateY(-2px);
}

/* ── دکمه فلش مغناطیسی ──────────────────────────────────── */
.banner-btn {
  translate: 0px 0px;
  transition:
    background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    translate 0.2s ease-out,
    box-shadow 0.35s ease;
}
.banner-card:hover .banner-btn {
  background-color: theme('colors.gold', #a28466);
  border-color: theme('colors.gold', #a28466);
  transform: scale(1.15) rotate(-5deg);
  box-shadow: 0 8px 20px rgba(162, 132, 102, 0.45);
}
.banner-arrow { transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.banner-card:hover .banner-arrow { transform: translateX(-2px); }

/* ── Ripple کلیک/لمس ────────────────────────────────────── */
.banner-card :deep(.card-ripple) {
  position: absolute;
  z-index: 6;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(197, 160, 89, 0.4), rgba(197, 160, 89, 0) 70%);
  transform: scale(0);
  opacity: 0.8;
  pointer-events: none;
  animation: rippleAnim 0.6s ease-out forwards;
}
@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }

/* ── اسکلتون شیمر ───────────────────────────────────────── */
.skeleton-shimmer {
  position: relative;
  background: theme('colors.ink / 6%');
  overflow: hidden;
}
.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}
@keyframes shimmer {
  0%   { background-position: 150% 0; }
  100% { background-position: -50% 0; }
}

/* ── کاهش حرکت ──────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .banner-img, .img-breathe, .blob, .particle, .glow-ring::before,
  .shine-auto, .shine-hover, .badge-dot, .skeleton-shimmer::after, .card-ripple {
    animation: none !important;
  }
  .banner-card, .banner-card-wrap, .banner-img, .banner-btn, .img-reveal, .title-underline {
    transition: none !important;
  }
  .banner-card-wrap { opacity: 1; transform: none; filter: none; }
  .img-reveal { clip-path: none; }
}

@media (hover: none) {
  .cursor-spot { display: none; }
}
</style>