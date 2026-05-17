'use client'
import { Book } from '@/constants/books'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { ZoomControls } from './ZoomControls'
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
interface WorldMapProps {
  books: Book[]
  onCountryClick: (countryCode: string, books: Book[]) => void
}
export function WorldMap({ books, onCountryClick }: WorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
  })
  const [position, setPosition] = useState({
    coordinates: [0, 10] as [number, number],
    zoom: 1,
  })
  const countryBookMap = books.reduce(
    (acc, book) => {
      if (!acc[book.countryCode]) {
        acc[book.countryCode] = []
      }
      acc[book.countryCode].push(book)
      return acc
    },
    {} as Record<string, Book[]>,
  )
  const countryCoordinates: Record<string, [number, number]> = {
    DEU: [10.4515, 51.1657],
    ESP: [-3.7492, 40.4637],
    JPN: [138.2529, 36.2048],
    USA: [-95.7129, 37.0902],
    COL: [-74.2973, 4.5709],
    GBR: [-3.436, 55.3781],
    FRA: [2.2137, 46.2276],
    CZE: [15.473, 49.8175],
    BRA: [-51.9253, -14.235],
  }
  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition((pos) => ({
      ...pos,
      zoom: pos.zoom * 1.5,
    }))
  }
  const handleZoomOut = () => {
    if (position.zoom <= 1) return
    setPosition((pos) => ({
      ...pos,
      zoom: pos.zoom / 1.5,
    }))
  }
  const handleMoveEnd = (position: {
    coordinates: [number, number]
    zoom: number
  }) => {
    setPosition(position)
  }
  return (
    <div className="relative w-full h-full bg-cream dark:bg-navy-deep">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 175,
          center: [0, 10],
        }}
        width={980}
        height={500}
        style={{
          width: '100%',
          height: '100%',
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          maxZoom={4}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryCode = geo.id
                const booksInCountry = countryBookMap[countryCode]
                const hasBooks = booksInCountry && booksInCountry.length > 0
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(evt) => {
                      const { clientX, clientY } = evt
                      setTooltipPosition({
                        x: clientX,
                        y: clientY,
                      })
                      if (hasBooks) {
                        setTooltipContent(
                          `${geo.properties.name} (${booksInCountry.length}권)`,
                        )
                      } else {
                        setTooltipContent(geo.properties.name)
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('')
                    }}
                    onClick={() => {
                      if (hasBooks) {
                        onCountryClick(countryCode, booksInCountry)
                      }
                    }}
                    style={{
                      default: {
                        fill: hasBooks ? '#5BA0A8' : '#E5E7EB',
                        stroke: '#FFFFFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        fillOpacity: hasBooks ? 0.8 : 1,
                      },
                      hover: {
                        fill: hasBooks ? '#4A8A91' : '#D1D5DB',
                        stroke: '#FFFFFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: hasBooks ? 'pointer' : 'default',
                      },
                      pressed: {
                        fill: hasBooks ? '#3A7A81' : '#D1D5DB',
                        stroke: '#FFFFFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                    }}
                    className="dark:fill-gray-800 dark:hover:fill-gray-700"
                  />
                )
              })
            }
          </Geographies>

          {Object.entries(countryCoordinates).map(([code, coords]) => {
            const booksInCountry = countryBookMap[code]
            if (!booksInCountry || booksInCountry.length === 0) return null
            return (
              <Marker key={code} coordinates={coords}>
                <motion.g
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  {/* Radar dot style pin */}
                  <circle r={8} fill="#5BA0A8" fillOpacity={0.3} />
                  <circle r={4} fill="#5BA0A8" />
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
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            style={{
              position: 'fixed',
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y + 10,
              pointerEvents: 'none',
            }}
            className="bg-gray-900 dark:bg-gray-700 text-white px-3 py-2 rounded-xl text-sm shadow-lg z-50"
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
