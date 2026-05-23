"use client"

import { Marker } from "react-map-gl/maplibre"
import { TrafficIncident } from "@/lib/tomtomTraffic"
import { useRouteStore } from "@/store/route-store"

interface AccidentLayerProps {
  selectedAccidentZone: any
  setSelectedAccidentZone: (zone: any) => void
  mapRef: any
  visible?: boolean
}

export function AccidentLayer({
  selectedAccidentZone,
  setSelectedAccidentZone,
  mapRef,
  visible = true
}: AccidentLayerProps) {

  const { trafficIncidents } = useRouteStore()

  if (!visible) return null

  console.log('Rendering traffic incident markers:', trafficIncidents.length)

  return (

    <>

      {trafficIncidents.map((incident) => {

        const isSelected =
          selectedAccidentZone &&
          selectedAccidentZone.id === incident.id

        const severityColor = incident.color
        const isHighRisk = incident.severity === "HIGH"

        return (

          <Marker
            key={incident.id}
            longitude={incident.geometry.coordinates[0][0]}
            latitude={incident.geometry.coordinates[0][1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setSelectedAccidentZone(incident)
              
              if (mapRef.current) {
                const currentZoom = mapRef.current.getZoom()
                const targetZoom = Math.min(currentZoom + 1.5, 10)
                
                mapRef.current.flyTo({
                  center: [incident.geometry.coordinates[0][0], incident.geometry.coordinates[0][1]],
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
