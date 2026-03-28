import { UserButton } from '@clerk/react'

export function DashboardPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>TaskFlow</h1>
        <UserButton />
      </header>
      <p>Dashboard will go here.</p>
    </div>
  )
}
