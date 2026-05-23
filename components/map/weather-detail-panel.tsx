"use client"

interface WeatherDetailPanelProps {
  point: any
  onClose: () => void
}

export default function WeatherDetailPanel({
  point,
  onClose
}: WeatherDetailPanelProps) {

  const weather =
    point.weather.weather[0]

  return (
    <div
      className="
        absolute
        bottom-6
        right-6
        z-50

        w-[320px]

        rounded-2xl

        bg-black/40
        backdrop-blur-2xl

        p-5

        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
      "
    >

      <div className="flex items-start justify-between">

        <div>
          <div className="text-xl font-semibold text-white">
            {point.weather.name}
          </div>

          <div className="text-sm text-white/40 mt-1">
            {weather.main}
          </div>
        </div>

        <button
          onClick={onClose}
          className="
            w-8
            h-8

            rounded-full

            bg-white/5
            border border-white/10

            text-white/60

            hover:bg-white/10
            transition-all
          "
        >
          ✕
        </button>

      </div>

      <div className="mt-5 text-5xl font-bold text-emerald-400">
        {Math.round(point.weather.main.temp)}°
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-2xl bg-white/[0.03] p-3">
          <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase">
            Humidity
          </div>

          <div className="mt-1 text-lg text-white font-semibold">
            {point.weather.main.humidity}%
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-3">
          <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase">
            Wind
          </div>

          <div className="mt-1 text-lg text-white font-semibold">
            {point.weather.wind.speed} m/s
          </div>
        </div>

      </div>

    </div>
  )
}