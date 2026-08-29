<template>
  <div class="aspect-square bg-cardLight border border-ink/[0.04] rounded-tr-[80px] sm:rounded-tr-[100px] rounded-[24px] relative overflow-hidden flex items-center justify-center p-8 group">
    <img
      :src="img || PLACEHOLDER_IMG"
      :alt="alt"
      loading="lazy"
      class="w-[80%] h-[80%] object-contain transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-ink/[0.02] to-transparent pointer-events-none" />
  </div>
</template>

<script setup>
import { PLACEHOLDER_IMG } from '~/data/products';

defineProps({
  img: { type: String, default: '' },
  alt: { type: String, required: true },
});
</script>