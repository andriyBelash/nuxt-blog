<script setup lang="ts">
  import '@/assets/css/main.css'
  import Header from './components/base/Header.vue';
  import { useProfileStore } from '#imports';
  import { useAuthStore } from '#imports';

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
