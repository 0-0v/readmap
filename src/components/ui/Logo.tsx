import React from 'react'
import { Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}
export function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const sizes = {
    sm: {
      icon: 'w-6 h-6',
      text: 'text-xl',
      tagline: 'text-xs',
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-2xl',
      tagline: 'text-sm',
    },
    lg: {
      icon: 'w-12 h-12',
      text: 'text-4xl',
      tagline: 'text-base',
    },
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Globe className={sizes[size].icon} style={{ color: '#5BA0A8' }} />
        <h1
          className={`${sizes[size].text} font-bold text-gray-900 dark:text-white`}
        >
          ReadMap
        </h1>
      </Link>
      {showTagline && (
        <p
          className={`${sizes[size].tagline} text-gray-600 dark:text-gray-400`}
        >
          내가 읽은 책으로 그리는 세계지도
        </p>
      )}
    </div>
  )
}
