<template>
  <section class="relative border-y border-ink/5 bg-card/30 py-12 md:py-16 overflow-hidden">
    <!-- بلاب‌های رنگی پس‌زمینه -->
    <div class="absolute top-0 start-1/4 w-64 h-64 bg-gold/[0.05] blur-[100px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 end-1/4 w-64 h-64 bg-sky/[0.05] blur-[100px] rounded-full pointer-events-none"></div>

    <div class="max-w-[1280px] mx-auto px-4 md:px-6 relative">
      <!-- هدر -->
      <div class="text-center mb-10">
        <div class="flex items-center justify-center gap-2.5 mb-2.5">
          <span class="w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">برندهای اصیل و معتبر</span>
          <span class="w-6 h-px bg-gold/60"></span>
        </div>
        <h2 class="text-xl md:text-2xl font-display text-ink font-bold">
          محصولات اورجینال از برندهای منتخب
        </h2>
        <p class="text-ink/45 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
          تمامی محصولات با گارانتی اصالت، مستقیم از نمایندگی رسمی تهیه می‌شوند
        </p>
      </div>
    </div>

    <!-- اسلایدر برندها (حرکت پیوسته و بی‌نهایت) -->
    <div 
      class="relative"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <!-- گرادینت محو کننده لبه‌ها -->
      <div class="absolute inset-y-0 start-0 w-16 md:w-32 bg-gradient-to-l from-transparent to-card/30 z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 end-0 w-16 md:w-32 bg-gradient-to-r from-transparent to-card/30 z-10 pointer-events-none"></div>

      <!-- اعمال پدینگ عمودی و سرریز مرئی برای رفع مشکل برش سایه -->
      <Swiper
        dir="rtl"
        :modules="[Autoplay, FreeMode]"
        :slides-per-view="'auto'"
        :space-between="20"
        :loop="true"
        :free-mode="true"
        :allow-touch-move="true"
        :speed="4000"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }"
        class="!px-4 md:!px-6 !py-8 -my-8 !overflow-visible"
        @swiper="onSwiperInit"
      >
        <SwiperSlide
          v-for="brand in brands"
          :key="brand.name"
          class="!w-[210px] sm:!w-[230px]"
        >
          <div 
            class="group relative flex flex-col items-center text-center bg-white border rounded-[20px] px-6 py-7 h-full transition-all duration-400 hover:-translate-y-2 cursor-default"
            :style="{ borderColor: `${brand.color}22` }"
            @mouseenter="e => onCardEnter(e, brand)"
            @mouseleave="e => onCardLeave(e, brand)"
          >
            <!-- هاله رنگی -->
            <div 
              class="absolute -top-8 -end-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              :style="{ backgroundColor: `${brand.color}30` }"
            />

            <!-- آیکون/لوگو حرفی -->
            <div 
              class="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-400 group-hover:scale-110 group-hover:-rotate-3"
              :style="{ backgroundColor: `${brand.color}14`, boxShadow: `0 0 0 1px ${brand.color}28` }"
            >
              <span 
                class="font-latin text-xl font-bold"
                :style="{ color: brand.color }"
              >
                {{ brand.name.charAt(0) }}
              </span>
            </div>

            <!-- نام برند -->
            <span class="font-latin text-base sm:text-lg font-bold tracking-wide text-ink mb-1">
              {{ brand.name }}
            </span>

            <!-- توضیح -->
            <span class="text-[11px] text-ink/45 leading-relaxed">
              {{ brand.desc }}
            </span>

            <!-- خط تزئینی پایین -->
            <span 
              class="mt-3 w-8 h-[2px] rounded-full transition-all duration-400 group-hover:w-12"
              :style="{ backgroundColor: brand.color }"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { shallowRef } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

const brands = [
  { name: 'Arencia', desc: 'محصولات تخصصی جوانسازی', color: '#B9A6DE' },
  { name: 'Medicube', desc: 'مراقبت پیشرفته کره‌ای', color: '#8FC1D9' },
  { name: 'SKIN1004', desc: 'فرمولاسیون طبیعی سنتلا', color: '#9CBFA0' },
  { name: 'Anua', desc: 'مراقبت ملایم و آرام‌بخش', color: '#F3B4B0' },
  { name: 'COSRX', desc: 'فرمول‌های علمی و مینیمال', color: '#F2A868' },
  { name: 'Torriden', desc: 'آبرسانی عمقی و متعادل', color: '#6EB2B2' },
  { name: 'Beauty of Joseon', desc: 'ترکیب سنت و علم پوست', color: '#E0B758' },
  { name: 'Round Lab', desc: 'مراقبت مینیمال کره‌ای', color: '#DE8E89' },
];

const swiperInstance = shallowRef(null);

function onSwiperInit(swiper) {
  swiperInstance.value = swiper;
}

function pauseAutoplay() {
  swiperInstance.value?.autoplay?.stop();
}

function resumeAutoplay() {
  swiperInstance.value?.autoplay?.start();
}

function onCardEnter(e, brand) {
  e.currentTarget.style.borderColor = `${brand.color}60`;
  e.currentTarget.style.boxShadow = `0 16px 32px -12px ${brand.color}35`;
}

function onCardLeave(e, brand) {
  e.currentTarget.style.borderColor = `${brand.color}22`;
  e.currentTarget.style.boxShadow = 'none';
}
</script>

<style scoped>
:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
</style>