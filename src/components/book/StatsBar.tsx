import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
interface StatsBarProps {
  countries: number
  continents: number
  books: number
  yearlyAdded: number
}
export function StatsBar({
  countries,
  continents,
  books,
  yearlyAdded,
}: StatsBarProps) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-white dark:bg-gray-800 rounded-full shadow-md px-2 py-2 flex items-center gap-6 border border-gray-100 dark:border-gray-700 max-w-fit mx-auto"
    >
      <div className="flex items-center gap-6 pl-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-primary">{countries}</span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            개국
          </span>
        </div>
        <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {continents}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            대륙
          </span>
        </div>
        <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {books}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            권
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 pr-1">
        <div className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20">
          <span className="text-xs font-bold text-primary-dark dark:text-primary">
            올해 +{yearlyAdded}권
          </span>
        </div>

        <button
          onClick={() => navigate('/add')}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white font-bold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />새 책 등록
        </button>
      </div>
    </motion.div>
  )
}
