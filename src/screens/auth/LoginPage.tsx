import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setAuth = useAuthStore((state) => state.setAuth)
  const hydrateFromStorage = useAuthStore((state) => state.hydrateFromStorage)

  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: Location } }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await authService.login({ username, password })
      setAuth(response.data)

      const redirectTo = location.state?.from?.pathname ?? '/'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      console.error(err)
      setError('Login failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Hydrate existing auth from storage on first render in a safe way
  useState(() => {
    hydrateFromStorage()
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #30364F 0%, #ACBAC4 45%, #E1D9BC 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          boxShadow: 6,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to access your dashboard.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                  autoComplete="username"
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  autoComplete="current-password"
                />

                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in…' : 'Sign in'}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

