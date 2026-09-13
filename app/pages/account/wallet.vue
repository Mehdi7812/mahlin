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
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { money, faNumber, faDate } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'کیف پول | ماهلین اسکین‌کر' });

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

onMounted(() => {
  loadWallets();
});
</script>
