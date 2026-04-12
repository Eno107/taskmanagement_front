import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout'
import { ProtectedLayout } from './layouts/ProtectedLayout'
import { SignInPage } from './features/auth/SignInPage'
import { SignUpPage } from './features/auth/SignUpPage'
import { SignUpCompletePage } from './features/auth/SignUpCompletePage'
import { DashboardPage } from './features/dashboard/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — redirect to dashboard if already signed in */}
        <Route element={<PublicLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* Sign-up completion — needs Clerk auth but no DB user yet */}
        <Route path="/sign-up/complete" element={<SignUpCompletePage />} />

        {/* Protected routes — requires Clerk auth + DB user */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
