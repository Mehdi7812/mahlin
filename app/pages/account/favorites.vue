<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-xl md:text-2xl text-ink">علاقه‌مندی‌ها</h2>
        <p class="text-[12.5px] text-inkSoft mt-1">{{ faNumber(favorites.length) }} محصول ذخیره‌شده</p>
      </div>
    </div>

    <div v-if="favorites.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
      <ProductCard v-for="product in favorites" :key="product.id" :product="product" />
    </div>

    <div v-else class="rounded-[22px] border border-dashed border-ink/15 py-16 text-center">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blushLight text-blush">
        <Icon name="tabler:heart" class="text-[26px]" />
      </div>
      <p class="mt-4 text-[14px] font-bold text-ink">هنوز محصولی را نپسندیده‌اید</p>
      <p class="mt-1 text-[12.5px] text-inkSoft">با ضربه روی آیکون قلب در صفحه محصولات، آن‌ها را اینجا ذخیره کنید.</p>
      <NuxtLink to="/shop" class="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-cream bg-accent px-5 py-2.5 rounded-full hover:bg-accentHover transition-colors">
        <Icon name="tabler:building-store" class="text-[15px]" />
        مشاهده فروشگاه
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FAVORITES } from '~/data/account';
import { faNumber } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'علاقه‌مندی‌ها | ماهلین اسکین‌کر' });

// نسخه استاتیک/نمایشی — در آینده باید از API واقعی دریافت شود
const favorites = ref(FAVORITES);
</script>
