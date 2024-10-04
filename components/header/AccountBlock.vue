<script setup lang="ts">
  import type { User } from '~/lib/types/user';

  defineProps<{ profile: User }>()
</script>

<template>
  <NuxtLinkLocale to="/profile/me/settings" class="account-block flex gap-2">
    <img v-if="profile.avatar_url" :src="profile.avatar_url" alt="profile.username">
    <img v-else src="/placeholder-avatar.jpg" alt="profile.username">
    <div class="account-block--info justify-between flex-col">
      <span class="account-block--name">{{ profile.username }}</span>
      <address>{{ profile.email }}</address>
    </div>
  </NuxtLinkLocale>
</template>

<style scoped>
  .account-block{
    text-decoration: none;
  }
  .account-block img{
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
  }
  .account-block--info .account-block--name{
    font-size: 18px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .account-block--info span{
    font-weight: 600;
    color: var(--v-primary-text);
  }
  .account-block--info address{
    font-size: 12px;
    color: var(--v-secondary-text);
  }
</style>