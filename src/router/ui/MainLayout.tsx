import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export function MainLayout() {
  const user = useAuthStore((state) => state.user)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            React Demo
          </Typography>
          {user && (
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {user.username}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

