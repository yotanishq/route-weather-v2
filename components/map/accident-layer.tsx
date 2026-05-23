"use client"

import { Marker } from "react-map-gl/maplibre"
import { accidentZones, getSeverityColor, AccidentZone } from "@/lib/accident-zones"

interface AccidentLayerProps {
  selectedAccidentZone: AccidentZone | null
  setSelectedAccidentZone: (zone: AccidentZone | null) => void
  mapRef: any
  visible?: boolean
}

export function AccidentLayer({
  selectedAccidentZone,
  setSelectedAccidentZone,
  mapRef,
  visible = true
}: AccidentLayerProps) {

  if (!visible) return null

  return (

    <>

      {accidentZones.map((zone) => {

        const isSelected =
          selectedAccidentZone &&
          selectedAccidentZone.id === zone.id

        const severityColor = getSeverityColor(zone.severity)
        const isHighRisk = zone.severity === "high"

        return (

          <Marker
            key={zone.id}
            longitude={zone.coordinates[0]}
            latitude={zone.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelectedAccidentZone(zone)
              
              if (mapRef.current) {
                const currentZoom = mapRef.current.getZoom()
                const targetZoom = Math.min(currentZoom + 1.5, 10)
                
                mapRef.current.flyTo({
                  center: [zone.coordinates[0], zone.coordinates[1]],
                  zoom: targetZoom,
                  duration: 1200,
                  essential: true
                })
              }
            }}
          >

            <div
              className={`
                relative
                flex
                items-center
                justify-center
                cursor-pointer
                transition-all
                duration-500
                ${isSelected ? 'scale-110' : 'hover:scale-105'}
              `}
            >

              {/* Ambient glow - always present but subtle */}
              <div
                className="
                  absolute
                -inset-6
                rounded-full
                blur-xl
                opacity-40
              "
                style={{ backgroundColor: severityColor }}
              />

              {/* Pulse ring for high-risk zones */}
              {isHighRisk && (
                <div
                  className="
                    absolute
                    -inset-8
                    rounded-full
                    blur-md
                    animate-pulse
                  "
                  style={{ 
                    backgroundColor: severityColor,
                    animationDuration: '3s',
                    opacity: 0.3
                  }}
                />
              )}

              {/* Selected state glow */}
              {isSelected && (
                <div
                  className="
                    absolute
                    -inset-5
                    rounded-full
                    blur-lg
                  "
                  style={{ 
                    backgroundColor: severityColor,
                    opacity: 0.6
                  }}
                />
              )}

              {/* Warning icon container */}
              <div
                className="
                  relative
                w-8
                h-8
                rounded-full
                flex
                items-center
                justify-center
                border
                backdrop-blur-sm
              "
                style={{
                  backgroundColor: `${severityColor}20`,
                  borderColor: isSelected ? severityColor : 'rgba(255,255,255,0.2)',
                  borderWidth: isSelected ? '2px' : '1px'
                }}
              >

                <span className="text-sm opacity-90">
                  ⚠️
                </span>

              </div>

              {/* Risk indicator dot */}
              <div
                className="
                  absolute
                  -top-1
                  -right-1
                  w-3
                  h-3
                  rounded-full
                  border-2
                  border-black
                "
                style={{ backgroundColor: severityColor }}
              />

            </div>

          </Marker>

        )

      })}

    </>

  )

}
