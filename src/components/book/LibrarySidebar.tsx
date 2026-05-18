import { Star } from 'lucide-react'
import { UserBook } from '@/types/book'

interface LibrarySidebarProps {
  books: UserBook[]
}

export function LibrarySidebar({ books }: LibrarySidebarProps) {
  if (books.length === 0) return null

  const countryCount = books.reduce((acc, b) => {
    acc[b.country] = (acc[b.country] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topCountry = Object.entries(countryCount).sort((a, b) => b[1] - a[1])[0]

  const now = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const thisMonthCount = books.filter(
    (b) => b.end_date?.startsWith(thisMonth) || (!b.end_date && b.created_at?.startsWith(thisMonth))
  ).length

  const avgRating = books.reduce((sum, b) => sum + b.rating, 0) / books.length

  const sortedCountries = Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
  const maxCount = sortedCountries[0]?.[1] ?? 1

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-4">
          서재 요약
        </h3>
        <div className="space-y-5">
          <div>
            <p className="text-xs text-gray-400 mb-1">가장 많이 읽은 나라</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {topCountry?.[0]}{' '}
              <span className="text-sm font-medium text-gray-500">{topCountry?.[1]}권</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">이번 달 읽은 책</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {thisMonthCount}권
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">평균 평점</p>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {avgRating.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-4">
          나라 분포
        </h3>
        <div className="space-y-3">
          {sortedCountries.map(([country, count]) => (
            <div key={country}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{country}</span>
                <span className="text-xs text-gray-400">{count}권</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(count / maxCount) * 100}%`, backgroundColor: '#5BA0A8' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
