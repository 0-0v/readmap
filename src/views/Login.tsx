import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmail, signInWithKakao } from '@/services/auth'
import { AuthLayout } from '../layouts/AuthLayout'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signInWithEmail(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  const handleKakao = async () => {
    const { error } = await signInWithKakao()
    if (error) setError(error.message)
  }

  return (
    <AuthLayout mode="login">
      <div className="w-full">
        {/* Toggle Pill */}
        <div className="flex p-1 bg-gray-50 dark:bg-gray-800 rounded-xl mb-12">
          <Link
            to="/login"
            className="flex-1 text-center py-2.5 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold text-sm shadow-sm"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="flex-1 text-center py-2.5 rounded-lg text-gray-500 dark:text-gray-400 font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            회원가입
          </Link>
        </div>

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            다시 만나서 반가워요
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            이메일로 로그인하고 독서 여행을 이어가세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              className="w-full h-12 bg-transparent border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary dark:focus:border-primary outline-none transition-colors text-sm"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full h-12 bg-transparent border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary dark:focus:border-primary outline-none transition-colors text-sm"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold transition-colors mt-8 disabled:opacity-50"
          >
            {loading ? '로그인 중...' : '로그인'}
          </motion.button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-gray-800" />
            </div>
            <span className="relative px-4 bg-white dark:bg-gray-900 text-xs text-gray-400">
              또는 SNS 계정으로 계속하기
            </span>
          </div>

          <button
            onClick={handleKakao}
            className="w-full py-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors"
          >
            <div className="w-5 h-5 bg-[#FEE500] rounded flex items-center justify-center text-black font-bold text-xs">
              K
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              카카오로 계속하기
            </span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
