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
      
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-4 py-2 text-[12.5px] font-bold text-ink transition-colors hover:border-accent hover:text-accent"
          @click="printInvoice"
        >
          <Icon name="tabler:printer" class="text-[15px]" />
          {{ invoiceTitle === 'پیش‌فاکتور' ? 'چاپ پیش‌فاکتور' : 'چاپ فاکتور' }}
        </button>
        <NuxtLink to="/account/orders" class="inline-flex items-center gap-1.5 text-[12.5px] text-inkSoft hover:text-accent">
          بازگشت به سفارش‌ها
          <Icon name="tabler:arrow-right" class="text-[14px] rtl:rotate-180" />
        </NuxtLink>
      </div>
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
            <div v-if="order.discount" class="flex justify-between text-sage">
              <span>تخفیف</span>
              <span class="font-latin font-bold">-{{ money(order.discount) }} تومان</span>
            </div>
            <div class="flex justify-between">
              <span class="text-inkSoft">هزینه ارسال</span>
              <span class="font-latin" :class="order.shipping ? 'text-ink' : 'text-sage font-bold'">
                {{ order.shipping ? `${money(order.shipping)} تومان` : 'رایگان' }}
              </span>
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

    <!-- ═════════ فاکتور قابل چاپ (فقط هنگام پرینت دیده می‌شود) ═════════ -->
    <ClientOnly>
      <Teleport to="body">
        <div id="order-print-invoice" dir="rtl">
          <div class="inv-bar" />

          <!-- سربرگ -->
          <header class="inv-head">
            <div class="inv-brand">
              <img src="/logo/logo.png" alt="" class="inv-logo" />
              <div>
                <p class="inv-brand-name">ماهلین اسکین‌کر</p>
                <p class="inv-muted">تلفن: {{ fa('09922655520') }}</p>
                <p class="inv-muted inv-ltr">mahlinn404@gmail.com</p>
              </div>
            </div>
            <div class="inv-title-wrap">
              <h1 class="inv-title">{{ invoiceTitle }}</h1>
              <span class="inv-chip">{{ meta.label }}</span>
            </div>
          </header>

          <!-- مشخصات فاکتور -->
          <section class="inv-meta">
            <div v-if="order.orderId"><span>شماره سفارش</span><b>{{ fa(order.orderId) }}</b></div>
            <div v-if="order.invoiceNumber"><span>شماره فاکتور</span><b>{{ fa(order.invoiceNumber) }}</b></div>
            <div v-if="order.tracking"><span>کد رهگیری</span><b>{{ fa(order.tracking) }}</b></div>
            <div>
              <span>تاریخ ثبت</span>
              <b>{{ printDate(order.date) }}<template v-if="printTime(order.date)"> - {{ printTime(order.date) }}</template></b>
            </div>
            <div v-if="order.paymentType"><span>نوع پرداخت</span><b>{{ order.paymentType }}</b></div>
          </section>

          <!-- طرف‌های فاکتور -->
          <section class="inv-parties">
            <div class="inv-card">
              <h2>مشخصات خریدار</h2>
              <dl>
                <div><dt>نام</dt><dd>{{ order.buyer.name || '—' }}</dd></div>
                <div v-if="order.buyer.nationalCode"><dt>کد ملی</dt><dd>{{ fa(order.buyer.nationalCode) }}</dd></div>
                <div v-if="order.buyer.mobile"><dt>تلفن همراه</dt><dd>{{ fmtMobile(order.buyer.mobile) }}</dd></div>
                <div v-if="order.buyer.email"><dt>ایمیل</dt><dd class="inv-ltr">{{ order.buyer.email }}</dd></div>
                <div v-if="order.buyer.economicNumber"><dt>شماره اقتصادی</dt><dd>{{ fa(order.buyer.economicNumber) }}</dd></div>
                <div v-if="order.buyer.registerNumber"><dt>شماره ثبت</dt><dd>{{ fa(order.buyer.registerNumber) }}</dd></div>
                <div v-if="order.buyer.nationalId"><dt>شناسه ملی</dt><dd>{{ fa(order.buyer.nationalId) }}</dd></div>
              </dl>
            </div>

            <div class="inv-card">
              <h2>گیرنده و نحوه‌ی تحویل</h2>
              <dl>
                <div><dt>گیرنده</dt><dd>{{ order.receiver.receiver_full_name || '—' }}</dd></div>
                <div v-if="order.receiver.receiver_mobile"><dt>تلفن</dt><dd>{{ fmtMobile(order.receiver.receiver_mobile) }}</dd></div>
                <div v-if="order.receiver.postal_code"><dt>کد پستی</dt><dd>{{ fa(order.receiver.postal_code) }}</dd></div>
                <div v-if="order.delivery.type"><dt>روش ارسال</dt><dd>{{ order.delivery.type }}</dd></div>
                <div v-if="order.delivery.date || order.delivery.time">
                  <dt>زمان تحویل</dt>
                  <dd>
                    {{ printDate(order.delivery.date) }}
                    <template v-if="order.delivery.time"> - {{ fa(order.delivery.time) }}</template>
                  </dd>
                </div>
                <div class="inv-full"><dt>آدرس</dt><dd>{{ order.receiver.address || '—' }}</dd></div>
              </dl>
            </div>
          </section>

          <!-- اقلام -->
          <table class="inv-table">
            <thead>
              <tr>
                <th class="w-n">ردیف</th>
                <th class="w-code">کد کالا</th>
                <th>شرح کالا</th>
                <th class="w-q">تعداد</th>
                <th class="w-p">قیمت واحد</th>
                <th v-if="hasLineDiscount" class="w-p">تخفیف</th>
                <th class="w-t">مبلغ کل</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in order.items" :key="idx">
                <td class="c">{{ faNumber(idx + 1) }}</td>
                <td class="c">{{ item.code ? fa(item.code) : '—' }}</td>
                <td>
                  <p class="inv-item-name">{{ item.title_fa }}</p>
                  <p v-if="item.brand || item.category" class="inv-item-sub">
                    {{ [item.brand, item.category].filter(Boolean).join(' · ') }}
                  </p>
                </td>
                <td class="c">{{ faNumber(item.qty) }}</td>
                <td class="n">{{ money(item.price) }}</td>
                <td v-if="hasLineDiscount" class="n">{{ item.lineDiscount ? money(item.lineDiscount) : '—' }}</td>
                <td class="n b">{{ money(item.lineTotal) }}</td>
              </tr>
            </tbody>
          </table>
          <p class="inv-unit-note">مبالغ جدول به {{ order.currency }} است.</p>

          <!-- جمع‌بندی -->
          <section class="inv-summary">
            <div class="inv-notes">
              <div class="inv-words">
                <span>مبلغ نهایی به حروف</span>
                <b>{{ numberToPersianWords(order.total) }} {{ order.currency }}</b>
              </div>
              <div v-if="order.description" class="inv-words">
                <span>توضیحات</span>
                <p>{{ order.description }}</p>
              </div>
            </div>

            <table class="inv-totals">
              <tbody>
                <tr>
                  <th>جمع کالاها</th>
                  <td>{{ money(order.subtotal) }}</td>
                </tr>
                <tr v-if="order.discount">
                  <th>تخفیف<template v-if="order.discountCode"> ({{ order.discountCode }})</template></th>
                  <td>-{{ money(order.discount) }}</td>
                </tr>
                <tr>
                  <th>هزینه ارسال</th>
                  <td>{{ order.shipping ? money(order.shipping) : 'رایگان' }}</td>
                </tr>
                <tr class="inv-grand">
                  <th>مبلغ قابل پرداخت</th>
                  <td>{{ money(order.total) }} <small>{{ order.currency }}</small></td>
                </tr>
              </tbody>
            </table>
          </section>

          <footer class="inv-foot">
            <span>این فاکتور به‌صورت الکترونیکی از سامانه‌ی ماهلین اسکین‌کر صادر شده است.</span>
            <span>تاریخ چاپ: {{ faDate(new Date()) }}</span>
          </footer>
        </div>
      </Teleport>
    </ClientOnly>
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
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { toast } from 'vue-sonner';
import { ORDER_STATUS_META } from '~/data/account';
import { assertGarnetOk, getOrderProgressIndex, resolveOrderStatus } from '~/data/orderStatus';
import { money, faNumber, faDate, fa } from '~/utils/format.ts';
import { withTax, isTaxable } from '~/utils/tax.ts';
import { numberToPersianWords } from '~/utils/numberWords.ts';

const { t } = useI18n();

definePageMeta({ layout: 'account' });

const route = useRoute()
const order = ref(null);
const loading = ref(true);
const reordering = ref(false);

function normalizeOrder(invoice) {
  const details = invoice.invoice_details || invoice.details || invoice.items || [];
  const normalizedStatus = resolveOrderStatus(invoice);

  const taxableOf = (detail) => detail.products?.taxable ?? detail.product?.taxable ?? detail.taxable;

  // قیمت هر ردیف با ۱۰٪ مالیات (اگر taxable باشد)
  const items = details.map((detail) => {
    const base = Number(detail.unit_price ?? detail.price ?? detail.products?.final_price ?? 0);
    return {
      productId: detail.products?.id || detail.product?.id || detail.product_id,
      title_fa: detail.products?.title_fa || detail.product?.title_fa || detail.title_fa || detail.products?.title || 'محصول',
      cover_image: detail.products?.cover_image || detail.product?.cover_image || detail.cover_image || '/assets/founder-portrait.png',
      qty: Number(detail.amount ?? detail.qty ?? 1),
      price: Number(withTax(base, taxableOf(detail))) || 0,
      taxable: isTaxable(taxableOf(detail)),
      // فقط برای فاکتور چاپی
      code: detail.product_id ?? detail.products?.id ?? '',
      brand: detail.products?.brand_fa || '',
      category: detail.products?.category_text_fa || '',
      lineDiscount: Number(detail.discount_price ?? 0),
    };
  });
  // مبلغ کل هر ردیف (با مالیات) را از خود API می‌گیریم تا دقیق باشد
  items.forEach((it, i) => {
    const apiTotal = details[i]?.total_price;
    it.lineTotal = apiTotal != null ? Number(apiTotal) : it.qty * it.price;
  });

  // مالیات دیگر جدا نمایش داده نمی‌شود؛ داخل «جمع کالاها» ادغام است
  const taxTotal = invoice.tax_price != null
    ? Number(invoice.tax_price) || 0
    : details.reduce((sum, detail) => {
        const line = Number(detail.unit_price ?? detail.price ?? detail.products?.final_price ?? 0) * Number(detail.amount ?? detail.qty ?? 1);
        return sum + (isTaxable(taxableOf(detail)) ? Math.round(line * 0.1) : 0);
      }, 0);

  return {
    id: invoice.id || invoice.invoice_id,
    code: invoice.invoice_number || invoice.code || invoice.invoice_code || invoice.number || invoice.tracking_code || `#${invoice.id || invoice.invoice_id}`,
    date: invoice.document_date || invoice.date || invoice.created_at || invoice.createdAt,
    status: normalizedStatus,
    subtotal: invoice.impure_price != null
      ? Number(invoice.impure_price) + taxTotal
      : Number(invoice.total ?? invoice.total_price ?? 0),
    discount: Number(invoice.discount_price ?? 0),
    taxTotal,
    shipping: Number(invoice.send_price ?? 0),
    total: Number(invoice.total_price ?? invoice.total ?? invoice.final_price ?? invoice.price ?? 0),
    paymentType: invoice.type_text ? t(invoice.type_text) : null,
    invoiceNumber: invoice.invoice_number || '',
    orderId: invoice.id || invoice.invoice_id || '',
    currency: invoice.currency_name || 'تومان',
    discountCode: invoice.discount_code || '',
    description: (invoice.description || '').trim(),
    buyer: {
      name: invoice.user_full_name || invoice.receiver_name || '',
      mobile: invoice.user_mobile || '',
      nationalCode: invoice.user_national_code || '',
      email: invoice.user_email || '',
      economicNumber: invoice.economic_number || '',
      registerNumber: invoice.register_number || '',
      nationalId: invoice.national_number || '',
    },
    delivery: {
      type: invoice.send_type || '',
      date: invoice.send_date || '',
      time: invoice.send_time || '',
    },
    items,
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
  if (order.value?.status === 'delivered') return 'سفارش شما ارسال شده است.';
  return `سفارش شما در مرحله «${trackingSteps[progressIndex.value].label}» قرار دارد.`;
});

// ─── چاپ فاکتور ──────────────────────────────────────────
// فقط وقتی کلاس روی body هست، CSS چاپ بقیه صفحه را مخفی می‌کند
const PRINT_CLASS = 'printing-order-invoice';
const invoiceTitle = computed(() => (order.value?.status === 'pending' ? 'پیش‌فاکتور' : 'فاکتور'));

const hasLineDiscount = computed(() => !!order.value?.items.some((i) => i.lineDiscount > 0));

// تاریخ را مستقیم از رشته‌ی API می‌خوانیم تا منطقه‌ی زمانی مرورگر روزش را جابه‌جا نکند
function printDate(value) {
  const m = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? faDate(new Date(`${m[1]}-${m[2]}-${m[3]}T12:00:00`)) : '';
}
function printTime(value) {
  const m = String(value || '').match(/[ T](\d{2}):(\d{2})/);
  return m ? fa(`${m[1]}:${m[2]}`) : '';
}
// ۹۳۳۱۲۰۳۳۳۶ → ۰۹۳۳۱۲۰۳۳۳۶
function fmtMobile(value) {
  const d = String(value || '').replace(/\D/g, '');
  if (!d) return '';
  return fa(d.length === 10 && d.startsWith('9') ? `0${d}` : d);
}

const enterPrintMode = () => document.body.classList.add(PRINT_CLASS);
const leavePrintMode = () => document.body.classList.remove(PRINT_CLASS);

function printInvoice() {
  if (!order.value) return;
  enterPrintMode();
  window.print();
}

onMounted(() => {
  loadOrder();
  // پوشش Ctrl+P و دکمه‌ی چاپ مرورگر
  window.addEventListener('beforeprint', enterPrintMode);
  window.addEventListener('afterprint', leavePrintMode);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeprint', enterPrintMode);
  window.removeEventListener('afterprint', leavePrintMode);
  leavePrintMode();
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

<style>
/* فاکتور چاپی؛ روی صفحه نمایش مخفی است */
#order-print-invoice { display: none; }

@media print {
  @page { size: A4; margin: 10mm; }

  /* فقط وقتی از صفحه‌ی سفارش چاپ می‌گیریم، همه چیز جز فاکتور مخفی می‌شود */
  body.printing-order-invoice > *:not(#order-print-invoice) { display: none !important; }
  body.printing-order-invoice { background: #fff !important; }

  #order-print-invoice {
    /* پالت پروژه: gold / gold-deep / cream / ink */
    --inv-gold: #A28466;
    --inv-gold-deep: #6E523A;
    --inv-cream: #F2EBE3;
    --inv-cream-soft: #F8F3EC;
    --inv-ink: #3F3A35;
    --inv-soft: #8A7F73;
    --inv-line: rgba(162, 132, 102, 0.32);

    display: block;
    direction: rtl;
    color: var(--inv-ink);
    background: #fff;
    font-family: 'Vazirmatn', system-ui, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.8;
    font-variant-numeric: tabular-nums;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  #order-print-invoice * { font-family: inherit; }
  #order-print-invoice p,
  #order-print-invoice h1,
  #order-print-invoice h2,
  #order-print-invoice dl,
  #order-print-invoice dd { margin: 0; }
  #order-print-invoice .inv-ltr { direction: ltr; text-align: right; }
  #order-print-invoice .inv-muted { color: var(--inv-soft); font-size: 11px; }

  /* نوار رنگی بالا */
  #order-print-invoice .inv-bar {
    height: 6px; border-radius: 99px; margin-bottom: 16px;
    background: linear-gradient(90deg, var(--inv-gold-deep), var(--inv-gold), #C7A98A);
  }

  /* سربرگ */
  #order-print-invoice .inv-head {
    display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 16px;
  }
  #order-print-invoice .inv-brand { display: flex; align-items: center; gap: 12px; }
  #order-print-invoice .inv-logo { width: 58px; height: 58px; object-fit: cover; border-radius: 14px; border: 1px solid var(--inv-line); }
  #order-print-invoice .inv-brand-name { font-size: 18px; font-weight: 800; line-height: 1.4; color: var(--inv-gold-deep); }
  #order-print-invoice .inv-title-wrap { text-align: left; }
  #order-print-invoice .inv-title { font-size: 28px; font-weight: 900; line-height: 1.3; color: var(--inv-gold-deep); }
  #order-print-invoice .inv-chip {
    display: inline-block; margin-top: 2px; padding: 1px 14px; border-radius: 99px;
    background: var(--inv-cream); border: 1px solid var(--inv-line); color: var(--inv-gold-deep); font-weight: 700; font-size: 11px;
  }

  /* مشخصات فاکتور */
  #order-print-invoice .inv-meta {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    border: 1px solid var(--inv-line); border-radius: 12px; background: var(--inv-cream); margin-bottom: 12px; overflow: hidden;
  }
  #order-print-invoice .inv-meta > div { padding: 8px 12px; border-inline-start: 1px solid var(--inv-line); }
  #order-print-invoice .inv-meta > div:first-child { border-inline-start: 0; }
  #order-print-invoice .inv-meta span { display: block; color: var(--inv-soft); font-size: 10.5px; }
  #order-print-invoice .inv-meta b { display: block; font-size: 12px; font-weight: 800; color: var(--inv-ink); }

  /* خریدار / گیرنده */
  #order-print-invoice .inv-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  #order-print-invoice .inv-card { border: 1px solid var(--inv-line); border-radius: 12px; padding: 10px 14px; break-inside: avoid; }
  #order-print-invoice .inv-card h2 {
    font-size: 12px; font-weight: 800; color: var(--inv-gold-deep);
    padding-bottom: 6px; margin-bottom: 6px; border-bottom: 1px dashed var(--inv-line);
  }
  #order-print-invoice .inv-card dl { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 12px; }
  #order-print-invoice .inv-card dl > div { display: flex; gap: 6px; }
  #order-print-invoice .inv-card dt { color: var(--inv-soft); white-space: nowrap; }
  #order-print-invoice .inv-card dt::after { content: ':'; }
  #order-print-invoice .inv-card dd { font-weight: 600; }
  #order-print-invoice .inv-card .inv-full { grid-column: 1 / -1; }

  /* جدول اقلام */
  #order-print-invoice .inv-table {
    width: 100%; border-collapse: separate; border-spacing: 0;
    border: 1px solid var(--inv-line); border-radius: 12px; overflow: hidden;
  }
  #order-print-invoice .inv-table thead { display: table-header-group; }
  #order-print-invoice .inv-table th {
    background: var(--inv-gold-deep); color: var(--inv-cream); font-weight: 700; font-size: 11px; padding: 7px 8px; text-align: center;
  }
  #order-print-invoice .inv-table th:nth-child(3) { text-align: right; }
  #order-print-invoice .inv-table td { padding: 8px 8px; border-top: 1px solid var(--inv-line); vertical-align: middle; }
  #order-print-invoice .inv-table tbody tr:first-child td { border-top: 0; }
  #order-print-invoice .inv-table tbody tr:nth-child(even) td { background: var(--inv-cream-soft); }
  #order-print-invoice .inv-table tr { break-inside: avoid; }
  #order-print-invoice .w-n { width: 38px; }
  #order-print-invoice .w-code { width: 60px; }
  #order-print-invoice .w-q { width: 50px; }
  #order-print-invoice .w-p { width: 96px; }
  #order-print-invoice .w-t { width: 108px; }
  #order-print-invoice .inv-table .c { text-align: center; }
  #order-print-invoice .inv-table .n { text-align: left; white-space: nowrap; }
  #order-print-invoice .inv-table .b { font-weight: 800; color: var(--inv-gold-deep); }
  #order-print-invoice .inv-item-name { font-weight: 700; }
  #order-print-invoice .inv-item-sub { color: var(--inv-soft); font-size: 10.5px; }
  #order-print-invoice .inv-unit-note { margin-top: 5px; color: var(--inv-soft); font-size: 10.5px; }

  /* جمع‌بندی */
  #order-print-invoice .inv-summary {
    display: grid; grid-template-columns: 1fr 260px; gap: 14px; align-items: start; margin-top: 12px; break-inside: avoid;
  }
  #order-print-invoice .inv-notes { display: flex; flex-direction: column; gap: 8px; }
  #order-print-invoice .inv-words { border: 1px solid var(--inv-line); border-radius: 12px; padding: 9px 14px; }
  #order-print-invoice .inv-words span { display: block; color: var(--inv-soft); font-size: 10.5px; }
  #order-print-invoice .inv-words b { font-weight: 800; color: var(--inv-gold-deep); }
  #order-print-invoice .inv-totals {
    width: 100%; border-collapse: separate; border-spacing: 0;
    border: 1px solid var(--inv-line); border-radius: 12px; overflow: hidden;
  }
  #order-print-invoice .inv-totals th,
  #order-print-invoice .inv-totals td { padding: 7px 14px; border-top: 1px solid var(--inv-line); }
  #order-print-invoice .inv-totals tr:first-child th,
  #order-print-invoice .inv-totals tr:first-child td { border-top: 0; }
  #order-print-invoice .inv-totals th { text-align: right; font-weight: 500; color: var(--inv-soft); }
  #order-print-invoice .inv-totals td { text-align: left; font-weight: 700; white-space: nowrap; }
  #order-print-invoice .inv-totals .inv-grand th,
  #order-print-invoice .inv-totals .inv-grand td { background: var(--inv-gold-deep); color: var(--inv-cream); font-size: 14px; font-weight: 800; }
  #order-print-invoice .inv-totals .inv-grand small { font-size: 10.5px; font-weight: 500; opacity: .85; }

  #order-print-invoice .inv-foot {
    margin-top: 18px; padding-top: 8px; border-top: 1px solid var(--inv-line);
    display: flex; justify-content: space-between; gap: 12px; color: var(--inv-soft); font-size: 10.5px;
  }
}
</style>
