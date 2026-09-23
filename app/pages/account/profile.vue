<template>
  <div v-if="customizer.userInfoLoading" class="flex flex-col gap-5 animate-pulse" aria-busy="true">
    <div class="h-8 w-36 rounded-full bg-ink/10" />
    <div class="grid gap-5 lg:grid-cols-3">
      <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
        <div class="mx-auto h-24 w-24 rounded-full bg-ink/10" />
        <div class="mx-auto mt-4 h-4 w-28 rounded-full bg-ink/10" />
        <div class="mx-auto mt-2 h-3 w-20 rounded-full bg-ink/10" />
        <div class="mx-auto mt-4 h-3 w-32 rounded-full bg-ink/10" />
      </div>
      <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6 lg:col-span-2">
        <div class="mb-5 h-5 w-32 rounded-full bg-ink/10" />
        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="item in 6" :key="item" class="h-12 rounded-xl bg-ink/[0.06]" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col gap-5">
    <h2 class="font-display text-xl md:text-2xl text-ink">اطلاعات حساب</h2>

    <div class="grid lg:grid-cols-3 gap-5">
      <!-- کارت آواتار -->
      <div class="sticky top-20 rounded-[22px] border border-ink/[0.06] bg-cardLight p-6 flex flex-col items-center text-center h-fit">
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-accent/10 text-accent flex items-center justify-center font-display text-3xl overflow-hidden">
            <img v-if="currentUser.photo" :src="currentUser.photo" alt="تصویر پروفایل" class="w-full h-full object-cover" />
            <span v-else>{{ initials }}</span>
          </div>
          <button
            type="button"
            class="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-ink text-cream grid place-items-center border-2 border-cardLight hover:bg-accent transition-colors"
            aria-label="تغییر تصویر پروفایل"
            :disabled="fileLoading"
            @click="profileImageInput?.click()"
          >
            <Icon :name="fileLoading ? 'tabler:loader-2' : 'tabler:camera'" class="text-[14px]" :class="fileLoading && 'animate-spin'" />
          </button>
          <input ref="profileImageInput" type="file" accept="image/*" class="hidden" @change="uploadBox" />
        </div>
        <p class="mt-4 font-bold text-ink text-[15px]">{{ currentUser.full_name }}</p>
        <p class="text-[12px] text-inkSoft mt-1 font-latin" dir="ltr">0{{ currentUser.mobile }}</p>

        <!-- <div class="mt-4 flex items-center gap-1.5 text-[11.5px] font-bold text-gold bg-gold/10 px-3 py-1.5 rounded-full">
          <Icon name="tabler:crown" class="text-[13px]" />
          سطح {{ USER.level }}
        </div> -->

        <p class="mt-4 text-[11.5px] text-inkSoft">عضو ماهلین از {{ faDate(currentUser.register_date) }}</p>
      </div>

      <div class="lg:col-span-2 flex flex-col gap-5">
        <!-- فرم اطلاعات -->
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-5">
            <Icon name="tabler:id" class="text-accent" />
            مشخصات فردی
          </h3>
  
          <form class="grid sm:grid-cols-2 gap-4" @submit.prevent="saveProfile">
            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">نام</label>
              <input v-model="form.first_name" type="text" class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">نام خانوادگی</label>
              <input v-model="form.last_name" type="text" class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">شماره موبایل</label>
              <div class="relative">
                <input v-model="form.mobile" type="tel" dir="rtl" disabled class="w-full p-3.5 rounded-xl border border-ink/10 bg-ink/[0.03] text-[13px] text-inkSoft outline-none" />
                <span class="absolute inset-y-0 left-3 flex items-center text-[10.5px] text-sage font-bold">
                  <Icon name="tabler:circle-check" class="text-[13px]" />
                </span>
              </div>
            </div>
  
            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">تاریخ تولد</label>
              <ClientOnly>
                <div class="relative">
                  <input
                    id="birth-date-input"
                    type="text"
                    readonly
                    :value="birthDateDisplay"
                    placeholder="۱۳۷۰/۰۱/۰۱"
                    class="w-full p-3.5 pl-10 rounded-xl border border-ink/15 bg-white text-[13px] text-ink outline-none focus:border-accent transition-colors cursor-pointer"
                  />
                  <Icon
                    name="tabler:calendar-event"
                    class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-inkSoft text-[15px] place-self-center place-items-center"
                  />
                  <DatePicker
                    v-if="DatePicker"
                    v-model="form.birth_date"
                    type="date"
                    locale="fa"
                    simple
                    :max="maxBirthDate"
                    :min="minBirthDate"
                    format="YYYY-MM-DD"
                    display-format="jYYYY/jMM/jDD"
                    custom-input="#birth-date-input"
                  />
                </div>
                <template #fallback>
                  <input
                    type="text"
                    :value="form.birth_date"
                    placeholder="۱۳۷۰/۰۱/۰۱"
                    disabled
                    class="w-full p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none opacity-70"
                  />
                </template>
              </ClientOnly>
            </div>
  
            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">کد ملی</label>
              <input v-model="form.national_code" type="text" inputmode="numeric" maxlength="10" dir="ltr" class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors" />
            </div>
  
            <div class="flex flex-col gap-1.5">
              <label class="text-[12px] font-bold text-inkSoft">جنسیت</label>
              <div class="relative">
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-3 rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-[13px] text-ink outline-none transition-colors hover:border-accent"
                  @click="genderMenuOpen = !genderMenuOpen"
                >
                  <span>{{ selectedGenderLabel }}</span>
                  <Icon
                    name="tabler:chevron-down"
                    class="text-[15px] text-inkSoft transition-transform"
                    :class="genderMenuOpen && 'rotate-180'"
                  />
                </button>
  
                <div
                  v-if="genderMenuOpen"
                  class="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-ink/10 bg-cardLight shadow-[0_16px_28px_-16px_rgba(0,0,0,0.2)]"
                >
                  <button
                    v-for="option in genderOptions"
                    :key="option.value"
                    type="button"
                    class="flex w-full items-center justify-between px-3.5 py-2.5 text-right text-[13px] transition-colors"
                    :class="form.gender === option.value ? 'bg-accent/10 text-accent font-bold' : 'text-ink hover:bg-ink/[0.03]'"
                    @click="selectGender(option.value)"
                  >
                    <span>{{ option.label }}</span>
                    <span
                      v-if="form.gender === option.value"
                      class="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-cream"
                    >
                      <Icon name="tabler:check" class="text-[12px]" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <!-- <div class="flex flex-col gap-1.5 sm:col-span-2">
              <label class="text-[12px] font-bold text-inkSoft">نوع پوست</label>
              <select v-model="form.skin_type" class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors">
                <option value="normal">نرمال</option>
                <option value="dry">خشک</option>
                <option value="oily">چرب</option>
                <option value="combination">مختلط</option>
                <option value="sensitive">حساس</option>
              </select>
            </div> -->
  
            <div class="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" class="px-5 py-2.5 rounded-full border border-ink/10 text-[13px] font-bold text-inkSoft hover:bg-ink/5 transition-colors" @click="resetForm">
                انصراف
              </button>
              <button type="submit" :disabled="saving" class="px-6 py-2.5 rounded-full bg-accent text-cream text-[13px] font-bold hover:bg-accentHover transition-colors disabled:opacity-60">
                <Icon v-if="saving" name="tabler:loader-2" class="ml-1 inline-block animate-spin" />
                ذخیره تغییرات
              </button>
            </div>
          </form>
        </div>
        <!-- امنیت حساب -->
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-4">
            <Icon name="tabler:shield-lock" class="text-accent" />
            امنیت حساب
          </h3>
          <div class="flex flex-col gap-4 rounded-2xl bg-ink/[0.03] p-4">
            <div class="flex flex-col gap-3">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p class="text-[13px] font-bold text-ink">شماره شبا</p>
                  <p class="text-[11.5px] text-inkSoft mt-1">برای برداشت از کیف پول، شماره شبا خود را ثبت کنید.</p>
                </div>
                <button
                  type="button"
                  :disabled="bankSaveLoading"
                  class="shrink-0 px-5 py-2.5 rounded-full bg-accent text-cream text-[12.5px] font-bold hover:bg-accentHover transition-colors disabled:opacity-60"
                  @click="saveBankInfo"
                >
                  {{ bankSaveLoading ? 'در حال ثبت...' : 'ثبت شماره شبا' }}
                </button>
              </div>
    
              <div class="flex flex-col gap-1.5">
                <label class="text-[12px] font-bold text-inkSoft">شماره شبا</label>
                <input
                  v-model="bankForm.iban_number"
                  type="text"
                  inputmode="numeric"
                  dir="ltr"
                  placeholder="IRXXXXXXXXXXXXXX"
                  class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
    
        <!-- مدیریت رمز عبور -->
        <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
          <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-4">
            <Icon name="tabler:key" class="text-accent" />
            رمز عبور و ورود
          </h3>
          <div class="flex flex-col gap-4 rounded-2xl bg-ink/[0.03] p-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p class="text-[13px] font-bold text-ink">رمز عبور</p>
                <!-- <p class="text-[11.5px] text-inkSoft mt-1">برای امنیت بیشتر، رمز عبور خود را به‌طور دوره‌ای تغییر دهید.</p> -->
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="shrink-0 px-5 py-2.5 rounded-full border border-ink/15 text-[12.5px] font-bold text-ink hover:bg-ink/5 transition-colors"
                  @click="togglePasswordChange"
                >
                  {{ passwordChangeOpen ? 'بستن فرم' : 'تغییر رمز عبور' }}
                </button>
                <button
                  type="button"
                  class="shrink-0 px-5 py-2.5 rounded-full bg-accent text-cream text-[12.5px] font-bold hover:bg-accentHover transition-colors"
                  @click="openForgotPasswordFlow"
                >
                  فراموشی رمز عبور
                </button>
              </div>
            </div>
    
            <div v-if="passwordChangeOpen" class="rounded-2xl border border-ink/10 bg-cardLight p-4">
              <div class="grid gap-3">
                <div class="flex flex-col gap-1.5">
                  <label class="text-[12px] font-bold text-inkSoft">رمز عبور فعلی</label>
                  <input
                    v-model="passwordForm.oldPassword"
                    type="password"
                    placeholder="رمز عبور فعلی"
                    class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[12px] font-bold text-inkSoft">رمز عبور جدید</label>
                  <input
                    v-model="passwordForm.password"
                    type="password"
                    placeholder="حداقل ۶ کاراکتر"
                    class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[12px] font-bold text-inkSoft">تکرار رمز عبور جدید</label>
                  <input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    placeholder="حداقل ۶ کاراکتر"
                    class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
    
              <div class="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  class="px-4 py-2.5 rounded-full border border-ink/10 text-[12.5px] font-bold text-inkSoft hover:bg-ink/5 transition-colors"
                  @click="closePasswordChangeForm"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  :disabled="passwordSubmitLoading"
                  class="px-5 py-2.5 rounded-full bg-accent text-cream text-[12.5px] font-bold hover:bg-accentHover transition-colors disabled:opacity-60"
                  @click="submitPasswordChange"
                >
                  {{ passwordSubmitLoading ? 'در حال ذخیره...' : 'ذخیره رمز جدید' }}
                </button>
              </div>
            </div>
    
            <div v-if="forgotPasswordOpen" class="rounded-2xl border border-ink/10 bg-cardLight p-4">
              <div v-if="forgotPasswordStep === 'otp'" class="space-y-3">
                <p class="text-[12.5px] text-inkSoft">
                  کد تایید به شماره
                  <span class="font-bold text-ink" dir="ltr">{{ currentUser.mobile }}</span>
                  ارسال می‌شود.
                </p>
                <LoginOtpInput
                  :key="`forgot-password-otp-${forgotOtpKey}`"
                  :fields="5"
                  :target="currentUser.mobile || ''"
                  send-type="Forget"
                  @handle-complete="verificationCodePassedForget"
                />
              </div>
    
              <div v-else class="space-y-3">
                <div class="flex flex-col gap-1.5">
                  <label class="text-[12px] font-bold text-inkSoft">رمز عبور جدید</label>
                  <input
                    v-model="forgotPasswordForm.password"
                    type="password"
                    placeholder="حداقل ۶ کاراکتر"
                    class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[12px] font-bold text-inkSoft">تکرار رمز عبور جدید</label>
                  <input
                    v-model="forgotPasswordForm.confirmPassword"
                    type="password"
                    placeholder="تکرار رمز عبور جدید"
                    class="p-3.5 rounded-xl border border-ink/15 bg-white text-[13px] outline-none focus:border-accent transition-colors"
                  />
                </div>
    
                <div class="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    class="px-4 py-2.5 rounded-full border border-ink/10 text-[12.5px] font-bold text-inkSoft hover:bg-ink/5 transition-colors"
                    @click="closeForgotPasswordFlow"
                  >
                    انصراف
                  </button>
                  <button
                    type="button"
                    :disabled="forgotPasswordSubmitLoading"
                    class="px-5 py-2.5 rounded-full bg-accent text-cream text-[12.5px] font-bold hover:bg-accentHover transition-colors disabled:opacity-60"
                    @click="submitForgotPassword"
                  >
                    {{ forgotPasswordSubmitLoading ? 'در حال ثبت...' : 'ثبت رمز جدید' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { toast } from 'vue-sonner';
import { faDate } from '~/utils/format.ts';

const { t } = useI18n();

const DatePicker = ref(null);

if (import.meta.client) {
  const pickerModule = await import('vue3-persian-datetime-picker');
  DatePicker.value = pickerModule.default;
}

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'اطلاعات حساب | ماهلین اسکین‌کر' });

const customizer = useCustomizerStore();
const saving = ref(false);
const fileLoading = ref(false);
const profileImageInput = ref(null);
const passwordChangeOpen = ref(false);
const forgotPasswordOpen = ref(false);
const forgotPasswordStep = ref('otp');
const forgotPasswordSubmitLoading = ref(false);
const passwordSubmitLoading = ref(false);
const bankSaveLoading = ref(false);
const forgotVerificationCode = ref('');
const forgotOtpKey = ref(0);
const currentUser = computed(() => customizer.userInfo && !Array.isArray(customizer.userInfo)
  ? customizer.userInfo
  : {});

const bankForm = reactive({
  iban_number: '',
});

const passwordForm = reactive({
  oldPassword: '',
  password: '',
  confirmPassword: '',
});

const forgotPasswordForm = reactive({
  password: '',
  confirmPassword: '',
});

const form = reactive({
  first_name: '',
  last_name: '',
  mobile: '',
  national_code: '',
  gender: 1,
  birth_date: '',
  skin_type: 'combination',
});

const genderOptions = [
  { label: 'مرد', value: 0 },
  { label: 'زن', value: 1 },
];
const genderMenuOpen = ref(false);

const selectedGenderLabel = computed(() => {
  return genderOptions.find((option) => Number(option.value) === Number(form.gender))?.label || 'انتخاب جنسیت';
});

function selectGender(value) {
  form.gender = Number(value);
  genderMenuOpen.value = false;
}

function fillForm() {
  const user = currentUser.value;
  Object.assign(form, {
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
    mobile: user.mobile ?? '',
    national_code: user.national_code ?? '',
    gender: Number(user.gender ?? 1),
    birth_date: user.birth_date ?? '',
  });

  const ibanValue = user.customers?.irb_iban_number || user.irb_iban_number || user.iban_number || '';
  bankForm.iban_number = ibanValue;
}

function resetForm() {
  fillForm();
}

function togglePasswordChange() {
  passwordChangeOpen.value = !passwordChangeOpen.value;
  if (passwordChangeOpen.value) {
    forgotPasswordOpen.value = false;
  }
}

function closePasswordChangeForm() {
  passwordChangeOpen.value = false;
  passwordForm.oldPassword = '';
  passwordForm.password = '';
  passwordForm.confirmPassword = '';
}

function openForgotPasswordFlow() {
  passwordChangeOpen.value = false;
  forgotPasswordOpen.value = true;
  forgotPasswordStep.value = 'otp';
  forgotVerificationCode.value = '';
  forgotPasswordForm.password = '';
  forgotPasswordForm.confirmPassword = '';
  forgotOtpKey.value += 1;
}

function closeForgotPasswordFlow() {
  forgotPasswordOpen.value = false;
  forgotPasswordStep.value = 'otp';
  forgotVerificationCode.value = '';
  forgotPasswordForm.password = '';
  forgotPasswordForm.confirmPassword = '';
  forgotOtpKey.value += 1;
}

function verificationCodePassedForget(code) {
  forgotVerificationCode.value = code;
  forgotPasswordStep.value = 'new';
  toast.success('کد تایید پذیرفته شد');
}

function submitPasswordChange() {
  if (!passwordForm.oldPassword.trim()) {
    toast.error('رمز عبور فعلی را وارد کنید');
    return;
  }

  if (!passwordForm.password.trim() || passwordForm.password.length < 6) {
    toast.error('رمز عبور جدید باید حداقل ۶ کاراکتر باشد');
    return;
  }

  if (passwordForm.password !== passwordForm.confirmPassword) {
    toast.error('تکرار رمز عبور جدید با رمز جدید یکسان نیست');
    return;
  }

  passwordSubmitLoading.value = true;

  useGarnetApiFetch('users/updatePassword', {
    oldPassword: passwordForm.oldPassword,
    password: passwordForm.password,
  })
    .then((response) => {
      if (response?.code === 2000) {
        toast.success('رمز عبور با موفقیت تغییر کرد');
        closePasswordChangeForm();
      } else {
        toast.error(t(response?.msg) || t(response?.error) || 'رمز عبور فعلی اشتباه است یا تغییر رمز عبور انجام نشد');
      }
    })
    .catch((error) => {
      toast.error(t((error?.message) || t(error)) || 'خطا در تغییر رمز عبور');
    })
    .finally(() => {
      passwordSubmitLoading.value = false;
    });
}

function submitForgotPassword() {
  if (!forgotPasswordForm.password.trim() || forgotPasswordForm.password.length < 6) {
    toast.error('رمز عبور جدید باید حداقل ۶ کاراکتر باشد');
    return;
  }

  if (forgotPasswordForm.password !== forgotPasswordForm.confirmPassword) {
    toast.error('تکرار رمز عبور جدید با رمز جدید یکسان نیست');
    return;
  }

  if (!forgotVerificationCode.value) {
    toast.error('کد تایید معتبر نیست');
    return;
  }

  forgotPasswordSubmitLoading.value = true;

  useGarnetApiFetch('users/forgetPasswordByVerificationCode', {
    mobile: currentUser.value.mobile,
    password: forgotPasswordForm.password,
    verificationCode: forgotVerificationCode.value,
  })
    .then((response) => {
      if (response?.code === 2000) {
        toast.success('رمز عبور جدید با موفقیت ثبت شد');
        closeForgotPasswordFlow();
      } else {
        toast.error(t(response?.msg) || t(response?.error) || 'ثبت رمز عبور جدید انجام نشد');
      }
    })
    .catch((error) => {
      toast.error(t(error?.message) || t(error) || 'خطا در ثبت رمز عبور جدید');
    })
    .finally(() => {
      forgotPasswordSubmitLoading.value = false;
    });
}

function uploadBox(event) {
  const uploadedFiles = event.target.files;
  const myFile = uploadedFiles?.[0];

  if (!myFile) {
    toast.error('انتخاب فایل اجباری است.');
    event.target.value = '';
    return;
  }

  if (myFile.size > 2000000) {
    toast.error('حجم فایل باید کمتر از ۲ مگابایت باشد.');
    event.target.value = '';
    return;
  }

  fileLoading.value = true;
  const formData = new FormData();
  formData.append('file', myFile);
  formData.append('destinationFolder', 'cards');

  useGarnetApiFetch('uploadImage', formData, true)
    .then((response) => {
      const photo = response?.UploadedImages?.[0];
      if (!photo) {
        throw new Error(response?.msg || 'خطا در آپلود');
      }

      return useGarnetApiFetch('users/updatePhoto', { photo })
        .then((updateResponse) => ({ photo, updateResponse }));
    })
    .then(({ photo, updateResponse }) => {
      if (updateResponse?.code && updateResponse.code !== 2000) {
        throw new Error(updateResponse.msg || updateResponse.error || 'ذخیره تصویر انجام نشد');
      }

      customizer.userInfo = { ...customizer.userInfo, photo };
      toast.success('تصویر پروفایل با موفقیت به‌روزرسانی شد');
    })
    .catch((error) => {
      toast.error(t(error?.message) || t(error) || 'خطا در آپلود');
    })
    .finally(() => {
      fileLoading.value = false;
      event.target.value = '';
    });
}

function isValidShebaNumber(input) {
  if (!input) return false;

  let iban = String(input).trim().replace(/[\s-]/g, '');

  if (/^\d{24}$/.test(iban)) {
    iban = 'IR' + iban;
  }

  if (!/^IR\d{24}$/.test(iban)) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);

  let expanded = '';
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      expanded += String(code - 55);
    } else {
      expanded += ch;
    }
  }

  let remainder = 0;
  for (let i = 0; i < expanded.length; i++) {
    remainder = (remainder * 10 + (expanded.charCodeAt(i) - 48)) % 97;
  }

  return remainder === 1;
}

function saveBankInfo() {
  const ibanValue = bankForm.iban_number.trim();

  if (!ibanValue) {
    toast.error('شماره شبا خود را وارد کنید');
    return;
  }

  if (!isValidShebaNumber(ibanValue)) {
    toast.error('فرمت شماره شبا اشتباه می باشد');
    return;
  }

  bankSaveLoading.value = true;

  const normalizedIban = ibanValue.replace(/[\s-]/g, '');
  const sendData = {
    irb_iban_number: normalizedIban.startsWith('IR') ? normalizedIban : `IR${normalizedIban}`,
  };

  useGarnetApiFetch('users/updateIban', sendData)
    .then((response) => {
      if (response?.code === 2000) {
        const savedIban = response?.iban || sendData.irb_iban_number;

        customizer.userInfo = {
          ...customizer.userInfo,
          irb_iban_number: savedIban,
          iban_number: savedIban,
        };

        bankForm.iban_number = savedIban;
        toast.success('شماره شبا با موفقیت ثبت شد');
      } else {
        toast.error(t((response?.msg) || t(response?.error)) || 'خطا در ثبت شماره شبا');
      }
    })
    .catch((error) => {
      toast.error(t(error?.message) || t(error) || 'خطا در ثبت شماره شبا');
    })
    .finally(() => {
      bankSaveLoading.value = false;
    });
}

function saveProfile() {
  saving.value = true;
  const sendData = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      national_code: form.national_code.trim(),
      gender: form.gender,
      birth_date: form.birth_date.trim() || null,
      status: 1,
  };

  useGarnetApiFetch('users/updateImportant', sendData)
    .then((response) => {
      if (response.code === 2000) {
        toast.success('اطلاعات حساب با موفقیت به‌روزرسانی شد');
        customizer.userInfo = response.User;
        fillForm();
      } else {
        toast.error(t(response.msg) || t(response.error) || 'ذخیره اطلاعات انجام نشد');
      }
    })
    .catch((error) => {
      toast.error(t((error?.message) || t(error)) || 'خطا در ذخیره اطلاعات');
    })
    .finally(() => {
      saving.value = false;
    });
}

watch(() => customizer.userInfo, fillForm, { immediate: true });

const initials = computed(() => (currentUser.value.first_name?.[0] || ''));

function toGregorianStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const maxBirthDate = computed(() => toGregorianStr(new Date()));
const minBirthDate = computed(() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 100);
  return toGregorianStr(d);
});

function toJalaliDisplay(gregorianStr) {
  if (!gregorianStr) return '';
  const [y, m, d] = gregorianStr.split('-').map(Number);
  if (!y || !m || !d) return '';

  const utcDate = new Date(Date.UTC(y, m - 1, d));
  const parts = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).formatToParts(utcDate);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}/${get('month')}/${get('day')}`;
}

const birthDateDisplay = computed(() => toJalaliDisplay(form.birth_date));
</script>

<style>
/* باکس پاپ‌آپ تقویم/لیست‌ها (در حالت simple) */
.vpd-content,
.vpd-addon-wrapper {
  background: theme('colors.cardLight') !important;
  border: 1px solid theme('colors.ink / 8%') !important;
  border-radius: 18px !important;
  box-shadow: 0 18px 40px -20px rgba(0, 0, 0, .25) !important;
  overflow: hidden;
  font-family: inherit;
}

/* هدر (ماه/سال) */
.vpd-header {
  background: theme('colors.accent') !important;
  color: theme('colors.cream') !important;
}

/* روزهای تقویم */
.vpd-day-text {
  color: theme('colors.ink');
}
.vpd-day.vpd-selected .vpd-day-effect {
  background-color: theme('colors.accent') !important;
}
.vpd-day.vpd-selected .vpd-day-text {
  color: theme('colors.cream') !important;
}

/* آیتم‌های لیست در حالت simple (روز/ماه/سال) */
.vpd-addon-list-item {
  color: theme('colors.inkSoft');
}
.vpd-addon-list-item.vpd-selected {
  background-color: theme('colors.accent') !important;
  color: theme('colors.cream') !important;
  border-radius: 10px;
}

/* دکمه‌های پایین (امروز/تایید و ...) */
.vpd-actions button {
  color: theme('colors.accent') !important;
}
</style>