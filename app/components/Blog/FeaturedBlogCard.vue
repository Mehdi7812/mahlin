<template>
  <div class="group lg:grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 bg-card border border-ink/[0.03] rounded-[32px] overflow-hidden p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,160,89,0.04)]">
    
    <!-- تصویر مقاله ویژه (گوشه راست بالا خمیده با امضای ماهلین) -->
    <div class="h-64 sm:h-80 lg:h-[400px] w-full rounded-[24px] rounded-tr-[64px] overflow-hidden relative">
      <img 
        v-if="blog.img"
        :src="blog.img" 
        :alt="blog.title" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] transform-gpu"
      />
      <div v-else class="w-full h-full bg-gradient-to-br from-gold/15 via-cream to-cardLight flex items-center justify-center">
        <span class="text-8xl font-display text-gold/20 select-none">{{ blog.cat.charAt(0) }}</span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent pointer-events-none" />
    </div>

    <!-- محتوای متنی مقاله ویژه -->
    <div class="flex flex-col justify-center pt-6 lg:pt-0">
      <div class="flex items-center gap-2.5 mb-4">
        <span class="px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase rounded-md">مقاله ویژه</span>
        <span class="text-xs text-ink/40">{{ blog.date }}</span>
        <span class="w-1 h-1 rounded-full bg-gold/40"></span>
        <span class="text-xs text-ink/40 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          {{ fa(blog.read || 5) }} دقیقه مطالعه
        </span>
      </div>

      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-ink mb-4 group-hover:text-gold transition-colors duration-300 leading-snug">
        <NuxtLink :to="'/journal/' + blog.slug">{{ blog.title }}</NuxtLink>
      </h2>

      <p class="text-ink/60 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
        {{ blog.excerpt }}
      </p>

      <NuxtLink 
        :to="'/journal/' + blog.slug" 
        class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold hover:text-ink transition-colors duration-300"
      >
        <span>خواندن مقاله ویژه</span>
        <svg class="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>

  </div>
</template>

<script setup>
import { fa } from '~/utils/format';

defineProps({
  blog: {
    type: Object,
    required: true
  }
});
</script>