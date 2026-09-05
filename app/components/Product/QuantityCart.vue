<template>
  <div class="hidden md:block">

    <div class="flex items-center gap-3 max-w-[480px] pt-3 pb-5">

      <!-- کنترل تعداد -->
      <div
        class="flex items-center rounded-full h-12 border overflow-hidden transition-colors duration-300"
        :style="{
          backgroundColor: 'rgba(63,58,53,0.04)',
          borderColor: hoverQty ? catInfo.borderHoverColor : 'rgba(63,58,53,0.06)',
        }"
        @mouseenter="hoverQty = true"
        @mouseleave="hoverQty = false"
      >
        <button
          type="button"
          class="w-11 h-full flex items-center justify-center transition-all duration-200 select-none"
          :style="{ color: qty <= minQty ? 'rgba(63,58,53,0.25)' : catInfo.accent }"
          :disabled="qty <= minQty"
          @click="$emit('decrement')"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14" stroke-linecap="round"/>
          </svg>
        </button>

        <span
          class="w-9 text-center text-sm font-bold font-latin select-none transition-colors duration-200"
          :style="{ color: catInfo.accent }"
        >
          {{ fa(qty) }}
        </span>

        <button
          type="button"
          class="w-11 h-full flex items-center justify-center transition-all duration-200 select-none"
          :style="{ color: atMaxStock ? 'rgba(63,58,53,0.25)' : catInfo.accent }"
          :disabled="atMaxStock"
          @click="$emit('increment')"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M5 12h14" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- دکمه افزودن به سبد -->
      <button
        type="button"
        :disabled="inStock === false || loading"
        class="flex-1 h-12 rounded-full text-white text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 transform-gpu active:scale-[0.98] disabled:cursor-not-allowed overflow-hidden relative"
        :style="cartBtnStyle"
        @mouseenter="hoverBtn = true"
        @mouseleave="hoverBtn = false"
        @click="handleAdd"
      >
        <!-- shimmer -->
        <span
          class="absolute inset-0 pointer-events-none transition-opacity duration-500"
          :style="{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
            opacity: hoverBtn && inStock && !justAdded && !loading ? 1 : 0,
          }"
        />

        <Transition name="cart-fade" mode="out-in">
          <span v-if="inStock === false" key="unavailable" class="relative flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 8l8 8M16 8l-8 8" stroke-linecap="round"/>
            </svg>
            ناموجود
          </span>

          <span v-else-if="loading" key="loading" class="relative flex items-center gap-2">
            <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 12a9 9 0 1 1-9-9" stroke-linecap="round"/>
            </svg>
            در حال افزودن...
          </span>

          <span v-else-if="justAdded" key="added" class="relative flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            به سبد اضافه شد
          </span>

          <span v-else key="add" class="relative flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0" stroke-linecap="round"/>
            </svg>
            افزودن به سبد خرید
          </span>
        </Transition>
      </button>
    </div>

    <!-- پیام حداکثر موجودی -->
    <Transition name="msg-fade">
      <p
        v-if="atMaxStock"
        class="flex items-center gap-1.5 text-[11px] -mt-2 mb-1"
        :style="{ color: catInfo.accent }"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
        </svg>
        حداکثر موجودی برای این محصول انتخاب شده است.
      </p>
    </Transition>

  </div>

  <!-- ── مودال: افزوده شد ── -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="cartModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="cartModal = false"
      >
        <!-- backdrop -->
        <div class="absolute inset-0 bg-ink/30 backdrop-blur-sm" @click="cartModal = false" />

        <!-- کارت -->
        <div class="relative bg-cream rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.12)] w-full max-w-sm p-7 text-center">

          <!-- آیکون موفقیت -->
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            :style="{ backgroundColor: catInfo.iconBg ?? 'rgba(123,165,130,0.12)' }"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7BA582" stroke-width="2.5">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <h3 class="text-base font-bold text-ink mb-1">محصول با موفقیت افزوده شد</h3>
          <p class="text-xs text-ink/50 leading-relaxed mb-6">
            محصول مورد نظر شما اکنون در سبد خرید قرار دارد.
          </p>

          <!-- تعداد آیتم‌های سبد -->
          <div
            v-if="cartCount"
            class="flex items-center justify-center gap-1.5 text-[11px] mb-5"
            :style="{ color: catInfo.accent }"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            {{ cartCount }} محصول در سبد خرید
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              class="flex-1 h-10 rounded-full border text-xs font-bold transition-all duration-200"
              style="border-color: rgba(63,58,53,0.12); color: rgba(63,58,53,0.6)"
              @click="cartModal = false"
            >
              ادامه خرید
            </button>
            <NuxtLink
              to="/cart"
              class="flex-1 h-10 rounded-full text-white text-xs font-bold flex items-center justify-center transition-all duration-200"
              :style="{ backgroundColor: catInfo.accent }"
              @click="cartModal = false"
            >
              تسویه حساب
            </NuxtLink>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fa } from '~/utils/format';
import { toast } from 'vue-sonner';

const props = defineProps({
  qty:        { type: Number,  default: 1     },
  minQty:     { type: Number,  default: 1     },
  atMaxStock: { type: Boolean, default: false  },
  inStock:    { type: Boolean, default: true   },
  justAdded:  { type: Boolean, default: false  },
  catInfo:    { type: Object,  required: true  },
  // شناسه و currency محصول برای API
  productId:  { type: Number,  required: true  },
  currencyId: { type: Number,  default: 1      },
});

const emit = defineEmits(['increment', 'decrement', 'add']);

const router     = useRouter();
const route      = useRoute();
const customizer = useCustomizerStore();

const hoverQty  = ref(false);
const hoverBtn  = ref(false);
const loading   = ref(false);
const cartModal = ref(false);
const cartCount = ref(0);

// ─── استایل داینامیک دکمه ─────────────────────────────────
const cartBtnStyle = computed(() => {
  if (props.inStock === false) {
    return { backgroundColor: 'rgba(63,58,53,0.18)', boxShadow: 'none', opacity: 0.7 };
  }
  if (props.justAdded) {
    return { backgroundColor: '#7BA582', boxShadow: '0 8px 20px -6px rgba(123,165,130,0.45)' };
  }
  if (loading.value) {
    return {
      backgroundColor: props.catInfo.accent,
      opacity: 0.85,
      boxShadow: 'none',
    };
  }
  return {
    backgroundColor: props.catInfo.accent,
    boxShadow: hoverBtn.value
      ? `0 12px 28px -8px ${props.catInfo.blobColor ?? 'rgba(162,132,102,0.4)'}`
      : `0 8px 20px -8px ${props.catInfo.blobColor ?? 'rgba(162,132,102,0.3)'}`,
    transform: hoverBtn.value ? 'translateY(-1px)' : 'translateY(0)',
  };
});

// ─── منطق افزودن به سبد ──────────────────────────────────
async function handleAdd() {
  if (props.inStock === false || loading.value) return;

  // کاربر لاگین نکرده → هدایت به صفحه ورود
  if (!customizer.auth) {
    router.push('/login?back=' + route.fullPath);
    return;
  }

  loading.value = true;

  try {
    const response = await useGarnetApiFetch('invoices/create', {
      product_id:  props.productId,
      currency_id: props.currencyId,
      payment_id:  0,
      force:       true,
      amount:      props.qty,
    });

    if (response?.code === 2000 || response?.Invoice) {
      // آپدیت تعداد سبد
      const details = response.Invoice?.invoice_details ?? [];
      customizer.cartCount = details.length;
      cartCount.value      = details.length;

      // نمایش مودال موفقیت
      cartModal.value = true;

      // emit برای parent (justAdded)
      emit('add');

      // اگه روی صفحه سبد بودیم، رفرش کن
      if (route.name === 'cart') router.go();

    } else if (response?.code === 2005) {
      toast.error(response.error || 'خطا در افزودن به سبد');
    } else {
      toast.error('خطایی رخ داد، لطفاً دوباره تلاش کنید');
    }
  } catch (err) {
    console.error('[ProductQuantityCart] خطا:', err);
    toast.error('خطا در ارتباط با سرور');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.cart-fade-enter-active,
.cart-fade-leave-active { transition: all 0.2s ease; }
.cart-fade-enter-from,
.cart-fade-leave-to     { opacity: 0; transform: translateY(5px); }

.msg-fade-enter-active,
.msg-fade-leave-active  { transition: all 0.25s ease; }
.msg-fade-enter-from,
.msg-fade-leave-to      { opacity: 0; transform: translateY(-4px); }

.modal-fade-enter-active,
.modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to     { opacity: 0; }

.modal-fade-enter-active > div:last-child,
.modal-fade-leave-active > div:last-child { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.modal-fade-enter-from > div:last-child,
.modal-fade-leave-to > div:last-child     { transform: scale(0.9) translateY(16px); }
</style>