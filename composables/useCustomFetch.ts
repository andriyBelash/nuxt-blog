import type { UseFetchOptions } from 'nuxt/app'
import { useRuntimeConfig, useCookie, useRouter, useNuxtApp } from '#imports'
import { useAuthStore } from '#imports'
import { toast } from 'vue3-toastify';

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const router = useRouter()
  const localePath = useLocalePath()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase,
    key: path,
    ...options,
    headers: {
      ...options?.headers,
    },
  }

  defaults.onRequest = async ({ request, options }) => {
    const token = useCookie('access_token').value
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      } as Headers
    }
  }

  defaults.onResponseError = async ({ response }) => {
    console.log('Response error:', response)
    if (response.status === 401 && response._data?.message === 'invalid_token') {
      try {
        console.log("Attempting to refresh token")
        await authStore.refreshToken()
        const currentRoute = router.currentRoute.value
        navigateTo(localePath(currentRoute.path))
        return reloadNuxtApp()
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)
        authStore.logOut()
        navigateTo(localePath('/'))
        throw refreshError
      }
    }
    throw new Error(response._data?.message || 'An error occurred')
  }

  return useFetch(path, defaults)
}