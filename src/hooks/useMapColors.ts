import { useState } from 'react'

export interface MapColors {
  pin: string
  fill: string
}

const DEFAULT: MapColors = { pin: '#5BA0A8', fill: '#5BA0A8' }
const STORAGE_KEY = 'readmap_map_colors'

function load(): MapColors {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) }
  } catch {}
  return DEFAULT
}

export function useMapColors() {
  const [colors, setColors] = useState<MapColors>(load)

  const update = (next: Partial<MapColors>) => {
    const merged = { ...colors, ...next }
    setColors(merged)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  }

  const reset = () => {
    setColors(DEFAULT)
    localStorage.removeItem(STORAGE_KEY)
  }

  return { colors, update, reset }
}
