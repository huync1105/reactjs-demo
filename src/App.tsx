import { useEffect } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { theme } from './theme'
import { useAuthStore } from './store/authStore'

function App() {
  useEffect(() => {
    useAuthStore.getState().hydrateFromStorage()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
