import React from 'react'
import { Logo } from '../components/ui/Logo'
interface AuthLayoutProps {
  children: React.ReactNode
  mode: 'login' | 'signup'
}
export function AuthLayout({ children, mode }: AuthLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-cream dark:bg-navy-deep flex">
      {/* Left Side - Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Logo size="sm" />
        </div>

        {/* Decorative Map Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-10 pointer-events-none">
          <svg viewBox="0 0 800 400" className="w-[120%] h-auto fill-primary">
            {/* Simplified abstract map shapes for decoration */}
            <path d="M200,150 Q220,140 250,160 T300,150 T350,180 T300,220 T250,200 Z" />
            <path d="M450,100 Q480,90 520,110 T580,100 T620,150 T550,180 Z" />
            <path d="M600,220 Q620,210 650,230 T680,280 T620,300 Z" />
            <path d="M150,250 Q180,240 200,280 T180,320 T120,300 Z" />
          </svg>

          {/* Decorative Pins */}
          <div className="absolute top-[35%] left-[45%] flex flex-col items-center">
            <div className="bg-white dark:bg-gray-800 text-primary text-xs font-bold px-2 py-1 rounded-full shadow-sm mb-1">
              France · 5권
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-primary bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          </div>

          <div className="absolute top-[45%] left-[65%] flex flex-col items-center">
            <div className="w-3 h-3 rounded-full border-2 border-primary bg-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        <div className="relative z-10 mb-12">
          <p className="text-primary font-bold text-xs tracking-widest uppercase mb-4">
            A Reader's Atlas
          </p>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            한 권의 책은
            <br />한 번의 <span className="text-primary">여행</span>입니다.
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            읽은 책의 배경 나라에 핀을 꽂고, 나만의 세계지도를 완성하세요.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
