<script setup lang="ts">
  import UiButton from '~/components/ui/UiButton.vue';
  import { useProfileStore } from '#imports';
  import type { User } from '~/lib/types/user';

  
  const { t } = useI18n()
  const store = useProfileStore()
  
  store.setFormUser(store.user as User)
  
  onUnmounted(() => {
    store.resetFormUser()
  })
  
  useSeoMeta({
    title: t('seo.settings'),
    ogTitle: t('seo.settings'),
    description: t('seo.settings_description'),
    ogDescription: t('seo.settings_description'),
  })
</script>

<template>
  <div>
    <ProfileAvatarFileInput :logo="store.user?.avatar_url || '/placeholder-avatar.jpg'" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div>
        <label>{{ t('auth.username') }}</label>
        <input v-model="store.formUser.username" type="text" class="input w-100 mt-3" />
      </div>
      <div>
        <label>{{ t('auth.email') }}</label>
        <input v-model="store.formUser.email" type="email" class="input w-100 mt-3" />
      </div>
    </div>

    <UiButton @click="store.updateUser" class="mt-6 !text-[16px]" :label="t('action.save')" />
  </div>
</template>

<style scoped>
  label{
    font-size: 16px;
    font-weight: 500;
    color: var(--v-secondary-text);
  }
</style>