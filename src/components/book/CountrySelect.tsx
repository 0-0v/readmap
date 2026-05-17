import { useState, useRef, useEffect } from 'react'
import { COUNTRIES, Country } from '@/utils/countries'

interface CountrySelectProps {
  value: Country | null
  onChange: (country: Country) => void
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = query
    ? COUNTRIES.filter((c) => c.nameKo.includes(query))
    : COUNTRIES

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        value={open ? query : (value?.nameKo ?? '')}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { setOpen(true); setQuery('') }}
        placeholder="나라 검색 (예: 한국, 일본)"
        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
          {filtered.map((c) => (
            <li
              key={c.code}
              onClick={() => { onChange(c); setOpen(false); setQuery('') }}
              className="px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 hover:bg-primary/10 cursor-pointer"
            >
              {c.nameKo}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
