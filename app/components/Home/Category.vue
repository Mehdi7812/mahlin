<script setup>

// ─── پالت بر اساس ID کتگوری ───────────────────────────────
// const PALETTE = {
//   1: { // ضد آفتاب
//     bgColor:          '#FDF8F3',
//     borderColor:      'rgba(242,168,104,0.18)',
//     borderHoverColor: 'rgba(242,168,104,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(242,168,104,0.22)',
//     blobColor:        'rgba(242,168,104,0.16)',
//     stripeStart:      '#F2A868',
//     stripeEnd:        '#FBEEDD',
//     iconBg:           'rgba(242,168,104,0.12)',
//     ringColor:        'rgba(242,168,104,0.22)',
//     accent:           '#D68C4B',
//   },
//   2: { // آب‌رسان
//     bgColor:          '#F6FAFC',
//     borderColor:      'rgba(143,193,217,0.18)',
//     borderHoverColor: 'rgba(143,193,217,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(143,193,217,0.25)',
//     blobColor:        'rgba(143,193,217,0.18)',
//     stripeStart:      '#8FC1D9',
//     stripeEnd:        '#EDF6FA',
//     iconBg:           'rgba(143,193,217,0.12)',
//     ringColor:        'rgba(143,193,217,0.22)',
//     accent:           '#6BA5C4',
//   },
//   3: { // ترمیم‌کننده و مرطوب‌کننده
//     bgColor:          '#F8F7FB',
//     borderColor:      'rgba(185,166,222,0.18)',
//     borderHoverColor: 'rgba(185,166,222,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(185,166,222,0.25)',
//     blobColor:        'rgba(185,166,222,0.18)',
//     stripeStart:      '#B9A6DE',
//     stripeEnd:        '#F2EEFA',
//     iconBg:           'rgba(185,166,222,0.12)',
//     ringColor:        'rgba(185,166,222,0.22)',
//     accent:           '#9C87C4',
//   },
//   4: { // کرم جوان‌ساز و لیفتینگ
//     bgColor:          '#FDF7F7',
//     borderColor:      'rgba(243,180,176,0.18)',
//     borderHoverColor: 'rgba(243,180,176,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(243,180,176,0.25)',
//     blobColor:        'rgba(243,180,176,0.18)',
//     stripeStart:      '#F3B4B0',
//     stripeEnd:        '#FCEEED',
//     iconBg:           'rgba(243,180,176,0.12)',
//     ringColor:        'rgba(243,180,176,0.22)',
//     accent:           '#DE8E89',
//   },
//   5: { // شوینده
//     bgColor:          '#F7FAF7',
//     borderColor:      'rgba(156,191,160,0.18)',
//     borderHoverColor: 'rgba(156,191,160,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(156,191,160,0.25)',
//     blobColor:        'rgba(156,191,160,0.18)',
//     stripeStart:      '#9CBFA0',
//     stripeEnd:        '#EDF4EE',
//     iconBg:           'rgba(156,191,160,0.12)',
//     ringColor:        'rgba(156,191,160,0.22)',
//     accent:           '#7BA582',
//   },
//   6: { // ضدلک و روشن‌کننده
//     bgColor:          '#FBFAF4',
//     borderColor:      'rgba(224,183,88,0.18)',
//     borderHoverColor: 'rgba(224,183,88,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(224,183,88,0.22)',
//     blobColor:        'rgba(224,183,88,0.16)',
//     stripeStart:      '#E0B758',
//     stripeEnd:        '#F9F2DC',
//     iconBg:           'rgba(224,183,88,0.12)',
//     ringColor:        'rgba(224,183,88,0.22)',
//     accent:           '#C29A45',
//   },
//   7: { // دور چشم
//     bgColor:          '#F6FAFA',
//     borderColor:      'rgba(110,178,178,0.18)',
//     borderHoverColor: 'rgba(110,178,178,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(110,178,178,0.22)',
//     blobColor:        'rgba(110,178,178,0.16)',
//     stripeStart:      '#6EB2B2',
//     stripeEnd:        '#E9F4F4',
//     iconBg:           'rgba(110,178,178,0.12)',
//     ringColor:        'rgba(110,178,178,0.22)',
//     accent:           '#519494',
//   },
//   8: { // تونر و لایه‌بردار
//     bgColor:          '#F7F8FC',
//     borderColor:      'rgba(140,155,210,0.18)',
//     borderHoverColor: 'rgba(140,155,210,0.45)',
//     shadowColor:      '0 16px 32px -10px rgba(140,155,210,0.25)',
//     blobColor:        'rgba(140,155,210,0.18)',
//     stripeStart:      '#8C9BD2',
//     stripeEnd:        '#EEF0FA',
//     iconBg:           'rgba(140,155,210,0.12)',
//     ringColor:        'rgba(140,155,210,0.22)',
//     accent:           '#6A7DC0',
//   },
// };

// const DEFAULT_PALETTE = {
//   bgColor:          '#FAF7F3',
//   borderColor:      'rgba(162,132,102,0.15)',
//   borderHoverColor: 'rgba(162,132,102,0.35)',
//   shadowColor:      '0 16px 32px -10px rgba(162,132,102,0.20)',
//   blobColor:        'rgba(162,132,102,0.14)',
//   stripeStart:      '#A28466',
//   stripeEnd:        '#F2EBE3',
//   iconBg:           'rgba(162,132,102,0.10)',
//   ringColor:        'rgba(162,132,102,0.20)',
//   accent:           '#A28466',
// };

// ─── State ───────────────────────────────────────────────
const categories = ref([]);
const pending    = ref(true);
const error      = ref(null);

// ─── Fetch ───────────────────────────────────────────────
useGarnetApiFetch('products/categoryIndex')
  .then((response) => {
    categories.value = (response.ProductCategories || [])
      .filter(c => c.status === 1 && c.parent_id === null)
      .sort((a, b) => b.order - a.order);
  })
  .catch((err) => {
    console.error('[Categories] خطا:', err);
    error.value = err;
  })
  .finally(() => {
    pending.value = false;
  });

// ─── Helpers ─────────────────────────────────────────────

// رنگ‌ها از روی ID — بدون وابستگی به title_fa
// function getPalette(id) {
//   return PALETTE[id] || DEFAULT_PALETTE;
// }

function getPalette(cat) {
  return generateCategoryColor(cat.title_fa);
}

// توضیح از API میاد، فقط اگه خالی بود fallback بده
function getDesc(cat) {
  const d = (cat.description_fa || '').split('\n')[0].trim();
  return d || 'مراقبت روزانه پوست';
}

// عنوان کوتاه‌شده برای نمایش در کارت
function getTitle(cat) {
  const map = {
    1: 'ضدآفتاب‌ها',
    2: 'آبرسان‌ها',
    3: 'ترمیم و مرطوب‌کننده',
    4: 'جوانساز و لیفتینگ',
    5: 'شوینده‌ها',
    6: 'ضدلک و روشن‌کننده',
    7: 'دورچشم',
    8: 'تونر و لایه‌بردار',
  };
  return map[cat.id] || cat.title_fa;
}

function onEnter(e, palette) {
  e.currentTarget.style.borderColor = palette.borderHoverColor;
  e.currentTarget.style.boxShadow   = palette.shadowColor;
}
function onLeave(e, palette) {
  e.currentTarget.style.borderColor = palette.borderColor;
  e.currentTarget.style.boxShadow   = 'none';
}
</script>

<template>
  <section class="relative">
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 start-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-lilac/[0.06] blur-[120px] rounded-full" />
      <div class="absolute -bottom-10 start-0 w-[250px] h-[250px] bg-blush/[0.06] blur-[100px] rounded-full" />
      <div class="absolute -bottom-10 end-0 w-[250px] h-[250px] bg-sky/[0.06] blur-[100px] rounded-full" />
    </div>

    <div class="relative max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16 overflow-hidden">

      <!-- هدر -->
      <div class="text-center mb-10 relative">
        <div class="flex items-center justify-center gap-2.5 mb-2.5">
          <span class="w-6 h-px bg-gold/60" />
          <span class="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-bold">بخش تخصصی ماهلین</span>
          <span class="w-6 h-px bg-gold/60" />
        </div>
        <h2 class="text-xl sm:text-2xl md:text-3xl font-display text-ink font-bold mb-2">
          خرید بر اساس دسته‌بندی پوست
        </h2>
        <p class="text-ink/60 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          محصولات تخصصی فرموله‌شده متناسب با نیاز واقعی پوست شما
        </p>
      </div>

      <!-- لودینگ -->
      <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        <div
          v-for="n in 8" :key="n"
          class="rounded-[24px] border border-ink/[0.06] bg-ink/[0.03] h-36 animate-pulse"
        />
      </div>

      <!-- خطا -->
      <div v-else-if="error" class="text-center py-16 text-ink/40 text-sm">
        <svg class="w-10 h-10 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
        </svg>
        دریافت دسته‌بندی‌ها با خطا مواجه شد
      </div>

      <!-- گرید -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 relative">
        <NuxtLink
          v-for="(cat, i) in categories"
          :key="cat.id"
          :to="{ path: '/shop', query: { cat_id: cat.id } }"
          class="cat-card group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden transform-gpu animate-fade-in-up border"
          :style="{
            animationDelay:  i * 0.08 + 's',
            backgroundColor: getPalette(cat).bgColor,
            borderColor:     getPalette(cat).borderColor,
            '--cat-accent':  getPalette(cat).accent,
          }"
          @mouseenter="e => onEnter(e, getPalette(cat))"
          @mouseleave="e => onLeave(e, getPalette(cat))"
        >
          <!-- هاله -->
          <div
            class="absolute -top-12 -end-12 w-32 h-32 rounded-full blur-2xl pointer-events-none"
            :style="{ backgroundColor: getPalette(cat).blobColor }"
          />

          <!-- نوار بالا -->
          <div
            class="absolute top-0 inset-x-0 h-[2px] rounded-t-[20px] sm:rounded-t-[24px] opacity-70"
            :style="{
              background: `linear-gradient(to left, ${getPalette(cat).stripeEnd}, ${getPalette(cat).stripeStart})`
            }"
          />

          <!-- آیکون -->
          <div
            class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3.5 transition-all duration-400 ease-out transform-gpu group-hover:scale-110 group-hover:-rotate-3"
            :style="{
              backgroundColor: getPalette(cat).iconBg,
              boxShadow: `0 0 0 1px ${getPalette(cat).ringColor}`,
            }"
          >
            <img
              v-if="cat.photo"
              :src="cat.photo"
              :alt="cat.title_fa"
              class="w-7 h-7 object-contain"
            />
            <CategoryIcon
              v-else
              :cat="cat.title_fa"
              :size="26"
              :style="{ color: getPalette(cat).accent }"
            />
          </div>

          <!-- عنوان -->
          <h3 class="cat-title flex items-center gap-1 text-xs sm:text-sm font-bold text-ink mb-1 transition-colors duration-300">
            <span>{{ getTitle(cat) }}</span>
            <svg
              class="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out transform-gpu rtl:rotate-180"
              :style="{ color: getPalette(cat).accent }"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </h3>

          <!-- توضیح -->
          <p class="text-[10px] sm:text-xs text-ink/45 leading-normal max-w-[150px]">
            {{ getDesc(cat) }}
          </p>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}
.cat-card:hover .cat-title {
  color: var(--cat-accent);
}
</style>