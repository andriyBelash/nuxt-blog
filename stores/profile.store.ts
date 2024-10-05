import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { ProfileService } from "~/lib/services/profile.service";
import { useToast } from '~/composables/useToast'
import type { User, UpdateUserForm } from "~/lib/types/user";

export const useProfileStore = defineStore("profile", () => {
  const toast = useToast()
  const user: Ref<User | null> = ref(null);

  const formUser: Ref<UpdateUserForm> = ref({
    username: "",
    email: "",
  })

  const getMe = async () => {
    try {
      const { data, error } = await ProfileService.me();

      // if (error.value) return Promise.reject();
      setUser(data.value as User);
      // setFormUser(data.value as User);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const setUser = (payload: User) => { user.value = payload };

  const clearUser = () => { user.value = null };

  const setFormUser = (payload: User) => {
    if (!payload) return
    formUser.value = {
      username: payload.username,
      email: payload.email,
      file: null
    }
  };

  const resetFormUser = () => { setFormUser(user.value as User) };

  const updateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("username", formUser.value.username);
      formData.append("email", formUser.value.email);
      if(formUser.value.file && typeof formUser.value.file !== 'string') {
        formData.append("file", formUser.value.file);
      }

      const { data, error } = await ProfileService.updateProfile(formData);
      if(error.value) return toast.handleError(error.value)
      setUser(data.value as User);
      resetFormUser();
      toast.successToast('user_updated')
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    user,
    formUser,
    getMe,
    setUser,
    clearUser,
    updateUser,
    setFormUser,
    resetFormUser,
  };
});