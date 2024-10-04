<script setup lang="ts">
  import UiButton from '~/components/ui/UiButton.vue';
  import { useProfileStore } from '#imports';

  const { t } = useI18n()
  const store = useProfileStore()
</script>

<template>
  <div>
    <ProfileAvatarFileInput />

    <div class="grid grid-cols-2 gap-6 mt-8">
      <div>
        <label>{{ t('auth.username') }}</label>
        <input class="input w-100 mt-3" />
      </div>
      <div>
        <label>{{ t('auth.email') }}</label>
        <input class="input w-100 mt-3" />
      </div>
    </div>

    <UiButton class="mt-6" :label="t('action.save')" />
  </div>
</template>

<style scoped>
  label{
    font-size: 16px;
    font-weight: 500;
    color: var(--v-secondary-text);
  }
</style>