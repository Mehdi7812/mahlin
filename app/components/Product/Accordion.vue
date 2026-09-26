<template>
  <div
    v-if="sections.length"
    class="rounded-2xl bg-cardLight border border-ink/[0.07] overflow-hidden divide-y divide-ink/[0.06]"
  >
    <section v-for="s in sections" :key="s.id">
      <!-- ─── سربرگ ─── -->
      <h2 class="m-0">
        <button
          :id="`acc-btn-${s.id}`"
          type="button"
          class="acc-btn w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-start transition-colors hover:bg-ink/[0.02]"
          :aria-expanded="isOpen(s.id)"
          :aria-controls="`acc-panel-${s.id}`"
          @click="toggle(s.id)"
        >
          <span
            class="grid place-items-center w-9 h-9 rounded-xl shrink-0 transition-colors duration-200"
            :style="isOpen(s.id)
              ? { backgroundColor: accent, color: '#fff' }
              : { backgroundColor: catInfo.iconBg, color: accent }"
            aria-hidden="true"
          >
            <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path :d="s.icon" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>

          <span class="flex-1 min-w-0">
            <span class="block text-sm sm:text-[15px] font-bold text-ink">{{ s.title }}</span>
            <span v-if="s.hint" class="block text-[11px] text-ink/45 mt-0.5">{{ s.hint }}</span>
          </span>

          <!-- + / − -->
          <span class="relative w-3.5 h-3.5 shrink-0 text-ink/40" aria-hidden="true">
            <span class="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current"></span>
            <span
              class="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded bg-current transition-transform duration-200"
              :class="isOpen(s.id) && 'scale-y-0'"
            ></span>
          </span>
        </button>
      </h2>

      <!-- ─── محتوا ─── -->
      <div
        :id="`acc-panel-${s.id}`"
        role="region"
        :aria-labelledby="`acc-btn-${s.id}`"
        :aria-hidden="!isOpen(s.id)"
        class="acc-panel grid transition-[grid-template-rows] duration-300 ease-out"
        :class="isOpen(s.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="overflow-hidden">
          <div class="px-4 sm:px-5 pb-5">

            <!-- توضیحات -->
            <div
              v-if="s.id === 'long'"
              class="prose-product text-sm text-ink/70 leading-8 max-w-prose"
              v-html="item.long"
            ></div>

            <!-- مشخصات -->
            <div v-else-if="s.id === 'attrs'" class="space-y-4">
              <!-- جدول مشخصات کوتاه -->
              <dl v-if="specs.length" class="m-0 rounded-xl border border-ink/[0.07] divide-y divide-ink/[0.06]">
                <div
                  v-for="a in specs"
                  :key="a.title"
                  class="grid grid-cols-[minmax(96px,34%)_1fr] gap-4 px-4 py-3"
                >
                  <dt class="text-xs text-ink/50 leading-6">{{ a.title }}</dt>
                  <dd class="m-0 text-[13px] font-bold text-ink leading-6">
                    <span v-if="a.chips" class="flex flex-wrap gap-1.5">
                      <span
                        v-for="c in a.chips"
                        :key="c"
                        class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-ink/[0.05] text-ink/75"
                        dir="auto"
                      >{{ c }}</span>
                    </span>
                    <template v-else>{{ a.value }}</template>
                  </dd>
                </div>
              </dl>

              <!-- ویژگی‌های متنی بلند -->
              <div v-for="a in notes" :key="a.title">
                <h3 class="text-[13px] font-bold text-ink mb-1.5">{{ a.title }}</h3>
                <p class="text-sm text-ink/70 leading-7 m-0 max-w-prose">{{ a.value }}</p>
              </div>

              <!-- راهنمای مصرف -->
              <div
                v-if="usage"
                class="flex gap-3 p-4 rounded-xl"
                :style="{ backgroundColor: catInfo.iconBg }"
              >
                <svg class="w-5 h-5 shrink-0 mt-0.5" :style="{ color: accent }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div>
                  <h3 class="text-[13px] font-bold mb-1" :style="{ color: accent }">{{ usage.title }}</h3>
                  <p class="text-sm text-ink/75 leading-7 m-0">{{ usage.value }}</p>
                </div>
              </div>
            </div>

            <!-- اقساط -->
            <ul v-else-if="s.id === 'installment'" class="m-0 p-0 list-none space-y-2">
              <li
                v-for="plan in item.installmentPlans"
                :key="plan.id"
                class="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-ink/[0.07]"
              >
                <div class="min-w-0">
                  <span class="block text-[13px] font-bold text-ink">{{ plan.title }}</span>
                  <span class="block text-xs text-ink/50 mt-0.5">{{ fa(plan.number_of_installments) }} قسط</span>
                </div>
                <div class="text-end">
                  <span class="block text-[11px] text-ink/45">پیش‌پرداخت</span>
                  <span class="text-sm font-bold tabular-nums" :style="{ color: accent }">
                    {{ money(plan.prepayment) }}
                  </span>
                  <span class="text-[11px] text-ink/50"> تومان</span>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { fa, money } from '~/utils/format.ts';

const props = defineProps({
  modelValue: { type: String, default: '' },
  item: { type: Object, required: true },
  catInfo: { type: Object, required: true },
});

const emit = defineEmits(['update:modelValue']);

const accent = computed(() => props.catInfo.darkAccent || props.catInfo.accent);

const isOpen = (id) => props.modelValue === id;
function toggle(id) {
  emit('update:modelValue', isOpen(id) ? '' : id);
}

// ─── دسته‌بندی ویژگی‌ها برای نمایش ─────────────────────────
const UNITS = { ml: 'میلی‌لیتر', g: 'گرم', gr: 'گرم', kg: 'کیلوگرم', l: 'لیتر', cm: 'سانتی‌متر' };
const LONG_TEXT = 60;

const parsedAttrs = computed(() =>
  (props.item.attributes || []).map((a) => {
    let title = a.title.trim();
    let value = String(a.value ?? '').trim();

    // «حجم (ml)» + «450»  →  «حجم» + «۴۵۰ میلی‌لیتر»
    const unit = title.match(/\s*\(([^)]+)\)\s*$/);
    if (unit && /^[\d.,]+$/.test(value)) {
      title = title.slice(0, unit.index).trim();
      value = `${fa(value)} ${UNITS[unit[1].toLowerCase()] || unit[1]}`;
    }

    // فهرست‌های جداشده با کاما → چیپ
    const parts = value.split(/\s*[,،]\s*/).filter(Boolean);
    const chips = parts.length > 1 && parts.every((p) => p.length <= 40) ? parts : null;

    return { title, value, chips };
  }),
);

const usage = computed(() => parsedAttrs.value.find((a) => a.title.includes('راهنما')) || null);
const rest = computed(() => parsedAttrs.value.filter((a) => a !== usage.value));
const specs = computed(() => rest.value.filter((a) => a.chips || a.value.length <= LONG_TEXT));
const notes = computed(() => rest.value.filter((a) => !a.chips && a.value.length > LONG_TEXT));

// ─── بخش‌ها ─────────────────────────────────────────────────
const sections = computed(() => {
  const list = [];
  if (props.item.long) {
    list.push({
      id: 'long',
      title: 'توضیحات محصول',
      icon: 'M4 6h16M4 12h16M4 18h10',
    });
  }
  if (parsedAttrs.value.length) {
    list.push({
      id: 'attrs',
      title: 'مشخصات و راهنمای مصرف',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4',
    });
  }
  if (props.item.installmentPlans?.length) {
    list.push({
      id: 'installment',
      title: 'خرید اقساطی',
      hint: `${fa(props.item.installmentPlans.length)} طرح پرداخت`,
      icon: 'M2 7.5A2.5 2.5 0 014.5 5h15A2.5 2.5 0 0122 7.5v9a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 16.5zM2 10h20M6 15h4',
    });
  }
  return list;
});
</script>

<style scoped>
.acc-btn:focus-visible {
  outline: 2px solid #6E523A;
  outline-offset: -2px;
}

.acc-panel[aria-hidden='true'] {
  visibility: hidden;
  transition: grid-template-rows 300ms ease-out, visibility 0s 300ms;
}

/* ─── محتوای HTML توضیحات ─── */
.prose-product > :deep(*:first-child) { margin-top: 0; }
.prose-product :deep(p) { margin: 0 0 0.9rem; }
.prose-product :deep(h2),
.prose-product :deep(h3),
.prose-product :deep(h4) {
  margin: 1.5rem 0 0.6rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.6;
  color: #3F3A35;
}
.prose-product :deep(strong) { color: #3F3A35; font-weight: 700; }
.prose-product :deep(ul),
.prose-product :deep(ol) { padding-inline-start: 1.25rem; margin: 0 0 1rem; }
.prose-product :deep(li) { margin-bottom: 0.35rem; }
.prose-product :deep(a) {
  color: v-bind(accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
/* پاراگراف و تیتر خالی که ادیتور تولید می‌کند */
.prose-product :deep(p:empty),
.prose-product :deep(h3:empty),
.prose-product :deep(h2:empty) { display: none; }
/* text-align اینلاین ادیتور را نادیده بگیر تا چیدمان یکدست بماند */
.prose-product :deep([style*='text-align']) { text-align: start !important; }

@media (prefers-reduced-motion: reduce) {
  .acc-panel,
  .acc-panel[aria-hidden='true'] { transition: none; }
}
</style>