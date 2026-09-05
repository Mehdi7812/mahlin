<template>
  <div class="flex flex-col gap-6">

    <!-- خوش‌آمدگویی -->
    <div class="relative overflow-hidden rounded-[28px] bg-[#3f3733] text-cream p-6 md:p-8 shadow-[0_35px_60px_-30px_rgba(63,58,53,0.55)]">

      <!-- بافت نقطه‌ای ظریف -->
      <div
        class="absolute inset-0 opacity-[0.05] pointer-events-none"
        style="background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 16px 16px;"
      />

      <!-- درخشش‌های تزئینی -->
      <div class="absolute -top-16 -end-16 w-64 h-64 rounded-full bg-[#e8b4bc]/[0.16] blur-[80px] pointer-events-none" />
      <div class="absolute -bottom-20 -start-14 w-64 h-64 rounded-full bg-gold/[0.14] blur-[80px] pointer-events-none" />

      <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div class="flex items-center gap-4">
          <!-- آواتار حلقه‌دار -->
          <div class="relative w-16 h-16 sm:w-[72px] sm:h-[72px] shrink-0">
            <div class="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#e8b4bc] via-gold/80 to-[#e8b4bc] opacity-80" />
            <div class="relative w-full h-full rounded-full bg-[#3f3733] grid place-items-center">
              <span class="font-display text-2xl text-gold">{{ userInitial }}</span>
            </div>
            <span class="absolute -bottom-0.5 -end-0.5 w-6 h-6 rounded-full bg-[#3f3733] grid place-items-center ring-2 ring-[#3f3733]">
              <span class="w-full h-full rounded-full bg-gradient-to-br from-[#e8b4bc] to-gold grid place-items-center">
                <Icon name="tabler:crown-filled" class="text-[11px] text-ink" />
              </span>
            </span>
          </div>

          <div>
            <p class="text-[13px] text-cream/55 mb-1">{{ greeting }}،</p>
            <h2 class="font-display text-2xl md:text-3xl">{{ USER.full_name }} عزیز</h2>
            <div class="flex flex-wrap items-center gap-2 mt-2.5">
              <!-- <span class="inline-flex items-center gap-1.5 text-[11px] font-bold text-gold bg-gradient-to-l from-[#e8b4bc]/15 to-gold/15 border border-gold/20 px-3 py-1 rounded-full">
                <Icon name="tabler:crown" class="text-[13px]" />
                سطح {{ USER.level }}
              </span> -->
              <span class="text-[13px] text-cream/45">عضو ماهلین از {{ faDate(USER.member_since) }}</span>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/shop"
          class="relative inline-flex items-center justify-center gap-2 bg-gradient-to-l from-gold to-[#e8b4bc] text-ink font-bold text-[13px] px-5 py-3.5 rounded-full hover:shadow-[0_10px_24px_-8px_rgba(232,180,188,0.5)] hover:-translate-y-0.5 transition-all duration-300 shrink-0"
        >
          <Icon name="tabler:building-store" class="text-[16px]" />
          مشاهده فروشگاه
        </NuxtLink>
      </div>

      <!-- استریپ آمار کوچک داخل بنر -->
      <div class="relative grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/[0.08]">
        <div class="text-center sm:text-right">
          <p class="font-latin text-lg font-bold text-gold">{{ faNumber(ORDERS.length) }}</p>
          <p class="text-[10.5px] text-cream/45 mt-0.5">کل سفارش‌ها</p>
        </div>
        <div class="text-center sm:text-right border-x border-white/[0.08] px-2">
          <p class="font-latin text-lg font-bold text-[#e8b4bc]">{{ faNumber(LOYALTY.points) }}</p>
          <p class="text-[10.5px] text-cream/45 mt-0.5">امتیاز باشگاه</p>
        </div>
        <div class="text-center sm:text-right">
          <p class="font-latin text-lg font-bold text-sage">{{ money(USER.wallet_balance) }}</p>
          <p class="text-[10.5px] text-cream/45 mt-0.5">موجودی کیف پول</p>
        </div>
      </div>
    </div>

    <!-- آمار کلی -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="s in stats"
        :key="s.label"
        class="rounded-[20px] p-4 sm:p-5 border border-ink/[0.06] bg-cardLight"
      >
        <div class="flex items-start justify-between">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            :style="{ backgroundColor: s.bg, color: s.color }"
          >
            <Icon :name="s.icon" class="text-[18px]" />
          </div>
          <span
            v-if="s.delta"
            class="flex items-center gap-0.5 text-[10.5px] font-bold px-1.5 py-0.5 rounded-full"
            :class="s.deltaType === 'up' ? 'text-sage bg-sageLight' : 'text-blush bg-blushLight'"
          >
            <Icon :name="s.deltaType === 'up' ? 'tabler:trending-up' : 'tabler:trending-down'" class="text-[12px]" />
            {{ s.delta }}
          </span>
        </div>
        <p class="text-lg sm:text-xl font-bold text-ink font-latin">{{ s.value }}</p>
        <p class="text-[11.5px] text-inkSoft mt-0.5">{{ s.label }}</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-5">
      <!-- ستون اصلی: روند خرید + سفارش‌های اخیر -->
      <div class="lg:col-span-2 flex flex-col gap-5">

        <!-- روند خرید -->
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5">
          <div class="flex items-center justify-between mb-5">
            <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
              <Icon name="tabler:chart-bar" class="text-accent" />
              روند خرید اخیر
            </h3>
            <span class="text-[11px] text-inkSoft">۵ سفارش گذشته</span>
          </div>
          <div class="flex items-end justify-between gap-2.5 sm:gap-4 h-[110px]">
            <div
              v-for="bar in spendingBars"
              :key="bar.id"
              class="flex-1 flex flex-col items-center justify-end gap-2 group"
            >
              <span class="text-[10.5px] font-bold text-ink font-latin opacity-0 group-hover:opacity-100 transition-opacity">
                {{ money(bar.total) }}
              </span>
              <div
                class="w-full max-w-[34px] rounded-t-lg transition-all duration-300 group-hover:opacity-80"
                :class="bar.cancelled ? 'bg-ink/10' : 'bg-accent'"
                :style="{ height: bar.height + '%' }"
              />
              <span class="text-[10px] text-inkSoft font-latin" dir="ltr">{{ faDateShort(bar.date) }}</span>
            </div>
          </div>
        </div>

        <!-- سفارش‌های اخیر -->
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-ink/[0.06]">
            <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
              <Icon name="tabler:package" class="text-accent" />
              سفارش‌های اخیر
            </h3>
            <NuxtLink to="/account/orders" class="text-[12.5px] font-bold text-accent hover:text-accentHover">
              مشاهده همه
            </NuxtLink>
          </div>

          <div class="divide-y divide-ink/[0.05]">
            <NuxtLink
              v-for="order in recentOrders"
              :key="order.id"
              :to="`/account/orders/${order.id}`"
              class="flex items-center gap-4 px-5 py-4 hover:bg-ink/[0.02] transition-colors group"
            >
              <div class="w-12 h-12 shrink-0 rounded-xl bg-cream overflow-hidden">
                <img
                  :src="order.items[0].cover_image"
                  class="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                  alt=""
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-[13px] font-bold text-ink font-latin" dir="ltr">{{ order.code }}</p>
                <p class="text-[11.5px] text-inkSoft mt-0.5">{{ faDate(order.date) }} · {{ faNumber(order.items.length) }} کالا</p>
              </div>
              <div class="text-left shrink-0">
                <p class="text-[13px] font-bold text-ink font-latin">{{ money(order.total) }} <span class="text-[10.5px] font-sans text-inkSoft">تومان</span></p>
                <span
                  class="inline-block mt-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full"
                  :class="[ORDER_STATUS_META[order.status].bg, ORDER_STATUS_META[order.status].text]"
                >
                  {{ ORDER_STATUS_META[order.status].label }}
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ستون کناری: باشگاه مشتریان + آدرس پیش‌فرض -->
      <div class="flex flex-col gap-5">

        <!-- باشگاه مشتریان خلاصه -->
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5 flex flex-col gap-4">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
            <Icon name="tabler:sparkles" class="text-gold" />
            باشگاه مشتریان
          </h3>

          <div class="rounded-2xl bg-gradient-to-br from-accent to-accentHover text-cream p-4">
            <p class="text-[11px] text-cream/70">امتیاز فعلی</p>
            <p class="text-2xl font-bold font-latin mt-1">{{ faNumber(LOYALTY.points) }}</p>
            <div class="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div class="h-full bg-gold rounded-full" :style="{ width: progressPercent + '%' }" />
            </div>
            <p class="mt-2 text-[10.5px] text-cream/60">
              {{ faNumber(LOYALTY.nextTierPoints - LOYALTY.points) }} امتیاز تا سطح {{ LOYALTY.nextTier }}
            </p>
          </div>

          <div class="flex items-center justify-between text-[13px] rounded-xl bg-ink/[0.03] px-3.5 py-3">
            <span class="text-inkSoft flex items-center gap-1.5">
              <Icon name="tabler:wallet" class="text-[15px] text-sage" />
              کیف پول
            </span>
            <span class="font-bold text-ink font-latin">{{ money(USER.wallet_balance) }} تومان</span>
          </div>

          <NuxtLink
            to="/account/loyalty"
            class="text-center text-[12.5px] font-bold text-accent hover:text-accentHover"
          >
            مشاهده جزئیات باشگاه مشتریان
          </NuxtLink>
        </div>

        <!-- آدرس پیش‌فرض -->
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
              <Icon name="tabler:map-pin" class="text-sky" />
              آدرس پیش‌فرض
            </h3>
            <NuxtLink to="/account/addresses" class="text-[11.5px] font-bold text-accent hover:text-accentHover">
              مدیریت
            </NuxtLink>
          </div>

          <div v-if="defaultAddress" class="rounded-xl bg-ink/[0.03] p-3.5">
            <p class="text-[13px] font-bold text-ink flex items-center gap-1.5">
              <Icon name="tabler:home" class="text-[14px] text-inkSoft" />
              {{ defaultAddress.title }}
            </p>
            <p class="text-[12px] text-inkSoft mt-1.5 leading-6">
              {{ defaultAddress.province }}، {{ defaultAddress.city }} — {{ defaultAddress.description }}
            </p>
          </div>
          <p v-else class="text-[12.5px] text-inkSoft py-2">هنوز آدرسی ثبت نکرده‌اید.</p>
        </div>
      </div>
    </div>

    <!-- دسترسی سریع -->
    <div class="grid sm:grid-cols-3 gap-4">
      <NuxtLink
        v-for="q in quickLinks"
        :key="q.to"
        :to="q.to"
        class="group flex items-center gap-3 rounded-[18px] border border-ink/[0.06] bg-cardLight p-4 hover:border-accent/30 hover:shadow-[0_10px_24px_-10px_rgba(110,82,58,0.18)] transition-all duration-300"
      >
        <span
          class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
          :style="{ backgroundColor: q.bg, color: q.color }"
        >
          <Icon :name="q.icon" class="text-[19px]" />
        </span>
        <div class="min-w-0">
          <p class="text-[13.5px] font-bold text-ink">{{ q.title }}</p>
          <p class="text-[11px] text-inkSoft mt-0.5 truncate">{{ q.desc }}</p>
        </div>
        <Icon name="tabler:chevron-left" class="mr-auto text-ink/25 shrink-0 rtl:rotate-180 group-hover:text-accent transition-colors" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { USER, ORDERS, ORDER_STATUS_META, LOYALTY, ADDRESSES } from '~/data/account';
import { money, faNumber, faDate, faDateShort } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'داشبورد | ماهلین اسکین‌کر' });

const hour = new Date().getHours();
const greeting = hour < 12 ? 'صبح بخیر' : hour < 18 ? 'ظهر بخیر' : 'عصر بخیر';

const userInitial = computed(() => (USER.full_name || 'م').trim().charAt(0));

const recentOrders = computed(() => ORDERS.slice(0, 3));

const defaultAddress = computed(() => ADDRESSES.find((a) => a.is_default) || ADDRESSES[0] || null);

const progressPercent = computed(() =>
  Math.min(100, Math.round((LOYALTY.points / LOYALTY.nextTierPoints) * 100))
);

// نمودار میله‌ای روند خرید — مبتنی بر ۵ سفارش اخیر، از قدیم به جدید
const spendingBars = computed(() => {
  const last5 = [...ORDERS].slice(0, 5).reverse();
  const max = Math.max(...last5.map((o) => o.total), 1);
  return last5.map((o) => ({
    id: o.id,
    date: o.date,
    total: o.total,
    cancelled: o.status === 'cancelled',
    height: Math.max(10, Math.round((o.total / max) * 100)),
  }));
});

const stats = [
  { label: 'کل سفارش‌ها', value: faNumber(ORDERS.length), icon: 'tabler:package', bg: 'rgba(143,193,217,0.14)', color: '#6BA5C4', delta: '+۲ این ماه', deltaType: 'up' },
  { label: 'در حال پردازش', value: faNumber(ORDERS.filter(o => ['pending','processing','shipped'].includes(o.status)).length), icon: 'tabler:truck-delivery', bg: 'rgba(185,166,222,0.14)', color: '#9C87C4' },
  { label: 'امتیاز باشگاه', value: faNumber(USER.points), icon: 'tabler:sparkles', bg: 'rgba(224,183,88,0.16)', color: '#C29A45', delta: '+۱۹۸', deltaType: 'up' },
  { label: 'موجودی کیف پول', value: faNumber(USER.wallet_balance), icon: 'tabler:wallet', bg: 'rgba(156,191,160,0.16)', color: '#7BA582' },
];

const quickLinks = [
  { to: '/account/favorites', title: 'علاقه‌مندی‌ها', desc: 'محصولات ذخیره‌شده', icon: 'tabler:heart', bg: 'rgba(243,180,176,0.16)', color: '#DE8E89' },
  { to: '/account/addresses', title: 'آدرس‌های من', desc: 'مدیریت آدرس‌های تحویل', icon: 'tabler:map-pin', bg: 'rgba(143,193,217,0.16)', color: '#6BA5C4' },
  { to: '/account/profile', title: 'اطلاعات حساب', desc: 'ویرایش مشخصات فردی', icon: 'tabler:user', bg: 'rgba(162,132,102,0.14)', color: '#A28466' },
];
</script>