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
      <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6 flex flex-col items-center text-center h-fit">
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
        <p class="text-[12px] text-inkSoft mt-1 font-latin" dir="ltr">{{ currentUser.mobile }}</p>

        <!-- <div class="mt-4 flex items-center gap-1.5 text-[11.5px] font-bold text-gold bg-gold/10 px-3 py-1.5 rounded-full">
          <Icon name="tabler:crown" class="text-[13px]" />
          سطح {{ USER.level }}
        </div> -->

        <p class="mt-4 text-[11.5px] text-inkSoft">عضو ماهلین از {{ faDate(currentUser.member_since) }}</p>
      </div>

      <!-- فرم اطلاعات -->
      <div class="lg:col-span-2 rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
        <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-5">
          <Icon name="tabler:id" class="text-accent" />
          مشخصات فردی
        </h3>

        <form class="grid sm:grid-cols-2 gap-4" @submit.prevent="saveProfile">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-bold text-inkSoft">نام</label>
            <input v-model="form.first_name" type="text" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent transition-colors" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-bold text-inkSoft">نام خانوادگی</label>
            <input v-model="form.last_name" type="text" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent transition-colors" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-bold text-inkSoft">شماره موبایل</label>
            <div class="relative">
              <input v-model="form.mobile" type="tel" dir="ltr" disabled class="w-full p-3.5 rounded-xl border border-ink/10 bg-ink/[0.03] text-[13px] text-inkSoft outline-none" />
              <span class="absolute inset-y-0 left-3 flex items-center text-[10.5px] text-sage font-bold">
                <Icon name="tabler:circle-check" class="text-[13px]" />
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-bold text-inkSoft">تاریخ تولد</label>
            <input v-model="form.birth_date" type="text" placeholder="۱۳۷۰/۰۱/۰۱" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent transition-colors" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-bold text-inkSoft">کد ملی</label>
            <input v-model="form.national_code" type="text" inputmode="numeric" maxlength="10" dir="ltr" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent transition-colors" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12px] font-bold text-inkSoft">جنسیت</label>
            <select v-model.number="form.gender" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent transition-colors">
              <option :value="0">مرد</option>
              <option :value="1">زن</option>
            </select>
          </div>
          <!-- <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-[12px] font-bold text-inkSoft">نوع پوست</label>
            <select v-model="form.skin_type" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent transition-colors">
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
    </div>

    <!-- امنیت حساب -->
    <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
      <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-4">
        <Icon name="tabler:shield-lock" class="text-accent" />
        امنیت حساب
      </h3>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-ink/[0.03] p-4">
        <div>
          <p class="text-[13px] font-bold text-ink">رمز عبور</p>
          <p class="text-[11.5px] text-inkSoft mt-1">برای امنیت بیشتر، رمز عبور خود را به‌طور دوره‌ای تغییر دهید.</p>
        </div>
        <button type="button" class="shrink-0 px-5 py-2.5 rounded-full border border-ink/15 text-[12.5px] font-bold text-ink hover:bg-ink/5 transition-colors">
          تغییر رمز عبور
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { toast } from 'vue-sonner';
import { faDate } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'اطلاعات حساب | ماهلین اسکین‌کر' });

const customizer = useCustomizerStore();
const saving = ref(false);
const fileLoading = ref(false);
const profileImageInput = ref(null);
const currentUser = computed(() => customizer.userInfo && !Array.isArray(customizer.userInfo)
  ? customizer.userInfo
  : {});

const form = reactive({
  first_name: '',
  last_name: '',
  mobile: '',
  national_code: '',
  gender: 1,
  birth_date: '',
  skin_type: 'combination',
});

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
}

function resetForm() {
  fillForm();
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
      toast.error(error?.message || error || 'خطا در آپلود');
    })
    .finally(() => {
      fileLoading.value = false;
      event.target.value = '';
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
        toast.error(response.msg || response.error || 'ذخیره اطلاعات انجام نشد');
      }
    })
    .catch((error) => {
      toast.error(error?.message || error || 'خطا در ذخیره اطلاعات');
    })
    .finally(() => {
      saving.value = false;
    });
}

watch(() => customizer.userInfo, fillForm, { immediate: true });

const initials = computed(() => (currentUser.value.first_name?.[0] || '') + (currentUser.value.last_name?.[0] || ''));
</script>
