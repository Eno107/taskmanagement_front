import { useEffect } from 'react'
import { useAuth, useUser, UserButton } from '@clerk/react'

const API_URL = import.meta.env.VITE_API_URL

export function DashboardPage() {
  const { getToken } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    async function syncUser() {
      if (!user) return

      const token = await getToken()

      await fetch(`${API_URL}/users`, {
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
    }

    syncUser()
  }, [user, getToken])

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Management</h1>
        <UserButton />
      </header>
      <p>Dashboard will go here.</p>
    </div>
  )
}
