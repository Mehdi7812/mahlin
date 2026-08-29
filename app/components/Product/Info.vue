<template>
  <div>
    <span v-if="brand" class="text-xs text-gold font-latin font-bold uppercase tracking-widest block mb-1">
      {{ brand }}
    </span>
    <h1 class="text-2xl sm:text-3.5xl font-display text-ink font-bold leading-tight">{{ name }}</h1>
    <span v-if="latin" class="block text-xs sm:text-sm text-ink/40 font-latin uppercase mt-1">{{ latin }}</span>
  </div>

  <p v-if="desc" class="text-sm sm:text-base text-ink/70 leading-relaxed max-w-[620px]">{{ desc }}</p>
</template>

<script setup>
defineProps({
  brand: { type: String, default: '' },
  name: { type: String, required: true },
  latin: { type: String, default: '' },
  desc: { type: String, default: '' },
});
</script>