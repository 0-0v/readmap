import { signOut } from '@/services/auth'
import { useAuth } from '@/stores/authStore'
import { Bell, ChevronRight, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components/ui/Logo'

import Betty from '@/assets/images/Betty.png'
import Conan from '@/assets/images/Conan.png'
import Erick from '@/assets/images/Erick.png'
import Hannah from '@/assets/images/Hannah.png'
import Hansel from '@/assets/images/Hansel.png'
import Janet from '@/assets/images/Janet.png'
import Jonas from '@/assets/images/Jonas.png'
import Mark from '@/assets/images/Mark.png'
import Ruby from '@/assets/images/Ruby.png'
import Tracy from '@/assets/images/Tracy.png'

const profileImages = [Betty, Conan, Erick, Hannah, Hansel, Janet, Jonas, Mark, Ruby, Tracy]

export function TopNav() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const profileImage = useMemo(() => {
    if (!user) return null
    const index = user.id.charCodeAt(0) % profileImages.length
    return profileImages[index]
  }, [user])

  const nickname =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    '독자'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
            독서 여행 지도
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm transition-colors">
            지도
          </button>
          <button className="px-4 py-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 font-medium text-sm transition-colors">
            서재
          </button>
          <button className="px-4 py-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 font-medium text-sm transition-colors">
            통계
          </button>
          <button className="px-4 py-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 font-medium text-sm transition-colors">
            친구
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <img src={profileImage!} alt="프로필" className="w-full h-full object-cover" />
            </button>

            {open && (
              <div className="absolute right-0 top-11 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden">
                {/* 프로필 헤더 */}
                <div className="flex items-center gap-4 px-5 py-5">
                  <img
                    src={profileImage!}
                    alt="프로필"
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {nickname}
                  </span>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800" />

                {/* 메뉴 항목 */}
                <div className="py-1">
                  <button className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span>내 정보</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span>내 커뮤니티 프로필</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={async () => { await signOut(); setOpen(false); navigate('/') }}
                    className="w-full flex items-center px-5 py-3.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>



) : (
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold text-sm hover:bg-black dark:hover:bg-white transition-colors"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
