<template>
  <section class="py-6 md:py-10">
    <div class="max-w-[1280px] mx-auto px-3 md:px-6">

      <!-- پنل روشن با پس‌زمینه‌ی لایه‌لایه -->
      <div class="deals-panel relative overflow-hidden rounded-[28px] md:rounded-[44px] px-4 sm:px-6 md:px-10 py-10 md:py-14">

        <!-- ─── لایه‌های پس‌زمینه ─── -->
        <div class="deals-bg" aria-hidden="true">
          <span class="bg-mesh" />
          <span class="bg-rays" />
          <span class="bg-blob bg-blob--peach" />
          <span class="bg-blob bg-blob--blush" />
          <span class="bg-blob bg-blob--gold" />
          <span class="bg-rings" />
          <span class="bg-percent font-display">٪</span>

          <!-- موج‌های نوری پایین پنل -->
          <svg class="bg-waves" viewBox="0 0 1200 220" preserveAspectRatio="none">
            <path d="M0,150 C200,90 380,200 600,140 C820,80 1000,170 1200,120" />
            <path d="M0,180 C240,130 420,215 640,170 C860,125 1020,200 1200,160" />
            <path d="M0,120 C180,70 400,160 620,105 C840,50 1010,130 1200,85" />
          </svg>

          <!-- ستاره‌های چشمک‌زن -->
          <svg class="bg-spark s1" viewBox="0 0 24 24"><path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" /></svg>
          <svg class="bg-spark s2" viewBox="0 0 24 24"><path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" /></svg>
          <svg class="bg-spark s3" viewBox="0 0 24 24"><path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" /></svg>
          <svg class="bg-spark s4" viewBox="0 0 24 24"><path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" /></svg>
          <svg class="bg-spark s5" viewBox="0 0 24 24"><path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" /></svg>

          <span class="bg-gloss" />
          <span class="bg-grain" />
        </div>

        <div class="relative">

          <!-- هدر بخش -->
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <div class="inline-flex items-center gap-2 mb-3 rounded-full bg-white/60 ring-1 ring-white px-3 py-1 backdrop-blur-sm">
                <span class="relative flex h-2 w-2">
                  <span class="absolute inline-flex h-full w-full rounded-full bg-[#E07A5F] opacity-60 animate-ping motion-reduce:animate-none" />
                  <span class="relative inline-flex h-2 w-2 rounded-full bg-[#E07A5F]" />
                </span>
                <span class="text-[11px] sm:text-xs text-[#B5563D] font-bold">فروش ویژه زمان‌دار</span>
              </div>

              <h2 class="text-2xl md:text-3xl font-display text-ink mb-1.5">
                انتخاب‌های محبوب با قیمت ویژه
              </h2>

              <p class="text-ink/55 text-xs sm:text-sm max-w-lg leading-relaxed">
                محصولات منتخب ماهلین را قبل از پایان کمپین و اتمام موجودی، با تخفیف تهیه کن
              </p>
            </div>

            <!-- مشاهده همه + ناوبری دسکتاپ -->
            <div class="hidden md:flex items-center gap-4">
              <NuxtLink to="/shop?discounted=1" class="see-all group">
                <span>مشاهده همه پیشنهادهای ویژه</span>
                <svg class="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>

              <div v-if="!pending && !error && dealsProducts.length" class="flex items-center gap-2">
                <button type="button" class="nav-btn" aria-label="اسلاید قبلی" :disabled="isBeginning" @click="slidePrev">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <button type="button" class="nav-btn" aria-label="اسلاید بعدی" :disabled="isEnd" @click="slideNext">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- ────── لودینگ ────── -->
          <div v-if="pending" class="flex gap-4 overflow-hidden" aria-hidden="true">
            <div
              v-for="n in 5" :key="n"
              class="min-w-[210px] flex-shrink-0 rounded-md rounded-tr-[48px] bg-white/55 ring-1 ring-white/80 h-[400px] animate-pulse"
            />
          </div>

          <!-- ────── خطا ────── -->
          <div v-else-if="error" class="text-center py-14 text-ink/50 text-sm" role="alert">
            <svg class="w-9 h-9 mx-auto mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
            </svg>
            دریافت محصولات با خطا مواجه شد
          </div>

          <!-- ────── بدون تخفیف فعال ────── -->
          <div v-else-if="!dealsProducts.length" class="text-center py-14 text-ink/50 text-sm">
            در حال حاضر تخفیف فعالی وجود ندارد
          </div>

          <!-- ────── اسلایدر محصولات ────── -->
          <div v-else class="deals-shell">
            <Swiper
              dir="rtl"
              class="deals-swiper"
              :modules="[Pagination]"
              :slides-per-view="1.6"
              :space-between="12"
              :grab-cursor="true"
              :watch-overflow="true"
              :pagination="{ el: paginationEl, clickable: true, dynamicBullets: true }"
              :breakpoints="{
                400:  { slidesPerView: 2, spaceBetween: 14 },
                640:  { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 32 },
              }"
              @swiper="onSwiperInit"
              @slide-change="onSlideChange"
            >
              <SwiperSlide v-for="p in dealsProducts" :key="p.id" class="!h-auto">
                <!-- on-dark = کارت با پس‌زمینه‌ی توپر؛ رنگ و سایه برای پس‌زمینه‌ی روشن بازنویسی شده -->
                <ProductCard
                  :product="p"
                  on-dark
                  class="h-full !bg-cardLight !shadow-[0_18px_40px_-24px_rgba(110,82,58,0.45)]"
                />
              </SwiperSlide>
            </Swiper>

            <!-- pagination موبایل -->
            <div ref="paginationEl" class="deals-pagination flex justify-center gap-1.5 mt-4 md:hidden" />
          </div>

          <!-- دکمه مشاهده همه موبایل -->
          <div class="flex justify-center mt-4 md:hidden">
            <NuxtLink
              to="/shop?discounted=1"
              class="flex items-center gap-2 bg-white/75 hover:bg-white text-ink ring-1 ring-white text-xs font-bold px-6 py-3.5 rounded-full shadow-[0_8px_20px_-12px_rgba(110,82,58,0.4)] transition-colors duration-300"
            >
              <span>مشاهده همه تخفیف‌ها</span>
              <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, shallowRef, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// ─── Swiper state ────────────────────────────────────────
const swiperInstance = shallowRef(null);
const isBeginning    = ref(true);
const isEnd          = ref(false);
const paginationEl   = ref(null);

// ─── Data ────────────────────────────────────────────────
const products = ref([]);
const pending  = ref(true);
const error    = ref(null);

useGarnetApiFetch('products/indexHomeLite', {
  amount:    12,
  direction: 'desc',
  order:     'discount_percent',
  top_home:  'discount',
})
  .then((response) => {
    products.value = response?.Products || [];
  })
  .catch((err) => {
    console.error('[Deals] خطا در دریافت محصولات تخفیف‌دار:', err);
    error.value = err;
  })
  .finally(() => {
    pending.value = false;
  });

// فقط محصولاتی که واقعاً تخفیف دارند
function hasDiscount(p) {
  if (p.discount_percent) return Number(p.discount_percent) > 0;
  return Number(p.final_price) < Number(p.price);
}
const dealsProducts = computed(() => products.value.filter(hasDiscount));

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
/* ─── پنل و پس‌زمینه ───────────────────────────────────────
   پایه: مش‌گرادیان گرم (هلویی، مرجانی، صورتی، کره‌ای).
   روی آن: پرتوهای نور، هاله‌هایی که آرام شناورند، حلقه‌های
   هم‌مرکز پشت «٪»، موج‌های نوری پایین، چند ستاره‌ی چشمک‌زن،
   یک براقیت بالای پنل و کمی دانه برای حس لمسی. */
.deals-panel {
  isolation: isolate;
  background: #FFF1E6;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.75),
    0 30px 60px -40px rgba(181,86,61,.4);
}

.deals-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

/* مش‌گرادیان پایه */
.bg-mesh {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 70% at 100% 0%,  #FFD9B8 0%, transparent 60%),
    radial-gradient(55% 60% at 0% 100%,  #FBC9C4 0%, transparent 62%),
    radial-gradient(45% 55% at 60% 105%, #FFE3C9 0%, transparent 60%),
    radial-gradient(40% 50% at 30% 10%,  #FDE6EC 0%, transparent 65%),
    linear-gradient(135deg, #FFF5EA 0%, #FDEBDF 45%, #FBE3DE 75%, #F9E7EF 100%);
}

/* پرتوهای نور؛ مرکزشون گوشه‌ی بالای سمت «٪» است */
.bg-rays {
  position: absolute;
  width: 1400px;
  height: 1400px;
  top: -700px;
  inset-inline-end: -700px;
  background: repeating-conic-gradient(
    from 0deg,
    rgba(255,255,255,.65) 0deg 5deg,
    transparent 5deg 15deg
  );
  -webkit-mask-image: radial-gradient(circle, #000 0%, rgba(0,0,0,.35) 35%, transparent 58%);
          mask-image: radial-gradient(circle, #000 0%, rgba(0,0,0,.35) 35%, transparent 58%);
  opacity: .6;
  animation: raysSpin 120s linear infinite;
}
@keyframes raysSpin { to { transform: rotate(360deg); } }

/* هاله‌های رنگی که آرام جابه‌جا می‌شن */
.bg-blob {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  will-change: transform;
}
.bg-blob--peach {
  width: 440px; height: 440px;
  top: -150px; inset-inline-end: -90px;
  background: rgba(242,158,96,.5);
  animation: drift1 22s ease-in-out infinite alternate;
}
.bg-blob--blush {
  width: 480px; height: 480px;
  bottom: -210px; inset-inline-start: -130px;
  background: rgba(240,160,160,.55);
  animation: drift2 26s ease-in-out infinite alternate;
}
.bg-blob--gold {
  width: 300px; height: 300px;
  top: 32%; inset-inline-start: 36%;
  background: rgba(232,190,95,.28);
  animation: drift3 30s ease-in-out infinite alternate;
}
@keyframes drift1 { to { transform: translate(60px, 50px) scale(1.12); } }
@keyframes drift2 { to { transform: translate(-50px, -60px) scale(1.08); } }
@keyframes drift3 { to { transform: translate(-90px, 30px) scale(.9); } }

/* حلقه‌های هم‌مرکز ظریف پشت «٪» */
.bg-rings {
  position: absolute;
  width: 620px;
  height: 620px;
  top: -250px;
  inset-inline-end: -170px;
  border-radius: 999px;
  background: repeating-radial-gradient(
    circle,
    transparent 0 38px,
    rgba(255,255,255,.55) 38px 39.5px
  );
  -webkit-mask-image: radial-gradient(circle, #000 25%, transparent 70%);
          mask-image: radial-gradient(circle, #000 25%, transparent 70%);
  opacity: .8;
}

/* «٪» بزرگ در گوشه‌ی بالا؛ امضای بصری بخش تخفیف */
.bg-percent {
  position: absolute;
  top: -0.02em;
  inset-inline-end: 0.06em;
  font-size: clamp(170px, 22vw, 300px);
  line-height: 1;
  color: transparent;
  background: linear-gradient(180deg, rgba(255,255,255,1) 15%, rgba(255,255,255,0) 95%);
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0 18px 30px rgba(224,122,95,.18));
  transform: rotate(-8deg);
  user-select: none;
}
@media (max-width: 767px) {
  .bg-percent { inset-inline-end: -0.08em; opacity: .75; }
  .bg-rings   { width: 420px; height: 420px; top: -190px; inset-inline-end: -150px; }
}

/* موج‌های نوری پایین پنل */
.bg-waves {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  width: 100%;
  height: 38%;
  fill: none;
  stroke: rgba(255,255,255,.7);
  stroke-width: 1.4;
  vector-effect: non-scaling-stroke;
  -webkit-mask-image: linear-gradient(to top, #000 30%, transparent);
          mask-image: linear-gradient(to top, #000 30%, transparent);
}
.bg-waves path:nth-child(2) { stroke: rgba(255,255,255,.45); }
.bg-waves path:nth-child(3) { stroke: rgba(255,255,255,.3); }

/* ستاره‌های چشمک‌زن */
.bg-spark {
  position: absolute;
  fill: #fff;
  filter: drop-shadow(0 0 6px rgba(255,255,255,.9));
  animation: twinkle 4s ease-in-out infinite;
}
.s1 { width: 18px; top: 16%; inset-inline-end: 30%; animation-delay: 0s; }
.s2 { width: 11px; top: 44%; inset-inline-end: 8%;  animation-delay: 1.2s; }
.s3 { width: 14px; top: 12%; inset-inline-start: 22%; animation-delay: 2.1s; }
.s4 { width: 9px;  bottom: 18%; inset-inline-start: 40%; animation-delay: .6s; }
.s5 { width: 13px; bottom: 26%; inset-inline-end: 44%; animation-delay: 2.8s; }
@keyframes twinkle {
  0%, 100% { opacity: .25; transform: scale(.6) rotate(0deg); }
  50%      { opacity: 1;   transform: scale(1) rotate(45deg); }
}
@media (max-width: 767px) {
  .s3, .s5 { display: none; }
}

/* براقیت ملایم بالای پنل */
.bg-gloss {
  position: absolute;
  inset: 0 0 auto 0;
  height: 45%;
  background: linear-gradient(180deg, rgba(255,255,255,.35), transparent);
}

/* دانه‌ی ریز */
.bg-grain {
  position: absolute;
  inset: 0;
  opacity: .2;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .32 0 0 0 0 .25 0 0 0 .35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ─── هدر ───────────────────────────────────────────────── */
.see-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #B5563D;
  transition: color .3s;
}
.see-all:hover { color: theme('colors.ink'); }

.nav-btn {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: theme('colors.ink');
  background: rgba(255,255,255,.7);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,1), 0 6px 14px -8px rgba(110,82,58,.35);
  -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
  transition: background-color .25s, color .25s, transform .2s, opacity .25s;
}
.nav-btn:hover:not(:disabled) { background: theme('colors.ink'); color: theme('colors.cream'); }
.nav-btn:active:not(:disabled) { transform: scale(.92); }
.nav-btn:disabled { opacity: .35; cursor: default; }
.nav-btn:focus-visible { outline: 2px solid #B5563D; outline-offset: 2px; }

/* ─── اسلایدر ───────────────────────────────────────────────
   فقط محور افقی clip می‌شه و padding جا برای سایه‌ی کارت‌ها
   می‌ذاره؛ margin منفی جای محتوا رو ثابت نگه می‌داره. */
.deals-shell {
  margin: -8px -12px -16px;
}
.deals-swiper {
  overflow: clip visible;
  padding: 10px 12px 28px;
}
:deep(.deals-swiper .swiper-slide) { height: auto; }

.deals-pagination :deep(.swiper-pagination-bullet) {
  background: rgba(110,82,58,.25);
  opacity: 1;
}
.deals-pagination :deep(.swiper-pagination-bullet-active) {
  background: #D68C4B;
}

@media (prefers-reduced-motion: reduce) {
  .bg-rays, .bg-blob, .bg-spark { animation: none; }
  .bg-spark { opacity: .7; }
}
</style>