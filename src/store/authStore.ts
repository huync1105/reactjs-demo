import { create } from 'zustand'

export interface User {
  id: string
  username: string
  email?: string
}

interface AuthState {
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean
  setAuth: (payload: { accessToken: string; user: User }) => void
  clearAuth: () => void
  hydrateFromStorage: () => void
}

const ACCESS_TOKEN_KEY = 'accessToken'
const USER_KEY = 'user'

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  setAuth: ({ accessToken, user }) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    set({
      accessToken,
      user,
      isAuthenticated: true,
    })
  },
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)

    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    })
  },
  hydrateFromStorage: () => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const storedUser = localStorage.getItem(USER_KEY)

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User
        set({
          accessToken: storedToken,
          user: parsedUser,
          isAuthenticated: true,
        })
      } catch {
        // If parsing fails, clear invalid storage
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      }
    }
  },
}))

