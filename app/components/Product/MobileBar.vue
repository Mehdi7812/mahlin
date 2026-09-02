<template>
  <div class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-ink/10 px-4 py-3 flex items-center gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
    <div class="flex items-center bg-cardLight rounded-full h-11 overflow-hidden border border-ink/[0.06] flex-shrink-0">
      <button @click="$emit('decrement')" class="w-9 h-full flex items-center justify-center text-ink/50 text-lg">−</button>
      <span class="w-7 text-center text-sm font-bold text-ink font-latin">{{ fa(qty) }}</span>
      <button @click="$emit('increment')" :disabled="atMaxStock" class="w-9 h-full flex items-center justify-center text-ink/50 text-lg disabled:opacity-30">+</button>
    </div>
    <button
      :disabled="inStock === false"
      class="flex-1 h-11 text-cream rounded-full text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-60"
      :style="{ backgroundColor: inStock === false ? '#B0A99F' : (justAdded ? '#7BA582' : catInfo.darkAccent) }"
      @click="$emit('add')"
    >
      <Transition name="cart-fade" mode="out-in">
        <span v-if="inStock === false" key="unavailable" class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 8l8 8" stroke-linecap="round"/>
          </svg>
          این محصول موجود نیست
        </span>
        <span v-else-if="!justAdded" key="add">افزودن به سبد — {{ money(price * qty) }} تومان</span>
        <span v-else key="added" class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          اضافه شد
        </span>
      </Transition>
    </button>
  </div>
</template>

<script setup>
import { fa, money } from '~/utils/format.ts';

defineProps({
  qty: { type: Number, default: 1 },
  atMaxStock: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  justAdded: { type: Boolean, default: false },
  catInfo: { type: Object, required: true },
  price: { type: Number, default: 0 },
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