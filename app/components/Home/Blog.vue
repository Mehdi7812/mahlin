<template>
  <section class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
    <div class="absolute -bottom-20 -start-20 w-80 h-80 bg-lilac/[0.06] blur-[110px] rounded-full pointer-events-none"></div>
    <div class="absolute top-10 -end-10 w-60 h-60 bg-sage/[0.05] blur-[90px] rounded-full pointer-events-none"></div>

    <!-- هدر بخش -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12 relative">
      <div class="text-center md:text-start">
        <div class="flex items-center justify-center md:justify-start gap-2 mb-2.5">
          <span class="w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">مجله پوست و زیبایی</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-display text-ink font-bold">
          از وبلاگ ماهلین
        </h2>
      </div>

      <!-- دکمه مشاهده همه + کنترل‌های ناوبری (دسکتاپ) -->
      <div class="hidden md:flex items-center gap-5">
        <NuxtLink
          to="/journal"
          class="flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group"
        >
          <span>مشاهده همه مقالات</span>
          <svg
            class="w-4 h-4 transform-gpu transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>

        <span v-if="blogs.length && !pending" class="w-px h-5 bg-ink/10"></span>

        <div v-if="blogs.length && !pending" class="flex items-center gap-2">
          <button
            type="button"
            aria-label="اسلاید قبلی"
            :disabled="isBeginning"
            class="w-9 h-9 grid place-items-center rounded-full border border-ink/10 text-ink hover:bg-ink/5 hover:border-ink/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
            class="w-9 h-9 grid place-items-center rounded-full border border-ink/10 text-ink hover:bg-ink/5 hover:border-ink/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            @click="slideNext"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- لودینگ -->
    <div v-if="pending" class="flex gap-4 overflow-hidden">
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

    <!-- اسلایدر مقالات -->
    <div v-else-if="blogs.length" class="relative -mx-1 px-1 pt-3 pb-6">
      <Swiper
        dir="rtl"
        class="blog-swiper"
        :modules="[Pagination]"
        :slides-per-view="1.15"
        :space-between="16"
        :grab-cursor="true"
        :watch-overflow="true"
        :pagination="{ el: paginationEl, clickable: true, dynamicBullets: true }"
        :breakpoints="{
          640:  { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 32 },
        }"
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-for="(b, i) in blogs"
          :key="b.id"
          class="!h-auto"
        >
          <div class="animate-fade-in-up h-full" :style="{ animationDelay: i * 0.1 + 's' }">
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
import { ref, shallowRef } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// ─── Swiper state ────────────────────────────────────────
const swiperInstance = shallowRef(null);
const isBeginning    = ref(true);
const isEnd          = ref(false);
const paginationEl   = ref(null);

// ─── State ───────────────────────────────────────────────
const blogs   = ref([]);
const pending = ref(true);
const error   = ref(null);

// ─── بج‌های ثابت برای ۳ مقاله اول ──────────────────────
const blogBadges = [
  { label: 'جدیدترین', color: '#8FC1D9' },
  { label: 'پرطرفدار', color: '#F2A868' },
  null,
];

// ─── Fetch ───────────────────────────────────────────────
useGarnetApiFetch('blog/indexWithImages', {
    amount:    '5',
    direction: 'desc',
    order:     'order',
    page:      1,
})
  .then((response) => {
    blogs.value = (response.Blog || []).slice(0, 5);
  })
  .catch((err) => {
    console.error('[HomeBlog] خطا در دریافت مقالات:', err);
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

/* ─── جلوگیری از برش سایه‌ی کارت‌ها هنگام هاور ───────────
   overflow افقی رو hidden نگه می‌داریم (لازمه‌ی اسلاید شدن)
   ولی overflow عمودی رو visible می‌کنیم تا سایه/ترنسفورم برش نخوره
*/
.blog-swiper {
  overflow-x: hidden;
  overflow-y: visible;
  padding: 15px 0
}

:deep(.blog-swiper .swiper-wrapper) {
  overflow: visible;
}
</style>