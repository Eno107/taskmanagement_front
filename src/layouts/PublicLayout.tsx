import { useAuth } from '@clerk/react'
import { Navigate, Outlet } from 'react-router-dom'

export function PublicLayout() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return null

  if (isSignedIn) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
