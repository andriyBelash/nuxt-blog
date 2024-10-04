<script setup lang="ts">
  import { useProfileStore } from '#imports';

  const store = useProfileStore()
</script>

<template>
  <div class="page">
    <div class="wrapper">
      <ProfileHeader 
        v-if="store.user"
        :is-me="true" 
        :profile="{
          username: store.user.username,
          logo: store.user.avatar_url,
          email: store.user.email,
        }" 
      />
      <div>
        <NuxtPage/>
      </div>
    </div>
  </div>
</template>