<template>
  <div class="space-y-8">
    
    <!-- هدر پنل با دکمه پاک‌سازی -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-bold text-ink flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        فیلترها
      </h2>
      <button 
        v-if="activeFiltersCount > 0"
        @click="$emit('reset')"
        class="text-[11px] text-gold hover:text-ink transition-colors font-bold"
      >
        پاک‌سازی همه
      </button>
    </div>

    <!-- بخش دسته‌بندی -->
    <div class="space-y-3">
      <h3 class="text-[11px] uppercase tracking-wider text-ink/40 font-bold">دسته‌بندی محصولات</h3>
      <div class="space-y-1">
        <button 
          v-for="c in cats" 
          :key="c" 
          @click="$emit('toggle-cat', c)"
          class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors"
          :class="activeCat === c 
            ? 'bg-gold/10 text-gold font-bold' 
            : 'text-ink/70 hover:bg-cardLight hover:text-ink'"
        >
          <span class="flex items-center gap-2.5">
            <span class="w-1.5 h-1.5 rounded-full transition-colors" :class="activeCat === c ? 'bg-gold' : 'bg-ink/20'"></span>
            {{ c }}
          </span>
          <span class="text-[10px] text-ink/40 font-latin">({{ fa(catCounts[c] || 0) }})</span>
        </button>
      </div>
    </div>

    <!-- بخش برند -->
    <div v-if="brands && brands.length > 0" class="space-y-3">
      <h3 class="text-[11px] uppercase tracking-wider text-ink/40 font-bold">برند</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="b in brands" 
          :key="b"
          @click="$emit('toggle-brand', b)"
          class="px-3 py-1.5 rounded-full text-xs font-latin font-bold uppercase border transition-all"
          :class="activeBrand === b 
            ? 'bg-ink text-cream border-ink' 
            : 'bg-transparent text-ink/60 border-ink/10 hover:border-gold/40 hover:text-ink'"
        >
          {{ b }}
        </button>
      </div>
    </div>

    <!-- بخش قیمت -->
    <div class="space-y-3">
      <h3 class="text-[11px] uppercase tracking-wider text-ink/40 font-bold">بازه قیمت</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between text-xs text-ink/60">
          <span class="font-bold">حداکثر:</span>
          <span class="text-gold font-bold font-latin">{{ formatPrice(priceRange[1]) }} تومان</span>
        </div>
        <input 
          type="range"
          :min="0"
          :max="maxPrice"
          :step="Math.max(1, Math.floor(maxPrice / 100))"
          :value="priceRange[1]"
          @input="handlePriceInput($event)"
          class="w-full h-1 bg-ink/10 rounded-full appearance-none cursor-pointer accent-gold"
        />
        <div class="flex justify-between text-[10px] text-ink/40 font-latin">
          <span>۰</span>
          <span>{{ formatPrice(maxPrice) }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { fa } from '~/utils/format';

const props = defineProps({
  cats: { type: Array, required: true },
  brands: { type: Array, default: () => [] },
  activeCat: { type: [String, null], default: null },
  activeBrand: { type: [String, null], default: null },
  priceRange: { type: Array, required: true },
  maxPrice: { type: Number, required: true },
  catCounts: { type: Object, default: () => ({}) },
  activeFiltersCount: { type: Number, default: 0 }
});

const emit = defineEmits(['toggle-cat', 'toggle-brand', 'update-price', 'reset']);

function handlePriceInput(e) {
  const val = Number(e.target.value);
  emit('update-price', [0, val]);
}

function formatPrice(val) {
  if (val >= 1000000) return fa((val / 1000000).toFixed(1)) + 'M';
  if (val >= 1000) return fa(Math.floor(val / 1000)) + 'K';
  return fa(val);
}
</script>