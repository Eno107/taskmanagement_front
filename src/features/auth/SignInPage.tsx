import { SignIn } from '@clerk/react'

export function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <SignIn signUpUrl="/sign-up" />
    </div>
  )
}
