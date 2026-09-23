// app/utils/auth.ts
// ─── مدیریت متمرکز توکن و خروج از حساب ─────────────────────
// همه‌ی جاهایی که با توکن کار می‌کنند باید از این توابع استفاده کنند،
// نه مستقیم از localStorage.

import { toast } from 'vue-sonner'
import type { RouteLocationNormalized } from 'vue-router'

export const AUTH_TOKEN_KEY = 'g-auth-token'

/** توکن JWT معتبر باید دقیقاً ۳ بخش جدا شده با نقطه داشته باشد */
export function isValidJwt(token: unknown): token is string {
  if (typeof token !== 'string') return false
  const parts = token.trim().split('.')
  return parts.length === 3 && parts.every((p) => /^[A-Za-z0-9_\-=]+$/.test(p))
}

/**
 * توکن را برمی‌گرداند؛ اگر مقدار ذخیره‌شده خراب باشد
 * (مثل "undefined" یا "null") همان‌جا پاکش می‌کند و null برمی‌گرداند.
 */
export function getAuthToken(): string | null {
  if (!import.meta.client) return null

  const raw = localStorage.getItem(AUTH_TOKEN_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_KEY)
  if (raw === null) return null

  if (!isValidJwt(raw)) {
    clearAuthToken()
    return null
  }
  return raw.trim()
}

/** فقط توکن معتبر ذخیره می‌شود؛ خروجی نشان می‌دهد ذخیره انجام شد یا نه */
export function setAuthToken(token: unknown): boolean {
  if (!import.meta.client || !isValidJwt(token)) return false
  localStorage.setItem(AUTH_TOKEN_KEY, token.trim())
  return true
}

export function clearAuthToken() {
  if (!import.meta.client) return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  sessionStorage.removeItem(AUTH_TOKEN_KEY)
}

/** آیا پاسخ/خطای API نشان‌دهنده‌ی توکن نامعتبر است؟ */
export function isUnauthorizedResponse(res: any): boolean {
  if (!res || typeof res !== 'object') return false
  return res.code === 401 || res.statusCode === 401 || res.status === 401
}

/** صفحاتی که بدون لاگین نباید باز شوند */
export function requiresAuth(route: Pick<RouteLocationNormalized, 'path' | 'meta'>): boolean {
  return (
    route.path.startsWith('/account') ||
    route.meta?.layout === 'account' ||
    route.meta?.requiresAuth === true
  )
}

/** پاک کردن کامل وضعیت لاگین (توکن + استور) و در صورت نیاز انتقال */
export function authLogout(options: { redirectTo?: string } = {}) {
  clearAuthToken()

  const customizer = useCustomizerStore()
  customizer.auth = false
  customizer.token = null
  customizer.userInfo = []
  customizer.cartCount = 0

  if (options.redirectTo) {
    return navigateTo(options.redirectTo)
  }
}

// جلوگیری از چند بار logout/redirect وقتی چند درخواست همزمان 401 می‌گیرند
let unauthorizedHandling = false

/**
 * واکنش به 401: خروج از حساب، و اگر کاربر در صفحه‌ی محافظت‌شده است
 * انتقال به لاگین با ?back= تا بعد از ورود به همان صفحه برگردد.
 */
export function handleUnauthorized() {
  if (!import.meta.client || unauthorizedHandling) return
  unauthorizedHandling = true
  setTimeout(() => {
    unauthorizedHandling = false
  }, 1500)

  const wasLoggedIn = useCustomizerStore().auth
  const route = useRouter().currentRoute.value

  authLogout()

  if (route.path.startsWith('/login')) return

  if (requiresAuth(route)) {
    toast.error('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.')
    return navigateTo(`/login?back=${encodeURIComponent(route.fullPath)}`, { replace: true })
  }

  if (wasLoggedIn) {
    toast.warning('از حساب کاربری خارج شدید. لطفاً دوباره وارد شوید.')
  }
}
