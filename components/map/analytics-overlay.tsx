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

  if (!routeGeoJSON) return null

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

  /* ── MINIMIZED ── */

  if (minimizedAnalytics) {

    return (

      <div className="
        absolute
        top-4
        left-4
        z-40
      ">

        <div
          onClick={() => setMinimizedAnalytics(false)}
          className="
            flex
            items-center
            gap-3

            cursor-pointer

            rounded-2xl

            border
            border-white/10

            bg-black/80
            backdrop-blur-3xl

            px-4
            py-2.5

            shadow-[0_10px_40px_rgba(0,0,0,0.45)]

            transition-all
          "
        >

          {/* DISTANCE */}

          <div>

            <div className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/30
            ">
              Distance
            </div>

            <div className="
              mt-0.5
              text-lg
              font-bold
              text-white
              leading-none
            ">
              {distance} km
            </div>

          </div>

          <div className="
            w-px
            h-7
            bg-white/10
          " />

          {/* ETA */}

          <div>

            <div className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/30
            ">
              ETA
            </div>

            <div className="
              mt-0.5
              text-lg
              font-bold
              text-emerald-400
              leading-none
            ">
              {formattedDuration}
            </div>

          </div>

          <div className="
            w-px
            h-7
            bg-white/10
          " />

          {/* BEST MODE */}

          <div>

            <div className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/30
            ">
              Best
            </div>

            <div className="
              mt-0.5
              text-sm
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

              w-7
              h-7

              rounded-xl

              bg-emerald-500/10
              border
              border-emerald-400/10

              text-emerald-300
              text-sm

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

  /* ── FULL ── */

  return (

    <div
      ref={overlayRef}
      className="
        absolute
        top-4
        left-4
        z-40

        w-[210px]

        max-h-[60vh]

        rounded-[24px]

        border
        border-white/10

        bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_38%),linear-gradient(to_bottom_right,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]

        backdrop-blur-3xl

        shadow-[0_20px_70px_rgba(0,0,0,0.52)]

        overflow-hidden
      "
    >

      <div
        className="
          h-full

          max-h-[60vh]

          overflow-y-auto

          px-3
          py-3

          space-y-2.5

          scrollbar-thin
          scrollbar-thumb-white/10
          scrollbar-track-transparent
        "
      >

        {/* ── STATS ── */}

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
            items-center
            justify-between
            gap-2
          ">

            {/* DISTANCE */}

            <div>

              <div className="
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-white/25
              ">
                Distance
              </div>

              <div className="
                mt-1
                text-[26px]
                font-bold
                text-white
                leading-none
              ">
                {distance}
                <span className="
                  text-sm
                  text-white/35
                  ml-1
                ">
                  km
                </span>
              </div>

            </div>

            {/* ETA */}

            <div className="text-right">

              <div className="
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-white/25
              ">
                ETA
              </div>

              <div className="
                mt-1
                text-[20px]
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
            mt-3
            flex
            justify-end
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
                text-base

                hover:bg-white/[0.08]

                transition-all
              "
            >
              ⌖
            </button>

          </div>

        </div>

        {/* ── WEATHER CARDS ── */}

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

                  px-3
                  py-2.5
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
                      text-[13px]
                      font-semibold
                      text-white
                    ">
                      {point.weather.name}
                    </div>

                    <div className="
                      text-[11px]
                      text-white/35
                      mt-0.5
                    ">
                      {point.weather.weather[0].main}
                    </div>

                  </div>

                  <div className="
                    text-[15px]
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

        {/* ── AI INSIGHTS ── */}

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

          {/* HEADER */}

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
              ☀️
            </div>

          </div>

          {/* ADVICE CARD */}

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

              <div className="
                text-base
                shrink-0
              ">
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

          {/* MODE + STATUS */}

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