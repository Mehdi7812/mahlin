<template>
  <div class="min-h-screen flex flex-col bg-[#f8f2ec]">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
