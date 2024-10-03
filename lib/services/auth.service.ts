import { useApiFetch } from "~/composables/useCustomFetch";

export class AuthService {
  public static login(email: string, password: string) {
    return useApiFetch('/auth/login', {
      method: 'POST',
      body: {
        email,
        password
      }
    })
  }

  public static me() {
    return useApiFetch('/profile/me')
  }

  public static refreshToken(refresh_token: string) {
    return useApiFetch('/auth/refresh', {
      method: 'POST',
      body: { refresh_token }
    })
  }
}