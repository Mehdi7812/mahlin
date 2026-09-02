<template>
  <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-16 animate-pulse">
    <div class="h-4 w-64 bg-ink/8 rounded-full mb-8"></div>
    <div class="grid md:grid-cols-12 gap-8 lg:gap-16">
      <div class="md:col-span-5">
        <div class="aspect-square bg-ink/8 rounded-[24px]"></div>
      </div>
      <div class="md:col-span-7 space-y-4">
        <div class="h-4 w-24 bg-ink/8 rounded-full"></div>
        <div class="h-9 w-3/4 bg-ink/8 rounded-2xl"></div>
        <div class="h-4 w-full bg-ink/8 rounded-full"></div>
        <div class="h-4 w-5/6 bg-ink/8 rounded-full"></div>
        <div class="h-20 w-full max-w-[440px] bg-ink/8 rounded-2xl mt-4"></div>
        <div class="h-12 w-full max-w-[480px] bg-ink/8 rounded-full mt-6"></div>
      </div>
    </div>

    <div class="mt-20 pt-10 border-t border-ink/[0.06]">
      <div class="h-6 w-56 bg-ink/8 rounded-full mb-8"></div>
      <div class="grid lg:grid-cols-[1fr_380px] gap-8">
        <div class="grid sm:grid-cols-2 gap-5">
          <div v-for="n in 4" :key="n" class="h-32 bg-ink/8 rounded-2xl"></div>
        </div>
        <div class="h-80 bg-ink/8 rounded-3xl"></div>
      </div>
    </div>
  </div>
</template>