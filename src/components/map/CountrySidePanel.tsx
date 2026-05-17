import { UserBook } from '@/types/book'
import { BookDetailSidePanel } from '@/components/book/BookDetailSidePanel'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

interface CountrySidePanelProps {
  isOpen: boolean
  onClose: () => void
  books: UserBook[]
  country: string
  onBookUpdate: (updated: UserBook) => void
  onBookDelete: (id: string) => void
}

export function CountrySidePanel({ isOpen, onClose, books, country, onBookUpdate, onBookDelete }: CountrySidePanelProps) {
  const [selectedBook, setSelectedBook] = useState<UserBook | null>(null)

  const avgRating = books.length > 0
    ? (books.reduce((sum, b) => sum + (b.rating || 0), 0) / books.length).toFixed(1)
    : '0.0'

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/10 dark:bg-black/40 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-20 bottom-4 w-full max-w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto rounded-3xl border border-gray-100 dark:border-gray-800"
              style={{
                right: selectedBook ? 392 : 16,
                transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{country}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-around mb-8 px-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{books.length}</div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">읽은 책</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{avgRating}</div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">평균 평점</div>
                  </div>
                </div>

                {/* Tab */}
                <div className="flex items-center gap-6 border-b border-gray-100 dark:border-gray-800 mb-6">
                  <button className="pb-3 text-sm font-bold text-gray-900 dark:text-white border-b-2" style={{ borderColor: '#5BA0A8' }}>
                    읽은 책 · {books.length}
                  </button>
                </div>

                {/* Book List */}
                <div className="space-y-6">
                  {books.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedBook(book)}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div className="w-14 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {book.thumbnail ? (
                          <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ background: '#5BA0A820', color: '#5BA0A8' }}>
                            {book.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 py-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:opacity-70 transition-opacity truncate">
                          {book.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                          {book.authors.join(', ')}
                        </p>
                        <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                          <span style={{ color: '#5BA0A8' }}>★</span> {book.rating.toFixed(1)}
                          {book.end_date && ` · ${book.end_date.replace(/-/g, '.')}`}
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

      <BookDetailSidePanel
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onUpdate={(updated) => {
          onBookUpdate(updated)
          setSelectedBook(updated)
        }}
        onDelete={(id) => {
          onBookDelete(id)
          setSelectedBook(null)
        }}
      />
    </>
  )
}
