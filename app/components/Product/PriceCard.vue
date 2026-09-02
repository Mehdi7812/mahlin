<template>
  <div class="flex items-center gap-4 py-4 px-5 bg-card border border-ink/[0.03] rounded-2xl max-w-[400px]">
    <div>
      <span class="block text-[10px] text-ink/40 mb-0.5">قیمت محصول</span>
      <div class="text-xl sm:text-2xl font-bold text-accent font-latin">
        {{ money(price) }}
        <span class="text-xs text-ink/50 font-normal font-sans mr-0.5">تومان</span>
      </div>
    </div>
    <div v-if="size" class="mr-auto pr-4 border-r border-ink/10 text-left">
      <span class="block text-[10px] text-ink/40 mb-0.5">حجم / مقدار</span>
      <span class="text-sm font-bold text-ink font-latin">{{ size }}</span>
    </div>
  </div>
</template>

<script setup>
import { money } from '~/utils/format.ts';

defineProps({
  price: { type: [Number, String], required: true },
  size: { type: String, default: '' },
});
</script>