"use client"

import { motion } from "framer-motion"
import { FullscreenCinematicAccidentPanel } from "./fullscreen-cinematic-accident-panel"
import { getWeatherEmoji } from "@/lib/weather-panel-utils"
import { useState, useEffect, type CSSProperties } from "react"

const railCardSurface: CSSProperties = {
  backgroundColor: "rgba(8, 10, 14, 0.82)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  boxShadow: "0 0 30px rgba(0, 255, 180, 0.03)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)"
}

const sectionLabelClass =
  "mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.34]"

const accidentDangerSurface: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(80, 8, 18, 0.58), rgba(35, 5, 10, 0.82))",
  border: "1px solid rgba(255, 80, 100, 0.2)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)"
}

interface FullscreenMapLayoutProps {
  isFullscreen: boolean
  children: React.ReactNode
  onExitFullscreen: () => void
  distance: number
  duration: number
  routeSafetyScore: string
  travelAdvice: string
  totalDangerZones: number
  adviceColor: string
  mapMode: "normal" | "terrain" | "heatmap"
  setMapMode: (mode: "normal" | "terrain" | "heatmap") => void
  showAccidentLayer: boolean
  setShowAccidentLayer: (show: boolean) => void
  selectedAccidentZone: any
  setSelectedAccidentZone: (zone: any) => void
  weatherData?: any
}

// Helper function to convert wind direction degrees to cardinal direction
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

// Helper function to generate dynamic AI insights based on real weather data
function generateAIInsight(weatherData?: any) {
  const hour = new Date().getHours()
  const isNight = hour >= 19 || hour <= 6
  
  // Fallback if no weather data available
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return {
      mainInsight: "Weather data unavailable.",
      secondaryInsight: "Unable to fetch current conditions.",
      icon: "❓"
    }
  }
  
  const weather = weatherData.weather[0]
  const main = weather.main.toLowerCase()
  const description = weather.description
  const temp = weatherData.main?.temp
  const feelsLike = weatherData.main?.feels_like
  const visibility = weatherData.visibility
    ? (weatherData.visibility / 1000).toFixed(1)
    : "N/A"
  const windSpeed = weatherData.wind?.speed ?? 0
  const windDirection = weatherData.wind?.deg
    ? getWindDirection(weatherData.wind.deg)
    : "N/A"

  let mainInsight = ""
  let secondaryInsight = ""

  if (main === "clear" || main === "sunny") {
    if (parseFloat(String(visibility)) >= 10) {
      mainInsight = "Excellent travel conditions"
      secondaryInsight =
        "Clear skies and optimal visibility for smooth travel."
    } else {
      mainInsight = "Good travel conditions"
      secondaryInsight =
        "Clear skies with favorable visibility for travel ahead."
    }
  } else if (main === "rain" || main === "drizzle") {
    mainInsight = "Moderate rainfall expected"
    secondaryInsight =
      "Wet road conditions detected. Drive cautiously on this route."
  } else if (main === "thunderstorm") {
    mainInsight = "Storm activity detected"
    secondaryInsight =
      "Severe weather along the route. Avoid travel if possible."
  } else if (main === "mist" || main === "fog" || main === "haze") {
    mainInsight = "Reduced visibility ahead"
    secondaryInsight =
      "Low visibility conditions. Extra caution advised while driving."
  } else if (main === "clouds") {
    mainInsight = "Stable travel conditions"
    secondaryInsight =
      "Overcast skies with moderate visibility along your route."
  } else if (main === "snow") {
    mainInsight = "Snow conditions detected"
    secondaryInsight =
      "Hazardous winter driving conditions. Plan extra travel time."
  } else if (windSpeed > 10) {
    mainInsight = "Strong crosswinds detected"
    secondaryInsight = `${windDirection} winds at ${windSpeed.toFixed(1)} m/s along exposed sections.`
  } else {
    mainInsight = "Monitor travel conditions"
    secondaryInsight = `${description.charAt(0).toUpperCase() + description.slice(1)}. ${temp}°C, feels like ${feelsLike}°C.`
  }

  return {
    mainInsight,
    secondaryInsight,
    icon: getWeatherEmoji(weather.main)
  }
}

export function FullscreenMapLayout({
  isFullscreen,
  children,
  onExitFullscreen,
  distance,
  duration,
  routeSafetyScore,
  travelAdvice,
  totalDangerZones,
  adviceColor,
  mapMode,
  setMapMode,
  showAccidentLayer,
  setShowAccidentLayer,
  selectedAccidentZone,
  setSelectedAccidentZone,
  weatherData
}: FullscreenMapLayoutProps) {
  const [aiInsight, setAIInsight] = useState(generateAIInsight(weatherData))
  const [isLoading, setIsLoading] = useState(false)
  const weatherCondition = weatherData?.weather?.[0]?.main
  const weatherEmoji = weatherCondition
    ? getWeatherEmoji(weatherCondition)
    : "❓"
  const hasAccidentZones = totalDangerZones > 0

  useEffect(() => {
    setIsLoading(true)
    // Update insight when weather data changes
    setAIInsight(generateAIInsight(weatherData))
    setIsLoading(false)
  }, [weatherData])

  if (!isFullscreen) return <>{children}</>

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-black overflow-hidden">
      
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/92 via-black/88 to-black/94 pointer-events-none" />
      
      {/* Map container */}
      <div className="absolute inset-0 z-0">
        {children}
      </div>

      {/* Left Analytics Rail */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute left-5 top-5 bottom-5 z-10 w-60 flex flex-col gap-4"
      >
        {/* Route Stats */}
        <div
          className="relative overflow-hidden rounded-xl p-[22px]"
          style={railCardSurface}
        >
          <div className={sectionLabelClass}>Route</div>
          
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/35 font-medium">Distance</span>
              <span className="text-xs font-bold text-white">{distance} km</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/35 font-medium">Duration</span>
              <span className="text-xs font-bold text-emerald-400">
                {Math.floor(duration / 3600)}h {Math.floor((duration % 3600) / 60)}m
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/35 font-medium">Safety</span>
              <span
                className={`text-xs font-bold ${
                  routeSafetyScore === "Safe"
                    ? "text-emerald-400"
                    : routeSafetyScore === "Moderate Risk"
                    ? "text-amber-400"
                    : "text-red-400"
                }`}
              >
                {routeSafetyScore}
              </span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div
          className="relative overflow-hidden rounded-xl p-[22px]"
          style={railCardSurface}
        >
          <div className={sectionLabelClass}>AI Insights</div>

          {isLoading ? (
            <div className="grid grid-cols-[18px_1fr] gap-x-2 gap-y-1.5 text-left">
              <span className="h-[18px] w-[18px] rounded bg-white/10 animate-pulse" />
              <span className="h-3.5 w-32 rounded bg-white/10 animate-pulse" />
              <span className="col-start-2 block h-3 w-full rounded bg-white/10 animate-pulse" />
            </div>
          ) : (
            <div className="grid grid-cols-[18px_1fr] gap-x-2 gap-y-1.5 text-left">
              <span
                className="self-center text-[18px] leading-none"
                aria-hidden
              >
                {weatherEmoji}
              </span>
              <span
                className={`text-xs font-semibold leading-snug ${adviceColor}`}
              >
                {travelAdvice || aiInsight.mainInsight}
              </span>
              <p className="col-start-2 text-[11px] font-normal leading-relaxed text-white/35">
                {aiInsight.secondaryInsight}
              </p>
            </div>
          )}
        </div>

        {/* Accident Warning — only when zones detected */}
        {hasAccidentZones && (
          <div
            className="relative overflow-hidden rounded-xl p-[22px] text-left"
            style={accidentDangerSurface}
          >
            <div className="mb-3 flex items-center gap-2">
              <span
                className="text-base font-bold leading-none text-red-400"
                aria-hidden
              >
                ⚠️
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">
                Accident Warning
              </span>
            </div>

            <p className="text-xs font-bold leading-snug text-red-400">
              {totalDangerZones} accident-prone zone
              {totalDangerZones > 1 ? "s" : ""} detected along your route.
            </p>

            <p className="mt-2.5 text-[11px] font-normal leading-relaxed text-white/35">
              Exercise caution and drive safe.
            </p>
          </div>
        )}
      </motion.div>

      {/* Right Controls Stack */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute right-16 top-5 bottom-5 z-10 w-42 flex flex-col gap-2"
      >
        {/* Map Mode Selector */}
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-2.5 border border-white/14 shadow-xl">
          <div className="text-[9px] text-white/25 font-bold tracking-[0.2em] uppercase mb-2">
            Map Mode
          </div>
          
          <div className="space-y-1">
            {(["normal", "terrain", "heatmap"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setMapMode(mode)}
                className={`
                  w-full px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-150
                  ${
                    mapMode === mode
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/35"
                      : "text-white/35 hover:bg-white/4 hover:text-white/55 border border-transparent"
                  }
                `}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-2.5 border border-white/14 shadow-xl">
          <div className="text-[9px] text-white/25 font-bold tracking-[0.2em] uppercase mb-2">
            Layers
          </div>
          
          <div className="space-y-1">
            <button
              onClick={() => setShowAccidentLayer(!showAccidentLayer)}
              className={`
                w-full px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-150
                flex items-center justify-between
                ${
                  showAccidentLayer
                    ? "bg-red-500/20 text-red-300 border border-red-500/35"
                    : "text-white/35 hover:bg-white/4 hover:text-white/55 border border-transparent"
                }
              `}
            >
              <span>Accident Zones</span>
              <span className="text-[10px]">⚠️</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Cinematic Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[650px]"
      >
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/14 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] text-white/25 font-bold tracking-[0.2em] uppercase">
              Timeline
            </div>
            <div className="text-[9px] text-white/20">
              Coming Soon
            </div>
          </div>

          {/* Progress Bar with Glow */}
          <div className="relative mb-3">
            {/* Glow effect */}
            <div className="absolute inset-0 h-1 bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 blur-md rounded-full" />
            
            {/* Progress bar background */}
            <div className="relative h-1 bg-white/6 rounded-full overflow-hidden">
              {/* Progress fill with gradient */}
              <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
            </div>
          </div>

          {/* Timeline Markers */}
          <div className="flex items-center justify-between px-5">
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
              <div className="text-[9px] text-white/30 font-medium">Start</div>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="text-[9px] text-white/20 font-medium">Weather</div>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="text-[9px] text-white/20 font-medium">Accident</div>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="text-[9px] text-white/20 font-medium">Progress</div>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="text-[9px] text-white/20 font-medium">End</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cinematic Accident Detail Panel */}
      {selectedAccidentZone && (
        <FullscreenCinematicAccidentPanel
          isVisible={!!selectedAccidentZone}
          onClose={() => setSelectedAccidentZone(null)}
          zone={{
            name: selectedAccidentZone.name || "Delhi-Gurgaon Highway",
            riskScore: selectedAccidentZone.riskScore || 88,
            reason: selectedAccidentZone.reason || "High traffic congestion and accident-prone junctions",
            recommendation: selectedAccidentZone.recommendation || "Consider alternate route. Exercise extreme caution if this route is unavoidable.",
            warning: selectedAccidentZone.warning || "High-risk zone. Avoid during adverse weather conditions.",
            severity: selectedAccidentZone.severity || "High",
            incidentsReported: selectedAccidentZone.incidentsReported || 128,
            lastUpdated: selectedAccidentZone.lastUpdated || "2h ago"
          }}
        />
      )}

    </div>
  )
}
