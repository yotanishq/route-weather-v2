"use client"

import { Marker } from "react-map-gl/maplibre"

interface WeatherLayerProps {
  visibleWeatherPoints: any[]
  setSelectedWeatherPoint: any
  selectedWeatherPoint: any
  mapRef: any
}

export function WeatherLayer({
  visibleWeatherPoints,
  setSelectedWeatherPoint,
  selectedWeatherPoint,
  mapRef
}: WeatherLayerProps) {

  return (

    <>

      {visibleWeatherPoints.map(
        (point, index) => {

          const condition =
            point.weather.weather[0].main

          let emoji = "☀"

          if (condition === "Rain") {
            emoji = "🌧"
          }

          else if (
            condition === "Thunderstorm"
          ) {
            emoji = "⛈"
          }

          else if (
            condition === "Clouds"
          ) {
            emoji = "☁"
          }

          else if (
            condition === "Snow"
          ) {
            emoji = "❄"
          }

          else if (
            condition === "Fog" ||
            condition === "Mist"
          ) {
            emoji = "🌫"
          }

          const isSelected =
            selectedWeatherPoint &&
            selectedWeatherPoint.coord[0] === point.coord[0] &&
            selectedWeatherPoint.coord[1] === point.coord[1]

          return (

            <Marker
              key={index}
              longitude={point.coord[0]}
              latitude={point.coord[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setSelectedWeatherPoint(point)
                
                if (mapRef.current) {
                  const currentZoom = mapRef.current.getZoom()
                  const targetZoom = Math.min(currentZoom + 1, 9)
                  
                  mapRef.current.flyTo({
                    center: [point.coord[0], point.coord[1]],
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
                  px-3
                  py-2
                  rounded-2xl
                  bg-white/92
                  backdrop-blur-xl
                  border
                  border-white/40
                  shadow-2xl
                  min-w-[120px]
                  cursor-pointer
                  transition-all
                  duration-200
                  ${isSelected ? 'scale-110 border-emerald-400/60' : 'hover:scale-105'}
                `}
              >
                {isSelected && (
                  <div className="
                    absolute
                    -inset-1
                    -z-10
                    rounded-2xl
                    bg-emerald-400/30
                    blur-sm
                    animate-pulse
                  " />
                )}

                <div className="flex items-center gap-2">

                  <div className="text-lg">
                    {emoji}
                  </div>

                  <div>

                    <div className="
                      text-sm
                      font-bold
                      text-slate-900
                    ">

                      {Math.round(
                        point.weather.main.temp
                      )}°C

                    </div>

                    <div className="
                      text-[10px]
                      text-slate-500
                    ">

                      {condition}

                    </div>

                    <div className="
                      text-[11px]
                      font-semibold
                      text-slate-700
                      mt-1
                      leading-tight
                      truncate
                    ">

                      {point.weather.name}

                    </div>

                  </div>

                </div>

              </div>

            </Marker>

          )

        }
      )}

    </>

  )

}