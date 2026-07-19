"use client"

import { Marker } from "react-map-gl/maplibre"
import type { AccidentZone } from "@/lib/accidents"
import {
  getMarkerPresentation,
  getSeverityColor
} from "@/lib/accident-incident-copy"

interface AccidentLayerProps {
  zones: AccidentZone[]
  selectedIncident: AccidentZone | null
  setSelectedIncident: (zone: AccidentZone | null) => void
  mapRef: any
  visible?: boolean
}

function sameIncident(a: AccidentZone, b: AccidentZone): boolean {
  return (
    a.lat.toFixed(5) === b.lat.toFixed(5) &&
    a.lng.toFixed(5) === b.lng.toFixed(5)
  )
}

export function AccidentLayer({
  zones,
  selectedIncident,
  setSelectedIncident,
  mapRef,
  visible = true
}: AccidentLayerProps) {

  if (!visible) return null

  return (

    <>

      {zones.map((zone, index) => {
        const zoneId = `tomtom-incident-${index}`

        const isSelected =
          selectedIncident && sameIncident(selectedIncident, zone)

        const severityColor = getSeverityColor(zone)
        const marker = getMarkerPresentation(zone)

        return (

          <Marker
            key={zoneId}
            longitude={zone.lng}
            latitude={zone.lat}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelectedIncident(zone)
              
              if (mapRef.current) {
                const currentZoom = mapRef.current.getZoom()
                const targetZoom = Math.min(currentZoom + 1.5, 10)
                
                mapRef.current.flyTo({
                  center: [zone.lng, zone.lat],
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

              {marker.showPing && (
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
                  {marker.icon}
                </span>

              </div>

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
