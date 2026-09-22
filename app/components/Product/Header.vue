<template>
  <header>
    <!-- برند / دسته -->
     <div class="flex justify-between items-center">
      <div v-if="item.brand || item.cat" class="flex flex-wrap items-center gap-2 mb-3">
        <span
          v-if="item.brand"
          class="text-[13px] font-bold"
          :style="{ color: catInfo.darkAccent || catInfo.accent }"
        >
          {{ item.brand }}
        </span>

        <span v-if="item.brand && item.cat" class="w-1 h-1 rounded-full bg-ink/20" aria-hidden="true"></span>
        
        <span
          v-if="item.cat"
          class="text-[11px] font-bold px-2.5 py-1 rounded-full"
          :style="{ backgroundColor: catInfo.iconBg, color: catInfo.darkAccent || catInfo.accent }"
        >
          {{ item.cat }}
        </span>
      </div>

      <!-- امتیاز -->
      <button
        type="button"
        class="rating-btn group inline-flex items-center gap-2 -ms-1 px-1 py-1 rounded-lg"
        @click="$emit('scroll-to-reviews')"
      >
        <template v-if="rating">
          <ProductStarRating :value="rating" :size="17" />
          <span class="text-sm font-bold text-ink tabular-nums">{{ fa(ratingLabel) }}</span>
          <span class="text-xs text-ink/50 group-hover:text-ink/80 transition-colors underline-offset-4 group-hover:underline">
            {{ fa(commentsCount) }} نظر
          </span>
        </template>

        <template v-else-if="commentsCount">
          <span class="text-xs text-ink/55 group-hover:text-ink/80 transition-colors underline-offset-4 group-hover:underline">
            {{ fa(commentsCount) }} نظر
          </span>
        </template>

        <template v-else>
          <ProductStarRating :value="0" :size="15" />
          <span class="text-xs text-ink/50 group-hover:text-ink/80 transition-colors underline-offset-4 group-hover:underline">
            اولین نظر را شما بنویسید
          </span>
        </template>
      </button>
     </div>

    <!-- عنوان -->
    <h1 class="text-2xl sm:text-[32px] font-display text-ink font-bold leading-snug text-balance">
      {{ item.name }}
    </h1>
    <p
      v-if="showLatin"
      class="mt-1 text-xs sm:text-sm text-ink/45 font-latin tracking-wide uppercase"
      dir="ltr"
      style="text-align: end"
    >
      {{ item.latin }}
    </p>

    <!-- توضیح کوتاه -->
    <div v-if="item.desc" class="mt-5 max-w-[620px]">
      <p class="text-sm sm:text-[15px] text-ink/70 leading-8 whitespace-pre-line m-0">
        {{ item.desc }}
      </p>
      <!-- <button
        v-if="isLong"
        type="button"
        class="mt-1 text-xs font-bold underline-offset-4 hover:underline"
        :style="{ color: catInfo.darkAccent || catInfo.accent }"
        :aria-expanded="expanded"
        :aria-controls="descId"
        @click="expanded = !expanded"
      >
        {{ expanded ? 'بستن' : 'ادامه‌ی توضیحات' }}
      </button> -->
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fa } from '~/utils/format.ts';

const props = defineProps({
  item: { type: Object, required: true },
  catInfo: { type: Object, required: true },
  commentsCount: { type: Number, default: 0 },
  avgRating: { type: [String, Number, null], default: null },
});

defineEmits(['scroll-to-reviews']);

const rating = computed(() => {
  const n = Number(props.avgRating);
  return n > 0 ? Math.min(5, n) : 0;
});
const ratingLabel = computed(() => (rating.value % 1 === 0 ? String(rating.value) : rating.value.toFixed(1)).replace('.', '٫'));

// زیرعنوان لاتین فقط اگر واقعاً لاتین باشد و تکرار عنوان نباشد
const showLatin = computed(
  () => !!props.item.latin && props.item.latin !== props.item.name && /[A-Za-z]/.test(props.item.latin),
);

const descId = `product-desc-${props.item.id ?? 'x'}`;
const expanded = ref(false);
const isLong = computed(() => (props.item.desc?.length ?? 0) > 240);
</script>

<style scoped>
.rating-btn:focus-visible {
  outline: 2px solid #6E523A;
  outline-offset: 2px;
}
</style>