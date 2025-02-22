'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@/app/context/AuthProvider'
import { redirect } from 'next/navigation'

export default function MicrosoftCallback() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const { login } = useAuth()
  
  useEffect(() => {
    if (code) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/microsoft`, {
        code
      })
        .then((res) => {
          login(res.data.user, res.data.accessToken)
          //wait for 1 second before redirecting
          setTimeout(() => {
            redirect('/dashboard')
          }, 1000)

        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [code])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      <div className="ml-5">Please wait while we sign you in</div>
    </div>
  )
}