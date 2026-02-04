import { useEffect, useState, type ReactNode } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Navigate, useLocation } from 'react-router-dom'
import { authService } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'

interface RequireAuthProps {
  children: ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const setAccessToken = useAuthStore((s) => s.setAccessToken)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  const [status, setStatus] = useState<
    'idle' | 'refreshing' | 'done' | 'unauthorized'
  >('idle')

  useEffect(() => {
    if (isAuthenticated) {
      setStatus('done')
      return
    }

    let cancelled = false
    setStatus('refreshing')

    authService
      .refresh()
      .then((res) => {
        if (cancelled) return
        setAccessToken(res.data.accessToken)
        setStatus('done')
      })
      .catch((err) => {
        if (cancelled) return
        const is401 =
          err?.response?.status === 401 || err?.response?.status === 403
        if (is401) {
          clearAuth()
        }
        setStatus('unauthorized')
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, setAccessToken, clearAuth])

  if (status === 'unauthorized') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (status === 'refreshing' || status === 'idle') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Restoring session…
        </Typography>
      </Box>
    )
  }

  return <>{children}</>
}
