<template>
  <div class="flex items-center gap-4 py-4 px-5 bg-card border rounded-2xl max-w-[440px]" :style="{ borderColor: catInfo.borderColor }">
    <div>
      <span class="block text-[10px] text-ink/40 mb-0.5">قیمت محصول</span>
      <div class="flex items-baseline gap-2">
        <span v-if="item.oldPrice && item.oldPrice > item.price" class="text-sm text-ink/35 line-through font-latin">
          {{ money(item.oldPrice) }}
        </span>
        <div class="text-xl sm:text-2xl font-bold font-latin" :style="{ color: catInfo.accent }">
          {{ money(item.price) }}
          <span class="text-xs text-ink/50 font-normal font-sans mr-0.5">تومان</span>
        </div>
      </div>
    </div>
    <div v-if="item.size" class="mr-auto pr-4 border-r border-ink/10 text-left">
      <span class="block text-[10px] text-ink/40 mb-0.5">حجم / مقدار</span>
      <span class="text-sm font-bold text-ink font-latin">{{ item.size }}</span>
    </div>
  </div>
</template>

<script setup>
import { money } from '~/utils/format.ts';

defineProps({
  item: { type: Object, required: true },
  catInfo: { type: Object, required: true },
});
</script>