<template>
  <!-- سایدبار دسکتاپ -->
  <aside class="hidden lg:block w-[280px] shrink-0">
    <div class="sticky top-[100px] rounded-[32px] bg-[#3f3733] text-cream overflow-hidden shadow-[0_35px_60px_-30px_rgba(63,58,53,0.55)] ring-1 ring-white/[0.06]">

      <!-- بافت نقطه‌ای ظریف (تکسچر) -->
      <div
        class="absolute inset-0 opacity-[0.05] pointer-events-none"
        style="background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px); background-size: 16px 16px;"
      />

      <!-- درخشش‌های تزئینی پس‌زمینه -->
      <div class="absolute -top-24 -end-16 w-56 h-56 bg-[#e8b4bc]/[0.18] rounded-full blur-[70px] pointer-events-none" />
      <div class="absolute -bottom-24 -start-16 w-56 h-56 bg-gold/[0.12] rounded-full blur-[70px] pointer-events-none" />

      <!-- برند -->
      <div class="relative flex items-center gap-3 px-6 pt-7 pb-5">
        <div class="relative shrink-0">
          <div class="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#e8b4bc] via-gold to-[#e8b4bc] opacity-70" />
          <div class="relative w-14 h-14 rounded-full bg-[#3f3733] grid place-items-center overflow-hidden">
            <img src="/logo/logo.png" alt="ماهلین" class="w-9 h-9 object-contain" />
          </div>
        </div>
        <div class="min-w-0 text-right">
          <p class="font-display text-lg text-gold leading-tight tracking-wide">ماهلین</p>
          <p class="text-[10.5px] text-cream/40 mt-1 tracking-wide">پنل کاربری اسکین‌کر</p>
        </div>
      </div>

      <!-- جداکننده تزئینی -->
      <div class="relative flex items-center gap-2.5 px-6">
        <span class="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span class="w-[5px] h-[5px] rounded-full bg-[#e8b4bc]/70 shrink-0" />
        <span class="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      <!-- کاربر -->
      <div v-if="!customizer.userInfoLoading" class="relative px-6 py-6 text-center">
        <div class="relative w-16 h-16 mx-auto mb-3.5">
          <div class="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#e8b4bc] via-gold/80 to-[#e8b4bc] opacity-80" />
          <div class="relative w-full h-full rounded-full bg-[#3f3733] grid place-items-center overflow-hidden">
            <img v-if="currentUser.photo" :src="currentUser.photo" alt="تصویر پروفایل" class="w-full h-full object-cover" />
            <span v-else class="font-display text-xl text-gold">{{ userInitial }}</span>
          </div>
        </div>

        <p class="font-bold text-[15px]">{{ currentUser.full_name || (currentUser.first_name + ' ' + currentUser.last_name) }}</p>
        <p class="text-[11px] text-cream/40 mt-1 font-latin" dir="ltr">0{{ currentUser.mobile }}</p>
      </div>
      <div v-else class="relative px-6 py-6 text-center animate-pulse" aria-busy="true">
        <div class="mx-auto mb-3.5 h-16 w-16 rounded-full bg-white/10" />
        <div class="mx-auto h-4 w-28 rounded-full bg-white/10" />
        <div class="mx-auto mt-2 h-3 w-20 rounded-full bg-white/10" />
      </div>

      <div class="relative flex items-center gap-2.5 px-6">
        <span class="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        <span class="w-[5px] h-[5px] rounded-full bg-[#e8b4bc]/70 shrink-0" />
        <span class="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      <!-- منو -->
      <nav class="relative px-3.5 py-4">
        <NuxtLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="group relative flex items-center gap-3 px-3 py-2 mb-1 rounded-xl text-[13.5px] font-semibold transition-all duration-300"
          :class="isActive(item.to) ? 'text-cream hover:text-white' : 'text-cream/50 hover:text-cream'"
        >
          <!-- پس‌زمینه فعال -->
          <span
            v-if="isActive(item.to)"
            class="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]"
          />
          <!-- نوار کناری فعال -->
          <span
            v-if="isActive(item.to)"
            class="absolute start-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-[#e8b4bc] to-gold"
          />
          <span class="relative flex-1 text-right truncate">{{ item.label }}</span>
          <span
            class="relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            :class="isActive(item.to) ? 'bg-gradient-to-br from-[#e8b4bc]/25 to-gold/25 text-gold' : 'bg-white/[0.04] text-cream/40 group-hover:bg-white/[0.07]'"
          >
            <Icon :name="item.icon" class="text-[15px]" />
          </span>
        </NuxtLink>

        <div class="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-3 mx-3.5" />

        <!-- لینک تیکت با استایل اکتیو -->
        <NuxtLink
          to="/tickets"
          class="group relative flex items-center gap-3 px-3 py-2 mb-1 rounded-xl text-[13.5px] font-semibold transition-all duration-300"
          :class="isActive('/tickets') ? 'text-cream hover:text-white' : 'text-cream/50 hover:text-cream'"
        >
          <!-- پس‌زمینه فعال -->
          <span
            v-if="isActive('/tickets')"
            class="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]"
          />
          <!-- نوار کناری فعال -->
          <span
            v-if="isActive('/tickets')"
            class="absolute start-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-[#e8b4bc] to-gold"
          />
          <span class="relative flex-1 text-right truncate">تیکت پشتیبانی</span>
          <span
            class="relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            :class="isActive('/tickets') ? 'bg-gradient-to-br from-[#e8b4bc]/25 to-gold/25 text-gold' : 'bg-white/[0.04] text-cream/40 group-hover:bg-white/[0.07]'"
          >
            <Icon name="tabler:headset" class="text-[15px]" />
          </span>
        </NuxtLink>

        <!-- خروج -->
        <button
          type="button"
          class="group w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13.5px] font-semibold text-[#e29a9a] hover:text-[#f0b3b3] transition-colors"
          @click="$emit('logout')"
        >
          <span class="flex-1 text-right">خروج از حساب</span>
          <span class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-[#e29a9a]/10 text-[#e29a9a] group-hover:bg-[#e29a9a]/[0.16] transition-colors">
            <Icon name="tabler:logout-2" class="text-[15px]" />
          </span>
        </button>
      </nav>
    </div>
  </aside>

  <!-- نوار موبایل (اسکرول افقی) -->
  <div class="lg:hidden -mx-4 px-4 mb-5 overflow-x-auto no-scrollbar">
    <div class="flex items-center gap-2 w-max pb-1">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="relative flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap border transition-all duration-300"
        :class="isActive(item.to)
          ? 'bg-ink text-cream border-ink'
          : 'bg-cardLight text-inkSoft border-ink/10 hover:border-ink/20'"
      >
        <span
          class="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          :class="isActive(item.to) ? 'bg-gradient-to-br from-[#e8b4bc] to-gold text-ink' : 'bg-ink/5 text-inkSoft/70'"
        >
          <Icon :name="item.icon" class="text-[12px]" />
        </span>
        {{ item.label }}
        <span
          v-if="item.badge"
          class="text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full grid place-items-center font-latin"
          :class="isActive(item.to) ? 'bg-gold text-ink' : 'bg-ink/10'"
        >
          {{ faNumber(item.badge) }}
        </span>
      </NuxtLink>

      <!-- تیکت در نوار موبایل -->
      <NuxtLink
        to="/tickets"
        class="relative flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap border transition-all duration-300"
        :class="isActive('/tickets')
          ? 'bg-ink text-cream border-ink'
          : 'bg-cardLight text-inkSoft border-ink/10 hover:border-ink/20'"
      >
        <span
          class="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          :class="isActive('/tickets') ? 'bg-gradient-to-br from-[#e8b4bc] to-gold text-ink' : 'bg-ink/5 text-inkSoft/70'"
        >
          <Icon name="tabler:headset" class="text-[12px]" />
        </span>
        تیکت پشتیبانی
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { USER, ORDERS } from '~/data/account';
import { faNumber } from '~/utils/format.ts';

const route = useRoute();
const customizer = useCustomizerStore();
const currentUser = computed(() => customizer.userInfo && !Array.isArray(customizer.userInfo)
  ? customizer.userInfo
  : {});

const pendingOrdersCount = computed(
  () => ORDERS.filter((o) => ['pending', 'processing', 'shipped'].includes(o.status)).length
);

const totalOrders = computed(() => ORDERS.length);

const userInitial = computed(() => (currentUser.value.full_name || 'م').trim().charAt(0));

const items = computed(() => [
  { to: '/account', label: 'داشبورد', icon: 'tabler:layout-dashboard' },
  { to: '/account/orders', label: 'سفارش‌های من', icon: 'tabler:package', badge: pendingOrdersCount.value },
  { to: '/account/favorites', label: 'علاقه‌مندی‌ها', icon: 'tabler:heart' },
  { to: '/account/addresses', label: 'آدرس‌ها', icon: 'tabler:map-pin' },
  { to: '/account/wallet', label: 'کیف پول', icon: 'tabler:wallet' },
  { to: '/account/profile', label: 'اطلاعات حساب', icon: 'tabler:user' },
]);

defineEmits(['logout']);

function isActive(to) {
  if (to === '/account') return route.path === '/account';
  return route.path.startsWith(to);
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>