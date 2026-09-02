<template>
  <div>
    <div class="hidden md:flex items-center gap-3 max-w-[480px] pt-3 pb-6 border-b border-ink/[0.06]">
      <div class="flex items-center bg-cardLight rounded-full h-12 overflow-hidden border border-ink/[0.04]">
        <button @click="$emit('decrement')" class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors">−</button>
        <span class="w-8 text-center text-sm font-bold text-ink font-latin">{{ fa(qty) }}</span>
        <button @click="$emit('increment')" :disabled="atMaxStock" class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">+</button>
      </div>

      <button
        :disabled="inStock === false"
        class="flex-1 h-12 text-cream rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 transform-gpu active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
        :style="{ backgroundColor: inStock === false ? '#B0A99F' : (justAdded ? '#7BA582' : catInfo.darkAccent) }"
        @click="$emit('add')"
      >
        <Transition name="cart-fade" mode="out-in">
          <span v-if="inStock === false" key="unavailable" class="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 8l8 8" stroke-linecap="round"/>
            </svg>
            موجود نیست
          </span>
          <span v-else-if="!justAdded" key="add" class="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M5 7.5 H19 L17.8 20 H6.2 Z" stroke-linejoin="round" />
              <path d="M8.5 7.5 V6 A3.5 3.5 0 0 1 15.5 6 V7.5" />
            </svg>
            افزودن به سبد خرید
          </span>
          <span v-else key="added" class="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            به سبد اضافه شد
          </span>
        </Transition>
      </button>
    </div>
    <p v-if="atMaxStock" class="hidden md:block text-[11px] text-peach -mt-4">حداکثر موجودی برای این محصول انتخاب شده است.</p>
  </div>
</template>

<script setup>
import { fa } from '~/utils/format.ts';

defineProps({
  qty: { type: Number, default: 1 },
  atMaxStock: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  justAdded: { type: Boolean, default: false },
  catInfo: { type: Object, required: true },
});

defineEmits(['increment', 'decrement', 'add']);
</script>

<style scoped>
.cart-fade-enter-active,
.cart-fade-leave-active {
  transition: all 0.2s ease;
}
.cart-fade-enter-from,
.cart-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>