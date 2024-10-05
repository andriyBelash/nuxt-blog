<script setup lang="ts">
  import '@/assets/css/main.css'
  import Header from './components/base/Header.vue';
  import { useProfileStore } from '#imports';
  import { useAuthStore } from '#imports';

  useHead({
    htmlAttrs: {
      lang: useI18n().locale.value
    }
  })

  await useAuthStore().refreshToken()
  await useProfileStore().getMe()

</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout class="h-100">
    <Header/>
    <NuxtPage />
  </NuxtLayout>
</template>
