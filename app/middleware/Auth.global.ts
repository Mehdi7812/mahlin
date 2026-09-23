// app/middleware/auth.global.ts
// ─── گارد صفحات نیازمند لاگین ────────────────────────────────
// صفحات /account، صفحاتی با layout: 'account' (مثل /tickets)
// و هر صفحه‌ای با definePageMeta({ requiresAuth: true }).
// توکن در localStorage است و روی سرور در دسترس نیست، پس فقط سمت کلاینت چک می‌شود.

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  if (!requiresAuth(to)) return

  // getAuthToken توکن‌های خراب مثل "undefined" را هم رد و پاک می‌کند
  if (!getAuthToken()) {
    return navigateTo(`/login?back=${encodeURIComponent(to.fullPath)}`)
  }
})
