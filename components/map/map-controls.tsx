"use client"
import React from "react"
interface MapControlsProps {
  mapMode:
    "normal" |
    "terrain" |
    "heatmap"

  setMapMode: React.Dispatch<
    React.SetStateAction<
      "normal" |
      "terrain" |
      "heatmap"
    >
  >
}

export function MapControls({
  mapMode,
  setMapMode
}: MapControlsProps) {

  const modes: {
  id:
    "normal" |
    "terrain" |
    "heatmap"

  label: string
}[] = [
    {
      id: "normal",
      label: "🗺 Normal"
    },
    {
      id: "terrain",
      label: "⛰ Terrain"
    },
    {
      id: "heatmap",
      label: "🔥 Heatmap"
    }
  ]

  return (

    <div className="
      absolute
      top-5
      right-16
      z-50
      flex
      items-center
      gap-2
      bg-white/90
      backdrop-blur-xl
      border
      border-slate-200
      shadow-2xl
      rounded-2xl
      p-2
    ">

      {modes.map((mode) => (

        <button
          key={mode.id}
          onClick={() =>
            setMapMode(mode.id)
          }
          className={`
            px-4
            py-2
            rounded-xl
            text-sm
            font-medium
            transition-all
            duration-300

            ${mapMode === mode.id
              ? `
                bg-emerald-500
                text-white
                shadow-lg
              `
              : `
                bg-white/60
                text-slate-700
                hover:bg-slate-100
              `
            }
          `}
        >

          {mode.label}

        </button>

      ))}

    </div>

  )

}