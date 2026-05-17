'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { Book } from '../../constants/books'
import { BookCover } from './BookCover'
interface BookDetailPanelProps {
  book: Book | null
  onSave: (book: Book) => void
}
export function BookDetailPanel({ book, onSave }: BookDetailPanelProps) {
  const [note, setNote] = useState('')
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0],
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [rating, setRating] = useState(4)
  if (!book) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 min-h-[400px]">
        책을 선택해주세요
      </div>
    )
  }
  const handleSave = () => {
    onSave({
      ...book,
      dateRead: endDate,
      note,
      rating,
    })
  }
  const flags: Record<string, string> = {
    프랑스: '🇫🇷',
    브라질: '🇧🇷',
    콜롬비아: '🇨🇴',
    미국: '🇺🇸',
  }
  const flag = flags[book.country] || '🌍'
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="p-8 space-y-8"
    >
      {/* Header Info */}
      <div className="flex gap-6">
        <BookCover
          color={book.coverColor}
          className="w-32 h-48 flex-shrink-0 shadow-lg"
        />
        <div className="flex-1 pt-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {book.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">
            {book.author} · {book.year}
          </p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="block text-gray-400 text-xs mb-1">출판사</span>
              <span className="font-bold text-gray-900 dark:text-white">
                문학동네
              </span>
            </div>
            <div>
              <span className="block text-gray-400 text-xs mb-1">쪽수</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {book.pageCount}쪽
              </span>
            </div>
            <div>
              <span className="block text-gray-400 text-xs mb-1">장르</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {book.tags?.[0] || '소설'}
              </span>
            </div>
            <div>
              <span className="block text-gray-400 text-xs mb-1">원서</span>
              <span className="font-bold text-gray-900 dark:text-white">
                O Alquimista
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Country Section */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
          <span className="text-primary">📍</span> 배경 나라
        </h3>
        <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xl shadow-sm">
              {flag}
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">
                {book.country}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                South America · 미방문 · 첫 번째 책이 됩니다
              </div>
            </div>
          </div>
          <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            변경
          </button>
        </div>
      </div>

      {/* Plot Section */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
          <span className="text-gray-400">📖</span> 줄거리
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {book.note ||
            '자아의 신화를 찾아 떠나는 양치기 산티아고의 여행기. 만달루시아의 평원에서 이집트의 피라미드까지, 꿈을 좇아 사막을 건너며 만난 사람들과의 이야기가 펼쳐진다.'}
        </p>
      </div>

      {/* Record Section */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
          <span className="text-yellow-500">✍️</span> 나의 기록
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                읽기 시작
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border-none text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                완독일
              </label>
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
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${star <= rating ? 'fill-primary text-primary' : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              짧은 감상
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="사막과 별빛, 그리고 마음의 소리를 따라가는 여정."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.99,
        }}
        onClick={handleSave}
        className="w-full py-4 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-bold transition-colors shadow-md"
      >
        내 지도에 저장
      </motion.button>
    </motion.div>
  )
}
