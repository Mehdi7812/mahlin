<template>
  <div
    class="mobile-bar md:hidden fixed bottom-0 inset-x-0 z-40"
    :class="{ 'is-hidden': hidden }"
    :inert="hidden"
    :aria-hidden="hidden"
  >
    <!-- ════════ ناموجود ════════ -->
    <div v-if="inStock === false" class="flex items-center justify-center gap-2 h-12 rounded-2xl bg-ink/[0.06] text-sm font-bold text-ink/55">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" stroke-linecap="round" />
      </svg>
      این محصول فعلاً موجود نیست
    </div>

    <!-- ════════ موجود ════════ -->
    <div v-else class="flex items-center gap-3">
      <!-- قیمت -->
      <div class="min-w-0 flex-1">
        <span class="block text-[11px] leading-4 truncate">
          <del v-if="hasDiscount" class="text-ink/40 tabular-nums">
            <span class="sr-only">قیمت قبل:</span>{{ money(oldPrice * qty) }}
          </del>
          <span v-else class="text-ink/50">{{ qty > 1 ? `جمع ${fa(qty)} عدد` : 'قیمت' }}</span>
        </span>
        <span class="flex items-baseline gap-1 mt-0.5 whitespace-nowrap">
          <span class="text-base font-bold tabular-nums leading-6" :style="{ color: accent }">
            {{ money(price * qty) }}
          </span>
          <span class="text-[11px] text-ink/55">تومان</span>
        </span>
      </div>

      <!-- تعداد -->
      <div class="flex items-center h-11 rounded-full border border-ink/10 bg-cardLight shrink-0" role="group" aria-label="تعداد">
        <button
          type="button"
          class="qty-btn"
          :disabled="qty <= minQty || loading"
          aria-label="کم کردن تعداد"
          @click="$emit('decrement')"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14" stroke-linecap="round" /></svg>
        </button>
        <output class="w-6 text-center text-sm font-bold tabular-nums text-ink" aria-live="polite">{{ fa(qty) }}</output>
        <button
          type="button"
          class="qty-btn"
          :disabled="atMaxStock || loading"
          aria-label="زیاد کردن تعداد"
          @click="$emit('increment')"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14" stroke-linecap="round" /></svg>
        </button>
      </div>

      <!-- افزودن -->
      <button
        type="button"
        class="add-btn shrink-0 h-11 px-4 rounded-full text-white text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors duration-200 disabled:cursor-not-allowed"
        :style="{ backgroundColor: justAdded ? '#4F7F57' : accent }"
        :disabled="loading"
        :aria-busy="loading"
        @click="$emit('add')"
      >
        <Transition name="swap" mode="out-in">
          <span v-if="loading" key="loading" class="flex items-center">
            <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 12a9 9 0 1 1-9-9" stroke-linecap="round" />
            </svg>
            <span class="sr-only">در حال افزودن</span>
          </span>
          <span v-else-if="justAdded" key="added" class="flex items-center gap-1.5">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            اضافه شد
          </span>
          <span v-else key="add" class="flex items-center gap-1.5">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="add-label">افزودن</span>
          </span>
        </Transition>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { fa, money } from '~/utils/format.ts';

const props = defineProps({
  qty: { type: Number, default: 1 },
  minQty: { type: Number, default: 1 },
  atMaxStock: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  justAdded: { type: Boolean, default: false },
  catInfo: { type: Object, required: true },
  price: { type: Number, default: 0 },
  oldPrice: { type: Number, default: null },
  // المانی که نوار از رسیدن به آن به بعد مخفی می‌شود (مثلاً بخش نظرات)
  stopAt: { type: null, default: null },
});

defineEmits(['increment', 'decrement', 'add']);

const { loading } = useAddToCart();

const accent = computed(() => props.catInfo.darkAccent || props.catInfo.accent);
const hasDiscount = computed(() => !!props.oldPrice && props.oldPrice > props.price);

// ─── فقط در محدوده‌ی بخش محصول نمایش داده شود ─────────────
// وقتی بالای stopAt به پایین صفحه (منهای ارتفاع نوار) برسد یا از آن رد شویم، نوار پنهان می‌شود
const BAR_HEIGHT = 80;
const hidden = ref(false);
let observer = null;

function observe(el) {
  observer?.disconnect();
  observer = null;
  if (!import.meta.client || !(el instanceof Element)) {
    hidden.value = false;
    return;
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      hidden.value = entry.isIntersecting || entry.boundingClientRect.top < 0;
    },
    { rootMargin: `0px 0px -${BAR_HEIGHT}px 0px` },
  );
  observer.observe(el);
}

watch(() => props.stopAt, observe, { immediate: true });
onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
.mobile-bar {
  padding: 0.75rem 1rem;
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
  background: rgba(250, 246, 241, 0.92); /* card */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid rgba(63, 58, 53, 0.08);
  box-shadow: 0 -8px 24px rgba(63, 58, 53, 0.06);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease;
}
.mobile-bar.is-hidden {
  transform: translateY(calc(100% + 12px));
  opacity: 0;
  pointer-events: none;
}

.qty-btn {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 100%;
  border-radius: 9999px;
  color: #3F3A35;
  transition: opacity 150ms;
}
.qty-btn:disabled { opacity: 0.25; }

/* گوشی‌های خیلی باریک (۳۲۰px): فقط آیکون */
@media (max-width: 359px) {
  .add-btn { padding-inline: 0.875rem; }
  .add-label {
    position: absolute; width: 1px; height: 1px; overflow: hidden;
    clip: rect(0 0 0 0); white-space: nowrap;
  }
}

.add-btn:not(:disabled):active { filter: brightness(0.92); }

.qty-btn:focus-visible,
.add-btn:focus-visible {
  outline: 2px solid #6E523A;
  outline-offset: 2px;
}

.swap-enter-active,
.swap-leave-active { transition: opacity 150ms ease, transform 150ms ease; }
.swap-enter-from   { opacity: 0; transform: translateY(4px); }
.swap-leave-to     { opacity: 0; transform: translateY(-4px); }

@media (prefers-reduced-motion: reduce) {
  .swap-enter-active, .swap-leave-active { transition: none; }
  .mobile-bar { transition: opacity 0.2s ease; }
}
</style>