<template>
  <NuxtLink  
    :to="'/journal/' + blog.slug" 
    class="group flex flex-col h-full bg-card hover:bg-cardLight border border-ink/[0.03] hover:border-gold/20 rounded-[24px] sm:rounded-[28px] overflow-hidden transition-all duration-400 ease-out hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(197,160,89,0.04)] transform-gpu"
  >
    
    <!-- تصویر مقاله -->
    <div v-if="blog.img" class="h-44 sm:h-48 w-full overflow-hidden">
      <img 
        :src="blog.img" 
        :alt="blog.title" 
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu"
      />
    </div>
    <div v-else class="h-44 sm:h-48 w-full bg-gradient-to-br from-gold/10 via-cream to-cardLight flex items-center justify-center relative overflow-hidden">
      <span class="text-6xl sm:text-7xl font-display text-gold/25 select-none leading-none">{{ blog.cat.charAt(0) }}</span>
      <div class="absolute inset-x-0 bottom-0 h-px bg-ink/[0.04]" />
    </div>

    <!-- بدنه مقاله -->
    <div class="flex flex-col flex-1 p-5 sm:p-6">
      
      <!-- دسته‌بندی و تاریخ -->
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[11px] font-bold text-gold uppercase tracking-wide">
          {{ blog.cat }}
        </span>
        <span class="w-1 h-1 rounded-full bg-gold/40"></span>
        <span class="text-[11px] text-ink/40 font-latin">
          {{ blog.date }}
        </span>
      </div>
      
      <!-- عنوان مقاله -->
      <h3 class="text-base sm:text-lg font-bold text-ink leading-snug line-clamp-2 group-hover:text-gold transition-colors duration-300">
        {{ blog.title }}
      </h3>
      
      <!-- خلاصه مقاله -->
      <p class="mt-2 text-sm text-ink/50 leading-relaxed line-clamp-2 sm:line-clamp-3">
        {{ blog.excerpt }}
      </p>

      <!-- لینک ادامه مطلب -->
      <div class="mt-auto pt-4 flex items-center gap-1.5 text-xs font-bold text-gold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <span>ادامه مطلب</span>
        <svg 
          class="w-3.5 h-3.5 transform-gpu transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rotate-180" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  blog: {
    type: Object,
    required: true
  }
});
</script>