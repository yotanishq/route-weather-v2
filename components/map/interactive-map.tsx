"use client"
import { useMapStore } from "@/store/map-store"
import { HeatmapLayer } from "./heatmap-layer"
import { MapControls } from "./map-controls"
import { useEffect, useRef, useState } from "react"
import { WeatherLayer } from "./weather-layer"
import maplibregl from "maplibre-gl"
import { VehicleLayer } from "./vehicle-layer"
import Map, { Marker, NavigationControl, Source } from "react-map-gl/maplibre"
import { RouteLayer } from "./route-layer"
import "maplibre-gl/dist/maplibre-gl.css"
import { AnalyticsOverlay } from "./analytics-overlay"
import { getCoordinates, getRoute } from "@/lib/routing"
import { getWeather } from "@/lib/weather"

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

  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null)
  const [routeColor, setRouteColor] = useState("#34d399")
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null)
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null)
  const [vehiclePosition, setVehiclePosition] = useState<[number, number] | null>(null)
  const [weatherPoints, setWeatherPoints] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [distance, setDistance] = useState<string>("--")
  const [duration, setDuration] = useState<string>("--")

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
    normal: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
    terrain: `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
    heatmap: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`
  }

  async function fetchRoute() {

    if (!startPlace || !endPlace) {
      alert("Please enter both locations")
      return
    }

    try {

      setLoading(true)

      const start = await getCoordinates(startPlace)
      const end = await getCoordinates(endPlace)

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

      const coordinates = data.features[0].geometry.coordinates

      /* VEHICLE ANIMATION */

      let currentIndex = 0
      setVehiclePosition(coordinates[0])

      const interval = setInterval(() => {
        currentIndex += 1
        if (currentIndex >= coordinates.length) {
          clearInterval(interval)
          return
        }
        setVehiclePosition(coordinates[currentIndex])
      }, 120)

      /* ROUTE STATS */

      const summary = data.features[0].properties.summary
      const distanceKm = (summary.distance / 1000).toFixed(1)
      const durationHours = Math.floor(summary.duration / 3600)
      const durationMinutes = Math.floor((summary.duration % 3600) / 60)

      setDistance(`${distanceKm} km`)
      setDuration(`${durationHours}h ${durationMinutes}m`)

      /* WEATHER — sample every 50 coords */

      const sampledPoints = coordinates.filter(
        (_: any, index: number) => index % 30 === 0
      )

      const weatherData = await Promise.all(
  sampledPoints.map(async (coord: [number, number]) => {
    const weather = await getWeather(coord[1], coord[0])
    return { coord, weather }
  })
)

// Deduplicate by city name — keep first occurrence only
const seenCities = new Set<string>()
const dedupedWeatherData = weatherData.filter((point) => {
  const city = point.weather.name
  if (seenCities.has(city)) return false
  seenCities.add(city)
  return true
})

setWeatherPoints(dedupedWeatherData)

      /* ROUTE DANGER COLOR */

      let dynamicRouteColor = "#34d399"

      const hasStorm = weatherData.some(
        point => point.weather.weather[0].main === "Thunderstorm"
      )
      const hasRain = weatherData.some(
        point => point.weather.weather[0].main === "Rain"
      )

      if (hasStorm) dynamicRouteColor = "#ef4444"
      else if (hasRain) dynamicRouteColor = "#f59e0b"

      setRouteColor(dynamicRouteColor)
      setRouteGeoJSON(data)

      /* AUTO FIT */

      const bounds = new maplibregl.LngLatBounds()
      coordinates.forEach((coord: [number, number]) => {
        bounds.extend(coord)
      })

      mapRef.current?.fitBounds(bounds, {
        padding: 80,
        duration: 2000,
      })

    } catch (err) {
      console.log(err)
      alert("Something went wrong while generating route")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (triggerRoute > 0) {
      fetchRoute()
    }
  }, [triggerRoute])

  /* WEATHER DENSITY */

  const visibleWeatherPoints = weatherPoints.filter((_, index) => {
    if (zoom < 4) return index % 40 === 0
    if (zoom < 5) return index % 24 === 0
    if (zoom < 6) return index % 14 === 0
    if (zoom < 7.5) return index % 8 === 0
    if (zoom < 9) return index % 4 === 0
    if (zoom < 11) return index % 2 === 0
    return true
  })

  /* AI INSIGHTS */

  const weatherConditions = weatherPoints.map(
    point => point.weather.weather[0].main
  )

  const hasStorm = weatherConditions.includes("Thunderstorm")
  const hasRain = weatherConditions.includes("Rain")
  const hasSnow = weatherConditions.includes("Snow")

  let travelAdvice = "Excellent travel conditions"
  let adviceColor = "text-emerald-400"
  let adviceEmoji = "✅"

  if (hasStorm) {
    travelAdvice = "Storm activity detected along route"
    adviceColor = "text-red-500"
    adviceEmoji = "⛈"
  } else if (hasRain) {
    travelAdvice = "Moderate rainfall expected"
    adviceColor = "text-amber-500"
    adviceEmoji = "🌧"
  } else if (hasSnow) {
    travelAdvice = "Snow conditions may affect visibility"
    adviceColor = "text-blue-500"
    adviceEmoji = "❄"
  }

  return (

    <div className="relative w-full h-[75vh] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">

      {/* LOADING */}

      {loading && (
        <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="px-5 py-3 rounded-2xl bg-white shadow-2xl border border-slate-200 text-sm font-medium text-slate-700">
            Generating intelligent route...
          </div>
        </div>
      )}

      <Map
        terrain={mapMode === "terrain" ? { source: "terrain" } : undefined}
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
          routeGeoJSON={routeGeoJSON}
          distance={distance}
          duration={duration}
          visibleWeatherPoints={visibleWeatherPoints}
          travelAdvice={travelAdvice}
          adviceColor={adviceColor}
          adviceEmoji={adviceEmoji}
          minimizedAnalytics={minimizedAnalytics}
          setMinimizedAnalytics={setMinimizedAnalytics}
        />

        <RouteLayer
          routeGeoJSON={routeGeoJSON}
          routeColor={routeColor}
        />

        {/* START MARKER */}

        {startCoords && (
          <Marker longitude={startCoords[0]} latitude={startCoords[1]}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-10 h-10 rounded-full bg-emerald-400/20 animate-ping" />
              <div className="absolute w-6 h-6 rounded-full bg-emerald-400/40 blur-md" />
              <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_25px_rgba(52,211,153,0.95)]" />
            </div>
          </Marker>
        )}

        {/* END MARKER */}

        {endCoords && (
          <Marker longitude={endCoords[0]} latitude={endCoords[1]}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-10 h-10 rounded-full bg-red-400/20 animate-ping" />
              <div className="absolute w-6 h-6 rounded-full bg-red-400/40 blur-md" />
              <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-white shadow-[0_0_25px_rgba(248,113,113,0.95)]" />
            </div>
          </Marker>
        )}

        <VehicleLayer vehiclePosition={vehiclePosition} />

        {/* HEATMAP */}

        {mapMode === "heatmap" && (
          <HeatmapLayer weatherPoints={weatherPoints} />
        )}

        {/* WEATHER MARKERS */}

        {mapMode !== "heatmap" && (
          <WeatherLayer
            visibleWeatherPoints={visibleWeatherPoints}
            setPopupInfo={setPopupInfo}
          />
        )}

      </Map>

    </div>

  )
}