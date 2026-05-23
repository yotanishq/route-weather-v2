"use client"

import { useMapStore } from "@/store/map-store"
import { HeatmapLayer } from "./heatmap-layer"
import { MapControls } from "./map-controls"
import { useEffect, useRef, useState } from "react"
import { WeatherLayer } from "./weather-layer"
import maplibregl from "maplibre-gl"
import { VehicleLayer } from "./vehicle-layer"
import WeatherDetailPanel from "./weather-detail-panel"
import { AccidentLayer } from "./accident-layer"
import AccidentDetailPanel from "./accident-detail-panel"
import { FullscreenMapLayout } from "./fullscreen-map-layout"
import { AccidentZone, accidentZones } from "@/lib/accident-zones"
import { analyzeRouteDanger } from "@/lib/route-danger-detection"

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
import { getTrafficIncidents } from "@/lib/tomtomTraffic"
import { calculateRouteRiskScore, getRiskLevel, getRiskColor } from "@/lib/route-risk-calculation"

import {
  useRouteStore
} from "@/store/route-store"

interface InteractiveMapProps {
  startPlace: string
  endPlace: string
  triggerRoute: number
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export function InteractiveMap({
  startPlace,
  endPlace,
  triggerRoute,
  isFullscreen = false,
  onToggleFullscreen
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

  const [selectedAccidentZone, setSelectedAccidentZone] =
    useState<AccidentZone | null>(null)

  const [showAccidentLayer, setShowAccidentLayer] = useState(false)

  const {
    routeGeoJSON,
    weatherPoints,
    trafficIncidents,
    distance,
    duration,
    routeSafetyScore,

    setRouteGeoJSON,
    setWeatherPoints,
    setTrafficIncidents,
    setDistance,
    setDuration,
    setRouteSafetyScore

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

  useEffect(() => {
    if (isFullscreen) {
      setSelectedWeatherPoint(null)
      setSelectedAccidentZone(null)
      setMinimizedAnalytics(true)
    }
  }, [isFullscreen])

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

      // Fetch traffic incidents for the route area
      try {
        const routeCenter = coordinates[Math.floor(coordinates.length / 2)]
        console.log('Fetching traffic incidents for route center:', routeCenter)
        console.log('Passing route coordinates for matching:', coordinates.length)
        const incidents = await getTrafficIncidents(routeCenter[1], routeCenter[0], coordinates)
        console.log('Setting traffic incidents in store:', incidents.length)
        setTrafficIncidents(incidents)
      } catch (error) {
        console.error("Failed to fetch traffic incidents:", error)
        setTrafficIncidents([])
      }

      // Calculate dynamic route safety score based on incidents, weather, and time of day
      const hour = new Date().getHours()
      const isNight = hour >= 19 || hour <= 6
      
      const firstWeatherPoint = weatherData[0]?.weather
      const visibility = firstWeatherPoint?.visibility
      const hasRain = weatherData.some(point => point.weather.weather[0].main === 'Rain')
      const windSpeed = firstWeatherPoint?.wind?.speed

      const riskScore = calculateRouteRiskScore({
        incidents: trafficIncidents,
        visibility,
        rain: hasRain,
        windSpeed,
        isNight
      })

      setRouteSafetyScore(riskScore)

      let dynamicRouteColor = "#34d399"

      const hasStorm = weatherData.some(
        point =>
          point.weather.weather[0].main ===
          "Thunderstorm"
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

  // Route danger analysis
  const routeCoordinates = routeGeoJSON
    ? routeGeoJSON.features[0].geometry.coordinates
    : []

  const dangerAnalysis = analyzeRouteDanger(
    routeCoordinates as [number, number][],
    showAccidentLayer ? accidentZones : []
  )

  const hasStorm =
    weatherConditions.includes("Thunderstorm")

  const hasRain =
    weatherConditions.includes("Rain")

  const hasSnow =
    weatherConditions.includes("Snow")

  // Update travel advice based on incidents and weather
  let travelAdvice =
    "Excellent travel conditions"

  let adviceColor =
    "text-emerald-400"

  const riskLevel = getRiskLevel(routeSafetyScore)

  if (riskLevel === 'HIGH') {
    travelAdvice = trafficIncidents.length > 0 
      ? `${trafficIncidents.length} traffic incident${trafficIncidents.length > 1 ? 's' : ''} detected`
      : "High risk conditions"
    adviceColor = "text-red-500"
  } else if (riskLevel === 'MEDIUM') {
    travelAdvice = trafficIncidents.length > 0
      ? `${trafficIncidents.length} traffic incident${trafficIncidents.length > 1 ? 's' : ''} on route`
      : "Moderate conditions"
    adviceColor = "text-amber-400"
  } else if (hasStorm) {
    travelAdvice = "Storm activity detected"
    adviceColor = "text-red-500"
  } else if (hasRain) {
    travelAdvice = "Moderate rainfall expected"
    adviceColor = "text-amber-400"
  } else if (hasSnow) {
    travelAdvice = "Snow conditions detected"
    adviceColor = "text-blue-400"
  }

  return (
    <FullscreenMapLayout
      isFullscreen={isFullscreen}
      onExitFullscreen={onToggleFullscreen || (() => {})}
      distance={distance}
      duration={duration}
      routeSafetyScore={routeSafetyScore.toString()}
      travelAdvice={travelAdvice}
      totalDangerZones={dangerAnalysis.totalDangerZones}
      adviceColor={adviceColor}
      mapMode={mapMode}
      setMapMode={setMapMode}
      showAccidentLayer={showAccidentLayer}
      setShowAccidentLayer={setShowAccidentLayer}
      selectedAccidentZone={selectedAccidentZone}
      setSelectedAccidentZone={setSelectedAccidentZone}
      weatherData={weatherPoints.length > 0 ? weatherPoints[0].weather : undefined}
    >
      <div className={`
        relative
        ${isFullscreen ? 'w-full h-screen rounded-none border-0' : 'w-full h-[75vh] rounded-3xl border border-slate-200'}
        overflow-hidden
        shadow-2xl
      `}>

        {loading && (

          <div className="
            absolute
            inset-0
            z-[60]
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
            setSelectedAccidentZone(null)
          }}

          mapStyle={mapStyles[mapMode]}
        >

          {!isFullscreen && (
            <NavigationControl
              position="top-right"
              style={{
                zIndex: 20
              }}
            />
          )}

          {isFullscreen && (
            <div className="absolute top-5 right-4 z-[25] flex flex-col gap-1.5">
              <button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.zoomIn()
                  }
                }}
                className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-xl border border-white/14 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center"
                title="Zoom In"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.zoomOut()
                  }
                }}
                className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-xl border border-white/14 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center"
                title="Zoom Out"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.resetNorth()
                  }
                }}
                className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-xl border border-white/14 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center"
                title="Reset Rotation"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={onToggleFullscreen || (() => {})}
                className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-xl border border-white/14 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center"
                title="Exit Fullscreen"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {onToggleFullscreen && !isFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="
                absolute
                top-4
                right-16
                z-[25]

                w-10
                h-10

                rounded-xl

                bg-black/60
                backdrop-blur-xl
                border
                border-white/10

                text-white/70

                hover:bg-white/10
                hover:text-white

                transition-all
                duration-200

                flex
                items-center
                justify-center
              "
              title="Enter Fullscreen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          )}

          {!isFullscreen && (
            <MapControls
              mapMode={mapMode}
              setMapMode={setMapMode}
            />
          )}

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
            trafficIncidents={trafficIncidents}
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
            onToggleFullscreen={onToggleFullscreen}
            isFullscreen={isFullscreen}
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

          {/* Traffic Incident Markers */}
          {trafficIncidents.map((incident) => {
            const coordinates = incident.geometry.coordinates[0]
            return (
              <Marker
                key={incident.id}
                longitude={coordinates[0]}
                latitude={coordinates[1]}
              >
                <div className="relative flex items-center justify-center">
                  {/* Glowing pulse animation */}
                  <div 
                    className="absolute w-8 h-8 rounded-full animate-ping"
                    style={{ backgroundColor: `${incident.color}40` }}
                  />
                  {/* Outer glow */}
                  <div 
                    className="absolute w-6 h-6 rounded-full"
                    style={{ 
                      backgroundColor: `${incident.color}30`,
                      boxShadow: `0 0 20px ${incident.color}, 0 0 40px ${incident.color}80`
                    }}
                  />
                  {/* Inner marker */}
                  <div 
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: incident.color }}
                  />
                </div>
              </Marker>
            )
          })}

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
              compact={!isFullscreen}
            />
          )}

          {/* ACCIDENT LAYER - Only in fullscreen mode */}
          {isFullscreen && showAccidentLayer && (
            <AccidentLayer
              selectedAccidentZone={selectedAccidentZone}
              setSelectedAccidentZone={setSelectedAccidentZone}
              mapRef={mapRef}
              visible={showAccidentLayer}
            />
          )}

          {/* ACCIDENT DETAIL PANEL - Only show in non-fullscreen mode */}
          {selectedAccidentZone && !isFullscreen && (
            <AccidentDetailPanel
              zone={selectedAccidentZone}
              onClose={() => setSelectedAccidentZone(null)}
            />
          )}

        </Map>

      </div>
    </FullscreenMapLayout>
  )

}