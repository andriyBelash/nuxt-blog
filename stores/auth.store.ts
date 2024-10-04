import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '~/lib/services/auth.service'
import { useProfileStore } from './profile.store'
import { useToast } from '~/composables/useToast'

import type { Tokens, RegisterForm, User, AuthResponse } from '~/lib/types/user'
import { UserRole } from '~/lib/types/enum'

export const useAuthStore = defineStore('auth', () => {
  const access_token = useCookie('access_token')
  const refresh_token = useCookie('refresh_token')
  const profileStore = useProfileStore()
  const toast = useToast()
  
  const form = ref<RegisterForm>({
    email: '',
    password: '',
    username: '',
    role: UserRole.USER
  })

  const manageToken = (payload: Tokens) => {
    access_token.value = payload.access_token
    refresh_token.value = payload.refresh_token
  }

  const handleAuthResponse = (data: AuthResponse) => {
    manageToken(data)
    profileStore.setUser(data.user)
  }

  const handleAuthError = (error: any) => {
    toast.errorToast(error.message)
    return Promise.reject(error)
  }

  const validateForm = (requiredFields: (keyof RegisterForm)[]) => {
    return requiredFields.every(field => form.value[field])
  }

  const onSubmit = async () => {
    if (!validateForm(['email', 'password'])) {
      return Promise.reject('required_fields')
    }

    try {
      const { data, error } = await AuthService.login(form.value.email, form.value.password)
      
      if (error.value) return handleAuthError(error.value)
      if (data.value) handleAuthResponse(data.value as AuthResponse)
      
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const register = async () => {
    if (!validateForm(['email', 'password', 'username'])) {
      return Promise.reject('required_fields')
    }

    try {
      const { data, error } = await AuthService.register(form.value)
      
      if (error.value) return handleAuthError(error.value)
      if (data.value) handleAuthResponse(data.value as AuthResponse)
      
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const refreshToken = async () => {
    if (refresh_token.value) {
      const res = await AuthService.refreshToken(refresh_token.value)
      manageToken(res.data.value as Tokens)
    }
  }

  const logOut = () => {
    access_token.value = null
    refresh_token.value = null
    profileStore.clearUser()
  }

  const clearForm = () => {
    Object.assign(form.value, {
      email: '',
      password: '',
      username: '',
      role: UserRole.USER
    })
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