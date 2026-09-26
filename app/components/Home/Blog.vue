<template>
  <section ref="sectionRef" class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
    <!-- blobs داخل wrapper محدود -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none rounded-[32px]">
      <div class="blob blob-1 absolute -bottom-20 -start-20 w-80 h-80 bg-lilac/[0.06] blur-[110px] rounded-full" />
      <div class="blob blob-2 absolute top-10 -end-10 w-60 h-60 bg-sage/[0.05] blur-[90px] rounded-full" />
      <div class="blob blob-3 absolute top-1/2 start-1/4 w-40 h-40 bg-gold/[0.05] blur-[80px] rounded-full" />
    </div>

    <!-- هدر بخش -->
    <div
      class="header-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12 relative"
      :class="{ 'is-visible': headerVisible }"
    >
      <div class="text-center md:text-start">
        <div class="eyebrow-in flex items-center justify-center md:justify-start gap-2 mb-2.5">
          <span class="line-draw w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">مجله پوست و زیبایی</span>
        </div>
        <h2 class="title-in relative w-fit mx-auto md:mx-0 text-2xl md:text-3xl font-display text-ink font-bold">
          از وبلاگ ماهلین
          <svg class="squiggle-svg absolute -bottom-2 start-0 w-full h-2.5 text-peach/60" viewBox="0 0 160 12" fill="none" preserveAspectRatio="none">
            <path class="squiggle-path" d="M2 8c14-10 26 6 40-2s26-8 40 0 26 6 40-2 26-6 36 0" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        </h2>
      </div>

      <!-- دکمه‌های دسکتاپ -->
      <div class="nav-in hidden md:flex items-center gap-5">
        <NuxtLink
          to="/journal"
          class="view-all-link relative flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group"
        >
          <span class="relative">
            مشاهده همه مقالات
            <span class="link-underline absolute -bottom-1 right-0 h-[1.5px] bg-current"></span>
          </span>
          <svg
            class="w-4 h-4 transform-gpu transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>

        <template v-if="blogs.length && !pending">
          <span class="w-px h-5 bg-ink/10" />
          <div class="flex items-center gap-2">
            <button
              type="button"
              aria-label="اسلاید قبلی"
              :disabled="isBeginning"
              class="nav-btn w-9 h-9 grid place-items-center rounded-full border border-ink/10 text-ink hover:bg-gold hover:border-gold hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink disabled:hover:scale-100"
              @click="slidePrev"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              aria-label="اسلاید بعدی"
              :disabled="isEnd"
              class="nav-btn w-9 h-9 grid place-items-center rounded-full border border-ink/10 text-ink hover:bg-gold hover:border-gold hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink disabled:hover:scale-100"
              @click="slideNext"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- لودینگ -->
    <div v-if="pending" class="flex gap-4">
      <div
        v-for="n in 3" :key="n"
        class="min-w-[260px] flex-shrink-0 rounded-2xl border border-ink/[0.06] bg-ink/[0.03] h-64 animate-pulse"
      />
    </div>

    <!-- خطا -->
    <div v-else-if="error" class="text-center py-16 text-ink/40 text-sm">
      <svg class="w-10 h-10 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
      </svg>
      خطا در دریافت مقالات
    </div>

    <!-- اسلایدر -->
    <div
      v-else-if="blogs.length"
      class="relative pt-3 pb-6"
      style="margin-inline: -1rem;"
    >
      <Swiper
        dir="rtl"
        class="blog-swiper"
        :modules="[Pagination]"
        :slides-per-view="1.15"
        :space-between="16"
        :grab-cursor="true"
        :watch-overflow="true"
        :centered-slides="false"
        :pagination="{ el: paginationEl, clickable: true, dynamicBullets: true }"
        :breakpoints="{
          640:  { slidesPerView: 2,   spaceBetween: 24, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
          1024: { slidesPerView: 3,   spaceBetween: 32, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        }"
        style="padding-inline: 1rem;"
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-for="(b, i) in blogs"
          :key="b.id"
          class="!h-auto"
        >
          <div
            class="animate-fade-in-up h-full"
            :style="{ animationDelay: i * 0.1 + 's' }"
          >
            <BlogCard :blog="b" :badge="blogBadges[i] ?? null" class="h-full" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- خالی -->
    <div v-else class="text-center py-16 text-ink/40 text-sm">
      به‌زودی مقالات تخصصی ماهلین اینجا منتشر می‌شود.
    </div>

    <!-- دکمه موبایل -->
    <div v-if="blogs.length && !pending" class="flex justify-center mt-6 md:hidden">
      <NuxtLink
        to="/journal"
        class="flex items-center gap-2 bg-ink/5 hover:bg-ink/10 text-ink text-xs font-bold px-6 py-3.5 rounded-full transition-colors duration-300"
      >
        <span>مشاهده همه مقالات</span>
        <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

  </section>
</template>

<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const swiperInstance = shallowRef(null);
const isBeginning    = ref(true);
const isEnd          = ref(false);
const paginationEl   = ref(null);

const blogs   = ref([]);
const pending = ref(true);
const error   = ref(null);

const sectionRef    = ref(null);
const headerVisible = ref(false);

let headerObserver = null;
let fallbackTimer   = null;

const blogBadges = [
  { label: 'جدیدترین', color: '#8FC1D9' },
  { label: 'پرطرفدار', color: '#F2A868' },
  null,
];

useGarnetApiFetch('blog/indexWithImages', {
  method: 'GET',
  params: { amount: '5', direction: 'desc', order: 'order', page: 1 },
})
  .then((response) => { blogs.value = (response.Blog || []).slice(0, 5); })
  .catch((err) => { error.value = err; })
  .finally(() => { pending.value = false; });

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

/* ---------- Scroll Reveal فقط برای هدر ---------- */
const setupHeaderObserver = () => {
  if (!sectionRef.value) return;
  if (headerObserver) headerObserver.disconnect();
  clearTimeout(fallbackTimer);

  if (typeof IntersectionObserver === 'undefined') {
    headerVisible.value = true;
    return;
  }

  headerObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        headerVisible.value = true;
        headerObserver.disconnect();
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  headerObserver.observe(sectionRef.value);
  fallbackTimer = setTimeout(() => { headerVisible.value = true; }, 1200);
};

onMounted(() => {
  nextTick(() => setupHeaderObserver());
});

onBeforeUnmount(() => {
  if (headerObserver) headerObserver.disconnect();
  clearTimeout(fallbackTimer);
});
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.65s ease-out forwards;
}

:deep(.swiper-slide) {
  height: auto;
}

/*
  اسلایدر باید overflow-x: clip داشته باشه نه hidden
  تا سایه/ترنسفورم کارت‌ها برش نخوره ولی scrollbar نیاد
*/
.blog-swiper {
  overflow: clip visible;
  padding-block: 12px;
}

:deep(.blog-swiper .swiper-wrapper) {
  align-items: stretch;
}

/* ═══════════════════════════════════════════════════════════
   انیمیشن‌های جدید: فقط بلاب‌های پس‌زمینه + هدر (بدون دست‌زدن
   به کارت‌ها یا اسلایدر)
   ═══════════════════════════════════════════════════════════ */

/* ── بلاب‌های شناور پس‌زمینه ──────────────────────────────── */
.blob {
  animation: blobFloat 12s ease-in-out infinite;
}
.blob-2 { animation-duration: 14s; animation-delay: -3s; }
.blob-3 { animation-duration: 16s; animation-delay: -6s; }
@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(14px, -18px) scale(1.08); }
  66%      { transform: translate(-10px, 14px) scale(0.94); }
}

/* ── ورود کلی هدر ─────────────────────────────────────────── */
.header-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.header-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── خط کوچک قبل از eyebrow: کشیده می‌شود ─────────────────── */
.line-draw {
  transform-origin: right center;
  transform: scaleX(0);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.header-reveal.is-visible .line-draw {
  transform: scaleX(1);
  transition-delay: 0.15s;
}

/* ── eyebrow: محو و بالا آمدن ─────────────────────────────── */
.eyebrow-in {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.header-reveal.is-visible .eyebrow-in {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.05s;
}

/* ── تایتل اصلی ───────────────────────────────────────────── */
.title-in {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.header-reveal.is-visible .title-in {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}

/* ── خط موج‌دار زیر تایتل: رسم‌شونده با stroke-dashoffset ──── */
.squiggle-path {
  stroke-dasharray: 220;
  stroke-dashoffset: 220;
}
.header-reveal.is-visible .squiggle-path {
  animation: drawSquiggle 1s ease forwards;
  animation-delay: 0.55s;
}
@keyframes drawSquiggle {
  to { stroke-dashoffset: 0; }
}

/* ── دکمه‌های سمت راست هدر (لینک + فلش‌ها) ────────────────── */
.nav-in {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.header-reveal.is-visible .nav-in {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.35s;
}

/* زیرخط متحرک لینک «مشاهده همه مقالات» */
.link-underline {
  width: 0%;
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.view-all-link:hover .link-underline {
  width: 100%;
}

/* ── کاهش حرکت ────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .blob,
  .squiggle-path {
    animation: none !important;
  }
  .header-reveal,
  .line-draw,
  .eyebrow-in,
  .title-in,
  .nav-in,
  .link-underline {
    transition: none !important;
  }
  .header-reveal,
  .line-draw,
  .eyebrow-in,
  .title-in,
  .nav-in {
    opacity: 1;
    transform: none;
  }
}
</style>