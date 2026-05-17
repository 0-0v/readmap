import { useEffect, useState } from 'react'
import { TopNav } from '../layouts/TopNav'
import { StatsBar } from '../components/book/StatsBar'
import { WorldMap } from '../components/map/WorldMap'
import { CountrySidePanel } from '../components/map/CountrySidePanel'
import { ColorSettings } from '../components/map/ColorSettings'
import { getUserBooks } from '@/services/books'
import { useMapColors } from '@/hooks/useMapColors'
import { findCountry } from '@/utils/countries'
import { UserBook } from '@/types/book'

export default function MainMap() {
  const [books, setBooks] = useState<UserBook[]>([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedBooks, setSelectedBooks] = useState<UserBook[]>([])
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const { colors, update, reset } = useMapColors()

  useEffect(() => {
    getUserBooks()
      .then(setBooks)
      .catch(() => {})
  }, [])

  const handleCountryClick = (_code: string, booksInCountry: UserBook[]) => {
    setSelectedCountry(booksInCountry[0]?.country ?? '')
    setSelectedBooks(booksInCountry)
    setIsPanelOpen(true)
  }

  const countryCount = new Set(books.map((b) => b.country_code)).size
  const continentCount = new Set(
    books.map((b) => findCountry(b.country)?.continent).filter(Boolean)
  ).size
  const yearlyAdded = books.filter(
    (b) => b.created_at?.startsWith(new Date().getFullYear().toString())
  ).length

  return (
    <div className="w-full h-screen bg-cream dark:bg-navy-deep flex flex-col overflow-hidden">
      <TopNav />

      <div className="flex-1 relative">
        <div className="absolute top-6 left-0 right-0 z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <StatsBar
              countries={countryCount}
              continents={continentCount}
              books={books.length}
              yearlyAdded={yearlyAdded}
            />
          </div>
        </div>

        {/* 색상 설정 버튼 — 줌 컨트롤 왼쪽 */}
        <div className="absolute bottom-8 right-24 z-20">
          <ColorSettings colors={colors} onUpdate={update} onReset={reset} />
        </div>

        <div className="w-full h-full">
          <WorldMap books={books} onCountryClick={handleCountryClick} colors={colors} />
        </div>

        <CountrySidePanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          books={selectedBooks}
          country={selectedCountry}
        />
      </div>
    </div>
  )
}
