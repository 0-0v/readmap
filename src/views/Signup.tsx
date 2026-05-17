import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithKakao, signUpWithEmail } from '@/services/auth'
import { AuthLayout } from '../layouts/AuthLayout'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    setError('')
    setLoading(true)
    const { error, data } = await signUpWithEmail(email, password, name)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else if (data.session) {
      navigate('/')
    } else {
      setSuccess(true)
    }
  }

  const handleKakao = async () => {
    const { error } = await signInWithKakao()
    if (error) setError(error.message)
  }

  if (success) {
    return (
      <AuthLayout mode="signup">
        <div className="w-full text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            이메일을 확인해주세요
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {email}로 인증 링크를 보냈습니다.<br />링크를 클릭해 가입을 완료하세요.
          </p>
          <Link to="/login" className="mt-8 inline-block text-sm text-primary font-bold hover:underline">
            로그인으로 돌아가기
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout mode="signup">
      <div className="w-full">
        {/* Toggle Pill */}
        <div className="flex p-1 bg-gray-50 dark:bg-gray-800 rounded-xl mb-12">
          <Link
            to="/login"
            className="flex-1 text-center py-2.5 rounded-lg text-gray-500 dark:text-gray-400 font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="flex-1 text-center py-2.5 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold text-sm shadow-sm"
          >
            회원가입
          </Link>
        </div>

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            독서 여행을 시작하세요
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            이메일로 가입하고 첫 핀을 꽂아보세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="여행하는 독자 (닉네임)"
              className="w-full h-12 bg-transparent border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary dark:focus:border-primary outline-none transition-colors text-sm"
              required
            />
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
              placeholder="비밀번호 (8자 이상)"
              className="w-full h-12 bg-transparent border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary dark:focus:border-primary outline-none transition-colors text-sm"
              required
              minLength={8}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${agreed ? 'bg-primary border-primary' : 'border-2 border-gray-300 dark:border-gray-600'}`}
            >
              {agreed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </button>
            <span
              className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => setAgreed(!agreed)}
            >
              이용약관 및 개인정보처리방침에 동의합니다
            </span>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading || !agreed}
            className="w-full py-4 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold transition-colors mt-4 disabled:opacity-50"
          >
            {loading ? '가입 중...' : '계정 만들기'}
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
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
