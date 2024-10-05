import { useApiFetch } from "~/composables/useCustomFetch";

import type { RegisterForm } from "../types/user";


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

  public static register(form: RegisterForm) {
    return useApiFetch('/auth/register', {
      method: 'POST',
      body: form
    })
  }

  public static me() {
    return useApiFetch('/profile/me')
  }

  public static refreshToken(refresh_token: string) {
    return useApiFetch('/auth/refresh', {
      method: 'POST',
      body: { token: refresh_token }
    })
  }
}