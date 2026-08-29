<template>
  <div class="space-y-1">
    <!-- ۱. توضیحات تکمیلی -->
    <ProductAccordionItem
      v-if="item.long"
      title="توضیحات و فواید محصول"
      :is-open="activeTab === 'long'"
      @toggle="toggleTab('long')"
    >
      <div class="text-xs sm:text-sm text-ink/60 leading-loose space-y-3">
        <p>{{ item.long }}</p>
        <p v-if="item.suited" class="pt-2"><b class="text-ink">مناسب برای نوع پوست:</b> {{ item.suited }}</p>
      </div>
    </ProductAccordionItem>

    <!-- ۲. ترکیبات کلیدی -->
    <ProductAccordionItem
      v-if="item.inci"
      title="ترکیبات کلیدی و علمی (Inci)"
      :is-open="activeTab === 'inci'"
      @toggle="toggleTab('inci')"
    >
      <div class="py-2 grid sm:grid-cols-2 gap-3">
        <div v-for="i in item.inci" :key="i.latin" class="p-3.5 bg-cardLight rounded-xl border border-ink/[0.02]">
          <span class="block font-latin font-bold text-xs text-ink mb-0.5">{{ i.latin }}</span>
          <span class="block text-xs text-ink/50">{{ i.fa }}</span>
        </div>
      </div>
    </ProductAccordionItem>

    <!-- ۳. روش استفاده (همیشه نمایش داده می‌شود، با fallback) -->
    <ProductAccordionItem
      title="راهنمای و روش استفاده"
      :is-open="activeTab === 'usage'"
      @toggle="toggleTab('usage')"
    >
      <div class="py-2">
        <ol class="space-y-3">
          <li v-for="(u, i) in usageSteps" :key="i" class="flex items-start gap-3.5 text-xs sm:text-sm text-ink/70 leading-relaxed">
            <span class="min-w-5 min-h-5 rounded-full bg-gold/10 text-gold text-[11px] font-bold font-latin grid place-items-center mt-0.5 shrink-0">
              {{ fa(i + 1) }}
            </span>
            <p class="pt-0.5">{{ u }}</p>
          </li>
        </ol>
      </div>
    </ProductAccordionItem>

    <!-- ۴. احتیاط‌ها -->
    <ProductAccordionItem
      v-if="item.caution"
      title="احتیاط‌ها و هشدارهای پوستی"
      danger
      :is-open="activeTab === 'caution'"
      @toggle="toggleTab('caution')"
    >
      <div class="py-2">
        <ul class="space-y-2 list-disc pr-4 text-xs sm:text-sm text-ink/60 leading-relaxed">
          <li v-for="(c, i) in item.caution" :key="i">{{ c }}</li>
        </ul>
      </div>
    </ProductAccordionItem>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fa } from '~/utils/format';

const props = defineProps({
  item: { type: Object, required: true },
});

const activeTab = ref('long');

function toggleTab(tabName) {
  activeTab.value = activeTab.value === tabName ? '' : tabName;
}

const DEFAULT_USAGE = [
  'پوست صورت را با یک شوینده‌ی ملایم بشویید و خشک کنید.',
  'مقدار کمی از محصول (به‌اندازه‌ی یک نخود) را روی نوک انگشتان بردارید.',
  'به‌آرامی با حرکات دایره‌ای رو به بالا روی صورت و گردن ماساژ دهید.',
  'اجازه دهید محصول کاملاً جذب پوست شود، سپس مراحل بعدی مراقبتی یا ضدآفتاب را انجام دهید.',
];

const usageSteps = computed(() => {
  if (Array.isArray(props.item.usage) && props.item.usage.length > 0) {
    return props.item.usage;
  }
  return DEFAULT_USAGE;
});
</script>