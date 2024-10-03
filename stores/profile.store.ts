import { defineStore } from "pinia";
import { ref } from "vue";
import { AuthService } from "~/lib/services/auth.service";
import type { Ref } from "vue";
import type { User } from "~/lib/types/user";

export const useProfileStore = defineStore("profile", () => {

  const user: Ref<User | null> = ref(null)

  const getMe = async () => {
    const res = await AuthService.me()
    user.value = res.data.value as User
  }

  const clearUser = () => {
    user.value = null
  }

  return {
    user,
    getMe,
    clearUser
  }
})