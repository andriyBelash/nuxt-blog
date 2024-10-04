<script setup lang="ts">
  const { locale } = useI18n()
</script>

<template>
  <div class="locale-container flex gap-2">
    <SwitchLocalePathLink class="locale-switcher" :class="{ 'active-locale': locale === 'en' }" locale="en">En</SwitchLocalePathLink>
    <div class="separator"/>
    <SwitchLocalePathLink class="locale-switcher" :class="{ 'active-locale': locale === 'uk' }" locale="uk">Укр</SwitchLocalePathLink>
  </div>
</template>

<style>
  .locale-switcher{
    color: var(--v-primary-text);
    text-decoration: none;
  }

  .locale-switcher.active-locale{
    color: var(--v-blue);
  }

  .separator{
    height: 20px;
    width: 1px;
    background-color: var(--v-secondary-text);
  }
</style>