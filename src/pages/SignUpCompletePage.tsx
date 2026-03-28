import { useEffect, useRef, useState } from 'react'
import { useAuth, useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

export function SignUpCompletePage() {
  const { getToken } = useAuth()
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const called = useRef(false)

  useEffect(() => {
    async function createUser() {
      if (!isLoaded || !user || called.current) return
      called.current = true

      try {
        const token = await getToken()

        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName || user.firstName || 'Unknown',
            avatarUrl: user.imageUrl,
          }),
        })

        // 201 = created, 409 = already exists — both are fine
        if (!response.ok && response.status !== 409) {
          throw new Error('Failed to create user')
        }

        navigate('/dashboard', { replace: true })
      } catch (err) {
        setError('Something went wrong. Please try again.')
        called.current = false
      }
    }

    createUser()
  }, [isLoaded, user, getToken, navigate])

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <p>Setting up your account...</p>
    </div>
  )
}
