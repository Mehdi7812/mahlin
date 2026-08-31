<script setup lang="ts">
/**
 * OtpInput.vue
 * همون منطق و APIهای PanelVerificationCode اصلی (ارسال و بررسی کد تایید)
 * فقط با طراحی Tailwind + انیمیشن بازسازی شده. تایمر توسط والد (صفحه لاگین) مدیریت می‌شود.
 */
const customizer = useCustomizerStore();
const { t } = useI18n();
import { toast } from 'vue-sonner'

const props = defineProps({
  fields: { type: Number, required: false, default: 5 },
  target: { type: String, required: false, default: "" },
  prefixMobile: { type: String, required: false, default: "" },
  callBackToken: { type: Boolean, required: false, default: false },
  callBackInfo: { type: Boolean, required: false, default: false },
  withCart: { type: Boolean, required: false, default: false },
  withUsername: { type: Boolean, required: false, default: false },
  isSignature: { type: Boolean, required: false, default: false },
  sendType: { type: String, required: false, default: "ByMobile" },
  skipInitialSend: { type: Boolean, required: false, default: false },
  timerValue: { type: Number, required: false, default: 200 },
});

const emits = defineEmits(["handleComplete", "onSendCode"]);

const digits = ref(Array.from({ length: props.fields }, () => ""));
const inputs = ref([]);
const loading = ref(true);
const focusedIndex = ref(null);

/* --- استیت‌های انیمیشن (تأثیری در منطق اصلی ندارند) --- */
const shakeError = ref(false);
const successState = ref(false);
const poppedIndex = ref(null);
const resendPulse = ref(false);

const authCode = computed(() => digits.value.join(""));

onMounted(() => {
  if (!props.skipInitialSend) {
    SendVerificationCode();
  } else {
    loading.value = false;
  }
});

function SendVerificationCode() {
  let sendUrl = "";
  let sendData = {};
  if (props.sendType === "ByMobile") {
    sendUrl = "users/sendVerificationCodeByMobile";
    sendData = {
      CodeCount: props.fields,
      mobile: props.prefixMobile + props.target,
      language: 1,
      signature: props.isSignature,
      withAutoGenerationCode: true,
    };
  } else if (props.sendType === "ByEmail") {
    sendUrl = "users/sendVerificationCodeByEmail";
    sendData = {
      CodeCount: props.fields,
      email: props.target,
      language: 1,
      withAutoGenerationCode: true,
    };
  } else if (props.sendType === "Forget") {
    sendUrl = "users/forgetPassword";
    sendData = {
      CodeCount: props.fields,
      mobile: props.prefixMobile + props.target,
      language: 1,
    };
  } else if (props.sendType === "ForgetByEmail") {
    sendUrl = "users/forgetPasswordByEmail";
    sendData = {
      CodeCount: props.fields,
      email: props.target,
      language: 1,
    };
  }
  loading.value = true;
  useGarnetApiFetch(sendUrl, sendData)
    .then((response) => {
      if (response.code === 2001) {
        toast.error({ title: "خطا", message: "ارسال کد با خطا مواجه شد" });
      } else {
        toast.success({ message: "کد احراز هویت ارسال شد" });
        emits("onSendCode");
      }
      loading.value = false;
    })
    .catch((error) => {
      toast.error({ title: "خطا", message: t(error), position: "topRight", rtl: true });
      loading.value = false;
    });
}

function CheckVerificationCode(inputCode) {
  loading.value = true;
  if (props.sendType === "ByMobile") {
    const convertPersianToEnglish = (str) =>
      str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
    inputCode = convertPersianToEnglish(inputCode || "");
  }
  useGarnetApiFetch("users/checkVerificationCode", {
    Code: inputCode,
    Target: props.target,
    prefixMobile: props.prefixMobile,
    withUsername: props.withUsername,
    withEmail: props.sendType === "ByEmail",
    callBackInfo: props.callBackInfo,
    callBackToken: props.callBackToken,
    verifyAccount: true,
  })
    .then((response) => {
      if (response.code === 2000) {
        if (props.callBackToken) {
          customizer.userInfo = response.userInfo;
          customizer.auth = true;
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("g-auth-token", response.token);
          } else if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem("g-auth-token", response.token);
          }
        }
        if (props.callBackInfo) customizer.userInfo = response.userInfo;
        if (props.withCart) getCartCount();

        /* --- نمایش انیمیشن موفقیت قبل از emit --- */
        loading.value = false;
        successState.value = true;
        setTimeout(() => {
          emits("handleComplete", inputCode);
        }, 450);
      } else {
        toast.error({ title: "خطا", message: t(response.message) });
        loading.value = false;
        triggerShake();
        resetDigits();
      }
    })
    .catch((error) => {
      toast.error({ title: "خطا", message: t(error) });
      loading.value = false;
      triggerShake();
      resetDigits();
    });
}

function getCartCount() {
  useGarnetApiFetch("invoices/cartCount").then((response) => {
    customizer.cartCount = response.CartCount;
  });
}

function triggerShake() {
  shakeError.value = true;
  setTimeout(() => {
    shakeError.value = false;
  }, 500);
}

function resetDigits() {
  digits.value = Array.from({ length: props.fields }, () => "");
  nextTick(() => inputs.value[0]?.focus());
}

const persianNumberPattern = /[۰-۹]/;

function convertPersianToEnglish(str) {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}

function onInput(index, event) {
  let val = event.target.value;
  if (persianNumberPattern.test(val)) val = convertPersianToEnglish(val);
  val = val.replace(/[^0-9]/g, "").slice(-1);
  digits.value[index] = val;
  event.target.value = val;

  if (val) {
    poppedIndex.value = index;
    setTimeout(() => {
      if (poppedIndex.value === index) poppedIndex.value = null;
    }, 220);
  }

  if (val && index < props.fields - 1) {
    inputs.value[index + 1]?.focus();
  }
  if (authCode.value.length === props.fields) {
    CheckVerificationCode(authCode.value);
  }
}

function onKeydown(index, event) {
  if (persianNumberPattern.test(event.key)) {
    event.preventDefault();
    toast.error({ title: "خطا", message: "فقط اعداد انگلیسی", position: "topRight", rtl: true });
    triggerShake();
    return;
  }
  if (event.key === "Backspace" && !digits.value[index] && index > 0) {
    inputs.value[index - 1]?.focus();
  }
}

function onPaste(event) {
  const pasted = convertPersianToEnglish(event.clipboardData.getData("text") || "")
    .replace(/[^0-9]/g, "")
    .slice(0, props.fields);
  if (!pasted) return;
  event.preventDefault();
  pasted.split("").forEach((ch, i) => {
    digits.value[i] = ch;
    if (inputs.value[i]) inputs.value[i].value = ch;
  });
  const nextEmpty = pasted.length < props.fields ? pasted.length : props.fields - 1;
  inputs.value[nextEmpty]?.focus();
  if (pasted.length === props.fields) {
    CheckVerificationCode(pasted);
  }
}

/* درصد باقیمانده تایمر برای رنگ‌بندی و پالس هشدار */
const timerRatio = computed(() => props.timerValue / 200);
const isTimerLow = computed(() => props.timerValue > 0 && props.timerValue <= 30);
</script>

<template>
  <div>
    <!-- باکس‌های ورودی کد -->
    <div
      class="relative mx-auto w-fit"
      dir="ltr"
      :class="{ 'animate-shake': shakeError }"
    >
      <div class="flex items-center justify-center gap-2">
        <div
          v-for="(d, i) in digits"
          :key="i"
          class="animate-field-in"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <input
            :ref="(el) => (inputs[i] = el)"
            v-model="digits[i]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            :disabled="loading || successState"
            class="h-14 w-12 rounded-xl border bg-cardLight text-center text-xl font-semibold text-ink outline-none transition-all duration-200"
            :class="[
              successState
                ? 'border-emerald-400 ring-2 ring-emerald-200 scale-105'
                : shakeError
                ? 'border-red-400 ring-2 ring-red-100'
                : d
                ? 'border-accent/60 ring-2 ring-accent/10'
                : 'border-ink/15 focus:border-accent focus:ring-2 focus:ring-accent/25',
              poppedIndex === i ? 'animate-digit-pop' : '',
              'disabled:opacity-50',
            ]"
            @input="onInput(i, $event)"
            @keydown="onKeydown(i, $event)"
            @paste="onPaste"
            @focus="focusedIndex = i"
            @blur="focusedIndex = null"
          />
        </div>
      </div>

      <!-- خط زیر فیلد فعال (نشانگر متحرک) -->
      <div class="relative mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-transparent">
        <div
          v-if="focusedIndex !== null && !loading && !successState"
          class="absolute h-0.5 rounded-full bg-accent transition-all duration-300 ease-out"
          :style="{
            width: '48px',
            transform: `translateX(${focusedIndex * (48 + 8)}px)`,
          }"
        ></div>
      </div>

      <!-- اورلی لودینگ -->
      <Transition name="fade">
        <div
          v-if="loading"
          class="absolute inset-0 flex items-center justify-center rounded-xl bg-cream/70 backdrop-blur-sm"
        >
          <svg class="h-6 w-6 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      </Transition>

      <!-- اورلی موفقیت -->
      <Transition name="pop-fade">
        <div
          v-if="successState"
          class="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-50/80 backdrop-blur-sm"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 animate-check-pop">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </Transition>
    </div>

    <!-- تایمر دایره‌ای -->
    <div class="mt-6 flex justify-center" dir="ltr">
      <div class="relative flex h-[110px] w-[110px] items-center justify-center">
        <svg class="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="55" cy="55" r="48" fill="none" stroke="#3F3A3520" stroke-width="8" />
          <circle
            cx="55"
            cy="55"
            r="48"
            fill="none"
            :stroke="isTimerLow ? '#DC5B4B' : '#6E523A'"
            stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="2 * Math.PI * 48"
            :stroke-dashoffset="2 * Math.PI * 48 * (1 - timerRatio)"
            class="transition-all duration-1000 ease-linear"
            :class="{ 'animate-pulse-ring': isTimerLow }"
          />
        </svg>

        <Transition name="pop-fade" mode="out-in">
          <button
            v-if="timerValue === 0"
            key="resend"
            type="button"
            class="z-10 animate-bounce-in rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-accent/30 transition hover:bg-accentHover hover:shadow-lg active:scale-95"
            @click="SendVerificationCode"
          >
            ارسال دوباره
          </button>
          <span
            v-else
            key="timer"
            class="z-10 text-sm font-medium tabular-nums text-ink transition-colors duration-300"
            :class="{ 'text-red-500 animate-pulse': isTimerLow }"
          >
            {{ timerValue }}
          </span>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ورود پلکانی هر باکس */
@keyframes fieldIn {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.85);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-field-in {
  animation: fieldIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* پاپ شدن رقم هنگام تایپ */
@keyframes digitPop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.18);
  }
  100% {
    transform: scale(1);
  }
}
.animate-digit-pop {
  animation: digitPop 0.22s ease-out;
}

/* شیک شدن هنگام خطا */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-8px);
  }
  40% {
    transform: translateX(8px);
  }
  60% {
    transform: translateX(-6px);
  }
  80% {
    transform: translateX(6px);
  }
}
.animate-shake {
  animation: shake 0.45s ease-in-out;
}

/* تیک موفقیت */
@keyframes checkPop {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
.animate-check-pop {
  animation: checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* پالس حلقه تایمر وقتی زمان کم است */
@keyframes pulseRing {
  0%,
  100% {
    stroke-width: 8;
    opacity: 1;
  }
  50% {
    stroke-width: 10;
    opacity: 0.7;
  }
}
.animate-pulse-ring {
  animation: pulseRing 1s ease-in-out infinite;
}

/* ورود دکمه ارسال دوباره */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  60% {
    opacity: 1;
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
.animate-bounce-in {
  animation: bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* ترانزیشن‌های عمومی */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-fade-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-fade-leave-active {
  transition: all 0.2s ease;
}
.pop-fade-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.pop-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>