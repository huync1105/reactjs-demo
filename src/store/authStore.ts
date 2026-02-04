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
  setAccessToken: (accessToken: string) => void
  clearAuth: () => void
  hydrateFromStorage: () => void
}

const USER_KEY = 'user'

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  setAuth: ({ accessToken, user }) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    set({
      accessToken,
      user,
      isAuthenticated: true,
    })
  },

  setAccessToken: (accessToken) => {
    set({ accessToken, isAuthenticated: true })
  },

  clearAuth: () => {
    localStorage.removeItem(USER_KEY)
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    })
  },

  hydrateFromStorage: () => {
    const storedUser = localStorage.getItem(USER_KEY)
    if (!storedUser) return
    try {
      const parsedUser = JSON.parse(storedUser) as User
      set({
        user: parsedUser,
        accessToken: null,
        isAuthenticated: false,
      })
    } catch {
      localStorage.removeItem(USER_KEY)
    }
  },
}))
