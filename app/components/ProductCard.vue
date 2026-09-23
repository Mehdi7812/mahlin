<template>
  <div
    class="relative flex flex-col h-full group rounded-md rounded-tr-[48px] transition-all duration-400 ease-out transform-gpu"
    :class="onDark ? 'bg-cream shadow-[0_20px_45px_-22px_rgba(0,0,0,0.5)]' : 'bg-ink/5'"
    :style="{ '--cat-shadow': catInfo.shadowColor }"
    @mouseenter="hoverShadow = true"
    @mouseleave="hoverShadow = false"
  >
    <!-- نوار رنگی بالای کارت -->
    <div
      class="absolute top-0 left-0 w-[85%] h-[3px] rounded-t-md z-10 opacity-80"
      :style="{ background: `linear-gradient(to left, ${catInfo.stripeEnd}, ${catInfo.stripeStart})` }"
    />

    <!-- بج تخفیف -->
    <span
      v-if="discountPercent > 0"
      class="absolute top-3.5 start-3.5 z-20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm"
      :style="{ backgroundColor: catInfo.accent }"
    >
      {{ discountPercent }}٪ تخفیف
    </span>

    <NuxtLink
      :to="productLink"
      class="flex flex-col h-full transition-all duration-400 ease-out"
      :class="hoverShadow ? 'shadow-[var(--cat-shadow)]' : ''"
    >
      <!-- قاب تصویر -->
      <div
        class="h-[220px] md:h-[260px] relative bg-white border-b overflow-hidden rounded-tr-[48px] transition-colors duration-500 ease-out"
        :style="{ borderColor: catInfo.borderColor }"
      >
        <img
          :src="product.cover_image || PLACEHOLDER_IMG"
          :alt="'تصویر ' + product.title_fa"
          loading="lazy"
          class="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] object-contain rounded-tr-[24px] transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
          @error="(event) => { event.target.src = PLACEHOLDER_IMG; event.target.onerror = null }"
        />

        <!-- پوشش ناموجود -->
        <div
          v-if="product.allow_sale === 0"
          class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center"
        >
          <span class="bg-ink/85 text-white text-xs font-bold px-4 py-2 rounded-full">
            ناموجود
          </span>
        </div>

        <!-- دکمه مشاهده محصول روی هاور -->
        <span
          class="hidden md:flex absolute bottom-3 inset-x-3 items-center justify-center gap-1.5 text-white text-[11px] font-bold py-2.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md"
          :style="{ backgroundColor: catInfo.accent }"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          مشاهده محصول
        </span>
      </div>

      <!-- اطلاعات محصول -->
      <div class="py-4 flex flex-col flex-1 gap-1 px-4">

        <div class="flex items-center justify-between gap-2">
          <!-- نام دسته‌بندی -->
          <span
            class="text-[10px] font-bold px-2 py-0.5 rounded-full"
            :style="{ backgroundColor: catInfo.iconBg, color: catInfo.accent }"
          >
            {{ product.category_title_fa || 'سایر' }}
          </span>
        </div>

        <!-- عنوان -->
        <h3
          class="text-[15px] font-bold text-ink leading-snug line-clamp-2 transition-colors duration-300"
          :style="{ '--hover-color': catInfo.accent }"
        >
          {{ product.title_fa }}
        </h3>

        <!-- زیرعنوان: خلاصه محصول یا برند -->
        <div class="flex items-center gap-1.5 text-[12px] text-ink/40 line-clamp-1">
          <svg
            v-if="hasSummary"
            class="w-3 h-3 flex-shrink-0 opacity-60"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          >
            <path d="M4 6h16M4 12h16M4 18h10" stroke-linecap="round"/>
          </svg>
          <svg
            v-else-if="product.brand_text"
            class="w-3 h-3 flex-shrink-0 opacity-60"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          >
            <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.1L12 16.3 5.7 20.7 8 13.6 2 9.2h7.6z" stroke-linejoin="round"/>
          </svg>
          <span class="line-clamp-1">{{ productSubtitle }}</span>
        </div>

        <!-- ═══════════ قیمت ═══════════ -->
        <div class="price-block relative mt-auto pt-3 flex items-end justify-between gap-2 border-t border-ink/[0.04]">

          <div class="flex flex-col gap-0.5 min-w-0">
            <!-- قیمت اصلی خط‌خورده (فقط وقتی تخفیف داره) -->
            <span
              v-if="hasDiscount"
              class="text-[12px] text-ink/40 line-through font-latin leading-none"
            >
              {{ money(product.price) }}
            </span>

            <!-- قیمت نهایی -->
            <div class="flex items-baseline gap-1">
              <span
                class="price-final font-black font-latin tracking-tight leading-none whitespace-nowrap"
                :style="priceStyle"
              >
                {{ money(product.final_price) }}
              </span>
              <span class="text-[10px] text-ink/45 font-medium leading-none whitespace-nowrap">
                {{ product.currency_name || 'تومان' }}
              </span>
            </div>
          </div>

          <!-- آیکون کوچک وضعیت قیمت: تخفیف یا قیمت عادی -->
          <span
            class="flex-shrink-0 w-7 h-7 rounded-full grid place-items-center transition-transform duration-300 group-hover:scale-110"
            :style="{ backgroundColor: catInfo.iconBg }"
          >
            <!-- حالت تخفیف: آیکون درصد -->
            <svg
              v-if="hasDiscount"
              class="w-3.5 h-3.5"
              :style="{ color: catInfo.accent }"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
            >
              <circle cx="7" cy="7" r="2.5"/>
              <circle cx="17" cy="17" r="2.5"/>
              <path d="M18 6L6 18" stroke-linecap="round"/>
            </svg>

            <!-- حالت عادی: آیکون دلار در دایره (Circle Dollar Sign) -->
            <svg
              v-else
              class="w-5.5 h-5.5"
              :style="{ color: catInfo.accent }"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path d="M12 6.5v11" stroke-linecap="round"/>
              <path d="M15 9.2c0-1.16-1.34-2.1-3-2.1s-3 .94-3 2.1c0 1.16 1.34 1.75 3 2.1 1.66.35 3 .94 3 2.1 0 1.16-1.34 2.1-3 2.1s-3-.94-3-2.1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>

          <!-- خط درخشان زیر قیمت روی هاور -->
          <span
            class="price-glow absolute -bottom-1 right-0 h-[2px] rounded-full"
            :style="{ background: `linear-gradient(to left, transparent, ${catInfo.accent}, transparent)` }"
          ></span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PLACEHOLDER_IMG } from '~/data/products';
import { money } from '~/utils/format.ts';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  // وقتی کارت روی پس‌زمینه‌ی تیره (مثل سکشن تخفیف‌ها) قرار می‌گیرد،
  // پس‌زمینه را روشن و سایه را قوی‌تر می‌کند تا از زمینه جدا دیده شود.
  onDark: {
    type: Boolean,
    default: false,
  },
});

const isWishlisted = ref(false);
const hoverShadow  = ref(false);

const catInfo = computed(() =>
  generateCategoryColor(props.product.category_title_fa)
);

const productLink = computed(() =>
  `/product/${props.product.id}/${props.product.slug_fa}`
);

const hasDiscount = computed(() =>
  props.product.final_price < props.product.price
);

const discountPercent = computed(() => {
  if (props.product.discount_percent)
    return Math.round(parseFloat(props.product.discount_percent));
  const { price, final_price } = props.product;
  if (!price || price <= final_price) return 0;
  return Math.round(((price - final_price) / price) * 100);
});

// ─── استایل قیمت نهایی: گرادینت هنگام تخفیف، رنگ ساده در غیر این‌صورت ───
const priceStyle = computed(() => {
  if (!hasDiscount.value) {
    return { fontSize: '17px', color: catInfo.value.accent };
  }
  return {
    fontSize: '18px',
    backgroundImage: `linear-gradient(90deg, ${catInfo.value.stripeStart}, ${catInfo.value.accent})`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
});

// ─── زیرعنوان کارت: خلاصه محصول (پاک‌سازی‌شده از HTML) یا نام برند ───
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const cleanSummary = computed(() => stripHtml(props.product.summary_fa));

const hasSummary = computed(() => cleanSummary.value.length > 0);

const productSubtitle = computed(() => {
  if (hasSummary.value) {
    return cleanSummary.value.length > 80
      ? cleanSummary.value.slice(0, 80) + '…'
      : cleanSummary.value;
  }
  return props.product.brand_text || props.product.category_title_fa || '';
});

const TYPE_LABELS = {
  course:   'دوره آموزشی',
  book:     'کتاب',
  product:  'محصول',
  package:  'پکیج',
};
const typeLabel = computed(() =>
  TYPE_LABELS[props.product.type_code_text] || props.product.type_code_text || ''
);
</script>

<style scoped>
h3:hover {
  color: var(--hover-color, #A28466);
}

/* ── بزرگ‌نمایی نرم قیمت روی هاور ─────────────────────── */
.price-final {
  display: inline-block;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.group:hover .price-final {
  transform: scale(1.04);
}

/* ── خط درخشان زیر بلوک قیمت که روی هاور ظاهر می‌شود ──── */
.price-glow {
  width: 0;
  opacity: 0;
  transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease;
}
.group:hover .price-glow {
  width: 100%;
  opacity: 0.7;
}

@media (prefers-reduced-motion: reduce) {
  .price-final,
  .price-glow {
    animation: none !important;
    transition: none !important;
  }
}
</style>