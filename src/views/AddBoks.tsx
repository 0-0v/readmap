import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookDetailPanel } from '../components/book/BookDetailPanel'
import { BookSearchCard } from '../components/book/BookSearchCard'
import { TopNav } from '../layouts/TopNav'
import { Book, searchableBooks } from '../constants/books'
export default function AddBook() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [activeFilter, setActiveFilter] = useState('전체')
  const filters = [
    '전체',
    '소설',
    '에세이',
    '시',
    '논픽션',
    '한국문학',
    '번역도서',
  ]
  const filteredBooks = searchableBooks.filter(
    (book) =>
      (activeFilter === '전체' || book.tags?.includes(activeFilter)) &&
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())),
  )
  const handleSave = (book: Book) => {
    alert(`"${book.title}" 저장 완료!`)
    navigate('/')
  }
  return (
    <div className="w-full min-h-screen bg-cream dark:bg-navy-deep flex flex-col">
      <TopNav />

      <div className="flex-1 max-w-7xl mx-auto w-full p-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              새 책 등록하기
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              읽은 책을 추가하고 지도에 핀을 꽂아보세요
            </p>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            단계 <span className="text-primary font-bold">1</span> · 2 · 3
          </div>
        </div>

        {/* Search Area */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="책 제목 또는 작가 검색"
              className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeFilter === filter ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-transparent' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Results */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-sm font-bold text-primary">
                {filteredBooks.length}
                <span className="text-gray-500 font-medium">
                  개의 검색 결과
                </span>
              </span>
              <button className="text-sm text-gray-500 font-medium flex items-center gap-1 hover:text-gray-900 dark:hover:text-white">
                <span className="text-xs">↓</span> 관련도순
              </button>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2 pb-8">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookSearchCard
                    key={book.id}
                    book={book}
                    isSelected={selectedBook?.id === book.id}
                    onClick={() => setSelectedBook(book)}
                  />
                ))
              ) : (
                <div className="text-center py-20 text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Detail Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
              <BookDetailPanel book={selectedBook} onSave={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
