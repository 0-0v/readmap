import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GuestRoute } from '@/components/ui/GuestRoute'
import { ProtectedRoute } from '@/components/ui/ProtectedRoute'
import { AuthProvider } from '@/stores/authStore'
import { ToastProvider } from '@/stores/toastStore'
import AddBook from '@/views/AddBoks'
import Library from '@/views/Library'
import Login from '@/views/Login'
import MainMap from '@/views/MainMap'
import Signup from '@/views/Signup'

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
            <Route path="/" element={<MainMap />} />
            <Route path="/add" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
