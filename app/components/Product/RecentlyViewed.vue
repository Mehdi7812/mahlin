<template>
  <section v-if="products.length" class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
    <!-- هدر -->
    <div class="flex items-center justify-between gap-4 mb-8">
      <div class="flex items-center gap-2">
        <span class="w-6 h-px bg-gold/60"></span>
        <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">بازدیدهای اخیر شما</h2>
      </div>

      <!-- ناوبری (فقط وقتی اسلایدها از عرض بیشترند) -->
      <div v-if="!isLocked" class="hidden md:flex items-center gap-2">
        <button
          type="button"
          aria-label="اسلاید قبلی"
          :disabled="isBeginning"
          class="nav-btn"
          @click="swiperInstance?.slidePrev()"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="اسلاید بعدی"
          :disabled="isEnd"
          class="nav-btn"
          @click="swiperInstance?.slideNext()"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- اسلایدر -->
    <div class="relative overflow-hidden -mx-1 px-1 pt-2 pb-4">
      <Swiper
        dir="rtl"
        :slides-per-view="1.6"
        :space-between="12"
        :grab-cursor="true"
        :watch-overflow="true"
        :breakpoints="{
          400:  { slidesPerView: 2.2, spaceBetween: 14 },
          640:  { slidesPerView: 3,   spaceBetween: 20 },
          1024: { slidesPerView: 4,   spaceBetween: 24 },
        }"
        @swiper="syncState"
        @slide-change="syncState"
        @resize="syncState"
        @reach-end="syncState"
        @reach-beginning="syncState"
      >
        <SwiperSlide v-for="p in products" :key="p.id" class="!h-auto">
          <ProductCard :product="p" class="h-full" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

defineProps({
  products: { type: Array, default: () => [] },
});

const swiperInstance = shallowRef(null);
const isBeginning = ref(true);
const isEnd = ref(false);
const isLocked = ref(false);

function syncState(swiper) {
  swiperInstance.value = swiper;
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
  isLocked.value = swiper.isLocked;
}
</script>

<style scoped>
.nav-btn {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  border: 1px solid rgba(63, 58, 53, 0.1);
  color: #3F3A35;
  transition: background-color 150ms, border-color 150ms, opacity 150ms;
}
.nav-btn:not(:disabled):hover {
  background-color: rgba(63, 58, 53, 0.05);
  border-color: rgba(63, 58, 53, 0.2);
}
.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.nav-btn:focus-visible {
  outline: 2px solid #6E523A;
  outline-offset: 2px;
}

:deep(.swiper-slide) {
  height: auto;
}
</style>