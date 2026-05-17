'use client'
import React from 'react'
import { Plus, Minus } from 'lucide-react'
interface ZoomControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
}
export function ZoomControls({ onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div className="absolute bottom-8 right-8 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
      <button
        onClick={onZoomIn}
        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors border-b border-gray-100 dark:border-gray-700"
        aria-label="확대"
      >
        <Plus className="w-5 h-5" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        aria-label="축소"
      >
        <Minus className="w-5 h-5" />
      </button>
    </div>
  )
}
