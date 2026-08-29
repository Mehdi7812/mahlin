<template>
  <div class="max-w-[700px] mx-auto px-4 md:px-6 py-14">
    <h1 class="font-display text-3xl mb-8">تکمیل خرید</h1>
    <form class="flex flex-col gap-4" @submit.prevent>
      <input type="text" placeholder="نام و نام خانوادگی" class="p-3.5 rounded-xl border border-ink/15 bg-card" />
      <input type="tel" placeholder="شماره موبایل" class="p-3.5 rounded-xl border border-ink/15 bg-card" />
      <textarea placeholder="آدرس کامل" rows="3" class="p-3.5 rounded-xl border border-ink/15 bg-card"></textarea>
      <input type="text" placeholder="کد پستی" class="p-3.5 rounded-xl border border-ink/15 bg-card" />
    </form>
    <div class="mt-8 p-6 bg-card rounded-2xl flex flex-col gap-2 text-sm">
      <div class="flex justify-between"><span>جمع کل</span><span>{{ money(subtotal) }} تومان</span></div>
      <div class="flex justify-between"><span>هزینه ارسال</span><span>{{ money(SHIPPING) }} تومان</span></div>
      <div class="flex justify-between text-lg font-semibold pt-3 border-t border-ink/10 mt-2"><span>مبلغ قابل پرداخت</span><span>{{ money(grandTotal) }} تومان</span></div>
      <button class="mt-4 py-3.5 bg-accent text-cream rounded-full">پرداخت و ثبت سفارش</button>
    </div>
  </div>
</template>
<script setup>
const { subtotal, grandTotal, money, SHIPPING } = useCart();
</script>
