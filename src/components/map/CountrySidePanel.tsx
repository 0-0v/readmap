'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { Book } from '@/constants/books'
import { BookCover } from '../book/BookCover'
interface CountrySidePanelProps {
  isOpen: boolean
  onClose: () => void
  books: Book[]
  country: string
}
export function CountrySidePanel({
  isOpen,
  onClose,
  books,
  country,
}: CountrySidePanelProps) {
  // Mock country data mapping for flags and regions
  const countryData: Record<
    string,
    {
      flag: string
      region: string
    }
  > = {
    프랑스: {
      flag: '🇫🇷',
      region: 'Europe · 서유럽',
    },
    브라질: {
      flag: '🇧🇷',
      region: 'South America · 남미',
    },
    콜롬비아: {
      flag: '🇨🇴',
      region: 'South America · 남미',
    },
    미국: {
      flag: '🇺🇸',
      region: 'North America · 북미',
    },
    독일: {
      flag: '🇩🇪',
      region: 'Europe · 서유럽',
    },
    스페인: {
      flag: '🇪🇸',
      region: 'Europe · 남유럽',
    },
    일본: {
      flag: '🇯🇵',
      region: 'Asia · 동아시아',
    },
  }
  const data = countryData[country] || {
    flag: '🌍',
    region: 'World',
  }
  // Calculate total pages and average rating
  const totalPages = books.reduce((sum, book) => sum + (book.pageCount || 0), 0)
  const avgRating =
    books.length > 0
      ? (
          books.reduce((sum, book) => sum + (book.rating || 0), 0) /
          books.length
        ).toFixed(1)
      : '0.0'
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/10 dark:bg-black/40 z-40"
          />
          <motion.div
            initial={{
              x: '100%',
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            className="fixed right-4 top-20 bottom-4 w-full max-w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto rounded-3xl border border-gray-100 dark:border-gray-800"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{data.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                      {country}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {data.region}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between mb-8 px-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {books.length}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    읽은 책
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {totalPages.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    총 페이지
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {avgRating}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    평균 평점
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                <button className="pb-3 text-sm font-bold text-gray-900 dark:text-white border-b-2 border-primary">
                  읽은 책 · {books.length}
                </button>
                <button className="pb-3 text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  읽고 싶은 책 · 3
                </button>
                <button className="pb-3 text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  메모
                </button>
              </div>

              {/* Book List */}
              <div className="space-y-6">
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <BookCover
                      color={book.coverColor}
                      className="w-14 h-20 flex-shrink-0 group-hover:shadow-md transition-shadow"
                    />
                    <div className="flex-1 py-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {book.author}
                      </p>
                      <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                        <span className="text-primary">★</span>{' '}
                        {book.rating.toFixed(1)} ·{' '}
                        {book.dateRead.replace(/-/g, '.')} · {book.pageCount}p
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
