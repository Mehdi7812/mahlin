<template>
  <section
    v-reveal
    class="mx-auto mb-24 grid max-w-[1050px] grid-cols-1 items-center gap-6 rounded-3xl border border-ink/[0.07] bg-white/70 p-6 text-center shadow-[0_18px_50px_-42px_rgba(63,58,53,0.45)] sm:grid-cols-[auto_1fr] sm:text-start md:mb-32 md:gap-10 md:p-10"
  >
    <!-- تصویر پروانه -->
    <button
      type="button"
      class="license-frame group relative mx-auto block w-[180px] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_14px_34px_-18px_rgba(63,58,53,0.5)] transition-transform duration-300 sm:mx-0 sm:w-[210px]"
      aria-haspopup="dialog"
      aria-label="مشاهده بزرگ‌تر پروانه کسب"
      @click="open = true"
    >
      <div class="aspect-[16/9] w-full">
        <img
          v-if="!missing"
          :src="LICENSE_IMG"
          alt="پروانه کسب ماهلین"
          loading="lazy"
          class="h-full w-full object-cover"
          @error="missing = true"
        />
        <div v-else class="grid h-full w-full place-items-center bg-ink/[0.03] text-ink/30">
          <Icon name="tabler:file-certificate" class="text-5xl" />
        </div>
      </div>

      <span class="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-ink/70 py-2 text-[11px] font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Icon name="tabler:zoom-in" class="text-sm" />
        مشاهده بزرگ‌تر
      </span>
    </button>

    <!-- متن -->
    <div>
      <span class="mb-2 block text-xs font-extrabold text-accent">فعالیت رسمی و قانونی</span>
      <h2 class="m-0 mb-2.5 text-[clamp(1.45rem,2.5vw,1.9rem)] font-extrabold text-ink">پروانه کسب ماهلین</h2>

      <p class="m-0 text-sm leading-8 text-ink/65">
        مجموعه ماهلین با
        <strong class="font-bold text-ink">پروانه کسب رسمی</strong>
        فعالیت می‌کند تا خرید شما با خیال راحت و در یک بستر معتبر انجام شود.
      </p>

      <p class="mt-2 text-[13px] leading-7 text-ink/55">
        برای مشاهده‌ی تصویر پروانه، روی آن کلیک کنید.
      </p>
    </div>
  </section>

  <!-- مودال تصویر بزرگ -->
  <Teleport to="body">
    <Transition name="about-license-modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] grid place-items-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="پروانه کسب"
      >
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="open = false" />

        <div class="about-license-card relative w-full max-w-2xl">
          <button
            type="button"
            class="absolute -top-3 -end-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="بستن"
            @click="open = false"
          >
            <Icon name="tabler:x" class="text-base" />
          </button>

          <div class="rounded-2xl bg-white p-2 shadow-2xl">
            <img
              v-if="!missing"
              :src="LICENSE_IMG"
              alt="پروانه کسب ماهلین"
              class="block max-h-[85vh] w-full rounded-xl object-contain"
            />
            <p v-else class="py-16 text-center text-sm text-ink/60">
              تصویر پروانه کسب هنوز بارگذاری نشده است.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
const LICENSE_IMG = "/license/license.jpg"

const open = ref(false)
const missing = ref(false)

function onKey(e) {
  if (e.key === 'Escape') open.value = false
}

watch(open, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.license-frame:focus-visible {
  outline: 2px solid #A28466;
  outline-offset: 3px;
}

.about-license-modal-enter-active,
.about-license-modal-leave-active { transition: opacity 0.25s ease; }
.about-license-modal-enter-from,
.about-license-modal-leave-to { opacity: 0; }
.about-license-modal-enter-active .about-license-card,
.about-license-modal-leave-active .about-license-card { transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
.about-license-modal-enter-from .about-license-card,
.about-license-modal-leave-to .about-license-card { transform: translateY(14px) scale(0.97); }

@media (prefers-reduced-motion: reduce) {
  .about-license-modal-enter-active, .about-license-modal-leave-active,
  .about-license-modal-enter-active .about-license-card,
  .about-license-modal-leave-active .about-license-card { transition: none !important; }
}
</style>
