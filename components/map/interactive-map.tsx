"use client"

import { useMapStore } from "@/store/map-store"
import { HeatmapLayer } from "./heatmap-layer"
import { MapControls } from "./map-controls"
import { useEffect, useRef, useState } from "react"
import { WeatherLayer } from "./weather-layer"
import maplibregl from "maplibre-gl"
import { VehicleLayer } from "./vehicle-layer"
import WeatherDetailPanel from "./weather-detail-panel"

import Map, {
  Marker,
  NavigationControl,
  Source
} from "react-map-gl/maplibre"

import { RouteLayer } from "./route-layer"

import "maplibre-gl/dist/maplibre-gl.css"

import { AnalyticsOverlay } from "./analytics-overlay"

import { getCoordinates, getRoute } from "@/lib/routing"
import { getWeather } from "@/lib/weather"

import {
  useRouteStore
} from "@/store/route-store"

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

  const [routeColor, setRouteColor] =
    useState("#34d399")

  const [startCoords, setStartCoords] =
    useState<[number, number] | null>(null)

  const [endCoords, setEndCoords] =
    useState<[number, number] | null>(null)

  const [vehiclePosition, setVehiclePosition] =
    useState<[number, number] | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [selectedWeatherPoint, setSelectedWeatherPoint] =
    useState<any | null>(null)

  const {
    routeGeoJSON,
    weatherPoints,
    distance,
    duration,

    setRouteGeoJSON,
    setWeatherPoints,
    setDistance,
    setDuration

  } = useRouteStore()

  const {
    mapMode,
    setMapMode,

    minimizedAnalytics,
    setMinimizedAnalytics,

    popupInfo,
    setPopupInfo,

    zoom,
    setZoom,

    viewState,
    setViewState

  } = useMapStore()

  const mapStyles = {
    normal:
      `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,

    terrain:
      `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,

    heatmap:
      `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`
  }

  async function fetchRoute() {

    if (!startPlace || !endPlace) {
      alert("Please enter both locations")
      return
    }

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

      setStartCoords(start as [number, number])
      setEndCoords(end as [number, number])

      const data = await getRoute(
        start as [number, number],
        end as [number, number]
      )

      const coordinates =
        data.features[0].geometry.coordinates

      setVehiclePosition(coordinates[0])

      let currentIndex = 0

      const interval = setInterval(() => {

        currentIndex += 1

        if (currentIndex >= coordinates.length) {
          clearInterval(interval)
          return
        }

        setVehiclePosition(
          coordinates[currentIndex]
        )

      }, 120)

      const summary =
        data.features[0].properties.summary

      const distanceKm =
        (summary.distance / 1000).toFixed(1)

      setDistance(parseFloat(distanceKm))
      setDuration(summary.duration)

      const sampledPoints =
        coordinates.filter(
          (_: any, index: number) =>
            index % 30 === 0
        )

      const weatherData = await Promise.all(

        sampledPoints.map(
          async (coord: [number, number]) => {

            const weather =
              await getWeather(
                coord[1],
                coord[0]
              )

            return { coord, weather }

          }
        )

      )

      const seenCities = new Set<string>()

      const dedupedWeatherData =
        weatherData.filter((point) => {

          const city = point.weather.name

          if (seenCities.has(city)) {
            return false
          }

          seenCities.add(city)

          return true

        })

      setWeatherPoints(dedupedWeatherData)

      let dynamicRouteColor = "#34d399"

      const hasStorm = weatherData.some(
        point =>
          point.weather.weather[0].main ===
          "Thunderstorm"
      )

      const hasRain = weatherData.some(
        point =>
          point.weather.weather[0].main ===
          "Rain"
      )

      if (hasStorm) {
        dynamicRouteColor = "#ef4444"
      }

      else if (hasRain) {
        dynamicRouteColor = "#f59e0b"
      }

      setRouteColor(dynamicRouteColor)

      setRouteGeoJSON(data)

      const bounds =
        new maplibregl.LngLatBounds()

      coordinates.forEach(
        (coord: [number, number]) => {
          bounds.extend(coord)
        }
      )

      mapRef.current?.fitBounds(bounds, {
        padding: 80,
        duration: 2000
      })

    }

    catch (err) {

      console.log(err)

      alert(
        "Something went wrong while generating route"
      )

    }

    finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    if (triggerRoute > 0) {
      fetchRoute()
    }

  }, [triggerRoute])

  const visibleWeatherPoints =
    weatherPoints.filter((_, index) => {

      if (zoom < 4) return index % 40 === 0
      if (zoom < 5) return index % 24 === 0
      if (zoom < 6) return index % 14 === 0
      if (zoom < 7.5) return index % 8 === 0
      if (zoom < 9) return index % 4 === 0
      if (zoom < 11) return index % 2 === 0

      return true

    })

  const weatherConditions =
    weatherPoints.map(
      point =>
        point.weather.weather[0].main
    )

  const hasStorm =
    weatherConditions.includes("Thunderstorm")

  const hasRain =
    weatherConditions.includes("Rain")

  const hasSnow =
    weatherConditions.includes("Snow")

  let travelAdvice =
    "Excellent travel conditions"

  let adviceColor =
    "text-emerald-400"

  if (hasStorm) {

    travelAdvice =
      "Storm activity detected"

    adviceColor = "text-red-500"

  }

  else if (hasRain) {

    travelAdvice =
      "Moderate rainfall expected"

    adviceColor = "text-amber-400"

  }

  else if (hasSnow) {

    travelAdvice =
      "Snow conditions detected"

    adviceColor = "text-blue-400"

  }

  return (

    <div className="
      relative
      w-full
      h-[75vh]
      rounded-3xl
      overflow-hidden
      border border-slate-200
      shadow-2xl
    ">

      {loading && (

        <div className="
          absolute
          inset-0
          z-50
          bg-black/20
          backdrop-blur-sm
          flex
          items-center
          justify-center
        ">

          <div className="
            px-5
            py-3
            rounded-2xl
            bg-white
            shadow-2xl
            border border-slate-200
            text-sm
            font-medium
            text-slate-700
          ">
            Generating intelligent route...
          </div>

        </div>

      )}

      <Map
        terrain={
          mapMode === "terrain"
            ? { source: "terrain" }
            : undefined
        }

        maxPitch={85}

        ref={mapRef}

        initialViewState={{
          longitude: 78.9629,
          latitude: 20.5937,
          zoom: 4.5,
          pitch: 60,
          bearing: -10
        }}

        onMove={(e) => {

          setZoom(e.viewState.zoom)

          setViewState({
            longitude: e.viewState.longitude,
            latitude: e.viewState.latitude,
            zoom: e.viewState.zoom
          })

        }}

        onClick={() => {
          setSelectedWeatherPoint(null)
        }}

        mapStyle={mapStyles[mapMode]}
      >

        <NavigationControl position="top-right" />

        <MapControls
          mapMode={mapMode}
          setMapMode={setMapMode}
        />

        <Source
          id="terrain"
          type="raster-dem"
          url={`https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
          tileSize={256}
        />

        <AnalyticsOverlay
          distance={parseFloat(distance.toFixed(1))}
          formattedDuration={`${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`}
          bestMode={
            hasStorm
              ? "Car"
              : hasRain
              ? "4-Wheeler"
              : "Bike"
          }
          minimizedAnalytics={minimizedAnalytics}
          setMinimizedAnalytics={setMinimizedAnalytics}
          routeGeoJSON={routeGeoJSON}
          visibleWeatherPoints={visibleWeatherPoints}
          travelAdvice={travelAdvice}
          adviceColor={adviceColor}
          onRelocateRoute={() => {

            if (!mapRef.current || !routeGeoJSON) {
              return
            }

            const coordinates =
              routeGeoJSON.features[0]
                .geometry.coordinates

            const bounds =
              new maplibregl.LngLatBounds(
                coordinates[0],
                coordinates[0]
              )

            coordinates.forEach(
              (coord: [number, number]) => {
                bounds.extend(coord)
              }
            )

            mapRef.current.fitBounds(bounds, {
              padding: 80,
              duration: 1400
            })

          }}
        />

        <RouteLayer
          routeGeoJSON={routeGeoJSON}
          routeColor={routeColor}
        />

        {startCoords && (

          <Marker
            longitude={startCoords[0]}
            latitude={startCoords[1]}
          >

            <div className="
              relative
              flex
              items-center
              justify-center
            ">

              <div className="
                absolute
                w-10
                h-10
                rounded-full
                bg-emerald-400/20
                animate-ping
              " />

              <div className="
                w-4
                h-4
                rounded-full
                bg-emerald-400
                border-2
                border-white
              " />

            </div>

          </Marker>

        )}

        {endCoords && (

          <Marker
            longitude={endCoords[0]}
            latitude={endCoords[1]}
          >

            <div className="
              relative
              flex
              items-center
              justify-center
            ">

              <div className="
                absolute
                w-10
                h-10
                rounded-full
                bg-red-400/20
                animate-ping
              " />

              <div className="
                w-4
                h-4
                rounded-full
                bg-red-400
                border-2
                border-white
              " />

            </div>

          </Marker>

        )}

        <VehicleLayer
          vehiclePosition={vehiclePosition}
        />

        {mapMode === "heatmap" && (

          <HeatmapLayer
            weatherPoints={weatherPoints}
          />

        )}

        {mapMode !== "heatmap" && (

          <WeatherLayer
            visibleWeatherPoints={visibleWeatherPoints}
            setSelectedWeatherPoint={setSelectedWeatherPoint}
            selectedWeatherPoint={selectedWeatherPoint}
            mapRef={mapRef}
          />

        )}
        
        {selectedWeatherPoint && (
          <WeatherDetailPanel
            point={selectedWeatherPoint}
            onClose={() => setSelectedWeatherPoint(null)}
          />
        )}
      </Map>

    </div>

  )

}