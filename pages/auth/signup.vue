<script setup lang="ts">
import '~/assets/css/auth-form.css'
import { ref } from 'vue'
import { useAuthStore } from '#imports'
import { useProfileStore } from '#imports'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useAuthStore()
const profile = useProfileStore()
const localePath = useLocalePath()

const inputType = ref('password')
const confirmInputType = ref('password')
const confirmPassword = ref('')

const toggleInputType = (type: 'password' | 'confirm') => {
  if(type === 'password') {
    inputType.value = inputType.value === 'password' ? 'text' : 'password'
  } else {
    confirmInputType.value = confirmInputType.value === 'password' ? 'text' : 'password'
  }
}

const register = async () => {
  try {
    if (store.form.password !== confirmPassword.value) {
      toast.error(t('error.passwords_do_not_match'))
      return
    }
    await store.register()
    await profile.getMe()
    navigateTo(localePath('/'))
  } catch (e: unknown) {
    if (typeof e === 'string') {
      toast.error(t(`error.${e}`))
    }
  }
}
</script>

<template>
  <main class="center h-100 wrapper">
    <div class="auth-card flex-col">
      <h2 class="auth-card--title">{{ t('auth.signup') }}</h2>
      <p>{{ t('auth.enter_registration_details') }}</p>
      <div @submit.prevent="register" class="auth-card--form flex-col gap-4">
        <input v-model="store.form.username" class="input" type="text" :placeholder="t('auth.username')" />
        <input v-model="store.form.email" class="input" type="email" :placeholder="t('auth.email')" />

        <div class="input-wrapper">
          <input v-model="store.form.password" class="input w-100" :type="inputType" :placeholder="t('auth.password')" />
          <button class="input-wrapper--button" @click="toggleInputType('password')">
            <Icon :name="inputType === 'password' ? 'tabler:eye' : 'tabler:eye-off'" size="2em" />
          </button>
        </div>

        <div class="input-wrapper">
          <input v-model="confirmPassword" class="input w-100" :type="confirmInputType" :placeholder="t('auth.confirm_password')" />
          <button class="input-wrapper--button" @click="toggleInputType('confirm')">
            <Icon :name="confirmInputType === 'password' ? 'tabler:eye' : 'tabler:eye-off'" size="2em" />
          </button>
        </div>

        <UiButton @click="register" :label="t('auth.signup')" />
        <NuxtLinkLocale to="/auth/login">{{ t('auth.already_have_account') }}</NuxtLinkLocale>
      </div>
    </div>
  </main>
</template>