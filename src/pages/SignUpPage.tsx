import { SignUp } from '@clerk/react'

export function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <SignUp signInUrl="/sign-in" />
    </div>
  )
}
