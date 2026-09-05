<template>
  <div class="min-h-screen flex flex-col bg-cream">
    <AppHeader />

    <main class="flex-1">
      <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-10 lg:flex lg:gap-8 lg:items-start">
        <AccountNav @logout="logoutDialog = true" />

        <div class="flex-1 min-w-0">
          <slot />
        </div>
      </div>
    </main>

    <AppFooter />

    <!-- مودال تایید خروج -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="logoutDialog"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 backdrop-blur-[2px] p-4"
          @click.self="logoutDialog = false"
        >
          <div class="w-full max-w-sm rounded-3xl bg-cardLight p-6 text-center shadow-2xl">
            <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
              <Icon name="tabler:logout-2" class="text-[24px]" />
            </div>
            <p class="mt-4 mb-1 text-[15px] font-bold text-ink">خروج از حساب کاربری</p>
            <p class="mb-5 text-[13px] text-inkSoft leading-6">
              آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
            </p>
            <div class="flex justify-center gap-2">
              <button
                type="button"
                class="flex-1 py-2.5 rounded-full border border-ink/10 text-[13px] font-bold text-inkSoft hover:bg-ink/5 transition-colors"
                @click="logoutDialog = false"
              >
                انصراف
              </button>
              <button
                type="button"
                class="flex-1 py-2.5 rounded-full bg-red-500 text-white text-[13px] font-bold hover:bg-red-600 transition-colors"
                @click="logout"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const logoutDialog = ref(false);
const router = useRouter();

function logout() {
  if (import.meta.client) {
    localStorage.removeItem('g-auth-token');
    window.dispatchEvent(new CustomEvent('auth-changed'));
  }
  logoutDialog.value = false;
  router.push('/');
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
