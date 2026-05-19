import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/stores/authStore'
import { useToast } from '@/stores/toastStore'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const { showToast } = useToast()

  useEffect(() => {
    if (!loading && !user) {
      showToast('로그인 후 이용해주세요!')
    }
  }, [loading, user])

  if (loading) return null
  if (!user) return <Navigate to="/" replace />

  return <>{children}</>
}
