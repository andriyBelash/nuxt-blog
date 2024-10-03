<script setup lang="ts">
  import '~/assets/css/auth-form.css'

  const { t } = useI18n()
</script>

<template>
  <main class="center h-100">
    <div class="auth-card flex-col">
      <h2 class="auth-card--title">{{ t('auth.signup') }}</h2>
      <p>{{ t('auth.enter_registration_details') }}</p>
      <form @submit.prevent class="auth-card--form flex-col gap-16">
        <input class="input" type="text" :placeholder="t('auth.username')"/>
        <input class="input" type="email" :placeholder="t('auth.email')"/>
        <input class="input" type="password" :placeholder="t('auth.password')"/>
        <input class="input" type="password" :placeholder="t('auth.confirm_password')"/>
        <UiButton :label="t('auth.signup')" />
        <NuxtLinkLocale to="/auth/login">{{ t('auth.already_have_account') }}</NuxtLinkLocale>
      </form>
    </div>
  </main>
</template>