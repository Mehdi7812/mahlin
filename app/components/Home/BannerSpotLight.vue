<template>
  <section ref="sectionRef" class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16">
    <div class="decor-layer pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden -z-10">
      <!-- بلاب‌های تزئینی شناور -->
      <div class="blob blob-1 absolute -top-10 end-4 md:end-16 w-72 h-72 rounded-full bg-lilac/15 blur-[110px]"></div>
      <div class="blob blob-2 absolute -bottom-16 start-4 md:start-20 w-72 h-72 rounded-full bg-blush/15 blur-[110px]"></div>
      <div class="blob blob-3 absolute top-1/4 start-1/4 w-40 h-40 rounded-full bg-gold/10 blur-[90px]"></div>

      <!-- ذرات درخشان شناور تزئینی -->
      <span class="particle particle-1" aria-hidden="true"></span>
      <span class="particle particle-2" aria-hidden="true"></span>
      <span class="particle particle-3" aria-hidden="true"></span>
      <span class="particle particle-4" aria-hidden="true"></span>
    </div>

    <!-- هدر بخش -->
    <div v-if="!loading && banners.length" class="relative z-10 mb-6 md:mb-9 header-in">
      <div class="flex items-center gap-2 text-gold mb-2">
        <svg class="w-4 h-4 sparkle-spin" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
        </svg>
        <span class="text-xs sm:text-sm font-bold tracking-wide">کالکشن ویژه</span>
      </div>
      <div class="flex items-end justify-between gap-4 flex-wrap">
        <h2 class="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink [text-wrap:balance]">
          زیبایی‌ات را با ما کشف کن
        </h2>
        <svg class="hidden sm:block w-28 h-3 text-peach/70 -mb-1" viewBox="0 0 120 12" fill="none">
          <path class="squiggle" d="M2 8c10-10 20 6 30-2s20-8 30 0 20 6 30-2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      </div>
    </div>

    <!-- اسکلتون لودینگ -->
    <div v-if="loading" class="relative flex flex-col gap-5 md:gap-6 fade-in">
      <div class="w-full aspect-[16/7] rounded-[28px] overflow-hidden skeleton-shimmer"></div>
      <div class="w-full aspect-[16/7] rounded-[28px] overflow-hidden skeleton-shimmer"></div>
    </div>

    <!-- خالی -->
    <div
      v-else-if="!banners.length"
      class="h-[220px] rounded-[28px] border border-dashed border-ink/15 bg-ink/[0.02] flex flex-col items-center justify-center gap-2 text-ink/40 text-sm fade-in"
    >
      <svg class="w-9 h-9 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 15l4.5-4.5a2 2 0 012.8 0L15 15M14 13l1.5-1.5a2 2 0 012.8 0L21 14" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
      بنری برای نمایش وجود ندارد.
    </div>

    <!-- بنرها -->
    <div v-else class="relative z-10 flex flex-col gap-5 md:gap-6">
      <div
        v-for="(banner, i) in banners"
        :key="banner.id"
        :ref="(el) => setCardRef(el, i)"
        class="banner-card-wrap"
        :class="[{ 'is-visible': visible[i] }, i % 2 === 0 ? 'from-right' : 'from-left']"
        :style="{ transitionDelay: (i * 0.15) + 's' }"
      >
        <NuxtLink
          :to="banner.link || '/shop'"
          class="banner-card group relative block rounded-[28px] overflow-hidden shadow-[0_20px_50px_-30px_rgba(63,58,53,0.4)] bg-ink/5"
          @pointerenter="onCardEnter"
          @mousemove="onCardMouseMove"
          @mouseleave="onCardLeave"
          @pointerdown="onCardRipple"
        >
          <!-- قاب نور دور کارت (هاور + یک چشمک خوشامدگویی هنگام ورود) -->
          <span class="glow-ring" aria-hidden="true"></span>

          <!-- نور نرم دنبال‌کننده‌ی موس (کاملاً خارج از reactivity ویو) -->
          <span class="cursor-spot" aria-hidden="true"></span>

          <!-- پرده‌کشی تصویر هنگام ورود به دید + نفس‌کشیدن آرام -->
          <div class="img-reveal">
            <div class="img-breathe">
              <img
                :src="banner.image"
                :alt="banner.title || 'بنر فروشگاه'"
                class="banner-img block w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          <!-- شاین‌های مختلف: ورود، هاور، و دوره‌ای خودکار -->
          <span class="shine shine-auto" aria-hidden="true"></span>
          <span class="shine shine-hover" aria-hidden="true"></span>
          <span class="shine shine-ambient" :style="{ animationDelay: (i * 2 + 1.5) + 's' }" aria-hidden="true"></span>

          <!-- آیکون کوچک ورود با پالس + افکت مغناطیسی -->
          <span class="peek-icon">
            <span class="peek-icon-pulse" aria-hidden="true"></span>
            <svg class="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { toast } from 'vue-sonner';

const { t } = useI18n();

const props = defineProps({
  sliderId: {
    type: [Number, String, Array],
    default: () => [1, 2],
  },
});

const banners = ref([]);
const loading = ref(true);
const sectionRef = ref(null);
const cardRefs = ref([]);
const visible = reactive({});

let observer = null;
let fallbackTimer = null;

const sliderIdList = computed(() => {
  const raw = props.sliderId;
  if (Array.isArray(raw)) return raw.filter((v) => v !== null && v !== undefined && v !== '');
  if (raw === null || raw === undefined || raw === '') return [];
  return [raw];
});

const setCardRef = (el, i) => {
  if (el) cardRefs.value[i] = el;
};

const onCardEnter = (e) => {
  const card = e.currentTarget;
  card._rect = card.getBoundingClientRect();
  card._icon = card.querySelector('.peek-icon');
  if (card._icon) card._iconRect = card._icon.getBoundingClientRect();
};

const onCardMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card._rect || (card._rect = card.getBoundingClientRect());

  const px = ((e.clientX - rect.left) / rect.width) * 100;
  const py = ((e.clientY - rect.top) / rect.height) * 100;
  card.style.setProperty('--mx', `${px}%`);
  card.style.setProperty('--my', `${py}%`);

  const icon = card._icon;
  const iconRect = card._iconRect;
  if (icon && iconRect) {
    const cx = iconRect.left + iconRect.width / 2;
    const cy = iconRect.top + iconRect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxDist = 90;

    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * 9;
      const angle = Math.atan2(dy, dx);
      icon.style.translate = `${Math.cos(angle) * strength}px ${Math.sin(angle) * strength}px`;
    } else {
      icon.style.translate = '0px 0px';
    }
  }
};

const onCardLeave = (e) => {
  const card = e.currentTarget;
  card.style.setProperty('--mx', '50%');
  card.style.setProperty('--my', '50%');
  if (card._icon) card._icon.style.translate = '0px 0px';
};

const onCardRipple = (e) => {
  const card = e.currentTarget;
  const rect = card._rect || card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.1;
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  cardRefs.value.forEach((el) => el && observer.observe(el));

  fallbackTimer = setTimeout(revealAll, 1000);
};

const getContent = () => {
  const ids = sliderIdList.value;

  if (!ids.length) {
    banners.value = [];
    loading.value = false;
    return;
  }

  loading.value = true;

  const requests = ids.map((id) =>
    useGarnetApiFetch('sliders/show', { id })
      .then((response) => response?.Slider?.slider_images || [])
      .catch((error) => {
        console.error('[BannerStack] خطا در دریافت اسلایدر', id, error);
        return [];
      })
  );

  Promise.all(requests)
    .then((results) => {
      const items = results.flat();

      banners.value = items.map((item, i) => ({
        id: item.id ?? i,
        image: item.file,
        link: item.button_link,
        title: item.title || item.name || '',
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
/* ── لایه‌ی تزئینی تمام‌عرض ────────────────────────────────── */
.decor-layer {
  /* max-width به‌عنوان سقف امن در برابر مرورگرهایی که 100vw را
     با احتساب اسکرول‌بار محاسبه می‌کنند تا اسکرول افقی ایجاد نشود */
  max-width: 100vw;
}

/* ── ورود هدر ─────────────────────────────────────────────── */
.header-in { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
.fade-in { animation: fadeIn 0.5s ease both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.sparkle-spin { animation: sparkleSpin 3s ease-in-out infinite; }
@keyframes sparkleSpin {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50%      { transform: rotate(20deg) scale(1.15); }
}

.squiggle {
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  animation: drawLine 1.4s ease forwards 0.3s;
}
@keyframes drawLine { to { stroke-dashoffset: 0; } }

/* ── بلاب‌های شناور ──────────────────────────────────────── */
.blob { animation: blobFloat 11s ease-in-out infinite; }
.blob-2 { animation-duration: 13s; animation-delay: -3s; }
.blob-3 { animation-duration: 15s; animation-delay: -6s; }
@keyframes blobFloat {
  0%, 100%   { transform: translate(0, 0) scale(1) rotate(0deg); }
  33%        { transform: translate(15px, -20px) scale(1.08) rotate(8deg); }
  66%        { transform: translate(-10px, 15px) scale(0.95) rotate(-6deg); }
}

/* ── ذرات درخشان شناور ────────────────────────────────────── */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: radial-gradient(circle, theme('colors.gold', #c5a059), transparent 70%);
  pointer-events: none;
  opacity: 0;
  z-index: 1;
}
.particle-1 { top: 10%;  inset-inline-start: 8%;  animation: floatParticle 7s ease-in-out infinite 0.2s; }
.particle-2 { top: 55%;  inset-inline-end: 6%;    animation: floatParticle 9s ease-in-out infinite 1.5s; width: 4px; height: 4px; }
.particle-3 { top: 80%;  inset-inline-start: 20%; animation: floatParticle 8s ease-in-out infinite 3s; }
.particle-4 { top: 30%;  inset-inline-end: 25%;   animation: floatParticle 10s ease-in-out infinite 0.8s; width: 5px; height: 5px; }
@keyframes floatParticle {
  0%   { opacity: 0; transform: translateY(0) scale(0.6); }
  15%  { opacity: 0.8; }
  50%  { opacity: 0.5; transform: translateY(-40px) scale(1.2); }
  85%  { opacity: 0.7; }
  100% { opacity: 0; transform: translateY(-80px) scale(0.6); }
}

/* ── Scroll Reveal کارت‌ها: ورود منقطع (زیگزاگ) با کمی چرخش ── */
.banner-card-wrap {
  opacity: 0;
  filter: blur(6px);
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card-wrap.from-right { transform: translate(40px, 50px) rotate(1.5deg) scale(0.96); }
.banner-card-wrap.from-left  { transform: translate(-40px, 50px) rotate(-1.5deg) scale(0.96); }
.banner-card-wrap.is-visible {
  opacity: 1;
  filter: blur(0);
  transform: translate(0, 0) rotate(0deg) scale(1);
}

/* ── هاور کارت: کاملاً CSS، نرم ────────────────────────────── */
.banner-card {
  position: relative;
  transform: translateY(0) scale(1);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  backface-visibility: hidden;
}
.banner-card:hover {
  transform: translateY(-6px) scale(1.008);
  box-shadow: 0 30px 60px -28px rgba(63, 58, 53, 0.5);
}

/* ── پرده‌کشی تصویر هنگام ورود به دید ──────────────────────── */
.img-reveal {
  clip-path: inset(0 0 0 100%);
  transition: clip-path 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card-wrap.is-visible .img-reveal {
  clip-path: inset(0 0 0 0%);
  transition-delay: 0.12s;
}

/* ── نفس‌کشیدن آرام تصویر (متوقف در هاور) ─────────────────── */
.img-breathe {
  animation: breathe 6s ease-in-out infinite;
  transform-origin: center center;
}
.banner-card:hover .img-breathe {
  animation-play-state: paused;
}
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.018); }
}

/* ── زوم تصویر روی هاور (روی خودِ img، جدا از breathing) ──── */
.banner-img {
  transform: scale(1);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
  will-change: transform;
  backface-visibility: hidden;
}
.banner-card:hover .banner-img {
  transform: scale(1.045);
  filter: brightness(1.02) saturate(1.06);
}

/* ── نور نرم دنبال‌کننده‌ی موس (خارج از reactivity ویو) ───── */
.cursor-spot {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  mix-blend-mode: overlay;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.4), transparent 45%);
}
.banner-card:hover .cursor-spot { opacity: 1; }

/* ── شاین ورود + شاین هاور + شاین دوره‌ای خودکار ─────────── */
.shine {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.4) 50%, transparent 65%);
}
.shine-auto { transform: translateX(-130%); }
.banner-card-wrap.is-visible .shine-auto {
  animation: shineSweep 1.3s ease forwards;
  animation-delay: 0.55s;
}
.shine-hover {
  transform: translateX(-130%);
  opacity: 0;
}
.banner-card:hover .shine-hover {
  opacity: 1;
  animation: shineSweep 1s ease forwards;
}
@keyframes shineSweep { to { transform: translateX(130%); } }

.shine-ambient {
  transform: translateX(-130%);
  opacity: 0;
  animation: shineAmbientMove 7s ease-in-out infinite;
}
@keyframes shineAmbientMove {
  0%   { transform: translateX(-130%); opacity: 0; }
  6%   { opacity: 0.9; }
  22%  { transform: translateX(130%); opacity: 0; }
  100% { transform: translateX(130%); opacity: 0; }
}

/* ── قاب نور دور کارت: هاور + یک چشمک خوشامدگویی ─────────── */
.glow-ring {
  position: absolute;
  inset: 0;
  z-index: 6;
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
  animation: ringWelcome 1.8s ease-out;
  animation-delay: 0.8s;
}
@keyframes ringWelcome {
  0%   { opacity: 0; }
  35%  { opacity: 1; }
  100% { opacity: 0; }
}
.banner-card:hover .glow-ring {
  opacity: 1;
  animation: none;
}
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes spinAngle { to { --angle: 360deg; } }

/* ── آیکون کوچک ورود با پالس + جابجایی مغناطیسی ─────────── */
.peek-icon {
  position: absolute;
  bottom: 16px;
  inset-inline-end: 16px;
  z-index: 10;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  color: theme('colors.ink', #3f3a35);
  backdrop-filter: blur(8px);
  opacity: 0;
  transform: translateY(12px) scale(0.7);
  translate: 0px 0px;
  transition:
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    translate 0.25s ease-out,
    background-color 0.3s ease,
    color 0.3s ease;
}
.banner-card-wrap.is-visible .peek-icon {
  opacity: 0.9;
  transform: translateY(0) scale(1);
  transition-delay: 0.65s;
}
.banner-card:hover .peek-icon {
  opacity: 1;
  transform: translateY(0) scale(1.1);
  background: theme('colors.gold', #c5a059);
  color: #fff;
}
.peek-icon-pulse {
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  border: 2px solid theme('colors.gold', #c5a059);
  opacity: 0;
}
.banner-card-wrap.is-visible .peek-icon-pulse {
  animation: pulseRing 2.4s ease-out infinite 1.4s;
}
.banner-card:hover .peek-icon-pulse { animation: none; opacity: 0; }
@keyframes pulseRing {
  0%   { transform: scale(0.85); opacity: 0.6; }
  70%  { transform: scale(1.35); opacity: 0; }
  100% { opacity: 0; }
}

/* ── افکت Ripple هنگام کلیک/لمس ──────────────────────────── */
.banner-card :deep(.card-ripple) {
  position: absolute;
  z-index: 7;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(197, 160, 89, 0.45), rgba(197, 160, 89, 0) 70%);
  transform: scale(0);
  opacity: 0.8;
  pointer-events: none;
  animation: rippleAnim 0.65s ease-out forwards;
}
@keyframes rippleAnim {
  to { transform: scale(1); opacity: 0; }
}

/* ── اسکلتون با شیمر ─────────────────────────────────────── */
.skeleton-shimmer {
  position: relative;
  background: theme('colors.ink / 6%');
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

/* ── کاهش حرکت ───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .banner-img,
  .img-breathe,
  .header-in,
  .skeleton-shimmer::after,
  .blob,
  .glow-ring::before,
  .shine-auto,
  .shine-hover,
  .shine-ambient,
  .sparkle-spin,
  .squiggle,
  .peek-icon-pulse,
  .particle,
  .card-ripple {
    animation: none !important;
  }
  .banner-card,
  .banner-card-wrap,
  .banner-img,
  .peek-icon,
  .img-reveal {
    transition: none !important;
  }
  .banner-card-wrap {
    opacity: 1;
    transform: none;
    filter: none;
  }
  .img-reveal { clip-path: none; }
}

@media (hover: none) {
  .cursor-spot { display: none; }
}
</style>