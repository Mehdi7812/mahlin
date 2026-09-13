<template>
  <div v-if="loading" class="flex flex-col gap-6 animate-pulse" aria-busy="true">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="space-y-2">
        <div class="h-3 w-24 rounded-full bg-ink/10" />
        <div class="h-7 w-40 rounded-full bg-ink/10" />
        <div class="h-3 w-32 rounded-full bg-ink/[0.08]" />
      </div>
      <div class="h-8 w-24 rounded-full bg-ink/10" />
    </div>

    <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5 md:p-6">
      <div class="flex items-center min-w-[560px] gap-2">
        <div v-for="item in 4" :key="item" class="flex flex-1 flex-col items-center">
          <div class="h-10 w-10 rounded-full bg-ink/10" />
          <div class="mt-3 h-3 w-14 rounded-full bg-ink/10" />
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 rounded-[22px] border border-ink/[0.06] bg-cardLight overflow-hidden">
        <div class="px-5 py-4 border-b border-ink/[0.06]">
          <div class="h-4 w-28 rounded-full bg-ink/10" />
        </div>
        <div class="divide-y divide-ink/[0.05]">
          <div v-for="item in 3" :key="item" class="flex items-center gap-4 px-5 py-4">
            <div class="h-16 w-16 rounded-xl bg-ink/10" />
            <div class="min-w-0 flex-1 space-y-2">
              <div class="h-4 w-3/5 rounded-full bg-ink/10" />
              <div class="h-3 w-24 rounded-full bg-ink/[0.08]" />
            </div>
            <div class="h-4 w-16 rounded-full bg-ink/10" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5">
          <div class="h-4 w-28 rounded-full bg-ink/10" />
          <div class="mt-4 space-y-2.5">
            <div class="h-3 w-full rounded-full bg-ink/[0.08]" />
            <div class="h-3 w-3/4 rounded-full bg-ink/[0.08]" />
            <div class="h-3 w-5/6 rounded-full bg-ink/[0.08]" />
          </div>
        </div>

        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5">
          <div class="h-4 w-28 rounded-full bg-ink/10" />
          <div class="mt-4 space-y-2">
            <div class="h-3 w-32 rounded-full bg-ink/[0.08]" />
            <div class="h-3 w-44 rounded-full bg-ink/[0.08]" />
          </div>
        </div>

        <div class="h-12 w-full rounded-full bg-ink/10" />
      </div>
    </div>
  </div>

  <div v-else-if="order" class="flex flex-col gap-6">

    <!-- هدر -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <NuxtLink to="/account/orders" class="inline-flex items-center gap-1.5 text-[12.5px] text-inkSoft hover:text-accent mb-2">
          <Icon name="tabler:arrow-right" class="text-[14px] rtl:rotate-180" />
          بازگشت به سفارش‌ها
        </NuxtLink>
        <h2 class="font-display text-xl md:text-2xl text-ink flex items-center gap-2 flex-wrap">
          سفارش
          <span class="font-latin text-accent" dir="ltr">{{ order.code }}</span>
        </h2>
        <p class="text-[12.5px] text-inkSoft mt-1">ثبت‌شده در {{ faDate(order.date) }}</p>
      </div>
      <span
        class="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full"
        :class="[meta.bg, meta.text]"
      >
        <span class="w-1.5 h-1.5 rounded-full" :class="meta.dot" />
        {{ meta.label }}
      </span>
    </div>

    <!-- مراحل پیگیری سفارش -->
    <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5 md:p-6 overflow-x-auto">
      <div class="flex items-center min-w-[560px]">
        <template v-for="(step, i) in trackingSteps" :key="step.key">
          <div class="flex flex-col items-center flex-1 text-center">
            <span
              class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              :class="stepState(i) === 'done'
                ? 'bg-sage text-white'
                : stepState(i) === 'current'
                  ? 'bg-accent text-cream ring-4 ring-accent/15'
                  : 'bg-ink/[0.06] text-inkSoft'"
            >
              <Icon :name="stepState(i) === 'done' ? 'tabler:check' : step.icon" class="text-[16px]" />
            </span>
            <p class="mt-2 text-[11.5px] font-bold" :class="stepState(i) === 'upcoming' ? 'text-inkSoft' : 'text-ink'">
              {{ step.label }}
            </p>
          </div>
          <div
            v-if="i < trackingSteps.length - 1"
            class="h-[2px] flex-1 -mt-6"
            :class="stepState(i) === 'done' ? 'bg-sage' : 'bg-ink/[0.08]'"
          />
        </template>
      </div>

      <p v-if="order.status === 'cancelled'" class="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[12.5px] text-red-500">
        <Icon name="tabler:info-circle" class="text-[15px] shrink-0" />
        این سفارش لغو شده است.
      </p>
    </div>

    <div class="grid lg:grid-cols-3 gap-5">
      <!-- اقلام سفارش -->
      <div class="lg:col-span-2 rounded-[22px] border border-ink/[0.06] bg-cardLight overflow-hidden">
        <div class="px-5 py-4 border-b border-ink/[0.06]">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
            <Icon name="tabler:box" class="text-accent" />
            اقلام سفارش
          </h3>
        </div>
        <div class="divide-y divide-ink/[0.05]">
          <div v-for="(item, idx) in order.items" :key="idx" class="flex items-center gap-4 px-5 py-4">
            <div class="w-16 h-16 shrink-0 rounded-xl bg-cream overflow-hidden">
              <img :src="item.cover_image" class="w-full h-full object-contain p-2" alt="" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[13.5px] font-bold text-ink line-clamp-1">{{ item.title_fa }}</p>
              <p class="text-[11.5px] text-inkSoft mt-1">{{ faNumber(item.qty) }} عدد × {{ money(item.price) }} تومان</p>
            </div>
            <p class="text-[13.5px] font-bold text-ink font-latin shrink-0">{{ money(item.qty * item.price) }}</p>
          </div>
        </div>
      </div>

      <!-- خلاصه پرداخت + آدرس -->
      <div class="flex flex-col gap-5">
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-4">
            <Icon name="tabler:receipt-2" class="text-accent" />
            خلاصه پرداخت
          </h3>
          <div class="flex flex-col gap-2.5 text-[13px]">
            <div class="flex justify-between">
              <span class="text-inkSoft">جمع کالاها</span>
              <span class="font-latin">{{ money(order.total) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-inkSoft">هزینه ارسال</span>
              <span class="font-latin text-sage font-bold">رایگان</span>
            </div>
            <div class="flex justify-between pt-2.5 border-t border-ink/[0.06] text-[14px] font-bold text-ink">
              <span>مبلغ نهایی</span>
              <span class="font-latin">{{ money(order.total) }} تومان</span>
            </div>
          </div>
        </div>

        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-3">
            <Icon name="tabler:map-pin" class="text-accent" />
            آدرس تحویل
          </h3>
          <p class="text-[13px] font-bold text-ink">{{ order.receiver.title }}</p>
          <p class="text-[12.5px] text-inkSoft leading-6 mt-1.5">
            {{ order.receiver.province || 'آدرس ثبت نشده' }}
          </p>
          <p class="text-[12px] text-inkSoft mt-1.5">گیرنده: {{ order.receiver.receiver_full_name || '---' }} — {{ toLatinButShown(order.receiver.receiver_mobile || '') }}</p>
        </div>

        <button
          v-if="order.status !== 'cancelled' && order.status !== 'delivered'"
          type="button"
          class="w-full py-3 rounded-full border border-red-200 text-red-500 text-[13px] font-bold hover:bg-red-50 transition-colors"
        >
          درخواست لغو سفارش
        </button>
        <NuxtLink
          v-if="order.status === 'delivered'"
          to="/shop"
          class="w-full text-center py-3 rounded-full bg-accent text-cream text-[13px] font-bold hover:bg-accentHover transition-colors"
        >
          خرید مجدد این اقلام
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- سفارش یافت نشد -->
  <div v-else class="rounded-[22px] border border-dashed border-ink/15 py-16 text-center">
    <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink/5 text-ink/30">
      <Icon name="tabler:file-off" class="text-[28px]" />
    </div>
    <p class="mt-4 text-[14px] font-bold text-ink">سفارش مورد نظر یافت نشد</p>
    <NuxtLink to="/account/orders" class="mt-3 inline-block text-[12.5px] font-bold text-accent">
      بازگشت به لیست سفارش‌ها
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { ORDER_STATUS_META } from '~/data/account';
import { money, faNumber, faDate, fa } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });

const route = useRoute()
const order = ref(null);
const loading = ref(true);

const statusAliases = {
  1: 'pending',
  2: 'processing',
  3: 'processing',
  4: 'processing',
  5: 'processing',
  8: 'processing',
  6: 'delivered',
  7: 'cancelled',
  9: 'returned',
  10: 'returned',
  11: 'returned',
  12: 'returned',
  awaiting_payment: 'pending',
  pending: 'pending',
  processing: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
  returned: 'returned',
};

function normalizeOrder(invoice) {
  const details = invoice.invoice_details || invoice.details || invoice.items || [];
  const normalizedStatus = statusAliases[invoice.status]
    || statusAliases[invoice.status_code]
    || statusAliases[invoice.status_text]
    || 'pending';

  return {
    id: invoice.id || invoice.invoice_id,
    code: invoice.invoice_number || invoice.code || invoice.invoice_code || invoice.number || invoice.tracking_code || `#${invoice.id || invoice.invoice_id}`,
    date: invoice.document_date || invoice.date || invoice.created_at || invoice.createdAt,
    status: normalizedStatus,
    total: Number(invoice.total_price ?? invoice.total ?? invoice.final_price ?? invoice.price ?? 0),
    items: details.map((detail) => ({
      title_fa: detail.products?.title_fa || detail.product?.title_fa || detail.title_fa || detail.products?.title || 'محصول',
      cover_image: detail.products?.cover_image || detail.product?.cover_image || detail.cover_image,
      qty: Number(detail.amount ?? detail.qty ?? 1),
      price: Number(detail.unit_price ?? detail.price ?? detail.products?.final_price ?? 0),
    })),
    receiver: {
      title: invoice.receiver_name || 'آدرس تحویل',
      province: invoice.receiver_address || '',
      city: '',
      description: invoice.receiver_address || '',
      receiver_full_name: invoice.receiver_name || '',
      receiver_mobile: invoice.receiver_contact || '',
    },
    tracking: invoice.tracking_code || '',
  };
}

async function loadOrder() {
  loading.value = true;

  try {
    const response = await useGarnetApiFetch('invoices/show', {
      invoice_id: Number(route.params.id),
    });

    if (response?.error) {
      throw new Error(response.error?.data?.message || response.error?.message || 'خطا در دریافت سفارش');
    }

    const invoice = response?.Invoice || response?.invoice || null;

    if (!invoice) {
      order.value = null;
      return;
    }

    order.value = normalizeOrder(invoice);
  } catch (error) {
    console.error('[Orders detail] Could not load order', error);
    order.value = null;
  } finally {
    loading.value = false;
  }
}

useSeoMeta({ title: () => order.value ? `سفارش ${order.value.code} | ماهلین اسکین‌کر` : 'سفارش یافت نشد' });

const meta = computed(() => ORDER_STATUS_META[order.value?.status] || ORDER_STATUS_META.pending);

const trackingSteps = [
  { key: 'placed', label: 'ثبت سفارش', icon: 'tabler:receipt' },
  { key: 'processing', label: 'آماده‌سازی', icon: 'tabler:package' },
  { key: 'shipped', label: 'ارسال', icon: 'tabler:truck-delivery' },
  { key: 'delivered', label: 'تحویل', icon: 'tabler:home-check' },
];

const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];

onMounted(() => {
  loadOrder();
});

function stepState(index) {
  if (!order.value) return 'upcoming';
  if (order.value.status === 'cancelled') return index === 0 ? 'done' : 'upcoming';
  const currentIndex = Math.max(statusOrder.indexOf(order.value.status), 0);
  if (index < currentIndex) return 'done';
  if (index === currentIndex) return 'current';
  return 'upcoming';
}

// شماره موبایل را با اعداد فارسی نمایش می‌دهد
function toLatinButShown(mobile) {
  return fa(mobile);
}
</script>
