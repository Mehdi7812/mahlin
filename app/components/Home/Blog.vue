<template>
  <section class="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
    
    <!-- هدر بخش (لوکس و دوطرفه در دسکتاپ) -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
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

    <!-- شبکه مقالات (پیش‌فرض ۱ ستونه در موبایل، ۲ ستونه در تبلت و ۳ ستونه در دسکتاپ) -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
      <BlogCard v-for="b in BLOG.slice(0,3)" :key="b.slug" :blog="b" />
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
</script>