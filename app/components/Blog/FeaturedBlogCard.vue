<template>
  <NuxtLink
    :to="'/journal/'+ blog.id + '/' + blog.slug_fa"
    class="group relative lg:grid lg:grid-cols-[1fr_1fr] bg-card border rounded-[28px] overflow-hidden transition-all duration-500 transform-gpu hover:-translate-y-1 cursor-pointer"
    :style="{
      borderColor: hovered ? catInfo.borderHoverColor : 'rgba(63,58,53,0.04)',
      boxShadow:   hovered ? catInfo.shadowColor : 'none',
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- نوار رنگی بالا -->
    <div
      class="absolute top-0 inset-x-0 h-[2.5px] z-10 transition-opacity duration-500"
      :style="{
        background: `linear-gradient(to left, ${catInfo.stripeEnd}, ${catInfo.stripeStart}, ${catInfo.stripeEnd})`,
        opacity: hovered ? 1 : 0.65,
      }"
    />

    <!-- ───── تصویر ───── -->
    <div class="relative overflow-hidden" style="aspect-ratio: 4/3; max-height: 340px;">

      <img
        v-if="coverImage"
        :src="coverImage"
        :alt="blog.title_fa"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] transform-gpu"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center"
        :style="{ background: `linear-gradient(135deg, ${catInfo.stripeStart}25, ${catInfo.stripeEnd}90)` }"
      >
        <span
          class="text-[100px] font-display select-none leading-none"
          :style="{ color: catInfo.accent, opacity: 0.15 }"
        >
          {{ (blog.category_text_fa || 'م').charAt(0) }}
        </span>
      </div>

      <!-- گرادیان پایین -->
      <div
        class="absolute inset-0 pointer-events-none"
        :style="{
          background: `linear-gradient(to top,
            rgba(20,18,16,0.55) 0%,
            rgba(20,18,16,0.12) 40%,
            transparent 70%)`
        }"
      />

      <!-- لایه رنگی hover -->
      <div
        class="absolute inset-0 pointer-events-none transition-opacity duration-500"
        :style="{
          background: `linear-gradient(135deg, ${catInfo.stripeStart}12, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }"
      />

      <!-- آیکون مشاهده روی hover -->
      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-400"
        :style="{ opacity: hovered ? 1 : 0 }"
      >
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-transform duration-400"
          :style="{
            backgroundColor: catInfo.accent + 'CC',
            transform: hovered ? 'scale(1)' : 'scale(0.7)',
          }"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
      </div>

      <!-- بج‌ها -->
      <div class="absolute bottom-3.5 start-3.5 end-3.5 flex items-end justify-between gap-2">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span
            class="flex items-center gap-1 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm"
            :style="{ backgroundColor: catInfo.accent + 'EE' }"
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z"/>
            </svg>
            مقاله ویژه
          </span>
          <span
            v-if="blog.category_text_fa"
            class="text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
            style="background-color: rgba(20,18,16,0.50)"
          >
            {{ blog.category_text_fa }}
          </span>
        </div>
        <span
          class="text-white/80 text-[10px] flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-sm flex-shrink-0"
          style="background-color: rgba(20,18,16,0.40)"
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2" stroke-linecap="round"/>
          </svg>
          {{ readingTime }} دقیقه
        </span>
      </div>

      <!-- نوار رنگی پایین تصویر -->
      <div
        class="absolute bottom-0 inset-x-0 h-[2px] transition-opacity duration-500"
        :style="{
          background: `linear-gradient(to left, transparent, ${catInfo.stripeStart}, transparent)`,
          opacity: hovered ? 0.8 : 0,
        }"
      />
    </div>

    <!-- ───── محتوا ───── -->
    <div class="relative flex flex-col justify-between p-6 sm:p-7 lg:p-8 overflow-hidden">

      <!-- هاله تزئینی -->
      <div
        class="absolute -top-20 -end-20 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
        :style="{
          backgroundColor: catInfo.blobColor,
          opacity: hovered ? 1 : 0.35,
        }"
      />

      <div class="relative space-y-4">

        <!-- meta -->
        <div class="flex items-center gap-2 flex-wrap">
          <span
            class="text-[9px] font-bold font-latin tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            :style="{ backgroundColor: catInfo.iconBg, color: catInfo.accent }"
          >
            FEATURED
          </span>
          <span class="w-px h-3 bg-ink/10" />
          <span class="text-[11px] text-ink/35 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/>
            </svg>
            {{ formattedDate }}
          </span>
        </div>

        <!-- خط تزئینی -->
        <div
          class="h-[2px] rounded-full transition-all duration-500 ease-out"
          :style="{
            background: `linear-gradient(to left, transparent, ${catInfo.stripeStart})`,
            width: hovered ? '56px' : '36px',
          }"
        />

        <!-- عنوان -->
        <h2
          class="text-xl sm:text-2xl font-bold leading-[1.4] transition-colors duration-300"
          :style="{ color: hovered ? catInfo.accent : '' }"
        >
          {{ blog.title_fa }}
        </h2>

        <!-- خلاصه -->
        <p class="text-sm text-ink/50 leading-[1.85] line-clamp-3 sm:line-clamp-4">
          {{ plainSummary }}
        </p>

      </div>

      <!-- فوتر -->
      <div class="relative mt-6 pt-5 border-t border-ink/[0.05] flex items-center justify-between gap-3">

        <!-- دکمه خواندن -->
        <span
          class="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-300"
          :style="{
            backgroundColor: hovered ? catInfo.iconBg : 'transparent',
            borderColor:     hovered ? catInfo.ringColor : 'rgba(63,58,53,0.07)',
            color:           catInfo.accent,
          }"
        >
          <span>خواندن مقاله</span>
          <svg
            class="w-3 h-3 rotate-180 transition-transform duration-300"
            :class="hovered ? '-translate-x-0.5' : ''"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>

        <!-- اشتراک‌گذاری -->
        <button
          type="button"
          class="w-7 h-7 rounded-full grid place-items-center border transition-all duration-300"
          :style="{
            borderColor: hovered ? catInfo.ringColor : 'rgba(63,58,53,0.06)',
            color:       hovered ? catInfo.accent    : 'rgba(63,58,53,0.22)',
          }"
          @click.stop.prevent
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke-linecap="round"/>
          </svg>
        </button>

      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  blog: { type: Object, required: true },
});

const hovered = ref(false);

// const PALETTE = {
//   1: {
//     stripeStart: '#8FC1D9', stripeEnd: '#DFF0F5',
//     blobColor: 'rgba(143,193,217,0.18)', iconBg: 'rgba(143,193,217,0.12)',
//     ringColor: 'rgba(143,193,217,0.35)', accent: '#6BA5C4',
//     borderHoverColor: 'rgba(143,193,217,0.38)', shadowColor: '0 20px 48px -12px rgba(143,193,217,0.25)',
//   },
//   2: {
//     stripeStart: '#B9A6DE', stripeEnd: '#EDE6F8',
//     blobColor: 'rgba(185,166,222,0.18)', iconBg: 'rgba(185,166,222,0.12)',
//     ringColor: 'rgba(185,166,222,0.35)', accent: '#9C87C4',
//     borderHoverColor: 'rgba(185,166,222,0.38)', shadowColor: '0 20px 48px -12px rgba(185,166,222,0.25)',
//   },
//   3: {
//     stripeStart: '#9CBFA0', stripeEnd: '#E3EFE4',
//     blobColor: 'rgba(156,191,160,0.18)', iconBg: 'rgba(156,191,160,0.12)',
//     ringColor: 'rgba(156,191,160,0.35)', accent: '#7BA582',
//     borderHoverColor: 'rgba(156,191,160,0.38)', shadowColor: '0 20px 48px -12px rgba(156,191,160,0.25)',
//   },
//   4: {
//     stripeStart: '#F2A868', stripeEnd: '#FBE4CD',
//     blobColor: 'rgba(242,168,104,0.16)', iconBg: 'rgba(242,168,104,0.12)',
//     ringColor: 'rgba(242,168,104,0.35)', accent: '#D68C4B',
//     borderHoverColor: 'rgba(242,168,104,0.38)', shadowColor: '0 20px 48px -12px rgba(242,168,104,0.22)',
//   },
//   5: {
//     stripeStart: '#F3B4B0', stripeEnd: '#FCE4E2',
//     blobColor: 'rgba(243,180,176,0.18)', iconBg: 'rgba(243,180,176,0.12)',
//     ringColor: 'rgba(243,180,176,0.35)', accent: '#DE8E89',
//     borderHoverColor: 'rgba(243,180,176,0.38)', shadowColor: '0 20px 48px -12px rgba(243,180,176,0.25)',
//   },
// };

// const DEFAULT_PALETTE = {
//   stripeStart: '#E0B758', stripeEnd: '#F9F2DC',
//   blobColor: 'rgba(224,183,88,0.16)', iconBg: 'rgba(224,183,88,0.10)',
//   ringColor: 'rgba(224,183,88,0.30)', accent: '#C29A45',
//   borderHoverColor: 'rgba(224,183,88,0.35)', shadowColor: '0 20px 48px -12px rgba(224,183,88,0.20)',
// };

// const catInfo    = computed(() => PALETTE[props.blog.category] ?? DEFAULT_PALETTE);

const catInfo = computed(() =>
  generateCategoryColor(props.blog.category_title_fa)
)
const coverImage = computed(() => props.blog.blog_images?.[0]?.file ?? null);

const plainSummary = computed(() =>
  (props.blog.summary_fa || props.blog.seo_description_fa || '').replace(/<[^>]*>/g, '').trim()
);

const formattedDate = computed(() => {
  if (!props.blog.created_at) return '';
  try {
    return new Date(props.blog.created_at).toLocaleDateString('fa-IR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return props.blog.created_at; }
});

const readingTime = computed(() => {
  const text = (props.blog.description_fa || '').replace(/<[^>]*>/g, '');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 120));
});
</script>