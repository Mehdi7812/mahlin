<script setup>
import { ref, reactive, computed, onMounted } from "vue";

const props = defineProps({
  additional: { type: String, default: "" },
});

const { t } = useI18n();
import { toast } from 'vue-sonner'
const route = useRoute();
const router = useRouter();
const customizer = useCustomizerStore();

const mobile = ref("");
const presenter = ref("");
const password = ref("");
const password_confirm = ref("");
const changePass = ref(false);

const errors = reactive({
  mobile: "",
  password: "",
  presenter: "",
});

const loading = ref(false);
const formStep = ref("getMobile"); // getMobile | otp | password | changePassword | presenter
const mobileExist = ref(false);
const lastCheckedMobile = ref(null);
const otpKey = ref(0);
const skipOtpSend = ref(false);
const otpTimer = ref(200);
const otpInterval = ref(null);
const otpAlreadySent = ref(false);
const verificationCode = ref(false);

const allowRegister = ref(true);
const allowLoginWithPassword = ref(true);
const logoSrc = ref("/logo/mahlin-lockup.png");
const getPresenter = ref(false);
const backTo = ref("/");

const getMobileInput = ref(null);
const getPresenterInput = ref(null);

/* --- UI helper state (فقط برای ظاهر، منطق اصلی رو تغییر نمی‌ده) --- */
const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const stepOrder = ["getMobile", "otp", "password", "changePassword", "presenter"];
const stepIndex = computed(() => {
  const idx = stepOrder.indexOf(formStep.value);
  return idx === -1 ? 0 : idx;
});
const progressPercent = computed(() => (stepIndex.value / (stepOrder.length - 1)) * 100);

const stepMeta = computed(() => {
  switch (formStep.value) {
    case "otp":
      return { title: "کد تایید را وارد کنید", subtitle: "کد ۵ رقمی ارسال شده را وارد نمایید" };
    case "password":
      return { title: "رمز عبور خود را وارد کنید", subtitle: "برای ورود امن، رمز عبورتان را وارد کنید" };
    case "changePassword":
      return { title: "تغییر رمز عبور", subtitle: "یک رمز عبور قوی و امن انتخاب کنید" };
    case "presenter":
      return { title: "ثبت معرف", subtitle: "در صورت داشتن معرف، شماره را وارد کنید" };
    default:
      return { title: allowRegister.value ? "ورود | ثبت‌نام" : "ورود", subtitle: "به دنیای ماهلین خوش آمدید" };
  }
});

onMounted(() => {
  if (props.additional && props.additional !== "") {
    try {
      const obj = JSON.parse(props.additional);
      allowRegister.value = obj.allowRegister === "true";
      allowLoginWithPassword.value = obj.allowLoginWithPassword === "true";
      backTo.value = obj.routeAfterLogin && obj.routeAfterLogin !== "" ? obj.routeAfterLogin : backTo.value;
      logoSrc.value = obj.logoSrc && obj.logoSrc !== "" ? obj.logoSrc : logoSrc.value;
      getPresenter.value = obj.getPresenter === "true";
    } catch (e) {
      /* ignore malformed additional config */
    }
  }
  if (route.query.back) {
    backTo.value = route.query.back;
  }
  getUserInfo();
});

const startOtpTimer = () => {
  if (otpInterval.value) clearInterval(otpInterval.value);
  otpTimer.value = 200;
  otpInterval.value = setInterval(() => {
    if (otpTimer.value <= 0) {
      clearInterval(otpInterval.value);
    } else {
      otpTimer.value -= 1;
    }
  }, 1000);
};

const resetOtpForNewMobile = () => {
  skipOtpSend.value = false;
  otpAlreadySent.value = false;
  otpKey.value++;
  if (otpInterval.value) {
    clearInterval(otpInterval.value);
    otpInterval.value = null;
  }
  otpTimer.value = 200;
};

const convertPersianToEnglish = (str) =>
  str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());

const goToForgetPassword = () => {
  changePass.value = true;
  skipOtpSend.value = false;
  otpKey.value++;
  formStep.value = "otp";
};

const checkUser = async () => {
  errors.mobile = !mobile.value ? t("required") : "";
  if (errors.mobile) return;

  loading.value = true;
  const phoneRegex = /^09\d{9}$/;
  mobile.value = convertPersianToEnglish(mobile.value || "");

  if (!phoneRegex.test(mobile.value)) {
    loading.value = false;
    errors.mobile = "فرمت شماره موبایل نادرست است";
    return;
  }

  if (lastCheckedMobile.value === mobile.value) {
    loading.value = false;
    skipOtpSend.value = true;
    formStep.value = mobileExist.value ? "password" : "otp";
    return;
  }

  resetOtpForNewMobile();
  useGarnetApiFetch("users/isUserByMobile", { mobile: mobile.value })
    .then((response) => {
      loading.value = false;
      switch (response.code) {
        case 2000: // کاربر وجود دارد
          lastCheckedMobile.value = mobile.value;
          otpAlreadySent.value = false;
          skipOtpSend.value = true;
          otpKey.value++;
          mobileExist.value = true;
          formStep.value = "password";
          break;
        case 2002: // کاربر جدید
          lastCheckedMobile.value = mobile.value;
          skipOtpSend.value = false;
          otpKey.value++;
          mobileExist.value = false;
          if (allowRegister.value) {
            formStep.value = "otp";
          } else {
            toast.error(t("mobile_not_exist"));
          }
          break;
        case 2001: // مسدود
          mobileExist.value = false;
          toast.error(t(response.msg));
          break;
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.error(t(error));
    });
};

function submitLogin() {
  errors.password = !password.value ? t("required") : "";
  errors.mobile = !mobile.value ? t("required") : "";
  if (errors.mobile || errors.password) return;

  loading.value = true;
  useGarnetApiFetch("auth/loginMobile", { mobile: mobile.value, password: password.value })
    .then(async (response) => {
      if (response.code === 2000) {
        customizer.token = response.token;
        customizer.Set_Token(response.token);
        customizer.Set_Auth(true);
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("g-auth-token", response.token);
        } else if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("g-auth-token", response.token);
        }

        const user = response?.userInfo ?? response?.User;
        if (user) {
          customizer.userInfo = user;
        } else {
          const userResponse = await useGarnetApiFetch("users/userInfo");
          const fetchedUser = userResponse?.User ?? userResponse?.userInfo;
          if (!fetchedUser) {
            throw new Error(userResponse?.error?.message || "اطلاعات کاربر دریافت نشد");
          }
          customizer.userInfo = fetchedUser;
        }
        customizer.auth = true;
        router.push(backTo.value);
      } else {
        toast.error(t(response.error));
      }
    })
    .catch((error) => {
      toast.error(t(error));
    })
    .finally(() => {
      loading.value = false;
    });
}

const changePassword = () => {
  errors.password = !password.value ? t("required") : "";

  // بررسی حداقل طول رمز عبور
  if (!errors.password && password.value.length < 8) {
    errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
  }

  if (errors.password) return;

  if (password.value !== password_confirm.value) {
    toast.error("تکرار کلمه عبور مشابه نیست");
    return;
  }

  loading.value = true;
  useGarnetApiFetch("users/forgetPasswordByVerificationCode", {
    mobile: mobile.value,
    password: password.value,
    verificationCode: verificationCode.value,
  })
    .then((response) => {
      loading.value = false;
      switch (response.code) {
        case 2000:
          toast.success("رمز عبور با موفقیت ثبت شد");
          if (getPresenter.value) {
            formStep.value = "presenter";
          } else {
            router.push(backTo.value);
          }
          break;
        case 2001:
          toast.error("کد احراز صحیح نیست");
          break;
        case 2002:
          toast.error("پارامتر های ارسالی صحیح نیست");
          break;
        case 2003:
          toast.error("کاربر یافت نشد یا اجازه ورود به این بخش را ندارد");
          break;
        default:
          toast.error(t(response.error));
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.error(t(error));
    });
};

const verificationCodePassed = (e) => {
  if (!mobileExist.value) {
    verificationCode.value = e;
    formStep.value = "changePassword";
  } else if (getPresenter.value) {
    formStep.value = "presenter";
  } else {
    router.push(backTo.value);
  }
};

const verificationCodePassedForget = (e) => {
  formStep.value = "changePassword";
  verificationCode.value = e;
  changePass.value = false;
};

const getUserInfo = () => {
  let token = "";
  if (typeof localStorage !== "undefined") token = localStorage.getItem("g-auth-token");
  else if (typeof sessionStorage !== "undefined") token = sessionStorage.getItem("g-auth-token");
  if (!token) return;

  useGarnetApiFetch("users/userInfo")
    .then((response) => {
      const user = response?.User ?? response?.userInfo;
      if (!user) {
        throw new Error(response?.error?.message || "اطلاعات کاربر دریافت نشد");
      }

      if (user.status === 0) {
        customizer.userInfo = [];
        customizer.auth = false;
        localStorage.removeItem("g-auth-token");
        sessionStorage.removeItem("g-auth-token");
      } else {
        customizer.userInfo = user;
        customizer.auth = true;
        router.push(backTo.value);
      }
    })
    .catch((error) => {
      toast.error(t(error));
    });
};

const setPresenter = async () => {
  errors.presenter = "";
  loading.value = true;
  const phoneRegex = /^09\d{9}$/;
  presenter.value = convertPersianToEnglish(presenter.value || "");
  if (!phoneRegex.test(presenter.value)) {
    loading.value = false;
    errors.presenter = "فرمت شماره موبایل معرف نادرست است";
    return;
  }

  useGarnetApiFetch("users/setPresenterByMobile", { mobile: presenter.value })
    .then((response) => {
      loading.value = false;
      switch (response.code) {
        case 2000:
          toast.success("معرف ثبت شد.");
          router.push(backTo.value);
          break;
        case 2002:
          toast.error("شماره موبایل معرف وجود ندارد");
          break;
        case 2001:
          toast.error(t(response.msg));
          break;
      }
    })
    .catch((error) => {
      loading.value = false;
      toast.error(t(error));
    });
};
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-cream to-orange-50 px-4 py-10 font-body"
    dir="rtl"
  >
    <!-- بلاب‌های تزئینی پس‌زمینه -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-blob"></div>
      <div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 w-full max-w-[440px]">
      <div
        class="animate-card-in overflow-hidden rounded-[2rem] border border-white/60 bg-cardLight/90 shadow-2xl shadow-accent/10 backdrop-blur-xl"
      >
        <!-- نوار پیشرفت -->
        <div class="h-1 w-full bg-ink/5">
          <div
            class="h-full bg-gradient-to-l from-accent to-accentHover transition-all duration-500 ease-out"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>

        <!-- هدر مشترک -->
        <div class="flex flex-col items-center px-7 pt-8">
          <div class="relative mb-4">
            <span class="absolute inset-0 -z-10 animate-ping-slow rounded-full bg-accent/10"></span>
            <img :src="logoSrc" alt="ماهلین" class="h-12 w-auto drop-shadow-sm" />
          </div>

          <!-- آیکون هر مرحله -->
          <Transition name="pop" mode="out-in">
            <div
              :key="formStep"
              class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 text-accent"
            >
              <svg v-if="formStep === 'getMobile'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="7" y="2" width="10" height="20" rx="2" />
                <path d="M11 18h2" stroke-linecap="round" />
              </svg>
              <svg v-else-if="formStep === 'otp'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else-if="formStep === 'password'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              <svg v-else-if="formStep === 'changePassword'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <circle cx="8" cy="14" r="4" />
                <path d="M11 11l8-8m0 0h-4m4 0v4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <circle cx="9" cy="8" r="3" />
                <path d="M2 21v-1a6 6 0 016-6h2a6 6 0 016 6v1" />
                <path d="M17 11a3 3 0 100-6" />
                <path d="M22 21v-1a5 5 0 00-3-4.6" />
              </svg>
            </div>
          </Transition>

          <Transition name="fade-slide" mode="out-in">
            <div :key="formStep + '-title'" class="text-center">
              <h1 class="text-lg font-bold text-ink">{{ stepMeta.title }}</h1>
              <p class="mt-1 text-xs text-inkSoft">{{ stepMeta.subtitle }}</p>
            </div>
          </Transition>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <!-- 1) دریافت شماره موبایل -->
          <div v-if="formStep === 'getMobile'" key="getMobile" class="px-7 pb-8 pt-6">
            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                  </svg>
                </span>
                
                <input
                  ref="getMobileInput"
                  v-model="mobile"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9۰-۹]*"
                  dir="ltr"
                  maxlength="11"
                  placeholder="09xxxxxxxx"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-4 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.mobile ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  @keyup="errors.mobile = ''"
                  @keyup.enter="checkUser()"
                />
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.mobile" class="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16h.01" />
                  </svg>
                  {{ errors.mobile }}
                </p>
              </Transition>
            </div>

            <button
              type="button"
              :disabled="loading"
              class="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] disabled:opacity-60"
              @click="checkUser()"
            >
              <span class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"></span>
              <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">ادامه</span>
              <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="relative z-10 transition-transform group-hover:-translate-x-1">
                <path d="M10 6l-6 6 6 6M4 12h16" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div class="mt-6 flex items-center justify-center gap-1.5 text-xs text-inkSoft/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              ورود شما به معنای پذیرش قوانین حریم‌ خصوصی است
            </div>
          </div>

          <!-- 2) کد تایید -->
          <div v-else-if="formStep === 'otp'" key="otp" class="px-7 pb-8 pt-2">
            <button
              type="button"
              class="mb-4 flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-inkSoft transition hover:bg-ink/5 hover:text-ink mr-auto"
              @click="formStep = 'getMobile'"
            >
              بازگشت
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M14 6l-6 6 6 6" />
              </svg>
            </button>

            <p v-if="mobileExist" class="mb-5 text-center text-sm leading-6 text-inkSoft">
              کد تایید برای شماره
              <span class="font-medium text-ink" dir="ltr">{{ mobile }}</span>
              پیامک شد
            </p>
            <p v-else class="mb-5 text-center text-sm leading-6 text-inkSoft">
              حساب کاربری با شماره موبایل
              <span class="font-medium text-ink" dir="ltr">{{ mobile }}</span>
              وجود ندارد. کد تایید برای این شماره ارسال گردید.
            </p>

            <div class="rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-4">
              <LoginOtpInput
                v-if="changePass"
                :key="`otp-forget-${otpKey}`"
                :fields="5"
                :target="mobile"
                :call-back-token="!changePass"
                send-type="ByMobile"
                :skip-initial-send="skipOtpSend"
                :timer-value="otpTimer"
                @on-send-code="startOtpTimer"
                @handle-complete="verificationCodePassedForget"
              />
              <LoginOtpInput
                v-else
                :key="`otp-login-${otpKey}`"
                :fields="5"
                :target="mobile"
                :call-back-token="!changePass"
                send-type="ByMobile"
                :with-cart="false"
                :skip-initial-send="skipOtpSend"
                :timer-value="otpTimer"
                @on-send-code="startOtpTimer"
                @handle-complete="verificationCodePassed"
              />
            </div>

            <button
              v-if="mobileExist && !changePass && allowLoginWithPassword"
              type="button"
              class="mt-6 flex w-full items-center justify-center gap-1.5 text-sm text-inkSoft transition hover:text-accent"
              @click="formStep = 'password'"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              ورود با رمز عبور
            </button>
          </div>

          <!-- 3) رمز عبور -->
          <div v-else-if="formStep === 'password'" key="password" class="px-7 pb-8 pt-2">
            <p class="mb-6 text-center text-sm text-inkSoft">
              ورود با شماره
              <span class="font-medium text-ink" dir="ltr">{{ mobile }}</span>
              <button type="button" class="mr-1 text-accent hover:underline" @click="formStep = 'getMobile'">ویرایش</button>
            </p>

            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" />
                  </svg>
                </span>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="رمز عبور"
                  dir="ltr"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-11 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.password ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  @keyup="errors.password = ''"
                  @keyup.enter="submitLogin()"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 left-3 flex items-center text-inkSoft/60 hover:text-accent"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-5.94M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24" />
                    <path d="M1 1l22 22" />
                  </svg>
                </button>
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
              </Transition>
            </div>

            <button
              type="button"
              class="mb-5 mt-3 block w-full text-center text-sm text-inkSoft transition hover:text-accent"
              @click="goToForgetPassword"
            >
              فراموشی رمز عبور
            </button>

            <button
              type="button"
              :disabled="loading"
              class="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] disabled:opacity-60"
              @click="submitLogin()"
            >
              <span class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"></span>
              <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">ورود</span>
            </button>

            <div class="mt-6 flex items-center justify-center gap-1.5 text-xs text-inkSoft/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              ورود شما به معنای پذیرش قوانین حریم‌ خصوصی است
            </div>
          </div>

          <!-- 4) تغییر رمز عبور -->
          <div v-else-if="formStep === 'changePassword'" key="changePassword" class="px-7 pb-8 pt-2">
            <p class="mb-5 flex items-center justify-center gap-1.5 text-center text-xs text-inkSoft">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
              </svg>
              رمز عبور باید حداقل ۸ حرفی باشد
            </p>

            <div class="mb-3">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <circle cx="8" cy="14" r="4" /><path d="M11 11l8-8m0 0h-4m4 0v4" />
                  </svg>
                </span>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="رمز عبور جدید"
                  dir="ltr"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-11 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.password ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  @keyup="errors.password = ''"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 left-3 flex items-center text-inkSoft/60 hover:text-accent"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-5.94M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24" />
                    <path d="M1 1l22 22" />
                  </svg>
                </button>
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
              </Transition>
            </div>

            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <circle cx="8" cy="14" r="4" /><path d="M11 11l8-8m0 0h-4m4 0v4" />
                  </svg>
                </span>
                <input
                  v-model="password_confirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  placeholder="تکرار رمز عبور جدید"
                  dir="ltr"
                  class="w-full rounded-2xl border border-ink/10 bg-white/70 py-3.5 pl-11 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 left-3 flex items-center text-inkSoft/60 hover:text-accent"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                >
                  <svg v-if="!showPasswordConfirm" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-5.94M9.9 4.24A10.4 10.4 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24" />
                    <path d="M1 1l22 22" />
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="button"
              :disabled="loading"
              class="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] disabled:opacity-60"
              @click="changePassword()"
            >
              <span class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"></span>
              <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">تغییر رمز</span>
            </button>
          </div>

          <!-- 5) ثبت معرف -->
          <div v-else-if="formStep === 'presenter'" key="presenter" class="px-7 pb-8 pt-2">
            <div class="mb-2">
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-inkSoft/60">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                    <circle cx="9" cy="8" r="3" /><path d="M2 21v-1a6 6 0 016-6h2a6 6 0 016 6v1" />
                  </svg>
                </span>
                <input
                  ref="getPresenterInput"
                  v-model="presenter"
                  type="text"
                  inputmode="numeric"
                  dir="ltr"
                  placeholder="شماره موبایل معرف"
                  class="w-full rounded-2xl border bg-white/70 py-3.5 pl-4 pr-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-inkSoft/50"
                  :class="errors.presenter ? 'border-red-400 focus:ring-4 focus:ring-red-100' : 'border-ink/10 focus:border-accent focus:ring-4 focus:ring-accent/10'"
                  @keyup="errors.presenter = ''"
                />
              </div>
              <Transition name="fade-slide">
                <p v-if="errors.presenter" class="mt-1.5 text-xs text-red-500">{{ errors.presenter }}</p>
              </Transition>
            </div>

            <button
              type="button"
              :disabled="loading"
              class="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-accent to-accentHover py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98] disabled:opacity-60"
              @click="setPresenter()"
            >
              <span class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"></span>
              <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span v-else class="relative z-10">بررسی</span>
            </button>

            <button
              type="button"
              class="mt-5 block w-full text-center text-sm text-inkSoft transition hover:text-accent"
              @click="router.push(backTo.value)"
            >
              معرف ندارم
            </button>
          </div>
        </Transition>
      </div>

      <p class="mt-6 text-center text-xs text-inkSoft/70">
        © {{ new Date().getFullYear() }} ماهلین — تمامی حقوق محفوظ است
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.6) rotate(-10deg);
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-card-in {
  animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}
.animate-blob {
  animation: blob 10s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes pingSlow {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }

  75%, 100% {
    transform: scale(1.8);
    opacity: 0;
  }
}
.animate-ping-slow {
  animation: pingSlow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>