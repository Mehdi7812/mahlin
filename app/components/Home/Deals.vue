<template>
  <section class="relative overflow-hidden bg-[#3f3733] py-12 md:py-16">
    <!-- بافت نقطه‌ای ظریف -->
    <div
      class="absolute inset-0 opacity-[0.04] pointer-events-none"
      style="background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 18px 18px;"
    />
    <!-- درخشش‌های تزئینی -->
    <div class="absolute -top-24 -end-24 w-80 h-80 bg-blush/[0.12] blur-[110px] rounded-full pointer-events-none" />
    <div class="absolute -bottom-24 -start-16 w-72 h-72 bg-gold/[0.14] blur-[100px] rounded-full pointer-events-none" />

    <div class="relative max-w-[1280px] mx-auto px-4 md:px-6">

      <!-- هدر بخش -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-9 md:mb-11">
        <div class="text-center md:text-start">
          <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span class="w-6 h-px bg-blush/70"></span>
            <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-blush font-bold">
              فروش ویژه زمان‌دار
            </span>
          </div>

          <h2 class="text-2xl md:text-3xl font-display text-cream font-bold mb-1.5">
            انتخاب‌های محبوب با قیمت ویژه
          </h2>

          <p class="text-cream/45 text-xs sm:text-sm">
            محصولات منتخب ماهلین را قبل از پایان کمپین و اتمام موجودی، با تخفیف تهیه کن
          </p>
        </div>

        <!-- دکمه مشاهده همه + کنترل‌های ناوبری دسکتاپ -->
        <div class="hidden md:flex items-center gap-5">
          <NuxtLink
            to="/shop?discounted=1"
            class="flex items-center gap-2 text-xs font-bold text-gold hover:text-cream transition-colors duration-300 group"
          >
            <span>مشاهده همه پیشنهادهای ویژه</span>
            <svg
              class="w-4 h-4 transform-gpu transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>

          <span class="w-px h-5 bg-white/10"></span>

          <div class="flex items-center gap-2">
            <button
              type="button"
              aria-label="اسلاید قبلی"
              :disabled="isBeginning"
              class="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-cream hover:bg-white/10 hover:border-white/25 transition-colors disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
              class="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-cream hover:bg-white/10 hover:border-white/25 transition-colors disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              @click="slideNext"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ────── لودینگ: اسکلتون تیره ────── -->
      <div v-if="pending" class="flex gap-4 overflow-hidden">
        <div
          v-for="n in 5" :key="n"
          class="min-w-[210px] flex-shrink-0 rounded-md rounded-tr-[48px] border border-white/[0.06] bg-white/[0.05] h-[400px] animate-pulse"
        />
      </div>

      <!-- ────── خطا ────── -->
      <div v-else-if="error" class="text-center py-14 text-cream/40 text-sm">
        <svg class="w-9 h-9 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
        </svg>
        دریافت محصولات با خطا مواجه شد
      </div>

      <!-- ────── بدون تخفیف فعال ────── -->
      <div v-else-if="!dealsProducts.length" class="text-center py-14 text-cream/40 text-sm">
        در حال حاضر تخفیف فعالی وجود ندارد
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
            v-for="p in dealsProducts"
            :key="p.id"
            class="!h-auto"
          >
            <ProductCard
              :product="p"
              on-dark
              class="h-full hover:-translate-y-1.5 transition-all duration-300 transform-gpu"
            />
          </SwiperSlide>
        </Swiper>

        <!-- pagination موبایل -->
        <div ref="paginationEl" class="flex justify-center gap-1.5 mt-5 md:hidden"></div>
      </div>

      <!-- دکمه مشاهده همه موبایل -->
      <div class="flex justify-center mt-2 md:hidden">
        <NuxtLink
          to="/shop?discounted=1"
          class="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-cream text-xs font-bold px-6 py-3.5 rounded-full transition-colors duration-300"
        >
          <span>مشاهده همه تخفیف‌ها</span>
          <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
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

// ⚠️ نکته: پارامترهای زیر را متناسب با API واقعی بک‌اند خودتان تنظیم کنید.
useGarnetApiFetch('products/indexHomeLite', {
  amount:    12,
  direction: 'desc',
  order:     'discount_percent',
  top_home:  'discount',
})
  .then((response) => {
    products.value = response.Products || [];
  })
  .catch((err) => {
    console.error('[Deals] خطا در دریافت محصولات تخفیف‌دار:', err);
    error.value = err;
  })
  .finally(() => {
    pending.value = false;
  });

// فقط محصولاتی که واقعاً تخفیف دارند نمایش داده شوند
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
:deep(.swiper-slide) {
  height: auto;
}
:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.35);
  opacity: 1;
}
:deep(.swiper-pagination-bullet-active) {
  background: #C29A45; /* gold */
}
</style>