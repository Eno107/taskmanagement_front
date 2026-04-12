import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/react'
import { Navigate, Outlet } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

export function ProtectedLayout() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const [status, setStatus] = useState<'loading' | 'verified' | 'no-db-user'>('loading')

  useEffect(() => {
    async function verifyUser() {
      if (!isLoaded || !isSignedIn) return

      try {
        const token = await getToken()
        const response = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          setStatus('verified')
        } else {
          console.error(`GET /users/me failed: ${response.status}`)
          setStatus('no-db-user')
        }
      } catch (err) {
        console.error('Failed to verify user:', err)
        setStatus('no-db-user')
      }
    }

    verifyUser()
  }, [isLoaded, isSignedIn, getToken])

  if (!isLoaded) return null

  if (!isSignedIn) return <Navigate to="/sign-in" replace />

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (status === 'no-db-user') return <Navigate to="/sign-up/complete" replace />

  return <Outlet />
}
