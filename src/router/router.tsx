import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '../screens/auth/LoginPage'
import { HomePage } from '../screens/home/HomePage'
import { AuthLayout } from './ui/AuthLayout'
import { MainLayout } from './ui/MainLayout'
import { RequireAuth } from './ui/RequireAuth'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      // Future authenticated routes can be added here
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

