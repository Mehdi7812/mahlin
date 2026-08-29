<template>
  <div class="flex items-center gap-3 max-w-[480px] pt-3 pb-6 border-b border-ink/[0.06]">
    <div class="flex items-center bg-cardLight rounded-full h-12 overflow-hidden border border-ink/[0.04]">
      <button
        type="button"
        @click="decrease"
        class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors"
      >−</button>
      <span class="w-8 text-center text-sm font-bold text-ink font-latin">{{ fa(qty) }}</span>
      <button
        type="button"
        @click="increase"
        class="w-10 h-full flex items-center justify-center text-ink/50 hover:text-gold text-lg transition-colors"
      >+</button>
    </div>

    <button
      type="button"
      @click="$emit('add')"
      class="flex-1 h-12 bg-ink hover:bg-gold hover:text-ink text-cream rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 transform-gpu active:scale-98"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M5 7.5 H19 L17.8 20 H6.2 Z" stroke-linejoin="round" />
        <path d="M8.5 7.5 V6 A3.5 3.5 0 0 1 15.5 6 V7.5" />
      </svg>
      <span>افزودن به سبد خرید</span>
    </button>
  </div>
</template>

<script setup>
import { fa } from '~/utils/format';

const props = defineProps({
  qty: { type: Number, default: 1 },
});
const emit = defineEmits(['update:qty', 'add']);

function decrease() {
  emit('update:qty', Math.max(1, props.qty - 1));
}
function increase() {
  emit('update:qty', props.qty + 1);
}
</script>