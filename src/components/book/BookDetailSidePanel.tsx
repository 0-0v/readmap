import { UserBook } from '@/types/book'
import { deleteBook, updateBook } from '@/services/books'
import { Country, findCountry } from '@/utils/countries'
import { CountrySelect } from './CountrySelect'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface BookDetailSidePanelProps {
  book: UserBook | null
  onClose: () => void
  onUpdate: (updated: UserBook) => void
  onDelete: (id: string) => void
}

export function BookDetailSidePanel({ book, onClose, onUpdate, onDelete }: BookDetailSidePanelProps) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [rating, setRating] = useState(0)
  const [country, setCountry] = useState<Country | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (!book) { setEditing(false); setConfirmDelete(false); return }
    setRating(book.rating)
    setCountry(findCountry(book.country) ?? null)
    setStartDate(book.start_date ?? '')
    setEndDate(book.end_date ?? '')
    setNote(book.note ?? '')
    setEditing(false)
    setConfirmDelete(false)
  }, [book?.id])

  const handleSave = async () => {
    if (!book || !country) return
    setSaving(true)
    try {
      const patch = {
        rating,
        country: country.nameKo,
        country_code: country.code,
        start_date: startDate || null,
        end_date: endDate || null,
        note,
      }
      await updateBook(book.id, patch)
      onUpdate({ ...book, ...patch })
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (!book) return
    setRating(book.rating)
    setCountry(findCountry(book.country) ?? null)
    setStartDate(book.start_date ?? '')
    setEndDate(book.end_date ?? '')
    setNote(book.note ?? '')
    setEditing(false)
  }

  const handleDelete = async () => {
    if (!book) return
    setDeleting(true)
    try {
      await deleteBook(book.id)
      onDelete(book.id)
      onClose()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AnimatePresence>
      {book && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.01 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-transparent"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-4 top-20 bottom-4 w-full max-w-[360px] bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col rounded-3xl border border-gray-100 dark:border-gray-800"
          >
            {/* 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* 닫기 */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* 표지 + 기본 정보 */}
              <div className="flex gap-5 mb-8">
                <div className="w-28 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
                  {book.thumbnail ? (
                    <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      표지 없음
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-1">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate">
                    {book.authors.join(', ')}
                  </p>

                  {/* 평점 */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={() => editing && setRating(s)}
                        className={editing ? 'cursor-pointer' : 'cursor-default'}
                      >
                        <Star
                          className="w-4 h-4"
                          style={{
                            fill: s <= rating ? '#5BA0A8' : '#E5E7EB',
                            color: s <= rating ? '#5BA0A8' : '#E5E7EB',
                          }}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                      {rating.toFixed(1)}
                    </span>
                  </div>

                  {/* 나라 */}
                  {editing ? (
                    <CountrySelect value={country} onChange={setCountry} />
                  ) : (
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      📍 {book.country}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {book.publisher && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-400">출판사</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {book.publisher}
                    </span>
                  </div>
                )}

                <div className="py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 block mb-2">읽은 기간</span>
                  {editing ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none"
                      />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {book.start_date?.replace(/-/g, '.') ?? '?'} → {book.end_date?.replace(/-/g, '.') ?? '?'}
                    </span>
                  )}
                </div>

                <div className="py-3">
                  <span className="text-xs text-gray-400 block mb-2">나의 감상</span>
                  {editing ? (
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="이 책을 읽고 난 느낌을 적어보세요."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none resize-none"
                    />
                  ) : book.note ? (
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                      {book.note}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">감상이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <AnimatePresence>
                {confirmDelete && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mb-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800"
                  >
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-3">
                      정말 삭제하시겠어요? 되돌릴 수 없습니다.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="flex-1 py-2 rounded-lg border border-red-200 dark:border-red-700 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-50"
                      >
                        {deleting ? '삭제 중...' : '삭제'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {editing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !country}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-colors disabled:opacity-50"
                    style={{ backgroundColor: '#5BA0A8' }}
                  >
                    {saving ? '저장 중...' : '저장'}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(true); setConfirmDelete(false) }}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-colors"
                    style={{ backgroundColor: '#5BA0A8' }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => { setConfirmDelete(true); setEditing(false) }}
                    className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
