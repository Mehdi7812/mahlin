<template>
  <div class="space-y-7">

    <!-- ════════ هدر ════════ -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-bold text-ink flex items-center gap-2 m-0">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 6h16M7 12h10M10 18h4" stroke-linecap="round" />
        </svg>
        فیلترها
        <span
          v-if="activeFiltersCount > 0"
          class="min-w-[20px] h-5 px-1.5 rounded-full bg-ink text-cream text-[11px] grid place-items-center"
        >{{ fa(activeFiltersCount) }}</span>
      </h2>
      <button
        v-if="activeFiltersCount > 0"
        type="button"
        class="focus-ring text-xs font-bold text-ink/55 hover:text-ink underline-offset-4 hover:underline transition-colors rounded"
        @click="$emit('reset')"
      >
        پاک کردن همه
      </button>
    </div>

    <!-- ════════ دسته‌بندی ════════ -->
    <section aria-labelledby="f-cat">
      <h3 id="f-cat" class="text-xs font-bold text-ink/50 mb-2.5">دسته‌بندی</h3>

      <div class="space-y-0.5">
        <button
          type="button"
          class="cat-btn focus-ring"
          :class="activeCatId === null ? 'bg-ink/[0.06] text-ink font-bold' : 'text-ink/70 hover:bg-ink/[0.03] hover:text-ink'"
          :aria-pressed="activeCatId === null"
          @click="activeCatId !== null && $emit('toggle-cat', null)"
        >
          <span class="cat-dot" :style="{ backgroundColor: activeCatId === null ? '#3F3A35' : 'rgba(63,58,53,0.2)' }" />
          همه محصولات
        </button>

        <button
          v-for="cat in catsWithColor"
          :key="cat.id"
          type="button"
          class="cat-btn focus-ring"
          :class="activeCatId === cat.id ? 'font-bold' : 'text-ink/70 hover:bg-ink/[0.03] hover:text-ink'"
          :style="activeCatId === cat.id ? { backgroundColor: cat.color.iconBg, color: cat.color.darkAccent || cat.color.accent } : null"
          :aria-pressed="activeCatId === cat.id"
          @click="$emit('toggle-cat', cat.id)"
        >
          <span class="cat-dot" :style="{ backgroundColor: activeCatId === cat.id ? cat.color.accent : cat.color.accent + '55' }" />
          <span class="truncate">{{ cat.title_fa }}</span>
          <svg
            v-if="activeCatId === cat.id"
            class="w-3.5 h-3.5 ms-auto shrink-0"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </section>

    <!-- ════════ بازه قیمت ════════ -->
    <section aria-labelledby="f-price">
      <div class="flex items-center justify-between mb-3">
        <h3 id="f-price" class="text-xs font-bold text-ink/50 m-0">بازه قیمت <span class="font-normal">(تومان)</span></h3>
        <button
          v-if="priceActive"
          type="button"
          class="focus-ring text-[11px] font-bold text-ink/50 hover:text-ink transition-colors rounded"
          @click="applyRange(0, maxPrice)"
        >
          حذف
        </button>
      </div>

      <!-- خلاصه‌ی بازه‌ی انتخاب‌شده -->
      <p class="m-0 mb-4 text-sm font-bold text-ink" aria-live="polite">
        {{ rangeSummary }}
      </p>

      <!-- اسلایدر دوسر -->
      <div class="range relative h-6 mb-4">
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-gold/10"></div>
        <div
          class="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-gold"
          :style="{ insetInlineStart: pct(localMin) + '%', insetInlineEnd: (100 - pct(localMax)) + '%' }"
        ></div>

        <input
          type="range"
          :min="0"
          :max="maxPrice"
          :step="step"
          :value="localMin"
          :style="{ zIndex: minOnTop ? 4 : 3 }"
          aria-label="حداقل قیمت"
          :aria-valuetext="`${money(localMin)} تومان`"
          @input="onMinInput"
          @change="commit"
        />
        <input
          type="range"
          :min="0"
          :max="maxPrice"
          :step="step"
          :value="localMax"
          :style="{ zIndex: minOnTop ? 3 : 4 }"
          aria-label="حداکثر قیمت"
          :aria-valuetext="`${money(localMax)} تومان`"
          @input="onMaxInput"
          @change="commit"
        />
      </div>

      <!-- ورودی عددی -->
      <div class="grid grid-cols-2 gap-2 mb-4">
        <label class="block min-w-0">
          <span class="block text-[11px] text-ink/50 mb-1">از</span>
          <input
            v-model="minDraft"
            type="text"
            inputmode="numeric"
            class="price-input"
            aria-label="حداقل قیمت به تومان"
            @focus="$event.target.select()"
            @blur="commitDraft('min')"
            @keydown.enter.prevent="$event.target.blur()"
          />
        </label>
        <label class="block min-w-0">
          <span class="block text-[11px] text-ink/50 mb-1">تا</span>
          <input
            v-model="maxDraft"
            type="text"
            inputmode="numeric"
            class="price-input"
            aria-label="حداکثر قیمت به تومان"
            @focus="$event.target.select()"
            @blur="commitDraft('max')"
            @keydown.enter.prevent="$event.target.blur()"
          />
        </label>
      </div>

      <!-- بازه‌های آماده -->
      <div v-if="presets.length" class="flex flex-wrap gap-1.5">
        <button
          v-for="p in presets"
          :key="p.label"
          type="button"
          class="focus-ring h-8 px-3 rounded-full border text-xs transition-colors"
          :class="isPresetActive(p)
            ? 'bg-ink border-ink text-cream font-bold'
            : 'border-ink/[0.12] text-ink/70 hover:border-ink/30 hover:text-ink'"
          :aria-pressed="isPresetActive(p)"
          @click="isPresetActive(p) ? applyRange(0, maxPrice) : applyRange(p.min, p.max)"
        >
          {{ p.label }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { fa, money } from '~/utils/format.ts';

const props = defineProps({
  cats: { type: Array, default: () => [] },
  activeCatId: { type: Number, default: null },
  priceRange: { type: Array, required: true },
  maxPrice: { type: Number, required: true },
  catCounts: { type: Object, default: () => ({}) },
  totalCount: { type: Number, default: 0 },
  activeFiltersCount: { type: Number, default: 0 },
});

const emit = defineEmits(['toggle-cat', 'update-price', 'reset']);

const catsWithColor = computed(() =>
  props.cats.map((c) => ({ ...c, color: generateCategoryColor(c.title_fa) })),
);

// ─── قالب‌بندی ───────────────────────────────────────────
const toEnDigits = (s) =>
  String(s).replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const parsePrice = (s) => Number(toEnDigits(s).replace(/[^\d]/g, '')) || 0;

// ۵۰۰ هزار / ۱٫۵ میلیون
function compact(v) {
  if (v >= 1e6) {
    const m = Math.round((v / 1e6) * 10) / 10;
    return `${fa(String(m).replace('.', '٫'))} میلیون`;
  }
  if (v >= 1e3) return `${fa(Math.round(v / 1e3))} هزار`;
  return fa(v);
}

// ─── گام اسلایدر: عدد رُند (۱۰ هزار، ۵۰ هزار، ۱۰۰ هزار...) ───
const step = computed(() => {
  const raw = props.maxPrice / 100;
  if (raw <= 1) return 1;
  const pow = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 5, 10].map((m) => m * pow).find((s) => s >= raw);
});

// ─── state محلی ─────────────────────────────────────────
const localMin = ref(0);
const localMax = ref(props.maxPrice);
const minDraft = ref('');
const maxDraft = ref('');

function syncFromProps() {
  localMin.value = Math.max(0, props.priceRange?.[0] ?? 0);
  localMax.value = Math.min(props.maxPrice, props.priceRange?.[1] ?? props.maxPrice);
  syncDrafts();
}
function syncDrafts() {
  minDraft.value = money(localMin.value);
  maxDraft.value = money(localMax.value);
}
syncFromProps();
watch(() => [props.priceRange?.[0], props.priceRange?.[1], props.maxPrice], syncFromProps);

const pct = (v) => (props.maxPrice ? (v / props.maxPrice) * 100 : 0);
// وقتی هر دو سر در انتهای بازه‌اند، سرِ حداقل باید قابل گرفتن باشد
const minOnTop = computed(() => localMin.value > props.maxPrice / 2);

const priceActive = computed(() => localMin.value > 0 || localMax.value < props.maxPrice);

const rangeSummary = computed(() => {
  const lo = localMin.value > 0;
  const hi = localMax.value < props.maxPrice;
  if (lo && hi) return `${compact(localMin.value)} تا ${compact(localMax.value)} تومان`;
  if (lo) return `از ${compact(localMin.value)} تومان به بالا`;
  if (hi) return `تا ${compact(localMax.value)} تومان`;
  return 'همه‌ی قیمت‌ها';
});

// ─── تعامل با اسلایدر ──────────────────────────────────
function onMinInput(e) {
  localMin.value = Math.min(Number(e.target.value), localMax.value);
  e.target.value = localMin.value;
  syncDrafts();
}
function onMaxInput(e) {
  let v = Math.max(Number(e.target.value), localMin.value);
  // آخرین گام همیشه به سقف واقعی برسد
  if (props.maxPrice - v < step.value) v = props.maxPrice;
  localMax.value = v;
  e.target.value = v;
  syncDrafts();
}

// با رها کردن اسلایدر / Enter / blur بلافاصله اعمال می‌شود (بدون تأخیر)
function commit() {
  const [a, b] = props.priceRange || [];
  if (a === localMin.value && b === localMax.value) return;
  emit('update-price', [localMin.value, localMax.value]);
}

function commitDraft(which) {
  let lo = which === 'min' ? parsePrice(minDraft.value) : localMin.value;
  let hi = which === 'max' ? parsePrice(maxDraft.value) || props.maxPrice : localMax.value;
  lo = Math.min(Math.max(0, lo), props.maxPrice);
  hi = Math.min(Math.max(0, hi), props.maxPrice);
  if (lo > hi) [lo, hi] = [hi, lo];
  applyRange(lo, hi);
}

function applyRange(lo, hi) {
  localMin.value = lo;
  localMax.value = hi;
  syncDrafts();
  commit();
}

// ─── بازه‌های آماده (بر اساس سقف قیمت) ─────────────────
const NICE = [100e3, 200e3, 500e3, 1e6, 2e6, 3e6, 5e6, 10e6, 20e6, 50e6];

const presets = computed(() => {
  const max = props.maxPrice;
  let bounds = NICE.filter((b) => b < max * 0.85);
  if (bounds.length < 1) return [];
  if (bounds.length > 3) {
    const n = bounds.length;
    bounds = [bounds[Math.floor(n * 0.25)], bounds[Math.floor(n * 0.5)], bounds[Math.floor(n * 0.8)]];
    bounds = [...new Set(bounds)];
  }
  const list = [{ label: `تا ${compact(bounds[0])}`, min: 0, max: bounds[0] }];
  for (let i = 1; i < bounds.length; i++) {
    list.push({ label: `${compact(bounds[i - 1])} تا ${compact(bounds[i])}`, min: bounds[i - 1], max: bounds[i] });
  }
  list.push({ label: `بیش از ${compact(bounds.at(-1))}`, min: bounds.at(-1), max });
  return list;
});

const isPresetActive = (p) => localMin.value === p.min && localMax.value === p.max;
</script>

<style scoped>
.focus-ring:focus-visible {
  outline: 2px solid #6E523A;
  outline-offset: 2px;
}

.cat-btn {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  text-align: start;
  transition: background-color 150ms, color 150ms;
}
.cat-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
  transition: background-color 150ms;
}

/* ─── فیلد قیمت ─── */
.price-input {
  display: block;
  width: 100%;
  height: 2.75rem;
  padding-inline: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(63, 58, 53, 0.12);
  background: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  color: #3F3A35;
  font-variant-numeric: tabular-nums;
  outline: none;
  transition: border-color 150ms, box-shadow 150ms;
}
.price-input:focus {
  border-color: #3F3A35;
  box-shadow: 0 0 0 3px rgba(63, 58, 53, 0.08);
}

/* ─── اسلایدر دوسر ─── */
.range input[type='range'] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}
.range input[type='range']::-webkit-slider-runnable-track { background: transparent; height: 100%; }
.range input[type='range']::-moz-range-track { background: transparent; }

.range input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  border-radius: 9999px;
  background: #fff;
  border: 2px solid #3F3A35;
  box-shadow: 0 2px 6px rgba(63, 58, 53, 0.18);
  cursor: grab;
  transition: transform 120ms;
}
.range input[type='range']::-moz-range-thumb {
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #fff;
  border: 2px solid #3F3A35;
  box-shadow: 0 2px 6px rgba(63, 58, 53, 0.18);
  cursor: grab;
}
.range input[type='range']:active::-webkit-slider-thumb { transform: scale(1.12); cursor: grabbing; }
.range input[type='range']:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px rgba(63, 58, 53, 0.2); }
.range input[type='range']:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 4px rgba(63, 58, 53, 0.2); }
.range input[type='range']:focus { outline: none; }

@media (prefers-reduced-motion: reduce) {
  .range input[type='range']::-webkit-slider-thumb { transition: none; }
}
</style>