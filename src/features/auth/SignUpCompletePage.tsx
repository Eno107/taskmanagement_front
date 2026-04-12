import { useEffect, useRef, useState } from 'react'
import { useAuth, useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../api/users'
import { ApiError } from '../../api/client'

export function SignUpCompletePage() {
  const { getToken } = useAuth()
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const called = useRef(false)

  useEffect(() => {
    async function handleCreateUser() {
      if (!isLoaded || !user || called.current) return
      called.current = true

      try {
        const token = await getToken()
        if (!token) throw new Error('No auth token')

        await createUser(token, {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? '',
          name: user.fullName || user.firstName || 'Unknown',
          avatarUrl: user.imageUrl,
        })

        navigate('/dashboard', { replace: true })
      } catch (err) {
        // 409 = user already exists — that's fine
        if (err instanceof ApiError && err.status === 409) {
          navigate('/dashboard', { replace: true })
          return
        }
        console.error('SignUpComplete error:', err)
        setError('Something went wrong. Please try again.')
        called.current = false
      }
    }

    handleCreateUser()
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
