<template>
  <nav class="flex items-center gap-2 text-xs text-ink/40 mb-8 flex-wrap">
    <NuxtLink to="/" class="hover:text-gold transition-colors">خانه</NuxtLink>
    <span>/</span>
    <NuxtLink to="/shop" class="hover:text-gold transition-colors">فروشگاه</NuxtLink>
    <template v-if="categoryTree[0].text">
      <template v-for="cat in categoryTree" :key="cat.id">
        <span>/</span>
        <NuxtLink :to="{ path: '/shop', query: { cat: cat.id } }" class="hover:text-gold transition-colors">
          {{ cat.text }}
        </NuxtLink>
      </template>
    </template>
    <span>/</span>
    <span class="text-ink font-bold line-clamp-1">{{ productName }}</span>
  </nav>
</template>

<script setup>
defineProps({
  categoryTree: { type: Array, default: () => [] },
  productName: { type: String, default: '' },
});
</script>