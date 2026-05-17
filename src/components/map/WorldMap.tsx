import { UserBook } from '@/types/book'
import { MapColors } from '@/hooks/useMapColors'
import { countryCoordinatesMap, numericToAlpha3 } from '@/utils/countries'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { ZoomControls } from './ZoomControls'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface WorldMapProps {
  books: UserBook[]
  onCountryClick: (countryCode: string, books: UserBook[]) => void
  colors: MapColors
}

export function WorldMap({ books, onCountryClick, colors }: WorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ coordinates: [0, 10] as [number, number], zoom: 1 })

  // alpha-3 코드로 그룹화
  const countryBookMap = books.reduce((acc, book) => {
    if (!acc[book.country_code]) acc[book.country_code] = []
    acc[book.country_code].push(book)
    return acc
  }, {} as Record<string, UserBook[]>)

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }))
  }
  const handleZoomOut = () => {
    if (position.zoom <= 1) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }))
  }

  return (
    <div className="relative w-full h-full bg-cream dark:bg-navy-deep">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 175, center: [0, 10] }}
        width={980}
        height={500}
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={setPosition}
          maxZoom={4}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // geo.id는 ISO 숫자 코드 → alpha-3로 변환
                const alpha3 = numericToAlpha3[String(geo.id)]
                const booksInCountry = alpha3 ? countryBookMap[alpha3] : undefined
                const hasBooks = !!booksInCountry?.length

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(evt) => {
                      setTooltipPosition({ x: evt.clientX, y: evt.clientY })
                      setTooltipContent(
                        hasBooks
                          ? `${geo.properties.name} (${booksInCountry!.length}권)`
                          : geo.properties.name
                      )
                    }}
                    onMouseLeave={() => setTooltipContent('')}
                    onClick={() => hasBooks && alpha3 && onCountryClick(alpha3, booksInCountry!)}
                    style={{
                      default: {
                        fill: hasBooks ? colors.fill : '#E5E7EB',
                        stroke: '#FFFFFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                        fillOpacity: hasBooks ? 0.8 : 1,
                      },
                      hover: {
                        fill: hasBooks ? colors.fill : '#D1D5DB',
                        stroke: '#FFFFFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: hasBooks ? 'pointer' : 'default',
                        fillOpacity: hasBooks ? 1 : 1,
                      },
                      pressed: {
                        fill: hasBooks ? colors.fill : '#D1D5DB',
                        stroke: '#FFFFFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {/* 마커 — alpha-3 코드 기반, 클릭 시 패널 오픈 */}
          {Object.entries(countryBookMap).map(([alpha3, booksInCountry]) => {
            const coords = countryCoordinatesMap[alpha3]
            if (!coords) return null
            return (
              <Marker
                key={alpha3}
                coordinates={coords}
                onClick={() => onCountryClick(alpha3, booksInCountry)}
              >
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ cursor: 'pointer' }}
                >
                  <circle r={8} fill={colors.pin} fillOpacity={0.3} />
                  <circle r={4} fill={colors.pin} />
                  <circle r={1.5} fill="#FFFFFF" />
                </motion.g>
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>

      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ position: 'fixed', left: tooltipPosition.x + 10, top: tooltipPosition.y + 10, pointerEvents: 'none' }}
            className="bg-gray-900 dark:bg-gray-700 text-white px-3 py-2 rounded-xl text-sm shadow-lg z-50"
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
