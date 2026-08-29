<template>
  <section class="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-14">
    <!-- هدر بخش (جمع‌وجورتر و متمرکز) -->
    <div class="text-center mb-10 relative">
      <div class="flex items-center justify-center gap-2.5 mb-2.5">
        <span class="w-6 h-px bg-gold/60"></span>
        <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">بخش تخصصی ماهلین</span>
        <span class="w-6 h-px bg-gold/60"></span>
      </div>
      <h2 class="text-xl sm:text-2xl md:text-3xl font-display text-ink font-bold mb-2">
        خرید بر اساس دسته‌بندی پوست
      </h2>
      <p class="text-ink/60 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
        محصولات تخصصی فرموله‌شده متناسب با نیاز واقعی پوست شما
      </p>
    </div>

    <!-- شبکه‌ی دسته‌بندی‌ها (بسیار منسجم و متراکم) -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
      <NuxtLink 
        v-for="c in CATS" 
        :key="c" 
        :to="{ path: '/shop', query: { cat: c } }" 
        class="group relative flex flex-col items-center text-center p-5 sm:p-6 bg-card hover:bg-cardLight border border-ink/5 hover:border-gold/30 rounded-[20px] sm:rounded-[24px] transition-all duration-400 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(197,160,89,0.04)] overflow-hidden transform-gpu"
      >
        <!-- هاله طلایی پشت زمینه کارت -->
        <div class="absolute -top-10 -end-10 w-20 h-20 rounded-full bg-gold/5 blur-lg group-hover:bg-gold/10 transition-colors duration-500 pointer-events-none" />
        
        <!-- باکس آیکون (ظریف‌تر و کوچک‌تر) -->
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-ink/[0.02] border border-ink/5 group-hover:border-gold/25 flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-400 ease-out transform-gpu">
          <CategoryIcon 
            :cat="c" 
            :size="26" 
            class="text-ink/70 group-hover:text-gold transition-colors duration-400" 
          />
        </div>
        
        <!-- عنوان با فلش حرکتی ادغام‌شده (بدون اشغال فضای اضافی در ارتفاع) -->
        <h3 class="flex items-center gap-1 text-xs sm:text-sm font-bold text-ink mb-1 transition-colors duration-300 group-hover:text-gold">
          <span>{{ getCatInfo(c).title }}</span>
          <svg 
            class="w-3.5 h-3.5 text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out transform-gpu rtl:rotate-180" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </h3>
        
        <!-- توضیح کوتاه عملکرد -->
        <p class="text-[10px] sm:text-xs text-ink/40 leading-normal max-w-[150px]">
          {{ getCatInfo(c).desc }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { CATS } from '~/data/products';

// تابع هوشمند نگاشت اطلاعات برای ایجاد ظاهر لوکس و محتوای غنی به زبان فارسی
function getCatInfo(cat) {
  const title = cat;
  const lower = cat.toLowerCase().trim();
  
  // دیتابیس توضیحات لوکس برای هر دسته‌بندی (پشتیبانی دو زبانه)
  const descriptions = {
    'serum': 'درمان عمقی و تخصصی پوست',
    'سرم': 'درمان عمقی و تخصصی پوست',
    
    'toner': 'تنظیم اسیدیته و آماده‌سازی پوست',
    'تونر': 'تنظیم اسیدیته و آماده‌سازی پوست',
    
    'cleanser': 'پاکسازی ملایم منافذ پوست',
    'پاک کننده': 'پاکسازی ملایم منافذ پوست',
    'پاک‌کننده': 'پاکسازی ملایم منافذ پوست',
    
    'moisturizer': 'آبرسانی و تقویت سد دفاعی',
    'مرطوب کننده': 'آبرسانی و تقویت سد دفاعی',
    'مرطوب‌کننده': 'آبرسانی و تقویت سد دفاعی',
    
    'sunscreen': 'محافظت در برابر اشعه‌های آفتاب',
    'ضد آفتاب': 'محافظت در برابر اشعه‌های آفتاب',
    
    'mask': 'شادابی فوری و بازسازی پوست',
    'ماسک': 'شادابی فوری و بازسازی پوست'
  };

  // ترجمه خودکار عنوان‌های انگلیسی به فارسی روان و شیک
  const englishToPersianTitles = {
    'serum': 'سرم‌های تخصصی',
    'serums': 'سرم‌های تخصصی',
    'toner': 'تونرهای شاداب‌کننده',
    'toners': 'تونرهای شاداب‌کننده',
    'cleanser': 'پاک‌کننده‌های ملایم',
    'cleansers': 'پاک‌کننده‌های ملایم',
    'moisturizer': 'مرطوب‌کننده‌ها',
    'moisturizers': 'مرطوب‌کننده‌ها',
    'sunscreen': 'ضد آفتاب‌ها',
    'sunscreens': 'ضد آفتاب‌ها',
    'mask': 'ماسک‌های درمانی',
    'masks': 'ماسک‌های درمانی'
  };

  const resolvedTitle = englishToPersianTitles[lower] || title;
  
  // پیدا کردن بهترین توضیح منطبق با نام دسته‌بندی
  let resolvedDesc = 'مراقبت روزانه و حفظ جوانی پوست';
  for (const key in descriptions) {
    if (lower.includes(key)) {
      resolvedDesc = descriptions[key];
      break;
    }
  }

  return {
    title: resolvedTitle,
    desc: resolvedDesc
  };
}
</script>