import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { KakaoBook } from '@/services/kakaoBooks'

interface BookDetailPanelProps {
  book: KakaoBook | null
  onSave: (book: KakaoBook, meta: { rating: number; startDate: string; endDate: string; note: string }) => void
}

export function BookDetailPanel({ book, onSave }: BookDetailPanelProps) {
  const [note, setNote] = useState('')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [rating, setRating] = useState(4)

  if (!book) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 min-h-[400px]">
        책을 선택해주세요
      </div>
    )
  }

  const year = book.datetime ? book.datetime.substring(0, 4) : ''
  const author = book.authors.join(', ')

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-8 space-y-8"
    >
      {/* Header */}
      <div className="flex gap-6">
        <div className="w-32 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-lg">
          {book.thumbnail ? (
            <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              표지 없음
            </div>
          )}
        </div>
        <div className="flex-1 pt-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {book.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">
            {author}{year && ` · ${year}`}
          </p>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="block text-gray-400 text-xs mb-1">출판사</span>
              <span className="font-bold text-gray-900 dark:text-white">{book.publisher || '-'}</span>
            </div>
            {book.translators.length > 0 && (
              <div>
                <span className="block text-gray-400 text-xs mb-1">역자</span>
                <span className="font-bold text-gray-900 dark:text-white">{book.translators.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 줄거리 */}
      {book.contents && (
        <div>
          <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
            <span className="text-gray-400">📖</span> 줄거리
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
            {book.contents}
          </p>
        </div>
      )}

      {/* 나의 기록 */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
          <span className="text-yellow-500">✍️</span> 나의 기록
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">읽기 시작</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border-none text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">완독일</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border-none text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">평점</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="p-1 focus:outline-none">
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-primary text-primary'
                        : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">짧은 감상</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="이 책을 읽고 난 느낌을 적어보세요."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onSave(book, { rating, startDate, endDate, note })}
        className="w-full py-4 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold transition-colors shadow-md"
      >
        내 지도에 저장
      </motion.button>
    </motion.div>
  )
}
