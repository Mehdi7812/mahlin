<template>
  <Transition
    enter-active-class="transition-all duration-700 ease-[cubic-bezier(.2,1.15,.3,1)]"
    enter-from-class="opacity-0 translate-y-10 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-5 scale-95"
  >
    <!-- پوسته‌ی ثابت: موقعیت، ورود/خروج و کشیدن (بدون ظاهر) -->
    <aside
      v-if="visible"
      role="dialog"
      aria-live="polite"
      :aria-label="title"
      class="promo-card fixed z-40 bottom-3 inset-x-3 sm:inset-x-auto sm:start-5 sm:bottom-5 sm:w-[300px] touch-pan-y select-none"
      :class="{ 'is-dragging': dragging }"
      :style="cardStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <!-- خود کارت: بانس جلب‌توجه روی همین است -->
      <div
        class="card relative rounded-2xl border border-ink/[0.06] bg-white p-3.5 transition-shadow duration-300
               shadow-[0_1px_2px_rgba(63,58,53,0.04),0_12px_32px_-8px_rgba(63,58,53,0.16)]
               hover:shadow-[0_1px_2px_rgba(63,58,53,0.04),0_18px_44px_-8px_rgba(63,58,53,0.24)]"
      >
        <!-- حلقه‌ی جلب‌توجه که همزمان با بانس پخش می‌شود -->
        <span class="attn-ring pointer-events-none absolute -inset-px rounded-2xl border-2 border-accent/50" aria-hidden="true" />

        <!-- بستن -->
        <button
          type="button"
          class="absolute top-2.5 end-2.5 grid h-6 w-6 place-items-center rounded-full text-ink/35 transition-all duration-300 hover:rotate-90 hover:bg-ink/5 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent/40"
          aria-label="بستن"
          @click="dismiss"
        >
          <Icon name="tabler:x" class="text-sm" />
        </button>

        <!-- سربرگ -->
        <div class="flex items-start gap-2.5 pe-6">
          <span class="gift relative grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
            <span class="ring-ping absolute inset-0 rounded-lg bg-accent/25" aria-hidden="true" />
            <Icon name="tabler:gift" class="icon-wiggle relative text-[18px]" />
            <!-- نقطه‌ی اعلان -->
            <span class="absolute -top-1 -end-1 flex h-2.5 w-2.5" aria-hidden="true">
              <span class="dot-ping absolute inline-flex h-full w-full rounded-full bg-accent/70" />
              <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-white" />
            </span>
          </span>

          <div class="min-w-0">
            <h3 class="rise text-[13.5px] font-extrabold leading-6 text-ink" style="--d: 0.12s">{{ title }}</h3>
            <p class="rise text-[12px] leading-5 text-ink/60" style="--d: 0.2s">
              <template v-if="isLoggedIn">
                با این کد
                <b class="inline-block font-extrabold tabular-nums text-accent" :class="{ 'amount-pop': amountPop }">{{ faPriceBare(shownAmount) }} تومان</b>
                تخفیف بگیر.
              </template>
              <template v-else>
                برای اولین خریدت،
                <b class="inline-block font-extrabold tabular-nums text-accent" :class="{ 'amount-pop': amountPop }">{{ faPriceBare(shownAmount) }} تومان</b>
                کد تخفیف هدیه می‌گیری.
              </template>
            </p>
          </div>
        </div>

        <!-- کد تخفیف -->
        <button
          type="button"
          class="rise group relative mt-3 flex w-full items-center justify-between rounded-lg border border-dashed border-ink/15 bg-cream/60 px-3 py-1.5 transition-all duration-200 hover:border-accent/50 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent/40"
          style="--d: 0.3s"
          :aria-label="`کپی کد تخفیف ${DISCOUNT_CODE}`"
          @click="copyCode"
        >
          <span class="absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
            <span class="coupon-shine absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </span>
          <span class="relative font-latin text-[13px] font-bold tracking-[0.16em] text-ink" dir="ltr">{{ DISCOUNT_CODE }}</span>
          <span
            class="relative flex items-center gap-1 text-[11px] font-bold transition-colors"
            :class="copied ? 'text-emerald-600' : 'text-ink/45 group-hover:text-accent'"
          >
            <Icon :name="copied ? 'tabler:check' : 'tabler:copy'" class="text-sm" :class="copied ? 'check-pop' : ''" />
            {{ copied ? 'کپی شد' : 'کپی' }}

            <!-- کانفتی هنگام کپی -->
            <span
              v-for="p in bursts"
              :key="p.id"
              class="confetti"
              :class="p.c"
              :style="{ '--x': p.x + 'px', '--y': p.y + 'px', '--r': p.r + 'deg', width: p.s + 'px', height: p.s * 1.6 + 'px', animationDelay: p.d + 's' }"
              aria-hidden="true"
            />
          </span>
        </button>

        <!-- دکمه‌ها -->
        <div class="rise mt-2.5 flex items-center gap-1.5" style="--d: 0.4s">
          <div class="relative flex-1">
            <span class="cta-ping absolute inset-0 rounded-lg bg-accent" aria-hidden="true" />
            <NuxtLink
              :to="isLoggedIn ? '/shop' : '/login'"
              class="cta group relative flex w-full items-center justify-center gap-1 overflow-hidden rounded-lg bg-accent px-4 py-2 text-[12.5px] font-bold text-white transition-all duration-200 hover:bg-accentHover hover:shadow-md hover:shadow-accent/25 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
              @click="dismiss"
            >
              <span class="cta-shine pointer-events-none absolute inset-y-0 w-1/3 bg-white/25" aria-hidden="true" />
              <span class="relative">{{ isLoggedIn ? 'فروشگاه' : 'ساخت حساب' }}</span>
              <Icon name="tabler:arrow-left" class="arrow-nudge relative text-sm transition-transform duration-200 group-hover:-translate-x-1" />
            </NuxtLink>
          </div>

          <button
            type="button"
            class="rounded-lg px-2.5 py-2 text-[12px] font-bold text-ink/50 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent/40"
            @click="dismiss"
          >
            شاید بعداً
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

// ─── تنظیمات (اینجا تغییر بده) ─────────────────────────────
const DISCOUNT_CODE = 'WELCOME';              // کد تخفیف
const DISCOUNT_AMOUNT = 300000;              // مبلغ به تومان
const SHOW_DELAY_MS = 2500;                  // تأخیر نمایش بعد از لود
const HIDE_FOR_MS = 24 * 60 * 60 * 1000;     // بعد از بستن دستی، چند وقت دوباره نشان داده نشود
const STORAGE_KEY = 'mahlin-promo-card';
// صفحاتی که کارت در آن‌ها نمایش داده نمی‌شود
const HIDDEN_PREFIXES = ['/login', '/cart', '/checkout', '/account', '/receipt', '/tickets'];

const customizer = useCustomizerStore();
const route = useRoute();

// کوکی ۱ ساله: بعد از خرید موفق (در Receipt.vue ست می‌شود)
const purchased = usePurchasedCookie();

const isLoggedIn = computed(() => customizer.auth);

const user = computed(() =>
  customizer.userInfo && !Array.isArray(customizer.userInfo) ? customizer.userInfo : {},
);

const title = computed(() => {
  if (!isLoggedIn.value) return 'به ماهلین خوش اومدی!';
  const name = ((user.value as any).first_name || '').trim();
  return name ? `${name} عزیز، خوش اومدی!` : 'خوش اومدی!';
});

const ready = ref(false);       // تأخیر نمایش گذشته
const dismissed = ref(true);    // تا وقتی storage چک نشده مخفی
const copied = ref(false);

const onHiddenPage = computed(() => {
  const p = route.path.toLowerCase();
  return HIDDEN_PREFIXES.some((x) => p === x || p.startsWith(`${x}/`));
});

// تا وقت مشخص شدن وضعیت لاگین چیزی نشان نمی‌دهیم (جلوگیری از پرش)
const visible = computed(
  () =>
    !purchased.value &&
    ready.value &&
    !dismissed.value &&
    !onHiddenPage.value &&
    !customizer.userInfoLoading,
);

const storageKey = () => `${STORAGE_KEY}:${isLoggedIn.value ? 'user' : 'guest'}`;

function readDismissed(): boolean {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return false;
    return Date.now() - Number(raw) < HIDE_FOR_MS;
  } catch {
    return false;
  }
}

// کارت فقط با اقدام خود کاربر بسته می‌شود (X، «شاید بعداً»، Esc، کشیدن، یا کلیک دکمه اصلی)
function dismiss() {
  dismissed.value = true;
  try {
    localStorage.setItem(storageKey(), String(Date.now()));
  } catch { /* storage در دسترس نیست */ }
}

// ─── کشیدن به چپ/راست برای بستن (موبایل و تبلت) ──────────────
const dragX = ref(0);
const dragging = ref(false);
const settling = ref(false);
let startX = 0;
let startY = 0;
let activePointer = -1;
let settleTimer: ReturnType<typeof setTimeout> | undefined;

function onPointerDown(e: PointerEvent) {
  if (e.pointerType === 'mouse') return;
  activePointer = e.pointerId;
  startX = e.clientX;
  startY = e.clientY;
  clearTimeout(settleTimer);
  settling.value = false;
}

function onPointerMove(e: PointerEvent) {
  if (e.pointerId !== activePointer) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  if (!dragging.value) {
    // فقط وقتی حرکت افقی است شروع کن تا اسکرول صفحه خراب نشود
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      dragging.value = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } else return;
  }
  dragX.value = dx;
}

function onPointerUp(e: PointerEvent) {
  if (e.pointerId !== activePointer) return;
  activePointer = -1;
  if (!dragging.value) return;
  dragging.value = false;
  settling.value = true;
  settleTimer = setTimeout(() => (settling.value = false), 300);

  if (Math.abs(dragX.value) > 90) {
    dragX.value = Math.sign(dragX.value) * 420; // پرتاب به بیرون
    setTimeout(dismiss, 180);
  } else {
    dragX.value = 0; // برگشت نرم
  }
}

const cardStyle = computed(() => ({
  marginBottom: 'env(safe-area-inset-bottom, 0px)',
  transform: dragX.value ? `translateX(${dragX.value}px)` : undefined,
  opacity: dragX.value ? String(Math.max(0, 1 - Math.abs(dragX.value) / 320)) : undefined,
  transition: dragging.value
    ? 'none'
    : settling.value
      ? 'transform .28s cubic-bezier(.22,1,.36,1), opacity .28s ease'
      : undefined,
}));

// ─── کلید Esc ───────────────────────────────────────────────
function onKeydown(e: KeyboardEvent) {
  if (visible.value && e.key === 'Escape') dismiss();
}

// ─── شمارش مبلغ از صفر تا مقدار نهایی + پاپ پایانی ───────────
const shownAmount = ref(DISCOUNT_AMOUNT);
const amountPop = ref(false);
let rafId = 0;
let popTimer: ReturnType<typeof setTimeout> | undefined;

const prefersReducedMotion = () =>
  import.meta.client && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function runCountUp() {
  cancelAnimationFrame(rafId);
  amountPop.value = false;
  if (prefersReducedMotion()) {
    shownAmount.value = DISCOUNT_AMOUNT;
    return;
  }
  const duration = 1500;
  const delay = 450;
  const start = performance.now() + delay;
  shownAmount.value = 0;

  const tick = (now: number) => {
    const t = Math.min(Math.max((now - start) / duration, 0), 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    shownAmount.value = Math.round((DISCOUNT_AMOUNT * eased) / 1000) * 1000;
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      shownAmount.value = DISCOUNT_AMOUNT;
      amountPop.value = true;
      clearTimeout(popTimer);
      popTimer = setTimeout(() => (amountPop.value = false), 700);
    }
  };
  rafId = requestAnimationFrame(tick);
}

watch(visible, (v) => {
  if (v) {
    dragX.value = 0;
    runCountUp();
  } else cancelAnimationFrame(rafId);
});

// ─── کانفتی هنگام کپی ───────────────────────────────────────
type Particle = { id: number; x: number; y: number; r: number; c: string; d: number; s: number };
const bursts = ref<Particle[]>([]);
let burstTimer: ReturnType<typeof setTimeout> | undefined;

function burst() {
  if (prefersReducedMotion()) return;
  const colors = ['bg-accent', 'bg-gold', 'bg-sage', 'bg-blush', 'bg-lilac'];
  const count = 16;
  const base = Date.now();
  bursts.value = Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 30 + Math.random() * 40;
    return {
      id: base + i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      r: Math.random() * 360,
      c: colors[i % colors.length],
      d: Math.random() * 0.08,
      s: 4 + Math.random() * 3,
    };
  });
  clearTimeout(burstTimer);
  burstTimer = setTimeout(() => (bursts.value = []), 900);
}

async function copyCode() {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
    } else {
      const ta = document.createElement('textarea');
      ta.value = DISCOUNT_CODE;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    copied.value = true;
    burst();
    toast.success('کد تخفیف کپی شد');
    setTimeout(() => (copied.value = false), 2200);
  } catch {
    toast.error('کپی انجام نشد، کد را دستی وارد کنید');
  }
}

// وقتی وضعیت لاگین عوض می‌شود (مثلاً بعد از ورود) دوباره وضعیت بستن را بررسی کن
watch(
  () => [isLoggedIn.value, customizer.userInfoLoading],
  () => {
    if (!import.meta.client || customizer.userInfoLoading) return;
    dismissed.value = readDismissed();
  },
  { immediate: true },
);

onMounted(() => {
  setTimeout(() => (ready.value = true), SHOW_DELAY_MS);
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  clearTimeout(settleTimer);
  clearTimeout(popTimer);
  clearTimeout(burstTimer);
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
/* ─── ورود مرحله‌ای محتوا ─── */
.rise {
  animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) both;
}
@keyframes rise {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── بانس جلب‌توجه: چند پرش پشت‌سرهم، بعد چند ثانیه استراحت، دوباره ───
   با هاور، فوکوس یا کشیدن متوقف می‌شود تا موقع تعامل مزاحم نباشد */
.card {
  transform-origin: 50% 100%;
  animation: attention 5s ease-in-out 1.6s infinite;
}
@keyframes attention {
  0%, 40%, 100% { transform: translateY(0) scale(1, 1); }
  6%  { transform: translateY(0)     scale(1.03, 0.96); }
  15% { transform: translateY(-16px) scale(0.98, 1.03); }
  24% { transform: translateY(0)     scale(1.025, 0.97); }
  31% { transform: translateY(-7px)  scale(0.99, 1.015); }
  37% { transform: translateY(0)     scale(1, 1); }
}
.promo-card:hover .card,
.promo-card:focus-within .card,
.promo-card.is-dragging .card {
  animation: none;
}

/* حلقه‌ی نورانی که با هر بانس از کارت پخش می‌شود */
.attn-ring {
  opacity: 0;
  animation: attnRing 5s ease-out 1.6s infinite;
}
@keyframes attnRing {
  0%, 5%    { opacity: 0;   transform: scale(1); }
  10%       { opacity: 0.8; transform: scale(1); }
  45%, 100% { opacity: 0;   transform: scale(1.06, 1.22); }
}

/* ─── آیکن هدیه: پاپ اولیه + تکان کوتاه + حلقه‌ی نبض + نقطه‌ی اعلان ─── */
.gift { animation: giftPop 0.7s cubic-bezier(0.22, 1.4, 0.36, 1) 0.2s both; }
@keyframes giftPop {
  from { opacity: 0; transform: scale(0.5) rotate(-14deg); }
  to   { opacity: 1; transform: scale(1) rotate(0); }
}
.icon-wiggle { animation: wiggle 5s ease-in-out 1.8s infinite; transform-origin: 50% 85%; }
@keyframes wiggle {
  0%, 72%, 100% { transform: rotate(0); }
  76% { transform: rotate(-14deg) scale(1.1); }
  82% { transform: rotate(12deg) scale(1.1); }
  88% { transform: rotate(-7deg); }
  94% { transform: rotate(3deg); }
}
.ring-ping { animation: ringPing 3s cubic-bezier(0, 0, 0.2, 1) 1s infinite; }
@keyframes ringPing {
  0%        { transform: scale(1);    opacity: 0.6; }
  60%, 100% { transform: scale(1.55); opacity: 0; }
}
.dot-ping { animation: dotPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }
@keyframes dotPing {
  0%        { transform: scale(1);   opacity: 0.8; }
  75%, 100% { transform: scale(2.8); opacity: 0; }
}

/* ─── پاپ مبلغ بعد از پایان شمارش ─── */
.amount-pop { animation: amountPop 0.6s cubic-bezier(0.2, 1.5, 0.4, 1); }
@keyframes amountPop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.18); }
  100% { transform: scale(1); }
}

/* ─── برق نور روی کوپن و دکمه ─── */
.coupon-shine {
  left: 0;
  transform: translateX(-160%) skewX(-18deg);
  animation: sweep 6s ease-in-out 2s infinite;
}
@keyframes sweep {
  0%        { transform: translateX(-160%) skewX(-18deg); }
  30%, 100% { transform: translateX(520%)  skewX(-18deg); }
}
.cta-shine {
  left: 0;
  transform: translateX(-160%) skewX(-18deg);
  animation: sweep 5s ease-in-out 3s infinite;
}
.cta:hover .cta-shine { animation: sweepOnce 0.8s ease; }
@keyframes sweepOnce {
  from { transform: translateX(-160%) skewX(-18deg); }
  to   { transform: translateX(520%)  skewX(-18deg); }
}

/* ─── نبض ملایم پشت دکمه اصلی + فلش که آروم تکان می‌خورد ─── */
.cta-ping { animation: ctaPing 3.2s cubic-bezier(0, 0, 0.2, 1) 1.6s infinite; }
@keyframes ctaPing {
  0%        { transform: scale(1);         opacity: 0.35; }
  65%, 100% { transform: scale(1.05, 1.35); opacity: 0; }
}
.arrow-nudge { animation: nudge 2.4s ease-in-out 2s infinite; }
@keyframes nudge {
  0%, 60%, 100% { transform: translateX(0); }
  75%           { transform: translateX(-4px); }
  90%           { transform: translateX(0); }
}
.cta:hover .arrow-nudge { animation: none; }

/* ─── تیک و کانفتی کپی ─── */
.check-pop { animation: checkPop 0.4s cubic-bezier(0.2, 1.4, 0.4, 1) both; }
@keyframes checkPop {
  from { transform: scale(0) rotate(-40deg); }
  to   { transform: scale(1) rotate(0); }
}
.confetti {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 2px;
  pointer-events: none;
  animation: confettiFly 0.8s cubic-bezier(0.1, 0.7, 0.3, 1) forwards;
}
@keyframes confettiFly {
  0%   { transform: translate(-50%, -50%) rotate(0) scale(1); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--r)) scale(0.5); opacity: 0; }
}

/* ─── کاربرانی که انیمیشن کم می‌خواهند ─── */
@media (prefers-reduced-motion: reduce) {
  .promo-card, .promo-card * { animation: none !important; transition-duration: 0.01ms !important; }
}
</style>