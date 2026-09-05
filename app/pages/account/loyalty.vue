<template>
  <div class="flex flex-col gap-5">
    <h2 class="font-display text-xl md:text-2xl text-ink">باشگاه مشتریان</h2>

    <!-- کارت سطح عضویت -->
    <div class="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-ink to-[#2b2622] text-cream p-6 md:p-8">
      <div class="absolute -top-14 -end-14 w-56 h-56 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">
            <Icon name="tabler:crown" class="text-[13px]" />
            سطح {{ LOYALTY.tier }}
          </span>
          <p class="mt-3 text-[13px] text-cream/60">امتیاز فعلی شما</p>
          <p class="font-display text-4xl mt-1">{{ faNumber(LOYALTY.points) }}</p>
        </div>

        <div class="md:w-[280px]">
          <div class="flex items-center justify-between text-[11.5px] text-cream/60 mb-1.5">
            <span>سطح {{ LOYALTY.tier }}</span>
            <span>سطح {{ LOYALTY.nextTier }}</span>
          </div>
          <div class="h-2 rounded-full bg-white/15 overflow-hidden">
            <div class="h-full bg-gold rounded-full transition-all duration-700" :style="{ width: progressPercent + '%' }" />
          </div>
          <p class="mt-2 text-[11.5px] text-cream/50">
            {{ faNumber(pointsToNextTier) }} امتیاز دیگر تا سطح {{ LOYALTY.nextTier }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-5">
      <!-- کیف پول -->
      <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
            <Icon name="tabler:wallet" class="text-sage" />
            کیف پول
          </h3>
        </div>
        <p class="text-3xl font-bold text-ink font-latin">{{ money(LOYALTY.walletBalance) }}</p>
        <p class="text-[11.5px] text-inkSoft mt-1">تومان موجودی</p>
        <div class="flex gap-2 mt-5">
          <button type="button" class="flex-1 py-2.5 rounded-full bg-accent text-cream text-[12.5px] font-bold hover:bg-accentHover transition-colors">
            افزایش موجودی
          </button>
          <button type="button" class="flex-1 py-2.5 rounded-full border border-ink/15 text-[12.5px] font-bold text-ink hover:bg-ink/5 transition-colors">
            تاریخچه تراکنش‌ها
          </button>
        </div>
      </div>

      <!-- معرفی دوستان -->
      <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
        <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-4">
          <Icon name="tabler:users" class="text-lilac" />
          دعوت از دوستان
        </h3>
        <p class="text-[12.5px] text-inkSoft leading-6">
          کد اختصاصی خود را با دوستانتان به اشتراک بگذارید و به ازای هر خرید موفق، امتیاز هدیه بگیرید.
        </p>
        <div class="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-ink/15 bg-ink/[0.02] p-3">
          <span class="flex-1 font-latin text-[13px] font-bold text-ink tracking-wide" dir="ltr">{{ LOYALTY.referralCode }}</span>
          <button
            type="button"
            class="shrink-0 flex items-center gap-1 text-[11.5px] font-bold text-accent hover:text-accentHover"
            @click="copyCode"
          >
            <Icon :name="copied ? 'tabler:check' : 'tabler:copy'" class="text-[14px]" />
            {{ copied ? 'کپی شد' : 'کپی کد' }}
          </button>
        </div>
      </div>
    </div>

    <!-- تاریخچه امتیازات -->
    <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight overflow-hidden">
      <div class="px-5 py-4 border-b border-ink/[0.06]">
        <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
          <Icon name="tabler:history" class="text-accent" />
          تاریخچه امتیازات
        </h3>
      </div>
      <div class="divide-y divide-ink/[0.05]">
        <div v-for="(h, idx) in LOYALTY.history" :key="idx" class="flex items-center gap-4 px-5 py-4">
          <span
            class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            :class="h.type === 'earn' ? 'bg-sageLight text-[#5C8A61]' : 'bg-blushLight text-[#C57771]'"
          >
            <Icon :name="h.type === 'earn' ? 'tabler:plus' : 'tabler:minus'" class="text-[15px]" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-[13px] font-bold text-ink line-clamp-1">{{ h.title }}</p>
            <p class="text-[11px] text-inkSoft mt-0.5">{{ faDate(h.date) }}</p>
          </div>
          <p class="text-[13px] font-bold font-latin shrink-0" :class="h.type === 'earn' ? 'text-sage' : 'text-blush'">
            {{ h.type === 'earn' ? '+' : '' }}{{ faNumber(h.amount) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { LOYALTY } from '~/data/account';
import { money, faNumber, faDate } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'باشگاه مشتریان | ماهلین اسکین‌کر' });

const progressPercent = computed(() =>
  Math.min(100, Math.round((LOYALTY.points / LOYALTY.nextTierPoints) * 100))
);
const pointsToNextTier = computed(() => Math.max(0, LOYALTY.nextTierPoints - LOYALTY.points));

const copied = ref(false);
function copyCode() {
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(LOYALTY.referralCode);
  }
  copied.value = true;
  setTimeout(() => (copied.value = false), 1800);
}
</script>
