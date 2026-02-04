import { BaseService } from './baseService'
import type { User } from '../store/authStore'
import type {ApiResponse} from "../shared/interfaces/reponse.interface.ts";

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export interface RefreshResponse {
  accessToken: string
}

class AuthService extends BaseService {
  constructor() {
    super('/auth')
    this.client.defaults.withCredentials = true
  }

  login(payload: LoginRequest) {
    return this.post<ApiResponse<LoginResponse>, LoginRequest>('/login', payload)
  }

  /** Uses httpOnly cookie for refresh token; no body. */
  refresh() {
    return this.client.post<ApiResponse<RefreshResponse>>('/refresh', undefined, {
      withCredentials: true,
    })
  }
}

export const authService = new AuthService()

