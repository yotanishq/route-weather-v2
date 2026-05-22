"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import maplibregl from "maplibre-gl"

import Map, {
  NavigationControl,
  Popup
} from "react-map-gl/maplibre"

import "maplibre-gl/dist/maplibre-gl.css"

import {
  getCoordinates,
  getRoute
} from "@/lib/routing"

import { HeatmapLayer } from "./heatmap-layer"
import { RouteLayer } from "./route-layer"
import { VehicleLayer } from "./vehicle-layer"
import { WeatherLayer } from "./weather-layer"
import { MapControls } from "./map-controls"

interface InteractiveMapProps {
  startPlace: string
  endPlace: string
  triggerRoute: number
}

export function InteractiveMap({
  startPlace,
  endPlace,
  triggerRoute
}: InteractiveMapProps) {

  const mapRef = useRef<any>(null)

  const [mapMode, setMapMode] =
    useState<
      "normal" |
      "terrain" |
      "heatmap"
    >("normal")

  const [routeGeoJSON, setRouteGeoJSON] =
    useState<any>(null)

  const [
    visibleWeatherPoints,
    setVisibleWeatherPoints
  ] = useState<any[]>([])

  const [
    vehiclePosition,
    setVehiclePosition
  ] = useState<
    [number, number] | null
  >(null)

  const [distance, setDistance] =
    useState("0 km")

  const [duration, setDuration] =
    useState("0h")

  const [loading, setLoading] =
    useState(false)

  const [popupInfo, setPopupInfo] =
    useState<any>(null)

  const [
    minimizedAnalytics,
    setMinimizedAnalytics
  ] = useState(false)

  const routeColor = useMemo(() => {

    if (
      visibleWeatherPoints.some(
        p =>
          p.weather.weather[0].main ===
          "Thunderstorm"
      )
    ) {
      return "#ef4444"
    }

    if (
      visibleWeatherPoints.some(
        p =>
          p.weather.weather[0].main ===
          "Rain"
      )
    ) {
      return "#38bdf8"
    }

    return "#f59e0b"

  }, [visibleWeatherPoints])

  useEffect(() => {

    if (!triggerRoute) return

    fetchRoute()

  }, [triggerRoute])

  async function getWeather(
    lat: number,
    lon: number
  ) {

    try {

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}&units=metric`
      )

      return await response.json()

    }

    catch {

      return null

    }

  }

  async function fetchRoute() {

    try {

      setLoading(true)

      const start =
        await getCoordinates(startPlace)

      const end =
        await getCoordinates(endPlace)

      if (!start || !end) {

        setLoading(false)

        return

      }

      const data =
        await getRoute(start, end)

      const coordinates =
        data.features[0]
          .geometry.coordinates

      setRouteGeoJSON(data)

      /*
      DISTANCE
      */

      setDistance(
        `${(
          data.features[0]
            .properties.summary.distance / 1000
        ).toFixed(1)} km`
      )

      /*
      DURATION
      */

      const totalMinutes =
        Math.floor(
          data.features[0]
            .properties.summary.duration / 60
        )

      const hours =
        Math.floor(totalMinutes / 60)

      const minutes =
        totalMinutes % 60

      setDuration(
        `${hours}h ${minutes}m`
      )

      /*
      WEATHER POINTS
      */

      const sampledPoints =
        coordinates.filter(
          (_: any, index: number) =>
            index % 80 === 0
        )

      const weatherData =
        await Promise.all(

          sampledPoints.map(
            async (coord: any) => {

              const weather =
                await getWeather(
                  coord[1],
                  coord[0]
                )

              return {
                coord,
                weather
              }

            }
          )

        )

      const validWeather =
        weatherData.filter(
          point => point.weather
        )

      setVisibleWeatherPoints(
        validWeather.slice(0, 10)
      )

      /*
      FIT MAP
      */

      if (mapRef.current) {

        const bounds =
          coordinates.reduce(
            (
              bounds: any,
              coord: any
            ) => {

              bounds.extend(coord)

              return bounds

            },
            new maplibregl.LngLatBounds(
              coordinates[0],
              coordinates[0]
            )
          )

        mapRef.current.fitBounds(
          bounds,
          {
            padding: 100,
            duration: 2000
          }
        )

      }

      /*
      VEHICLE
      */

      let currentIndex = 0

      const animation =
        setInterval(() => {

          if (
            currentIndex >=
            coordinates.length
          ) {

            clearInterval(animation)

            return

          }

          setVehiclePosition(
            coordinates[currentIndex]
          )

          currentIndex += 1

        }, 120)

      setLoading(false)

    }

    catch (error) {

      console.error(error)

      alert(
        "Something went wrong while generating route"
      )

      setLoading(false)

    }

  }

  return (

    <div className="
      relative
      w-full
      h-[650px]
      rounded-3xl
      overflow-hidden
      border
      border-white/10
      shadow-2xl
    ">

      <Map
        ref={mapRef}

        initialViewState={{
          longitude: 78.9629,
          latitude: 22.5937,
          zoom: 4
        }}

        style={{
          width: "100%",
          height: "100%"
        }}

        mapStyle="
https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json
"

      >

        <NavigationControl
          position="top-right"
        />

        <MapControls
          mapMode={mapMode}
          setMapMode={setMapMode}
        />

        {/* ROUTE */}

        <RouteLayer
          routeGeoJSON={routeGeoJSON}
          routeColor={routeColor}
        />

        {/* HEATMAP */}

        {mapMode === "heatmap" && (

          <HeatmapLayer
            weatherPoints={
              visibleWeatherPoints
            }
          />

        )}

        {/* WEATHER */}

        {mapMode === "normal" && (

          <WeatherLayer
            visibleWeatherPoints={
              visibleWeatherPoints
            }

            setPopupInfo={
              setPopupInfo
            }
          />

        )}

        {/* VEHICLE */}

        <VehicleLayer
          vehiclePosition={
            vehiclePosition
          }
        />

        {/* POPUP */}

        {popupInfo && (

          <Popup
            longitude={
              popupInfo.coord[0]
            }

            latitude={
              popupInfo.coord[1]
            }

            closeButton={true}

            closeOnClick={false}

            onClose={() =>
              setPopupInfo(null)
            }
          >

            <div className="
              text-sm
              text-slate-900
            ">

              <div className="
                font-bold
                mb-1
              ">

                {
                  popupInfo.weather.name
                }

              </div>

              <div>

                {
                  popupInfo.weather
                    .weather[0].main
                }

              </div>

              <div>

                {Math.round(
                  popupInfo.weather
                    .main.temp
                )}°C

              </div>

            </div>

          </Popup>

        )}

      </Map>

      {/* ANALYTICS */}

      {routeGeoJSON && (

        minimizedAnalytics ? (

          <div className="
            absolute
            top-4
            left-4
            z-50
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-2xl
            bg-black/80
            backdrop-blur-xl
            border
            border-white/10
          ">

            <div>

              <div className="
                text-[10px]
                uppercase
                tracking-widest
                text-slate-500
              ">

                Distance

              </div>

              <div className="
                text-white
                font-bold
                text-lg
              ">

                {distance}

              </div>

            </div>

            <div className="
              w-px
              h-10
              bg-white/10
            " />

            <div>

              <div className="
                text-[10px]
                uppercase
                tracking-widest
                text-slate-500
              ">

                ETA

              </div>

              <div className="
                text-emerald-400
                font-bold
                text-lg
              ">

                {duration}

              </div>

            </div>

            <button
              onClick={() =>
                setMinimizedAnalytics(false)
              }

              className="
                ml-2
                w-8
                h-8
                rounded-full
                bg-white/10
                text-white
              "
            >

              +

            </button>

          </div>

        ) : (

          <div className="
            absolute
            top-4
            left-4
            z-50
            flex
            gap-3
          ">

            <div className="
              bg-black/80
              backdrop-blur-xl
              border
              border-white/10
              rounded-2xl
              px-5
              py-3
            ">

              <div className="
                text-[10px]
                uppercase
                tracking-widest
                text-slate-500
              ">

                Distance

              </div>

              <div className="
                text-white
                text-2xl
                font-bold
              ">

                {distance}

              </div>

            </div>

            <div className="
              bg-black/80
              backdrop-blur-xl
              border
              border-emerald-500/20
              rounded-2xl
              px-5
              py-3
              relative
            ">

              <button
                onClick={() =>
                  setMinimizedAnalytics(true)
                }

                className="
                  absolute
                  -top-2
                  -right-2
                  w-7
                  h-7
                  rounded-full
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/10
                  text-white
                  text-sm
                "
              >

                —

              </button>

              <div className="
                text-[10px]
                uppercase
                tracking-widest
                text-slate-500
              ">

                ETA

              </div>

              <div className="
                text-emerald-400
                text-2xl
                font-bold
              ">

                {duration}

              </div>

            </div>

          </div>

        )

      )}

      {/* LOADING */}

      {loading && (

        <div className="
          absolute
          inset-0
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
        ">

          <div className="
            px-6
            py-3
            rounded-2xl
            bg-white/10
            border
            border-white/10
            text-white
            backdrop-blur-xl
          ">

            Generating intelligent route...

          </div>

        </div>

      )}

    </div>

  )

}