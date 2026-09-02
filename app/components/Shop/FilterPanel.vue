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
          class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors font-bold"
          :class="activeCatId !== cat.id && 'text-ink/70 hover:bg-cardLight hover:text-ink font-normal'"
          :style="activeCatId === cat.id
            ? {
                backgroundColor: getCatColor(cat).iconBg,
                color: getCatColor(cat).accent,
              }
            : {}"
        >
          <span class="flex items-center gap-2.5">
            <span
              class="w-1.5 h-1.5 rounded-full transition-colors"
              :class="activeCatId !== cat.id && 'bg-ink/20'"
              :style="activeCatId === cat.id ? { backgroundColor: getCatColor(cat).accent } : {}"
            />
            {{ cat.title_fa }}
          </span>
        </button>

      </div>
    </div>

    <!-- قیمت -->
    <div class="space-y-4">
      <h3 class="text-[11px] uppercase tracking-wider text-ink/40 font-bold">بازه قیمت</h3>

      <!-- حداقل قیمت -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs text-ink/60">
          <span class="font-bold">حداقل:</span>
          <span class="text-ink font-bold font-latin">{{ formatPrice(localMin) }} تومان</span>
        </div>
        <input
          type="range"
          :min="0"
          :max="maxPrice"
          :step="sliderStep"
          :value="localMin"
          @input="handleMinInput($event)"
          class="w-full h-1 bg-ink/10 rounded-full appearance-none cursor-pointer accent-gold"
        />
      </div>

      <!-- حداکثر قیمت -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs text-ink/60">
          <span class="font-bold">حداکثر:</span>
          <span class="text-gold font-bold font-latin">{{ formatPrice(localMax) }} تومان</span>
        </div>
        <input
          type="range"
          :min="0"
          :max="maxPrice"
          :step="sliderStep"
          :value="localMax"
          @input="handleMaxInput($event)"
          class="w-full h-1 bg-ink/10 rounded-full appearance-none cursor-pointer accent-gold"
        />
      </div>

      <div class="flex justify-between text-[10px] text-ink/40 font-latin">
        <span>۰ تومان</span>
        <span>{{ formatPrice(maxPrice) }} تومان</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';

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
  // زمان تأخیر قبل از ارسال درخواست (میلی‌ثانیه)
  debounceDelay: {
    type: Number,
    default: 1500,
  },
});

const emit = defineEmits(['toggle-cat', 'update-price', 'reset']);

// ─── مقادیر لوکال برای نمایش آنی روی UI (بدون تأخیر) ──────────
const localMin = ref(props.priceRange[0] ?? 0);
const localMax = ref(props.priceRange[1] ?? props.maxPrice);

// اگر priceRange از بیرون (والد) تغییر کرد (مثلاً هنگام reset) مقادیر لوکال هم‌سو بشن
watch(() => props.priceRange, (val) => {
  if (!val) return;
  localMin.value = val[0] ?? 0;
  localMax.value = val[1] ?? props.maxPrice;
});

const sliderStep = computed(() => Math.max(1, Math.floor(props.maxPrice / 100)));

// ─── مکانیزم Debounce ───────────────────────────────────────
let debounceTimer = null;

function emitPriceDebounced() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit('update-price', [localMin.value, localMax.value]);
  }, props.debounceDelay);
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});

function handleMinInput(e) {
  let val = Number(e.target.value);
  if (val > localMax.value) val = localMax.value;
  localMin.value = val; // آپدیت آنی UI
  emitPriceDebounced();  // ارسال درخواست با تأخیر
}

function handleMaxInput(e) {
  let val = Number(e.target.value);
  if (val < localMin.value) val = localMin.value;
  localMax.value = val; // آپدیت آنی UI
  emitPriceDebounced();  // ارسال درخواست با تأخیر
}

// نمایش عدد کامل قیمت با جداکننده هزارگان و ارقام فارسی — بدون مخفف K/M
function formatPrice(val) {
  const rounded = Math.round(val || 0);
  return rounded.toLocaleString('fa-IR');
}

function getCatColor(cat) {
  return generateCategoryColor(cat.title_fa);
}
</script>