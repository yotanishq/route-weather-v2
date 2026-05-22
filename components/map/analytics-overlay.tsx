"use client"

import React from "react"

interface AnalyticsOverlayProps {

  routeGeoJSON: any

  distance: string

  duration: string

  visibleWeatherPoints: any[]

  travelAdvice: string

  adviceColor: string

  adviceEmoji: string

  minimizedAnalytics: boolean

  setMinimizedAnalytics:
    React.Dispatch<
      React.SetStateAction<boolean>
    >
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

  if (!routeGeoJSON) {
    return null
  }

  /* MINIMIZED SCOREBOARD */

  if (minimizedAnalytics) {

    return (

      <div
        className="
          absolute
          top-5
          left-5
          z-40
        "
      >

        <button

          onClick={() =>
            setMinimizedAnalytics(false)
          }

          className="
            flex
            items-center
            gap-6

            px-5
            py-3

            rounded-2xl

            bg-black/60
            backdrop-blur-2xl

            border
            border-white/10

            shadow-2xl

            hover:scale-[1.02]

            transition-all
            duration-300
          "
        >

          <div>

            <div className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-white/40
            ">

              Distance

            </div>

            <div className="
              text-lg
              font-bold
              text-white
            ">

              {distance}

            </div>

          </div>

          <div className="
            w-px
            h-8
            bg-white/10
          " />

          <div>

            <div className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-white/40
            ">

              ETA

            </div>

            <div className="
              text-lg
              font-bold
              text-[#00E38C]
            ">

              {duration}

            </div>

          </div>

        </button>

      </div>

    )

  }

  return (

    <div className="
      absolute
      top-5
      left-5
      z-40

      w-[300px]
      max-h-[500px]

      overflow-y-auto

      rounded-3xl

      bg-black/55
      backdrop-blur-2xl

      border
      border-white/10

      shadow-[0_0_50px_rgba(0,0,0,0.45)]

      p-5
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        mb-5
      ">

        <div className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-white/40
          font-semibold
        ">

          Route Analytics

        </div>

        <button

          onClick={() =>
            setMinimizedAnalytics(true)
          }

          className="
            w-9
            h-9

            rounded-full

            bg-white/10
            hover:bg-white/20

            text-white/70
            hover:text-white

            text-lg

            transition-all
            duration-300
          "
        >

          −

        </button>

      </div>

      {/* MAIN STATS */}

      <div className="
        grid
        grid-cols-2
        gap-4
      ">

        {/* DISTANCE */}

        <div className="
          rounded-3xl

          bg-white/5

          border
          border-white/5

          p-5
        ">

          <div className="
            text-4xl
            leading-none
            font-bold
            text-white
          ">

            {distance}

          </div>

          <div className="
            text-sm
            text-white/40
            mt-3
          ">

            Distance

          </div>

        </div>

        {/* ETA */}

        <div className="
          rounded-3xl

          bg-[#00E38C]/10

          border
          border-[#00E38C]/20

          p-5
        ">

          <div className="
            text-4xl
            leading-none
            font-bold
            text-[#00E38C]
          ">

            {duration}

          </div>

          <div className="
            text-sm
            text-white/40
            mt-3
          ">

            ETA

          </div>

        </div>

      </div>

      {/* TIMELINE */}

      <div className="mt-7">

        <div className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-white/40
          font-semibold
          mb-4
        ">

          Weather Timeline

        </div>

        <div className="space-y-3">

          {visibleWeatherPoints
            .slice(0, 4)
            .map((point, index) => {

              const condition =
                point.weather.weather[0].main

              let emoji = "☀"

              if (
                condition === "Rain"
              ) {
                emoji = "🌧"
              }

              else if (
                condition ===
                "Thunderstorm"
              ) {
                emoji = "⛈"
              }

              else if (
                condition ===
                "Clouds"
              ) {
                emoji = "☁"
              }

              else if (
                condition ===
                "Snow"
              ) {
                emoji = "❄"
              }

              return (

                <div

                  key={index}

                  className="
                    flex
                    items-center
                    justify-between

                    rounded-2xl

                    bg-white/5

                    border
                    border-white/5

                    px-4
                    py-3
                  "
                >

                  <div>

                    <div className="
                      text-base
                      font-semibold
                      text-white
                    ">

                      {point.weather.name}

                    </div>

                    <div className="
                      text-xs
                      text-white/40
                      mt-1
                    ">

                      {condition}

                    </div>

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <span className="
                      text-xl
                    ">
                      {emoji}
                    </span>

                    <span className="
                      text-xl
                      font-bold
                      text-white
                    ">

                      {Math.round(
                        point.weather.main.temp
                      )}°C

                    </span>

                  </div>

                </div>

              )

            })}

        </div>

      </div>

      {/* AI INSIGHTS */}

      <div className="
        mt-7

        rounded-3xl

        bg-gradient-to-br
        from-[#00E38C]/10
        to-[#00E38C]/5

        border
        border-[#00E38C]/10

        p-5
      ">

        <div className="
          text-xs
          uppercase
          tracking-[0.2em]
          text-white/40
          font-semibold
          mb-4
        ">

          AI Route Insights

        </div>

        <div className="
          flex
          items-start
          gap-4
        ">

          <div className="
            text-3xl
          ">
            {adviceEmoji}
          </div>

          <div>

            <div className={`
              text-sm
              font-semibold
              ${adviceColor}
            `}>

              {travelAdvice}

            </div>

            <div className="
              text-xs
              text-white/40
              mt-2
              leading-relaxed
            ">

              Weather intelligence suggests
              monitoring live transit
              conditions for safer travel
              optimization.

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}