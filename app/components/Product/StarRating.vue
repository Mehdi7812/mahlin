<template>
  <span
    class="inline-flex items-center"
    :class="gapClass"
    role="img"
    :aria-label="`امتیاز ${fa(display)} از ۵`"
  >
    <span v-for="i in 5" :key="i" class="relative inline-block shrink-0" :style="boxStyle">
      <!-- ستاره‌ی خالی -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 24 24" aria-hidden="true">
        <path :d="STAR" fill="currentColor" class="text-ink/[0.12]" />
      </svg>
      <!-- بخش پرشده (از راست در RTL) -->
      <span
        class="absolute inset-y-0 start-0 overflow-hidden"
        :style="{ width: fillOf(i) + '%' }"
        aria-hidden="true"
      >
        <svg class="h-full" :style="boxStyle" viewBox="0 0 24 24">
          <path :d="STAR" :fill="color" />
        </svg>
      </span>
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { fa } from '~/utils/format.ts';

const props = defineProps({
  value: { type: [Number, String], default: 0 },
  size: { type: Number, default: 16 },
  color: { type: String, default: '#E0A93B' },
});

// ستاره با گوشه‌های گرد
const STAR =
  'M11.05 2.93c.3-.92 1.6-.92 1.9 0l1.8 5.53a1 1 0 00.95.69h5.81c.97 0 1.37 1.24.59 1.81l-4.7 3.42a1 1 0 00-.36 1.12l1.8 5.53c.3.92-.76 1.69-1.54 1.12l-4.7-3.42a1 1 0 00-1.18 0l-4.7 3.42c-.78.57-1.84-.2-1.54-1.12l1.8-5.53a1 1 0 00-.36-1.12L2.4 10.96c-.78-.57-.38-1.81.59-1.81h5.81a1 1 0 00.95-.69z';

const rating = computed(() => Math.min(5, Math.max(0, Number(props.value) || 0)));
const display = computed(() => (rating.value % 1 === 0 ? String(rating.value) : rating.value.toFixed(1)).replace('.', '٫'));

// به نزدیک‌ترین ربع گرد می‌شود تا ستاره‌ها تمیز دیده شوند
const fillOf = (i) => Math.round(Math.min(1, Math.max(0, rating.value - (i - 1))) * 4) * 25;

const boxStyle = computed(() => ({ width: props.size + 'px', height: props.size + 'px' }));
const gapClass = computed(() => (props.size >= 18 ? 'gap-1' : 'gap-0.5'));
</script>