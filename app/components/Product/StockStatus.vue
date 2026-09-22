<template>
  <div
    class="grid gap-3 items-start"
    :class="!isCourse && 'lg:grid-cols-2'"
  >

    <!-- ════════ موجود ════════ -->
    <section
      v-if="item.inStock !== false"
      class="rounded-2xl bg-card border border-ink/[0.07] divide-y divide-ink/[0.06]"
      aria-label="وضعیت موجودی و ارسال"
    >
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <span class="flex items-center gap-2 text-sm font-bold" style="color:#3F6B47">
          <span class="w-2 h-2 rounded-full shrink-0" style="background:#5E9467" aria-hidden="true"></span>
          {{ isCourse ? 'ثبت‌نام باز است' : 'موجود در انبار' }}
        </span>
        <span v-if="lowStock && !isCourse" class="text-xs font-bold" style="color:#A65A1F">
          فقط {{ fa(item.stockCount) }} عدد باقی مانده
        </span>
      </div>

      <p v-if="!isCourse || accessDeadline" class="px-4 py-3 text-xs text-ink/60 leading-6">
        <template v-if="isCourse">دسترسی تا {{ accessDeadline }}</template>
        <template v-else>
          تحویل به پست: <span class="font-bold text-ink/80">{{ deliveryEstimate }}</span>
          <br />
          رسیدن به دست شما: <span class="font-bold text-ink/80">۵ تا ۱۵ روز کاری</span>
        </template>
      </p>
    </section>

    <!-- ════════ ناموجود ════════ -->
    <section
      v-else
      class="flex items-start gap-3 px-4 py-4 rounded-2xl bg-card border border-ink/[0.07]"
      role="status"
    >
      <span class="grid place-items-center w-9 h-9 rounded-full shrink-0 bg-blushLight" aria-hidden="true">
        <svg class="w-[18px] h-[18px]" style="color:#A8453F" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <div class="min-w-0">
        <p class="text-sm font-bold" style="color:#A8453F">
          {{ isCourse ? 'ثبت‌نام این دوره بسته است' : 'فعلاً ناموجود' }}
        </p>
        <p class="text-xs text-ink/55 mt-1 leading-relaxed">
          {{ isCourse ? 'در حال حاضر امکان ثبت‌نام وجود ندارد.' : 'در حال حاضر امکان سفارش این محصول وجود ندارد.' }}
        </p>
      </div>
    </section>

    <!-- ════════ سوالات متداول ════════ -->
    <section
      v-if="!isCourse"
      class="rounded-2xl bg-card border border-ink/[0.07] overflow-hidden"
      aria-label="سوالات متداول خرید و ارسال"
    >
      <div
        v-for="(faq, i) in faqs"
        :key="faq.id"
        :class="i !== 0 && 'border-t border-ink/[0.06]'"
      >
        <h3 class="m-0">
          <button
            :id="`faq-btn-${faq.id}`"
            type="button"
            class="faq-btn w-full flex items-center gap-3 px-4 py-3.5 text-start transition-colors hover:bg-ink/[0.02]"
            :aria-expanded="openFaq === faq.id"
            :aria-controls="`faq-panel-${faq.id}`"
            @click="toggleFaq(faq.id)"
          >
            <span
              class="grid place-items-center w-8 h-8 rounded-lg shrink-0 transition-colors duration-200"
              :style="openFaq === faq.id
                ? { backgroundColor: catInfo.accent, color: '#fff' }
                : { backgroundColor: catInfo.iconBg, color: catInfo.accent }"
              aria-hidden="true"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path :d="faq.icon" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>

            <span class="flex-1 text-[13px] sm:text-sm font-bold text-ink leading-snug">
              {{ faq.question }}
            </span>

            <!-- + / − -->
            <span class="relative w-3.5 h-3.5 shrink-0 text-ink/40" aria-hidden="true">
              <span class="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current"></span>
              <span
                class="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded bg-current transition-transform duration-200"
                :class="openFaq === faq.id && 'scale-y-0'"
              ></span>
            </span>
          </button>
        </h3>

        <div
          :id="`faq-panel-${faq.id}`"
          role="region"
          :aria-labelledby="`faq-btn-${faq.id}`"
          :aria-hidden="openFaq !== faq.id"
          class="faq-panel grid transition-[grid-template-rows] duration-300 ease-out"
          :class="openFaq === faq.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <p class="ps-[60px] pe-5 pb-4 text-xs sm:text-[13px] text-ink/65 leading-7 max-w-prose">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fa } from '~/utils/format.ts';

defineProps({
  item: { type: Object, required: true },
  isCourse: { type: Boolean, default: false },
  lowStock: { type: Boolean, default: false },
  accessDeadline: { type: String, default: null },
  deliveryEstimate: { type: String, default: '' },
  catInfo: { type: Object, required: true },
});

// ─── سوالات متداول ─────────────────────────────────────────
const openFaq = ref('');

const faqs = [
  {
    id: 'shipping',
    icon: 'M3 7h11v8H3zM14 10h4l3 3v2h-7zM6 19a2 2 0 100-4 2 2 0 000 4zM16.5 19a2 2 0 100-4 2 2 0 000 4z',
    question: 'سفارش چه زمانی ارسال می‌شود؟',
    answer:
      'سفارش‌ها ۲۴ تا ۷۲ ساعت پس از ثبت، تحویل پست می‌شوند. کد رهگیری را در پنل کاربری، پیج اینستاگرام و کانال تلگرام می‌بینید. رسیدن مرسوله معمولاً ۵ تا ۱۵ روز کاری طول می‌کشد.',
  },
  {
    id: 'original',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    question: 'محصولات اورجینال هستند؟',
    answer:
      'بله. همه‌ی محصولات فروشگاه اورجینال‌اند و با گارانتی اصالت کالا ارسال می‌شوند.',
  },
  {
    id: 'cod',
    icon: 'M3 10h18M7 15h1m4 0h5M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z',
    question: 'پرداخت در محل دارید؟',
    answer:
      'خیر، متاسفانه فعلا خدمات پرداخت در محل فعال نیست. قبل از ارسال سفارشات، هزینه سفارش باید به صورت اینترنتی پرداخت شود.',
  },
];

function toggleFaq(id) {
  openFaq.value = openFaq.value === id ? '' : id;
}
</script>

<style scoped>
.faq-btn:focus-visible {
  outline: 2px solid #6E523A;
  outline-offset: -2px;
}

/* پنل بسته از دسترس Tab و صفحه‌خوان خارج شود */
.faq-panel[aria-hidden='true'] {
  visibility: hidden;
  transition: grid-template-rows 300ms ease-out, visibility 0s 300ms;
}

@media (prefers-reduced-motion: reduce) {
  .faq-panel,
  .faq-panel[aria-hidden='true'] { transition: none; }
}
</style>