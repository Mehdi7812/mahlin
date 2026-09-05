<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="font-display text-xl md:text-2xl text-ink">آدرس‌های من</h2>
        <p class="text-[12.5px] text-inkSoft mt-1">{{ faNumber(addresses.length) }} آدرس ثبت‌شده</p>
      </div>
      <button
        type="button"
        class="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-cream bg-accent px-5 py-2.5 rounded-full hover:bg-accentHover transition-colors"
        @click="addModalOpen = true"
      >
        <Icon name="tabler:plus" class="text-[16px]" />
        افزودن آدرس جدید
      </button>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <div
        v-for="addr in addresses"
        :key="addr.id"
        class="relative rounded-[20px] border p-5 transition-colors"
        :class="addr.is_default ? 'border-accent/40 bg-accent/[0.04]' : 'border-ink/[0.06] bg-cardLight'"
      >
        <span
          v-if="addr.is_default"
          class="absolute top-4 left-4 flex items-center gap-1 text-[10.5px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full"
        >
          <Icon name="tabler:star-filled" class="text-[11px]" />
          پیش‌فرض
        </span>

        <div class="flex items-center gap-2 mb-3">
          <span class="w-9 h-9 rounded-xl bg-ink/[0.05] flex items-center justify-center text-inkSoft shrink-0">
            <Icon :name="addr.title === 'خانه' ? 'tabler:home-2' : 'tabler:building-store'" class="text-[16px]" />
          </span>
          <p class="text-[14px] font-bold text-ink">{{ addr.title }}</p>
        </div>

        <p class="text-[12.5px] text-inkSoft leading-6">
          {{ addr.province }}، {{ addr.city }} — {{ addr.description }}
        </p>
        <p class="text-[11.5px] text-inkSoft/70 mt-2 font-latin" dir="ltr">کد پستی: {{ fa(addr.postal_code) }}</p>
        <p class="text-[11.5px] text-inkSoft mt-1">گیرنده: {{ addr.receiver_full_name }} — {{ fa(addr.receiver_mobile) }}</p>

        <div class="flex items-center gap-3 mt-4 pt-4 border-t border-ink/[0.06]">
          <button type="button" class="flex items-center gap-1 text-[12px] font-bold text-inkSoft hover:text-accent transition-colors">
            <Icon name="tabler:pencil" class="text-[13px]" />
            ویرایش
          </button>
          <button
            v-if="!addr.is_default"
            type="button"
            class="flex items-center gap-1 text-[12px] font-bold text-inkSoft hover:text-sage transition-colors"
          >
            <Icon name="tabler:check" class="text-[13px]" />
            انتخاب به‌عنوان پیش‌فرض
          </button>
          <button
            type="button"
            class="mr-auto flex items-center gap-1 text-[12px] font-bold text-inkSoft hover:text-red-500 transition-colors"
          >
            <Icon name="tabler:trash" class="text-[13px]" />
            حذف
          </button>
        </div>
      </div>

      <!-- کارت افزودن (موبایل / وقتی جا هست) -->
      <button
        type="button"
        class="flex sm:hidden flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-ink/15 py-8 text-inkSoft hover:border-accent/40 hover:text-accent transition-colors"
        @click="addModalOpen = true"
      >
        <Icon name="tabler:plus" class="text-[22px]" />
        <span class="text-[12.5px] font-bold">افزودن آدرس جدید</span>
      </button>
    </div>

    <!-- مودال افزودن آدرس (فقط نمایشی) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="addModalOpen"
          class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-[2px] p-0 sm:p-4"
          @click.self="addModalOpen = false"
        >
          <div class="w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-[24px] sm:rounded-3xl bg-cardLight p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="flex items-center gap-2 text-[15px] font-bold text-ink">
                <Icon name="tabler:map-pin-plus" class="text-accent" />
                آدرس جدید
              </h3>
              <button type="button" class="w-9 h-9 grid place-items-center rounded-full bg-ink/5 hover:bg-red-50 hover:text-red-500 transition-colors" @click="addModalOpen = false">
                <Icon name="tabler:x" class="text-[16px]" />
              </button>
            </div>

            <div class="flex flex-col gap-3.5">
              <input type="text" placeholder="عنوان آدرس (مثلا خانه)" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent" />
              <div class="grid grid-cols-2 gap-3">
                <input type="text" placeholder="استان" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent" />
                <input type="text" placeholder="شهر" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent" />
              </div>
              <textarea placeholder="آدرس کامل" rows="3" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent resize-none" />
              <div class="grid grid-cols-2 gap-3">
                <input type="text" inputmode="numeric" placeholder="کد پستی" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent" dir="ltr" />
                <input type="tel" placeholder="موبایل گیرنده" class="p-3.5 rounded-xl border border-ink/15 bg-cream text-[13px] outline-none focus:border-accent" dir="ltr" />
              </div>
              <button
                type="button"
                class="mt-1 py-3 rounded-full bg-accent text-cream text-[13px] font-bold hover:bg-accentHover transition-colors"
                @click="addModalOpen = false"
              >
                ذخیره آدرس
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- دکمه شناور موبایل -->
    <button
      type="button"
      class="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full shadow-xl text-[13px] font-bold"
      @click="addModalOpen = true"
    >
      <Icon name="tabler:plus" class="text-[16px]" />
      آدرس جدید
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ADDRESSES } from '~/data/account';
import { faNumber, fa } from '~/utils/format.ts';

definePageMeta({ layout: 'account' });
useSeoMeta({ title: 'آدرس‌های من | ماهلین اسکین‌کر' });

const addresses = ref(ADDRESSES);
const addModalOpen = ref(false);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
