<template>
  <div class="max-w-[900px] mx-auto px-4 md:px-6 py-14">
    <h1 class="font-display text-3xl mb-8">سبد خرید</h1>
    <div v-if="detailedLines.length === 0" class="text-inkSoft">سبد خرید شما خالی است. <NuxtLink to="/shop" class="text-accent">مشاهده محصولات</NuxtLink></div>
    <div v-else class="flex flex-col gap-6">
      <div v-for="l in detailedLines" :key="l.pid" class="flex items-center gap-4 p-4 bg-card rounded-2xl">
        <img :src="l.product.img || PLACEHOLDER_IMG" class="w-20 h-20 object-contain bg-cardLight rounded-xl" />
        <div class="flex-1">
          <NuxtLink :to="'/product/' + l.pid" class="font-semibold text-ink">{{ l.product.name }}</NuxtLink>
          <div class="text-sm text-inkSoft">{{ l.product.size }}</div>
        </div>
        <div class="flex items-center border border-ink/20 rounded-full">
          <button class="w-8 h-8" @click="setQty(l.pid, l.qty - 1)">−</button>
          <span class="w-8 text-center text-sm">{{ fa(l.qty) }}</span>
          <button class="w-8 h-8" @click="setQty(l.pid, l.qty + 1)">+</button>
        </div>
        <span class="w-28 text-left text-accent">{{ money(l.lineTotal) }}</span>
        <button aria-label="حذف" class="text-inkSoft" @click="remove(l.pid)">✕</button>
      </div>

      <div class="mt-6 p-6 bg-card rounded-2xl flex flex-col gap-2 text-sm">
        <div class="flex justify-between"><span>جمع کل</span><span>{{ money(subtotal) }} تومان</span></div>
        <div class="flex justify-between text-accent"><span>تخفیف</span><span>−{{ money(DISCOUNT) }} تومان</span></div>
        <div class="flex justify-between"><span>هزینه ارسال</span><span>{{ money(SHIPPING) }} تومان</span></div>
        <div class="flex justify-between text-lg font-semibold pt-3 border-t border-ink/10 mt-2"><span>مبلغ قابل پرداخت</span><span>{{ money(grandTotal) }} تومان</span></div>
        <NuxtLink to="/checkout" class="mt-4 py-3.5 bg-accent text-cream rounded-full text-center">ادامه فرایند خرید</NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { PLACEHOLDER_IMG } from '~/data/products';
const { detailedLines, setQty, remove, subtotal, grandTotal, money, fa, DISCOUNT, SHIPPING } = useCart();
</script>
