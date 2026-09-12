<!-- components/HomeBanners.vue -->
<template>
  <section class="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-12">
    <!-- اسکلتون لودینگ -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      <div
          v-for="n in 2"
          :key="n"
          class="h-[180px] sm:h-[200px] rounded-[24px] bg-ink/5 animate-pulse"
      />
    </div>

    <!-- بنرها -->
    <div
        v-else-if="banners.length"
        class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
    >
      <NuxtLink
        v-for="(banner, index) in banners"
        :key="index"
        :to="banner.link"
        class="banner-card group relative h-[180px] sm:h-[200px] rounded-[24px] overflow-hidden border border-ink/5 block"
        :style="{ animationDelay: index * 0.15 + 's' }"
      >
        <!-- تصویر -->
        <img
          :src="banner.image"
          :alt="banner.title"
          class="banner-img w-full h-full object-cover object-center transform-gpu"
        />

        <!-- گرادیانت -->
        <div class="banner-overlay absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/5" />

        <!-- درخشش متحرک -->
        <div class="banner-shine absolute inset-0 opacity-0 group-hover:opacity-100" />

        <!-- کادر داخلی -->
        <div class="absolute inset-3 rounded-[18px] border border-white/10 pointer-events-none banner-frame" />

        <!-- محتوا -->
        <div class="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">

          <!-- بج -->
          <div class="flex justify-start">
            <span
              v-if="banner.badge"
              class="banner-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide bg-white/15 backdrop-blur-md text-white border border-white/20"
            >
              <span class="badge-dot w-1.5 h-1.5 rounded-full bg-gold" />
              {{ banner.badge }}
            </span>
          </div>

          <!-- پایین -->
          <div class="flex items-end justify-between gap-4">
            <div class="space-y-1.5 overflow-hidden">
              <h3
                  v-if="banner.title"
                  class="banner-title text-white font-display text-lg sm:text-2xl font-bold tracking-wide"
              >
                {{ banner.title }}
              </h3>

              <p class="banner-subtitle text-white/75 text-xs sm:text-sm max-w-[280px] leading-relaxed line-clamp-1">
                {{ banner.subtitle }}
              </p>

            </div>

            <!-- دکمه -->
            <span class="banner-btn w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shrink-0 shadow-lg">
              <svg
                class="banner-arrow w-4 h-4 rtl:rotate-180"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>

        </div>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  sliderId: {
    type: [Number, String],
    default: 1,
  },
});

const banners = ref([]);
const loading = ref(true);

const getContent = () => {
  loading.value = true;

  useGarnetApiFetch("sliders/show", { id: props.sliderId })
      .then((response) => {
        const items = response?.Slider?.slider_images || [];

        banners.value = items.map((item) => ({
          id: item.id,
          image: item.file,
          link: item.button_link,
          title: item.title || item.name || "",
          subtitle: item.subtitle || item.description || "",
          badge: item.button_text || "",
        }));
      })
      .catch((error) => {
        toast.error(t(error));
      })
      .finally(() => {
        loading.value = false;
      });
};

onMounted(() => {
  getContent();
});
</script>

<style scoped>
/* ── ورود اولیه ─────────────────────────────────────────── */
.banner-card {
  animation: bannerReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes bannerReveal {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── hover کارت ─────────────────────────────────────────── */
.banner-card:hover {
  transform: translateY(-6px) scale(1.005);
  box-shadow:
    0 24px 48px rgba(63, 58, 53, 0.18),
    0 8px 16px rgba(63, 58, 53, 0.08);
}

/* ── تصویر ──────────────────────────────────────────────── */
.banner-img {
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card:hover .banner-img {
  transform: scale(1.08);
}

/* ── گرادیانت روی hover ─────────────────────────────────── */
.banner-overlay {
  transition: opacity 0.5s ease;
}
.banner-card:hover .banner-overlay {
  opacity: 0.92;
}

/* ── درخشش Shine ─────────────────────────────────────────── */
.banner-shine {
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 255, 255, 0.06) 50%,
    transparent 70%
  );
  background-size: 200% 100%;
  transition: opacity 0.3s ease;
  animation: none;
}
.banner-card:hover .banner-shine {
  animation: shine 1.2s ease forwards;
}
@keyframes shine {
  from { background-position: 150% center; }
  to   { background-position: -50% center; }
}

/* ── کادر داخلی ─────────────────────────────────────────── */
.banner-frame {
  transition:
    border-color 0.5s ease,
    inset 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-card:hover .banner-frame {
  border-color: rgba(255, 255, 255, 0.28);
  inset: 8px;
}

/* ── بج ─────────────────────────────────────────────────── */
.banner-badge {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.banner-card:hover .banner-badge {
  background-color: rgba(162, 132, 102, 0.35); /* gold/35 */
  border-color: rgba(162, 132, 102, 0.5);
  transform: translateY(-2px);
}

/* نقطه چشمک‌زن بج */
.badge-dot {
  animation: badgePulse 2s ease-in-out infinite;
}
@keyframes badgePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* ── عنوان ──────────────────────────────────────────────── */
.banner-title {
  transition:
    color 0.35s ease,
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    letter-spacing 0.4s ease;
}
.banner-card:hover .banner-title {
  color: #A28466; /* gold */
  transform: translateY(-3px);
  letter-spacing: 0.01em;
}

/* ── زیرعنوان ───────────────────────────────────────────── */
.banner-subtitle {
  transition:
    opacity 0.4s ease,
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.04s;
}
.banner-card:hover .banner-subtitle {
  opacity: 0.95;
  transform: translateY(-2px);
}

/* ── دکمه فلش ───────────────────────────────────────────── */
.banner-btn {
  transition:
    background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.35s ease;
}
.banner-card:hover .banner-btn {
  background-color: #A28466; /* gold */
  border-color: #A28466;
  transform: scale(1.15) rotate(-5deg);
  box-shadow: 0 8px 20px rgba(162, 132, 102, 0.45);
}

.banner-arrow {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>