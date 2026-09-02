<template>
  <div class="bg-card border border-ink/[0.05] rounded-3xl p-6 lg:sticky lg:top-[100px]">

    <!-- ثبت نظر غیرفعال -->
    <div v-if="!allowComment" class="text-center py-6">
      <div class="w-12 h-12 rounded-full bg-ink/[0.05] grid place-items-center mx-auto mb-3">
        <svg class="w-5 h-5 text-ink/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-linecap="round"/>
        </svg>
      </div>
      <p class="text-xs text-ink/45 leading-relaxed">امکان ثبت دیدگاه برای این محصول غیرفعال است.</p>
    </div>

    <!-- فرم -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <h3 class="text-sm font-bold text-ink mb-1">دیدگاه خود را ثبت کنید</h3>
        <p class="text-[11px] text-ink/40 leading-relaxed">
          تجربه‌ی شما به دیگر مشتریان کمک می‌کند تصمیم بهتری بگیرند.
        </p>
      </div>

      <!-- امتیاز ستاره‌ای -->
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
              :stroke="(hoverStar || rate) >= s ? catInfo.accent : 'rgba(63,58,53,0.2)'"
              class="transition-colors duration-150"
              stroke-width="1.6"
            >
              <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.1 5.9 20.5l1.5-6.8L2.2 9l6.9-.7z" stroke-linejoin="round"/>
            </svg>
          </button>
          <span v-if="rate" class="text-xs text-ink/40 mr-1">{{ rate }}/۵</span>
        </div>
      </div>

      <!-- نام — فقط مهمان -->
      <div v-if="!isUserLogin">
        <label class="block text-xs font-bold text-ink/60 mb-1.5">نام شما</label>
        <input
          v-model="name"
          type="text"
          placeholder="مثلاً سارا محمدی"
          class="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors bg-white"
          :class="modelValue.error && !name.trim() ? 'border-red-300' : 'border-ink/10'"
          :style="name.trim() ? { borderColor: catInfo.borderColor } : {}"
        />
      </div>

      <!-- شماره تماس — فقط مهمان -->
      <div v-if="!isUserLogin">
        <label class="block text-xs font-bold text-ink/60 mb-1.5">شماره همراه</label>
        <input
          v-model="contact"
          type="tel"
          inputmode="numeric"
          placeholder="09xxxxxxxxx"
          maxlength="11"
          class="w-full px-4 py-2.5 rounded-xl border text-sm font-latin focus:outline-none transition-colors bg-white"
          :class="contactHasError ? 'border-red-300' : 'border-ink/10'"
          @input="onContactInput"
        />
        <p v-if="contact && !isPhoneValid" class="text-[11px] text-red-400 mt-1.5">
          شماره همراه معتبر نیست (باید با ۰۹ شروع شود و ۱۱ رقم باشد)
        </p>
      </div>

      <!-- متن نظر -->
      <div>
        <label class="block text-xs font-bold text-ink/60 mb-1.5">متن دیدگاه</label>
        <textarea
          v-model="text"
          rows="4"
          placeholder="نظر خود را درباره کیفیت، کارایی و تجربه استفاده از این محصول بنویسید..."
          class="w-full px-4 py-3 rounded-xl border text-sm leading-relaxed resize-none focus:outline-none transition-colors bg-white"
          :class="modelValue.error && !text.trim() ? 'border-red-300' : 'border-ink/10'"
        />
      </div>

      <!-- پیام خطا -->
      <p v-if="modelValue.error" class="text-[11px] text-red-400 flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4m0 4h.01" stroke-linecap="round"/>
        </svg>
        لطفاً تمامی فیلدهای لازم را به‌درستی تکمیل کنید.
      </p>

      <!-- دکمه ارسال -->
      <button
        type="submit"
        :disabled="submitLoading || !isFormValid"
        class="w-full h-11 rounded-full text-white text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        :style="{
          backgroundColor: catInfo.accent,
          boxShadow: !submitLoading && isFormValid
            ? `0 8px 20px -6px ${catInfo.blobColor}`
            : 'none'
        }"
      >
        <svg
          v-if="submitLoading"
          class="w-4 h-4 animate-spin"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        >
          <path d="M21 12a9 9 0 1 1-9-9" stroke-linecap="round"/>
        </svg>
        <svg
          v-else
          class="w-4 h-4"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        >
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ submitLoading ? 'در حال ارسال...' : 'ثبت دیدگاه' }}</span>
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue:   { type: Object,  required: true },
  allowComment: { type: Boolean, default: true  },
  isUserLogin:  { type: Boolean, default: false },
  catInfo:      { type: Object,  required: true },
  submitLoading:{ type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const hoverStar = ref(0);

// ─── helper ──────────────────────────────────────────────
function updateField(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
}

// ─── computed fields ──────────────────────────────────────
const name = computed({
  get: () => props.modelValue.name    ?? '',
  set: (v) => updateField('name', v),
});
const contact = computed({
  get: () => props.modelValue.contact ?? '',
  set: (v) => updateField('contact', v),
});
const text = computed({
  get: () => props.modelValue.text    ?? '',
  set: (v) => updateField('text', v),
});
const rate = computed({
  get: () => props.modelValue.rate    ?? 5,
  set: (v) => updateField('rate', v),
});

// ─── ولیدیشن موبایل ──────────────────────────────────────
const PHONE_REGEX = /^09\d{9}$/;
const isPhoneValid = computed(() =>
  PHONE_REGEX.test((contact.value || '').trim())
);
const contactHasError = computed(() => {
  const val = (contact.value || '').trim();
  if (!val) return props.modelValue.error;
  return !isPhoneValid.value;
});

// ─── ولیدیشن کل فرم (دکمه فعال/غیرفعال) ─────────────────
const isFormValid = computed(() => {
  const hasText = (text.value || '').trim().length > 0;
  if (props.isUserLogin) return hasText;
  const hasName    = (name.value    || '').trim().length > 0;
  const hasContact = isPhoneValid.value;
  return hasText && hasName && hasContact;
});

// ─── input handler ────────────────────────────────────────
function onContactInput(e) {
  contact.value = e.target.value.replace(/\D/g, '').slice(0, 11);
}

// ─── submit ───────────────────────────────────────────────
function handleSubmit() {
  if (!isFormValid.value) {
    updateField('error', true);
    return;
  }
  updateField('error', false);
  emit('submit');
}
</script>