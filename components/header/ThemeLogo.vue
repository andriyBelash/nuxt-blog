<script setup lang="ts">
  const colorMode = useColorMode()
</script>

<template>
  <NuxtLinkLocale to="/">
    <img v-if="colorMode.value === 'light'" src="/header/light-mode-logo.svg" alt="logo" />
    <img v-else src="/header/dark-mode-logo.svg" alt="logo" />
  </NuxtLinkLocale>
</template>