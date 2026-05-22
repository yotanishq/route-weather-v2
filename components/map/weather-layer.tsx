"use client"

import { Marker } from "react-map-gl/maplibre"

interface WeatherLayerProps {
  visibleWeatherPoints: any[]
  setPopupInfo: any
  setSelectedWeatherPoint: any
}

export function WeatherLayer({
  visibleWeatherPoints,
  setPopupInfo,
  setSelectedWeatherPoint
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

          return (

            <Marker
              key={index}
              longitude={point.coord[0]}
              latitude={point.coord[1]}
              onClick={() => setSelectedWeatherPoint(point)}
            >

              <div
                onClick={() =>
                  setPopupInfo(point)
                }
                className="
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
                  hover:scale-105
                  transition-all
                  duration-200
                "
              >

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