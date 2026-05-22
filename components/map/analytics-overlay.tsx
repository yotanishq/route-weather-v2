"use client"

interface AnalyticsOverlayProps {
  routeGeoJSON: any
  distance: string
  duration: string
  visibleWeatherPoints: any[]
  travelAdvice: string
  adviceColor: string
  adviceEmoji: string
  minimizedAnalytics: boolean
  setMinimizedAnalytics: (
  minimized: boolean
) => void
}

export function AnalyticsOverlay({
  routeGeoJSON,
  distance,
  duration,
  visibleWeatherPoints,
  travelAdvice,
  adviceColor,
  adviceEmoji,
  minimizedAnalytics,
  setMinimizedAnalytics
}: AnalyticsOverlayProps) {

  if (!routeGeoJSON) return null

  /* MINIMIZED MODE */

  if (minimizedAnalytics) {
    return (
      <button
        onClick={() => setMinimizedAnalytics(false)}
        className="
          absolute top-5 left-5 z-50
          flex items-center gap-4
          px-4 py-3 rounded-2xl
          bg-black/70 backdrop-blur-2xl
          border border-white/10
          shadow-2xl hover:scale-[1.02]
          transition-all duration-300
        "
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
            Distance
          </div>
          <div className="text-xl font-bold text-white leading-none">
            {distance}
          </div>
        </div>

        <div className="w-px h-8 bg-white/10" />

        <div>
          <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">
            ETA
          </div>
          <div className="text-xl font-bold text-emerald-400 leading-none">
            {duration}
          </div>
        </div>

        <div className="w-px h-8 bg-white/10" />

        <div className="text-white/40 text-xs">
          ↗
        </div>
      </button>
    )
  }

  return (

    <div className="
      absolute top-5 left-5 z-40
      w-[290px] max-h-[420px]
      overflow-y-auto rounded-3xl
      bg-black/45 backdrop-blur-2xl
      border border-white/10
      shadow-[0_0_50px_rgba(0,0,0,0.45)]
      p-5
    ">

      {/* MINIMIZE BUTTON */}

      <button
        onClick={() => setMinimizedAnalytics(true)}
        className="
          absolute top-4 right-4
          w-7 h-7 rounded-full
          bg-white/10 hover:bg-white/25
          text-white/50 hover:text-white
          text-xs font-bold
          flex items-center justify-center
          transition-all duration-300
        "
      >
        ─
      </button>

      {/* TITLE */}

      <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">
        Route Analytics
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-white/5 border border-white/5 p-4">
          <div className="text-3xl font-bold text-white">{distance}</div>
          <div className="text-xs text-white/40 mt-1">Distance</div>
        </div>

        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-4">
          <div className="text-3xl font-bold text-emerald-400">{duration}</div>
          <div className="text-xs text-white/40 mt-1">ETA</div>
        </div>

      </div>

      {/* WEATHER TIMELINE */}

      <div className="mt-6">

        <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-4">
          Weather Timeline
        </div>

        <div className="space-y-3">
          {visibleWeatherPoints.slice(0, 4).map((point, index) => {

            const condition = point.weather.weather[0].main
            let emoji = "☀"
            if (condition === "Rain") emoji = "🌧"
            else if (condition === "Thunderstorm") emoji = "⛈"
            else if (condition === "Clouds") emoji = "☁"
            else if (condition === "Snow") emoji = "❄"

            return (
              <div
                key={index}
                className="
                  flex items-center justify-between
                  rounded-2xl bg-white/5 border border-white/5
                  px-4 py-3
                "
              >
                <div>
                  <div className="text-sm font-semibold text-white">
                    {point.weather.name}
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    {condition}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{emoji}</span>
                  <span className="text-lg font-bold text-white">
                    {Math.round(point.weather.main.temp)}°C
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* AI INSIGHTS */}

      <div className="
        mt-6 rounded-3xl p-5
        bg-gradient-to-br from-emerald-500/10 to-emerald-400/5
        border border-emerald-400/10
      ">

        <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-4">
          AI Route Insights
        </div>

        <div className="flex items-start gap-4">
          <div className="text-3xl">{adviceEmoji}</div>
          <div>
            <div className={`text-sm font-semibold ${adviceColor}`}>
              {travelAdvice}
            </div>
            <div className="text-xs text-white/40 mt-2 leading-relaxed">
              Weather intelligence suggests monitoring live transit
              conditions for safer travel optimization.
            </div>
          </div>
        </div>

      </div>

    </div>

  )
}