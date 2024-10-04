<script setup lang="ts">
  import UiButton from '../ui/UiButton.vue';
  import { useAuthStore } from '#imports';

  interface Props {
    isMe: boolean,
    profile: {
      email: string,
      username: string,
      logo: string | null
    }
  }

  defineProps<Props>()

  const { t } = useI18n()
  const localePath = useLocalePath()
  const store = useAuthStore()

  const logout = () => {
    store.logOut()
    navigateTo(localePath('/'))
  }
</script>

<template>
  <div class="profile-header">
    <div class="profile-header--background">
      <img src="/background/profile.webp" alt="background">
    </div>
    <div class="profile-header-info flex items-start">
      <div class="profile-header-info--avatar">
        <img v-if="profile.logo" :src="profile.logo" alt="avatar"/>
        <img v-else src="/placeholder-avatar.jpg" alt="avatar"/>
      </div>
      <div class="profile-header-info--credentials">
        <h1 class="profile-header-info--name">{{ profile.username }}</h1>
        <p class="profile-header-info--email">{{ profile.email }}</p>
      </div>
      <UiButton @click="logout" class="ml-auto mr-4 mt-4" :label="t('auth.log_out')" />
    </div>
  </div>
</template>

<style scoped>
  .profile-header{
    height: 400px;
    background-color: var(--v-gray);
    border-radius: 16px;
    overflow: hidden;
  }

  .profile-header--background{
    height: 250px;
  }

  .profile-header--background img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-header-info{
    height: 150px;
    gap: 36px;
  }

  .profile-header-info--avatar{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    top: -50px;
    left: 20px;
    border: 4px solid var(--v-border);
  }

  .profile-header-info--avatar img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-header-info--credentials{
    padding: 0 20px;
    gap: 24px;
  }

  .profile-header-info--name{
    font-size: 36px;
    color: var(--v-primary-text);
  }

  .profile-header-info--email{
    color: var(--v-secondary-text);
  }
</style>