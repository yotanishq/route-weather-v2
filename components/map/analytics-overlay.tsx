"use client"

import { useEffect, useRef } from "react"

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
  onRelocateRoute
}: AnalyticsOverlayProps) {

  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {

      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setMinimizedAnalytics(true)
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }

  }, [setMinimizedAnalytics])

  if (!routeGeoJSON) return null

  /* ───────────────── MINIMIZED ───────────────── */

  if (minimizedAnalytics) {

    return (

      <div
        className="
          absolute
          top-4
          left-4
          z-40
        "
      >

        <div
          onClick={() => setMinimizedAnalytics(false)}
          className="
            flex
            items-center
            gap-2

            cursor-pointer

            rounded-2xl

            border
            border-white/10

            bg-black/80
            backdrop-blur-3xl

            px-3
            py-2

            shadow-[0_10px_40px_rgba(0,0,0,0.45)]

            transition-all
          "
        >

          {/* DISTANCE */}

          <div>

            <div className="
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/30
            ">
              Distance
            </div>

            <div className="
              mt-0.5
              text-base
              font-bold
              text-white
              leading-none
            ">
              {distance}
            </div>

          </div>

          <div className="
            w-px
            h-6
            bg-white/10
          " />

          {/* ETA */}

          <div>

            <div className="
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/30
            ">
              ETA
            </div>

            <div className="
              mt-0.5
              text-base
              font-bold
              text-emerald-400
              leading-none
            ">
              {formattedDuration}
            </div>

          </div>

          <div className="
            w-px
            h-6
            bg-white/10
          " />

          {/* MODE */}

          <div>

            <div className="
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/30
            ">
              Best
            </div>

            <div className="
              mt-0.5
              text-xs
              font-semibold
              text-white
              leading-none
            ">
              {bestMode}
            </div>

          </div>

          {/* RELOCATE */}

          <button
            onClick={(e) => {
              e.stopPropagation()
              onRelocateRoute()
            }}
            className="
              flex
              items-center
              justify-center

              w-6
              h-6

              rounded-lg

              bg-emerald-500/10
              border
              border-emerald-400/10

              text-emerald-300
              text-xs

              hover:bg-emerald-500/20

              transition-all
            "
          >
            ⌖
          </button>

        </div>

      </div>

    )

  }

  /* ───────────────── FULL ───────────────── */

  return (

    <div
      ref={overlayRef}
      className="
        absolute
        top-4
        left-4
        z-40

        w-[200px]

        max-h-[52vh]

        rounded-[24px]

        border
        border-white/10

        bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_38%),linear-gradient(to_bottom_right,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]

        backdrop-blur-3xl

        shadow-[0_20px_70px_rgba(0,0,0,0.52)]

        overflow-hidden

        before:absolute
        before:inset-0
        before:bg-white/[0.02]
        before:pointer-events-none
        before:rounded-[24px]
      "
    >

      <div
        className="
          h-full

          max-h-[52vh]

          overflow-y-auto
          overflow-x-hidden

          px-3
          py-3

          space-y-2

          scrollbar-thin
          scrollbar-thumb-white/10
          scrollbar-track-transparent
        "
      >

        {/* STATS */}

        <div
          className="
            rounded-[18px]

            border
            border-white/6

            bg-white/[0.03]

            p-3
          "
        >

          <div className="
            flex
            items-start
            justify-between
            gap-2
          ">

            {/* DISTANCE */}

            <div>

              <div className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/25
              ">
                Distance
              </div>

              <div className="
                mt-1
                text-[24px]
                font-bold
                text-white
                leading-none
              ">
                {distance}
              </div>

            </div>

            {/* ETA */}

            <div className="text-right">

              <div className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/25
              ">
                ETA
              </div>

              <div className="
                mt-1
                text-[18px]
                font-bold
                text-emerald-400
                leading-none
              ">
                {formattedDuration}
              </div>

              <div className="
                mt-1
                text-[10px]
                text-white/30
              ">
                Best: {bestMode}
              </div>

            </div>

          </div>

          {/* RELOCATE */}

          <div className="
            mt-2
            flex
            items-center
            justify-center
          ">

            <button
              onClick={onRelocateRoute}
              className="
                flex
                items-center
                justify-center

                w-8
                h-8

                rounded-[12px]

                border
                border-white/10

                bg-white/[0.04]

                text-white/60
                text-sm

                hover:bg-white/[0.08]

                transition-all
              "
            >
              ⌖
            </button>

          </div>

        </div>

        {/* WEATHER */}

        <div className="space-y-1.5">

          {visibleWeatherPoints
            .slice(0, 4)
            .map((point, index) => (

              <div
                key={index}
                className="
                  rounded-[16px]

                  border
                  border-white/5

                  bg-white/[0.04]

                  px-2.5
                  py-2
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-2
                ">

                  <div className="
                    min-w-0
                    flex-1
                  ">

                    <div className="
                      truncate
                      text-[12px]
                      font-semibold
                      text-white
                    ">
                      {point.weather.name}
                    </div>

                    <div className="
                      text-[10px]
                      text-white/35
                      mt-0.5
                    ">
                      {point.weather.weather[0].main}
                    </div>

                  </div>

                  <div className="
                    text-[14px]
                    font-bold
                    text-white
                    shrink-0
                  ">
                    {Math.round(
                      point.weather.main.temp
                    )}°
                  </div>

                </div>

              </div>

            ))}

        </div>

        {/* AI */}

        <div
          className="
            rounded-[20px]

            border
            border-emerald-500/10

            bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_40%),rgba(0,0,0,0.25)]

            backdrop-blur-3xl

            px-3
            py-3
          "
        >

          <div className="
            flex
            items-center
            justify-between
            mb-2.5
          ">

            <div className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/30
            ">
              AI Insights
            </div>

            <div className="text-sm">
              {travelAdvice.includes("Storm")
                ? "⛈️"
                : travelAdvice.includes("rain")
                ? "🌧️"
                : "☀️"}
            </div>

          </div>

          <div className="
            rounded-[14px]

            border
            border-emerald-500/10

            bg-black/20

            p-2.5
          ">

            <div className="
              flex
              items-start
              gap-2
            ">

              <div className="text-base">
                🌤️
              </div>

              <div>

                <div className={`
                  text-[12px]
                  font-bold
                  leading-snug
                  ${adviceColor}
                `}>
                  {travelAdvice}
                </div>

                <div className="
                  mt-1.5
                  text-[10px]
                  text-white/30
                  leading-relaxed
                ">
                  AI-powered weather sync
                  for safer travel.
                </div>

              </div>

            </div>

          </div>

          <div className="
            mt-2.5
            grid
            grid-cols-2
            gap-1.5
          ">

            <div className="
              rounded-[13px]

              border
              border-white/5

              bg-black/20

              p-2.5
            ">

              <div className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/30
              ">
                Mode
              </div>

              <div className="
                mt-1.5
                text-[12px]
                font-semibold
                text-cyan-300
              ">
                {bestMode}
              </div>

            </div>

            <div className="
              rounded-[13px]

              border
              border-white/5

              bg-black/20

              p-2.5
            ">

              <div className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/30
              ">
                Status
              </div>

              <div className="
                mt-1.5
                text-[12px]
                font-semibold
                text-emerald-400
              ">
                Synced
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}