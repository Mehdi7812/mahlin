<template>
  <div class="flex flex-col gap-5">
    <h2 class="font-display text-xl md:text-2xl text-ink">اطلاعات حساب</h2>

    <div class="grid lg:grid-cols-3 gap-5">
      <!-- کارت آواتار -->
      <div class="rounded-[22px] border border-ink/[0.06] bg-cardLight p-6 flex flex-col items-center text-center h-fit">
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-accent/10 text-accent flex items-center justify-center font-display text-3xl">
            {{ initials }}
          </div>
          <button
            type="button"
            class="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-ink text-cream grid place-items-center border-2 border-cardLight hover:bg-accent transition-colors"
            aria-label="تغییر تصویر پروفایل"
          >
            <Icon name="tabler:camera" class="text-[14px]" />
          </button>
        </div>
        <p class="mt-4 font-bold text-ink text-[15px]">{{ USER.full_name }}</p>
        <p class="text-[12px] text-inkSoft mt-1 font-latin" dir="ltr">{{ USER.mobile }}</p>

        <!-- <div class="mt-4 flex items-center gap-1.5 text-[11.5px] font-bold text-gold bg-gold/10 px-3 py-1.5 rounded-full">
          <Icon name="tabler:crown" class="text-[13px]" />
          سطح {{ USER.level }}
        </div> -->

        <p class="mt-4 text-[11.5px] text-inkSoft">عضو ماهلین از {{ faDate(USER.member_since) }}</p>
      </div>

      <!-- فرم اطلاعات -->
      <div class="lg:col-span-2 rounded-[22px] border border-ink/[0.06] bg-cardLight p-6">
        <h3 class="flex items-center gap-2 font-bold text-ink text-[14px] mb-5">
          <Icon name="tabler:id" class="text-accent" />
          مشخصات فردی
        </h3>

        <form class="grid sm:grid-cols-2 gap-4" @submit.prevent>
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
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-[12px] font-bold text-inkSoft">نوع پوست</label>
            <select v-model="form.skin_type" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent transition-colors">
              <option value="normal">نرمال</option>
              <option value="dry">خشک</option>
              <option value="oily">چرب</option>
              <option value="combination">مختلط</option>
              <option value="sensitive">حساس</option>
            </select>
          </div>

          <div class="sm:col-span-2 flex justify-end gap-2 pt-2">
            <button type="reset" class="px-5 py-2.5 rounded-full border border-ink/10 text-[13px] font-bold text-inkSoft hover:bg-ink/5 transition-colors">
              انصراف
            </button>
            <button type="submit" class="px-6 py-2.5 rounded-full bg-accent text-cream text-[13px] font-bold hover:bg-accentHover transition-colors">
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
import { reactive, computed } from 'vue';
import { USER } from '~/data/account';
import { faDate } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'اطلاعات حساب | ماهلین اسکین‌کر' });

const form = reactive({
  first_name: USER.first_name,
  last_name: USER.last_name,
  mobile: USER.mobile,
  birth_date: '',
  skin_type: 'combination',
});

const initials = computed(() => (USER.first_name?.[0] || '') + (USER.last_name?.[0] || ''));
</script>
