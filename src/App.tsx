import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Show } from '@clerk/react'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Show when="signed-out" fallback={<Navigate to="/dashboard" replace />}>
              <SignInPage />
            </Show>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Show when="signed-out" fallback={<Navigate to="/dashboard" replace />}>
              <SignUpPage />
            </Show>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Show when="signed-in" fallback={<Navigate to="/sign-in" replace />}>
              <DashboardPage />
            </Show>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
