import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Grid, List, Search } from 'lucide-react'
import { TopNav } from '../layouts/TopNav'
import { BookCard } from '@/components/book/BookCard'
import { LibrarySidebar } from '@/components/book/LibrarySidebar'
import { getUserBooks } from '@/services/books'
import { UserBook } from '@/types/book'

type SortKey = 'recent' | 'rating' | 'title'

const SORT_LABELS: Record<SortKey, string> = {
  recent: '최근 읽은 순',
  rating: '평점 높은 순',
  title: '제목 순',
}

export default function Library() {
  const [books, setBooks] = useState<UserBook[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCountry, setFilterCountry] = useState('전체')
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState<SortKey>('recent')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getUserBooks()
      .then(setBooks)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!sortOpen) return
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [sortOpen])

  const countries = ['전체', ...Array.from(new Set(books.map((b) => b.country)))]

  const filtered = books
    .filter(
      (b) =>
        !searchQuery ||
        b.title.includes(searchQuery) ||
        b.authors.some((a) => a.includes(searchQuery))
    )
    .filter((b) => filterCountry === '전체' || b.country === filterCountry)
    .filter((b) => b.rating >= minRating)
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'title') return a.title.localeCompare(b.title, 'ko')
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-deep">
      <TopNav />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* 헤더 */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">내 서재</h1>
            <p className="text-gray-500 dark:text-gray-400">
              <span className="text-primary font-bold">{books.length}권</span>의 책이 모여 만든
              나의 작은 도서관
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* 정렬 */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {SORT_LABELS[sort]}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setSort(key); setSortOpen(false) }}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                        sort === key
                          ? 'text-primary font-bold bg-primary/5'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 뷰 모드 */}
            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* 메인 */}
          <div className="flex-1 min-w-0">
            {/* 필터 패널 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 mb-6">
              <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="제목 또는 작가로 검색"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                />
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2.5">나라</p>
                <div className="flex flex-wrap gap-2">
                  {countries.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilterCountry(c)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        filterCountry === c
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2.5">최소 평점</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        minRating === r
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {r === 0 ? '전체' : `★ ${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{filtered.length}권 표시 중</p>

            {loading ? (
              <div className="flex items-center justify-center h-48 text-gray-400">불러오는 중...</div>
            ) : filtered.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400">
                조건에 맞는 책이 없습니다
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {filtered.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((book) => (
                  <div
                    key={book.id}
                    className="flex gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-18 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {book.thumbnail ? (
                        <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">{book.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {book.authors[0]}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-primary font-medium">★ {book.rating.toFixed(1)}</span>
                        <span>·</span>
                        <span>{book.country}</span>
                        {book.end_date && (
                          <>
                            <span>·</span>
                            <span>{book.end_date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="w-60 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <LibrarySidebar books={books} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
