<script setup lang="ts">
  import '~/assets/css/auth-form.css'
  import { useAuthStore } from '~/stores/auth.store';
  import { useProfileStore } from '#imports';
  import { toast } from 'vue3-toastify';

  const { t } = useI18n()
  const localePath = useLocalePath()


  const store = useAuthStore()
  const profile = useProfileStore()

  const login = async () => {
    try {
      await store.onSubmit()
      await profile.getMe()
      navigateTo(localePath('/'))
    } catch (e: any) {
      if(typeof e === 'string') {
        toast.error(t('error.' + e))
      }
    }
  }

  const inputType = ref('password')

</script>

<template>
  <main class="center h-100">
    <div class="auth-card flex-col">
      <h2 class="auth-card--title">{{ t('auth.login') }}</h2>
      <p>{{ t('auth.enter_details') }}</p>
      <form @submit.prevent class="auth-card--form flex-col gap-4">
        <input v-model="store.form.email" class="input" type="email" :placeholder="t('auth.email')"/>
        <div class="input-wrapper">
          <input v-model="store.form.password" class="input w-100" :type="inputType" :placeholder="t('auth.password')"/>
          <button class="input-wrapper--button">
            <Icon v-if="inputType !== 'text'" @click="inputType = 'text'" name="tabler:eye" size="2em"/>
            <Icon v-else @click="inputType = 'password'" name="tabler:eye-off" size="2em"/>
          </button>
        </div>
        <UiButton @click="login" :label="t('auth.login')" />
        <NuxtLinkLocale to="/auth/signup">{{ t('auth.no_account') }}</NuxtLinkLocale>
      </form>
    </div>
  </main>
</template>