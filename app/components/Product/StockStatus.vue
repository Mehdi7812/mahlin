<template>
  <div v-if="item.inStock !== false" class="space-y-1.5">
    <div class="flex items-center gap-2 text-xs">
      <span class="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
      <span class="text-sage font-bold">{{ isCourse ? 'ثبت‌نام باز است' : 'موجود در انبار' }}</span>
    </div>
    <div v-if="lowStock && !isCourse" class="flex items-center gap-1.5 text-xs">
      <svg class="w-3.5 h-3.5 text-peach" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
      <span class="text-peach font-bold">فقط {{ fa(item.stockCount) }} عدد در انبار باقی مانده</span>
    </div>
    <div v-if="isCourse && accessDeadline" class="flex items-center gap-2 text-xs text-ink/40">
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M16 3v4M8 3v4M3 11h18" stroke-linecap="round"/></svg>
      مهلت دسترسی تا {{ accessDeadline }}
    </div>
    <div v-else-if="!isCourse" class="flex items-center gap-2 text-xs text-ink/40">
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M16 3v4M8 3v4M3 11h18" stroke-linecap="round"/></svg>
      تحویل تخمینی: {{ deliveryEstimate }}
    </div>
  </div>

  <div v-else class="flex items-center gap-2 text-xs py-2">
    <span class="w-2 h-2 rounded-full bg-blush"></span>
    <span class="text-blush font-bold">این محصول در حال حاضر ناموجود است</span>
  </div>
</template>

<script setup>
import { fa } from '~/utils/format.ts';

defineProps({
  item: { type: Object, required: true },
  isCourse: { type: Boolean, default: false },
  lowStock: { type: Boolean, default: false },
  accessDeadline: { type: String, default: null },
  deliveryEstimate: { type: String, default: '' },
});
</script>