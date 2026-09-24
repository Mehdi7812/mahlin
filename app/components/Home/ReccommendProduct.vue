<template>
  <section class="popular-section relative max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-[72px] overflow-x-hidden">

    <!-- ─── پس‌زمینه‌ی انیمیشنی ─── -->
    <div class="popular-bg" aria-hidden="true">
      <!-- گرادیان‌های مشترک ستاره‌ها (طلایی مثل خط لوگو، مرواریدی مثل داخلش) -->
      <svg class="star-defs" width="0" height="0" focusable="false">
        <defs>
          <linearGradient id="mahlin-star-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0"   stop-color="#E8C98E" />
            <stop offset=".5"  stop-color="#B8894F" />
            <stop offset="1"   stop-color="#D9B27A" />
          </linearGradient>
          <linearGradient id="mahlin-moon-pearl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"   stop-color="#FFFFFF" />
            <stop offset=".55" stop-color="#FAF1E4" />
            <stop offset="1"   stop-color="#EBD9BF" />
          </linearGradient>
          <radialGradient id="mahlin-star-pearl" cx=".4" cy=".35" r=".7">
            <stop offset="0"   stop-color="#FFFFFF" />
            <stop offset=".6"  stop-color="#FBF4EA" />
            <stop offset="1"   stop-color="#F0E1CC" />
          </radialGradient>
        </defs>
      </svg>

      <!-- نور مرواریدی ملایم (بی‌رنگ) -->
      <span class="bg-wash" />

      <!-- هلال ماه لوگو + سه ستاره‌ی کنارش -->
      <div class="moon-wrap">
        <span class="moon-halo" />
        <svg class="moon" viewBox="0 0 200 200">
          <path
            d="M142 16 A92 92 0 1 0 142 184 A78 78 0 1 1 142 16 Z"
            fill="url(#mahlin-moon-pearl)"
            stroke="url(#mahlin-star-gold)"
            stroke-width="1.6"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M52 34 A84 84 0 0 0 52 166"
            fill="none"
            stroke="url(#mahlin-star-gold)"
            stroke-width="1"
            opacity=".55"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <svg
          v-for="t in 3"
          :key="'t' + t"
          class="trio-star"
          :class="'trio-star--' + t"
          viewBox="-2 -2 28 28"
        >
          <path
            d="M12 0C12.6 6.6 17.4 11.4 24 12 17.4 12.6 12.6 17.4 12 24 11.4 17.4 6.6 12.6 0 12 6.6 11.4 11.4 6.6 12 0Z"
            fill="url(#mahlin-star-pearl)"
            stroke="url(#mahlin-star-gold)"
            stroke-width="1.4"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>

      <!-- شهاب -->
      <span class="shooting shooting--1" />
      <span class="shooting shooting--2" />

      <!-- ستاره‌های لوگو که آرام بالا می‌رن -->
      <span
        v-for="(st, i) in STARS"
        :key="i"
        class="star-track"
        :style="{
          '--x': st.x,
          '--size': st.size + 'px',
          '--dur': st.dur + 's',
          '--delay': st.delay + 's',
          '--sway': st.sway + 'px',
          '--spin': st.spin + 'deg',
        }"
      >
        <span class="star-sway">
          <svg class="star" viewBox="-2 -2 28 28">
            <path
              d="M12 0C12.6 6.6 17.4 11.4 24 12 17.4 12.6 12.6 17.4 12 24 11.4 17.4 6.6 12.6 0 12 6.6 11.4 11.4 6.6 12 0Z"
              fill="url(#mahlin-star-pearl)"
              stroke="url(#mahlin-star-gold)"
              stroke-width="1.4"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />
          </svg>
        </span>
      </span>

      <!-- ذرات درخشان -->
      <span v-for="n in 6" :key="'g' + n" class="glint" :class="'glint--' + n" />
    </div>

    <!-- هدر بخش -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12 relative">
      <div class="text-center md:text-start">
        <div class="flex items-center justify-center md:justify-start gap-2 mb-2.5">
          <span class="w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs tracking-[0.15em] text-gold font-bold">پیشنهاد متخصصین پوست</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-display text-ink font-bold mb-1.5">
          محبوب‌ترین‌های ماهلین
        </h2>
        <p class="text-ink/45 text-xs sm:text-sm">بر اساس بیشترین بازخورد مثبت مشتریان</p>
      </div>

      <!-- دکمه مشاهده همه + کنترل‌های ناوبری (دسکتاپ) -->
      <div class="hidden md:flex items-center gap-5">
        <NuxtLink
          to="/shop?order=visits"
          class="flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group"
        >
          <span>مشاهده همه محصولات</span>
          <svg
            class="w-4 h-4 transform-gpu transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>

        <span class="w-px h-5 bg-ink/10"></span>

        <div class="flex items-center gap-2">
          <button
            type="button"
            aria-label="اسلاید قبلی"
            :disabled="isBeginning"
            class="w-9 h-9 grid place-items-center rounded-full border border-ink/10 bg-white/60 backdrop-blur-sm text-ink hover:bg-ink/5 hover:border-ink/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            @click="slidePrev"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="اسلاید بعدی"
            :disabled="isEnd"
            class="w-9 h-9 grid place-items-center rounded-full border border-ink/10 bg-white/60 backdrop-blur-sm text-ink hover:bg-ink/5 hover:border-ink/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            @click="slideNext"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ────── لودینگ: اسکلتون دقیق ProductCard ────── -->
    <div v-if="pending" class="relative overflow-hidden -mx-1 px-1 pt-2 pb-4">
      <div class="flex gap-3 sm:gap-3.5 md:gap-6 lg:gap-8">
        <div
          v-for="n in 8" :key="n"
          class="skeleton-item flex-shrink-0 w-[62%] sm:w-[48%] md:w-[31.5%] lg:w-[23%]"
        >
          <div class="relative flex flex-col h-full rounded-md rounded-tr-[48px] bg-ink/[0.04] overflow-hidden animate-pulse">

            <!-- نوار رنگی بالای کارت -->
            <div class="absolute top-0 left-0 w-[85%] h-[3px] rounded-t-md bg-ink/10"></div>

            <!-- بج تخفیف (شبیه‌ساز) -->
            <span class="absolute top-3.5 start-3.5 z-10 w-14 h-5 rounded-full bg-ink/10"></span>

            <!-- قاب تصویر -->
            <div class="h-[220px] md:h-[260px] relative bg-ink/[0.06] border-b border-ink/5 rounded-tr-[48px]">
              <div class="absolute inset-6 rounded-tr-[24px] bg-ink/10"></div>
            </div>

            <!-- اطلاعات محصول -->
            <div class="py-4 px-4 flex flex-col flex-1 gap-2.5">
              <span class="w-16 h-4 rounded-full bg-ink/10"></span>
              <div class="flex flex-col gap-1.5 mt-0.5">
                <span class="h-3.5 w-full rounded bg-ink/10"></span>
                <span class="h-3.5 w-3/4 rounded bg-ink/10"></span>
              </div>
              <span class="h-3 w-1/2 rounded bg-ink/[0.08]"></span>
              <div class="mt-auto pt-3 flex items-center justify-between border-t border-ink/[0.04]">
                <span class="h-3 w-8 rounded bg-ink/10"></span>
                <span class="h-4 w-20 rounded bg-ink/10"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ────── خطا ────── -->
    <div v-else-if="error" class="relative text-center py-16 text-ink/40 text-sm">
      <svg class="w-10 h-10 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
      </svg>
      دریافت محصولات با خطا مواجه شد
    </div>

    <!-- ────── اسلایدر محصولات ────── -->
    <div v-else class="relative overflow-hidden -mx-1 px-1 pt-2 pb-4">
      <Swiper
        dir="rtl"
        style="padding-top: 7px;"
        :modules="[Pagination]"
        :slides-per-view="1.6"
        :space-between="12"
        :grab-cursor="true"
        :watch-overflow="true"
        :pagination="{ el: paginationEl, clickable: true, dynamicBullets: true }"
        :breakpoints="{
          400:  { slidesPerView: 2,   spaceBetween: 14 },
          640:  { slidesPerView: 3,   spaceBetween: 24 },
          1024: { slidesPerView: 4,   spaceBetween: 32 },
        }"
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-for="p in products"
          :key="p.id"
          class="!h-auto"
        >
          <div class="relative h-full">
            <ProductCard
              :product="p"
              class="h-full hover:shadow-[0_1px_5px_rgba(0,0,0,0.08)] transition-all duration-300 transform-gpu !bg-cardLight"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- دکمه مشاهده همه موبایل -->
    <div class="relative flex justify-center mt-6 md:hidden">
      <NuxtLink
        to="/shop"
        class="flex items-center gap-2 bg-ink/5 hover:bg-ink/10 text-ink text-xs font-bold px-6 py-3.5 rounded-full transition-colors duration-300"
      >
        <span>مشاهده همه محصولات</span>
        <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// ─── ستاره‌های پس‌زمینه (موقعیت، اندازه، سرعت، تاخیر، نوسان، چرخش) ─
// تاخیر منفی یعنی انیمیشن از وسط شروع می‌شه و از همون اول ستاره‌ها روی صفحه‌ان
const STARS = [
  { x: '5%',  size: 26, dur: 18, delay: -2,  sway: 16, spin: 90  },
  { x: '13%', size: 15, dur: 13, delay: -9,  sway: 10, spin: -120 },
  { x: '22%', size: 34, dur: 22, delay: -15, sway: 22, spin: 60  },
  { x: '34%', size: 14, dur: 12, delay: -4,  sway: 8,  spin: -90 },
  { x: '46%', size: 21, dur: 16, delay: -11, sway: 14, spin: 120 },
  { x: '57%', size: 29, dur: 20, delay: -6,  sway: 20, spin: -60 },
  { x: '66%', size: 13,  dur: 11, delay: -1,  sway: 8,  spin: 150 },
  { x: '75%', size: 20, dur: 15, delay: -13, sway: 12, spin: -150 },
  { x: '85%', size: 31, dur: 19, delay: -8,  sway: 18, spin: 90  },
  { x: '94%', size: 16, dur: 14, delay: -5,  sway: 10, spin: -90 },
];

// ─── Swiper state ────────────────────────────────────────
const swiperInstance = shallowRef(null);
const isBeginning    = ref(true);
const isEnd          = ref(false);
const paginationEl   = ref(null);

// ─── Data ────────────────────────────────────────────────
const products = ref([]);
const pending  = ref(true);
const error    = ref(null);

// ─── Fetch ───────────────────────────────────────────────
useGarnetApiFetch('products/indexHomeLite', {
    amount:    10,
    direction: 'desc',
    order:     'visits',
    top_home:  'visits',
})
  .then((response) => {
    products.value = response?.Products || [];
  })
  .catch((err) => {
    console.error('[FeaturedProducts] خطا در دریافت محصولات:', err);
    error.value = err;
  })
  .finally(() => {
    pending.value = false;
  });

// ─── Swiper helpers ──────────────────────────────────────
function onSwiperInit(swiper) {
  swiperInstance.value = swiper;
  isBeginning.value    = swiper.isBeginning;
  isEnd.value          = swiper.isEnd;
}

function onSlideChange(swiper) {
  isBeginning.value = swiper.isBeginning;
  isEnd.value       = swiper.isEnd;
}

function slidePrev() { swiperInstance.value?.slidePrev(); }
function slideNext() { swiperInstance.value?.slideNext(); }
</script>

<style scoped>
:deep(.swiper-slide) {
  height: auto;
}

/* اسکلتون‌ها با تاخیر جزئی از هم پالس بزنند */
.skeleton-item:nth-child(2) .animate-pulse { animation-delay: 80ms; }
.skeleton-item:nth-child(3) .animate-pulse { animation-delay: 160ms; }
.skeleton-item:nth-child(4) .animate-pulse { animation-delay: 240ms; }
.skeleton-item:nth-child(5) .animate-pulse { animation-delay: 320ms; }
.skeleton-item:nth-child(6) .animate-pulse { animation-delay: 400ms; }
.skeleton-item:nth-child(7) .animate-pulse { animation-delay: 480ms; }
.skeleton-item:nth-child(8) .animate-pulse { animation-delay: 560ms; }

/* ═══════════════ پس‌زمینه‌ی انیمیشنی ═══════════════ */
.popular-section { isolation: isolate; }

.popular-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  /* هر چهار لبه نرم محو می‌شن؛ روی صفحه‌های عریض‌تر از ۱۲۸۰ لبه‌ی صاف دیده نمی‌شه */
  -webkit-mask-image:
    linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%),
    linear-gradient(to right,  transparent 0, #000 8%,  #000 92%, transparent 100%);
  -webkit-mask-composite: source-in;
          mask-image:
    linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%),
    linear-gradient(to right,  transparent 0, #000 8%,  #000 92%, transparent 100%);
          mask-composite: intersect;
}

/* ─── نور مرواریدی ─── */
.bg-wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(38% 55% at 12% 18%, rgba(255,252,246,.95) 0%, rgba(255,252,246,0) 70%),
    radial-gradient(50% 45% at 55% 100%, rgba(255,250,242,.7) 0%, rgba(255,250,242,0) 70%),
    linear-gradient(180deg, rgba(255,251,245,0) 0%, rgba(255,251,245,.55) 50%, rgba(255,251,245,0) 100%);
}

/* ─── هلال ماه ─── */
.moon-wrap {
  position: absolute;
  top: 3%;
  /* وسط فضای خالی هدر؛ روی لینک «مشاهده همه» و دکمه‌ها نمی‌افته */
  inset-inline-end: 30%;
  width: 190px;
  height: 190px;
  animation: moonRock 12s ease-in-out infinite alternate;
}
.moon-halo {
  position: absolute;
  inset: -45%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,253,248,1) 0%, rgba(255,249,238,.7) 30%, rgba(255,249,238,0) 65%);
  animation: haloPulse 6s ease-in-out infinite;
}
.moon {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 10px 18px rgba(184,137,79,.18));
}

/* سه ستاره‌ی کنار دهانه‌ی ماه، مثل لوگو */
.trio-star {
  position: absolute;
  overflow: visible;
  filter: drop-shadow(0 2px 3px rgba(184,137,79,.25));
  animation: trioTwinkle 3.6s ease-in-out infinite;
}
.trio-star--1 { width: 30px; height: 30px; top: 30%; left: 72%; animation-delay: 0s; }
.trio-star--2 { width: 18px; height: 18px; top: 14%; left: 92%; animation-delay: 1.2s; }
.trio-star--3 { width: 16px; height: 16px; top: 52%; left: 96%; animation-delay: 2.3s; }

@keyframes moonRock {
  from { transform: rotate(-5deg) translateY(0); }
  to   { transform: rotate(4deg)  translateY(8px); }
}
@keyframes haloPulse {
  0%, 100% { opacity: .75; transform: scale(.95); }
  50%      { opacity: 1;   transform: scale(1.05); }
}
@keyframes trioTwinkle {
  0%, 100% { opacity: 1;  transform: scale(1)   rotate(0deg); }
  50%      { opacity: .5; transform: scale(.72) rotate(20deg); }
}

/* ─── شهاب ─── */
.shooting {
  position: absolute;
  width: 140px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(216,178,122,.9) 12%, rgba(216,178,122,0) 100%);
  filter: drop-shadow(0 0 4px rgba(255,255,255,.9));
  opacity: 0;
  transform-origin: left center;
}
/* حرکت به سمت ماه (چپ-پایین) */
.shooting--1 { top: 8%;  left: 62%; animation: shoot 11s ease-in 2s infinite; }
.shooting--2 { top: 22%; left: 84%; animation: shoot 14s ease-in 8s infinite; }
@keyframes shoot {
  0%, 88% { opacity: 0; transform: rotate(-18deg) translateX(0); }
  90%     { opacity: 1; }
  100%    { opacity: 0; transform: rotate(-18deg) translateX(-420px); }
}

/* ─── ستاره‌های لوگو ─── */
.star-defs { position: absolute; width: 0; height: 0; overflow: hidden; }

.star-track {
  position: absolute;
  bottom: -40px;
  inset-inline-start: var(--x);
  width: var(--size);
  height: var(--size);
  opacity: 0;
  animation: rise var(--dur) linear var(--delay) infinite;
}
.star-sway {
  display: block;
  width: 100%;
  height: 100%;
  animation: sway calc(var(--dur) / 3) ease-in-out infinite alternate;
}
.star {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 2px 3px rgba(184,137,79,.25));
  animation:
    spin var(--dur) linear var(--delay) infinite,
    twinkle 3.2s ease-in-out infinite;
}

@keyframes rise {
  0%   { transform: translateY(0) scale(.6);        opacity: 0; }
  12%  {                                              opacity: .95; }
  80%  {                                              opacity: .8; }
  100% { transform: translateY(-820px) scale(1.05);  opacity: 0; }
}
@keyframes sway {
  from { transform: translateX(calc(var(--sway) * -1)); }
  to   { transform: translateX(var(--sway)); }
}
@keyframes spin {
  to { rotate: var(--spin); }
}
@keyframes twinkle {
  0%, 100% { scale: 1; }
  50%      { scale: .82; }
}

/* ─── ذرات درخشان ─── */
.glint {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px 3px rgba(224,183,88,.45);
  animation: glint 5s ease-in-out infinite;
}
.glint--1 { top: 18%; inset-inline-start: 18%; animation-delay: 0s; }
.glint--2 { top: 30%; inset-inline-end: 22%;  animation-delay: 1.4s; }
.glint--3 { top: 64%; inset-inline-start: 30%; animation-delay: 2.6s; }
.glint--4 { top: 12%; inset-inline-start: 58%; animation-delay: 3.3s; }
.glint--5 { top: 78%; inset-inline-end: 12%;  animation-delay: .8s; }
.glint--6 { top: 48%; inset-inline-start: 6%;  animation-delay: 4.1s; }
@keyframes glint {
  0%, 100% { opacity: 0;  transform: scale(.4); }
  50%      { opacity: .9; transform: scale(1); }
}

/* موبایل: ستاره‌ها و ذرات کمتر */
@media (max-width: 639px) {
  .star-track:nth-child(odd of .star-track) { display: none; }
  .glint--4, .glint--5, .glint--6 { display: none; }
  .moon-wrap { width: 110px; height: 110px; top: 1%; inset-inline-end: 6%; opacity: .85; }
  .trio-star--1 { width: 20px; height: 20px; }
  .trio-star--2, .trio-star--3 { width: 12px; height: 12px; }
  .shooting--2 { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .star-track, .star-sway, .star, .glint,
  .moon-wrap, .moon-halo, .trio-star { animation: none !important; }
  .shooting { display: none; }
  .star-track { display: none; }
}
</style>