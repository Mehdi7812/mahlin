<template>
  <div class="grid grid-cols-3 gap-2 mt-5">
    <div class="flex flex-col items-center text-center gap-1.5 py-3 bg-card rounded-xl">
      <svg class="w-4 h-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z" stroke-linejoin="round"/></svg>
      <span class="text-[10px] text-ink/50 font-bold">اصالت کالا</span>
    </div>
    <div class="flex flex-col items-center text-center gap-1.5 py-3 bg-card rounded-xl">
      <svg class="w-4 h-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke-linejoin="round"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>
      <span class="text-[10px] text-ink/50 font-bold">{{ isCourse ? 'دسترسی آنی' : 'ارسال سریع' }}</span>
    </div>
    <div class="flex flex-col items-center text-center gap-1.5 py-3 bg-card rounded-xl">
      <svg class="w-4 h-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v6h6M20 20v-6h-6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15a8 8 0 0014 3M19 9A8 8 0 005 6" stroke-linecap="round"/></svg>
      <span class="text-[10px] text-ink/50 font-bold">۷ روز ضمانت</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isCourse: { type: Boolean, default: false },
});
</script>