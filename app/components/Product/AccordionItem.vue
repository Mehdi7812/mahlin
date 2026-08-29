<template>
  <div class="border-b border-ink/[0.06] py-3">
    <button
      type="button"
      @click="$emit('toggle')"
      class="w-full flex items-center justify-between text-sm sm:text-base font-bold py-2.5 transition-colors group"
      :class="danger ? 'text-accent' : 'text-ink hover:text-gold'"
    >
      <span>{{ title }}</span>
      <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
        <span
          class="absolute w-3.5 h-[1.5px] rounded transition-transform duration-300"
          :class="[danger ? 'bg-accent/80' : 'bg-gold', isOpen ? 'rotate-180' : '']"
        />
        <span
          class="absolute w-[1.5px] h-3.5 rounded transition-transform duration-300"
          :class="[danger ? 'bg-accent/80' : 'bg-gold', isOpen ? 'rotate-90 opacity-0' : 'rotate-0']"
        />
      </span>
    </button>

    <div
      class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]"
      :class="isOpen ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'"
    >
      <div class="overflow-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  isOpen: { type: Boolean, default: false },
  danger: { type: Boolean, default: false },
});
defineEmits(['toggle']);
</script>