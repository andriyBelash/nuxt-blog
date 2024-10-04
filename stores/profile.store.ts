import { defineStore } from "pinia";
import { ref } from "vue";
import { AuthService } from "~/lib/services/auth.service";
import type { User } from "~/lib/types/user";

export const useProfileStore = defineStore("profile", () => {
  const user = ref<User | null>(null);

  const getMe = async () => {
    try {
      const { data } = await AuthService.me();
      setUser(data.value as User);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const setUser = (payload: User) => {
    user.value = payload;
  };

  const clearUser = () => {
    user.value = null;
  };

  return {
    user,
    getMe,
    setUser,
    clearUser,
  };
});