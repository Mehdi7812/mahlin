// app/middleware/auth.global.ts
// ─── گارد صفحات اکانت ───────────────────────────────────────
// اگه کاربر توکن نداشت (لاگین نیست) و می‌خواد وارد /account بشه،
// می‌فرستیمش به صفحه‌ی لاگین.
// چون توکن توی localStorage/sessionStorage ذخیره می‌شه (نه کوکی)،
// روی سرور در دسترس نیست؛ پس این چک فقط سمت کلاینت اجرا می‌شه
// (دقیقاً همون الگویی که توی app.vue برای auth استفاده شده).

export default defineNuxtRouteMiddleware((to) => {
  // فقط صفحات account رو گارد می‌کنیم
  if (!to.path.startsWith('/account')) return

  // سمت سرور توکن در دسترس نیست، رد می‌شیم
  if (import.meta.server) return

  const token =
    localStorage.getItem('g-auth-token') ||
    sessionStorage.getItem('g-auth-token')

  if (!token) {
    // با ?back= آدرس مقصد رو نگه می‌داریم تا بعد از لاگین برگرده همینجا
    return navigateTo(`/login?back=${encodeURIComponent(to.fullPath)}`)
  }
})