import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { AuthService } from '~/lib/services/auth.service'
import { useCookie } from '#app'
import { useProfileStore } from './profile.store'
import { useToast } from '~/composables/useToast'

import type { Tokens, RegisterForm } from '~/lib/types/user'
import { UserRole } from '~/lib/types/enum'

export const useAuthStore = defineStore('auth', () => {

  const access_token = useCookie('access_token')
  const refresh_token = useCookie('refresh_token')
  const profileStore = useProfileStore()
  const toast = useToast()
  
  const form: Ref<RegisterForm> = ref({
    email: '',
    password: '',
    username: '',
    role: UserRole.USER
  })

  const manageToken = (payload: Tokens) => {
    access_token.value = payload.access_token
    refresh_token.value = payload.refresh_token
  }

  const onSubmit = async () => {
    try {
      if(form.value.email && form.value.password) {
        const { data, error } = await AuthService.login(form.value.email, form.value.password)
        if(data.value) {
          manageToken(data.value as Tokens)
          await profileStore.getMe()
        }

        if(error.value) {
          toast.errorToast(error.value.message)
          return Promise.reject(error.value)
        }
      } else {
        return Promise.reject('required_fields')
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const register = async () => {
    try {
      if(form.value.email && form.value.password && form.value.username) {
        const { data, error } = await AuthService.register(form.value)
        if(data.value) {
          manageToken(data.value as Tokens)
          await profileStore.getMe()
        }

        if(error.value) {
          toast.errorToast(error.value.message)
          return Promise.reject(error.value)
        }
      } else {
        return Promise.reject('required_fields')
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const refreshToken = async  () => {
    if(refresh_token.value) {
      const res = await AuthService.refreshToken(refresh_token.value)
      manageToken(res.data.value as Tokens)
    }
  }

  const logOut = () => {
    access_token.value = ''
    refresh_token.value = ''
    profileStore.clearUser()
  }

  const clearForm = () => {
    form.value = {
      email: '',
      password: '',
      username: '',
      role: UserRole.USER
    }
  }

  return {
    form,
    register,
    logOut,
    refreshToken,
    onSubmit,
    clearForm
  }
})