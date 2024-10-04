import { defineStore } from "pinia";
import { ref } from "vue";
import { AuthService } from "~/lib/services/auth.service";
import type { Ref } from "vue";
import type { User } from "~/lib/types/user";

export const useProfileStore = defineStore("profile", () => {

  const user: Ref<User | null> = ref(null)

  const getMe = async () => {
    try {
      const res = await AuthService.me()
      setUser(res.data.value as User)
      user.value = res.data.value as User
    } catch(e) {
      return Promise.reject(e)
    }
  }

  const setUser = (payload: User) => {
    user.value = payload
  }

  const clearUser = () => {
    user.value = null
  }

  return {
    user,
    getMe,
    setUser,
    clearUser
  }
})