"use client"

import { useEffect, useRef } from "react"
import { Crosshair, Maximize2 } from "lucide-react"
import { useRouteStore } from "@/store/route-store"

interface AnalyticsOverlayProps {
  distance: number
  formattedDuration: string
  bestMode: string
  minimizedAnalytics: boolean
  setMinimizedAnalytics: (v: boolean) => void
  travelAdvice: string
  adviceColor: string
  routeGeoJSON: any
  visibleWeatherPoints: any[]
  onRelocateRoute: () => void
  onToggleFullscreen?: () => void
  isFullscreen?: boolean
}

const panelShell =
  "rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"

const sectionLabel =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.34]"

const rowLabel = "text-[11px] font-medium text-white/35"

const iconButton =
  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:bg-white/10"

function formatDuration(seconds: number): string {
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
}

function getTravelAdvice(
  accidentZones: { severity: string }[],
  weatherPoints: { weather: { weather: { main: string }[] } }[]
): { message: string; icon: string; colorClass: string } {
  const hasHighSeverity = accidentZones.some(
    (zone) => zone.severity === "high"
  )
  const hasRain = weatherPoints.some(
    (point) => point.weather.weather[0].main === "Rain"
  )
  const hasStorm = weatherPoints.some(
    (point) => point.weather.weather[0].main === "Thunderstorm"
  )

  if (hasHighSeverity) {
    return {
      message: "🔴 High Risk Route - Major road events detected",
      icon: "🔴",
      colorClass: "text-red-400"
    }
  }

  if (accidentZones.length > 3) {
    return {
      message: "🟠 Moderate Risk - Multiple incident zones on route",
      icon: "🟠",
      colorClass: "text-amber-400"
    }
  }

  if (accidentZones.length > 0) {
    return {
      message: "🟡 Low Risk - Minor incidents reported nearby",
      icon: "🟡",
      colorClass: "text-yellow-400"
    }
  }

  if (hasStorm) {
    return {
      message: "⛈ Storm activity - Drive with caution",
      icon: "⛈",
      colorClass: "text-red-500"
    }
  }

  if (hasRain) {
    return {
      message: "🌧 Wet roads expected along route",
      icon: "🌧",
      colorClass: "text-amber-400"
    }
  }

  return {
    message: "✅ Route looks clear - Good travel conditions",
    icon: "✅",
    colorClass: "text-emerald-400"
  }
}

function getRecommendedMode(
  accidentZones: { severity: string }[],
  weatherPoints: { weather: { weather: { main: string }[] } }[]
): string {
  const hasHighSeverity = accidentZones.some(
    (zone) => zone.severity === "high"
  )
  const hasRain = weatherPoints.some(
    (point) => point.weather.weather[0].main === "Rain"
  )

  if (hasHighSeverity) return "Train / Bus"
  if (accidentZones.length > 3 || hasRain) return "4-Wheeler only"
  return "Any vehicle"
}

function RelocateButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={iconButton}
      title="Relocate to route"
      aria-label="Relocate to route"
    >
      <Crosshair className="h-3 w-3" strokeWidth={2} />
    </button>
  )
}

export function AnalyticsOverlay({
  distance,
  formattedDuration,
  bestMode,
  minimizedAnalytics,
  setMinimizedAnalytics,
  travelAdvice,
  adviceColor,
  routeGeoJSON,
  visibleWeatherPoints,
  onRelocateRoute,
  onToggleFullscreen,
  isFullscreen = false
}: AnalyticsOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const accidentZones = useRouteStore((state) => state.accidentZones)
  const weatherPoints = useRouteStore((state) => state.weatherPoints)
  const storeDistance = useRouteStore((state) => state.distance)
  const storeDuration = useRouteStore((state) => state.duration)

  const formattedStoreDuration = formatDuration(storeDuration)
  const travelInsight = getTravelAdvice(accidentZones, weatherPoints)
  const recommendedMode = getRecommendedMode(accidentZones, weatherPoints)

  const insightSecondaryText =
    accidentZones.length > 0
      ? accidentZones
          .slice(0, 2)
          .map((zone) => `${zone.roadName} — ${zone.severity} severity`)
          .join(" · ")
      : "AI-powered weather sync for safer travel."

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setMinimizedAnalytics(true)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setMinimizedAnalytics])

  if (!routeGeoJSON) return null

  const positionClass = isFullscreen ? "top-6 left-6" : "top-4 left-4"

  /* ───────────────── MINIMIZED ───────────────── */

  if (minimizedAnalytics) {
    return (
      <div className={`absolute ${positionClass} z-40`}>
        <div
          onClick={() => setMinimizedAnalytics(false)}
          className={`${panelShell} flex cursor-pointer items-center gap-3 px-3.5 py-2.5 transition-all hover:bg-black/50`}
        >
          <div>
            <div className={rowLabel}>Distance</div>
            <div className="mt-0.5 text-xs font-bold leading-none text-white">
              {storeDistance} km
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div>
            <div className={rowLabel}>ETA</div>
            <div className="mt-0.5 text-xs font-bold leading-none text-emerald-400">
              {formattedStoreDuration}
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div>
            <div className={rowLabel}>Best</div>
            <div className="mt-0.5 text-xs font-bold leading-none text-white">
              {recommendedMode}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRelocateRoute()
            }}
            className={iconButton}
            title="Relocate to route"
            aria-label="Relocate to route"
          >
            <Crosshair className="h-3 w-3" strokeWidth={2} />
          </button>
        </div>
      </div>
    )
  }

  /* ───────────────── EXPANDED ───────────────── */

  return (
    <div
      ref={overlayRef}
      className={`absolute ${positionClass} z-40 w-[252px] max-h-[52vh] overflow-hidden ${panelShell}`}
    >
      <div className="max-h-[52vh] space-y-2.5 overflow-y-auto overflow-x-hidden p-3.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Route stats */}
        <div>
          <div className={`${sectionLabel} mb-3`}>Route</div>
          <div className="space-y-2.5 rounded-xl bg-white/[0.03] p-2.5">
            <div className="flex items-center justify-between">
              <span className={rowLabel}>Distance</span>
              <span className="text-xs font-bold text-white">{storeDistance} km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={rowLabel}>Duration</span>
              <span className="text-xs font-bold text-emerald-400">
                {formattedStoreDuration}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={rowLabel}>Best mode</span>
              <span className="text-xs font-bold text-white">{recommendedMode}</span>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-white/[0.06] pt-2.5">
              <RelocateButton onClick={onRelocateRoute} />
              {onToggleFullscreen && (
                <button
                  type="button"
                  onClick={onToggleFullscreen}
                  className={`${iconButton} text-emerald-400/90 hover:text-emerald-400`}
                  title="Enter intelligence mode"
                  aria-label="Enter intelligence mode"
                >
                  <Maximize2 className="h-3 w-3" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Weather along route */}
        {visibleWeatherPoints.length > 0 && (
          <div>
            <div className={`${sectionLabel} mb-3`}>Weather</div>
            <div className="space-y-2">
              {visibleWeatherPoints.slice(0, 4).map((point, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.03] p-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">
                      {point.weather.name}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/40">
                      {point.weather.weather[0].main}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-bold text-emerald-400">
                    {Math.round(point.weather.main.temp)}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI insights */}
        <div>
          <div className={`${sectionLabel} mb-3`}>AI Insights</div>
          <div className="grid grid-cols-[18px_1fr] gap-x-2 gap-y-1.5 text-left">
            <span
              className="self-center text-[18px] leading-none"
              aria-hidden
            >
              {travelInsight.icon}
            </span>
            <span
              className={`text-xs font-semibold leading-snug ${travelInsight.colorClass}`}
            >
              {travelInsight.message}
            </span>
            <p className="col-start-2 text-[11px] font-normal leading-relaxed text-white/35">
              {insightSecondaryText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
