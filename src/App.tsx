import { Show, SignIn, UserButton } from '@clerk/react'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Show when="signed-out">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <SignIn />
        </div>
      </Show>

      <Show when="signed-in">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Task Management</h1>
          <UserButton />
        </header>
        <p>You're signed in! The dashboard will go here.</p>
      </Show>
    </div>
  )
}

export default App
