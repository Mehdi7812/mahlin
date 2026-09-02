<template>
  <section class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-18 overflow-x-hidden">
    <div class="absolute -top-10 -end-20 w-72 h-72 bg-peach/[0.08] blur-[110px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 -start-10 w-60 h-60 bg-sky/[0.06] blur-[100px] rounded-full pointer-events-none"></div>

    <!-- هدر بخش -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12 relative">
      <div class="text-center md:text-start">
        <div class="flex items-center justify-center md:justify-start gap-2 mb-2.5">
          <span class="w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">پيشنهاد متخصصین پوست</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-display text-ink font-bold mb-1.5">
          محبوب‌ترین‌های ماهلین
        </h2>
        <p class="text-ink/45 text-xs sm:text-sm">بر اساس بیشترین بازخورد مثبت مشتریان</p>
      </div>

      <!-- دکمه مشاهده همه + کنترل‌های ناوبری (دسکتاپ) -->
      <div class="hidden md:flex items-center gap-5">
        <NuxtLink
          to="/shop"
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

    <!-- ────── لودینگ: اسکلتون ────── -->
    <div v-if="pending" class="flex gap-4 overflow-hidden">
      <div
        v-for="n in 4" :key="n"
        class="min-w-[220px] flex-shrink-0 rounded-2xl border border-ink/[0.06] bg-ink/[0.03] h-72 animate-pulse"
      />
    </div>

    <!-- ────── خطا ────── -->
    <div v-else-if="error" class="text-center py-16 text-ink/40 text-sm">
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
          v-for="(p, i) in products"
          :key="p.id"
          class="!h-auto"
        >
          <div class="relative h-full">
            <!-- بج فقط برای ۳ کارت اول -->
            <span
              v-if="badges[i]"
              :class="[
                'absolute top-3 start-3 z-10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md',
                badges[i].color
              ]"
            >
              {{ badges[i].label }}
            </span>

            <ProductCard
              :product="p"
              class="h-full hover:-translate-y-1.5 hover:shadow-[0_1px_5px_rgba(0,0,0,0.08)] transition-all duration-300 transform-gpu"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- دکمه مشاهده همه موبایل -->
    <div class="flex justify-center mt-6 md:hidden">
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

// ─── Swiper state ────────────────────────────────────────
const swiperInstance = shallowRef(null);
const isBeginning    = ref(true);
const isEnd          = ref(false);
const paginationEl   = ref(null);

// ─── بج‌های ثابت برای ۳ اسلاید اول ─────────────────────
const badges = [
  { label: 'پرفروش‌ترین', color: 'bg-gold'  },
  { label: 'جدید',         color: 'bg-sage'  },
  { label: 'پیشنهاد ویژه', color: 'bg-blush' },
];

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
    products.value = response.Products || [];
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
</style>