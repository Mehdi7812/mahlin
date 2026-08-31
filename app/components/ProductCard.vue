<template>
  <div 
    class="relative flex flex-col h-full bg-ink/5 group hover:-translate-y-1 rounded-md rounded-tr-[48px] transition-all duration-400 ease-out transform-gpu"
    :style="{ '--cat-shadow': catInfo.shadowColor }"
    @mouseenter="hoverShadow = true"
    @mouseleave="hoverShadow = false"
  >
    <!-- نوار رنگی بالای کارت بر اساس دسته‌بندی -->
    <div 
      class="absolute top-0 left-0 w-[85%] h-[3px] rounded-t-md z-10 opacity-80"
      :style="{ background: `linear-gradient(to left, ${catInfo.stripeEnd}, ${catInfo.stripeStart})` }"
    />

    <!-- دکمه علاقه‌مندی -->
    <button
      type="button"
      :aria-label="isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
      class="absolute top-3.5 end-3.5 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow-sm grid place-items-center transition-all duration-300 hover:scale-110 active:scale-95"
      @click.prevent="isWishlisted = !isWishlisted"
    >
      <svg 
        class="w-4 h-4 transition-colors duration-300" 
        :class="isWishlisted ? 'text-blush' : 'text-ink/35'"
        :fill="isWishlisted ? 'currentColor' : 'none'"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path d="M12 21s-6.7-4.35-9.3-8.2C1 10 1.5 6.5 4.6 5.1 7 4 9.6 4.9 12 7.5c2.4-2.6 5-3.5 7.4-2.4 3.1 1.4 3.6 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- بج تخفیف -->
    <span 
      v-if="discountPercent > 0" 
      class="absolute top-3.5 end-3.5 z-20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm"
      :style="{ backgroundColor: catInfo.accent }"
    >
      {{ discountPercent }}٪ تخفیف
    </span>

    <NuxtLink 
      :to="'/product/' + product.id" 
      class="flex flex-col h-full transition-all duration-400 ease-out"
      :class="hoverShadow ? 'shadow-[var(--cat-shadow)]' : ''"
    >
      <!-- قاب تصویر -->
      <div 
        class="h-[260px] relative bg-white border-b overflow-hidden rounded-tr-[48px] transition-colors duration-500 ease-out"
        :style="{ borderColor: catInfo.borderColor }"
      >
        <img 
          :src="product.img || PLACEHOLDER_IMG" 
          :alt="'تصویر ' + product.name" 
          loading="lazy"
          class="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] object-contain rounded-tr-[24px] transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu" 
        />

        <!-- پوشش ناموجود -->
        <div 
          v-if="product.inStock === false" 
          class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center"
        >
          <span class="bg-ink/85 text-white text-xs font-bold px-4 py-2 rounded-full">
            ناموجود
          </span>
        </div>

        <!-- دکمه مشاهده محصول روی هاور -->
        <span 
          class="hidden md:flex absolute bottom-3 inset-x-3 items-center justify-center gap-1.5 text-white text-[11px] font-bold py-2.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md"
          :style="{ backgroundColor: catInfo.accent }"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          مشاهده محصول
        </span>
      </div>

      <!-- اطلاعات محصول -->
      <div class="py-4 flex flex-col flex-1 gap-1 px-4">
        
        <div class="flex items-center justify-between gap-2">
          <span 
            v-if="product.brand" 
            class="text-[11px] tracking-widest font-latin font-bold uppercase"
            :style="{ color: catInfo.accent }"
          >
            {{ product.brand }}
          </span>
          <span 
            v-else 
            class="text-[10px] font-bold px-2 py-0.5 rounded-full"
            :style="{ backgroundColor: catInfo.iconBg, color: catInfo.accent }"
          >
            {{ product.cat }}
          </span>

          <!-- امتیاز محصول (در صورت وجود ریویو) -->
          <span v-if="avgRating" class="flex items-center gap-1 text-[11px] text-ink/50 flex-shrink-0">
            <svg class="w-3 h-3 text-gold fill-gold" viewBox="0 0 24 24">
              <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/>
            </svg>
            {{ avgRating }}
          </span>
        </div>
        
        <h3 class="text-[15px] font-bold text-ink leading-snug line-clamp-1 transition-colors duration-300" :style="{ '--hover-color': catInfo.accent }">
          {{ product.name }}
        </h3>
        
        <span class="text-[12px] text-ink/40 font-latin uppercase tracking-normal line-clamp-1">
          {{ product.latin }}
        </span>
        
        <!-- قیمت -->
        <div class="mt-auto pt-3 flex items-baseline justify-between border-t border-ink/[0.04]">
          <span class="text-xs text-ink/40">قیمت</span>
          <div class="flex items-baseline gap-1.5">
            <span 
              v-if="product.oldPrice && product.oldPrice > product.price" 
              class="text-[11px] text-ink/35 line-through font-latin"
            >
              {{ money(product.oldPrice) }}
            </span>
            <span class="text-[15px] font-bold font-latin" :style="{ color: catInfo.accent }">
              {{ money(product.price) }}
              <span class="text-[11px] text-ink/50 font-normal font-sans mr-0.5">تومان</span>
            </span>
          </div>
        </div>

      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PLACEHOLDER_IMG } from '~/data/products';
import { money } from '~/utils/format';

const props = defineProps({ 
  product: { 
    type: Object, 
    required: true 
  } 
});

const isWishlisted = ref(false);
const hoverShadow = ref(false);

// پالت رنگی هماهنگ با دسته‌بندی‌های HomeCategory
const PALETTE = {
  'شوینده': {
    borderColor: 'rgba(156,191,160,0.20)',
    stripeStart: '#9CBFA0', stripeEnd: '#EDF4EE',
    iconBg: 'rgba(156,191,160,0.14)',
    accent: '#7BA582',
    shadowColor: '0 16px 32px -10px rgba(156,191,160,0.30)',
  },
  'آبرسان': {
    borderColor: 'rgba(143,193,217,0.20)',
    stripeStart: '#8FC1D9', stripeEnd: '#EDF6FA',
    iconBg: 'rgba(143,193,217,0.14)',
    accent: '#6BA5C4',
    shadowColor: '0 16px 32px -10px rgba(143,193,217,0.30)',
  },
  'ترمیم‌کننده و مرطوب‌کننده': {
    borderColor: 'rgba(185,166,222,0.20)',
    stripeStart: '#B9A6DE', stripeEnd: '#F2EEFA',
    iconBg: 'rgba(185,166,222,0.14)',
    accent: '#9C87C4',
    shadowColor: '0 16px 32px -10px rgba(185,166,222,0.30)',
  },
  'ضدلک و روشن‌کننده': {
    borderColor: 'rgba(224,183,88,0.20)',
    stripeStart: '#E0B758', stripeEnd: '#F9F2DC',
    iconBg: 'rgba(224,183,88,0.14)',
    accent: '#C29A45',
    shadowColor: '0 16px 32px -10px rgba(224,183,88,0.26)',
  },
  'کرم جوانساز و لیفتینگ': {
    borderColor: 'rgba(243,180,176,0.20)',
    stripeStart: '#F3B4B0', stripeEnd: '#FCEEED',
    iconBg: 'rgba(243,180,176,0.14)',
    accent: '#DE8E89',
    shadowColor: '0 16px 32px -10px rgba(243,180,176,0.30)',
  },
  'دورچشم': {
    borderColor: 'rgba(110,178,178,0.20)',
    stripeStart: '#6EB2B2', stripeEnd: '#E9F4F4',
    iconBg: 'rgba(110,178,178,0.14)',
    accent: '#519494',
    shadowColor: '0 16px 32px -10px rgba(110,178,178,0.26)',
  },
  'ضدآفتاب': {
    borderColor: 'rgba(242,168,104,0.20)',
    stripeStart: '#F2A868', stripeEnd: '#FBEEDD',
    iconBg: 'rgba(242,168,104,0.14)',
    accent: '#D68C4B',
    shadowColor: '0 16px 32px -10px rgba(242,168,104,0.26)',
  },
};

const DEFAULT_PALETTE = {
  borderColor: 'rgba(162,132,102,0.18)',
  stripeStart: '#A28466', stripeEnd: '#F2EBE3',
  iconBg: 'rgba(162,132,102,0.12)',
  accent: '#A28466',
  shadowColor: '0 16px 32px -10px rgba(162,132,102,0.24)',
};

const catInfo = computed(() => PALETTE[props.product.cat] || DEFAULT_PALETTE);

const discountPercent = computed(() => {
  const { price, oldPrice } = props.product;
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
});

// میانگین امتیاز از روی ریویوهای موجود در داده (در صورت وجود)
const avgRating = computed(() => {
  const reviews = props.product.reviews;
  if (!reviews || !reviews.length) return null;
  const starsToNum = (s) => (s.match(/★/g) || []).length;
  const sum = reviews.reduce((acc, r) => acc + starsToNum(r.stars), 0);
  return (sum / reviews.length).toFixed(1);
});
</script>

<style scoped>
h3:hover {
  color: var(--hover-color, #A28466);
}
</style>