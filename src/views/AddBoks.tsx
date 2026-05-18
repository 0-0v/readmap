import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookDetailPanel, SaveMeta } from '../components/book/BookDetailPanel'
import { BookSearchCard } from '../components/book/BookSearchCard'
import { TopNav } from '../layouts/TopNav'
import { KakaoBook, searchKakaoBooks } from '@/services/kakaoBooks'
import { saveBook } from '@/services/books'

export default function AddBook() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<KakaoBook[]>([])
  const [selectedBook, setSelectedBook] = useState<KakaoBook | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery.trim()) { setResults([]); return }
      setLoading(true)
      const books = await searchKakaoBooks(searchQuery)
      setResults(books)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSave = async (book: KakaoBook, meta: SaveMeta) => {
    setSaving(true)
    try {
      const { error } = await saveBook(book, meta)
      if (error) throw error
      navigate('/')
    } catch (e) {
      alert('저장 실패: ' + (e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-cream dark:bg-navy-deep flex flex-col">
      <TopNav />

      <div className="flex-1 max-w-7xl mx-auto w-full p-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">새 책 등록하기</h1>
            <p className="text-gray-500 dark:text-gray-400">읽은 책을 추가하고 지도에 핀을 꽂아보세요</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative">
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
                onClick={() => { setSearchQuery(''); setResults([]) }}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            {searchQuery && (
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-sm font-bold text-primary">
                  {loading ? '검색 중...' : `${results.length}`}
                  {!loading && <span className="text-gray-500 font-medium">개의 검색 결과</span>}
                </span>
              </div>
            )}
            <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2 pb-8">
              {!searchQuery ? (
                <div className="text-center py-20 text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                  책 제목이나 작가 이름을 검색해보세요
                </div>
              ) : loading ? (
                <div className="text-center py-20 text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                  검색 중...
                </div>
              ) : results.length > 0 ? (
                results.map((book) => (
                  <BookSearchCard
                    key={book.isbn}
                    book={book}
                    isSelected={selectedBook?.isbn === book.isbn}
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

          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
              <BookDetailPanel
                book={selectedBook}
                onSave={handleSave}
                saving={saving}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
