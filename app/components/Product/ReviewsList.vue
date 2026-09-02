<template>
  <div>
    <!-- اسکلتون نظرات -->
    <div v-if="loadingPosts" class="grid sm:grid-cols-2 gap-5">
      <div v-for="n in 4" :key="n" class="h-32 bg-ink/[0.04] rounded-2xl animate-pulse"></div>
    </div>

    <!-- لیست نظرات واقعی -->
    <template v-else>
      <div v-if="comments.length" class="grid sm:grid-cols-2 gap-5">
        <div
          v-for="(c, i) in comments"
          :key="c.id ?? i"
          class="p-6 bg-card border border-ink/[0.03] rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
        >
          <div>
            <div class="flex justify-between items-center text-xs mb-2">
              <span class="font-bold text-ink flex items-center gap-2">
                <span class="w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold text-white" :style="{ backgroundColor: catInfo.accent }">
                  {{ (c.user_full_name || c.name || 'ک').charAt(0) }}
                </span>
                {{ c.user_full_name || c.name || 'کاربر مهمان' }}
              </span>
              <span class="text-ink/40 font-latin">{{ formatDate(c.created_at) }}</span>
            </div>
            <div v-if="c.rate" class="flex gap-0.5 text-gold text-sm mb-3">
              <span v-for="star in c.rate" :key="star">★</span>
            </div>
            <p class="text-xs sm:text-sm text-ink/70 leading-relaxed">{{ c.comment }}</p>
          </div>
        </div>
      </div>

      <!-- دکمه مشاهده بیشتر -->
      <div v-if="hasMore" class="flex justify-center mt-6">
        <button
          type="button"
          :disabled="loadMoreBtn"
          class="flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-full border border-ink/[0.08] text-ink/60 hover:text-ink hover:border-ink/20 transition-colors disabled:opacity-50"
          @click="$emit('load-more')"
        >
          <svg v-if="loadMoreBtn" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 12a9 9 0 1 1-9-9" stroke-linecap="round"/>
          </svg>
          <template v-else>
            مشاهده بیشتر
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </button>
      </div>

      <!-- حالت خالی -->
      <div
        v-if="!comments.length"
        class="flex flex-col items-center justify-center text-center py-14 px-6 bg-card/60 border border-dashed border-ink/[0.08] rounded-3xl"
      >
        <div class="w-16 h-16 rounded-full grid place-items-center mb-4" :style="{ backgroundColor: catInfo.iconBg }">
          <svg class="w-7 h-7" :style="{ color: catInfo.accent }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="text-sm font-bold text-ink mb-1.5">هنوز نظری ثبت نشده است</h3>
        <p class="text-xs text-ink/45 max-w-[280px] leading-relaxed">
          اولین نفری باشید که تجربه‌ی خود از این محصول را با دیگران به اشتراک می‌گذارید.
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  comments: { type: Array, default: () => [] },
  loadingPosts: { type: Boolean, default: true },
  loadMoreBtn: { type: Boolean, default: false },
  hasMore: { type: Boolean, default: false },
  catInfo: { type: Object, required: true },
});

defineEmits(['load-more']);

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr.replace(' ', 'T')).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
  } catch { return ''; }
}
</script>