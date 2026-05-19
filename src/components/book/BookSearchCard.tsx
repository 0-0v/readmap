import { motion } from 'framer-motion'
import { KakaoBook } from '@/services/kakaoBooks'

interface BookSearchCardProps {
  book: KakaoBook
  isSelected: boolean
  onClick: () => void
}

export function BookSearchCard({ book, isSelected, onClick }: BookSearchCardProps) {
  const year = book.datetime ? book.datetime.substring(0, 4) : ''
  const author = book.authors.join(', ')

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`p-5 rounded-2xl cursor-pointer transition-all border ${
        isSelected
          ? 'bg-primary/5 dark:bg-primary/10 border-primary ring-1 ring-primary'
          : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-md'
      }`}
    >
      <div className="flex gap-5">
        <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center px-1">
              표지 없음
            </div>
          )}
        </div>
        <div className="flex-1 py-1 min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">{book.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">{author}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{book.publisher} {year && `· ${year}`}</p>
          {book.translators.length > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium border border-gray-100 dark:border-gray-600">
              역 {book.translators.join(', ')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
