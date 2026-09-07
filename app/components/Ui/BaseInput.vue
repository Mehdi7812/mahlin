<script setup lang="ts">
defineProps<{ error?: boolean; type?: string; inputmode?: string }>()
const model = defineModel<string>()
</script>

<template>
  <input
    v-model="model"
    :type="type ?? 'text'"
    :inputmode="inputmode"
    :aria-invalid="error || undefined"
    class="h-[46px] w-full rounded-control border bg-paper px-3.5 text-[14px] text-ink
           transition placeholder:text-ink-faint focus:outline-none"
    :class="error
      ? 'border-danger shadow-[0_0_0_3px_rgba(180,69,60,.12)]'
      : 'border-line hover:border-line-strong focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,165,116,.28)]'"
  />
</template>
