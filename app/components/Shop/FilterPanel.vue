<template>
  <div class="space-y-8">

    <!-- هدر پنل -->
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

    <!-- دسته‌بندی -->
    <div class="space-y-3">
      <h3 class="text-[11px] uppercase tracking-wider text-ink/40 font-bold">دسته‌بندی محصولات</h3>
      <div class="space-y-1">

        <!-- گزینه «همه» -->
        <button
          @click="$emit('toggle-cat', null)"
          class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors"
          :class="activeCatId === null
            ? 'bg-gold/10 text-gold font-bold'
            : 'text-ink/70 hover:bg-cardLight hover:text-ink'"
        >
          <span class="flex items-center gap-2.5">
            <span
              class="w-1.5 h-1.5 rounded-full transition-colors"
              :class="activeCatId === null ? 'bg-gold' : 'bg-ink/20'"
            />
            همه محصولات
          </span>
          <!-- <span class="text-[10px] text-ink/40 font-latin">({{ fa(totalCount) }})</span> -->
        </button>

        <!-- کتگوری‌های دریافتی از API -->
        <button
          v-for="cat in cats"
          :key="cat.id"
          @click="$emit('toggle-cat', cat.id)"
          class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors"
          :class="activeCatId === cat.id
            ? 'bg-gold/10 text-gold font-bold'
            : 'text-ink/70 hover:bg-cardLight hover:text-ink'"
        >
          <span class="flex items-center gap-2.5">
            <span
              class="w-1.5 h-1.5 rounded-full transition-colors"
              :class="activeCatId === cat.id ? 'bg-gold' : 'bg-ink/20'"
            />
            {{ cat.title_fa }}
          </span>
          <!-- <span class="text-[10px] text-ink/40 font-latin">
            ({{ fa(catCounts[cat.id] ?? 0) }})
          </span> -->
        </button>

      </div>
    </div>

    <!-- قیمت -->
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
  // آرایه‌ای از آبجکت‌های { id, title_fa, ... } از API
  cats: {
    type: Array,
    default: () => [],
  },
  // id عددی کتگوری فعال (یا null برای همه)
  activeCatId: {
    type: Number,
    default: null,
  },
  priceRange: {
    type: Array,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  // تعداد محصول هر کتگوری — کلید: id عددی
  catCounts: {
    type: Object,
    default: () => ({}),
  },
  // تعداد کل محصولات برای نمایش کنار «همه»
  totalCount: {
    type: Number,
    default: 0,
  },
  activeFiltersCount: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['toggle-cat', 'update-price', 'reset']);

function handlePriceInput(e) {
  emit('update-price', [0, Number(e.target.value)]);
}

function formatPrice(val) {
  if (val >= 1000000) return fa((val / 1000000).toFixed(1)) + 'M';
  if (val >= 1000)    return fa(Math.floor(val / 1000)) + 'K';
  return fa(val);
}
</script>