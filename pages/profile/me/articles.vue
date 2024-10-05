<script setup lang="ts">

  const { t } = useI18n()

  useSeoMeta({
    title: t('seo.articles'),
    ogTitle: t('seo.articles'),
    description: t('seo.articles_description'),
    ogDescription: t('seo.articles_description'),
  })
</script>

<template>
  <div>articles</div>
</template>