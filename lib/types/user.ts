import { UserRole } from "./enum";

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  username: string,
  role: UserRole
}

export interface UpdateUserForm{
  username: string,
  file?: File | null,
  email: string
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface User {
  id: number
  email: string
  username: string
  avatar_url: string | null;
  role: UserRole,
  created_at: string
  updated_at: string
}

export interface AuthResponse extends Tokens {
  user: User
}