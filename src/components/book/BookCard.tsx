import { Star } from 'lucide-react'
import { UserBook } from '@/types/book'

interface BookCardProps {
  book: UserBook
  onClick?: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  const author = book.authors[0] ?? ''

  return (
    <div onClick={onClick} className="cursor-pointer group">
      <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 shadow-md group-hover:shadow-xl transition-shadow duration-200">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            표지 없음
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 mb-0.5 leading-snug">
        {book.title}
      </h3>
      {author && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">{author}</p>
      )}
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <Star className="w-3 h-3 fill-primary text-primary" />
        <span className="text-primary font-medium">{book.rating.toFixed(1)}</span>
        <span>·</span>
        <span>{book.country}</span>
      </div>
    </div>
  )
}
