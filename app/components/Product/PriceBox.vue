<template>
  <div
    class="bg-cardLight border rounded-2xl" 
    :style="{ borderColor: catInfo.borderColor,  }"
  >
    <!-- ════════ قیمت و حجم ════════ -->
    <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-5 pt-4 pb-4">
      <div class="min-w-0">
        <!-- نمایش تخفیف فقط در صورتی که نیاز به تماس نباشد -->
        <div v-if="!isCallForPrice && hasDiscount" class="flex flex-wrap items-center gap-2 mb-1">
          <del class="text-sm text-ink/40 tabular-nums">
            <span class="sr-only">قیمت قبل:</span>{{ money(item.oldPrice) }}
          </del>
          <span
            class="px-2 py-0.5 rounded-md text-[11px] font-bold leading-5"
            :style="{ backgroundColor: catInfo.iconBg, color: accentDark }"
          >
            {{ money(savings) }} {{ currency }} تخفیف
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <div class="flex flex-col gap-0.5 m-0">
            <!-- حالت قیمت صفر: متنی بسیار شیک و ترغیب‌کننده -->
            <template v-if="isCallForPrice">
              <span
                class="text-xl sm:text-2xl font-bold leading-tight"
                :style="{ color: accentDark }"
              >
                استعلام تلفنی و رزرو خرید
              </span>
              <span class="text-[11px] text-ink/40 mt-0.5">به دلیل اتمام موقت موجودی یا نوسان قیمت</span>
            </template>

            <!-- حالت عادی دارای قیمت -->
            <template v-else>
              <div class="flex items-baseline gap-1.5">
                <span v-if="hasDiscount" class="sr-only">قیمت فعلی:</span>
                <span
                  class="text-2xl sm:text-[28px] font-bold tabular-nums leading-none"
                  :style="{ color: accentDark }"
                >
                  {{ money(item.price) }}
                </span>
                <span class="text-sm text-ink/55">{{ currency }}</span>
              </div>
            </template>
          </div>

          <!-- اطمینان‌بخشی حالت عادی -->
          <span
            v-if="!isCallForPrice && item.inStock !== false"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium leading-5"
            style="background:#EEF5EF; color:#3F6B47"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" stroke-linejoin="round" />
              <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            قیمت و موجودی همیشه به‌روز است؛ با خیال راحت خرید کنید.
          </span>

          <!-- اطمینان‌بخشی صمیمانه برای حالت بدون موجودی / نیاز به تماس -->
          <span
            v-if="isCallForPrice"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium leading-5"
            style="background:#FFF9E6; color:#8A6D1C"
          >
            <svg class="w-3.5 h-3.5 shrink-0 text-[#B89024] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            این محصول بسیار پرطرفدار است؛ جهت رزرو در پارت جدید با ما تماس بگیرید.
          </span>
        </div>
      </div>

      <div v-if="item.size" class="ps-5 border-s border-ink/10">
        <span class="block text-[11px] text-ink/45 leading-5">حجم</span>
        <span class="block text-sm font-bold text-ink leading-6">{{ item.size }}</span>
      </div>

    </div>

    <!-- ════════ تعداد و افزودن به سبد (دسکتاپ؛ موبایل = MobileBar) ════════ -->
    <div class="hidden md:block border-t border-ink/[0.06] px-5 py-4">
      <div class="flex items-center gap-3">
        
        <!-- حالت تماس بگیرید (دکمه دعوت به تماس VIP با شماره شما) -->
        <template v-if="isCallForPrice">
          <a
            href="tel:+989922655520"
            class="cart-btn flex-1 h-12 rounded-full text-white text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-lg"
            :style="{ backgroundColor: accentDark }"
          >
            <!-- آیکون تلفن با انیمیشن ملایم لرزش برای جذب نگاه کاربر -->
            <svg class="w-5 h-5 phone-icon-animation" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            مشاوره تلفنی و ثبت سفارش سریع: ۰۹۹۲۲۶۵۵۵۲۰
          </a>
        </template>

        <!-- حالت عادی خرید -->
        <template v-else>
          <!-- تعداد -->
          <div
            v-if="item.inStock !== false"
            class="flex items-center h-12 rounded-full border border-ink/10 bg-cardLight shrink-0"
            role="group"
            aria-label="تعداد"
          >
            <button
              type="button"
              class="qty-btn"
              :style="{ color: accentDark }"
              :disabled="qty <= minQty || loading"
              aria-label="کم کردن تعداد"
              @click="$emit('decrement')"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14" stroke-linecap="round" />
              </svg>
            </button>

            <output class="w-8 text-center text-sm font-bold tabular-nums text-ink" aria-live="polite">
              {{ fa(qty) }}
            </output>

            <button
              type="button"
              class="qty-btn"
              :style="{ color: accentDark }"
              :disabled="atMaxStock || loading"
              aria-label="زیاد کردن تعداد"
              @click="$emit('increment')"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 5v14M5 12h14" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <!-- دکمه افزودن به سبد -->
          <button
            type="button"
            class="cart-btn flex-1 h-12 rounded-full text-white text-sm font-bold flex items-center justify-center gap-2 transition-[background-color,filter] duration-200 disabled:cursor-not-allowed"
            :style="{ backgroundColor: btnColor }"
            :disabled="item.inStock === false || loading"
            :aria-busy="loading"
            @click="$emit('add')"
          >
            <Transition name="swap" mode="out-in">
              <span v-if="item.inStock === false" key="out" class="flex items-center gap-2">
                ناموجود
              </span>

              <span v-else-if="loading" key="loading" class="flex items-center gap-2">
                <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 12a9 9 0 1 1-9-9" stroke-linecap="round" />
                </svg>
                در حال افزودن
              </span>

              <span v-else-if="justAdded" key="added" class="flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                به سبد اضافه شد
              </span>

              <span v-else key="add" class="flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                افزودن به سبد خرید
                <span v-if="qty > 1" class="font-normal opacity-80 tabular-nums">
                  ({{ money(item.price * qty) }} {{ currency }})
                </span>
              </span>
            </Transition>
          </button>
        </template>
      </div>

      <p v-if="!isCallForPrice && atMaxStock && item.inStock !== false" class="mt-2.5 mb-0 text-xs text-ink/55">
        بیشترین تعداد مجاز برای این محصول را انتخاب کرده‌اید.
      </p>
    </div>
  </div>

  <!-- ════════ مودال: افزوده شد ════════ -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modalOpen"
        class="fixed inset-0 z-50 grid place-items-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        @keydown.esc="modalOpen = false"
      >
        <div class="absolute inset-0 bg-ink/30" @click="modalOpen = false" />

        <div class="modal-card relative w-full max-w-sm bg-cream rounded-3xl p-6 text-center shadow-[0_24px_60px_rgba(63,58,53,0.18)]">
          <span
            class="grid place-items-center w-14 h-14 mx-auto mb-4 rounded-full"
            style="background:#E3EFE4; color:#4F7F57"
            aria-hidden="true"
          >
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>

          <h3 id="cart-modal-title" class="text-base font-bold text-ink mb-1">به سبد خرید اضافه شد</h3>
          <p class="text-xs text-ink/55 leading-6 mb-5">
            <template v-if="cartCount">{{ fa(cartCount) }} محصول در سبد شما است.</template>
            <template v-else>می‌توانید خرید را ادامه دهید یا سفارش را نهایی کنید.</template>
          </p>

          <div class="flex gap-2.5">
            <button
              ref="continueBtn"
              type="button"
              class="flex-1 h-11 rounded-full border border-ink/15 text-sm font-bold text-ink/70 hover:bg-ink/[0.03] transition-colors"
              @click="modalOpen = false"
            >
              ادامه خرید
            </button>
            <NuxtLink
              to="/cart"
              class="flex-1 h-11 rounded-full text-white text-sm font-bold grid place-items-center"
              :style="{ backgroundColor: accentDark }"
              @click="modalOpen = false"
            >
              مشاهده سبد خرید
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue';
import { money, fa } from '~/utils/format.ts';

const props = defineProps({
  item: { type: Object, required: true },
  catInfo: { type: Object, required: true },
  qty: { type: Number, default: 1 },
  minQty: { type: Number, default: 1 },
  atMaxStock: { type: Boolean, default: false },
  justAdded: { type: Boolean, default: false },
});

defineEmits(['increment', 'decrement', 'add']);

const { loading, modalOpen, cartCount } = useAddToCart();

// تشخیص هوشمند صفر بودن یا ناموجود بودن واقعی قیمت محصول
const isCallForPrice = computed(() => {
  const price = parseFloat(props.item.price);
  return isNaN(price) || price <= 0;
});

const currency = computed(() => props.item.currency || 'تومان');
const accentDark = computed(() => props.catInfo.darkAccent || props.catInfo.accent);

const hasDiscount = computed(
  () =>
    !isCallForPrice.value &&
    Number(props.item.oldPrice) > 0 &&
    Number(props.item.oldPrice) > Number(props.item.price),
);
const savings = computed(() =>
  hasDiscount.value ? Number(props.item.oldPrice) - Number(props.item.price) : 0,
);

const btnColor = computed(() => {
  if (props.item.inStock === false) return 'rgba(63,58,53,0.3)';
  if (props.justAdded) return '#4F7F57';
  return accentDark.value;
});

// فوکوس روی دکمه‌ی اول مودال برای کاربران کیبورد
const continueBtn = ref(null);
watch(modalOpen, async (open) => {
  if (!open) return;
  await nextTick();
  continueBtn.value?.focus();
});
</script>

<style scoped>
.qty-btn {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 100%;
  border-radius: 9999px;
  transition: opacity 150ms;
}
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.cart-btn:not(:disabled):hover { filter: brightness(1.12); }
.cart-btn:not(:disabled):active { filter: brightness(0.95); }

.qty-btn:focus-visible,
.cart-btn:focus-visible {
  outline: 2px solid #6E523A;
  outline-offset: 2px;
}

/* افکت ملایم برای تکان خوردن آیکون تلفن دکمه رزرو */
@keyframes phone-wiggle {
  0%, 100% { transform: rotate(0deg) scale(1); }
  10%, 30% { transform: rotate(-8deg) scale(1.08); }
  20%, 40% { transform: rotate(8deg) scale(1.08); }
  50% { transform: rotate(0deg) scale(1); }
}
.phone-icon-animation {
  animation: phone-wiggle 3s infinite ease-in-out;
  transform-origin: center;
}

.swap-enter-active,
.swap-leave-active { transition: opacity 150ms ease, transform 150ms ease; }
.swap-enter-from   { opacity: 0; transform: translateY(4px); }
.swap-leave-to     { opacity: 0; transform: translateY(-4px); }

.modal-enter-active,
.modal-leave-active { transition: opacity 200ms ease; }
.modal-enter-from,
.modal-leave-to     { opacity: 0; }
.modal-enter-active .modal-card,
.modal-leave-active .modal-card { transition: transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1); }
.modal-enter-from .modal-card,
.modal-leave-to .modal-card     { transform: translateY(12px) scale(0.97); }

@media (prefers-reduced-motion: reduce) {
  .swap-enter-active, .swap-leave-active,
  .modal-enter-active, .modal-leave-active,
  .modal-enter-active .modal-card, .modal-leave-active .modal-card,
  .phone-icon-animation { transition: none !important; animation: none !important; }
}
</style>