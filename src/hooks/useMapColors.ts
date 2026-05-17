import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '@/services/profile'

export interface MapColors {
  pin: string
  fill: string
}

const DEFAULT: MapColors = { pin: '#5BA0A8', fill: '#5BA0A8' }

export function useMapColors() {
  const [colors, setColors] = useState<MapColors>(DEFAULT)

  useEffect(() => {
    getProfile().then((profile) => {
      if (!profile) return
      setColors({ pin: profile.map_pin_color, fill: profile.map_fill_color })
    })
  }, [])

  const update = (next: Partial<MapColors>) => {
    const merged = { ...colors, ...next }
    setColors(merged)
    updateProfile({ map_pin_color: merged.pin, map_fill_color: merged.fill })
  }

  const reset = () => {
    setColors(DEFAULT)
    updateProfile({ map_pin_color: DEFAULT.pin, map_fill_color: DEFAULT.fill })
  }

  return { colors, update, reset }
}
