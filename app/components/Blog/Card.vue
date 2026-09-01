<template>
  <NuxtLink  
    :to="'/journal/' + blog.slug" 
    class="group relative flex flex-col h-full bg-card hover:bg-cardLight border rounded-[24px] sm:rounded-[28px] overflow-hidden transition-all duration-400 ease-out hover:-translate-y-1 transform-gpu"
    :style="{ 
      borderColor: hover ? catInfo.borderHoverColor : 'rgba(63,58,53,0.03)',
      boxShadow: hover ? catInfo.shadowColor : 'none'
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    
    <!-- دکمه ذخیره مقاله -->
    <!-- <button
      type="button"
      :aria-label="isSaved ? 'حذف از ذخیره‌شده‌ها' : 'ذخیره مقاله'"
      class="absolute top-3.5 end-3.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm grid place-items-center transition-all duration-300 hover:scale-110 active:scale-95"
      @click.prevent="isSaved = !isSaved"
    >
      <svg 
        class="w-3.5 h-3.5 transition-colors duration-300" 
        :class="isSaved ? '' : 'text-ink/35'"
        :style="isSaved ? { color: catInfo.accent } : {}"
        :fill="isSaved ? 'currentColor' : 'none'"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" stroke-linejoin="round"/>
      </svg>
    </button> -->

    <!-- بج ویژه (جدیدترین/پرطرفدار) — جدا از دسته‌بندی -->
    <span 
      v-if="badge" 
      class="absolute top-3.5 start-3.5 z-20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm"
      :style="{ backgroundColor: badge.color }"
    >
      {{ badge.label }}
    </span>

    <!-- تصویر مقاله -->
    <div v-if="blog.img" class="h-44 sm:h-48 w-full overflow-hidden relative">
      <img 
        :src="blog.img" 
        :alt="blog.title" 
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu"
      />
      <!-- بج دسته‌بندی روی تصویر -->
      <span 
        class="absolute bottom-3 start-3 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm"
        :style="{ backgroundColor: catInfo.accent + 'E6' }"
      >
        {{ blog.cat }}
      </span>
    </div>
    <div v-else class="h-44 sm:h-48 w-full flex items-center justify-center relative overflow-hidden" :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}22, ${catInfo.stripeEnd})` }">
      <span class="text-6xl sm:text-7xl font-display select-none leading-none" :style="{ color: catInfo.accent + '40' }">
        {{ blog.cat.charAt(0) }}
      </span>
      <span 
        class="absolute bottom-3 start-3 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm"
        :style="{ backgroundColor: catInfo.accent }"
      >
        {{ blog.cat }}
      </span>
    </div>

    <!-- نوار رنگی باریک بین تصویر و بدنه -->
    <div class="h-[3px] w-full opacity-70" :style="{ background: `linear-gradient(to left, ${catInfo.stripeEnd}, ${catInfo.stripeStart})` }" />

    <!-- بدنه مقاله -->
    <div class="flex flex-col flex-1 p-5 sm:p-6">
      
      <!-- تاریخ و زمان مطالعه -->
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[11px] text-ink/40 font-latin flex items-center gap-1">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ blog.date }}
        </span>
        <span class="w-1 h-1 rounded-full bg-ink/20"></span>
        <span class="text-[11px] text-ink/40">
          {{ readingTime }} دقیقه مطالعه
        </span>
      </div>
      
      <!-- عنوان مقاله -->
      <h3 
        class="text-base sm:text-lg font-bold text-ink leading-snug line-clamp-2 transition-colors duration-300"
        :style="{ color: hover ? catInfo.accent : '' }"
      >
        {{ blog.title }}
      </h3>
      
      <!-- خلاصه مقاله -->
      <p class="mt-2 text-sm text-ink/50 leading-relaxed line-clamp-2 sm:line-clamp-3">
        {{ blog.excerpt }}
      </p>

      <!-- نویسنده (در صورت وجود) -->
      <div v-if="blog.author" class="mt-3 flex items-center gap-2">
        <span 
          class="w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold text-white flex-shrink-0"
          :style="{ backgroundColor: catInfo.accent }"
        >
          {{ blog.author.charAt(0) }}
        </span>
        <span class="text-[11px] text-ink/45">{{ blog.author }}</span>
      </div>

      <!-- لینک ادامه مطلب -->
      <div 
        class="mt-auto pt-4 flex items-center gap-1.5 text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        :style="{ color: catInfo.accent }"
      >
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
import { ref, computed } from 'vue';

const props = defineProps({
  blog: {
    type: Object,
    required: true
  },
  badge: {
    type: Object,
    default: null
    // شکل مورد انتظار: { label: 'جدیدترین', color: '#8FC1D9' }
  }
});

const hover = ref(false);
const isSaved = ref(false);

// پالت رنگی — می‌تونی دسته‌بندی‌های واقعی وبلاگت رو اینجا جایگزین کنی
const PALETTE = {
  'مراقبت پوست': {
    stripeStart: '#8FC1D9', stripeEnd: '#DFF0F5',
    accent: '#6BA5C4',
    borderHoverColor: 'rgba(143,193,217,0.45)',
    shadowColor: '0 16px 32px -10px rgba(143,193,217,0.28)',
  },
  'ترکیبات': {
    stripeStart: '#B9A6DE', stripeEnd: '#EDE6F8',
    accent: '#9C87C4',
    borderHoverColor: 'rgba(185,166,222,0.45)',
    shadowColor: '0 16px 32px -10px rgba(185,166,222,0.28)',
  },
  'روتین': {
    stripeStart: '#9CBFA0', stripeEnd: '#E3EFE4',
    accent: '#7BA582',
    borderHoverColor: 'rgba(156,191,160,0.45)',
    shadowColor: '0 16px 32px -10px rgba(156,191,160,0.28)',
  },
  'ضدآفتاب': {
    stripeStart: '#F2A868', stripeEnd: '#FBE4CD',
    accent: '#D68C4B',
    borderHoverColor: 'rgba(242,168,104,0.45)',
    shadowColor: '0 16px 32px -10px rgba(242,168,104,0.24)',
  },
  'جوانسازی': {
    stripeStart: '#F3B4B0', stripeEnd: '#FCE4E2',
    accent: '#DE8E89',
    borderHoverColor: 'rgba(243,180,176,0.45)',
    shadowColor: '0 16px 32px -10px rgba(243,180,176,0.28)',
  },
};

const DEFAULT_PALETTE = {
  stripeStart: '#A28466', stripeEnd: '#F2EBE3',
  accent: '#A28466',
  borderHoverColor: 'rgba(162,132,102,0.35)',
  shadowColor: '0 16px 32px -10px rgba(162,132,102,0.22)',
};

const catInfo = computed(() => PALETTE[props.blog.cat] || DEFAULT_PALETTE);

// محاسبه خودکار زمان مطالعه بر اساس طول متن (اگه blog.readingTime موجود نباشه)
const readingTime = computed(() => {
  if (props.blog.readingTime) return props.blog.readingTime;
  const text = (props.blog.excerpt || '') + (props.blog.content || '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 120)); // تقریباً ۱۲۰ کلمه در دقیقه برای فارسی
});
</script>