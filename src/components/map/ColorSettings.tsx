import { AnimatePresence, motion } from 'framer-motion'
import { Palette, RotateCcw } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { MapColors } from '@/hooks/useMapColors'

const PRESETS = [
  '#5BA0A8', '#E07B5B', '#7B8EE0', '#6DBF8A',
  '#E0B95B', '#C06BB8', '#E05B7B', '#5B7BE0',
]

interface ColorSettingsProps {
  colors: MapColors
  onUpdate: (next: Partial<MapColors>) => void
  onReset: () => void
}

export function ColorSettings({ colors, onUpdate, onReset }: ColorSettingsProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
        title="지도 색상 설정"
      >
        <Palette className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-11 right-0 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">색상 설정</span>
              <button
                onClick={onReset}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                title="초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 프리셋 팔레트 */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate({ pin: color, fill: color })}
                  style={{ backgroundColor: color }}
                  className="w-9 h-9 rounded-lg transition-transform hover:scale-110 active:scale-95 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
                  title={color}
                />
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">핀 색상</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">{colors.pin}</span>
                  <label className="cursor-pointer">
                    <input
                      type="color"
                      value={colors.pin}
                      onChange={(e) => onUpdate({ pin: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0"
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">나라 색상</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">{colors.fill}</span>
                  <label className="cursor-pointer">
                    <input
                      type="color"
                      value={colors.fill}
                      onChange={(e) => onUpdate({ fill: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0"
                    />
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
