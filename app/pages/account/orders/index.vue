<template>
  <div class="flex flex-col gap-5">

    <!-- عنوان + فیلتر وضعیت -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 class="font-display text-xl md:text-2xl text-ink">سفارش‌های من</h2>

      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          v-for="f in filters"
          :key="f.value"
          type="button"
          class="shrink-0 px-4 py-2 rounded-full text-[12.5px] font-bold border transition-colors whitespace-nowrap"
          :class="activeFilter === f.value
            ? 'bg-ink text-cream border-ink'
            : 'bg-cardLight text-inkSoft border-ink/10 hover:border-ink/20'"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
          <span v-if="f.value !== 'all'" class="opacity-60">({{ faNumber(countByStatus(f.value)) }})</span>
        </button>
      </div>
    </div>

    <!-- لیست سفارش‌ها -->
    <div v-if="filteredOrders.length" class="flex flex-col gap-4">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="rounded-[20px] border border-ink/[0.06] bg-cardLight overflow-hidden"
      >
        <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-ink/[0.06] bg-ink/[0.015]">
          <div class="flex items-center gap-4 text-[12px] text-inkSoft">
            <span class="flex items-center gap-1.5 font-bold text-ink font-latin" dir="ltr">
              <Icon name="tabler:receipt" class="text-[14px] text-accent" />
              {{ order.code }}
            </span>
            <span class="flex items-center gap-1.5">
              <Icon name="tabler:calendar" class="text-[13px]" />
              {{ faDate(order.date) }}
            </span>
          </div>
          <span
            class="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
            :class="[ORDER_STATUS_META[order.status].bg, ORDER_STATUS_META[order.status].text]"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="ORDER_STATUS_META[order.status].dot" />
            {{ ORDER_STATUS_META[order.status].label }}
          </span>
        </div>

        <div class="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex -space-x-3 rtl:space-x-reverse">
            <div
              v-for="(item, idx) in order.items.slice(0, 4)"
              :key="idx"
              class="w-14 h-14 rounded-xl bg-cream border-2 border-cardLight overflow-hidden shrink-0"
            >
              <img :src="item.cover_image" class="w-full h-full object-contain p-1.5" alt="" />
            </div>
            <div
              v-if="order.items.length > 4"
              class="w-14 h-14 rounded-xl bg-ink/5 border-2 border-cardLight grid place-items-center text-[11px] font-bold text-inkSoft shrink-0"
            >
              +{{ fa(order.items.length - 4) }}
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[13px] text-ink line-clamp-1">
              {{ order.items.map(i => i.title_fa).join('، ') }}
            </p>
            <p class="text-[11.5px] text-inkSoft mt-1">{{ faNumber(order.items.length) }} قلم کالا</p>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0">
            <div class="text-left">
              <p class="text-[10.5px] text-inkSoft">مبلغ کل</p>
              <p class="text-[14px] font-bold text-ink font-latin">{{ money(order.total) }} <span class="text-[10.5px] font-sans text-inkSoft">تومان</span></p>
            </div>
            <NuxtLink
              :to="`/account/orders/${order.id}`"
              class="flex items-center gap-1.5 text-[12.5px] font-bold text-cream bg-accent px-4 py-2.5 rounded-full hover:bg-accentHover transition-colors whitespace-nowrap"
            >
              جزئیات سفارش
              <Icon name="tabler:chevron-left" class="text-[13px] rtl:rotate-180" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- حالت خالی -->
    <div v-else class="rounded-[22px] border border-dashed border-ink/15 py-16 text-center">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink/5 text-ink/30">
        <Icon name="tabler:package-off" class="text-[28px]" />
      </div>
      <p class="mt-4 text-[14px] font-bold text-ink">سفارشی با این وضعیت یافت نشد</p>
      <p class="mt-1 text-[12.5px] text-inkSoft">فیلتر دیگری را امتحان کنید یا به فروشگاه سر بزنید.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ORDERS, ORDER_STATUS_META } from '~/data/account';
import { money, faNumber, faDate, fa } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'سفارش‌های من | ماهلین اسکین‌کر' });

const filters = [
  { value: 'all', label: 'همه' },
  { value: 'processing', label: 'در حال پردازش' },
  { value: 'shipped', label: 'ارسال شده' },
  { value: 'delivered', label: 'تحویل شده' },
  { value: 'cancelled', label: 'لغو شده' },
];

const activeFilter = ref('all');

function countByStatus(status) {
  return ORDERS.filter((o) => o.status === status).length;
}

const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') return ORDERS;
  return ORDERS.filter((o) => o.status === activeFilter.value);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
