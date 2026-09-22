<template>
  <div class="max-w-[720px] mx-auto px-4 md:px-6 py-10 md:py-16">

    <!-- ─── حالت لودینگ ─── -->
    <div v-if="loading" class="flex flex-col items-center justify-center text-center py-20">
      <div class="relative w-20 h-20 mb-6">
        <span class="absolute inset-0 rounded-full border-4 border-gold/15"></span>
        <span class="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin"></span>
        <Icon name="tabler:refresh" class="absolute inset-0 m-auto text-2xl text-gold" />
      </div>
      <h3 class="text-lg font-bold text-ink mb-1.5">در حال بررسی پرداخت شما</h3>
      <p class="text-sm text-ink/45">لطفاً چند لحظه صبر کنید، این کار فقط چند ثانیه طول می‌کشد...</p>
    </div>

    <!-- ─── نتیجه نهایی ─── -->
    <div v-else class="relative">

      <!-- بلاب‌های تزئینی پس‌زمینه -->
      <div
        class="absolute -top-10 -start-10 w-52 h-52 rounded-full blur-[90px] pointer-events-none"
        :class="PaymentStatus ? 'bg-sage/25' : 'bg-blush/25'"
      ></div>
      <div
        class="absolute -bottom-10 -end-10 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
        :class="PaymentStatus ? 'bg-gold/15' : 'bg-blush/15'"
      ></div>

      <div class="relative bg-card border border-ink/[0.05] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] px-6 sm:px-10 py-12 sm:py-14 text-center">

        <!-- آیکون وضعیت -->
        <div class="relative inline-flex items-center justify-center mb-6">
          <span
            class="absolute inset-0 rounded-full animate-ping-slow"
            :class="PaymentStatus ? 'bg-sage/25' : 'bg-blush/25'"
          ></span>
          <span
            class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full grid place-items-center"
            :class="PaymentStatus ? 'bg-sage/15 text-sage' : 'bg-blush/15 text-blush'"
          >
            <svg
              v-if="PaymentStatus"
              class="w-10 h-10 sm:w-12 sm:h-12 animate-draw-check"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            >
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg
              v-else
              class="w-10 h-10 sm:w-12 sm:h-12"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            >
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>

        <!-- عنوان و توضیح -->
        <h2 class="text-xl sm:text-2xl font-display font-bold text-ink mb-2">
          {{ PaymentStatus ? 'پرداخت با موفقیت انجام شد' : 'پرداخت ناموفق بود' }}
        </h2>
        <p class="text-sm text-ink/50 max-w-[42ch] mx-auto leading-relaxed">
          {{ PaymentStatus
            ? 'از خرید شما سپاسگزاریم؛ جزئیات سفارش برای شما ارسال خواهد شد.'
            : (PaymentText || 'متأسفانه در فرآیند پرداخت مشکلی پیش آمد. می‌توانید دوباره تلاش کنید.') }}
        </p>

        <!-- جزئیات فاکتور (در صورت موفقیت) -->
        <div
          v-if="PaymentStatus && Invoice && Invoice.id"
          class="mt-8 bg-cream/60 border border-ink/[0.05] rounded-2xl p-5 text-right"
        >
          <div class="flex items-center justify-between py-2 border-b border-dashed border-ink/[0.08]">
            <span class="text-xs text-ink/45">شماره سفارش</span>
            <span class="text-sm font-bold text-ink font-latin">#{{ fa(Invoice.id) }}</span>
          </div>
          <div v-if="Invoice.amount" class="flex items-center justify-between py-2 border-b border-dashed border-ink/[0.08]">
            <span class="text-xs text-ink/45">مبلغ پرداخت‌شده</span>
            <span class="text-sm font-bold text-gold font-latin">{{ money(Invoice.amount) }} <span class="text-[11px] text-ink/40 font-sans">تومان</span></span>
          </div>
          <div v-if="Invoice.tracking_code || Invoice.RefID" class="flex items-center justify-between py-2">
            <span class="text-xs text-ink/45">کد پیگیری</span>
            <span class="text-sm font-bold text-ink font-latin">{{ Invoice.tracking_code || Invoice.RefID }}</span>
          </div>
        </div>

        <!-- دکمه‌ها -->
        <div class="flex flex-wrap items-center justify-center gap-3 mt-9">
          <NuxtLink
            v-if="successBtnText"
            :to="successBtnLink + (successBtnParameter && Invoice?.id ? '?invoiceID=' + Invoice.id : '')"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
            :style="{ backgroundColor: PaymentStatus ? '#9CBFA0' : '#A28466' }"
          >
            {{ successBtnText }}
            <svg class="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>

          <a
            v-if="showCard && Invoice?.description"
            :href="`https://${Invoice.description}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border border-gold/40 text-gold hover:bg-gold/5 transition-all duration-300"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="6" width="18" height="13" rx="2"/>
              <path d="M3 10h18" stroke-linecap="round"/>
            </svg>
            نمایش کارت
          </a>

          <!-- بازگشت به فروشگاه / سبد خرید -->
          <NuxtLink
            :to="PaymentStatus ? '/shop' : '/cart'"
            class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-ink/55 hover:text-ink transition-colors duration-300"
          >
            {{ PaymentStatus ? 'ادامه خرید' : 'بازگشت به سبد خرید' }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- فرم مخفی بانکی (در صورت نیاز به ریدایرکت) -->
    <form ref="bankFrom" method="post" action="" style="display: none"></form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { fa, money } from '~/utils/format';
import { toast } from 'vue-sonner';

const props = defineProps({
  additional: {
    type: String,
    required: false,
    default: '',
  },
});

const route      = useRoute();
const router     = useRouter();
const customizer = useCustomizerStore();

// ─── state ────────────────────────────────────────────────
const PaymentStatusShow    = ref(false);
const PaymentStatus        = ref(false);
const PaymentText          = ref('');
const Invoice              = ref({});
const ReceiptData          = ref(route.query);
const connectTry           = ref(0);
const language             = ref(customizer.language);
const loading              = ref(true);
const showCard             = ref(false);
const successBtnText       = ref('');
const successBtnLink       = ref('');
const successBtnParameter  = ref(false);
const bankFrom             = ref(null);

watch(
  () => customizer.language,
  () => { language.value = customizer.language; }
);

// ─── دریافت وضعیت پرداخت از سرور ────────────────────────────
function getPaymentStatus() {
  loading.value = true;

  useGarnetApiFetch('wallets/paymentVerify', ReceiptData.value)
    .then((response) => {
      PaymentStatus.value     = response.success;
      PaymentText.value       = response.msg;
      PaymentStatusShow.value = true;
      Invoice.value           = response.Invoice || {};

      if (PaymentText.value === 'back_to_invoice') {
        router.push('/cart?from=wallet');
        return;
      }

      // پیش‌فرض دکمه موفقیت: مشاهده سفارش
      if (PaymentStatus.value) {
        successBtnText.value      = 'مشاهده سفارش';
        successBtnLink.value      = '/profile/orders';
        successBtnParameter.value = true;
      }

      if (response.Invoice && PaymentStatus.value && Invoice.value.type === 3) {
        createCard();
      } else {
        loading.value = false;
      }
    })
    .catch((error) => {
      if (connectTry.value < 3) {
        connectTry.value++;
        getPaymentStatus();
      } else {
        loading.value = false;
        toast.error('خطا در دریافت وضعیت پرداخت');
        console.error('[Receipt] خطا در استعلام پرداخت:', error);
      }
    });
}

// ─── ساخت کارت (در صورت نیاز به محصول از نوع کارت) ──────────
function createCard() {
  const sendUrl = 'options/structureCreate';
  const sendData = {
    kind:         4,
    component_id: 82,
    title:        Invoice.value.description,
  };

  useGarnetApiFetch(sendUrl, sendData)
    .then((response) => {
      loading.value = false;

      if (response.error === 'title_exist') {
        const structure = response.Structure;
        toast.error('کارت قبلاً ساخته شده است');
        showCard.value = true;
        statusChange(structure.id, Invoice.value.id);
      } else {
        const structure = response.Structure;
        statusChange(structure.id, Invoice.value.id);
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.error('خطا در ساخت کارت');
      console.error('[Receipt] خطا در createCard:', error);
    });
}

function statusChange(CardID, InvoiceID) {
  const sendUrl = 'options/structureStatusChange';
  const sendData = {
    structure_id: CardID,
    invoice_id:   InvoiceID,
  };

  useGarnetApiFetch(sendUrl, sendData)
    .then((response) => {
      if (response.code === 2000) {
        showCard.value = true;
      }
    })
    .catch(() => {
      if (connectTry.value < 5) {
        connectTry.value++;
        statusChange(CardID, InvoiceID);
      }
    });
}

// ─── شروع ─────────────────────────────────────────────────
onMounted(() => {
  // اگر query شامل status ساده باشه (بدون نیاز به وریفای سرور)
  if (route.query.Status) {
    PaymentStatus.value     = route.query.Status === 'OK';
    PaymentText.value       = route.query.Status === 'OK' ? 'با تشکر از خرید شما.' : 'خرید شما ناموفق بود.';
    PaymentStatusShow.value = true;
    loading.value           = false;
  } else {
    getPaymentStatus();
  }
});
</script>

<style scoped>
@keyframes pingSlow {
  0%   { transform: scale(1);   opacity: 0.7; }
  75%, 100% { transform: scale(1.6); opacity: 0; }
}
.animate-ping-slow {
  animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes drawCheck {
  from { stroke-dasharray: 24; stroke-dashoffset: 24; }
  to   { stroke-dasharray: 24; stroke-dashoffset: 0; }
}
.animate-draw-check {
  animation: drawCheck 0.5s ease-out 0.15s both;
}
</style>