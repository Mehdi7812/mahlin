<template>
  <div class="space-y-1">

    <!-- توضیحات کامل -->
    <div v-if="item.long" class="border-b border-ink/[0.06] py-3">
      <button
        @click="toggleTab('long')"
        :aria-expanded="modelValue === 'long'"
        class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
      >
        <span>توضیحات و جزئیات محصول</span>
        <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
          <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="modelValue === 'long' ? 'rotate-180' : ''"></span>
          <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="modelValue === 'long' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
        </span>
      </button>
      <div class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]" :class="modelValue === 'long' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'">
        <div class="overflow-hidden">
          <div class="prose-product text-xs sm:text-sm text-ink/60 leading-loose" v-html="item.long"></div>
        </div>
      </div>
    </div>

    <!-- مشخصات و ویژگی‌ها -->
    <div v-if="item.attributes?.length" class="border-b border-ink/[0.06] py-3">
      <button
        @click="toggleTab('attrs')"
        :aria-expanded="modelValue === 'attrs'"
        class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
      >
        <span>مشخصات و ویژگی‌ها</span>
        <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
          <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="modelValue === 'attrs' ? 'rotate-180' : ''"></span>
          <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="modelValue === 'attrs' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
        </span>
      </button>
      <div class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]" :class="modelValue === 'attrs' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'">
        <div class="overflow-hidden">
          <div class="py-2 grid sm:grid-cols-2 gap-3">
            <div v-for="(a, i) in item.attributes" :key="i" class="p-3.5 bg-cardLight rounded-xl border border-ink/[0.02]">
              <span class="block font-bold text-xs text-ink mb-0.5">{{ a.title }}</span>
              <span class="block text-xs text-ink/50">{{ a.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- خرید اقساطی -->
    <div v-if="item.installmentPlans?.length" class="border-b border-ink/[0.06] py-3">
      <button
        @click="toggleTab('installment')"
        :aria-expanded="modelValue === 'installment'"
        class="w-full flex items-center justify-between text-sm sm:text-base font-bold text-ink hover:text-gold py-2.5 transition-colors group"
      >
        <span>امکان خرید اقساطی</span>
        <span class="relative flex items-center justify-center w-5 h-5 shrink-0">
          <span class="absolute w-3.5 h-[1.5px] bg-gold rounded transition-transform duration-300" :class="modelValue === 'installment' ? 'rotate-180' : ''"></span>
          <span class="absolute w-[1.5px] h-3.5 bg-gold rounded transition-transform duration-300" :class="modelValue === 'installment' ? 'rotate-90 opacity-0' : 'rotate-0'"></span>
        </span>
      </button>
      <div class="grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out transform-gpu will-change-[grid-template-rows,opacity]" :class="modelValue === 'installment' ? 'grid-rows-[1fr] opacity-100 pt-1 pb-3' : 'grid-rows-[0fr] opacity-0 pt-0 pb-0'">
        <div class="overflow-hidden">
          <div class="py-2 space-y-3">
            <div
              v-for="plan in item.installmentPlans"
              :key="plan.id"
              class="p-4 rounded-xl border border-ink/[0.06] bg-cardLight flex items-center justify-between flex-wrap gap-2"
            >
              <div>
                <span class="block text-xs font-bold text-ink">{{ plan.title }}</span>
                <span class="block text-[11px] text-ink/40 mt-0.5">{{ fa(plan.number_of_installments) }} قسط</span>
              </div>
              <div class="text-left">
                <span class="block text-[10px] text-ink/40">پیش‌پرداخت</span>
                <span class="block text-sm font-bold font-latin" :style="{ color: catInfo.accent }">
                  {{ money(plan.prepayment) }} تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { fa, money } from '~/utils/format.ts';

const props = defineProps({
  modelValue: { type: String, default: '' },
  item: { type: Object, required: true },
  catInfo: { type: Object, required: true },
});

const emit = defineEmits(['update:modelValue']);

function toggleTab(tab) {
  emit('update:modelValue', props.modelValue === tab ? '' : tab);
}
</script>

<style scoped>
.prose-product :deep(h1),
.prose-product :deep(h2),
.prose-product :deep(h3),
.prose-product :deep(h4) {
  font-weight: 700;
  line-height: 1.5;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  color: rgb(var(--color-ink));
}
.prose-product :deep(h2) { font-size: 1.05rem; }
.prose-product :deep(h3) { font-size: 0.95rem; }
.prose-product :deep(p)  { margin-bottom: 1rem; }
.prose-product :deep(ul),
.prose-product :deep(ol) { padding-right: 1.25rem; margin-bottom: 1rem; }
.prose-product :deep(li) { margin-bottom: 0.4rem; }
.prose-product :deep(a)  { color: v-bind('catInfo.accent'); text-decoration: underline; text-underline-offset: 3px; }
.prose-product :deep(strong) { color: rgb(var(--color-ink)); font-weight: 700; }
</style>