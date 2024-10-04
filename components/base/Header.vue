<script setup lang="ts">
  import ThemeSwitcher from '../header/ThemeSwitcher.vue';
  import LocaleSwitcher from '../header/LocaleSwitcher.vue';
  import ThemeLogo from '../header/ThemeLogo.vue';
  import AccountBlock from '../header/AccountBlock.vue';
  import { useProfileStore } from '#imports';

  const { t } = useI18n()

  const store = useProfileStore()
</script>

<template>
  <header class="flex">
    <div class="wrapper flex justify-between">
      <div>
        <ThemeLogo />
      </div>
      <div class="flex gap-4">

        <AccountBlock :profile="store.user" v-if="store.user" />
        <NuxtLinkLocale v-else to="/auth/login">
          <UiButton :label="t('auth.login')" />
        </NuxtLinkLocale>
        
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  </header>
</template>

<style scoped>
  header{
    height: 80px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--v-background);
  }
</style>