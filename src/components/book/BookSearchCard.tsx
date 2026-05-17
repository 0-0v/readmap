'use client'
import { motion } from 'framer-motion'
import { Book } from '../../constants/books'
import { BookCover } from './BookCover'
interface BookSearchCardProps {
  book: Book
  isSelected: boolean
  onClick: () => void
}
export function BookSearchCard({
  book,
  isSelected,
  onClick,
}: BookSearchCardProps) {
  // Mock flag mapping
  const flags: Record<string, string> = {
    프랑스: '🇫🇷',
    브라질: '🇧🇷',
    콜롬비아: '🇨🇴',
    미국: '🇺🇸',
    독일: '🇩🇪',
    스페인: '🇪🇸',
    일본: '🇯🇵',
  }
  const flag = flags[book.country] || '🌍'
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      onClick={onClick}
      className={`p-5 rounded-2xl cursor-pointer transition-all border ${isSelected ? 'bg-primary/5 dark:bg-primary/10 border-primary ring-1 ring-primary' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-md'}`}
    >
      <div className="flex gap-5">
        <BookCover
          color={book.coverColor}
          className="w-16 h-24 flex-shrink-0"
        />
        <div className="flex-1 py-1">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {book.author}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium border border-gray-100 dark:border-gray-600">
              <span className="mr-1">{flag}</span>
              {book.country}
            </span>
            {book.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium border border-gray-100 dark:border-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
