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

// ─── logout ──────────────────────────────────────────────
function logout() {
  if (import.meta.client) {
    localStorage.removeItem('g-auth-token');
    sessionStorage.removeItem('g-auth-token');
  }
  customizer.auth     = false;
  customizer.userInfo = null;
}

// ─── دریافت اطلاعات کاربر ────────────────────────────────
async function getUserInfo() {
  if (!import.meta.client) return;

  customizer.userInfoLoading = true;

  const token =
    localStorage.getItem('g-auth-token') ||
    sessionStorage.getItem('g-auth-token') ||
    null;

  // توکن نداره — مطمئناً لاگین نیست
  if (!token) {
    customizer.auth = false;
    customizer.userInfoLoading = false;
    return;
  }

  try {
    const response = await useGarnetApiFetch('users/userInfo');
    const user = response?.User ?? response?.userInfo;

    if (user?.status === 0) {
      // حساب غیرفعاله
      logout();
    } else if (user) {
      customizer.userInfo  = user;
      customizer.auth      = true;
      // customizer.cartCount = response.User.invoice_count;
    } else {
      logout();
    }
  } catch {
    logout();
  } finally {
    customizer.userInfoLoading = false;
  }
}

// ─── فقط در client، بعد از hydration ─────────────────────
onMounted(() => {
  getUserInfo();
});
</script>