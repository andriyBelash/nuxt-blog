<script setup lang="ts">
  import { useProfileStore } from '#imports';
  import { PROFILE_TABS } from '~/lib/constants';
  import LinkTabs from '~/components/base/LinkTabs.vue';

  const store = useProfileStore()
  const localePath = useLocalePath()

  const currentTab = computed(() => {
    const path = useRoute().path
    const arr = path.split('/')
    const tab = arr[arr.length - 1]
    return tab
  })

  const isChildTab = computed(() => {
    return PROFILE_TABS.some(tab => tab.key === currentTab.value)
  })

  if(!isChildTab.value) {
    navigateTo(localePath(`/profile/me/settings`))
  }

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
      <LinkTabs class="mt-16" :tabs="PROFILE_TABS" :basePath="'/profile/me'" :selected-key='currentTab' />
      <div class="mt-8">
        <NuxtPage/>
      </div>
    </div>
  </div>
</template>