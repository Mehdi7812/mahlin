<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="font-display text-xl md:text-2xl text-ink">کیف پول</h2>
      <div class="rounded-full bg-sageLight px-3 py-1.5 text-[11px] font-bold text-sage">
        {{ wallets.length ? 'تومان' : 'بدون ارز' }}
      </div>
    </div>

    <div v-if="loading" class="grid gap-4 md:grid-cols-2" aria-busy="true">
      <div v-for="item in 2" :key="item" class="animate-pulse rounded-[22px] border border-ink/[0.06] bg-cardLight p-5">
        <div class="mb-4 h-4 w-24 rounded-full bg-ink/10" />
        <div class="h-8 w-28 rounded-full bg-ink/10" />
        <div class="mt-3 h-3 w-32 rounded-full bg-ink/10" />
      </div>
    </div>

    <div v-else-if="selectedWallet" class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-5 sm:p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-sageLight text-sage">
            <Icon name="tabler:wallet" class="text-[18px]" />
          </span>
          <div>
            <p class="text-[11px] text-inkSoft">کیف پول انتخابی</p>
            <p class="text-[14px] font-bold text-ink">{{ selectedWallet.currency_name }}</p>
          </div>
        </div>

        <div class="text-left">
          <p class="text-[11px] text-inkSoft">موجودی کنونی</p>
          <p class="font-latin text-[28px] font-bold text-ink">{{ money(selectedWallet.balance) }}</p>
        </div>
      </div>

      <!-- دکمه‌های واریز / برداشت -->
      <div class="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          class="flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-[13px] font-bold text-cream transition-opacity hover:opacity-90"
          @click="openDepositDialog"
        >
          <Icon name="tabler:arrow-down" class="text-[16px]" />
          واریز
        </button>
        <button
          type="button"
          class="flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-[13px] font-bold text-cream transition-opacity hover:opacity-90"
          @click="openWithdrawDialog"
        >
          <Icon name="tabler:arrow-up" class="text-[16px]" />
          برداشت
        </button>
      </div>
    </div>

    <div v-else class="rounded-[22px] border border-dashed border-ink/15 bg-cardLight py-14 text-center">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink/5 text-ink/30">
        <Icon name="tabler:wallet-off" class="text-[28px]" />
      </div>
      <p class="mt-4 text-[14px] font-bold text-ink">کیف پولی برای شما ثبت نشده است.</p>
    </div>

    <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight overflow-hidden">
      <div class="flex items-center justify-between border-b border-ink/[0.06] px-5 py-4">
        <h3 class="flex items-center gap-2 font-bold text-ink text-[14px]">
          <Icon name="tabler:history" class="text-accent" />
          تاریخچه تراکنش‌ها
        </h3>
        <span v-if="selectedWallet" class="text-[11px] text-inkSoft">{{ selectedWallet.currency_name }}</span>
      </div>

      <div v-if="historyLoading" class="divide-y divide-ink/[0.05]" aria-busy="true">
        <div v-for="item in 4" :key="item" class="flex items-center gap-4 px-5 py-4 animate-pulse">
          <div class="h-10 w-10 rounded-xl bg-ink/10" />
          <div class="flex-1 space-y-2">
            <div class="h-3 w-32 rounded-full bg-ink/10" />
            <div class="h-3 w-20 rounded-full bg-ink/10" />
          </div>
          <div class="h-5 w-20 rounded-full bg-ink/10" />
        </div>
      </div>

      <div v-else-if="transactions.length" class="divide-y divide-ink/[0.05]">
        <div
          v-for="transaction in transactions"
          :key="transaction.wallet_transactions_id || transaction.id"
          class="flex items-center gap-4 px-5 py-4"
        >
          <span
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            :class="isIncoming(transaction) ? 'bg-sageLight text-sage' : 'bg-blushLight text-blush'"
          >
            <Icon :name="isIncoming(transaction) ? 'tabler:plus' : 'tabler:minus'" class="text-[16px]" />
          </span>

          <div class="min-w-0 flex-1">
            <p class="text-[13px] font-bold text-ink line-clamp-1">
              {{ transaction.kind_text || transaction.payment_procedure_title || 'تراکنش' }}
            </p>
            <p class="mt-0.5 text-[11px] text-inkSoft">
              {{ faDate(transaction.document_date || transaction.created_at) }}
            </p>
          </div>

          <div class="shrink-0 text-left">
            <p
              class="font-latin text-[13px] font-bold"
              :class="isIncoming(transaction) ? 'text-sage' : 'text-blush'"
            >
              {{ isIncoming(transaction) ? '+' : '-' }}{{ money(Math.abs(Number(transaction.amount ?? 0))) }}
            </p>
            <p class="mt-0.5 text-[10.5px] text-inkSoft">
              {{ transaction.status_text || 'نامشخص' }}
            </p>
          </div>
        </div>
      </div>

      <div v-else class="px-5 py-10 text-center">
        <p class="text-[14px] font-bold text-ink">هنوز تراکنشی ثبت نشده است.</p>
        <p class="mt-1 text-[12.5px] text-inkSoft">تراکنش‌های این کیف پول در اینجا نمایش داده می‌شود.</p>
      </div>
    </div>

    <!-- دیالوگ واریز -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="depositDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="closeDepositDialog" />
          <div class="relative w-full max-w-[420px] rounded-[22px] border border-ink/[0.06] bg-cardLight p-6 shadow-2xl">
            <div class="mb-5 flex items-center justify-between">
              <h3 class="flex items-center gap-2 font-bold text-ink text-[15px]">
                <Icon name="tabler:arrow-down" class="text-sage" />
                واریز به کیف پول
              </h3>
              <button type="button" class="text-inkSoft transition-colors hover:text-ink" @click="closeDepositDialog">
                <Icon name="tabler:x" class="text-[18px]" />
              </button>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">مبلغ واریزی (تومان)</label>
              <input
                :value="depositAmount"
                type="text"
                inputmode="numeric"
                dir="ltr"
                placeholder="0"
                class="w-full p-3.5 rounded-xl border border-ink/15 bg-cream text-[14px] font-latin text-ink outline-none focus:border-accent transition-colors"
                @input="onDepositAmountInput"
                @keyup.enter="increaseBalance"
              />
            </div>

            <div class="mt-6 flex justify-end gap-2">
              <button type="button" class="px-5 py-2.5 rounded-full border border-ink/10 text-[13px] font-bold text-inkSoft hover:bg-ink/5 transition-colors" @click="closeDepositDialog">
                انصراف
              </button>
              <button
                type="button"
                :disabled="depositLoading"
                class="px-6 py-2.5 rounded-full bg-accent text-cream text-[13px] font-bold hover:bg-accentHover transition-colors disabled:opacity-60"
                @click="increaseBalance"
              >
                <Icon v-if="depositLoading" name="tabler:loader-2" class="ml-1 inline-block animate-spin" />
                انتقال به درگاه بانک
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- دیالوگ برداشت -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="withdrawDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="closeWithdrawDialog" />
          <div class="relative max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-[22px] border border-ink/[0.06] bg-cardLight p-6 shadow-2xl">
            <div class="mb-5 flex items-center justify-between">
              <h3 class="flex items-center gap-2 font-bold text-ink text-[15px]">
                <Icon name="tabler:arrow-up" class="text-blush" />
                برداشت از کیف پول
              </h3>
              <button type="button" class="text-inkSoft transition-colors hover:text-ink" @click="closeWithdrawDialog">
                <Icon name="tabler:x" class="text-[18px]" />
              </button>
            </div>

            <div class="mb-5 rounded-2xl bg-sageLight p-4 text-center">
              <p class="text-[11.5px] font-bold text-sage">موجودی قابل برداشت</p>
              <p class="mt-1 cursor-pointer font-latin text-[22px] font-bold text-ink" @click="useMaxWithdrawAmount">
                {{ money(selectedWallet?.balance || 0) }}
              </p>
            </div>

            <div class="mb-3 flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">شماره شبا</label>
              <input
                :value="irbIbanNumber"
                type="text"
                dir="ltr"
                readonly
                class="w-full p-3.5 rounded-xl border border-ink/10 bg-ink/[0.03] text-[13px] font-latin text-inkSoft outline-none"
              />
            </div>

            <div class="mb-5 grid grid-cols-2 gap-3">
              <div class="rounded-2xl border border-ink/10 bg-cream p-3.5">
                <p class="mb-1 text-[11px] text-inkSoft">نام بانک</p>
                <p class="text-[13px] font-bold text-ink">{{ irbBankName || '—' }}</p>
              </div>
              <div class="rounded-2xl border border-ink/10 bg-cream p-3.5">
                <p class="mb-1 text-[11px] text-inkSoft">صاحب حساب</p>
                <p class="text-[13px] font-bold text-ink">{{ irbAccountName || '—' }}</p>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">مبلغ برداشت (تومان)</label>
              <input
                :value="withdrawAmount"
                type="text"
                inputmode="numeric"
                dir="ltr"
                placeholder="0"
                class="w-full p-3.5 rounded-xl border border-ink/15 bg-cream text-[14px] font-latin text-ink outline-none focus:border-accent transition-colors"
                @input="onWithdrawAmountInput"
              />
            </div>

            <div class="mt-6 flex justify-end gap-2">
              <button type="button" class="px-5 py-2.5 rounded-full border border-ink/10 text-[13px] font-bold text-inkSoft hover:bg-ink/5 transition-colors" @click="closeWithdrawDialog">
                انصراف
              </button>
              <button
                type="button"
                :disabled="withdrawLoading"
                class="px-6 py-2.5 rounded-full bg-blush text-cream text-[13px] font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
                @click="submitWithdraw"
              >
                <Icon v-if="withdrawLoading" name="tabler:loader-2" class="ml-1 inline-block animate-spin" />
                ثبت درخواست برداشت
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { money, faNumber, faDate } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'کیف پول | ماهلین اسکین‌کر' });

const customizer = useCustomizerStore();
const router = useRouter();

const wallets = ref([]);
const transactions = ref([]);
const selectedWalletId = ref(null);
const loading = ref(true);
const historyLoading = ref(false);

const selectedWallet = computed(() => {
  if (!wallets.value.length) return null;
  return wallets.value.find((wallet) => String(wallet.id) === String(selectedWalletId.value)) || wallets.value[0];
});

function normalizeWallet(wallet) {
  return {
    id: wallet.id,
    currency_id: wallet.currency_id,
    currency_name: wallet.currency_name || 'کیف پول',
    currency_symbol: wallet.currency_symbol || 'IRT',
    balance: Number(wallet.balance ?? 0),
  };
}

function isIncoming(transaction) {
  const kindText = String(transaction.kind_text || '').toLowerCase();
  if (kindText === 'deposit' || kindText === 'reward' || kindText === 'refund') return true;
  return Number(transaction.in_line_balance ?? 0) > 0;
}

async function loadWallets() {
  loading.value = true;

  try {
    const response = await useGarnetApiFetch('wallets/getBalance');

    if (response?.error) {
      throw new Error(response.error?.data?.message || response.error?.message || 'خطا در دریافت موجودی کیف پول');
    }

    wallets.value = (response?.Wallets || []).map(normalizeWallet).slice(0, 1);

    if (wallets.value.length) {
      selectedWalletId.value = wallets.value[0].id;
    }
  } catch (error) {
    console.error('[Wallet] wallet balance failed', error);
    toast.error(error?.message || 'خطا در دریافت موجودی کیف پول');
    wallets.value = [];
    selectedWalletId.value = null;
  } finally {
    loading.value = false;
  }
}

async function loadTransactions(walletId) {
  if (!walletId) {
    transactions.value = [];
    return;
  }

  historyLoading.value = true;

  try {
    const response = await useGarnetApiFetch('wallets/showTransactions', { wallet_id: walletId });

    if (response?.error) {
      throw new Error(response.error?.data?.message || response.error?.message || 'خطا در دریافت تاریخچه تراکنش‌ها');
    }

    transactions.value = response?.WalletTransactions || [];
  } catch (error) {
    console.error('[Wallet] transactions failed', error);
    toast.error(error?.message || 'خطا در دریافت تاریخچه تراکنش‌ها');
    transactions.value = [];
  } finally {
    historyLoading.value = false;
  }
}

watch(selectedWalletId, (walletId) => {
  if (walletId) {
    loadTransactions(walletId);
  }
});

/* ---------------- واریز / برداشت ---------------- */

const depositDialog = ref(false);
const withdrawDialog = ref(false);
const depositAmount = ref('');
const withdrawAmount = ref('');
const depositLoading = ref(false);
const withdrawLoading = ref(false);

const paymentProcedureList = ref([]);
const selectedGateway = ref(null);

const irbAccountName = ref('');
const irbBankName = ref('');
const irbIbanNumber = ref('');

const currentUserCustomers = computed(() => customizer.userInfo?.customers || null);

function addCommas(value) {
  const digits = String(value ?? '').replace(/[^\d]/g, '');
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function onDepositAmountInput(event) {
  depositAmount.value = addCommas(event.target.value);
}

function onWithdrawAmountInput(event) {
  withdrawAmount.value = addCommas(event.target.value);
}

function getPaymentProcedure() {
  useGarnetApiFetch('options/indexPaymentProcedure', {
    language_id: 1,
    currency_id: 1,
  })
    .then((response) => {
      paymentProcedureList.value = response?.PaymentProcedure || [];

      const onlineProcedure = paymentProcedureList.value.find(
        (item) => item.dynamic_column_01 === 'onlinePayment' && item.gateways?.length,
      );

      if (onlineProcedure) {
        selectedGateway.value = onlineProcedure.gateways[0].id;
      }
    })
    .catch((error) => {
      console.error('[Wallet] payment procedure failed', error);
    });
}

function openDepositDialog() {
  depositAmount.value = '';
  depositDialog.value = true;
}

function closeDepositDialog() {
  depositDialog.value = false;
  depositAmount.value = '';
}

function increaseBalance() {
  const amount = parseInt(depositAmount.value.replace(/,/g, ''), 10);

  if (!amount) {
    toast.error('مبلغ را وارد کنید');
    return;
  }

  const onlineProcedure = paymentProcedureList.value.find(
    (item) => item.dynamic_column_01 === 'onlinePayment' && item.gateways?.length,
  );

  if (!onlineProcedure || !selectedGateway.value) {
    toast.error('درگاه پرداختی فعالی یافت نشد');
    return;
  }

  depositLoading.value = true;

  useGarnetApiFetch('wallets/increaseBalance', {
    currency_id: selectedWallet.value?.currency_id || 1,
    selectedPaymentProcedure: onlineProcedure.id,
    selectedGateway: selectedGateway.value,
    amount,
  })
    .then((response) => {
      if (response?.code !== 2000) {
        toast.error(response?.msg || response?.error || 'خطا در ایجاد تراکنش واریز');
        return;
      }

      const gatewayTitle = response.GatewayTitle;
      const paymentUrl =
        response.GatewayResult?.payment_url ||
        response.GatewayResult?.data?.payment_url ||
        response.GatewayResult?.url;

      if (['jibit', 'zibal', 'zarinpal', 'saman'].includes(gatewayTitle)) {
        if (paymentUrl) {
          window.location.replace(paymentUrl);
        } else {
          toast.error('آدرس درگاه پرداخت یافت نشد');
        }
      } else {
        toast.error('این درگاه پرداخت پشتیبانی نمی‌شود');
      }
    })
    .catch((error) => {
      toast.error(error?.message || error || 'خطا در ارتباط با درگاه پرداخت');
    })
    .finally(() => {
      depositLoading.value = false;
    });
}

function openWithdrawDialog() {
  const customerInfo = currentUserCustomers.value;

  if (!customerInfo || !customerInfo.irb_iban_number) {
    toast.error('ابتدا شماره شبای خود را در ناحیه کاربری تنظیم نمایید');
    router.push('/account/profile');
    return;
  }

  irbAccountName.value = customerInfo.irb_account_name || '';
  irbBankName.value = customerInfo.irb_bank_name || '';
  irbIbanNumber.value = customerInfo.irb_iban_number || '';
  withdrawAmount.value = '';
  withdrawDialog.value = true;
}

function closeWithdrawDialog() {
  withdrawDialog.value = false;
  withdrawAmount.value = '';
}

function useMaxWithdrawAmount() {
  withdrawAmount.value = addCommas(Math.floor(selectedWallet.value?.balance || 0));
}

function submitWithdraw() {
  const amount = parseInt(withdrawAmount.value.replace(/,/g, ''), 10);

  if (!amount) {
    toast.error('مبلغ را وارد کنید');
    return;
  }

  withdrawLoading.value = true;

  useGarnetApiFetch('wallets/createTransactionsRequest', {
    amount,
    dynamic_column_01: irbIbanNumber.value,
    kind: 2,
  })
    .then((response) => {
      if (response?.code === 2000) {
        toast.success('درخواست برداشت با موفقیت ثبت شد');
        closeWithdrawDialog();
        loadWallets();
        if (selectedWalletId.value) loadTransactions(selectedWalletId.value);
      } else {
        toast.error(response?.msg || response?.error || 'ثبت درخواست برداشت انجام نشد');
      }
    })
    .catch((error) => {
      toast.error(error?.message || error || 'خطا در ثبت درخواست برداشت');
    })
    .finally(() => {
      withdrawLoading.value = false;
    });
}

onMounted(() => {
  loadWallets();
  getPaymentProcedure();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>