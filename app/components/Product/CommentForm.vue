<template>
  <div class="bg-card border border-ink/[0.05] rounded-3xl p-6 lg:sticky lg:top-[100px]">

    <!-- ثبت نظر غیرفعال است -->
    <div v-if="!allowComment" class="text-center py-6">
      <div class="w-12 h-12 rounded-full bg-ink/[0.05] grid place-items-center mx-auto mb-3">
        <svg class="w-5 h-5 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-linecap="round"/>
        </svg>
      </div>
      <p class="text-xs text-ink/45 leading-relaxed">امکان ثبت دیدگاه برای این محصول غیرفعال است.</p>
    </div>

    <!-- فرم ثبت نظر -->
    <form v-else @submit.prevent="$emit('submit')" class="space-y-4">
      <div>
        <h3 class="text-sm font-bold text-ink mb-1">دیدگاه خود را ثبت کنید</h3>
        <p class="text-[11px] text-ink/40 leading-relaxed">تجربه‌ی شما به دیگر مشتریان کمک می‌کند تصمیم بهتری بگیرند.</p>
      </div>

      <!-- امتیازدهی ستاره‌ای -->
      <div>
        <span class="block text-xs font-bold text-ink/60 mb-2">امتیاز شما به این محصول</span>
        <div class="flex items-center gap-1.5" @mouseleave="hoverStar = 0">
          <button
            v-for="s in 5" :key="s"
            type="button"
            class="transition-transform duration-150 hover:scale-110"
            @mouseenter="hoverStar = s"
            @click="rate = s"
          >
            <svg
              width="26" height="26" viewBox="0 0 24 24"
              :fill="(hoverStar || rate) >= s ? catInfo.accent : 'none'"
              :stroke="(hoverStar || rate) >= s ? catInfo.accent : 'currentColor'"
              class="text-ink/20 transition-colors duration-150"
              stroke-width="1.6"
            >
              <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z" stroke-linejoin="round"/>
            </svg>
          </button>
          <span v-if="rate" class="text-xs text-ink/40 mr-1 font-latin">{{ fa(rate) }}/۵</span>
        </div>
      </div>

      <!-- نام (فقط برای کاربر مهمان) -->
      <div v-if="!isUserLogin">
        <label class="block text-xs font-bold text-ink/60 mb-1.5">نام شما</label>
        <input
          v-model="name"
          type="text"
          placeholder="مثلاً سارا محمدی"
          class="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-gold/50 transition-colors bg-white"
          :class="modelValue.error && !name.trim() ? 'border-blush/60' : 'border-ink/10'"
        />
      </div>

      <!-- شماره تماس (فقط برای کاربر مهمان) -->
      <div v-if="!isUserLogin">
        <label class="block text-xs font-bold text-ink/60 mb-1.5">شماره همراه</label>
        <input
          v-model="contact"
          type="tel"
          placeholder="09xxxxxxxxx"
          class="w-full px-4 py-2.5 rounded-xl border text-sm font-latin focus:outline-none focus:border-gold/50 transition-colors bg-white"
          :class="modelValue.error && !contact.trim() ? 'border-blush/60' : 'border-ink/10'"
        />
      </div>

      <!-- متن نظر -->
      <div>
        <label class="block text-xs font-bold text-ink/60 mb-1.5">متن دیدگاه</label>
        <textarea
          v-model="text"
          rows="4"
          placeholder="نظر خود را درباره کیفیت، کارایی و تجربه استفاده از این محصول بنویسید..."
          class="w-full px-4 py-3 rounded-xl border text-sm leading-relaxed resize-none focus:outline-none focus:border-gold/50 transition-colors bg-white"
          :class="modelValue.error && !text.trim() ? 'border-blush/60' : 'border-ink/10'"
        ></textarea>
      </div>

      <p v-if="modelValue.error" class="text-[11px] text-blush flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
        </svg>
        لطفاً تمامی فیلدهای لازم را تکمیل کنید.
      </p>

      <!-- دکمه ارسال -->
      <button
        type="submit"
        :disabled="submitLoading"
        class="w-full h-11 rounded-full text-cream text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60"
        :style="{ backgroundColor: catInfo.darkAccent }"
      >
        <svg v-if="submitLoading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 12a9 9 0 1 1-9-9" stroke-linecap="round"/>
        </svg>
        <span>{{ submitLoading ? 'در حال ارسال...' : 'ثبت دیدگاه' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { fa } from '~/utils/format.ts';

const props = defineProps({
  modelValue: { type: Object, required: true }, // { name, contact, text, rate, error }
  allowComment: { type: Boolean, default: true },
  isUserLogin: { type: Boolean, default: false },
  catInfo: { type: Object, required: true },
  submitLoading: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const hoverStar = ref(0);

function updateField(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
}

const name = computed({
  get: () => props.modelValue.name,
  set: (v) => updateField('name', v),
});
const contact = computed({
  get: () => props.modelValue.contact,
  set: (v) => updateField('contact', v),
});
const text = computed({
  get: () => props.modelValue.text,
  set: (v) => updateField('text', v),
});
const rate = computed({
  get: () => props.modelValue.rate,
  set: (v) => updateField('rate', v),
});
</script>