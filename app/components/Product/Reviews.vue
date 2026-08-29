<template>
  <section class="mt-16 md:mt-24 pt-10 border-t border-ink/10">
    <div class="flex items-center gap-2 mb-8">
      <span class="w-6 h-px bg-gold/60" />
      <h2 class="text-xl sm:text-2xl font-display text-ink font-bold">نظرات و تجربیات خریداران</h2>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="(r, i) in reviews" :key="i" class="p-6 bg-card border border-ink/[0.03] rounded-2xl flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center text-xs mb-2">
            <span class="font-bold text-ink flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-gold/10 text-gold grid place-items-center text-[10px] font-bold">
                {{ r.name.charAt(0) }}
              </span>
              {{ r.name }}
            </span>
            <span class="text-ink/40 font-latin">{{ r.date }}</span>
          </div>
          <div class="flex gap-0.5 text-gold text-sm mb-3">
            <span v-for="star in parseStars(r.stars)" :key="star">★</span>
          </div>
          <p class="text-xs sm:text-sm text-ink/70 leading-relaxed">{{ r.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  reviews: { type: Array, required: true },
});

function parseStars(stars) {
  if (typeof stars === 'number') return stars;
  const match = stars.match(/★/g);
  return match ? match.length : 5;
}
</script>