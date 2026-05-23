"use client"

import { motion } from "framer-motion"
import { FullscreenCinematicAccidentPanel } from "./fullscreen-cinematic-accident-panel"
import { useState, useEffect } from "react"

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
  const temp = weatherData.temp
  const feelsLike = weatherData.feels_like
  const humidity = weatherData.humidity
  const visibility = weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A'
  const windSpeed = weatherData.wind_speed
  const windDirection = weatherData.wind_deg ? getWindDirection(weatherData.wind_deg) : 'N/A'
  
  let mainInsight = ""
  let secondaryInsight = ""
  let icon = ""
  
  // Generate insights based on actual weather conditions
  if (main === 'clear' || main === 'sunny') {
    if (parseFloat(visibility) >= 10) {
      mainInsight = "Clear visibility and dry conditions."
      secondaryInsight = "Favorable travel conditions on this route."
      icon = "☀️"
    } else {
      mainInsight = "Clear skies with moderate visibility."
      secondaryInsight = "Good conditions for travel ahead."
      icon = "☀️"
    }
  } else if (main === 'rain' || main === 'drizzle') {
    mainInsight = "Wet road conditions."
    secondaryInsight = "Drive cautiously due to slippery surfaces."
    icon = "�️"
  } else if (main === 'thunderstorm') {
    mainInsight = "Severe weather detected."
    secondaryInsight = "Storm conditions - avoid travel if possible."
    icon = "⛈️"
  } else if (main === 'mist' || main === 'fog' || main === 'haze') {
    mainInsight = "Reduced visibility ahead."
    secondaryInsight = "Extra caution advised for low visibility."
    icon = "�️"
  } else if (main === 'clouds') {
    mainInsight = "Overcast conditions on route."
    secondaryInsight = "Moderate visibility with stable conditions."
    icon = "☁️"
  } else if (main === 'snow') {
    mainInsight = "Snow conditions detected."
    secondaryInsight = "Hazardous winter driving conditions."
    icon = "❄️"
  } else if (windSpeed > 10) {
    mainInsight = "Strong crosswinds detected."
    secondaryInsight = `${windDirection} winds at ${windSpeed.toFixed(1)} m/s.`
    icon = "💨"
  } else {
    mainInsight = `${description.charAt(0).toUpperCase() + description.slice(1)}.`
    secondaryInsight = `Temperature: ${temp}°C, feels like ${feelsLike}°C.`
    icon = "🌤️"
  }
  
  return { mainInsight, secondaryInsight, icon }
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
        className="absolute left-5 top-5 bottom-5 z-10 w-60 flex flex-col gap-3"
      >
        {/* Route Stats */}
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/14 shadow-xl">
          <div className="text-[10px] text-white/25 font-bold tracking-[0.2em] uppercase mb-3">
            Route
          </div>
          
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
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-3 border border-white/14 shadow-xl">
          <div className="text-[10px] text-white/38 font-bold tracking-[0.18em] uppercase mb-2">
            AI Insights
          </div>
          
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 animate-pulse" />
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse" />
                <div className="h-2 bg-white/10 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <span 
                className="text-lg relative z-10"
                style={{ 
                  color: 'rgb(255,210,80)',
                  filter: 'drop-shadow(0 0 12px rgba(255,210,80,0.18))'
                }}
              >
                {aiInsight.icon}
              </span>
              <div className="flex-1">
                <div 
                  className="text-sm font-medium leading-tight"
                  style={{ 
                    color: 'rgb(0,255,190)',
                    textShadow: '0 0 10px rgba(0,255,180,0.12)'
                  }}
                >
                  {aiInsight.mainInsight.replace('detected.', '')}
                </div>
                <div 
                  className="text-[11px] leading-relaxed mt-1"
                  style={{ color: 'rgba(255,255,255,0.58)' }}
                >
                  {aiInsight.secondaryInsight}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danger Warning */}
        {totalDangerZones > 0 && (
          <div className="bg-red-500/12 backdrop-blur-xl rounded-xl p-4 border border-red-500/30 shadow-xl">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">⚠️</span>
              <div className="text-xs text-red-300 font-bold">
                {totalDangerZones} danger zone{totalDangerZones > 1 ? "s" : ""} detected
              </div>
            </div>
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
