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
        <h2 class="font-display text-xl md:text-2xl text-ink flex items-center gap-2 flex-wrap">
          سفارش
          <span class="font-latin text-accent" dir="ltr">{{ order.code }}</span>
        </h2>
        <p class="text-[12.5px] text-inkSoft mt-1">ثبت‌شده در {{ faDate(order.date) }}</p>
      </div>
      
      <NuxtLink to="/account/orders" class="inline-flex items-center gap-1.5 text-[12.5px] text-inkSoft hover:text-accent mb-2">
        بازگشت به سفارش‌ها
        <Icon name="tabler:arrow-right" class="text-[14px] rtl:rotate-180" />
      </NuxtLink>
    </div>
    

    <!-- مراحل پیگیری سفارش -->
    <div
      v-if="order.status !== 'cancelled' && order.status !== 'returned'"
      class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5 md:p-6 overflow-x-auto"
    >
      <div class="mb-5 flex items-center justify-between gap-4">
        <div>
          <div class="flex gap-3">
            <h3 class="flex items-center gap-2 text-[14px] font-bold text-ink">
              <Icon name="tabler:route" class="text-accent" />
              مراحل سفارش
            </h3>

            <span
              class="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full w-fit"
              :class="[meta.bg, meta.text]"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="meta.dot" />
              {{ meta.label }}
            </span>
          </div>

          <p class="mt-1 text-[11.5px] text-inkSoft">{{ currentStepLabel }}</p>
        </div>

        <span class="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent">
          مرحله {{ faNumber(progressIndex + 1) }} از {{ faNumber(trackingSteps.length) }}
        </span>
      </div>

      <div class="flex min-w-[560px] gap-4 items-start">
        <template v-for="(step, i) in trackingSteps" :key="step.key">
          <div
            class="flex flex-col items-center text-center"
            :aria-current="stepState(i) === 'current' ? 'step' : undefined"
          >
            <span
              class="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-cardLight transition-all duration-300"
              :class="stepState(i) === 'done'
                ? 'bg-sage text-white shadow-[0_5px_14px_-7px_rgba(92,138,97,0.8)]'
                : stepState(i) === 'current'
                  ? 'bg-accent text-cream ring-4 ring-accent/15 shadow-[0_5px_14px_-7px_rgba(177,125,67,0.9)]'
                  : 'bg-ink/[0.06] text-inkSoft'"
            >
              <Icon :name="stepState(i) === 'done' ? 'tabler:check' : step.icon" class="text-[16px]" />
            </span>
            <span class="mt-2 text-[10px] font-bold text-inkSoft">مرحله {{ faNumber(i + 1) }}</span>
            <p class="mt-1 text-[11.5px] font-bold" :class="stepState(i) === 'upcoming' ? 'text-inkSoft' : 'text-ink'">
              {{ step.label }}
            </p>
          </div>
          <div
            v-if="i < trackingSteps.length - 1"
            class="relative mt-[22px] h-1 flex-1 overflow-hidden rounded-full bg-ink/[0.08]"
          >
            <span
              class="absolute inset-y-0 start-0 rounded-full bg-sage transition-all duration-500"
              :class="stepState(i) === 'done' ? 'w-full' : 'w-0'"
            />
          </div>
        </template>
      </div>
    </div>

    <p
      v-if="order.status === 'cancelled' || order.status === 'returned'"
      class="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[12.5px] text-red-500"
    >
      <Icon name="tabler:info-circle" class="text-[15px] shrink-0" />
      {{ order.status === 'cancelled' ? 'این سفارش لغو شده است.' : 'این سفارش در فرایند مرجوعی قرار دارد.' }}
    </p>

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
            <div class="w-16 h-16 shrink-0 rounded-xl bg-white border border-cream overflow-hidden">
              <img
                :src="item.cover_image || '/assets/founder-portrait.png'"
                class="w-full h-full object-contain p-2"
                alt=""
                @error="(event) => { event.target.src = '/assets/founder-portrait.png'; event.target.onerror = null }"
              />
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
              <span class="font-latin">{{ money(order.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-inkSoft">هزینه ارسال</span>
              <span class="font-latin" :class="order.shipping ? 'text-ink' : 'text-sage font-bold'">
                {{ order.shipping ? `${money(order.shipping)} تومان` : 'رایگان' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-inkSoft">مالیات</span>
              <span class="font-latin">{{ money(order.tax) }} تومان</span>
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
          <p class="text-[13px] font-bold text-ink">
            گیرنده: {{ order.receiver.receiver_full_name || '---' }}
          </p>
          <p class="text-[12.5px] text-inkSoft leading-6 mt-1.5">
            {{ order.receiver.address || 'آدرس ثبت نشده' }}
          </p>
          <p v-if="order.receiver.postal_code" class="text-[12px] text-inkSoft mt-1.5">
            کد پستی: {{ fa(order.receiver.postal_code) }}
          </p>
          <p class="text-[12px] text-inkSoft mt-1.5">
            تماس: {{ toLatinButShown(order.receiver.receiver_mobile || '---') }}
          </p>
        </div>

        <!-- <button
          v-if="order.status !== 'cancelled' && order.status !== 'delivered'"
          type="button"
          class="w-full py-3 rounded-full border border-red-200 text-red-500 text-[13px] font-bold hover:bg-red-50 transition-colors"
        >
          درخواست لغو سفارش
        </button> -->
        <button
          v-if="order.status === 'pending'"
          type="button"
          :disabled="payingNow"
          @click="payNow"
          class="w-full rounded-full bg-accent py-3 text-center text-[13px] font-bold text-cream transition-colors hover:bg-accentHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span class="flex items-center justify-center gap-2">
            <Icon v-if="payingNow" name="tabler:loader-2" class="animate-spin text-[15px]" />
            <Icon v-else name="tabler:credit-card" class="text-[15px]" />
            {{ payingNow ? 'در حال انتقال...' : 'تکمیل پرداخت' }}
          </span>
        </button>

        <button
          v-if="order.status === 'delivered'"
          type="button"
          :disabled="reordering"
          @click="reorderItems"
          class="w-full rounded-full bg-accent py-3 text-center text-[13px] font-bold text-cream transition-colors hover:bg-accentHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ reordering ? 'در حال افزودن به سبد...' : 'خرید مجدد این اقلام' }}
        </button>
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
import { toast } from 'vue-sonner';
import { ORDER_STATUS_META } from '~/data/account';
import { assertGarnetOk, getOrderProgressIndex, resolveOrderStatus } from '~/data/orderStatus';
import { money, faNumber, faDate, fa } from '~/utils/format.ts';

const { t } = useI18n();

definePageMeta({ layout: 'account' });

const route = useRoute()
const order = ref(null);
const loading = ref(true);
const reordering = ref(false);

function normalizeOrder(invoice) {
  const details = invoice.invoice_details || invoice.details || invoice.items || [];
  const normalizedStatus = resolveOrderStatus(invoice);

  return {
    id: invoice.id || invoice.invoice_id,
    code: invoice.invoice_number || invoice.code || invoice.invoice_code || invoice.number || invoice.tracking_code || `#${invoice.id || invoice.invoice_id}`,
    date: invoice.document_date || invoice.date || invoice.created_at || invoice.createdAt,
    status: normalizedStatus,
    subtotal: Number(invoice.impure_price ?? invoice.total ?? invoice.total_price ?? 0),
    shipping: Number(invoice.send_price ?? 0),
    tax: Number(invoice.tax_price ?? 0),
    total: Number(invoice.total_price ?? invoice.total ?? invoice.final_price ?? invoice.price ?? 0),
    items: details.map((detail) => ({
      productId: detail.products?.id || detail.product?.id || detail.product_id,
      title_fa: detail.products?.title_fa || detail.product?.title_fa || detail.title_fa || detail.products?.title || 'محصول',
      cover_image: detail.products?.cover_image || detail.product?.cover_image || detail.cover_image || '/assets/founder-portrait.png',
      qty: Number(detail.amount ?? detail.qty ?? 1),
      price: Number(detail.unit_price ?? detail.price ?? detail.products?.final_price ?? 0),
    })),
    receiver: {
      address: invoice.receiver_address || '',
      receiver_full_name: invoice.receiver_name || invoice.user_full_name || '',
      receiver_mobile: invoice.receiver_contact || invoice.user_mobile || '',
      postal_code: invoice.receiver_postal_code || '',
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

    if (!order.value.receiver.address) {
      const addressResponse = await useGarnetApiFetch('users/userAddress');
      const addresses = Array.isArray(addressResponse?.UserAddress)
        ? addressResponse.UserAddress
        : [];
      const fallbackAddress = addresses.find((address) => address.is_default) || addresses[0];

      if (fallbackAddress) {
        order.value.receiver.address = [
          fallbackAddress.province,
          fallbackAddress.city,
          fallbackAddress.description,
        ].filter(Boolean).join('، ');
        order.value.receiver.receiver_full_name = order.value.receiver.receiver_full_name
          || fallbackAddress.receiver_full_name
          || '';
        order.value.receiver.receiver_mobile = order.value.receiver.receiver_mobile
          || fallbackAddress.receiver_mobile
          || '';
        order.value.receiver.postal_code = order.value.receiver.postal_code
          || fallbackAddress.postal_code
          || '';
      }
    }
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
  { key: 'shipped', label: 'درحال ارسال', icon: 'tabler:truck-delivery' },
  { key: 'delivered', label: 'ارسال شده', icon: 'tabler:home-check' },
];

const progressIndex = computed(() => getOrderProgressIndex(order.value?.status || 'pending'));
const currentStepLabel = computed(() => {
  if (order.value?.status === 'delivered') return 'سفارش شما تحویل شده است.';
  return `سفارش شما در مرحله «${trackingSteps[progressIndex.value].label}» قرار دارد.`;
});

onMounted(() => {
  loadOrder();
});

function stepState(index) {
  if (!order.value) return 'upcoming';
  if (order.value.status === 'cancelled') return index === 0 ? 'done' : 'upcoming';
  if (order.value.status === 'delivered') return 'done';
  const currentIndex = getOrderProgressIndex(order.value.status);
  if (index < currentIndex) return 'done';
  if (index === currentIndex) return 'current';
  return 'upcoming';
}

async function reorderItems() {
  if (!order.value || reordering.value) return;
  reordering.value = true;

  try {
    for (const item of order.value.items) {
      if (!item.productId) continue;

      const response = await useGarnetApiFetch('invoices/create', {
        product_id: item.productId,
        amount: item.qty,
      });

      assertGarnetOk(response, 'افزودن این محصول به سبد ممکن نشد');
    }

    await navigateTo('/cart');
  } catch (error) {
    console.error('[Order detail] reorder failed', error);
    toast.error(t((error?.message) || t(error)) || 'سفارش مجدد انجام نشد');
  } finally {
    reordering.value = false;
  }
}

const payingNow = ref(false);

function payNow() {
  if (!order.value || payingNow.value) return;
  payingNow.value = true;
  navigateTo({ path: '/cart', query: { invoice_id: order.value.id } });
}

// شماره موبایل را با اعداد فارسی نمایش می‌دهد
function toLatinButShown(mobile) {
  return fa(mobile);
}
</script>
