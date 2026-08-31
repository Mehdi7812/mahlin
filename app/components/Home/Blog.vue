<template>
  <section class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20 overflow-hidden">
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

      <!-- دکمه مشاهده همه مقالات (دسکتاپ) -->
      <NuxtLink 
        to="/journal" 
        class="hidden md:flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group"
      >
        <span>مشاهده همه مقالات</span>
        <svg 
          class="w-4 h-4 transform-gpu transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- شبکه مقالات -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 relative">
      <div
        v-for="(b, i) in BLOG.slice(0, 3)"
        :key="b.slug"
        class="relative animate-fade-in-up hover:-translate-y-1 transition-transform duration-300"
        :style="{ animationDelay: i * 0.1 + 's' }"
      >
        <span 
          v-if="blogBadges[i]" 
          :class="['absolute top-3 start-3 z-10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full', blogBadges[i].color]"
        >
          {{ blogBadges[i].label }}
        </span>
        <BlogCard :blog="b" />
      </div>
    </div>

    <!-- دکمه مشاهده همه مقالات (موبایل) -->
    <div class="flex justify-center mt-10 md:hidden">
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
import { BLOG } from '~/data/products';

const blogBadges = [
  { label: 'جدیدترین', color: 'bg-sky' },
  { label: 'پرطرفدار', color: 'bg-peach' },
  null,
];
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.65s ease-out forwards;
}
</style>