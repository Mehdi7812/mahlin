<template>
  <section v-if="products.length" class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
    <div class="flex items-center gap-2 mb-8">
      <span class="w-6 h-px bg-gold/60"></span>
      <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">بازدیدهای اخیر شما</h2>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  products: { type: Array, default: () => [] },
});
</script>