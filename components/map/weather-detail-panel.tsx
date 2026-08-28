"use client"

import { useRouteStore } from "@/store/route-store"
import {
  formatVisibilityKm,
  formatUvIndex,
  generateTravelInsight,
  getAirQualityColorClass,
  getAirQualityLabel,
  getUvColorClass,
  getUvLevel,
  getWeatherEmoji,
  getWindDirection
} from "@/lib/weather-panel-utils"

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

interface WeatherDetailPanelProps {
  point: any
  onClose: () => void
  compact?: boolean
}

function MetricCard({
  label,
  value,
  valueClassName,
  compact
}: {
  label: string
  value: string
  valueClassName?: string
  compact?: boolean
}) {
  return (
    <div className={compact ? "rounded-lg bg-white/[0.03] p-1.5" : "rounded-xl bg-white/[0.03] p-2"}>
      <div
        className={
          compact
            ? "text-[8px] font-semibold uppercase tracking-widest text-white/40"
            : "text-[9px] font-semibold uppercase tracking-widest text-white/40"
        }
      >
        {label}
      </div>
      <div
        className={
          valueClassName ??
          (compact
            ? "mt-0.5 text-xs font-semibold text-white"
            : "mt-0.5 text-sm font-semibold text-white")
        }
      >
        {value}
      </div>
    </div>
  )
}

function getAvailableMetrics(data: any, forecast?: any) {
  const metrics: Array<{ label: string; value: string; valueClassName?: string }> = []
  const main = data.main
  const wind = data.wind
  const airQuality = data.air_quality

  // Use forecast data if available, otherwise use current weather data
  const temperature = forecast?.temperature ?? main?.temp
  const feelsLike = forecast?.feelsLike ?? main?.feels_like
  const humidity = forecast?.humidity ?? main?.humidity
  const windSpeed = forecast?.windSpeed ?? wind?.speed
  const visibility = forecast?.visibility ?? data.visibility
  const precipitation = forecast?.precipitationProbability

  // Primary metrics (always try to include these)
  if (humidity !== undefined && humidity !== null) {
    metrics.push({ label: "Humidity", value: `${humidity}%` })
  }
  if (windSpeed !== undefined && windSpeed !== null) {
    metrics.push({ label: "Wind", value: `${windSpeed} m/s` })
  }
  if (feelsLike !== undefined && feelsLike !== null) {
    metrics.push({
      label: "Feels Like",
      value: `${Math.round(feelsLike)}°`,
      valueClassName: "text-cyan-400"
    })
  }
  if (visibility !== undefined && visibility !== null) {
    metrics.push({ label: "Visibility", value: formatVisibilityKm(visibility) })
  }
  if (precipitation !== undefined && precipitation !== null) {
    metrics.push({ label: "Precipitation", value: `${precipitation}%` })
  }
  if (airQuality) {
    const label = getAirQualityLabel(airQuality)
    metrics.push({
      label: "Air Quality",
      value: label,
      valueClassName: getAirQualityColorClass(label)
    })
  }
  if (wind?.deg !== undefined && wind.deg !== null) {
    metrics.push({ label: "Wind Dir", value: getWindDirection(wind.deg) })
  }

  // 7th: Sunrise (always)
  const sunrise = data.sys?.sunrise
  if (sunrise !== undefined && sunrise !== null) {
    metrics.push({ label: "Sunrise", value: new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
  }

  // 8th: Sunset (always)
  const sunset = data.sys?.sunset
  if (sunset !== undefined && sunset !== null) {
    metrics.push({ label: "Sunset", value: new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
  }

  // 9th: Cloud Cover (always)
  const cloudCover = data.clouds?.all
  if (cloudCover !== undefined && cloudCover !== null) {
    metrics.push({ label: "Cloud Cover", value: `${cloudCover}%` })
  }

  // 10th: Pressure (always)
  if (main?.pressure !== undefined && main.pressure !== null) {
    metrics.push({ label: "Pressure", value: `${main.pressure} hPa` })
  }

  return metrics.slice(0, 10)
}

export default function WeatherDetailPanel({
  point,
  onClose,
  compact = false
}: WeatherDetailPanelProps) {
  const journey = useRouteStore((state) => state.journey)
  const data = point.weather
  const condition = data.weather[0]
  const travelInsight = generateTravelInsight(data)
  const weatherEmoji = getWeatherEmoji(condition.main)

  // Use the checkpoint reference attached to the marker
  const matchingCheckpoint = (point as any).checkpoint

  const forecast = matchingCheckpoint?.forecast
  const isForecast = forecast !== null && forecast !== undefined
  const forecastTime = forecast?.forecastTime
  const eta = matchingCheckpoint?.estimatedArrivalTime
  const metrics = getAvailableMetrics(data, forecast)

  return (
    <div
      className={
        compact
          ? "absolute bottom-3 right-3 z-50 flex w-[280px] max-h-[min(280px,42vh)] flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          : "absolute bottom-4 right-4 z-50 w-[252px] rounded-xl border border-white/[0.06] bg-black/40 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
      }
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={
                compact ? "text-xs leading-none" : "text-sm leading-none"
              }
              aria-hidden
            >
              {weatherEmoji}
            </span>
            <div
              className={
                compact
                  ? "truncate text-xs font-semibold text-white"
                  : "truncate text-sm font-semibold text-white"
              }
            >
              {data.name}
            </div>
          </div>
          <div
            className={
              compact
                ? "mt-0.5 text-[10px] text-white/40"
                : "mt-0.5 text-[11px] text-white/40"
            }
          >
            {condition.main}
          </div>
          {isForecast && forecastTime && (
            <div
              className={
                compact
                  ? "mt-0.5 text-[9px] text-cyan-400/70"
                  : "mt-0.5 text-[10px] text-cyan-400/70"
              }
            >
              Forecast for {formatDate(forecastTime)} at {formatTime(forecastTime)}
            </div>
          )}
          {eta && (
            <div
              className={
                compact
                  ? "mt-0.5 text-[9px] text-emerald-400/70"
                  : "mt-0.5 text-[10px] text-emerald-400/70"
              }
            >
              ETA: {formatDate(eta)} at {formatTime(eta)}
            </div>
          )}
          {!isForecast && matchingCheckpoint && (
            <div
              className={
                compact
                  ? "mt-0.5 text-[9px] text-amber-400/70"
                  : "mt-0.5 text-[10px] text-amber-400/70"
              }
            >
              Forecast unavailable beyond horizon
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] text-white/60 transition-all hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <div
        className={
          compact
            ? "mt-1.5 min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            : ""
        }
      >
        <div
          className={
            compact
              ? "text-2xl font-bold leading-none text-emerald-400"
              : "mt-2 text-3xl font-bold leading-none text-emerald-400"
          }
        >
          {Math.round(data.main.temp)}°
        </div>

        <div
          className={
            compact
              ? "mt-2 space-y-1.5"
              : "mt-2.5 grid grid-cols-2 gap-2"
          }
        >
          {compact ? (
            <>
              {/* Row 1: 2 boxes */}
              <div className="grid grid-cols-2 gap-1.5">
                {metrics.slice(0, 2).map((metric, index) => (
                  <MetricCard
                    key={index}
                    compact={compact}
                    label={metric.label}
                    value={metric.value}
                    valueClassName={
                      metric.valueClassName
                        ? `mt-0.5 font-semibold text-xs ${metric.valueClassName}`
                        : undefined
                    }
                  />
                ))}
              </div>
              {/* Row 2: 2 boxes */}
              <div className="grid grid-cols-2 gap-1.5">
                {metrics.slice(2, 4).map((metric, index) => (
                  <MetricCard
                    key={index + 2}
                    compact={compact}
                    label={metric.label}
                    value={metric.value}
                    valueClassName={
                      metric.valueClassName
                        ? `mt-0.5 font-semibold text-xs ${metric.valueClassName}`
                        : undefined
                    }
                  />
                ))}
              </div>
              {/* Row 3: 3 boxes */}
              <div className="grid grid-cols-3 gap-1.5">
                {metrics.slice(4, 7).map((metric, index) => (
                  <MetricCard
                    key={index + 4}
                    compact={compact}
                    label={metric.label}
                    value={metric.value}
                    valueClassName={
                      metric.valueClassName
                        ? `mt-0.5 font-semibold text-xs ${metric.valueClassName}`
                        : undefined
                    }
                  />
                ))}
              </div>
              {/* Row 4: 3 boxes */}
              <div className="grid grid-cols-3 gap-1.5">
                {metrics.slice(7, 10).map((metric, index) => (
                  <MetricCard
                    key={index + 7}
                    compact={compact}
                    label={metric.label}
                    value={metric.value}
                    valueClassName={
                      metric.valueClassName
                        ? `mt-0.5 font-semibold text-xs ${metric.valueClassName}`
                        : undefined
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            metrics.map((metric, index) => (
              <MetricCard
                key={index}
                compact={compact}
                label={metric.label}
                value={metric.value}
                valueClassName={
                  metric.valueClassName
                    ? `mt-0.5 font-semibold text-sm ${metric.valueClassName}`
                    : undefined
                }
              />
            ))
          )}
        </div>

        <div
          className={
            compact
              ? "mt-1.5 rounded-lg border border-cyan-500/10 bg-white/[0.03] p-1.5 shadow-[0_0_10px_rgba(34,211,238,0.05)]"
              : "mt-2 rounded-xl border border-cyan-500/10 bg-white/[0.03] p-2 shadow-[0_0_12px_rgba(34,211,238,0.06)]"
          }
        >
          <div className="text-[8px] font-semibold uppercase tracking-widest text-white/35">
            Travel Impact
          </div>
          <p
            className={
              compact
                ? "mt-0.5 line-clamp-3 text-[9px] leading-snug text-white/60"
                : "mt-0.5 line-clamp-2 text-[10px] leading-snug text-white/60"
            }
          >
            {journey.analysis?.warnings && journey.analysis.warnings.length > 0
              ? journey.analysis.warnings[0].description
              : travelInsight}
          </p>
        </div>
      </div>
    </div>
  )
}
