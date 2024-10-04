<script setup lang="ts">
  import '~/assets/css/auth-form.css'
  import { useAuthStore } from '#imports';
  import { toast } from 'vue3-toastify';

  const { t } = useI18n()
  const store = useAuthStore()
  const localePath = useLocalePath()

  const inputType = ref('password')
  const confirmInputType = ref('password')
  const confirmPassword = ref('')

  const register = async () => {
    try {
      if(store.form.password !== confirmPassword.value) {
        toast.error(t('error.passwords_do_not_match'))
        return
      }
      await store.register()
      navigateTo(localePath('/'))
    } catch (e: any) {
      if(typeof e === 'string') {
        toast.error(t('error.' + e))
      }
    }
  }

</script>

<template>
  <main class="center h-100">
    <div class="auth-card flex-col">
      <h2 class="auth-card--title">{{ t('auth.signup') }}</h2>
      <p>{{ t('auth.enter_registration_details') }}</p>
      <form @submit.prevent class="auth-card--form flex-col gap-16">
        <input v-model="store.form.username" class="input" type="text" :placeholder="t('auth.username')"/>
        <input v-model="store.form.email" class="input" type="email" :placeholder="t('auth.email')"/>

        <div class="input-wrapper">
          <input v-model="store.form.password" class="input w-100" :type="inputType" :placeholder="t('auth.password')"/>
          <button class="input-wrapper--button">
            <Icon v-if="inputType !== 'text'" @click="inputType = 'text'" name="tabler:eye" size="2em"/>
            <Icon v-else @click="inputType = 'password'" name="tabler:eye-off" size="2em"/>
          </button>
        </div>

        <div class="input-wrapper">
          <input v-model="confirmPassword" class="input w-100" :type="confirmInputType" :placeholder="t('auth.confirm_password')"/>
          <button class="input-wrapper--button">
            <Icon v-if="confirmInputType !== 'text'" @click="confirmInputType = 'text'" name="tabler:eye" size="2em"/>
            <Icon v-else @click="confirmInputType = 'password'" name="tabler:eye-off" size="2em"/>
          </button>
        </div>

        <UiButton @click="register" :label="t('auth.signup')" />
        <NuxtLinkLocale to="/auth/login">{{ t('auth.already_have_account') }}</NuxtLinkLocale>
      </form>
    </div>
  </main>
</template>