<template>
  <section class="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-18">
    
    <!-- هدر بخش (لوکس، مینیمال و دوطرفه در دسکتاپ) -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
      <div class="text-center md:text-start">
        <div class="flex items-center justify-center md:justify-start gap-2 mb-2.5">
          <span class="w-6 h-px bg-gold/60"></span>
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">پيشنهاد متخصصین پوست</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-display text-ink font-bold">
          محبوب‌ترین‌های ماهلین
        </h2>
      </div>
      
      <!-- دکمه مشاهده همه برای دسکتاپ -->
      <NuxtLink 
        to="/shop" 
        class="hidden md:flex items-center gap-2 text-xs font-bold text-gold hover:text-ink transition-colors duration-300 group"
      >
        <span>مشاهده همه محصولات</span>
        <svg 
          class="w-4 h-4 transform-gpu transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- شبکه‌ی نمایش محصولات (۲ ستونه در موبایل / ۴ ستونه در دسکتاپ) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      <ProductCard 
        v-for="p in featured" 
        :key="p.id" 
        :product="p" 
        class="hover:-translate-y-1 transition-transform duration-300 transform-gpu"
      />
    </div>

    <!-- دکمه مشاهده همه برای موبایل (وسط‌چین و کاربرپسند) -->
    <div class="flex justify-center mt-10 md:hidden">
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
import { computed } from 'vue';
import { PRODUCTS } from '~/data/products';

// استفاده از computed جهت پایداری رندرینگ و جلوگیری از بروز خطای احتمالی آرایه‌ها
const featured = computed(() => {
  if (!PRODUCTS || PRODUCTS.length === 0) return [];
  
  // انتخاب ایمن محصولات بر اساس ایندکس‌های درخواستی شما
  return [
    PRODUCTS[2], 
    PRODUCTS[5], 
    PRODUCTS[8], 
    PRODUCTS[4]
  ].filter(Boolean); // فیلتر کردن مقادیر تهی یا تعریف نشده
});
</script>