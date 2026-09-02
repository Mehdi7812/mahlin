<template>
  <section v-if="pending || products.length" class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-2">
        <span class="w-6 h-px bg-gold/60"></span>
        <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">محصولات مشابه پیشنهادی</h2>
      </div>
      <NuxtLink to="/shop" class="text-xs font-bold text-gold hover:text-ink transition-colors">مشاهده همه فروشگاه ←</NuxtLink>
    </div>

    <div v-if="pending" class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div v-for="n in 4" :key="n" class="rounded-2xl bg-ink/[0.03] h-64 animate-pulse" />
    </div>
    <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  pending: { type: Boolean, default: false },
  products: { type: Array, default: () => [] },
});
</script>