import { BaseService } from './baseService'
import type { User } from '../store/authStore'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

class AuthService extends BaseService {
  constructor() {
    super('/api') // adjust base URL when backend is ready
  }

  login(payload: LoginRequest) {
    return this.post<LoginResponse, LoginRequest>('/auth/login', payload)
  }
}

export const authService = new AuthService()

