<template>
  <!-- لودینگ خطی بالای صفحه -->
  <NuxtLoadingIndicator :height="5" />

  <Toaster rich-colors position="bottom-center" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css';

const customizer = useCustomizerStore();

// ─── دریافت اطلاعات کاربر ────────────────────────────────
async function getUserInfo() {
  if (!import.meta.client) return;

  customizer.userInfoLoading = true;

  // توکن نداره (یا خرابه) — مطمئناً لاگین نیست
  if (!getAuthToken()) {
    customizer.auth = false;
    customizer.userInfoLoading = false;
    return;
  }

  try {
    const response = await useGarnetApiFetch('users/userInfo');

    // 401 (توکن نامعتبر) داخل useGarnetApiFetch هندل شده: توکن پاک و در صورت نیاز ریدایرکت
    if (isUnauthorizedResponse(response)) return;

    const user = response?.User ?? response?.userInfo;

    if (user?.status === 0) {
      // حساب غیرفعاله
      authLogout();
    } else if (user) {
      customizer.userInfo  = user;
      customizer.auth      = true;
    }
    // خطای شبکه/سرور: توکن را نگه می‌داریم؛ قطعی موقت اینترنت نباید کاربر را خارج کند
  } catch (error) {
    console.error('[app] getUserInfo failed', error);
  } finally {
    customizer.userInfoLoading = false;
  }
}

// ─── فقط در client، بعد از hydration ─────────────────────
onMounted(() => {
  getUserInfo();
});
</script>