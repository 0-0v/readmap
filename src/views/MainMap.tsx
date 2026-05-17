'use client'
import React, { useState } from 'react'
import { TopNav } from '../layouts/TopNav'
import { StatsBar } from '../components/book/StatsBar'
import { WorldMap } from '../components/map/WorldMap'
import { CountrySidePanel } from '../components/map/CountrySidePanel'
import { mockBooks, countryStats } from '../constants/books'
import { Book } from '../constants/books'
export default function MainMap() {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([])
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const handleCountryClick = (countryCode: string, books: Book[]) => {
    setSelectedCountry(books[0]?.country || '')
    setSelectedBooks(books)
    setIsPanelOpen(true)
  }
  return (
    <div className="w-full h-screen bg-cream dark:bg-navy-deep flex flex-col overflow-hidden">
      <TopNav />

      <div className="flex-1 relative">
        {/* Floating Stats Bar */}
        <div className="absolute top-6 left-0 right-0 z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <StatsBar
              countries={countryStats.totalCountries}
              continents={countryStats.totalContinents}
              books={countryStats.totalBooks}
              yearlyAdded={countryStats.yearlyAdded}
            />
          </div>
        </div>

        {/* Full bleed map */}
        <div className="w-full h-full">
          <WorldMap books={mockBooks} onCountryClick={handleCountryClick} />
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
