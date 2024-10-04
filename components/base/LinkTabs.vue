<script setup lang="ts">
  import type { LinkTab } from '~/lib/types/base';

  const { t } = useI18n()

  interface Props {
    tabs: LinkTab[],
    selectedKey: string,
    basePath: string
  }

  defineProps<Props>()

</script>

<template>
  <div class="tabs-container">
    <template v-for="tab in tabs" :tab="tab.key">
      <NuxtLinkLocale :class="{ 'active-link': tab.key === selectedKey }" :to="basePath + '/' + tab.key" >{{ t('tab.' + tab.page_key) }}</NuxtLinkLocale>
    </template>
  </div>
</template>