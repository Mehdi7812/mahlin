<script setup lang="ts">
export type SelectOptionValue = string | number
export type SelectOption = {
  label: string
  value: SelectOptionValue
  disabled?: boolean
  icon?: string
}

const props = withDefaults(defineProps<{
  modelValue?: SelectOptionValue | null
  options: (string | SelectOption)[]
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  error?: string | boolean
  id?: string
  clearable?: boolean
}>(), {
  placeholder: 'انتخاب کنید',
  modelValue: null,
  clearable: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: SelectOptionValue | null]
  'change': [value: SelectOptionValue | null]
}>()

const root = ref<HTMLElement>()
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const buttonRef = ref<HTMLButtonElement>()

const normalizedOptions = computed<SelectOption[]>(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string') return { label: opt, value: opt }
    return opt
  })
})

const selectedOption = computed(() =>
  normalizedOptions.value.find(o => o.value === props.modelValue) || null
)

const displayLabel = computed(() => selectedOption.value?.label || '')

function toggle() {
  if (props.disabled) return
  isOpen.value ? close() : open()
}
function open() {
  if (props.disabled) return
  isOpen.value = true
  const idx = normalizedOptions.value.findIndex(o => o.value === props.modelValue)
  highlightedIndex.value = idx >= 0 ? idx : 0
  nextTick(() => buttonRef.value?.focus())
}
function close() {
  isOpen.value = false
}
function select(option: SelectOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  close()
}
function clear() {
  emit('update:modelValue', null)
  emit('change', null)
}

function onClickOutside(e: MouseEvent) {
  if (!root.value?.contains(e.target as Node)) close()
}
onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      open()
    }
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlightedIndex.value = Math.min(highlightedIndex.value + 1, normalizedOptions.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (highlightedIndex.value >= 0) select(normalizedOptions.value[highlightedIndex.value])
  } else if (e.key === 'Escape') {
    close()
  }
}
</script>

<template>
  <div ref="root" class="w-full">

    <!-- لیبل -->
    <label
      v-if="label"
      :for="id"
      class="mb-2 block text-xs font-bold text-inkSoft"
    >
      {{ label }}
      <span v-if="required" class="text-red-400 mr-0.5">*</span>
    </label>

    <div class="relative">

      <!-- دکمه اصلی -->
      <button
        :id="id"
        ref="buttonRef"
        type="button"
        :disabled="disabled"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        class="group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-right text-sm outline-none transition-all duration-200"
        :class="[
          error
            ? 'border-red-300 bg-red-50/50 ring-4 ring-red-100'
            : isOpen
              ? 'border-gold bg-white ring-4 ring-gold/10 shadow-sm'
              : 'border-ink/10 bg-card hover:border-gold/40 hover:bg-cardLight',
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer',
        ]"
        @click="toggle"
        @keydown="onKeydown"
      >
        <!-- متن انتخاب‌شده / placeholder -->
        <span
          class="truncate transition-colors duration-200"
          :class="selectedOption ? 'text-ink font-medium' : 'text-ink/35'"
        >
          {{ displayLabel || placeholder }}
        </span>

        <!-- آیکون‌های سمت چپ -->
        <span class="flex shrink-0 items-center gap-1.5">
          <!-- دکمه پاک‌کردن -->
          <span
            v-if="clearable && modelValue !== null && modelValue !== '' && !required"
            class="flex h-5 w-5 items-center justify-center rounded-full bg-ink/[0.06] text-ink/40 transition-all duration-150 hover:bg-red-100 hover:text-red-400"
            @click.stop="clear"
          >
            <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </span>

          <!-- شورون -->
          <span
            class="flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-200"
            :class="isOpen ? 'bg-gold/15 text-gold' : 'text-ink/30 group-hover:text-gold/60'"
          >
            <svg
              class="h-3.5 w-3.5 transition-transform duration-200"
              :class="isOpen ? 'rotate-180' : ''"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            >
              <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
      </button>

      <!-- دراپ‌داون -->
      <Transition name="select-drop">
        <ul
          v-if="isOpen"
          role="listbox"
          class="absolute right-0 left-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-2xl border border-ink/[0.07] bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.10)]"
          @mouseleave="highlightedIndex = -1"
        >
          <li
            v-for="(opt, idx) in normalizedOptions"
            :key="String(opt.value)"
            role="option"
            :aria-selected="modelValue === opt.value"
            :aria-disabled="opt.disabled"
            class="flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] transition-all duration-150"
            :class="[
              opt.disabled && 'cursor-not-allowed opacity-35',
              modelValue === opt.value
                ? 'bg-gold/12 text-accent font-semibold'
                : idx === highlightedIndex
                  ? 'bg-cream text-ink'
                  : 'text-ink/70 hover:text-ink',
            ]"
            @mouseenter="!opt.disabled && (highlightedIndex = idx)"
            @click="select(opt)"
          >
            <span class="flex items-center gap-2">
              <!-- آیکون آپشن -->
              <span
                v-if="opt.icon"
                class="flex h-6 w-6 items-center justify-center rounded-lg text-sm"
                :class="modelValue === opt.value ? 'bg-gold/20 text-accent' : 'bg-ink/[0.05] text-ink/50'"
              >
                <Icon :name="opt.icon" />
              </span>
              {{ opt.label }}
            </span>

            <!-- تیک انتخاب -->
            <span
              v-if="modelValue === opt.value"
              class="flex h-5 w-5 items-center justify-center rounded-full bg-gold/20"
            >
              <svg class="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </li>

          <!-- خالی بودن لیست -->
          <li v-if="!normalizedOptions.length" class="py-6 text-center text-xs text-ink/35">
            گزینه‌ای وجود ندارد
          </li>
        </ul>
      </Transition>
    </div>

    <!-- پیام خطا -->
    <p v-if="typeof error === 'string' && error" class="mt-1.5 flex items-center gap-1 text-xs text-red-500">
      <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01" stroke-linecap="round"/>
      </svg>
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.select-drop-enter-active,
.select-drop-leave-active {
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.select-drop-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}
.select-drop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>