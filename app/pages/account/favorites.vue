<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-xl md:text-2xl text-ink">علاقه‌مندی‌ها</h2>
        <p v-if="loading" class="mt-2 h-3 w-28 animate-pulse rounded-full bg-ink/10" />
        <p v-else class="text-[12.5px] text-inkSoft mt-1">{{ faNumber(favorites.length) }} محصول ذخیره‌شده</p>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 animate-pulse" aria-busy="true">
      <div v-for="item in 6" :key="item" class="overflow-hidden rounded-md rounded-tr-[48px] bg-ink/5">
        <div class="h-[260px] rounded-tr-[48px] bg-ink/[0.07]" />
        <div class="space-y-3 p-4">
          <div class="h-4 w-20 rounded-full bg-ink/[0.08]" />
          <div class="h-5 w-4/5 rounded-full bg-ink/[0.08]" />
          <div class="h-3 w-2/5 rounded-full bg-ink/[0.06]" />
          <div class="border-t border-ink/[0.06] pt-3"><div class="ml-auto h-5 w-24 rounded-full bg-ink/[0.08]" /></div>
        </div>
      </div>
    </div>

    <div v-else-if="favorites.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
      <ProductCard v-for="product in favorites" :key="product.id" :product="product" />
    </div>

    <div v-else class="rounded-[22px] border border-dashed border-ink/15 py-16 text-center">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blushLight text-blush">
        <Icon name="tabler:heart" class="text-[26px]" />
      </div>
      <p class="mt-4 text-[14px] font-bold text-ink">هنوز محصولی را نپسندیده‌اید</p>
      <p class="mt-1 text-[12.5px] text-inkSoft">با ضربه روی آیکون قلب در صفحه محصولات، آن‌ها را اینجا ذخیره کنید.</p>
      <NuxtLink to="/shop" class="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-cream hover:text-cream bg-accent px-5 py-2.5 rounded-full hover:bg-accentHover transition-colors">
        <Icon name="tabler:building-store" class="text-[15px]" />
        مشاهده فروشگاه
      </NuxtLink>
    </div>

    <div v-if="!loading && totalPages > 1" class="flex items-center justify-center gap-2 pt-2">
      <button type="button" class="rounded-full border border-ink/10 px-4 py-2 text-[12px] font-bold text-inkSoft disabled:opacity-40" :disabled="page === 1 || loading" @click="changePage(page - 1)">قبلی</button>
      <span class="text-[12px] font-bold text-inkSoft">صفحه {{ faNumber(page) }} از {{ faNumber(totalPages) }}</span>
      <button type="button" class="rounded-full border border-ink/10 px-4 py-2 text-[12px] font-bold text-inkSoft disabled:opacity-40" :disabled="page === totalPages || loading" @click="changePage(page + 1)">بعدی</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { faNumber } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'علاقه‌مندی‌ها | ماهلین اسکین‌کر' });

const favorites = ref([]);
const loading = ref(true);
const page = ref(1);
const pageSize = ref(12);
const totalPages = ref(1);
const connectTry = ref(0);

function getProducts() {
  loading.value = true;
  const sendData = {
    amount: pageSize.value,
    page: page.value,
    allowSale: true,
    order: 'order',
    direction: 'desc',
    withAttrib: false,
    filterFavorite: true,
  };

  useGarnetApiFetch('Products/indexWithImagesAuth', sendData)
    .then((response) => {
      if (!response?.Products && response?.error) throw response.error;
      favorites.value = response?.Products || [];
      totalPages.value = Math.max(1, Math.ceil((Number(response?.TotalCount) || 0) / pageSize.value));
      connectTry.value = 0;
    })
    .catch((error) => {
      if (connectTry.value < 3) {
        connectTry.value += 1;
        getProducts();
      } else {
        favorites.value = [];
        toast.error(error?.message || error || 'خطا در دریافت علاقه‌مندی‌ها');
      }
    })
    .finally(() => {
      if (connectTry.value >= 3 || favorites.value.length || totalPages.value === 1) loading.value = false;
    });
}

function changePage(nextPage) {
  if (nextPage < 1 || nextPage > totalPages.value || nextPage === page.value) return;
  page.value = nextPage;
  getProducts();
}

onMounted(getProducts);
</script>
