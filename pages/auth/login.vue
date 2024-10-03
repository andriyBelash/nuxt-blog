<script setup lang="ts">
  import '~/assets/css/auth-form.css'
  import { useAuthStore } from '~/stores/auth.store';
  import { toast } from 'vue3-toastify';

  const { t } = useI18n()
  const localePath = useLocalePath()


  const store = useAuthStore()

  const login = async () => {
    try {
      await store.onSubmit()
      navigateTo(localePath('/'))
    } catch (e: any) {
      if(typeof e === 'string') {
        toast.error(t('error.' + e))
      }
    }
  }

  store.logOut()

</script>

<template>
  <main class="center h-100">
    <div class="auth-card flex-col">
      <h2 class="auth-card--title">{{ t('auth.login') }}</h2>
      <p>{{ t('auth.enter_details') }}</p>
      <form @submit.prevent class="auth-card--form flex-col gap-16">
        <input v-model="store.form.email" class="input" type="email" :placeholder="t('auth.email')"/>
        <input v-model="store.form.password" class="input" type="password" :placeholder="t('auth.password')"/>
        <UiButton @click="login" :label="t('auth.login')" />
        <NuxtLinkLocale to="/auth/signup">{{ t('auth.no_account') }}</NuxtLinkLocale>
      </form>
    </div>
  </main>
</template>