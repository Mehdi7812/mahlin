<template>
  <!-- لودینگ خطی بالای صفحه -->
  <NuxtLoadingIndicator :height="5" />

  <Toaster rich-colors position="bottom-center" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>