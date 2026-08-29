<template>
  <nav class="flex items-center gap-2 text-xs text-ink/40 mb-8 flex-wrap">
    <NuxtLink to="/" class="hover:text-gold transition-colors">خانه</NuxtLink>
    <span>/</span>
    <NuxtLink to="/shop" class="hover:text-gold transition-colors">فروشگاه</NuxtLink>
    <span>/</span>
    <span class="text-ink font-bold line-clamp-1">{{ name }}</span>
  </nav>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
});
</script>