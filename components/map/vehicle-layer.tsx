"use client"

import {
  Marker
} from "react-map-gl/maplibre"

interface VehicleLayerProps {
  vehiclePosition:
    [number, number] | null
}

export function VehicleLayer({
  vehiclePosition
}: VehicleLayerProps) {

  if (!vehiclePosition) {
    return null
  }

  return (

    <Marker
      longitude={vehiclePosition[0]}
      latitude={vehiclePosition[1]}
      anchor="center"
    >

      <div className="
        relative
        flex
        items-center
        justify-center
      ">

        {/* OUTER GLOW */}

        <div className="
          absolute
          w-16
          h-16
          rounded-full
          bg-emerald-500/20
          blur-2xl
          animate-pulse
        " />

        {/* PING */}

        <div className="
          absolute
          w-12
          h-12
          rounded-full
          border
          border-emerald-400/40
          animate-ping
        " />

        {/* VEHICLE CONTAINER */}

        <div className="
          relative
          w-11
          h-11
          rounded-2xl
          bg-gradient-to-br
          from-emerald-400
          via-emerald-500
          to-emerald-600
          shadow-[0_0_30px_rgba(16,185,129,0.45)]
          border
          border-white/30
          backdrop-blur-xl
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
        ">

          {/* INNER HIGHLIGHT */}

          <div className="
            absolute
            inset-[1px]
            rounded-2xl
            bg-white/10
          " />

          {/* VEHICLE ICON */}

          <span className="
            relative
            text-white
            text-lg
            drop-shadow-lg
          ">
            🚗
          </span>

        </div>

      </div>

    </Marker>

  )

}