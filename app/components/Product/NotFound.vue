<template>
  <div class="max-w-[560px] mx-auto px-4 py-24 text-center">
    <div class="w-20 h-20 rounded-full bg-card mx-auto grid place-items-center mb-6">
      <svg class="w-8 h-8 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.3-4.3" stroke-linecap="round"/>
      </svg>
    </div>
    <h1 class="text-xl font-bold text-ink mb-2">محصول مورد نظر پیدا نشد</h1>
    <p class="text-sm text-ink/50 mb-6">ممکن است این محصول حذف شده یا آدرس صفحه اشتباه باشد.</p>
    <NuxtLink to="/shop" class="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream rounded-full text-sm font-bold hover:bg-gold transition-colors">
      بازگشت به فروشگاه
    </NuxtLink>
  </div>
</template>