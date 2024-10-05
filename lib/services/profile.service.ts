import { useApiFetch } from "~/composables/useCustomFetch";

export class ProfileService {
  public static me() {
    return useApiFetch('/profile/me')
  }

  public static updateProfile(formData: FormData) {
    return useApiFetch('/profile/update', {
      method: 'PATCH',
      body: formData
    })
  }
}