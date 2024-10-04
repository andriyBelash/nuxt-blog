import type { UseFetchOptions } from 'nuxt/app'
import { useRuntimeConfig, useCookie } from '#imports'
import { useAuthStore } from '#imports'
import { toast } from 'vue3-toastify';


export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

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
    if (response.status === 401 && response._data?.message === 'invalid_token') {
      try {
        await authStore.refreshToken()
        return refreshNuxtData()
      } catch (refreshError) {
        authStore.logOut()
        throw refreshError
      }
    }
    throw new Error(response._data?.message || 'An error occurred')
  }

  return useFetch(path, defaults)
}