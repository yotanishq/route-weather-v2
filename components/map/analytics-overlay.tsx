"use client"

import { useEffect, useRef } from "react"
import { Crosshair, Maximize2 } from "lucide-react"
import { getWeatherEmoji } from "@/lib/weather-panel-utils"

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

  const primaryCondition =
    visibleWeatherPoints[0]?.weather?.weather?.[0]?.main
  const insightEmoji = primaryCondition
    ? getWeatherEmoji(primaryCondition)
    : "🌤️"

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
              {distance} km
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div>
            <div className={rowLabel}>ETA</div>
            <div className="mt-0.5 text-xs font-bold leading-none text-emerald-400">
              {formattedDuration}
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div>
            <div className={rowLabel}>Best</div>
            <div className="mt-0.5 text-xs font-bold leading-none text-white">
              {bestMode}
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
              <span className="text-xs font-bold text-white">{distance} km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={rowLabel}>Duration</span>
              <span className="text-xs font-bold text-emerald-400">
                {formattedDuration}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={rowLabel}>Best mode</span>
              <span className="text-xs font-bold text-white">{bestMode}</span>
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
              {insightEmoji}
            </span>
            <span
              className={`text-xs font-semibold leading-snug ${adviceColor}`}
            >
              {travelAdvice}
            </span>
            <p className="col-start-2 text-[11px] font-normal leading-relaxed text-white/35">
              AI-powered weather sync for safer travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
