<script setup lang="ts">
/**
 * The only button in the project. Every CTA goes through it.
 * Heights: 48px md / 40px sm
 */
interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'gold'
  size?: 'md' | 'sm'
  block?: boolean
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  block: false,
  loading: false,
  disabled: false,
})

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    :aria-disabled="isDisabled || undefined"
    class="group relative inline-flex select-none items-center justify-center gap-2 rounded-xl font-bold cursor-pointer
           transition-all duration-200 ease-out
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
           active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100"
    :class="[
      // size
      size === 'md' ? 'h-12 px-6 text-[14px]' : 'h-10 px-4 text-sm',
      block && 'w-full',
      // variant
      variant === 'primary' && [
        'bg-accent text-white shadow-sm shadow-accent/20',
        'hover:bg-accentHover hover:shadow-md hover:shadow-accent/20',
        'focus-visible:ring-accent focus-visible:ring-offset-0',
        'disabled:bg-ink/10 disabled:text-ink/30 disabled:shadow-none',
      ],
      variant === 'gold' && [
        'bg-gold text-white shadow-sm shadow-gold/20',
        'hover:bg-accent hover:shadow-md hover:shadow-gold/30',
        'focus-visible:ring-gold focus-visible:ring-offset-0',
        'disabled:bg-ink/10 disabled:text-ink/30 disabled:shadow-none',
      ],
      variant === 'secondary' && [
        'bg-white border-2 text-accent',
        'border-accent hover:border-accentHover hover:bg-accent/5',
        'focus-visible:ring-accent focus-visible:ring-offset-0',
        'disabled:border-ink/10 disabled:bg-transparent disabled:text-ink/30',
      ],
      variant === 'tertiary' && [
        'bg-transparent text-ink/60',
        'hover:bg-cream hover:text-accent',
        'focus-visible:ring-accent focus-visible:ring-offset-0',
        'disabled:text-ink/20 disabled:bg-transparent',
      ],
      variant === 'danger' && [
        'bg-red-500 text-white shadow-sm shadow-red-500/25',
        'hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30',
        'focus-visible:ring-red-500 focus-visible:ring-offset-0',
        'disabled:bg-ink/10 disabled:text-ink/30 disabled:shadow-none',
      ],
    ]"
  >
    <!-- loading spinner -->
    <svg
      v-if="loading"
      class="h-4 w-4 shrink-0 animate-spin text-current"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
    </svg>

    <!-- slot -->
    <span :class="loading && 'opacity-90'" class="inline-flex items-center gap-2">
      <slot />
    </span>
  </button>
</template>

<style scoped>
button:disabled {
  @apply opacity-70;
}
</style>