<template>
  <div>
    <div>
      <div class="flex items-center justify-between gap-2 mb-1">
        <span v-if="item.brand" class="text-xs font-latin font-bold uppercase tracking-widest" :style="{ color: catInfo.accent }">
          {{ item.brand }}
        </span>
        <span v-else-if="item.cat" class="text-[11px] font-bold px-2.5 py-1 rounded-full" :style="{ backgroundColor: catInfo.iconBg, color: catInfo.accent }">
          {{ item.cat }}
        </span>

        <button
          v-if="commentsCount"
          type="button"
          class="flex items-center gap-1 text-xs text-ink/50 hover:text-ink transition-colors"
          @click="$emit('scroll-to-reviews')"
        >
          <svg class="w-3.5 h-3.5 text-gold fill-gold" viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/></svg>
          {{ avgRating ?? '—' }} ({{ fa(commentsCount) }} نظر)
        </button>
      </div>

      <h1 class="text-2xl sm:text-3.5xl font-display text-ink font-bold leading-tight">{{ item.name }}</h1>
      <span v-if="item.latin" class="block text-xs sm:text-sm text-ink/40 font-latin uppercase mt-1">{{ item.latin }}</span>
    </div>

    <p class="text-sm sm:text-base text-ink/70 leading-relaxed max-w-[620px] mt-4">{{ item.desc }}</p>
  </div>
</template>

<script setup>
import { fa } from '~/utils/format.ts';

defineProps({
  item: { type: Object, required: true },
  catInfo: { type: Object, required: true },
  commentsCount: { type: Number, default: 0 },
  avgRating: { type: [String, Number, null], default: null },
});

defineEmits(['scroll-to-reviews']);
</script>