<template>
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
    
    <!-- هدر مجله (لوکس و باوقار) -->
    <header class="text-center max-w-2xl mx-auto mb-12 md:mb-16">
      <div class="flex items-center justify-center gap-2 mb-3">
        <span class="w-6 h-px bg-gold/60"></span>
        <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">خواندنی‌های پوست و زیبایی</span>
        <span class="w-6 h-px bg-gold/60"></span>
      </div>
      <h1 class="text-3xl md:text-4.5xl font-display text-ink font-bold mb-4">مجله تخصصی ماهلین</h1>
      <p class="text-ink/60 text-sm sm:text-base leading-relaxed">
        اسرار علمی مراقبت از پوست، بررسی تخصصی ترکیبات آرایشی و راهکارهای تاییدشده توسط متخصصین درماتولوژی.
      </p>
    </header>

    <!-- تب‌های دسته‌بندی مقالات -->
    <div class="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-6 mb-10 border-b border-ink/[0.06] scrollbar-none">
      <button 
        v-for="tab in categories" 
        :key="tab.value"
        @click="activeCategory = tab.value"
        class="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 transform-gpu"
        :class="activeCategory === tab.value 
          ? 'bg-ink text-cream shadow-lg shadow-ink/5 scale-105' 
          : 'bg-card text-ink/60 hover:text-ink hover:bg-cardLight border border-ink/[0.03]'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- گرید اصلی مقالات مجهز به انیمیشن فیلتر روان -->
    <TransitionGroup 
      tag="div" 
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in absolute"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
      class="relative"
    >
      <!-- در صورتی که هیچ مقاله‌ای یافت نشد -->
      <div v-if="filteredBlogs.length === 0" key="empty" class="text-center py-20">
        <p class="text-ink/40 text-sm">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
      </div>

      <div v-else key="content" class="space-y-12">
        
        <!-- الف) مقاله ویژه (رندر توسط کامپوننت تخصصی) -->
        <FeaturedBlogCard 
          v-if="activeCategory === 'all' && filteredBlogs.length > 0" 
          :blog="filteredBlogs[0]" 
        />

        <!-- ب) شبکه مقالات اصلی (رندر توسط کامپوننت BlogCard) -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <BlogCard 
            v-for="b in gridBlogs" 
            :key="b.slug" 
            :blog="b" 
          />
        </div>

      </div>
    </TransitionGroup>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { BLOG } from '~/data/products';

// لیست تب‌های فیلتر مقالات
const categories = [
  { label: 'همه مقالات', value: 'all' },
  { label: 'روتین پوستی', value: 'روتین پوست' },
  { label: 'معرفی ترکیبات', value: 'ترکیبات' },
  { label: 'دانستنی‌های علمی', value: 'دانستنی ها' },
  { label: 'سلامت پوست', value: 'سلامت' }
];

const activeCategory = ref('all');

// فیلتر هوشمند مقالات
const filteredBlogs = computed(() => {
  if (!BLOG) return [];
  if (activeCategory.value === 'all') return BLOG;
  return BLOG.filter(b => b.cat && b.cat.includes(activeCategory.value));
});

// مابقی مقالاتی که به صورت شبکه رندر می‌شوند
const gridBlogs = computed(() => {
  if (activeCategory.value === 'all' && filteredBlogs.value.length > 0) {
    return filteredBlogs.value.slice(1);
  }
  return filteredBlogs.value;
});
</script>

<style scoped>
/* حذف نوار اسکرول دکمه‌ها در موبایل */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>