import { useApiFetch } from "~/composables/useCustomFetch";

export class AuthService {
  public static me() {
    return useApiFetch('/profile/me')
  }
}