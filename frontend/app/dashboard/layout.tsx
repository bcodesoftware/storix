'use client'

import { useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'
import { redirect } from 'next/navigation'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      redirect('/auth/login')
    }
  }, [loading, isAuthenticated])

  return <div>{children}</div>
}
